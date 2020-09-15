import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';

/*
 * 액션 타입 정의
 */
const SET_MENU_LIST = 'menu/SET_MENU_LIST';
const SET_MENU_ITEM = 'menu/SET_MENU_ITEM';
const SET_CLICK_MENU = 'menu/SET_CLICK_MENU';
const SET_SUB_MENU = 'menu/SET_SUB_MENU';

export const setMenuList = createAction(SET_MENU_LIST);
export const setMenuItem = createAction(SET_MENU_ITEM);
export const setClickMenu = createAction(SET_CLICK_MENU);
export const setSubMenu = createAction(SET_SUB_MENU);

 /*
  * 초기상태 정의
  */
 const initialState = Map({
     menuInfo: {
       id: ''
       ,menuName: ''
       ,depth: ''
       ,parent: ''
       ,url: ''
       ,show: ''
       ,description: ''
       ,createdAt: ''
       ,updatedAt: ''
     },
     menuList: [],
     clickedMenu:"",
     subMenu:""
 });

export default handleActions({
  [SET_MENU_LIST] : (state, action) => {
    return state.set('menuList', action.payload)
  },
  [SET_MENU_ITEM] : (state, action) => {
    return state.setIn(["menuInfo","menuName"], action.payload.menuName)
                .setIn(["menuInfo","depth"], action.payload.depth)
                .setIn(["menuInfo","parent"], action.payload.parent)
                .setIn(["menuInfo","url"], action.payload.url)
                .setIn(["menuInfo","show"], action.payload.show)
                .setIn(["menuInfo","description"], action.payload.description);
  },
  [SET_CLICK_MENU] : (state, action) => {
    return state.set('clickedMenu', action.payload)
  },
  [SET_SUB_MENU] : (state, action) => {
    return state.set('subMenu', action.payload)
  }
}, initialState)
