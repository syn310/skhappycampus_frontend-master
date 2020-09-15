import React, { Component } from 'react';
const CompanyPopup = ({companyInfo, handlePopupClose}) => {


    const openWindow = (e) => {

        const url = e.target.innerText;
        window.open('http://'+url, '_blank'); 

    }


    return(
        <div className="popup_wrap">
            <div className="popup_area">
                {/* <!-- 팝업 헤더 시작 --> */}
                <div className="popup_header">
                    <div className="popup_title gt-f-l">채용희망사 소개</div>
                    <div className="popup_close" onClick={handlePopupClose}></div>
                    <div className="clear"></div>
                </div>
                {/* <!-- 팝업 헤더 끝 --> */}
                {/* <!-- 팝업 컨텐츠 시작 --> */}
                <div className="popup_contents" >
                        <div className="popup_contents_company_title">{companyInfo.companyName}</div>
                        <div className="popup_contents_text">
                            <div className="popup_company_info_area_noscroll">
                                <div className="popup_company_info_img gt-f-l"><img src={companyInfo.companyLogoUrl}/></div>
                                {/* <div> */}
                                    <table className="popup_company_info_table" id="companyTbl">
                                        <colgroup>
                                            <col width="68px"></col>
                                            <col width="200px"></col>
                                            <col width="68px"></col>
                                            <col width="100px"></col>
                                        </colgroup>
                                        <tbody>
                                            <tr>
                                                <th scope="row" >업종</th>
                                                <td scope="row" >{companyInfo.companyType}</td>
                                                <th scope="row" >사원</th>
                                                <td scope="row" >{companyInfo.employeeNumber}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">홈페이지</th>
                                                <td scope="row"><span className="company_url" onClick={openWindow}>{companyInfo.companyUrl}</span></td>
                                                <th scope="row">매출액(억)</th>
                                                <td scope="row">{companyInfo.sales}</td>
                                            </tr>
                                            
                                        </tbody>
                                    </table>
                                    {/* <div className="clear"/> */}
                                    <table className="popup_company_info_table" id="companyTbl2"> 
                                        <colgroup>
                                            <col width="68px"></col>
                                            <col width="400px"></col>
                                        </colgroup>
                                        <tbody>
                                            <tr>
                                                <th scope="row">주소</th>
                                                <td >{companyInfo.companyAddress}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">담당자</th>
                                                <td >{companyInfo.contactPerson} {companyInfo.contactPhone}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">인재상</th>
                                                <td >{companyInfo.idealType}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">회사소개</th>
                                                <td >{companyInfo.companyGuide}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                {/* </div> */}
                            </div>
                        </div>
                    </div>

              
            </div>
        </div>
    )
}

export default CompanyPopup;