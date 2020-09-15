import React, { Component } from 'react';
import axios from  'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as recruitActions from 'modules/recruit';
import * as applyActions from 'modules/apply';
import * as authActions from 'modules/auth';
import * as menuActions from 'modules/menu';

import { RecruitList, RecruitPopup } from 'components';
import storage from 'lib/storage';
import { formatWithOptions } from 'util';
import devtest from 'lib/devtest';

class RecruitContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            serialNumber:"",
            applyUserId:"",
            noticeImagePath: "",
            savedYn:false,
            openPopup: false, 
        }
    }
    /** 컴포넌트가 DOM위에 만들어지기 전에 실행 */
    componentDidMount() {
        this.setState({
            applyUserId: storage.getUserInfo(),
            //serialNumber: this.props.serialNumber
        })
       
        //모집공고 리스트 조회
        this.handleGetRecruitNoticeList();
        window.addEventListener('beforeunload', this.handleLeavePage);
    }

    handleLeavePage = (e) => {
        // console.log(`화면 이동: ${e}`);
    }

    /** 모집공고 리스트 조회 */
    handleGetRecruitNoticeList = () => {
        const { RecruitActions } = this.props;
        axios({
            url:devtest() +"/recruitNotice",
            method:"get",
            headers: { Pragma: 'no-cache'}
          })
        .then(function(response) {
          if (response == null){
            //   console.log('response null');
          }else {
              //조회한 데이터 store에 셋팅
              RecruitActions.setRecruitNoticeList(response.data);

              //ApplyActions.setSerialNumber(response)
          }
        }).catch(function(error) {
          console.log(error);
        });
    }
    
    /** 모집공고 상세보기 팝업 */
    handlePopupOpen = (recruitInfo) => {
        const { RecruitActions } = this.props;
        
        RecruitActions.setRecruitNoticeInfo(recruitInfo);
        //팝업 visible true 셋팅
        this.setState({
            openPopup: true,
        });
    }

    /** 모집공고 상세보기 팝업 닫기 */
    handlePopupClose = () => {
        this.setState({openPopup:false})
    }

    /** 지원하기 버튼 클릭 */
    handleApply = (recruitInfo) => {
        const self = this;
        const { RecruitActions, 
                ApplyActions,
                userId,
            MenuActions, AuthActions } = this.props;
        const { applyUserId
                 } = this.state;
        
        if(applyUserId === null){
            this.props.history.push('/login');
            return;
        }

        const serialNumber = recruitInfo.serialNumber;

        //console.log("serialNumber")
        
        //serial number session
        storage.removeSerialNumber();
        storage.setSerialNumber(serialNumber);

        ApplyActions.setSerialNumber(serialNumber);

        this.setState({
            serialNumber
        })

        //팝업 닫기
        this.setState({
            openPopup: false,
        });
        
        axios({
            url: devtest() +`/apply/userCheck/${serialNumber}` , ///${applyUserId}`,
            method : 'get',
            headers: { "Pragma": 'no-cache' ,
                       "x-access-token": storage.getToken() 
                     }
        }).then(
            (res) => {
                //storage.checkToken(res)
                const savedYn = res.data.row === "0" ? false : true ;
                //0 인경우 신규유저(false), 아닌경우 저장된 유저(true).
                //session 정보 저장
                storage.setSessionObj(res.headers);
                if(savedYn){ //저장된 경우 기존 step 정보 가져와서 세팅한다.
                    self.getApplyStatus();
                }else{
                    //신규유저일경우 동작 X
                    self.saveApplyInfo();
                }
            }
        ).catch(
            (err)=>{
                if(err.response.status==999){
                    alert("로그인이 필요합니다. 로그인 페이지로 이동합니다.");
                    self.props.history.push("/login");
                }
                else if(err.response.status==998){
                    alert("로그인 시간이 만료되었습니다. 로그인 페이지로 이동합니다.");
                    //sessionStorage에 userInfo key의 데이터 삭제
                storage.removeSessionObj();
                storage.removeSerialNumber();
                //store의 login데이터 reset
                MenuActions.setClickMenu("/login");
                AuthActions.logout();
                    self.props.history.push("/login");
                }
                else if(err.response.status==401){
                    /**/
                    alert("잘못된 로그인 정보입니다. 로그인 페이지로 이동합니다.");
                    storage.removeSessionObj();
                    storage.removeSerialNumber();
                    //store의 login데이터 reset
                    MenuActions.setClickMenu("/login");
                    AuthActions.logout();
                    self.props.history.push("/login");

                }else{
                    alert("알수없는 에러가 발생했습니다. 시스템 담당자에게 문의하세요.")
                    console.log( err.response);
                }
                
            }
        )

    }

    saveUserProcess = (header) => {

        const self = this;
        const { serialNumber } = this.state

        axios({
            url: devtest() +`/applyUserStatus/${serialNumber}`, ///${applyUserId}`,
            method : 'post',
            //data : { basicInfo },
            headers: { "Pragma": 'no-cache', 
                        "x-access-token": header.newtoken }
        }).then(
            (res)=>{
                if(res.data){
                    storage.setSessionObj(res.headers);
                    self.props.history.push('/apply/step0');

                }
            }
        ).catch(
            (err)=>{
                // console.log("msg", err.response)
                if(err.response.status==999){
                    alert("로그인이 필요합니다. 로그인 페이지로 이동합니다.");
                    self.props.history.push("/login");
                }
                else if(err.response.status==998){
                    alert("로그인 시간이 만료되었습니다. 로그인 페이지로 이동합니다.");
                    //sessionStorage에 userInfo key의 데이터 삭제
                    storage.removeSessionObj();
                    storage.removeSerialNumber();
                    //store의 login데이터 reset
                    MenuActions.setClickMenu("/login");
                    AuthActions.logout();
                    self.props.history.push("/login");
                }
                else if(err.response.status==401){
                    /**/
                    alert("잘못된 로그인 정보입니다. 로그인 페이지로 이동합니다.");
                    storage.removeSessionObj();
                    storage.removeSerialNumber();
                    //store의 login데이터 reset
                    MenuActions.setClickMenu("/login");
                    AuthActions.logout();
                    self.props.history.push("/login");

                }else{
                    alert("알수없는 에러가 발생했습니다. 시스템 담당자에게 문의하세요.")
                    console.log( err.response);
                }
            }
        )



    }

    saveApplyInfo = () => {

        const basicInfo = {
            applyUserId: this.state.applyUserId,
            applyStatus: "0",
            serialNumber: this.state.serialNumber
        }
        const { AuthActions, MenuActions } = this.props;

        const self = this;

        axios({
            url: devtest() +'/apply/',
            method : 'post',
            data : { basicInfo },
            headers: {  "Pragma": 'no-cache', 
                        "x-access-token": storage.getToken() }
        }).then(
            (res)=>{
                if(res.data){
                    //storage.setSessionObj(res.headers);
                    //self.saveUserProcess(res.headers)
                    //self.props.history.push('/apply/step0');
                }
            }
        ).catch(
            (err)=>{
                if(err.response.status==999){
                    alert("로그인이 필요합니다. 로그인 페이지로 이동합니다.");
                    self.props.history.push("/login");
                }
                else if(err.response.status==998){
                    alert("로그인 시간이 만료되었습니다. 로그인 페이지로 이동합니다.");
                    //sessionStorage에 userInfo key의 데이터 삭제
                storage.removeSessionObj();
                storage.removeSerialNumber();
                //store의 login데이터 reset
                MenuActions.setClickMenu("/login");
                AuthActions.logout();
                    self.props.history.push("/login");
                }
                else if(err.response.status==401){
                    /**/
                    alert("잘못된 로그인 정보입니다. 로그인 페이지로 이동합니다.");
                    storage.removeSessionObj();
                    storage.removeSerialNumber();
                    //store의 login데이터 reset
                    MenuActions.setClickMenu("/login");
                    AuthActions.logout();
                    self.props.history.push("/login");

                }else{
                    alert("알수없는 에러가 발생했습니다. 시스템 담당자에게 문의하세요.")
                    console.log( err.response);
                }
            }
        )

    }

    getApplyStatus = () => {

        const { applyUserId, serialNumber } = this.state;
        const self = this;
        const { ApplyActions, AuthActions, MenuActions } = this.props; 

        
        axios({
            url: devtest() +`/apply/${serialNumber}`, ///${applyUserId}`,
            method : 'get',
            //data : { basicInfo },
            headers: { "Pragma": 'no-cache', "x-access-token": storage.getToken() }
        }).then(
            (res)=>{
                if(res.data){
                    storage.setSessionObj(res.headers);
                    ApplyActions.setApplyStatus(res.data.applyStatus);
                    if(res.data.applyStatus==="7") {
                        alert("최종 제출을 완료하신 전형입니다. 마이페이지로 이동합니다.");
                        self.props.history.push(`/mypage`);
                    } 
                    else
                        self.props.history.push(`/apply/step${res.data.applyStatus}`);
                }
            }
        ).catch(
            (err)=>{
                // console.log("msg", err.response)
                if(err.response.status==999){
                    alert("로그인이 필요합니다. 로그인 페이지로 이동합니다.");
                    self.props.history.push("/login");
                }
                else if(err.response.status==998){
                    alert("로그인 시간이 만료되었습니다. 로그인 페이지로 이동합니다.");
                    //sessionStorage에 userInfo key의 데이터 삭제
                    storage.removeSessionObj();
                    storage.removeSerialNumber();
                    //store의 login데이터 reset
                    MenuActions.setClickMenu("/login");
                    AuthActions.logout();
                    self.props.history.push("/login");
                }
                else if(err.response.status==401){
                    /**/
                    alert("잘못된 로그인 정보입니다. 로그인 페이지로 이동합니다.");
                    storage.removeSessionObj();
                    storage.removeSerialNumber();
                    //store의 login데이터 reset
                    MenuActions.setClickMenu("/login");
                    AuthActions.logout();
                    self.props.history.push("/login");

                }else{
                    alert("알수없는 에러가 발생했습니다. 시스템 담당자에게 문의하세요.")
                    console.log( err.response);
                }
            }
        )

    }


    render() { 
        const { recruitNoticeList, recruitInfo } = this.props;
        const { handlePopupOpen, handlePopupClose, handleApply } = this;
        const { noticeImagePath, openPopup} = this.state;
        return ( 
            <div className="sub-contents">
                <RecruitList recruitInfo={recruitNoticeList} onPopup={handlePopupOpen} onApply={handleApply}></RecruitList>
                {openPopup && <RecruitPopup recruitInfo={recruitInfo} onClose={handlePopupClose} onApply={handleApply}></RecruitPopup>}
            </div>
         );
    }
}
 
// 컴포넌트에 리덕스 스토어를 연동해줄 때에는 connect 함수 사용
export default connect(
    (state) => ({
        recruitNoticeList: state.recruit.get('recruitNoticeList'),
        recruitInfo : state.recruit.get('recruitInfo'),
        serialNumber: state.apply.get('serialNumber'),
        userId : state.auth.get('userId'),
        applyStatus : state.auth.get('applyStatus')
    }), (dispatch) => ({
        RecruitActions : bindActionCreators(recruitActions, dispatch),
        ApplyActions : bindActionCreators(applyActions, dispatch),
        AuthActions: bindActionCreators(authActions, dispatch),
        MenuActions : bindActionCreators(menuActions, dispatch)
    })
)(RecruitContainer);
