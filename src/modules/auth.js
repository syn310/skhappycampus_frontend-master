import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';

/*
 * 액션 타입 정의
 */
const LOGIN = 'auth/LOGIN';
const LOGOUT = 'auth/LOGOUT';


/*
 * 액션 생성 함수 정의
 */
export const login = createAction(LOGIN);
export const logout = createAction(LOGOUT);

/*
 * 초기상태 정의
 */
const initialState = Map({
    userId : null,
    userType : null,
    isLogin : false,
});


/*
 * reducer 작성
 */
export default handleActions({

    [LOGIN] : (state, action) => {
        return state.set('isLogin', true)
                    .set('userId', action.payload.userid)
                    .set('userType', action.payload.usertype);
    },
    [LOGOUT]: (state,action) => {
        return state.set('isLogin', false)
                    .set('userId', null)
                    .set('userType', null);
    },
    
}, initialState);
