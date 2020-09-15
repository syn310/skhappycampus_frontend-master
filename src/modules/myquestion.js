import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';

/*
 * 액션 타입 정의
 */
const SET_MY_QUESTION_LIST = 'myquestion/SET_MY_QUESTION_LIST';
const SET_MY_QUESTION = 'myquestion/SET_MY_QUESTION';
const TOGGLE_VISIBLE = 'myquestion/TOGGLE_VISIBLE';

/*
 * 액션 생성 함수 정의
 */
export const setMyQuestionList = createAction(SET_MY_QUESTION_LIST);
export const setMyQuestion = createAction(SET_MY_QUESTION);
export const toggleVisible = createAction(TOGGLE_VISIBLE);

const initialState = Map({
    myQuestionList: [],
    questionInfo: {
      questionSeq: ''
      ,questionType: ''
      ,questionTitle: ''
      ,questionContent: ''
      ,createUserId: ''
      ,updateUserId: ''
    },
});

export default handleActions({
    [SET_MY_QUESTION_LIST] : (state, action) => {
        return state.set("myQuestionList", action.payload);
    },
    [SET_MY_QUESTION] : (state, action) => {
      return state.setIn(["questionInfo","questionType"], action.payload.questionType)
                  .setIn(["questionInfo","questionTitle"], action.payload.questionTitle)
                  .setIn(["questionInfo","questionContent"], action.payload.questionContent)
                  .setIn(["questionInfo","questionType"], action.payload.questionType);
    },

}, initialState);
