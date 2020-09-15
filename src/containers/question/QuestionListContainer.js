import React, { Component } from 'react';
import axios from  'axios';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as questionActions from 'modules/question';
import QuestionList from 'components/question/QuestionList';
import storage from 'lib/storage';
import devtest from 'lib/devtest';
class QuestionListContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
          itemList : [],
          userInfo: {
            applyUserId: "",
            serialNumber:""
       }
         
        };
        this.handleGetQuestionList = this.handleGetQuestionList.bind(this);
    }
    /** 컴포넌트가 DOM위에 만들어지기 전에 실행 */
    componentWillMount() {
        // console.log("componentWillMount", this);
        //게시판 리스트 조회
        this.handleGetQuestionList();
    }
    componentDidMount() {

        let userTemp = this.state.userInfo;
        userTemp["serialNumber"] = this.props.serialNumber;
        userTemp["applyUserId"] = storage.getUserInfo();
 
        this.setState({
            userInfo: userTemp
        })

        // console.log("aaaaa", this);


        // this.handleGetQuestionList();
 
     }
    /** 저장된 게시판 문의글 리스트 조회 */
    handleGetQuestionList = () => {
        const { QuestionAction } = this.props;
        const { userInfo } = this.state;

        axios({
            url:devtest() +"/question",
            method:"get",
            headers: { Pragma: 'no-cache'}
        }).then(function(response) {
            // console.log(`handleGetQuestionList에서 response.data: ${response.data}`);
          if (response.data){
              //조회한 데이터 store에 셋팅
              QuestionAction.setQuestionList(response.data);
          }
        }).catch(function(error) {
        //   console.log(error);
        });
    }

    /**
    * @param  {object} itemQuestion 클릭한 게시글의 정보
    * @param  {object} e         React의 synthetic event object
    */
    handleMoveToDetail = (itemQuestion, e) => {
      const { QuestionAction } = this.props;
      QuestionAction.setQuestion(itemQuestion);
      this.props.history.push("/questionDetail");
    }

    /** 화면 이동  */
    handleMoveTo = (e) => {
    //   console.log("url", e.target.getAttribute("data-url"))

      if(e.target.getAttribute("data-url")==="/question")  {
        const session = storage.getSessionObj();
        // console.log("ses", session)
      }

      this.props.history.push(e.target.getAttribute("data-url"));
    }


    render() {
        const {itemList} = this.props;
        const { handleGetQuestionList, handleMoveToDetail, handleMoveTo} = this;
        return (
            <div>
                <h1>문의게시판</h1>
                <button data-url="/faq" onClick={handleMoveTo}>FAQ</button>
                <button data-url="/question" onClick={handleMoveTo}>1:1문의</button>
                <QuestionList itemList={itemList} onMoveToDetail={handleMoveToDetail}>
                </QuestionList>
            </div>
        );
    }
}
// 컴포넌트에 리덕스 스토어를 연동해줄 때에는 connect 함수 사용
export default connect(
    (state) => ({
        itemList: state.question.get('itemList'),
        serialNumber : state.apply.get('serialNumber'),
        isLogin: state.auth.get('isLogin'),
        userId: state.auth.get('userId'),
        userType: state.auth.get('userType')
    }), (dispatch) => ({
        QuestionAction : bindActionCreators(questionActions, dispatch)
    })
)(QuestionListContainer);
