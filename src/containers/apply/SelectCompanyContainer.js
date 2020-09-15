import React, { Component } from 'react';
import { SelectCompany, 
         SelectCompanyPopup,
         CompanyPopup } from 'components'
import Stepbar from 'components/block/Stepbar'
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ApplyActions from 'modules/apply';
import * as companyActions from 'modules/company';
import storage from 'lib/storage';
import devtest from 'lib/devtest';
import * as menuActions from 'modules/menu';
import * as authActions from 'modules/auth';

class SelectCompanyContainer extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            saveYn: false,
            stepIndex: "5",
            priority: "0",
            openPopup: false,
            userInfo: {
                serialNumber:"",
                applyUserId:"",
                applyStatus:""
            },
            company_1:{},
            company_2:{},
            company_3:{},
            companyList: [],
            recommendList: [],
            companyPopup: false,
            clickedCompanyId:"",
            matchFail: false
            
         }

    }


    componentDidMount = () => {

        this.checkUserStep()

    }

    checkUserList = () => {

        const { userInfo } = this.state;
        const self = this;
        const { AuthActions, MenuActions } = this.props;

        //console.log("user", userInfo)
        //유저가 저장되어 있는지 아닌지 체크.
        axios({
            url:devtest() + `/applyCompanyChoice/companyCheck/${userInfo.serialNumber}`, ///${userInfo.applyUserId}`,
            method : 'get',
            headers: { "Pragma" : 'no-cache',
                        "x-access-token": storage.getToken()}
        }).then(function(res){
                //0 인경우 신규유저, 아닌경우 저장된 유저.
                const savedYn = res.data.row === "0" ? false : true ;
                self.setState({savedYn})
                storage.setSessionObj(res.headers);

                if(savedYn) { //저장된 유저
                    self.getMyCompanyList();        
                    
                }else{
                    //신규유저
                    self.getCompanyChoiceList();
                }
        }).catch(function(err){
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



    checkUserStep = () => {

        const self = this;
        const { ApplyActions, MenuActions, AuthActions } = this.props; 
        const serialNumber = storage.getSerialNumber();

        // console.log(serialNumber)

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
        userTemp["applyStatus"] = this.props.applyStatus;
 
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
                        storage.setSessionObj(res.headers);
                        // console.log("유저상태체크", res.data.applyStatus, typeof res.data.applyStatus)
                        if(parseInt(res.data.applyStatus) == 7){
                            alert("최종 제출을 완료하신 전형입니다. 마이페이지로 이동합니다.");
                            self.props.history.push("/mypage");
                        }

                        else if(parseInt(res.data.applyStatus) >= parseInt(urlStep)  && parseInt(urlStep) > 2 ){
                            ApplyActions.setApplyStatus(res.data.applyStatus);
                            this.checkUserList();
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



    //추천회사 3개 가져옴.
    getRecommendList = () => {

        const { userInfo } = this.state;
        const self = this;
        const { AuthActions, MenuActions } = this.props;

        axios({
            url: devtest() +`/personalRecruitList/coverLetterAnalysis/${userInfo.serialNumber}`,
            method : 'get',
            headers: { "Pragma": 'no-cache',
                       "x-access-token": storage.getToken() }
        }).then(function(res){
                //0 인경우 신규유저, 아닌경우 저장된 유저.
                if(res.data.length > 0){
                    storage.setSessionObj(res.headers);
                    self.setState({
                        recommendList: res.data
                    })
                }
               
        }).catch(function(err){
            if(err){
                alert("회사 매칭중 오류가 발생했습니다. 시스템 담당자에게 문의하세요.");
                self.setState({
                    matchFail: true
                })
                console.log(err.response);
                return;
            }
            }
        )

    }


    //이번 전형 참여 회사 조회
    getCompanyChoiceList = () => {

        const { userInfo } = this.state;
        const { ApplyActions, MenuActions, AuthActions } = this.props;
        console.log("userInfo",userInfo)
        const self = this;


        axios({
            url:devtest() + `/companyRecruit/${userInfo.serialNumber}`,
            method : 'get',
            headers: { "Pragma" : 'no-cache',
                        "x-access-token": storage.getToken() }
         }).then(
              (res)=>{
                  if(res.data){
                      storage.setSessionObj(res.headers);
                      ApplyActions.setCompanyList(res.data);
                      self.setState({companyList:res.data});

                      self.getRecommendList();

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

                }else{
                    alert("알수없는 에러가 발생했습니다. 시스템 담당자에게 문의하세요.")
                    console.log( err.response);
                }
              }
          )

    }


    //나의 지망회사 3개 조회
    getMyCompanyList = () => {

        const { userInfo } = this.state;
        const self = this;
        const { AuthActions, MenuActions } = this.props;

        axios({
            url:devtest() + `/personalRecruitList/detail/${userInfo.serialNumber}`, ///${userInfo.applyUserId}`,
            method : 'get',
            headers: { "Pragma": 'no-cache',
                        "x-access-token": storage.getToken() }
         }).then(
              (res)=>{
                    const dataArr = res.data;
                    if(dataArr){
                        storage.setSessionObj(res.headers);
                        const first = _.filter(res.data, function(obj){ return obj.priority === "first" })[0];
                        const second = _.filter(res.data, function(obj){ return obj.priority === "second" })[0];
                        const third = _.filter(res.data, function(obj){ return obj.priority === "third" })[0];

                        const template = {
                            companyId: "",
                            companyName: "",
                            fulltimeSalary: "",
                            priority: "",
                            recruitJob: "",
                            workplace: "",
                        };

                        self.setState({
                            company_1: first ? first : template ,
                            company_2: second ? second : template,
                            company_3: third ? third : template
                        })

                        self.getCompanyChoiceList();
                        //self.getMyCompanyList()

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

                }else{
                    alert("알수없는 에러가 발생했습니다. 시스템 담당자에게 문의하세요.")
                    console.log( err.response);
                }
              }
          )


    }


    //저장버튼 클릭
    handleSaveTemp = (e) => {

        const { savedYn,
                userInfo,
                company_1,
                company_2,
                company_3 } = this.state;
       
        const self = this;

        const tempPara = e.currentTarget.getAttribute("data-temp")

        const data = {
                serialNumber: userInfo.serialNumber,
                applyUserId: userInfo.applyUserId,
                firstCompany: company_1 ? company_1.companyId : null,
                secondCompany: company_2 ? company_2.companyId : null,
                thirdCompany: company_3 ? company_3.companyId : null
                
            }
        
        const { AuthActions, MenuActions } = this.props;

        axios({
            url: savedYn ?devtest() + `/applyCompanyChoice/${userInfo.serialNumber}`  : devtest() + '/applyCompanyChoice/',
            method : savedYn ? 'put' : 'post',
            data : data ,
            headers: { "Pragma" : 'no-cache',
                        "x-access-token": storage.getToken() }
        }).then(
            (res)=>{
                
                //self.getMyCompanyList();
                if(res) {
                    storage.setSessionObj(res.headers);

                    if(tempPara==="temp"){ 
                        alert("저장되었습니다."); 
                    }
                    if(tempPara==="next"){
                        self.handleNextClick(e);
                    }
                    if(tempPara==="prev"){
                        self.handlePrevClick(e);
                    }

                    //console.log("저장했다.")
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

    //스텝바에서 클릭
    //스텝바클릭 제거
    handleStepClick = (e) => {

        const { userInfo } = this.state;
        const stepClickIndex = parseInt(e.target.getAttribute("data-step"));
        //console.log("step", e.target.getAttribute("data-step"));
        
        //본인인증 전 단계(0,1,2) 로는 이동불가. 
        //현재 본인 저장 스텝보다 작은 스텝으로는 스텝바클릭 이동가능
        //스텝바 클릭 제거함.
        // if( stepClickIndex >= 3 && stepClickIndex <= parseInt(userInfo.applyStatus) ){
        //     this.props.history.push("/apply/step" + e.target.getAttribute("data-step"))
        // }
            
    }

    //회사 검색 버튼 클릭
    handlePriorityClick = (e) => {
        
        //console.log(this.props)

        const { userInfo } = this.state;
        //console.log(this.props.companyList)
        this.setState({
            openPopup: true,
            priority: e.target.getAttribute("data-priority")
            
        })


    }

    //팝업 닫기 버튼
    handlePopupClose = () => {
        this.setState({
            openPopup: false
        })

    }

    //팝업에서 선택 버튼
    handleClickSelect = (clicked) => {

        const selectId = clicked.toString();
        const { priority, 
                company_1, 
                company_2, 
                company_3,
                companyList } = this.state;

        let dupleCnt = 0;
        if(company_1 && company_1.companyId === selectId) dupleCnt ++ ;
        if(company_2 && company_2.companyId === selectId) dupleCnt ++ ;
        if(company_3 && company_3.companyId === selectId) dupleCnt ++ ;

        if(dupleCnt !== 0){
            alert("이미 선택된 회사입니다. 다시 선택하세요.");
            return;
        }else{
            let selectedCompany = companyList.filter(
                            (obj) => {
                                return obj.companyId.toString() === selectId;
                            })[0];

            let input = {};
            input[`company_${priority}`] = selectedCompany;
            input['openPopup'] = false;
            this.setState(input);

        }

    }


    //회사 로고 클릭시 팝업띄움
    handleLogoClick = (e) => {

        const companyId = e.currentTarget.getAttribute("data-companyid");

        const self = this;
        const { CompanyAction } = this.props;


        axios({
            url:devtest() +`/company/${companyId}`,
            method:"get",
            headers: { Pragma: 'no-cache'}
        }).then(
            (res)=>{
                if(res.data) {
                    //storage.setSessionObj(res.headers);
                    CompanyAction.setCompanyInfo(res.data);

                    self.setState({
                        companyPopup: true,
                        clickedCompanyId: companyId
                    })


                }
            }
        ).catch(
            (err)=>{
                alert("회사 정보를 불러오는데 실패하였습니다.")
                console.log(err.response)
            }
        )


    }






    //저장시 validation
    validationCheck = (e) => {

        const dataTemp = e.currentTarget.getAttribute("data-temp");

        const { 
            company_1,
            company_2,
            company_3 } = this.state;
            //console.log(typeof company_1)
        if(!(   company_1 && company_2 && company_3 && 
                company_1.companyId && company_2.companyId && company_3.companyId ) && dataTemp === "next" ) { //이전으로 갈때는 3개 지망 선택 체크 X
            alert("3지망까지 모두 선택바랍니다.")
            return ;
        }else{

            let str = ""; 
            if(dataTemp==="prev") str = "저장 후 이전 단계로 이동합니다";
            if(dataTemp==="next") str = "저장 후 다음 단계로 이동합니다";

            if(confirm(str)){
                this.handleSaveTemp(e)
            }
            
        }
    }

    //이전단계 버튼 클릭
    handlePrevClick = (e) => {

        let { stepIndex, userInfo } = this.state;
        let prevStepIndex = parseInt(stepIndex) - 1;

        this.props.history.push(`/apply/step${prevStepIndex}`);

        

    }

    //다음 버튼 클릭
    handleNextClick = (e) => {
        //console.log("container에서 실행")
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

    }

    //팝업닫기
    handleCompanyPopupClose = () => {
        this.setState({companyPopup:false})
    }

    pageMoveTo = (e) => {
        const url = e.target.getAttribute("data-url");
        if(confirm("작성중인 내용이 저장되지 않을 수 있습니다. 이동 전 저장 바랍니다. \n그래도 이동하시겠습니까 ?"))
            this.props.history.push(url);
    }

    render() { 
        const { stepIndex,
                priority,
                openPopup,
                company_1,
                company_2,
                company_3,
                userInfo,
                recommendList,
                companyPopup,
                matchFail } = this.state;

        const { handleStepClick,
                handlePriorityClick,
                handlePopupClose,
                handleClickSelect,
                validationCheck,
                handleSaveTemp,
                handlePrevClick, 
                pageMoveTo, 
                handleLogoClick,
                handleCompanyPopupClose } = this;
        
        const { companyList, companyInfo } = this.props;

        return ( 
            <div className="sub-contents">
                <div className="sub-container">
                <Stepbar stepIndex={stepIndex} handleStepClick={handleStepClick} applyStatus={userInfo.applyStatus} pageMoveTo={pageMoveTo}/>
                <SelectCompany 
                        matchFail={matchFail}
                        handleLogoClick={handleLogoClick}
                        recommendList={recommendList}
                        handlePriorityClick={handlePriorityClick} 
                        company_1={company_1} 
                        company_2={company_2} 
                        company_3={company_3} 
                        validationCheck={validationCheck} 
                        handleSaveTemp={handleSaveTemp}
                        handlePrevClick={handlePrevClick}></SelectCompany>
                { openPopup ? <SelectCompanyPopup priority={priority} handlePopupClose={handlePopupClose} handleClickSelect={handleClickSelect} companyList={companyList}></SelectCompanyPopup> : undefined }
                { companyPopup ? <CompanyPopup companyInfo={companyInfo} handlePopupClose={handleCompanyPopupClose}></CompanyPopup> : undefined }
                </div>
            </div>
         );
    }
}


export default connect(
    (state) => ({
        companyList: state.apply.get("companyList"),
        company_1: state.apply.get("firstCompany"),
        company_2: state.apply.get("secondCompany"),
        company_3: state.apply.get("thirdCompany"),
        serialNumber : state.apply.get('serialNumber'),
        isLogin: state.auth.get('isLogin'),
        userId: state.auth.get('userId'),
        userType: state.auth.get('userType'),
        applyStatus: state.apply.get('applyStatus'),
        companyInfo: state.company.get("companyInfo")
    }), (dispatch) => ({
        ApplyActions: bindActionCreators(ApplyActions, dispatch),
        CompanyAction : bindActionCreators(companyActions, dispatch),
        MenuActions : bindActionCreators(menuActions, dispatch),
        AuthActions: bindActionCreators(authActions, dispatch),
    })
)(SelectCompanyContainer);

