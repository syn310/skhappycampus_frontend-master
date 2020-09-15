import React, { Component } from 'react';
import { Approval } from 'components'
import  Stepbar from 'components/block/Stepbar'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from  'axios'; 
import storage from 'lib/storage';
import devtest from 'lib/devtest';
import * as applyActions from 'modules/apply';
import * as menuActions from 'modules/menu';
import * as authActions from 'modules/auth';
import sha256 from 'crypto-js/sha256';

var stompClient = null;

class ApprovalContainer extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            stepIndex: "2" ,
            userInfo :{
                serialNumber:"",
                applyUserId: ""
            },
            encData:"",
            btnShow: true,
            showingMsg:""
            
         }
    }


    componentDidMount = (e) => {

        //this.checkUserStep(e);

        //window.addEventListener("message", this.receiveMessage, false);
 /*     const userId = sha256(storage.getUserInfo());
        
       const Stomp = require("stompjs/lib/stomp.js").Stomp
       var SockJS = require('sockjs-client') 

        SockJS = new SockJS('https://www.skhappycampus.com/auth/sv-websocket?token='+ userId)
		//SockJS = new SockJS('http://10.178.219.10:30591/auth/sv-websocket?token='+ userId)
		//SockJS = new SockJS('https://www.skhappycampus.com/auth/sv-websocket?token='+ userId)
        //SockJS = new SockJS('http://localhost:8081/sv-websocket?token='+userId) 

    	stompClient = Stomp.over(SockJS); 
        stompClient.connect({}, this.onConnected, this.onError); 
*/ 
        const self = this;

        this.checkUserStep(e);
    }

    onConnected = () => { 
        const self = this;
        const userId = sha256(storage.getUserInfo());  

        stompClient.subscribe('/topic/greetings/' + userId, function (data) {
            const res = data.body
            if(res){

                if(res==="S"){
                    self.setState({
                        btnShow: false,
                        showingMsg: "본인인증이 완료되었습니다."
                    })
                }
                else if(res==="F"){
                    self.setState({
                        btnShow: true,
                        showingMsg: "본인인증이 실패하였습니다."
                    })
                }
                else if(res==="D"){
                    self.setState({
                        btnShow: false,
                        showingMsg: "현재 계정정보로 인증한 이력이 있습니다."
                    })
                }
                else if(res==="A"){
                    self.setState({
                        btnShow: false,
                        showingMsg: "지원할 수 있는 연령이 아닙니다 (만 14세 이상 34세 이하만 지원)"
                    })
                }
                else if(res==="N"){
                    self.setState({
                        btnShow: false,
                        showingMsg: "대한민국 국적자만 지원가능 합니다."
                    })
                }
                else{
                    self.setState({
                        btnShow: false,
                        showingMsg: "다른 계정정보로 인증한 이력이 있습니다."
                    })
                }

            }
            //console.log("상태로그~~ : " + res);
        });
    } 
         
    onError = (error) => { 
        alert("인증서버 연결이 정상작동하지 않습니다. 시스템 담당자에게 문의하세요.");
        return;
    } 
        



    checkUserStep = (e) => {

        const self = this;
        const { ApplyActions, MenuActions, AuthActions } = this.props; 
        const serialNumber = storage.getSerialNumber();

        // console.log("serialNumber", typeof serialNumber, serialNumber)
        if(serialNumber==="null") {
            alert("잘못된 접근입니다. 공고정보가 존재하지 않습니다.");
            this.props.history.push("/recruit");
        }else {

        MenuActions.setClickMenu("/recruit");
        const urlStep = window.location.href.split("/apply/step")[1];
        
        let userTemp = this.state.userInfo;
        userTemp["serialNumber"] = serialNumber; //this.props.serialNumber;
        userTemp["applyUserId"] = storage.getUserInfo();

        this.setState({
            userInfo: userTemp
        })

        //console.log("asdfasfasdf", urlStep)

        axios({
            url: devtest() +`/apply/${serialNumber}`, ///${applyUserId}`,
            method : 'get',
            //data : { basicInfo },
            headers: { "Pragma": 'no-cache', "x-access-token": storage.getToken() }
        }).then(
            (res)=>{
                //console.log("유저상태", res.data)
                    if(res.data.applyStatus){
                        this.timer = null;
                        //현재 step과 url입력 step이 같을 경우 
                        storage.setSessionObj(res.headers);
                        // console.log("유저상태체크", res.data.applyStatus, typeof res.data.applyStatus)
                        if(parseInt(res.data.applyStatus) == 7){
                            alert("최종 제출을 완료하신 전형입니다. 마이페이지로 이동합니다.");
                            self.props.history.push("/mypage");
                        }

                        else if(parseInt(res.data.applyStatus) == parseInt(urlStep)  && parseInt(urlStep) == 2 ){
                            // self.settingUserInfo();
                            ApplyActions.setApplyStatus(res.data.applyStatus);
                            //self.getNiceAuthData(e);
                            self.getApprovalDuple(e);
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
        )
    }

    }




    getApprovalDuple = (e) => {

        const self = this;
        let btnPara = "";
        if(e) btnPara = e.target.getAttribute("data-btn");
        const { ApplyActions, MenuActions, AuthActions } = this.props; 

        // Y : 다른아이디로 본인인증 된 경우 (본인인증은 핸드폰번호로 함)
        // N : 현재 아이디로 인증이 된 경우
        // X : 인증되지 않은 경우

        axios({
            method:"get",
            url:devtest() +"/authNice/" + this.state.userInfo.serialNumber,
            headers: {  "Pragma": 'no-cache',
                        "x-access-token": storage.getToken() }
        }).then(
            (res)=>{
                if(res.data){
                    //console.log("rdddd", res.data)
                    storage.setSessionObj(res.headers);
                    if(btnPara!=="next"){
                            if(res.data==="Y"){
                                self.setState({
                                    btnShow: false,
                                    showingMsg:"동일한 공고에 중복지원 할 수 없습니다. 기존에 인증받은 아이디로 로그인하세요."
                                })
                            }
                            if(res.data==="N"){
                                self.setState({
                                    btnShow: false,
                                    showingMsg:"본인인증이 완료되었습니다."
                                })
                            }
                            if(res.data==="X"){
                                self.setState({
                                    btnShow: true
                                })
                            }
                        }
                    else {
                        if(res.data==="Y"){
                            alert("동일한 공고에 중복지원 할 수 없습니다.\n기존에 인증받은 아이디로 로그인하세요.")
                            return;
                        }
                        if(res.data==="N"){
                            alert("저장 후 다음단계로 이동합니다");
                            self.handleNextClick(e);
                        }
                        if(res.data==="X"){
                            alert("모집 대상이 아니시거나, 본인인증이 필요한 아이디입니다");
                            return;
                        }

                    } 
                }
                // console.log(res.data)
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

    }



    getNiceAuthData = () => {

        const self = this;

        const { AuthActions, MenuActions } = this.props;
        //nice 정보 가져오기
        axios({
            method:"post",
            //url:"/nice/", //개발용
            url:"https://www.skhappycampus.com/auth/nice/", //운영용
            // headers: {  "Pragma": 'no-cache',
            //             "x-access-token": storage.getToken() },
            data:{
                "applyUserId":this.state.userInfo.applyUserId,
                "serialNumber":this.state.userInfo.serialNumber
            }
        }).then(
            (res)=>{
                if(res){
                    //console.log("res", res)
                    self.setState({
                        encData: res.data.encData || "",
                    })
                    //storage.setSessionObj(res.headers);
                    this.approvalClick()
                    // console.log(res.data)
                }
                
            }
        ).catch(
            (err)=>{
                if(err.response.status==401){
                    /**/
                    alert("잘못된 로그인 정보입니다. 로그인 페이지로 이동합니다.");
                    storage.removeSessionObj();
                    storage.removeSerialNumber();
                    //store의 login데이터 reset
                    MenuActions.setClickMenu("/login");
                    AuthActions.logout();
                    self.props.history.push("/login");

                }
                else {
                    alert("NICE 인증키 로드 시 오류가 발생했습니다. 시스템 담당자에게 문의하세요.")
                    console.log("encData get err", err.response)
                }
            }
        )

    }


    //스텝바에서 클릭
    //step1(자격조사) ~ step3(본인인증) 단계까지는 step bar 비활성화
    handleStepClick = (e) => {
        //console.log("step", e.target.getAttribute("data-step"))
        //this.props.history.push("/apply/step"+e.target.getAttribute("data-step"))
    }


    //다음 단계 클릭
    handleNextClick = (e) => {
        //console.log("container에서 실행")
        let { stepIndex, userInfo } = this.state;
        let nextStepIndex = parseInt(stepIndex) + 1;
        
        const self = this;

        const { AuthActions, MenuActions, applyStatus } = this.props;
        
        // if(parseInt(applyStatus) >= nextStepIndex){
        //     this.props.history.push(`/apply/step${nextStepIndex}`);
        // }
        // else 
        axios({
            url: devtest() + `/apply/updateUserStatus/${userInfo.serialNumber}`, ///${userInfo.applyUserId}`,
            method:"put",
            data: { applyStatus: nextStepIndex.toString() },
            headers: {  "Pragma": 'no-cache',
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

                }
                else{
                    alert("알수없는 에러가 발생했습니다. 시스템 담당자에게 문의하세요.")
                    console.log( err.response);
                }
            }
        )

        // this.props.history.push(`/apply/step${nextStepIndex}`);
    }

    approvalClick = () => {
        // Internet Explorer 6-11
        let isIE = /*@cc_on!@*/false || !!document.documentMode;
        // Chrome 1 - 71
        let isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);

        let dummystr = "";
        if(isChrome) {}
        else if(isIE) {dummystr="dummy"}
        else {}

        //ie의 경우 window open 하지 않음 (blank popup 띄우는 현상 방지)
        if(!isIE) window.open(dummystr, 'popupChk', 'width=500, height=550, top=100, left=100, fullscreen=no, menubar=no, status=no, toolbar=no, titlebar=yes, location=no, scrollbar=no');
        
        document.form_chk.action = "https://nice.checkplus.co.kr/CheckPlusSafeModel/checkplus.cb";
		document.form_chk.target = "popupChk";
        document.form_chk.submit();
        alert("본인인증 완료 후 다음단계 버튼을 클릭해주세요.");
    }

    //다음 클릭시 validation
    // validationCheck = () => {
    //     if(confirm("저장 후 다음 단계로 이동합니다.")){}
        
    // }

    pageMoveTo = (e) => {
        const url = e.target.getAttribute("data-url");
        if(confirm("작성중인 내용이 저장되지 않을 수 있습니다. 이동 전 저장 바랍니다. \n그래도 이동하시겠습니까 ?"))
            this.props.history.push(url);
    }

    render() { 
        const { stepIndex, encData, btnShow, showingMsg } = this.state;
        const { handleStepClick,
                handleNextClick,
                approvalClick, 
                validationCheck, 
                pageMoveTo, 
                getApprovalDuple,
                getNiceAuthData } = this;


        //const resultCode = "0";

        const test = {
            "marginLeft":"auto",
            "marginRight":"auto"
        }
                
 
        return ( 
            <div className="sub-contents">
                <div className="sub-container">
                <Stepbar stepIndex={stepIndex} handleStepClick={handleStepClick} pageMoveTo={pageMoveTo}/>

                <div className="sub-info">
                    <h3 className="sub_heading_3dep_2">STEP3 본인확인</h3>
                </div>
                <div className="clear"></div>

                <div className="sub_box_agreement">
                    <div className="apply_step4">
                    
                    <form name="form_chk" method="post">
                        <input type="hidden" name="m" value="checkplusSerivce" />					
                        <input type="hidden" name="EncodeData" value={encData} />	
                        
                    </form>

                    <input type="hidden" id="approval"/>

                    
                    { 
                        btnShow ? 
                        <div className="btn_full_next" style={test} >
                        <a className="btn_full_next" onClick={getNiceAuthData}>본인인증</a>
                        <div className="clear"></div>
                        </div>
                        :
                        <span>{showingMsg}</span> 
                            
                        
                    }
                    </div>
                </div>

                <div className="page_btn_area_agreement">
                    <div className="page_btn_box">
                        <a className="btn_full_next gt-f-c" data-btn="next" onClick={getApprovalDuple}>다음단계</a>
                        <div className="clear"></div>
                    </div>
                </div>

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
        applyStatus: state.apply.get('applyStatus')
    }), (dispatch) => ({
        ApplyActions : bindActionCreators(applyActions, dispatch),
        MenuActions : bindActionCreators(menuActions, dispatch),
        AuthActions: bindActionCreators(authActions, dispatch),

    })
)(ApprovalContainer);