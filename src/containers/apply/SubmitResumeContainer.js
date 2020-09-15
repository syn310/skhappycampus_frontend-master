import React, { Component } from 'react';
import {  SubmitResume  } from 'components'
import  Stepbar from 'components/block/Stepbar'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from  'axios'; 
import storage from 'lib/storage';
import devtest from 'lib/devtest';
import * as applyActions from 'modules/apply';
import * as menuActions from 'modules/menu';
import * as authActions from 'modules/auth';

class SubmitResumeContainer extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            stepIndex: "6",
            userInfo: {
                serialNumber:"",
                applyUserId:"",
                applyStatus:""
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
        }
        else{

            MenuActions.setClickMenu("/recruit");
            const urlStep = window.location.href.split("/apply/step")[1];
            
            let userTemp = this.state.userInfo;
            userTemp["serialNumber"] = serialNumber; //this.props.serialNumber;
            userTemp["applyUserId"] = storage.getUserInfo();
            userTemp["applyStatus"] = this.props.applyStatus;

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
                                ApplyActions.setApplyStatus(res.data.applyStatus);
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
    
                    }else{
                        alert("알수없는 에러가 발생했습니다. 시스템 담당자에게 문의하세요.")
                        console.log( err.response);
                    }
                }
            )
        }

    }




    //이전단계 버튼 클릭
    handlePrevClick = (e) => {

        let { stepIndex, userInfo } = this.state;
        let prevStepIndex = parseInt(stepIndex) - 1;

        this.props.history.push(`/apply/step${prevStepIndex}`);

    }

    // //스텝바 클릭
    // handleStepClick = (e) => {
    //     this.props.history.push("/apply/step"+e.target.getAttribute("data-step"))
    // }

    //스텝바에서 클릭
     ////스텝바 클릭 제거함.
    handleStepClick = (e) => {

        const { userInfo } = this.state;
        const stepClickIndex = parseInt(e.target.getAttribute("data-step"));
        //console.log("step", e.target.getAttribute("data-step"));
        
        //본인인증 전 단계(0,1,2) 로는 이동불가. 
        //현재 본인 저장 스텝보다 작은 스텝으로는 스텝바클릭 이동가능
       
        // if( stepClickIndex >= 3 && stepClickIndex <= parseInt(userInfo.applyStatus) ){
        //     this.props.history.push("/apply/step" + e.target.getAttribute("data-step"))
        // }
            
    }

    //완료후 메인화면으로 redirect
    redirectToMyPage = (e) => {

        let { stepIndex, userInfo } = this.state;
        let nextStepIndex = parseInt(stepIndex) + 1;
        const { AuthActions, MenuActions } = this.props;
        
        const self = this;
        
        axios({
            url:devtest() + `/apply/updateUserStatus/${userInfo.serialNumber}`, ///${userInfo.applyUserId}`,
            method:"put",
            data: { applyStatus: nextStepIndex.toString() },
            headers: { "Pragma" : 'no-cache',
                        "x-access-token": storage.getToken()  }
        }).then(
            (res)=>{
                // console.log("업뎃이후", res)
                storage.setSessionObj(res.headers);

                if(res.data.indexOf("상태업데이트가 완료되었습니다.") > -1) {
                    alert("제출완료되었습니다. 마이페이지로 이동합니다.");
                    self.props.history.push(`/mypage`);
                }else if(res.data.indexOf("필수입력사항을 입력하지 않았습니다") > -1){
                    alert("필수입력사항을 입력하지 않았습니다. 지원서를 다시 확인바랍니다.");
                    return;
                }else {}
                    
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

                }else{
                    alert("알수없는 에러가 발생했습니다. 시스템 담당자에게 문의하세요.")
                    console.log(err.response);
                }
            }
        )

    }

    pageMoveTo = (e) => {
        const url = e.target.getAttribute("data-url");
        if(confirm("작성중인 내용이 저장되지 않을 수 있습니다. 이동 전 저장 바랍니다. \n그래도 이동하시겠습니까 ?"))
            this.props.history.push(url);
    }

    render() { 
        const { stepIndex, userInfo } = this.state;
        const { handleStepClick, redirectToMyPage, handlePrevClick, pageMoveTo } = this;
        return ( 
            <div className="sub-contents">
                <div className="sub-container">
                <Stepbar stepIndex={stepIndex} handleStepClick={handleStepClick} applyStatus={userInfo.applyStatus} pageMoveTo={pageMoveTo}/>
                <SubmitResume redirectToMyPage={redirectToMyPage} handlePrevClick={handlePrevClick}></SubmitResume>
                </div>
            </div>
         );
    }
}


// 컴포넌트에 리덕스 스토어를 연동해줄 때에는 connect 함수 사용
export default connect(
    (state) => ({
        serialNumber : state.apply.get('serialNumber'),
        isLogin: state.auth.get('isLogin'),
        userId: state.auth.get('userId'),
        userType: state.auth.get('userType'),
        applyStatus: state.apply.get('applyStatus')
    }), (dispatch) => ({
        ApplyActions : bindActionCreators(applyActions, dispatch),
        MenuActions : bindActionCreators(menuActions, dispatch),
        AuthActions: bindActionCreators(authActions, dispatch),
    })
)(SubmitResumeContainer);

