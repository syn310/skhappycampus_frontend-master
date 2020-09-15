import React, { Component } from 'react';
import { Agreement }  from 'components'
import  Stepbar from 'components/block/Stepbar'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import storage from 'lib/storage';
import axios from  'axios'; 
import * as menuActions from 'modules/menu';
import * as applyActions from 'modules/apply';
import * as authActions from 'modules/auth';
import devtest from 'lib/devtest';

class AgreementContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stepIndex: "1",
            userInfo :{
                serialNumber: "",
                applyUserId: ""
            }
          }
    }

    componentDidMount = () => {

        this.checkUserStep();

    }


    checkUserStep = () => {

        const self = this;
        const { ApplyActions, MenuActions, AuthActions } = this.props; 
        const serialNumber = storage.getSerialNumber();

        // console.log("serialNumber", typeof serialNumber, serialNumber)
        if(serialNumber==="null") {
            alert("잘못된 접근입니다. 공고정보가 존재하지 않습니다.");
            this.props.history.push("/recruit");
        }else{

            MenuActions.setClickMenu("/recruit");
            const urlStep = window.location.href.split("/apply/step")[1];

            let userTemp = this.state.userInfo;
            userTemp["serialNumber"] = serialNumber; //this.props.serialNumber;
            userTemp["applyUserId"] = storage.getUserInfo();

            this.setState({
                userInfo: userTemp
            })

            //console.log("", urlStep)
            
            axios({
                url: devtest() +`/apply/${serialNumber}`, ///${applyUserId}`,
                method : 'get',
                //data : { basicInfo },
                headers: { "Pragma": 'no-cache', "x-access-token": storage.getToken() }
            }).then(
                (res)=>{
                        //console.log("첫번째", res)
                        if(res.data.applyStatus){
                            storage.setSessionObj(res.headers);
                            // console.log("유저상태체크", res.data.applyStatus, typeof res.data.applyStatus)
                            if(parseInt(res.data.applyStatus) == 7){
                                alert("최종 제출을 완료하신 전형입니다. 마이페이지로 이동합니다.");
                                self.props.history.push("/mypage");
                            }
                            else if(parseInt(res.data.applyStatus) >= parseInt(urlStep) && parseInt(urlStep) > 2 ){
                                // self.settingUserInfo();
                                ApplyActions.setApplyStatus(res.data.applyStatus);
                                // console.log("확인용", storage.getToken())
                            }
                            else{
                                self.props.history.push("/apply/step" + res.data.applyStatus);
                            }
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
                    }else if(err.response.status==401){
                        /**/
                        alert("잘못된 로그인 정보입니다. 로그인 페이지로 이동합니다.");
                        storage.removeSessionObj();
                        storage.removeSerialNumber();
                        //store의 login데이터 reset
                        MenuActions.setClickMenu("/login");
                        AuthActions.logout();
                        self.props.history.push("/login");
    
                    }
                    else{
                        alert("알수없는 에러가 발생했습니다. 시스템 담당자에게 문의하세요.")
                        console.log( err.response);
                    }
                }
            )
        }

    }




    //상단 스텝바 클릭
    //step1(자격조사) ~ step3(본인인증) 단계까지는 step bar 비활성화
    //스텝바 클릭 제거
    handleStepClick = (e) => {
        //console.log("step", e.target.getAttribute("data-step"))
        //this.props.history.push("/apply/step"+e.target.getAttribute("data-step"))
    }

    //다음 버튼 클릭
    handleNextClick = (e) => {
        //console.log("container에서 실행")
        let { stepIndex, userInfo } = this.state;
        let nextStepIndex = parseInt(stepIndex) + 1;
        
        const self = this;
        const { MenuActions, AuthActions } = this.props; 
        // console.log("다음버튼",  storage.getToken())
        //다음버튼 클릭시 다음 스텝으로 유저 상태 정보를 업데이트함.
        axios({
            url:devtest() +  `/apply/updateUserStatus/${userInfo.serialNumber}`, 
            method:"put",
            data: { applyStatus: nextStepIndex.toString() },
            headers: {  "Pragma": 'no-cache',
                        "x-access-token": storage.getToken()}
        }).then(
            (res)=>{
                if(res) {
                    //console.log(res)
                    // console.log("두번째", res)
                    storage.setSessionObj(res.headers);
                    self.props.history.push(`/apply/step${nextStepIndex}`);
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
                else if(err.response.status==997){
                    alert("본인인증이 정상적으로 진행되지 않았습니다. 시스템 관리자 문의바랍니다.");
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

                }
                else{
                    alert("알수없는 에러가 발생했습니다. 시스템 담당자에게 문의하세요.")
                    console.log( err.response);
                }
            }
        )

        //this.props.history.push(`/apply/step${nextStepIndex}`);
    }

    //sub dept 메뉴
    pageMoveTo = (e) => {
        const url = e.target.getAttribute("data-url");
        if(confirm("작성중인 내용이 저장되지 않을 수 있습니다. 이동 전 저장 바랍니다. \n그래도 이동하시겠습니까 ?")){
            this.props.history.push(url);
        }
            
    }

    render() { 
        const { stepIndex } = this.state;
        const { handleStepClick,
                handleNextClick, 
                pageMoveTo } = this;
        const { applyStatus } = this.props;

        return ( 
            <div className="sub-contents">
                <div className="sub-container">
                    <Stepbar stepIndex={stepIndex} handleStepClick={handleStepClick} applyStatus={applyStatus} pageMoveTo={pageMoveTo}/>
                    <Agreement handleNextClick={handleNextClick}></Agreement>
                </div>
            </div>
         );
    }
}

// 컴포넌트에 리덕스 스토어를 연동해줄 때에는 connect 함수 사용
export default connect(
    (state) => ({
        serialNumber : state.apply.get("serialNumber"),
        isLogin: state.auth.get('isLogin'),
        userId: state.auth.get('userId'),
        userType: state.auth.get('userType'),
        applyStatus: state.apply.get('applyStatus'),
        
    }), (dispatch) => ({
        ApplyActions : bindActionCreators(applyActions, dispatch),
        MenuActions : bindActionCreators(menuActions, dispatch),
        AuthActions: bindActionCreators(authActions, dispatch),

    })
)(AgreementContainer);

