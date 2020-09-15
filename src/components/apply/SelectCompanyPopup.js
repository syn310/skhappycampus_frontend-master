import React, { Component } from 'react';
//import './SelectCompany.css';
import { connect } from 'react-redux'; 
import { bindActionCreators } from 'redux';
import storage from 'lib/storage';

/* 회사선택 슬라이드를 위한 선언*/
import Whirligig from 'react-whirligig'
let whirligig;
/* 회사선택 슬라이드를 위한 선언*/

class SelectCompanyPopup extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            clickedCompany: null,
            companyList: []
         }
    }

    componentDidMount = () => {
        this.setState({
            companyList: this.props.companyList
        })
    }

    //로고클릭 시 아래에 회사정보 display
    handleLogoClick = (e) => {
        this.setState({
            clickedCompany: e.currentTarget.getAttribute("data-company")
        })
    }

    //회사선택.
    clickselect = () => {
        this.props.handleClickSelect(this.state.clickedCompany);
    }

    //슬라이드 버튼
    slideNext = () => { 
        whirligig.next() 
    }
    
    //슬라이드 버튼
    slidePrev = () => {
        whirligig.prev()
    }


    render() { 
        const { priority,
                handlePopupClose } = this.props;
        const { clickedCompany } = this.state;
        const { handleLogoClick,
                clickselect, 
                slideNext, 
                slidePrev } = this;


        //로고 리스트 생성    
        const generateCompanyLogo = companyList => {
            return companyList.map( (company, idx) => {
                return(
                        <li data-company={company.companyId}  key={company.companyId} onClick={handleLogoClick} style={{"margin":"5px 0px 0px 10px"}}>
                            <div className="popup_company_img"><img src={company.companyLogoUrl} /> </div>
                            <div className="popup_company_text" style={{"textDecoration": (company.companyId===this.state.clickedCompany ? "underline" : "none") }}>{company.companyName}</div>
                        </li>
                
                        
                )
            }
            )
        }

        //로고 클릭 시 하단에 회사 정보 보여주는 부분 생성
        const generateCompanyInfo = company => {
            return (
                <div>
                    <div className="popup_contents_company" >
                        <div className="popup_contents_company_title">{company.companyName}</div>
                        <div className="popup_contents_text">
                            <div className="popup_company_info_area">
                                <div className="popup_company_info_img gt-f-l"><img src={company.companyLogoUrl} /></div>
                                <div>
                                    <table className="popup_company_info_table">
                                        <colgroup>
                                            <col width="80px" />
                                            <col width="300px" />
                                            <col width="80px" />
                                            <col width="100px" />
                                        </colgroup>
                                        <tbody>
                                            <tr>
                                                <th scope="row">업종</th>
                                                <td scope="row">{company.companyType}</td>
                                                <th scope="row">사원</th>
                                                <td scope="row">{company.employeeNumber}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">홈페이지</th>
                                                <td scope="row">{company.companyUrl}</td>
                                                <th scope="row">매출액(억원)</th>
                                                <td scope="row">{company.sales}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">주소</th>
                                                <td colSpan="3">{company.companyAddress}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">담당자</th>
                                                <td colSpan="3">{company.contactPerson} {company.contactPhone}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">인재상</th>
                                                <td colSpan="3">{company.idealType}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="clear margin_top_20">
                                    <div className="popup_company_info_gray_box gt-f-l margin_right_20">
                                        <div className="popup_company_info_gray_box_title"><span>모집직무</span></div>
                                        <div className="popup_company_info_gray_box_text">{company.recruitJob}</div>
                                    </div>
                                    <div className="popup_company_info_gray_box_big gt-f-l margin_right_20">
                                        <div className="popup_company_info_gray_box_title"><span>상세업무</span></div>
                                        <div className="popup_company_info_gray_box_text">{company.jobDetail}</div>
                                    </div>
                                    <div className="popup_company_info_gray_box_big gt-f-l margin_right_20">
                                        <div className="popup_company_info_gray_box_title"><span>우대사항</span></div>
                                        <div className="popup_company_info_gray_box_text">{company.preferencePoint}</div>
                                    </div>
                                    <div className="popup_company_info_gray_box gt-f-l margin_top_20 margin_right_20">
                                        <div className="popup_company_info_gray_box_title"><span>선호학력</span></div>
                                        <div className="popup_company_info_gray_box_text">{company.preferDegree}</div>
                                    </div>
                                    <div className="popup_company_info_gray_box gt-f-l margin_top_20 margin_right_20">
                                        <div className="popup_company_info_gray_box_title"><span>채용인원</span></div>
                                        <div className="popup_company_info_gray_box_text">{company.recruitNumber}</div>
                                    </div>
                                    <div className="popup_company_info_gray_box gt-f-l margin_top_20 margin_right_20">
                                        <div className="popup_company_info_gray_box_title"><span>근무지</span></div>
                                        <div className="popup_company_info_gray_box_text">{company.workplace}</div>
                                    </div>

                                    {/* 고용형태 고용기간 인턴시급여 항목 제거 */}
                                    {/* <div className="popup_company_info_gray_box gt-f-l margin_top_20 margin_right_10">
                                        <div className="popup_company_info_gray_box_title"><span>고용형태</span></div>
                                        <div className="popup_company_info_gray_box_text">{company.recruitType}</div>
                                    </div>
                                    <div className="popup_company_info_gray_box gt-f-l margin_top_20 margin_right_10">
                                        <div className="popup_company_info_gray_box_title"><span>고용기간</span></div>
                                        <div className="popup_company_info_gray_box_text">{company.employStartDate} ~ {company.employEndDate}</div>
                                    </div>
                                    <div className="popup_company_info_gray_box gt-f-l margin_top_20 margin_right_10">
                                        <div className="popup_company_info_gray_box_title"><span>인턴시 급여</span></div>
                                        <div className="popup_company_info_gray_box_text">{company.internSalary}</div>
                                    </div> */}

                                    <div className="popup_company_info_gray_box gt-f-l margin_top_20 margin_right_20">
                                        <div className="popup_company_info_gray_box_title"><span>정규직 전환연봉</span></div>
                                        <div className="popup_company_info_gray_box_text">{company.fulltimeSalary}</div>
                                    </div>
                                    <div className="popup_company_info_gray_box gt-f-l margin_top_20 margin_right_20">
                                        <div className="popup_company_info_gray_box_title"><span>비고</span></div>
                                        <div className="popup_company_info_gray_box_text">{company.remark}</div>
                                    </div>
                                    
                                    <div className="margin_bottom_20 clear"></div>
                                </div>
                            </div>
                        </div>
                    </div>


           
            </div>
            )
        }

        return ( 

            <div className="popup_wrap">
                <div className="popup_area_company">
                    <div>
                    <div className="popup_header">
                        <div className="popup_title gt-f-l">회사선택</div>
                        <div className="popup_close" style={{"cursor":"pointer"}} onClick={handlePopupClose}></div>
                        <div className="clear"></div>
                    </div>

                {/** 로고 슬라이드 */}
                <div className="popup_company_area">
                    <div className="popup_img_arrow_area">
                        <div className="popup_img_pev_arrow" onClick={slidePrev}></div>
                    </div>
                    <div className="popup_company_img_area" style={{"width":"1000px"}}>
                            <div>
                                <ul>
                                        <Whirligig
                                            gutter="10px"
                                            visibleSlides={5}
                                            animationDuration={500}
                                            ref={(_whirligigInstance) => { whirligig = _whirligigInstance}}
                                            preventScroll={true}
                                        >
                                            {generateCompanyLogo(this.state.companyList)}
                                        </Whirligig>
                                </ul>
                            </div>
                    </div>
                    <div className="popup_img_arrow_area">
                        <div className="popup_img_next_arrow" onClick={slideNext}></div>
                    </div>
                </div>


                <div>
                    {
                        clickedCompany ? 
                            <div>
                                {/* {clickedCompany}로 조회한 회사정보를 보여줌 */}
                                {console.log(clickedCompany)}
                                {console.log(this.state.companyList.filter((obj)=>{ return obj.companyId=== clickedCompany })[0])}
                                {generateCompanyInfo(this.state.companyList.filter((obj)=>{ return obj.companyId=== clickedCompany })[0])}
                                <div className="popup_button_area">
                                    <button className="popup_button_btn" onClick={clickselect}>지원하기</button>
                                </div>
                            </div>
                        : undefined
                    }
                </div>
                </div>
            </div> 
            </div>
            );
    }
}

// 컴포넌트에 리덕스 스토어를 연동해줄 때에는 connect 함수 사용
export default connect(
    (state) => ({
        serialNumber : state.apply.get('serialNumber'),
        isLogin: state.auth.get('isLogin'),
        userId: state.auth.get('userId'),
        userType: state.auth.get('userType')
    }), (dispatch) => ({

    })
)(SelectCompanyPopup);
