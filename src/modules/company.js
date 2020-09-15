import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';

/*
 * 액션 타입 정의
 */
const SET_COMPANY_LIST = 'company/SET_COMPANY_LIST';
export const setCompanyList = createAction(SET_COMPANY_LIST);

const SET_COMPANY_INFO = 'company/SET_COMPANY_INFO';
export const setCompanyInfo = createAction(SET_COMPANY_INFO);

/*
 * 초기상태 정의
 */
const initialState = Map({
    companyList:[],
    companyInfo: {}
});

/*
 * reducer 작성
 */
export default handleActions({

    [SET_COMPANY_LIST] : (state, action) => {
        return state.set('companyList', action.payload)
    },

    [SET_COMPANY_INFO] : (state, action) => {
        return state.set('companyInfo', action.payload)
    },
    
}, initialState);
