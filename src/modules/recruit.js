import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';

/*
 * 액션 타입 정의
 */
const SET_RECRUIT_NOTICE_LIST = 'recruit/SET_RECRUIT_NOTICE_LIST';
const SET_RECRUIT_NOTICE_INFO = 'recruit/SET_RECRUIT_NOTICE_INFO';
const TOGGLE_VISIBLE = 'recruit/TOGGLE_VISIBLE';

/*
 * 액션 생성 함수 정의
 */
export const setRecruitNoticeList = createAction(SET_RECRUIT_NOTICE_LIST);
export const setRecruitNoticeInfo = createAction(SET_RECRUIT_NOTICE_INFO);
export const toggleVisible = createAction(TOGGLE_VISIBLE);

/*
 * 초기상태 정의
 */
const initialState = Map({
    recruitNoticeList: [],
    recruitInfo: {
        serialNumber: "",
        noticeName: '',
        noticeImagePath: '',
        noticeStatus: '',
        noticeStartDatetime: '',
        noticeEndDatetime: '',
        internStartDate: '',
        internEndDate: ''
    }
});


/*
 * reducer 작성
 */
export default handleActions({

    [SET_RECRUIT_NOTICE_LIST] : (state, action) => {
      return state.set('recruitNoticeList',action.payload);
    },
    [SET_RECRUIT_NOTICE_INFO] : (state, action) => {
      return state.setIn(['recruitInfo','serialNumber'], action.payload.serialNumber)
                  .setIn(['recruitInfo','noticeName'], action.payload.noticeName)
                  .setIn(['recruitInfo','noticeImagePath'], action.payload.noticeImagePath)
                  .setIn(['recruitInfo','noticeStatus'], action.payload.noticeStatus)
                  .setIn(['recruitInfo','noticeStartDatetime'], action.payload.noticeStartDatetime)
                  .setIn(['recruitInfo','noticeEndDatetime'], action.payload.noticeEndDatetime)
                  .setIn(['recruitInfo','internStartDate'], action.payload.internStartDate)
                  .setIn(['recruitInfo','internEndDate'], action.payload.internEndDate);
    },
    
}, initialState);
