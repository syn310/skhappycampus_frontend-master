import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as MypageActions from 'modules/mypage';
import * as menuActions from 'modules/menu';
import * as MyQuestionActions from 'modules/myquestion';
import * as authActions from 'modules/auth';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import {MyApplyStatus, MyApplyNotFound, MyApplyPopup, MyQuestion, MyQuestionNotFound, MyQuestionPopup, MyPassword, MyNoticePopup} from 'components';
import storage from 'lib/storage';
import devtest from 'lib/devtest';

class MyApplyContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
          userInfo: {
               applyUserId: "",
          },
          clickedQuestion: {},
          openQuestionPopup: false, ////나의 문의내역 팝업(현재 미사용중, 2차 오픈)
          openApplyPopup: false,    //나의 지원현황 팝업 open여부
          openNoticePopup: false, //개인별 공지사항 팝업 open여부
          myApplyResultList: [],
          clickedNotice: {},
          noticeInfo: {}           //개인별 공지사항 내용
        }
    }

    componentDidMount() {

        let userTemp = this.state.userInfo;
        userTemp["applyUserId"] = storage.getUserInfo();
 
        this.setState({
            userInfo: userTemp
        })
        //나의 지원현황 조회
        this.handleGetMyApplyList();
    }
    /* 사용자의 지원 리스트 조회 */
    handleGetMyApplyList = () => {

      const { userInfo } = this.state;
      const { MypageActions, AuthActions, MenuActions } = this.props;
      const self = this;
      
        axios({
            url: devtest() +'/personalRecruitList/', //+ userInfo.applyUserId,
            method : 'get',
            headers: {  "Pragma" : 'no-cache', 
                        "x-access-token": storage.getToken() }
        }).then(
            (res)=>{
                    storage.setSessionObj(res.headers);
                    // 2차 오픈시 주석 해제하세요
                    this.handleGetMyQuestionList();
                    
                    MypageActions.setMyApplyList(res.data);
            }
        ).catch(
            (err) => {
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

                }
                else{
                    alert("알수없는 에러가 발생했습니다. 시스템 담당자에게 문의하세요.")
                    console.log( err.response);
                }
            }
        )
    }
    /* 지원정보 상세조회 팝업 */
    handleMyApplyToggle = (e) => {
       
        const { userInfo } = this.state;
        const { myChoiceList, MypageActions, MenuActions, AuthActions  } = this.props;
        const serialNumber = e.currentTarget.getAttribute("data-serialnumber");
        const noticePassMessage = e.currentTarget.getAttribute("data-noticepassmessage");
        const documentResultDate = e.currentTarget.getAttribute("data-documentresultdate");
        const interviewResultDate = e.currentTarget.getAttribute("data-interviewresultdate");
        const self = this;

        /** 지원내역(1지망,2지망,3지망) 조회 */
        axios({
            url:devtest() + `/personalRecruitList/detail/${serialNumber}`, ///${userInfo.applyUserId}`,
            method : 'get',
            headers: { "Pragma": 'no-cache', 
                        "x-access-token": storage.getToken() }
        }).then(
            (res)=>{
                //console.log("팝업조회", res.headers)
                storage.setSessionObj(res.headers);
                MypageActions.setMyChoiceList(res.data);
                //클릭한 공고정보 셋팅
                self.setState({
                    clickedNotice: {
                        noticePassMessage: noticePassMessage,
                        documentResultDate: documentResultDate,
                        interviewResultDate : interviewResultDate,
                    }
                });

                /** 자기소개서 조회 */
                axios({
                    url:devtest() + `/apply/${serialNumber}`, ///${userInfo.applyUserId}`,
                    method : 'get',
                    headers: { "Pragma" : 'no-cache',
                                "x-access-token": storage.getToken()       
                                }
                }).then(
                    (res2)=>{
                        if(res2){
                            //storage.setSessionObj(res2.headers);
                            self.getMyApplyProcess(serialNumber, res2.headers);
                            MypageActions.setCoverLetter(res2.data.coverLetter);
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
                            alert("잘못된 로그인 정보입니다. 로그인 페이지로 이동합니다.");
                            //sessionStorage에 userInfo key의 데이터 삭제
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
    /* 사용자의 문의내역 리스트 조회 */
    handleGetMyQuestionList = () => {
        const { userInfo } = this.state;
        const { MyQuestionActions,  AuthActions, MenuActions } = this.props;
        const self = this;

        axios({
            url:devtest() + `/qna`, 
            method : 'get',
            headers: { "Pragma" : 'no-cache',
                        "x-access-token": storage.getToken() }
        }).then(
            (res)=>{
                if(res){
                    storage.setSessionObj(res.headers);
                    MyQuestionActions.setMyQuestionList(res.data);
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

    /* 문의 상세조회 팝업 */
    handleMyQuestionToggle = (e) => {
        const { userInfo } = this.state;
        const { MyQuestionActions, AuthActions, MenuActions } = this.props;
        const questionSeq = e.currentTarget.getAttribute("data-questionseq");

        const self = this;

        axios({
            url: devtest() +`/qna/${questionSeq}`, 
            method : 'get',
            headers: { "Pragma" : 'no-cache',
                         "x-access-token": storage.getToken() }
        }).then(
            (res)=>{
                if(res.data){
                    this.setState({
                        clickedQuestion : res.data
                    });
                    storage.setSessionObj(res.headers);
                    this.setState({openQuestionPopup:true});
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

    /** 나의 상태 및 전형절차 상태 조회 (서류합격/면접합격 등의 정보) */
    getMyApplyProcess = (serialNumber, header) => {

        const { userInfo } = this.state;
        //console.log("userInfo", userInfo)

        const { MyQuestionActions, AuthActions, MenuActions } = this.props;
        const self = this;

        axios({
            url: devtest() + '/applyUserCompanyStatus/'+ serialNumber,//devtest() + '/applyUserStatus/'+ serialNumber,
            method : 'get',
            headers: { "Pragma" : 'no-cache',
                       "x-access-token": header.newtoken }
        }).then(
            (res)=>{
                //console.log(res)
                if(res.data){
                    storage.setSessionObj(res.headers);
                    self.setState({
                        myApplyResultList: res.data
                    })
                    
                    //지원현황 팝업 OPEN
                    self.setState({openApplyPopup:true});
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

    /* 개인별 공지사항 조회 */
    handleGetNotice = (e) => {
        const { userInfo } = this.state;
        const { AuthActions, MenuActions } = this.props;
        const serialNumber = e.currentTarget.getAttribute("data-serialNumber");

        const self = this;

        axios({
            url: devtest() +'/personalNotice/'+ serialNumber ,
            method : 'get',
            headers: { "Pragma" : 'no-cache',
                         "x-access-token": storage.getToken() }
        }).then(
            (res)=>{
                console.log(`res.data: ${res.data}`);
                if(res.data){
                    this.setState({
                        noticeInfo : res.data
                    });
                    storage.setSessionObj(res.headers);
                    this.setState({openNoticePopup:true});
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

    /* 지원정보 상세조회 팝업 닫기 */
    handleApplyClose = () => {
        this.setState({openApplyPopup:false});
    }
    /* 문의 상세조회 팝업 닫기 */
    handleQuestionClose = () => {
        this.setState({openQuestionPopup:false});
    }
    /* 개인별 공지사항 팝업 닫기 */
    handleNoticeClose = () => {
        this.setState({openNoticePopup:false});
    }
    /** 비밀번호 변경 페이지 이동 */
    handleMoveToMyPassword= () => {
        this.props.history.push(`/mypass`);
    }


    render() {
        const { myApplyList, myChoiceList, myQuestionList, questionInfo, coverLetter} = this.props;
        const {handleMyApplyToggle
            , handleApplyClose
            , handleMyQuestionToggle
            , handleQuestionClose
            , handleMoveToMyPassword
            , handleNoticeClose
            , handleGetNotice} = this;
        const { clickedQuestion, openApplyPopup, openQuestionPopup, myApplyResultList
            ,clickedNotice} = this.state; 
        return (
            <div className="sub-contents">
                <div className="sub-container">
                    <div className="location">
                        <div className="location-inner">
                            <div className="location-item">홈</div>
                            <div className="location-item">></div>
                            <div className="location-item">마이페이지</div>
                        </div>
                    </div>
                    <div className="sub-info">
                        <h2 className="sub_heading">마이페이지</h2>
                        <div className="sub_heading_text">나의 지원현황과 문의내역을 확인해보세요.</div>
                        <br />
                    </div>
                    <div className="clear"></div>
                    <div className="sub_box">
                        <div className="apply_step4">
                            <div className="apply_step4_list">
                                <div>
                                    <div className="apply_step4_table_title">나의 지원현황<span>나의 지원현황을 확인해보세요.</span></div>
                                    <div>
                                        <div className="line_2_gray"></div>
                                        <div className="company_img_area">
                                            { myApplyList.length !== 0 && <MyApplyStatus myApplyList={myApplyList} onPopup={handleMyApplyToggle} onNoticePopup={handleGetNotice}></MyApplyStatus>}
                                            { myApplyList.length === 0 && <MyApplyNotFound ></MyApplyNotFound>}
                                        </div>
                                    </div>
                                </div>
                            </div>  
                        </div>
                        <div className="apply_step4">
                            <div className="apply_step4_list">
                                <div>
                                    <div className="apply_step4_table_title">개인 정보 관리<span>소중한 개인정보를 안전하게 관리하세요</span></div>
                                    <div>
                                        {/* <div className="line_2_gray"></div> */}
                                        <div className="company_img_area">
                                        <table className="apply_step4_table_contents">
                                            <tbody>
                                                <tr className="mypage_myinfo-item" onClick={handleMoveToMyPassword}>
                                                    <td>비밀번호 변경</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                         </div>
                                    </div>
                                </div>
                            </div>  
                        </div>
                        {/* 2차 오픈용 기능: 나의 문의내역 확인 */}
                        <div className="apply_step4">
                            <div className="apply_step4_list">
                                <div>
                                    <div className="apply_step4_table_title">나의 문의내역<span>나의 문의내역을 확인해보세요.</span></div>
                                    <div>
                                        <div className="line_2_gray"></div>
                                        <div className="company_img_area">
                                            { myQuestionList.length !== 0  && (<MyQuestion myQuestionList={myQuestionList} onPopup={handleMyQuestionToggle}></MyQuestion>)}
                                            { myQuestionList.length === 0&& (<MyQuestionNotFound></MyQuestionNotFound>)}
                                        </div>
                                    </div>
                                </div>
                            </div>  
                        </div>

                        {/* 나의 지원현황 팝업 */}
                        { openApplyPopup && <MyApplyPopup clickedNotice={clickedNotice} myApplyResultList={myApplyResultList} myChoiceList={myChoiceList} coverLetter={coverLetter} onClose={handleApplyClose} ></MyApplyPopup>}
                        {/* 나의 문의현황 팝업 */}
                        { openQuestionPopup && <MyQuestionPopup questionInfo={clickedQuestion} onClose={handleQuestionClose} ></MyQuestionPopup>}
                        
                    
                    </div>
                </div>
            </div>
        
         );
    }
}

export default connect(
    (state) => ({
        myApplyList : state.mypage.get("myApplyList"),
        myChoiceList : state.mypage.get("myChoiceList"),
        coverLetter: state.mypage.get("coverLetter"),
        myQuestionList: state.myquestion.get("myQuestionList"),
        questionInfo: state.myquestion.get("questionInfo"),
        serialNumber : state.apply.get('serialNumber'),
        isLogin: state.auth.get('isLogin'),
        userId: state.auth.get('userId'),
        userType: state.auth.get('userType')

    }), (dispatch) => ({
        MypageActions: bindActionCreators(MypageActions, dispatch),
        MyQuestionActions: bindActionCreators(MyQuestionActions, dispatch),
        MenuActions: bindActionCreators(menuActions, dispatch),
        AuthActions: bindActionCreators(authActions, dispatch),
    })
)(MyApplyContainer);
