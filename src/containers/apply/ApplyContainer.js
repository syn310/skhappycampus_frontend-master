import React, { Component } from 'react';
import axios from  'axios'; 
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ApplyActions from 'modules/apply';
import * as menuActions from 'modules/menu';
import * as authActions from 'modules/auth';
import {  ApplyForm  } from 'components'
import  Stepbar from 'components/block/Stepbar'
import storage from 'lib/storage';
import devtest from 'lib/devtest';

class ApplyContainer extends Component {
    
    constructor(props) {
        super(props);
        this.state = { 
            coverLetter: "", 
            userInfo: {
                applyUserId:"",
                serialNumber:"",
                applyStatus:"4"
            },
            stepIndex: "4",
         }
    }

    componentDidMount() {


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
        }
        else {

            MenuActions.setClickMenu("/recruit");
            const urlStep = window.location.href.split("/apply/step")[1];
            
            let userTemp = this.state.userInfo;
            userTemp["applyUserId"] = storage.getUserInfo();
            userTemp["serialNumber"] = serialNumber; //this.props.serialNumber;
            userTemp["applyStatus"] = this.props.applyStatus 

            //console.log("asdfasfasdf", urlStep)

            this.setState({
                userInfo: userTemp
            })

            axios({
                url: devtest() +`/apply/${serialNumber}`, ///${applyUserId}`,
                method : 'get',
                //data : { basicInfo },
                headers: { "Pragma": 'no-cache', "x-access-token": storage.getToken() }
            }).then(
                (res)=>{
                        if(res.data.applyStatus){
                            //현재 step과 url입력 step이 같을 경우 
                            storage.setSessionObj(res.headers);
                            // console.log("유저상태체크", res.data.applyStatus, typeof res.data.applyStatus)
                            if(parseInt(res.data.applyStatus) == 7){
                                alert("최종 제출을 완료하신 전형입니다. 마이페이지로 이동합니다.");
                                self.props.history.push("/mypage");
                            }

                            else if(parseInt(res.data.applyStatus) >= parseInt(urlStep)  && parseInt(urlStep) > 2 ){
                                // self.settingUserInfo();
                                //console.log("첫번쨰", res.headers);
                                
                                ApplyActions.setApplyStatus(res.data.applyStatus);
                                self.getCoverLetterContent();
                               

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
            );
    }

    }



    //자기소개서 내용 조회
    getCoverLetterContent = () => {

        const { ApplyActions, AuthActions, MenuActions } = this.props;
        const { userInfo } = this.state;

        axios({
            url: devtest() +`/apply/${userInfo.serialNumber}`,  
            method : 'get',
            headers: {  "Pragma" : 'no-cache', 
                        "x-access-token": storage.getToken() }
         }).then(
              (res)=>{
                  //console.log("바로 가져온것", res.data)
                  if(res.data.coverLetter){
                      //console.log("두번째", res.headers)
                      storage.setSessionObj(res.headers);
                      ApplyActions.setCoverLetter(res.data.coverLetter);
                      this.setState({
                          coverLetter: this.props.coverLetter
                      })
  
                  }
  
            }).catch(
              (err) => {
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

                }
                else{
                    alert("알수없는 에러가 발생했습니다. 시스템 담당자에게 문의하세요.")
                    console.log( err.response);
                }
              }
          )


    }


    //자기소개서 저장시 1자라도 있어야됨.
    contentValidation = (content) => {

        let result = true;

        if(content.length == 0) {
                alert("내용입력은 필수입니다.");
                return;
            }
            
        return result;

    }

    //내용변경시 
    handleChange = (e) => {
        
        let input = {};
        input['coverLetter'] = e.target.value;
        if(e.target.value.length < 3001) 
            this.setState(input);
        
    }

    
    //스텝바에서 클릭
    //스텝바클릭제거
    handleStepClick = (e) => {

        const { userInfo } = this.state;
        const stepClickIndex = parseInt(e.target.getAttribute("data-step"));
        //console.log("step", e.target.getAttribute("data-step"));
        
        //본인인증 전 단계(0,1,2) 로는 이동불가. 
        //현재 본인 저장 스텝보다 작은 스텝으로는 스텝바클릭 이동가능
        //스텝바 클릭 제거함.
        // if( stepClickIndex >= 3 && (stepClickIndex < parseInt(userInfo.applyStatus) || stepClickIndex == parseInt(userInfo.applyStatus)) ){
        //     this.props.history.push("/apply/step" + e.target.getAttribute("data-step"))
        // }
            
    }

    //저장버튼
    handleSaveTemp = (e) => {
        
        const { ApplyActions, AuthActions, MenuActions } = this.props;
        const { coverLetter, userInfo } = this.state;

        const tempPara = e.currentTarget.getAttribute("data-temp");
        const self = this;


        //자기소개서 업데이트
        axios({
                method:'put',
                url: devtest() +`/apply/coverLetter/${userInfo.serialNumber}`, 
                data : { coverLetter },
                headers: { "Pragma" : 'no-cache',
                            "x-access-token": storage.getToken() }
            }).then(
                (res)=>{
                    // console.log("저장하면서 받아온것? ",res);

                    if(res.data.coverLetter){
                        storage.setSessionObj(res.headers);
                        if(tempPara==="temp") {
                            alert("저장되었습니다");
                            self.getCoverLetterContent();
                        } 
                        if(tempPara==="next") {
                            self.handleNextClick(e)
                        }
                        if(tempPara==="prev") {
                            self.handlePrevClick(e)
                        }
                        //ApplyActions.setCoverLetter(res.data.coverLetter);
                        
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
    
                    }
                    else{
                        alert("알수없는 에러가 발생했습니다. 시스템 담당자에게 문의하세요.")
                        console.log( err.response);
                    }
                }
            )

        //}

    }


    //이전단계 버튼 클릭
    handlePrevClick = (e) => {

        let { stepIndex, userInfo } = this.state;
        let prevStepIndex = parseInt(stepIndex) - 1;

        this.props.history.push(`/apply/step${prevStepIndex}`);

    }


    //다음단계 버튼 클릭
    handleNextClick = (e) => {
        // console.log("container에서 실행")
        let { stepIndex, userInfo } = this.state;
        let nextStepIndex = parseInt(stepIndex) + 1;
        
        const { AuthActions, MenuActions } = this.props;

        const self = this;
        
        axios({
            url: devtest() +`/apply/updateUserStatus/${userInfo.serialNumber}`, ///${userInfo.applyUserId}`,
            method:"put",
            data: { applyStatus: nextStepIndex.toString() },
            headers: { "Pragma" : 'no-cache',
                        "x-access-token": storage.getToken() }
        }).then(
            (res)=>{
                if(res) {
                    //console.log(res)
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

    pageMoveTo = (e) => {
        const url = e.target.getAttribute("data-url");
        if(confirm("작성중인 내용이 저장되지 않을 수 있습니다. 이동 전 저장 바랍니다. \n그래도 이동하시겠습니까 ?"))
            this.props.history.push(url);
    }


    render() { 

        const { handleChange, 
                handleSaveTemp, 
                handleNextClick,
                handleStepClick,
                handlePrevClick,
                pageMoveTo
                  } = this;
        const { stepIndex, coverLetter } = this.state;
        const { applyStatus } = this.props;
                 
        return ( 
            <div className="sub-contents">
                <div className="sub-container">
                <Stepbar stepIndex={stepIndex} handleStepClick={handleStepClick} applyStatus={applyStatus} pageMoveTo={pageMoveTo}/>
                <ApplyForm 
                    handleChange={handleChange} 
                    handleSaveTemp={handleSaveTemp} 
                    handleNextClick={handleNextClick} 
                    coverLetter={coverLetter}
                    handlePrevClick={handlePrevClick} >
                </ApplyForm> 
                </div>
            </div>
        );
    }
}
 



export default connect(
    (state) => ({
        coverLetter: state.apply.get("coverLetter"),
        serialNumber : state.apply.get('serialNumber'),
        isLogin: state.auth.get('isLogin'),
        userId: state.auth.get('userId'),
        userType: state.auth.get('userType'),
        applyStatus: state.apply.get('applyStatus')
    }), (dispatch) => ({
        ApplyActions: bindActionCreators(ApplyActions, dispatch),
        MenuActions : bindActionCreators(menuActions, dispatch),
        AuthActions: bindActionCreators(authActions, dispatch),
    })
)(ApplyContainer);

