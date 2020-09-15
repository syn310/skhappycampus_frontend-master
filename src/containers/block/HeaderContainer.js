import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {withRouter, Link} from 'react-router-dom';
import * as authActions from 'modules/auth';
import * as menuActions from 'modules/menu';
import storage from 'lib/storage';
import axios from 'axios';
import { NavContainer } from 'containers';
import logo from 'public/assets/img/logo.png';
import iconLogin from 'public/assets/img/icon_login.png';
import iconMypage from 'public/assets/img/icon_mypage.png';
import iconLogout from 'public/assets/img/icon_logout.png';
import devtest from 'lib/devtest';

class HeaderContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentWillMount = () => {
        //렌더링 전에 로그인 체크
        this.handleLoginCheck();

    }

    
    handleLoginCheck = () => {
      const {AuthActions} = this.props;
      if(storage.isLogin()) {
        const {AuthActions} = this.props;
        AuthActions.login(storage.getSessionObj);
      }else{
        AuthActions.logout();
      }
    }
   
    /** 화면 이동  */
    handleMoveTo = (e) => {
      //console.log("url", e.target.getAttribute("data-url"))
      const clickUrl =  e.currentTarget.getAttribute("data-url");
      this.props.MenuActions.setClickMenu(clickUrl);
      this.props.history.push(clickUrl);
    }

    /** 로그아웃 */
    handleLogout = () => {
      //console.log("")

      const { AuthActions, MenuActions } = this.props;
      const userId = storage.getUserInfo()
      const self = this;
     
      axios({
          url: devtest() + `/login/delete`, 
          method : 'post',
          headers: { "Pragma": 'no-cache' },
          data : {
              userId: userId
          }
      }).then(
          (res) => {
            // console.log("로그아웃 로그", res)
            if(res.data.length > 0){
              //console.log("리턴", res);
              alert("로그아웃 되었습니다");
                MenuActions.setClickMenu("/");
                
                //sessionStorage에 userInfo key의 데이터 삭제
                storage.removeSessionObj();
                storage.removeSerialNumber();
                //store의 login데이터 reset
                AuthActions.logout();
                //메인페이지로 이동
                self.props.history.push("/");

            }
             // console.log(`res.data: ${res.data}`);
          }
      ).catch(function(err) {
            console.log(`err: ${err}`);
      });

    }

    styleCheck = (clicked, dataUrl) => {
        let style = {
            "textDecoration":"none"
        };

        if(clicked===dataUrl){
            style = {
                //"fontWeight":"600",
                "textDecoration":"underLine"
            };
        }
        // console.log(style)
        return style

    }



    render() {
      const {handleMoveTo, handleLogout, styleCheck} = this;
      const {isLogin, userId, clickedMenu} = this.props;
      return (
          <header className="header-wrap">
             <div className="plate">
              <h1 className="logo gt-f-l" >
                  <img alt=" 행복성장캠퍼스" style={{"cursor":"pointer"}} src={logo} data-url="/" onClick={handleMoveTo}></img>
              </h1>
              <NavContainer></NavContainer>
              
              { isLogin && 
                <div>
                  <div className="logout" onClick={handleLogout}>
                    <img src={iconLogout}></img><span >로그아웃</span>
                  </div>
                  <div className="mypage" data-url="/mypage" onClick={handleMoveTo}>
                    <img src={iconMypage}></img><span style={styleCheck(clickedMenu, "/mypage")}>마이페이지</span>
                  </div>
                </div>
              }
              { !isLogin && <div className="login" data-url="/login" onClick={handleMoveTo}><img src={iconLogin}></img><span style={styleCheck(clickedMenu, "/login")}>로그인</span></div>}
            </div>
          </header>
      );
    }
}

export default withRouter(connect(
  (state) => ({
      isLogin: state.auth.get('isLogin'),
      userId: state.auth.get('userId'),
      userType: state.auth.get('userType'),
      clickedMenu: state.menu.get('clickedMenu'),
  }), (dispatch) => ({
      AuthActions : bindActionCreators(authActions, dispatch),
      MenuActions : bindActionCreators(menuActions, dispatch)
  })
)(HeaderContainer));