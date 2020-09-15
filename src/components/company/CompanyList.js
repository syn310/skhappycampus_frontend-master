import React, { Component } from 'react';
//import company_9 from 'assets/img/cooperator/img_company_info_big_9.png';
const CompanyList = ({companyList, handleLogoClick}) => {

    //참여회사 행렬 N by 3 으로 생성
    const generateCompanyList = (companyListData) => {
        const repeatIndex = Math.ceil(companyListData.length/3);
        return _.times(repeatIndex, function(idx, a){
            return(
                <div className="company_img_area gt-f-l" key={idx}>
                        {
                            companyListData[3*idx] ? 
                            <ul className="company_img_box gt-f-l" style={{"marginRight": "31px", "cursor":"pointer"}} onClick={handleLogoClick} data-companyid={companyListData[3*idx].companyId}>
                                <li><img src={companyListData[3*idx].companyLogoUrl}/></li>
                                <li className="company_img_ci_title">{companyListData[3*idx].companyName}</li>
                                <li className="company_img_ci_text">{companyListData[3*idx].companyGuide}</li>
                            </ul>: undefined
                        }
                        {
                            companyListData[3*idx+1] ? 
                            <ul className="company_img_box gt-f-l" onClick={handleLogoClick} data-companyid={companyListData[3*idx+1].companyId} style={{"marginRight": "31px", "cursor":"pointer"}}>
                                <li><img src={companyListData[3*idx+1].companyLogoUrl}/></li>
                                <li className="company_img_ci_title">{companyListData[3*idx+1].companyName}</li>
                                <li className="company_img_ci_text">{companyListData[3*idx+1].companyGuide}</li>
                            </ul>: undefined
                        }
                        {
                            companyListData[3*idx+2] ? 
                            <ul className="company_img_box gt-f-l" onClick={handleLogoClick} data-companyid={companyListData[3*idx+2].companyId} style={{"cursor":"pointer"}}>
                                <li><img src={companyListData[3*idx+2].companyLogoUrl}/></li>
                                <li className="company_img_ci_title">{companyListData[3*idx+2].companyName}</li>
                                <li className="company_img_ci_text">{companyListData[3*idx+2].companyGuide}</li>
                            </ul>: undefined
                        }
                </div>
            )
        })
    }
    return (
        <div>
            {generateCompanyList(companyList)}
              
        </div>
    )
}

export default CompanyList;