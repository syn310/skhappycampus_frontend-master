import React, { Component } from 'react';
import {  RegistForm  } from 'components'
import  Stepbar from 'components/block/Stepbar'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from  'axios'; 
import storage from 'lib/storage';
import devtest from 'lib/devtest';

import Script from 'react-load-script';
import * as applyActions from 'modules/apply';
import * as menuActions from 'modules/menu';
import * as authActions from 'modules/auth';

class RegistFormContainer extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            stepIndex: "3",
            userInfo :{
                serialNumber : "",
                applyUserId: "",
                applyStatus:""
            }
         }
    }

    componentWillMount = () => {
        this.checkUserStep()
    }



    checkUserStep = () => {

        const self = this;
        const { ApplyActions, MenuActions, AuthActions } = this.props; 
        const serialNumber = storage.getSerialNumber();

        // console.log("들어가자마자 토큰", storage.getToken())
        if(serialNumber==="null") {
            alert("잘못된 접근입니다. 공고정보가 존재하지 않습니다.");
            this.props.history.push("/recruit");
        }else{

        MenuActions.setClickMenu("/recruit");
        const urlStep = window.location.href.split("/apply/step")[1];

        let userTemp = this.state.userInfo;
        userTemp["serialNumber"] = serialNumber; //this.props.serialNumber;
        userTemp["applyUserId"] = storage.getUserInfo();
        userTemp["applyStatus"] = this.props.applyStatus;

        //console.log("userTemp", userTemp)

        this.setState({
            userInfo: userTemp
        })

        // console.log("asdfasfasdf", urlStep)
        
        axios({
            url: devtest() +`/apply/${serialNumber}`, ///${applyUserId}`,
            method : 'get',
            //data : { basicInfo },
            headers: { "Pragma": 'no-cache', "x-access-token": storage.getToken() }
        }).then(
            (res)=>{
                    if(res.data.applyStatus){
                        //현재 step과 url입력 step이 같을 경우 
                        // console.log("유저확인", res.headers)
                        storage.setSessionObj(res.headers);
                        if(parseInt(res.data.applyStatus) >= parseInt(urlStep)  && parseInt(urlStep) > 2 ){
                            // console.log("여기얌.");
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






    //스텝바에서 클릭
    //스텝바클릭 제거
    handleStepClick = (e) => {

        const { userInfo } = this.state;
        const stepClickIndex = parseInt(e.target.getAttribute("data-step"));
        // console.log("step", e.target.getAttribute("data-step"));
        

        //본인인증 전 단계(0,1,2) 로는 이동불가. 
        //현재 본인 저장 스텝보다 작은 스텝으로는 스텝바클릭 이동가능
        // if( stepClickIndex >= 3 && stepClickIndex <= parseInt(userInfo.applyStatus) ){
        //     this.props.history.push("/apply/step" + e.target.getAttribute("data-step"))
        // }
            
    }

    //이전단계 버튼 클릭
    handlePrevClick = (e) => {

        let { stepIndex, userInfo } = this.state;
        let prevStepIndex = parseInt(stepIndex) - 1;

        this.props.history.push(`/apply/step${prevStepIndex}`);

    }



    //다음단계 버튼 클릭
    handleNextClick = (e) => {
        let { stepIndex, userInfo } = this.state;
        let nextStepIndex = parseInt(stepIndex) + 1;
        
        const self = this;

        const { AuthActions, MenuActions } = this.props;

        // console.log("adfasdfasdfasf", userInfo)
        
        axios({
            url:devtest() + `/apply/updateUserStatus/${userInfo.serialNumber}`, ///${userInfo.applyUserId}`,
            method:"put",
            data: { applyStatus: nextStepIndex.toString() },
            headers: { "Pragma": 'no-cache',
                        "x-access-token": storage.getToken() }
        }).then(
            (res)=>{
                if(res) {
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

                }else{
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
        const { stepIndex } = this.state;
        const { handleStepClick, 
                handleNextClick,
                handlePrevClick,
                pageMoveTo } = this;
        const { applyStatus } = this.props;
        return (
            <div className="sub-contents">
                <div className="sub-container">
                    <Stepbar stepIndex={stepIndex} handleStepClick={handleStepClick} applyStatus={applyStatus} pageMoveTo={pageMoveTo}/>
                    <RegistForm handleNextClick={handleNextClick} handlePrevClick={handlePrevClick}></RegistForm>
                </div>
                {/* 주소검색 api load */}
                <Script
                    url="https://ssl.daumcdn.net/dmaps/map_js_init/postcode.v2.js?autoload=false"
                />
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
)(RegistFormContainer);

