
import React, { Component } from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'; 
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { bindActionCreators } from 'redux';
import * as applyActions from 'modules/apply';
import * as authActions from 'modules/auth';
import * as menuActions from 'modules/menu';
// import * as menuActions from 'modules/menu';
import axios from 'axios';
import storage from 'lib/storage';
import {dateFormat, dateBarFormat} from 'lib/dateFormat';
import closest from 'lib/closest';
import devtest from 'lib/devtest';

import isMobilePhone from 'validator/lib/isMobilePhone';

import { RegistBasicInfo, 
        RegistDegreeInfo,
        RegistExtraCert } from 'components';

import  Stepbar from 'components/block/Stepbar'

import Script from 'react-load-script';


//step 4 단계
class RegistForm extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            stepIndex: "3",
            userInfo :{
                serialNumber : "",
                applyUserId: "",
                applyStatus:""
            },
            //////////////////////////////
            savedYn: false,
            addressSearchPopup: false,
            code:{
                nationalityCode:[],
                degreeCode: [],
                graduStatusCode: []

            },
            basicInfo: { //지원자 기본정보
                serialNumber:"",
                applyUserId:"",
                applyName:"",
                applyNationality:"대한민국",
                applyBirth:"",
                applyGender:"",
                applyPhone:"",
                applyAddress:"",
                // applyAddressDetail:"",
                applyStatus:"3",
                disabilityYn:"",
                militaryYn:"",
                veteransYn:""
            },
            degreeInfoArr : [ //지원자 학력정보 고등학교는 필수
                    {
                        serialNumber:"",
                        applyUserId:"",
                        educationSeq:"1",
                        degree:"",
                        graduStatus:"",
                        enterDateInfo:"",
                        graduDateInfo:"",
                        schoolName:"",
                        major:"",
                        minor:"",
                        doubleMajor:"",
                        grade:"",
                        perfectGrade:"",
                        transferYn1:"아니오",
                        mainCampusYn1:"본교"
                    }
                    
            ], 

            extraCertArr: [] //지원자 추가 자격정보 (선택사항)
        }
    }


    //스텝바에서 클릭
    //스텝바클릭 제거
    handleStepClick = (e) => {

        const { userInfo } = this.state;
        const stepClickIndex = parseInt(e.target.getAttribute("data-step"));
        // console.log("step", e.target.getAttribute("data-step"));

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


    //처음에 들어오자마자 유저의 apply status를 체크
    checkUserStep = () => {

        const self = this;
        const { ApplyActions, MenuActions, AuthActions } = this.props; 
        const serialNumber = storage.getSerialNumber();

        //console.log("들어가자마자 토큰", storage.getToken())
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
                        storage.setSessionObj(res.headers);
                        // 현재 저장상태가 7 일경우 (제출완료) 
                        if(parseInt(res.data.applyStatus) == 7){
                            alert("최종 제출을 완료하신 전형입니다. 마이페이지로 이동합니다.");
                            self.props.history.push("/mypage");
                        }
                        // 현재 저장상태가 url에 입력된 step보다 클때 && 입력된 step은 2 이상이어야함 (본인인증이 완료된경우 그전으로 돌아갈수 없음)
                        else if(parseInt(res.data.applyStatus) >= parseInt(urlStep)  && parseInt(urlStep) > 2 ){
                            // console.log("여기얌.");
                            ApplyActions.setApplyStatus(res.data.applyStatus);
                            self.getMetaData(res.headers);
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


    componentWillMount = () => {
        //select option용 code-value 조회
        this.checkUserStep()
        
    }


    getMetaData = (header) => {

        this.getCodeValue();

        //login 정보 세팅
        let basicTemp = this.state.basicInfo;
        let degreeInfoTemp = this.state.degreeInfoArr;

        basicTemp["serialNumber"] = storage.getSerialNumber(); //this.props.serialNumber;
        basicTemp["applyUserId"] = storage.getUserInfo();
        
        degreeInfoTemp[0]["serialNumber"] = storage.getSerialNumber();
        degreeInfoTemp[0]["applyUserId"] = storage.getUserInfo();

        this.setState({
            basicInfo: basicTemp,
            degreeInfoArr: degreeInfoTemp
        });

        const { basicInfo } = this.state;
        const self = this;

        const { AuthActions, MenuActions } = this.props;
        // console.log("regist component()1", storage.getToken())

        //유저가 저장되어 있는지 아닌지 체크.
        //self.getApplyContent();
        axios({
            url: devtest() + `/apply/userCheck/${basicInfo.serialNumber}`, 
            method : 'get',
            headers: { "Pragma": 'no-cache',
                       "x-access-token": header.newtoken }
        }).then(
            (res) => {
                // console.log("getMetaData", res.headers)
                // storage.setSessionObj(res.headers);
                const savedYn = res.data.row === "0" ? false : true ;
                //0 인경우 신규유저(false), 아닌경우 저장된 유저(true).
                
                this.setState({ savedYn });

                if(savedYn){ //저장된 경우 기존 정보 가져와서 세팅한다.
                    self.getApplyContent(res.headers);
                }else{
                    //신규유저일경우 아무일 X. 
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

    getCodeValue = () => {

        const { code } = this.state;

        axios({
            url: devtest() +  `/commonCode/NATIONALITY/S`,
            method : 'get',
            headers: { Pragma: 'no-cache'}
        }).then(
            (res)=>{
                if(res.data){
                    //console.log("국적코드조회", res.data)
                    code["nationalityCode"] = res.data;
                    this.setState({
                        code
                    })
                }
            }
        ).catch(
            (err)=>{ if(err) console.log("코드 get err", err.response); }
        )

        axios({
            url: devtest() +  `/commonCode/DEGREE/S`,
            method : 'get',
            headers: { Pragma: 'no-cache'}
        }).then(
            (res)=>{
                if(res.data){
                    //console.log("국적코드조회", res.data)
                    code["degreeCode"] = res.data;
                    this.setState({
                        code
                    })
                }
            }
        ).catch(
            (err)=>{ if(err) console.log("코드 get err", err.response); }
        )

        axios({
            url: devtest() +  `/commonCode/GRADU_STATUS/S`,
            method : 'get',
            headers: { Pragma: 'no-cache'}
        }).then(
            (res)=>{
                if(res.data){
                    //console.log("국적코드조회", res.data)
                    code["graduStatusCode"] = res.data;
                    this.setState({
                        code
                    })
                }
            }
        ).catch(
            (err)=>{ if(err) console.log("코드 get err", err.response); }
        )


    }


    //주소검색
    addressSearch = () => {

        const { basicInfo } = this.state;
        const self = this;
        // this.setState({basicInfo});

        daum.postcode.load(function(){
            new daum.Postcode({
                oncomplete: function(data) {
                    if(data) {
                        alert("이후 상세주소는 직접입력 바랍니다");
                        if(data.userSelectedType==="J"){
                            basicInfo["applyAddress"] = data.jibunAddress;
                            self.setState({basicInfo});
                        }
                        if(data.userSelectedType==="R"){
                            basicInfo["applyAddress"] = data.roadAddress;
                            self.setState({basicInfo});
                        }
                    }
                    //console.log(data)
                }
            }).open();
        });


        
    }


    //저장된 경우 내용을 가져옴
    getApplyContent = (header) => {
        this.getBasicInfo(header); //기본정보
        //this.getDegreeInfoArr(); //학력정보
        //this.getExtraCertArr(); //추가자격증정보
    }


    //기본정보 가져오기
    getBasicInfo = (header) => {
        const { basicInfo } = this.state; 
        const { ApplyActions } = this.props;

        const self = this;

        const { AuthActions, MenuActions } = this.props;
        // console.log("기본정보 req 전", storage.getToken())

        axios({
            url:devtest() +  `/apply/${basicInfo.serialNumber}`,
            method : 'get',
            headers: {  "Pragma": 'no-cache',
                        "x-access-token": header.newtoken }
        }).then(
            (res)=>{
                if(res.data){
                    //console.log("기본정보 가져옴", res.headers)
                    // console.log("기본정보 res", res.headers)
                    //storage.setSessionObj(res.headers);
                    let phoneNumber = res.data.applyPhone; //     const number1 = number.substring(0, 3);

                    res.data["applyPhone"] = phoneNumber.length == 0 ? "" : phoneNumber.substring(0, 3) + "-" + phoneNumber.substring(3, 7) + "-" + phoneNumber.substring(7, 11);
                    ApplyActions.setApplyInfo(res.data);
                    //console.log(res)
                    this.setState({
                        basicInfo: this.props.basicInfo
                    })
                    self.getDegreeInfoArr(res.headers);

                    // self.getDegreeInfoArr(); //학력정보
                    //console.log(res.data)
                }
                
            }
        )
        .catch((err)=>{
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
        })

    }

    //학력정보 가져오기
    getDegreeInfoArr = (header) => {

        const { basicInfo } = this.state; 
        const { ApplyActions, AuthActions, MenuActions } = this.props;

        const self = this;

        // console.log("학력정보 req 전", storage.getToken())


        axios({
            url:devtest() +  `/applyEducation/${basicInfo.serialNumber}`, 
            method : 'get',
            headers: {  "Pragma": 'no-cache',
            "x-access-token":  header.newtoken }
        }).then(
            (res)=>{
                if(res.data){
                    //console.log("학력정보 결과",res.data)
                    //storage.setSessionObj(res.headers);
                    if(res.data.length == 0){

                        const degreeInfoArr = [ //지원자 학력정보 고등학교는 필수 -> 무조건 넣는다
                                            {
                                                serialNumber: basicInfo.serialNumber,
                                                applyUserId: basicInfo.applyUserId,
                                                educationSeq:"1",
                                                degree:"고등학교",
                                                graduStatus:"졸업",
                                                enterDateInfo:"",
                                                graduDateInfo:"",
                                                schoolName:"",
                                                major:"",
                                                minor:"",
                                                doubleMajor:"",
                                                grade:"",
                                                perfectGrade:"",
                                                transferYn1:"아니오",
                                                mainCampusYn1:"본교",
                                            }
                                ];

                        ApplyActions.setDegreeInfo(degreeInfoArr);
                        this.setState({
                            degreeInfoArr
                        })
                    }else{

                        //본교/캠퍼스 , 편입여부 radio name과 state의 mainCampusYn, transferYn을 동일형태로 넣어주기 위함.
                        let degreeAfter = []; //_.cloneDeep(res.data);
                        res.data.forEach((obj,idx) => {
                            const transferVal = obj.transferYn;
                            const mainCampusVal = obj.mainCampusYn;
                            obj[`transferYn${obj.educationSeq}`] = transferVal;
                            obj[`mainCampusYn${obj.educationSeq}`] = mainCampusVal;
                            degreeAfter.push(obj)
                        })

                        //위 작업을 지나면 degreeInfo에는 transferYn 과 transterYn${educationSeq} 형태의 두가지가
                        //존재하게됨. 하지만 실제로 사용하는 애는 후자이므로. 아래 validation에서 transferYn는 빼고체크함
                        
                        ApplyActions.setDegreeInfo(degreeAfter);
                        this.setState({
                            degreeInfoArr: degreeAfter
                        })
                    }
                    self.getExtraCertArr(res.headers); //추가자격증정보
                    //console.log(res.data)
                   //storage.setSessionObj(res.headers);
                    // return 
                }

            }
        ).catch((err)=>{
            // if(err) console.log("에러발생", err.response)
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
        })


    }

    //자격증정보 가져오기
    getExtraCertArr = (header) => {

        const { basicInfo } = this.state; 
        const { ApplyActions, MenuActions, AuthActions } = this.props;

        const self = this;

        // console.log("자격증정보 req 전", storage.getToken())

        axios({
            url:devtest() +  `/applyCertificate/${basicInfo.serialNumber}`, 
            method : 'get',
            headers: {  "Pragma": 'no-cache',
                        "x-access-token": header.newtoken }
        }).then(
            (res)=>{
                if(res.data){
                    // console.log("자격증정보 결과", res.headers)
                    //storage.setSessionObj(res.headers);
                    storage.setSessionObj(res.headers);
                    //console.log("자격증정보",res)
                    ApplyActions.setCertInfo(res.data);
                    this.setState({
                        extraCertArr: this.props.extraCertArr
                    })

                    //storage.setSessionObj(res.headers);

                }

            }
        )
        .catch((err)=>{
           // if(err) console.log("알수없는 에러발생", err.response)
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
        })

    }


    //자격증 row 추가
    addRow = () => {
        
        let { extraCertArr } = this.state;
        const { basicInfo } = this.state;

        //맨 마지막 row id +1 해서 keynum을 생성
        let tableTr = null;
        let lastIndex = null;
        let keyNum = null;

        //자격증 추가시 key는 현재 row의 key + 1 하고 String 형태로 생성
        if(extraCertArr.length == 0){
            keyNum = 1;
        }else{
            tableTr = document.getElementById("extraCertTable").tBodies[0].rows; //.length;
            lastIndex = parseInt(tableTr[tableTr.length-1].getAttribute("data-row"));
            keyNum =  lastIndex + 1;
        }
        

        extraCertArr.push({
            "serialNumber":basicInfo.serialNumber,
            "applyUserId":basicInfo.applyUserId,
            "certificateSeq": keyNum.toString() ,
            "certificateContent":"",
            "certificateDate":"",
            "certificateGrade":"",
            "certificateOrganization":"",
        });

        this.setState({
            extraCertArr
        });
    }



    //자격증 row 삭제
    delRow = (e) => {

        const { extraCertArr } = this.state;

        let table = document.getElementById("extraCertTable");
        let groups = table.tBodies;
        let rows = null;

        let checkedRowIds = [];

        //체크박스 체크된 row의 data-row 정보를 읽어와서 arr로 만든 후
        for (var i = 0; i < groups.length; i++) {
            rows = groups[i].rows;
            //console.log(rows)
            for (var j = 0; j < rows.length; j++) {
              if(rows[j].cells[0].children[0] && rows[j].cells[0].children[0].checked){
                    checkedRowIds.push(parseInt(rows[j].getAttribute("data-row")));
              }
            }
        }


        if(checkedRowIds.length==0){
            alert("선택된 항목이 없습니다.");
            return;
        }
        else{

        let extraCertArrTemp = _.cloneDeep(extraCertArr);

        //위에서 만든 체크 선택 arr의 id를 돌면서 match되는 애들을 remove 한다.
        extraCertArr.forEach(
            (obj, idx)=>{
                //console.log(obj)
                checkedRowIds.forEach(
                    (obj2, idx2) => {
                        if(obj.certificateSeq == obj2){
                            
                            _.remove(extraCertArrTemp, function(obj){
                                return obj.certificateSeq == obj2
                            })
                            //console.logconsole.log(extraCertArrTemp)
                            
                        }
                    }
                )
                
            }
        )

         this.setState({
             extraCertArr:extraCertArrTemp
         });

        }

    }

    //추가 자격 내용입력 (input text type)
    handleCertInputChange = (e) => {

        const { extraCertArr } = this.state;
        const index = parseInt(e.target.parentElement.parentElement.getAttribute("data-row"))
        const arrIndex = _.findKey(extraCertArr, function(el) { return el.certificateSeq == index; });

        extraCertArr[arrIndex][e.target.name] = e.target.value;

        this.setState({
            extraCertArr
        })

    }

    //저장 클릭
    handleSaveClick = (e) => {

        const { basicInfo, 
                savedYn,
                degreeInfoArr,
                extraCertArr } = this.state;
        const { ApplyActions, MenuActions, AuthActions } = this.props;

        const tempPara = e.currentTarget.getAttribute("data-temp");
        const self = this;

        if(degreeInfoArr.length==0){
            alert("고등학교 학력은 필수입력입니다.")
            return;
        }


        //신규유저일 경우 저장 post 로직, 기존유저일 경우 수정 put 로직
        axios({
            url: savedYn ? devtest() + `/personalInfo/${basicInfo.serialNumber}`  : devtest() + '/personalInfo/',
            method : savedYn ? 'put' : 'post',
            data : { basicInfo, degreeInfoArr, extraCertArr },
            headers: { "Pragma" : 'no-cache' ,
                        "x-access-token": storage.getToken()  }
        }).then(
            (res) => {
                // console.log('저장 후 받은 리턴', res)
                storage.setSessionObj(res.headers);
                const returnData = res.data;
                ApplyActions.setApplyInfo(returnData);
                if(tempPara==="temp") { 
                    alert("저장되었습니다."); 
                }
                else {
                    self.goNextStep();
                }
                
            }
        ).catch(
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

    //기본정보 변경 입력 (input text type)
    handleBasicInfoChange = (e) => {
        const { basicInfo } = this.state;
        basicInfo[e.target.name] = e.target.value;
        this.setState({basicInfo});
    }

    //학력정보 변경 입력 (input text type)
    handleDegreeInfoChange = (e) => {

        const { degreeInfoArr } = this.state;

        const index = closest(e, "table").getAttribute("data-tbl"); 
        const arrIndex = _.findKey(degreeInfoArr, function(el) { return el.educationSeq == index; });

        degreeInfoArr[arrIndex][e.target.name] = e.target.value;

        this.setState({
            degreeInfoArr
        })
        
    }

    //다음단계 버튼
    goNextStep = () => {
        this.handleNextClick();
    }

    //개인 기본정보 입력 및 학력정보 validation
    validationCheck = (e) => {
        
        const { basicInfo, degreeInfoArr } = this.state;

        //console.log("basicInfo", basicInfo)
        //console.log("degreeInfoArr", degreeInfoArr)

        //개인정보 

        if(basicInfo.applyUserId.length == 0){
            alert("개인정보의 필수입력중 아이디가 입력되지 않았습니다");
            return;
        }
        if(basicInfo.applyName.length == 0){
            alert("개인정보의 필수입력중 성명이 입력되지 않았습니다");
            return;
        }
        if(basicInfo.applyNationality.length == 0){
            alert("개인정보의 필수입력중 국적이 입력되지 않았습니다");
            return;
        }
        if(basicInfo.applyBirth.length == 0){
            alert("개인정보의 필수입력중 생년월일이 입력되지 않았습니다");
            return;
        }
        if(basicInfo.applyPhone.length == 0){
            alert("개인정보의 필수입력중 전화번호가 입력되지 않았습니다");
            return;
        }
        if(basicInfo.applyAddress.length == 0){
            alert("개인정보의 필수입력중 주소가 입력되지 않았습니다");
            return;
        }
        if(basicInfo.veteransYn.length == 0){
            alert("개인정보의 필수입력중 보훈대상여부가 입력되지 않았습니다");
            return;
        }

            
        if(basicInfo.applyPhone.length !== 0 && 
            ( !isMobilePhone(basicInfo.applyPhone, 'ko-KR') 
                || !new RegExp( /^[0-9]{3}[-]+[0-9]{4}[-]+[0-9]{4}$/ ).test(basicInfo.applyPhone) 
                // || !new RegExp( /^[0-9]{3}[-]+[0-9]{3}[-]+[0-9]{4}$/ ).test(basicInfo.applyPhone) 
             )
          ){
            alert("올바른 전화번호 형식이 아닙니다 (010-1234-5678)");
            return;
        }

        //학력정보
        for( let i = 0; i < degreeInfoArr.length; i++){
            if(degreeInfoArr[i].educationSeq==="1"){

                if (degreeInfoArr[i].graduStatus.length == 0){
                    alert("고등학교 학력사항 필수입력 중 졸업상태가 입력되지 않았습니다");
                        return;
                }
                if (degreeInfoArr[i].enterDateInfo.length == 0){
                    alert("고등학교 학력사항 필수입력 중 입학날짜가 입력되지 않았습니다");
                        return;
                }
                if (degreeInfoArr[i].graduDateInfo.length == 0){
                    alert("고등학교 학력사항 필수입력 중 졸업날짜가 입력되지 않았습니다");
                        return;
                }
                if (degreeInfoArr[i].schoolName.length == 0){
                    alert("고등학교 학력사항 필수입력 중 학교가 입력되지 않았습니다");
                        return;
                }

            } else {
               
                    if (degreeInfoArr[i].degree.length == 0){
                        alert("추가한 학력사항 필수입력 중 학력이 입력되지 않았습니다");
                            return;
                    }
                    if (degreeInfoArr[i].graduStatus.length == 0){
                        alert("추가한 학력사항 필수입력 중 졸업상태가 입력되지 않았습니다");
                            return;
                    }
                    if (degreeInfoArr[i].graduStatus==="졸업" && degreeInfoArr[i].graduDateInfo.length == 0){
                        alert("추가한 학력사항의 졸업상태가 졸업일 경우 졸업날짜는 필수입력입니다");
                            return;
                    }
                    if (degreeInfoArr[i].graduStatus==="졸업예정" && degreeInfoArr[i].graduDateInfo.length == 0){
                        alert("추가한 학력사항의 졸업상태가 졸업예정일 경우 졸업예정날짜는 필수입력입니다");
                            return;
                    }
                    if (degreeInfoArr[i].enterDateInfo.length == 0){
                        alert("추가한 학력사항 필수입력 중 입학날짜가 입력되지 않았습니다");
                            return;
                    }
                    
                    if (degreeInfoArr[i].schoolName.length == 0){
                        alert("추가한 학력사항 필수입력 중 학교가 입력되지 않았습니다");
                            return;
                    }
                    if (degreeInfoArr[i]["mainCampusYn" + degreeInfoArr[i].educationSeq].length == 0){
                        alert("추가한 학력사항 필수입력 중 본교/캠퍼스 여부가 입력되지 않았습니다");
                            return;
                    }
                    if (degreeInfoArr[i].major.length == 0){
                        alert("추가한 학력사항 필수입력 중 전공이 입력되지 않았습니다");
                            return;
                    }
                    if (degreeInfoArr[i].grade.length == 0){
                        alert("추가한 학력사항 필수입력 중 학점이 입력되지 않았습니다");
                            return;
                    }
                    if (degreeInfoArr[i].perfectGrade.length == 0){
                        alert("추가한 학력사항 필수입력 중 최대학점이 입력되지 않았습니다");
                            return;
                    }
                    if (degreeInfoArr[i]["transferYn"+degreeInfoArr[i].educationSeq].length == 0){
                        alert("추가한 학력사항 필수입력 중 편입여부가 입력되지 않았습니다");
                            return;
                    }

            }



        }


        if(confirm("저장 후 다음 단계로 이동합니다.")){
            //세이브로직 추가
            this.handleSaveClick(e);
            //this.goNextStep();
        }

    }

    //학력정보 추가 시
    addSchoolTbl = () => {

        //key는 educationseq의 max + 1로 한다
        const sorted = _.sortBy(this.state.degreeInfoArr, function(obj){
            return !obj.educationSeq
        }).reverse();

        //console.log(sorted[0].educationSeq)
        const seq = (parseInt(sorted[0].educationSeq) + 1).toString();

        const { basicInfo } = this.state;

        const degreeData = {
            serialNumber: basicInfo.serialNumber,
            applyUserId: basicInfo.applyUserId,
            educationSeq: seq,
            degree:"",
            graduStatus:"",
            enterDateInfo:"",
            graduDateInfo:"",
            schoolName:"",
            major:"",
            minor:"",
            doubleMajor:"",
            grade:"",
            perfectGrade:"",
        }

        //본/캠여부 및 편입여부(radio)는 name 기준 radio로 동작하므로 seq를 name 명칭에 넣어서 넣어줌 (테이블 그릴때도 역시 동일하게)
        degreeData[`transferYn${seq}`] = "";
        degreeData[`mainCampusYn${seq}`] = "";
        
        // console.log(degreeData)
        let degreeState = _.cloneDeep(this.state.degreeInfoArr);
        degreeState.push(degreeData)

        this.setState({
            degreeInfoArr: degreeState
        })

    }

    //학력정보 삭제시
    delSchoolTbl = () => {

        const { degreeInfoArr } = this.state;

        let table = document.getElementsByClassName("schoolTbl"); //.id;
        let tableArr = _.values(table);

        let checkedTblIds = [];


        tableArr.forEach((obj,idx)=>{
            if(obj.childNodes[1].rows[0].cells[0].children[0] && obj.childNodes[1].rows[0].cells[0].children[0].checked)
                checkedTblIds.push(parseInt(obj.getAttribute("data-tbl")))
        })


        if(checkedTblIds.length==0){
            alert("선택된 항목이 없습니다.");
            return;
        }

        
        let degreeInfoTemp = _.cloneDeep(degreeInfoArr);

        degreeInfoArr.forEach(
            (obj, idx)=>{
                //console.log(obj)
                checkedTblIds.forEach(
                    (obj2, idx2) => {

                        if(obj.educationSeq == obj2){
                            _.remove(degreeInfoTemp, function(obj){
                                return obj.educationSeq == obj2
                            })
                            
                        }
                    }
                )
                
            }
        )

        this.setState({
            degreeInfoArr:degreeInfoTemp
        })

    }


    //React Date picker 사용으로 해당 date picker 변경시 로직은 아래 형태

    //개인 기본정보 생년월일 변경시
    handleChangeBirth = (res, e) => {
        const { basicInfo } = this.state;
        //console.log("res", res)
        basicInfo["applyBirth"] = dateFormat(res);
        this.setState({basicInfo});
    }

    //학력정보 입학/졸업 변경시
    handleChangeDegreeDate = (res, e) => {
        //console.log("resres", res)
        const { degreeInfoArr } = this.state;
        const index = closest(e, "table").getAttribute("data-tbl");
        const targetNm = closest(e, "td").getAttribute("name");

        const arrIndex = _.findKey(degreeInfoArr, function(el) { return el.educationSeq == index; });

        degreeInfoArr[arrIndex][targetNm] = dateFormat(res);

        this.setState({
            degreeInfoArr
        })

    }

    //자격증 취득날짜 변경시
    handleChangeCertDate = (res, e) => {
        const { extraCertArr } = this.state;
        const index = parseInt(closest(e, "tr").getAttribute("data-row"));
        const targetNm = closest(e, "td").getAttribute("name");
        const arrIndex = _.findKey(extraCertArr, function(el) { return el.certificateSeq == index; });

        extraCertArr[arrIndex][targetNm] = dateFormat(res);

        this.setState({
            extraCertArr
        })

    }


    render() { 
        
        const { addRow, 
                delRow, 
                handleCertInputChange,
                handleSaveClick,
                handleBasicInfoChange,
                handleDegreeInfoChange,
                validationCheck,
                addSchoolTbl,
                delSchoolTbl,
                handleChangeBirth,
                handleChangeDegreeDate,
                handleChangeCertDate,
                clickCheck,
                addressSearch,
                addressCallback,

                handleStepClick, 
                handleNextClick,
                handlePrevClick,
                pageMoveTo


                 } = this;


                 const { applyStatus } = this.props;

        const { basicInfo,
                degreeInfoArr,
                extraCertArr,
                code,
                addressSearchPopup , stepIndex } = this.state;

        return ( 
            <div className="sub-contents">
            <div className="sub-container">
                <Stepbar stepIndex={stepIndex} handleStepClick={handleStepClick} applyStatus={applyStatus} pageMoveTo={pageMoveTo}/>
                
                <div className="sub-info">
                    <h3 className="sub_heading_3dep_2">STEP4 개인정보 입력</h3>
                    <span className="annotate"><span className="asterisk">*</span>는 <span className="asterisk">필수입력</span>사항입니다</span>
                </div>
                <div className="clear"></div>
            
                <div className="sub_box">
                    <div className="apply_step4">
                        <div className="apply_step4_list">
                            {/* /////////////////////////////////////////////////////////////////// */}
                            <div>
                                <div className="apply_step4_table_title" id="basicInfoTitle">개인정보</div>
                                <RegistBasicInfo basicInfo={basicInfo} 
                                                code={code} 
                                                handleBasicInfoChange={handleBasicInfoChange}
                                                handleChangeBirth={handleChangeBirth} 
                                                addressSearch={addressSearch}/>
                            </div>
                            {/* /////////////////////////////////////////////////////////////////// */} 
                            <div className="apply_step4_table_area">                              
                                <div className="apply_step4_table_title">학력사항<span>고등학교(필수)부터 최종학력까지 입력<br/>※ 대학교 재학중인 지원자는 졸업예정날짜를 포함한 대학정보를 필수로 등록바랍니다</span></div>
                                <RegistDegreeInfo addSchoolTbl={addSchoolTbl} 
                                                delSchoolTbl={delSchoolTbl} 
                                                degreeInfoArr={degreeInfoArr}
                                                handleDegreeInfoChange={handleDegreeInfoChange}
                                                code={code}
                                                handleChangeDegreeDate={handleChangeDegreeDate} />
                            </div>
                            {/* /////////////////////////////////////////////////////////////////// */}
                            <div className="apply_step4_table_area">
                                <div className="apply_step4_table_title">자격증(선택)</div>
                                <RegistExtraCert addRow={addRow}
                                                delRow={delRow}
                                                handleCertInputChange={handleCertInputChange}
                                                handleChangeCertDate={handleChangeCertDate}
                                                extraCertArr={extraCertArr}
                                                clickCheck={clickCheck}
                                                    />
                            </div> 
                            {/* /////////////////////////////////////////////////////////////////// */}
                        </div>  
                    </div>
                </div>

                <div className="page_btn_area">
                    <div className="page_btn_box">
                    <a className="btn_full_save gt-f-l margin_right_20" data-temp="temp" onClick={handleSaveClick}>중간저장</a>
                    <a className="btn_full_next gt-f-l" onClick={validationCheck}>다음단계</a>
                    <div className="clear"></div>
                    </div>
                </div>
           
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
    //props로 넣어줄 스토어 상태값
    
    (state) => ({
        serialNumber:  state.apply.get('serialNumber'),
        basicInfo: state.apply.get('basicInfo'),
        degreeInfoArr: state.apply.get('degreeInfoArr'),
        extraCertArr: state.apply.get('extraCertArr'),
        isLogin: state.auth.get('isLogin'),
        userId: state.auth.get('userId'),
        userType: state.auth.get('userType'),
        applyStatus: state.apply.get('applyStatus')
    })
    //props로 넣어줄 액션 생성함수
    , (dispatch) => ({
        ApplyActions : bindActionCreators(applyActions, dispatch),
        AuthActions: bindActionCreators(authActions, dispatch),
        MenuActions : bindActionCreators(menuActions, dispatch)
    })
)(RegistForm);

