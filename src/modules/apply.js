import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';
import _ from 'lodash';

const SET_COVER_LETTER = 'apply/SET_COVER_LETTER';
export const setCoverLetter = createAction(SET_COVER_LETTER);

const SET_APPLY_INFO = 'apply/SET_APPLY_INFO';
export const setApplyInfo = createAction(SET_APPLY_INFO);

const SET_DEGREE_INFO = 'apply/SET_DEEGREE_INFO';
export const setDegreeInfo = createAction(SET_DEGREE_INFO);

const SET_CERT_INFO = 'apply/SET_CERT_INFO';
export const setCertInfo = createAction(SET_CERT_INFO);

const SET_COMPANY_LIST = 'apply/SET_COMPANY_LIST';
export const setCompanyList = createAction(SET_COMPANY_LIST);

const SET_RECOMMEND_LIST = 'apply/SET_RECOMMEND_LIST';
export const setRecommendList = createAction(SET_RECOMMEND_LIST);

const SET_REGION_CODE = 'apply/SET_REGION_CODE';
export const setRegionCode = createAction(SET_REGION_CODE);

const SET_NOTICE_NUMBER = 'apply/SET_NOTICE_NUMBER';
export const setNoticeNumber = createAction(SET_NOTICE_NUMBER);

const SET_SERIAL_NUMBER = 'apply/SET_SERIAL_NUMBER';
export const setSerialNumber = createAction(SET_SERIAL_NUMBER);

const SET_APPLY_STATUS = 'apply/SET_APPLY_STATUS';
export const setApplyStatus = createAction(SET_APPLY_STATUS);

const initialState = Map({
    
    basicInfo: {},
    degreeInfoArr: [],
    extraCertArr: [],
    coverLetter: "",

    companyList:[],
    recommendList:[],

    regionCode:"",
    noticeNumber:"",
    serialNumber: "",
    applyStatus:""

});


//작성중
export default handleActions({

    [SET_APPLY_INFO] : (state, action) => {
        return state.set("basicInfo", action.payload);
    },

    [SET_DEGREE_INFO] : (state, action) => {
        //console.log("deegree", action.payload)
        return state.set("degreeInfoArr", action.payload);
    },

    [SET_CERT_INFO] : (state, action) => {
        return state.set("extraCertArr", action.payload);
    },

    [SET_COVER_LETTER] : (state, action) => {
        return state.set("coverLetter", action.payload);
    },

    [SET_REGION_CODE] : (state, action) => {
        return state.set("regionCode", action.payload);           
    },

    [SET_NOTICE_NUMBER] : (state, action) => {
        return state.set("noticeNumber", action.payload);           
    },

    [SET_SERIAL_NUMBER] : (state, action) => {
        return state.set("serialNumber", action.payload);           
    },

    [SET_COMPANY_LIST] : (state, action) => {
        //console.log(action.payload)
        return state.set("companyList", action.payload)
    },

    [SET_RECOMMEND_LIST] : (state, action) => {
        return state.set("recommendList", action.payload)
    },

    [SET_APPLY_STATUS] : (state, action) => {
        return state.set("applyStatus", action.payload)
    },



}, initialState);
