import React, {Component} from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as questionActions from 'modules/question';
import QuestionDetail from 'components/question/QuestionDetail';
import storage from 'lib/storage';
import devtest from 'lib/devtest';
class QuestionDetailContainer extends Component {
  /** 생성자 */
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }
  /** 화면 이동  */
  handleMoveTo = (e) => {
    //console.log("url", e.target.getAttribute("data-url"))
    this.props.history.push(e.target.getAttribute("data-url"));
  }

  render() {
    const { questionInfo } = this.props;
    const { handleMoveTo } = this;
    return (
        <div>
          <button data-url="/question" onClick={handleMoveTo}>1:1문의</button>
          <button data-url="/faq" onClick={handleMoveTo}>FAQ</button>
          <QuestionDetail questionInfo={questionInfo}/>
        </div>
    );
  }
}
// 컴포넌트에 리덕스 스토어를 연동해줄 때에는 connect 함수 사용
export default connect(
    (state) => ({
        questionInfo: state.question.get('questionInfo')
    }), (dispatch) => ({
        QuestionAction : bindActionCreators(questionActions, dispatch)
    })
)(QuestionDetailContainer);
