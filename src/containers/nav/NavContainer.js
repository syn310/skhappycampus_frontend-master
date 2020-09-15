import React, { Component } from 'react';
import axios from  'axios';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as menuActions from 'modules/menu';
import { withRouter } from 'react-router-dom';
import devtest from 'lib/devtest';

class NavContainer extends Component {
    /** 생성자 */
    constructor(props) {
        super(props);
        this.state = {
          clicked: "",
          menuData:[]
        };
    }

    componentDidMount() {
        //게시판 리스트 조회
        this.handleGetMenuList()
    }

    handleScroll() {
        this.setState({scroll: window.scrollY});
    }

    componentDidUpdate() {
        this.state.scroll > this.state.top ?
            document.body.style.paddingTop = `${this.state.height}px` :
            document.body.style.paddingTop = 0;
    }

    /** 저장된 메뉴 리스트 조회 */
    handleGetMenuList = () => {
        const { MenuActions } = this.props;
        axios({
          url:devtest() +"/menu",
          method:"get",
          headers: { Pragma: 'no-cache'}
        })
        .then( (response) => {
          if (response.data){
              //조회한 데이터 store에 셋팅
              MenuActions.setMenuList(response.data);
              this.setState({
                menuData: response.data
              })
          }
        }).catch(function(error) {
          console.log(error);
        });
    }

    /** 화면 이동  */
    handleMoveTo = (e) => {

        e.stopPropagation();

        const clickUrl =  e.currentTarget.getAttribute("data-url");
        const submenu =  e.currentTarget.getAttribute("data-submenu") || "";

        // if(clickUrl.indexOf("intro") > -1){
        //     document.getElementsByClassName("nav__submenu").style.width = "1000"
        //     //console.log("asdfasf")
        //     //document.getElementsByClassName("nav__submenu")[0].style.top = "10px";
        // }

        this.props.MenuActions.setClickMenu(clickUrl);
        this.props.history.push(clickUrl+submenu);

    }

    styleCheck = (clicked, dataUrl) => {
        let style = {
            "textDecoration":"none"
        };
        if(clicked===dataUrl){
            style = {
                "textDecoration":"underLine"
            };
        }
        return style

    }

    
    render() {

        const { menuList, 
                clickedMenu } = this.props;

        const { handleMoveTo, 
                styleCheck } = this;

        const { menuData } = this.state; 

        const generateMenuList = (menuData) => {
                const originData = menuData;
                let depth1Arr = _.filter(originData, function(obj) { return obj.depth==1 && obj.showYn==="Y"; });
                let depth2Arr = _.filter(originData, function(obj) { return obj.depth==2 && obj.showYn==="Y"; });

                return depth1Arr.map(
                    (obj,idx)=>{
                        const subMenu =  _.find(originData, {'parent': obj.menuId}) ? true : false;
                        
                        return (
                            <li className="gt-f-l nav__menu-item" key={obj.menuId} data-url={obj.url} data-submenu={obj.subUrl} onClick={handleMoveTo}>
                                <span className="gnb_1depth" style={styleCheck(clickedMenu, obj.url)} >
                                    {obj.menuName}
                                </span>
                                { subMenu ? 
                                    <ul className="nav__submenu">
                                        { generateSubMenuList(depth2Arr, obj.menuId) }
                                    </ul>
                                    : 
                                    undefined 
                                 }
                            </li>
                        )
                    }
                )
            }
        
        const generateSubMenuList = (subData, parentId) => {

            let subMenu =  _.filter(subData, function(obj) { return obj.parent==parentId; });

            return subMenu.map(
                (obj,idx)=>{
                    return (
                        <li className="nav__submenu-item" key={obj.menuId} data-url={obj.url} data-submenu={obj.subUrl} onClick={handleMoveTo}>
                        <a>{obj.menuName}</a>
                    </li>
                    )
                }
            )

        }

      return (
          <nav className="gt-f-l">
            <ul className="">
                {generateMenuList(menuData)}
            </ul>
          </nav>
         
      );
    }
}
export default withRouter(connect(
    (state) => ({
        menuList: state.menu.get('menuList'),
        clickedMenu: state.menu.get('clickedMenu'),
    }), (dispatch) => ({
        MenuActions : bindActionCreators(menuActions, dispatch)
    })
)(NavContainer));
