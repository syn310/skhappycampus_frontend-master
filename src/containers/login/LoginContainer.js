import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import * as authActions from 'modules/auth';
import * as menuActions from 'modules/menu';
import storage from 'lib/storage';
import { isEmail } from 'validator'; //문자열 검증
import devtest from 'lib/devtest';
class LoginContainer extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            applyUserId: "",
            inputId:"",
            inputEmail:"",
            inputPw:"",
            customInput:true //직접입력이 디폴트
        }
    }

    handleInputChange = (e) => {
        let input = {};
        input[e.target.name] = e.target.value;
        this.setState(input);
    }
    /** 로그인 입력 Validation */
    handleValidate = () => {
        const { inputId, inputPw, inputEmail } = this.state;
        if(!(inputId.length > 0 && inputPw.length > 0 && inputEmail.length > 0)){
            alert("아이디 혹은 패스워드를 입력하세요.")
            return false;
        }
        if(!isEmail(inputId + "@" + inputEmail)) {
            alert('잘못된 이메일 형식 입니다.');
            return false;
        }
        return true;
    }

    handleClickLogin = () => {

        const { AuthActions, MenuActions } = this.props;
        const { inputId, inputPw, inputEmail } = this.state;
        const { handleMoveToMain } = this;

        // console.log(inputId + " @ " + inputEmail)
        //this.handleValidate()

        if(this.handleValidate()){
            axios({
                url: devtest() +`/login/`, ///${inputPw}`,
                method : 'post',
                headers: { "Pragma": 'no-cache' },
                data : {
                    userId: inputId + "@" + inputEmail,
                    userPassword: inputPw
                }
            }).then(
                (res)=>{
                    //alert("로그인 되었습니다.")
                    //sessionStorage에 userInfo key의 데이터 추가
                    storage.setSessionObj(res.headers);
                    //console.log("set obj", res.headers)
                    //store의 login데이터 setting
                    AuthActions.login(res.headers);
                    MenuActions.setClickMenu("/")
                    //메인 화면으로 이동
                    handleMoveToMain();
                }
            ).catch(function(e) {
                AuthActions.logout();
                // console.log(`e.response: ${e.response}`)
                // console.log(`e.response: ${e}`)
                if(e.response.status === 401) {
                    alert('ID 혹은 패스워드가 일치하지 않습니다');
                }else{
                    alert('서버에러가 발생했습니다. 관리자에게 문의하세요.');
                }
            });
        }
    }

    /** 회원가입 페이지 이동 */
    handleMoveToRegister = () => {
        this.props.history.push("/register")
    }

    /** 메인 페이지 이동 */
    handleMoveToMain = () => {
        this.props.history.push("/");
    }
    /** Enter Key입력시 로그인 동작 */
    handleKeyPress = (e) => {
        if(e.charCode === 13){
            this.handleClickLogin();
        }
    }

    /** 이메일 Domain의 직접입력 checkbox event 직접입력이 디폴트.*/ 
    handleCustomInput = (e) => {
        //console.log(e.target.checked)
        this.setState({
            customInput: e.target.checked,
            inputEmail:""
        });
    }

    render() {

        const { handleInputChange,
                handleClickLogin,
                handleMoveToRegister,
                handleKeyPress,
                handleCustomInput } = this;
        const { customInput } = this.state

        return ( 
            <div className="sub-contents">
                <div className="sub-container">
                    <div className="sub_login_box">
                        <div className="margin_left_10">
                            <h3>로그인</h3>
                        </div>
                        <div className="login_area">
                            
                            <div className="inpt_field v2 ">
                                    <input className="text_inpt_50 v2" type="text" name="inputId" placeholder="아이디" onChange={handleInputChange}/><span> @ </span>
                                    {
                                        !customInput ? 
                                        <select className="sel_inpt_70 margin_right_10" name="inputEmail" onChange={handleInputChange}>
                                            <option value="">선택</option>
                                            <option value="gmail.com">gmail.com</option>
                                            <option value="naver.com">naver.com</option>
                                            <option value="yahoo.com">yahoo.com</option>
                                            <option value="nate.com">nate.com</option>
                                            <option value="daum.net">daum.net</option>
                                        </select> 
                                            :
                                        <input className="text_inpt_70 v2 margin_right_10" type="text" name="inputEmail" placeholder="이메일" onChange={handleInputChange}/>
                                    }
                                    <span>
                                        <input type="checkbox" id="registerDuplicate" checked={customInput} onChange={handleCustomInput}/>
                                        <label htmlFor="registerDuplicate"><em></em>직접입력</label>
                                    </span>
                            </div>

                            <div className="inpt_field v2">
                                <input className="text_inpt v2" type="password" name="inputPw" placeholder="비밀번호" onChange={handleInputChange} onKeyPress={handleKeyPress}/><br/>
                            </div>
                            <div className="login_field">
                                <div className="login_btn" onClick={handleMoveToRegister}><span>회원가입</span></div>
                                <div className="login_btn" onClick={handleClickLogin}><span>로그인</span></div>
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
        userId : state.auth.get("userId"),
        clickedMenu: state.menu.get('clickedMenu'),
    }), (dispatch) => ({
        AuthActions: bindActionCreators(authActions, dispatch),
        MenuActions: bindActionCreators(menuActions, dispatch),
        
    })
)(LoginContainer);
