import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';

/*
 * 액션 타입 정의
 */
const SET_ERROR = 'register/SET_ERROR';
const SET_EMAIL_EXIST = 'register/SET_EMAIL_EXIST';


/*
 * 액션 생성 함수 정의
 */
export const setError = createAction(SET_ERROR);
export const setEmailExist = createAction(SET_EMAIL_EXIST);

/*
 * 초기상태 정의
 */
const initialState = Map({
    form: Map({
        email: '',
        password: '',
        passwordConfirm: ''
    }),
    exists: Map({
        email: false,
        password: false
    }),
});


/*
 * reducer 작성
 */
export default handleActions({
    [SET_EMAIL_EXIST]: (state,action) => {
        return state.setIn(['exists','email'], action.payload);
    },
    
}, initialState);
