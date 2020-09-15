import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as authActions from 'modules/auth';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import storage from 'lib/storage';
import devtest from 'lib/devtest';

import {isEmail, isLength} from 'validator'; //문자열 검증

class MyPasswordContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password: "",
            newPassword: "",
            newPasswordConfirm: "",
        }
    }

    componentDidMount() {

    }

    handleInputChange = (e) => {
        let input = {};
        input[e.target.name] = e.target.value;
        this.setState(input);
       
    }

    validate = () =>{
        const { password, newPassword, newPasswordConfirm } = this.state;
        
        const pwCheck = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])");
        if(!(password.length > 0 && newPassword.length > 0 && newPasswordConfirm.length > 0)){
            alert("패스워드를 입력하세요.")
            return false;
        }
        if(!isLength(newPassword, { min: 8 })) {
            alert('비밀번호를 8자 이상 입력하세요.');
            return false;
        }
        if(!pwCheck.test(newPassword)){
            alert("비밀번호는 대문자, 소문자, 숫자가 각각 1개 이상씩 포함되어야 합니다.");
            return false;
        }
        if(password === newPassword) {
            alert('새로운 비밀번호는 현재 비밀번호와 같을 수 없습니다.');
            return false;
        }
        if(newPassword !== newPasswordConfirm) {
            alert('새 비밀번호가 일치하지 않습니다.');
            return false;
        }
        return true;
    }

    handleChangePassword = () => {
        const self = this;
        const { password, newPassword, newPasswordConfirm } = this.state;
        //검증작업
        if(this.validate()){
            axios({
                url: devtest() +`/user/changePassword`, 
                method : 'put',
                data : {
                    password: password,
                    newPassword: newPassword,
                    newPasswordConfirm: newPasswordConfirm,
                },
                headers: { "Pragma": 'no-cache', "x-access-token": storage.getToken() }
            }).then(
                (res)=>{
                    if(res.status == 200 && res.data.indexOf("fail to change password") > -1) {
                        storage.setSessionObj(res.headers);
                        alert("비밀번호 변경을 실패했습니다.");
                        return;
                    }
                    //현재 step과 url입력 step이 같을 경우 
                    storage.setSessionObj(res.headers);
                    alert("비밀번호가 변경되었습니다.");
                    self.props.history.push("/mypage");
                }
            ).catch(
                (err)=>{
                    if(err.response.status==999){
                        alert("로그인이 필요합니다. 로그인 페이지로 이동합니다.");
                        self.props.history.push("/login");
                    }
                    else if(err.response.status==998){
                        alert("로그인 시간이 만료되었습니다. 로그인 페이지로 이동합니다.");
                        //sessionStorage에 userInfo key의 데이터 삭제
                        storage.removeSessionObj();
                        storage.removeSerialNumber();
                        //store의 login데이터 reset
                        MenuActions.setClickMenu("/login");
                        AuthActions.logout();

                        self.props.history.push("/login");
                    }
                    else if(err.response.status == 401){
                        alert("잘못된 로그인 정보입니다. 로그인 페이지로 이동합니다.");
                        storage.removeSessionObj();
                        storage.removeSerialNumber();
                        //store의 login데이터 reset
                        MenuActions.setClickMenu("/login");
                        AuthActions.logout();
                        self.props.history.push("/login");
                    }
                    else{
                        alert("알수없는 에러가 발생했습니다. 시스템 담당자에게 문의하세요.")
                        console.log( err.response);
                    }
                }
            );
        }
    }
    /** 취소버튼 */
    handleCancel = () => {
        this.props.history.push(`/mypage`);
    }

    /** Enter Key입력시 로그인 동작 */
    handleKeyPress = (e) => {
        if(e.charCode === 13){
            this.handleChangePassword();
        }
    }

    render() {
        const {handleChangePassword, handleCancel, handleInputChange, handleKeyPress} = this;
        return (
            <div className="sub-contents">
                <div className="sub-container">
                    <div className="location">
                        <div className="location-inner">
                            <div className="location-item">홈</div>
                            <div className="location-item">></div>
                            <div className="location-item">마이페이지</div>
                            <div className="location-item">></div>
                            <div className="location-item">비밀번호 변경</div>
                        </div>
                    </div>
                    <div className="sub-info">
                        <h2 className="sub_heading">비밀번호 변경</h2>
                        <div className="sub_heading_text">소중한 개인정보를 안전하게 관리하세요</div>
                        <br />
                    </div>
                    <div className="clear"></div>
                    <div className="sub_box">
                        <div className="register_area">
                            <table className="register_table_contents">
                                <tbody>
                                    <tr>
                                        <td><span>기존 비밀번호</span></td>
                                        <td>
                                            <input className="text_inpt" type="password" name="password" placeholder="비밀번호 (8자이상)" onChange={handleInputChange}/>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><span>새 비밀번호</span></td>
                                        <td>
                                            <input className="text_inpt" type="password" name="newPassword"  placeholder="새 비밀번호" onChange={handleInputChange}/>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><span>새 비밀번호 확인</span></td>
                                        <td>
                                            <input className="text_inpt" type="password" name="newPasswordConfirm"  placeholder="새 비밀번호 확인" onKeyPress={handleKeyPress} onChange={handleInputChange}/>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td>
                                            <span>(대문자, 소문자, 숫자가 각각 1개이상 포함 필수)</span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div style={{"width":"95%", "marginTop":"20px"}}>
                                <button className="normal_red_center_btn" style={{"width":"120px"}} onClick={handleChangePassword}>비밀번호 변경</button>
                                <button className="normal_red_center_btn" onClick={handleCancel}>취소</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        
         );
    }
}

export default connect(
    (state) => ({
        isLogin: state.auth.get('isLogin'),
        userId: state.auth.get('userId'),
        userType: state.auth.get('userType')

    }), (dispatch) => ({
        AuthActions: bindActionCreators(authActions, dispatch),
    })
)(MyPasswordContainer);
