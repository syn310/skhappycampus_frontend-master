import React, { Component } from 'react';
import {CompanyList, CompanyPopup} from '../../components'
import { bindActionCreators } from 'redux';
import axios from 'axios';
import { connect } from 'react-redux'; 
import * as companyActions from 'modules/company';
import devtest from 'lib/devtest';

class CompanyContainer extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            openPopup: false,
            clickedCompanyId:""
         }
    }

    componentDidMount = () => {

        //회사리스트조회
        this.getCompanyList();

    }

    getCompanyList = () => {

        const { CompanyAction } = this.props;

        axios({
            url: devtest() + "/company/",
            method:"get",
            headers: { Pragma: 'no-cache'}
        }).then(
            (res)=>{
                if(res.data) {
                    //let_.sortBy(res.data, [function(o) { return o.companyName; }]);
                    CompanyAction.setCompanyList(res.data);
                }
            }
        ).catch(
            (err)=>{
                alert("회사 목록을 로드하는데 실패하였습니다.")
                console.log(err)

            }
        )

    }


    //회사 로고 클릭시 팝업띄움
    handleLogoClick = (e) => {
   
        const companyId = e.currentTarget.getAttribute("data-companyid");

        const self = this;
        const { CompanyAction } = this.props;


        axios({
            url:devtest() +`/company/${companyId}`,
            method:"get",
            headers: { Pragma: 'no-cache'}
        }).then(
            (res)=>{
                if(res.data) {
                    CompanyAction.setCompanyInfo(res.data);

                    self.setState({
                        openPopup: true,
                        clickedCompanyId: companyId
                    })


                }
            }
        ).catch(
            (err)=>{
                alert("회사 정보를 가져오는데 실패하였습니다.");
                console.log(err.response)
            }
        )


    }

    //팝업닫기
    handlePopupClose = () => {
        this.setState({openPopup:false})
    }
    
    render() { 
        const { openPopup,
                clickedCompanyId } = this.state;
        const { handleLogoClick,
                handlePopupClose } = this;
        const { companyList,
                companyInfo } = this.props;

        return ( 
            <div>
                <div className="sub-contents">
                    <div className="sub-container">
                        <div className="location">
                            <div className="location-inner">
                                <div className="location-item">홈</div>
                                <div className="location-item">></div>
                                <div className="location-item">채용희망사 소개</div>
                            </div>
                        </div>
                        <div className="sub-info">
                            <h2 className="sub_heading">채용희망사 소개</h2>
                            {/* <div className="sub_heading_text">꿈과 열정의 주인공 당신을 기다립니다</div> */}
                            <div className="sub_heading_text">채용희망사는 SK주식회사와 함께 사업 목적 달성을 위해 협력하는 우수 중소기업 입니다</div>
                            <br />
                        </div>
                        <div className="sub_box">
                            <div className="apply_step4">
                                <div className="apply_step4_list">
                                    <div>
                                        <div className="apply_step4_table_title">채용희망사<span>※ 지원서 작성 단계에서 보다 자세한 채용희망사 정보를 확인하실 수 있습니다.</span></div>
                                        <div className="line_2_gray"></div>
                                        <CompanyList companyList={companyList} handleLogoClick={handleLogoClick}></CompanyList>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {openPopup ? <CompanyPopup companyInfo={companyInfo} handlePopupClose={handlePopupClose}></CompanyPopup> : undefined }
            </div>
         );
    }
}



export default connect(
    //props로 넣어줄 스토어 상태값
    (state) => ({
        companyList: state.company.get("companyList"),
        companyInfo: state.company.get("companyInfo")
    })
    //props로 넣어줄 액션 생성함수
    , (dispatch) => ({
        CompanyAction : bindActionCreators(companyActions, dispatch)
    })
)(CompanyContainer);
