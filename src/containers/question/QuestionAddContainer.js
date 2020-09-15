import React, { Component } from 'react';
import axios from  'axios';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import QuestionForm from 'components/question/QuestionForm';
import storage from 'lib/storage';
import devtest from 'lib/devtest';
import * as authActions from 'modules/auth';
import * as menuActions from 'modules/menu';

class QuestionAddContainer extends Component {
    /** 생성자 */
    constructor(props) {
        super(props);
        this.state = {
          code : {
            qnaCategoryCode : []
          },
          userInfo: {
            applyUserId: "",
            serialNumber:"",
          },
          questionInfo : {
            questionSeq: ''
            ,questionType: ''
            ,questionTitle: ''
            ,questionContent: ''
            ,createUserId: ''
            ,updateUserId: ''
          }
        };
    }


    componentWillMount = () => {
      //질문카테고리 코드데이터 조회
      this.getCodeValue();
    }

    componentDidMount = () => {
      let userTemp = this.state.userInfo;
      userTemp["serialNumber"] = this.props.serialNumber;
      userTemp["applyUserId"] = storage.getUserInfo();

      this.setState({
          userInfo: userTemp
      })

    }
    /** 질문카테고리 코드데이터 조회 */
    getCodeValue = () => {

      const { code } = this.state;

      axios({
          url:devtest() + `/commonCode/QUESTION/S`,//코드 URL은 뒤에 주소 대문자 사용함
          method : 'get',
          headers: { Pragma: 'no-cache'}
      }).then(
          (res)=>{
              if(res.data){
                  code["qnaCategoryCode"] = res.data;
                  this.setState({
                      code
                  })
              }
          }
      ).catch(
          (err)=>{ if(err) console.log("코드 get err", err.response); }
      )
    }

    /** 변경사항 state에 적용 */
    handleChange = (e) => {
      let input = this.state.questionInfo;
      input[e.target.name] = e.target.value;
      this.setState({questionInfo:input});
    }
    /** 문의글 저장 전 vaildation */
    vaildateForm = () => {
        let result = false;

        if(
            this.state.questionInfo.questionType.length == 0 ||
            this.state.questionInfo.questionTitle.length == 0 ||
            this.state.questionInfo.questionContent.length == 0
          ) {
                alert("내용입력은 필수입니다.");
                return;
        }else{
          result = true;
        }
        return result;
    }

    /** 문의글 저장 */
    handleSave = () => {
      const { handleMoveToMyPage } = this;
      const { questionInfo, userInfo } = this.state;
      const { AuthActions, MenuActions } = this.props;
      const self = this;
      if(this.vaildateForm()){

        axios({
          url:devtest() +"/qna",
          method: "post",
          data: {
            questionType: questionInfo.questionType
            ,questionTitle: questionInfo.questionTitle
            ,questionContent: questionInfo.questionContent
            ,applyUserId: userInfo.applyUserId
            ,createUserId: questionInfo.createUserId
            ,updateUserId: questionInfo.updateUserId
          },
          headers: { Pragma: 'no-cache',
                      "x-access-token": storage.getToken()  }

        })
        .then(function(response) {
          if (response.data){
              storage.setSessionObj(response.headers);
              alert("문의글이 등록되었습니다.");
              //마이페이지로 이동
              handleMoveToMyPage();
          }
        }).catch(function(err) {
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
            console.log("err", err.response);
        }
        });
      }
    }

    handleMoveToMyPage = () => {
      this.props.history.push("/mypage");
    }

    /** 화면 이동  */
    handleMoveTo = (e) => {
      
      this.props.history.push(e.target.getAttribute("data-url"));
    }


    render() {
        const { title, userName, contents, code } = this.state;
        const { handleChange, handleSave, handleMoveTo} = this;
        return (
          <div className="sub-contents">
            <div className="sub-container">
              <div className="location">
                  <div className="location-inner">
                      <div className="location-item">홈</div>
                      <div className="location-item">></div>
                      <div className="location-item">문의하기</div>
                       <div className="location-item">></div>
                      <div className="location-item">1:1문의</div>
                  </div>
              </div>
              <div className="sub-info">
                  <h2 className="sub_heading">1:1문의</h2>
                  <div className="sub_heading_text">채용관련 궁금한 점을 질문해보세요</div>
                  <br />
              </div>
              <div className="clear"></div>
              <div className="sub_box">
                  <QuestionForm
                    title={title}
                    userName={userName}
                    contents={contents}
                    onChange={handleChange}
                    onSave={handleSave}
                    onCancel={handleMoveTo}
                    qnaCategory={code.qnaCategoryCode}>
                  </QuestionForm>
              </div>
            </div>
            
          </div>
        );
    }
}



// 컴포넌트에 리덕스 스토어를 연동해줄 때에는 connect 함수 사용
export default connect(
    //props로 넣어줄 스토어 상태값
    (state) => ({
      serialNumber: state.apply.get('serialNumber'),
      isLogin: state.auth.get('isLogin'),
      userId: state.auth.get('userId'),
      userType: state.auth.get('userType')
    })
    //props로 넣어줄 액션 생성함수
    , (dispatch) => ({
      AuthActions: bindActionCreators(authActions, dispatch),
      MenuActions : bindActionCreators(menuActions, dispatch)
    })
)(QuestionAddContainer);
