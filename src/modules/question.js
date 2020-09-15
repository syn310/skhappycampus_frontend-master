import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';

/*
 * 액션 타입 정의
 */
const SET_QUESTION_LIST = 'question/GET_QUESTION_LIST';
const SET_QUESTION_ITEM = 'question/SET_QUESTION_ITEM';
const SET_MODE = 'question/SET_MODE';

/*
 * 액션 생성 함수 정의
 */
export const setQuestionList = createAction(SET_QUESTION_LIST);
export const setQuestion = createAction(SET_QUESTION_ITEM);
export const setMode = createAction(SET_MODE);

/*
 * 초기상태 정의
 */
const initialState = Map({
    questionInfo: {
      questionSeq: ''
      ,questionEmail: ''
      ,questionPhone: ''
      ,questionType: ''
      ,questionTitle: ''
      ,questionContent: ''
      ,createUserId: ''
      ,updateUserId: ''
    },
    itemList: [],
    mode: 'list' //mode: list, read, write
});


/*
 * reducer 작성
 */
export default handleActions({

    [SET_QUESTION_LIST] : (state, action) => {
      return state.set('itemList',action.payload);
    },
    [SET_QUESTION_ITEM] : (state, action) => {
      return state.setIn(["questionInfo","questionEmail"], action.payload.questionEmail)
                  .setIn(["questionInfo","questionPhone"], action.payload.questionPhone)
                  .setIn(["questionInfo","questionType"], action.payload.questionType)
                  .setIn(["questionInfo","questionTitle"], action.payload.questionTitle)
                  .setIn(["questionInfo","questionContent"], action.payload.questionContent)
                  .setIn(["questionInfo","questionType"], action.payload.questionType);
    },
    //게시판 모드변경: 상세보기(read), 리스트(list), 글 작성(write)
    [SET_MODE] : (state, action) => {
      return state.set("mode", action.payload);
    }
}, initialState);
