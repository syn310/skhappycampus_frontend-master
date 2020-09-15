
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { CompanyList } from 'components';

//step 6 단계 회사선택
const SelectCompany = ({matchFail, handleLogoClick, handlePrevClick, handlePriorityClick, company_1, company_2, company_3, validationCheck, handleSaveTemp, recommendList}) => {

    return(
        <div>
            <div className="sub-info">
                <h3 className="sub_heading_3dep_2">STEP6 회사선택</h3>
            </div>
            <div className="clear"></div>

            <div className="sub_box">
            <div className="apply_step4">

            <div className="apply_step4_list">
                <div>
                    <div className="apply_step4_table_title">추천회사<span>나의 성향에 맞는 회사를 추천해드립니다</span></div>
                    <div className="line_2_gray"></div>
                    <div className="apply_step4_table_inner_content">
                        아래 추천업체는 작성하신 자기소개서를 바탕으로 AI 기술을 통해 지원자에게 적합한 업체를 추천하는 정보이며<br/> 지원자는 본인 의사에 따라 1~3지망 회사를 선택할 수 있습니다. (미추천 업체도 지원가능)
                    </div>
                    
                    { recommendList.length == 0 ? 
                        ( matchFail ? 
                            <div style={{"textAlign":"center"}}><h3>매칭 오류로 데이터를 가져오지 못하였습니다.</h3></div>
                            :
                            <div style={{"textAlign":"center"}}><h3>매칭중...</h3></div>
                        )
                         :
                        <div>
                            {/* <div className="line_2_gray"></div> */}
                            <div className="company_img_area">
                                <ul className="company_img_box gt-f-l" onClick={handleLogoClick} style={{"marginRight": "31px", "cursor":"pointer"}} data-companyid={recommendList[0].companyId}>
                                    <li><img src={recommendList[0].companyLogoUrl} /></li>
                                    <li className="company_img_ci_title">{recommendList[0].companyName}</li>
                                    <li className="company_img_ci_text">{recommendList[0].companyGuide}</li>
                                </ul>
                                <ul className="company_img_box gt-f-l" onClick={handleLogoClick} style={{"marginRight": "31px", "cursor":"pointer"}} data-companyid={recommendList[1].companyId}>
                                    <li><img src={recommendList[1].companyLogoUrl} /></li>
                                    <li className="company_img_ci_title">{recommendList[1].companyName}</li>
                                    <li className="company_img_ci_text">{recommendList[1].companyGuide}</li>
                                </ul>
                                <ul className="company_img_box gt-f-l" onClick={handleLogoClick} style={{"cursor":"pointer"}} data-companyid={recommendList[2].companyId}>
                                    <li><img src={recommendList[2].companyLogoUrl} /></li>
                                    <li className="company_img_ci_title">{recommendList[2].companyName}</li>
                                    <li className="company_img_ci_text">{recommendList[2].companyGuide}</li>
                                </ul>
                            </div>
                        </div>
                    }

                </div>
            </div>


            <div className="apply_step4_table_area">


            <table className="apply_step4_table2_contents">
            <colgroup>
                <col width="107px" />
                <col width="290px" />
                <col width="186px" />
                <col width="186px" />
                <col width="186px" />
                <col width="108px" />
            </colgroup>
                <tbody>
                    <tr>
                        <th scope="row">구분</th>
                        <th scope="row">회사명</th>
                        <th scope="row">직무</th>
                        <th scope="row">근무지</th>
                        <th scope="row">연봉수준</th>
                        <th scope="row" style={{"borderRight": "0"}}>찾기</th>
                    </tr>
                    <tr>
                        <td>1지망</td>
                        <td><input className="text_inp_disable_95" type="text" maxLength="50" disabled value={ company_1.companyName ? company_1.companyName : "" } /></td>
                        <td><input className="text_inp_disable_85" type="text" maxLength="50" disabled value={ company_1.recruitJob ? company_1.recruitJob : "" } /></td>
                        <td><input className="text_inp_disable_85" type="text" maxLength="50" disabled value={ company_1.workplace ? company_1.workplace : "" } /></td>
                        <td><input className="text_inp_disable_85" type="text" maxLength="50" disabled value={ company_1.fulltimeSalary ? company_1.fulltimeSalary : "" } /></td>
                        <td style={{"borderRight": "0"}}> <div data-priority="1" onClick={handlePriorityClick} className="btn_Search">찾기</div></td>
                    </tr>
                    <tr>
                        <td>2지망</td>
                        <td><input className="text_inp_disable_95" type="text" maxLength="50" disabled value={ company_2.companyName ? company_2.companyName : "" } /></td>
                        <td><input className="text_inp_disable_85" type="text" maxLength="50" disabled value={ company_2.recruitJob ? company_2.recruitJob : "" } /></td>
                        <td><input className="text_inp_disable_85" type="text" maxLength="50" disabled value={ company_2.workplace ? company_2.workplace : "" } /></td>
                        <td><input className="text_inp_disable_85" type="text" maxLength="50" disabled value={ company_2.fulltimeSalary ? company_2.fulltimeSalary : "" } /></td>
                        <td style={{"borderRight": "0"}}> <div data-priority="2" onClick={handlePriorityClick} className="btn_Search">찾기</div></td>
                    </tr>
                    <tr>
                        <td>3지망</td>
                        <td><input className="text_inp_disable_95" type="text" maxLength="50" disabled value={ company_3.companyName ? company_3.companyName : "" } /></td>
                        <td><input className="text_inp_disable_85" type="text" maxLength="50" disabled value={ company_3.recruitJob ? company_3.recruitJob : "" } /></td>
                        <td><input className="text_inp_disable_85" type="text" maxLength="50" disabled value={ company_3.workplace ? company_3.workplace : "" } /></td>
                        <td><input className="text_inp_disable_85" type="text" maxLength="50" disabled value={ company_3.fulltimeSalary ? company_3.fulltimeSalary : "" } /></td>
                        <td style={{"borderRight": "0"}}> <div data-priority="3" onClick={handlePriorityClick} className="btn_Search">찾기</div></td>
                    </tr>
                </tbody>
            </table>
            <div style={{"marginTop":"5px","float":"left"}}>※ 3지망까지 필수 선택</div>
            </div>
            </div>
            </div>

            {/* 매칭 진행중 일때는 버튼을 표시하지 않음.
            매칭 결과가 나왔을때 (성공이던 실패) 버튼을 표시 */}
            { recommendList.length == 0 ?
                ( matchFail ? 
                        <div className="page_btn_area_agreement">
                            <div className="page_btn_box_3btn">
                            <a className="btn_full_next gt-f-l margin_right_20" data-temp="prev" onClick={validationCheck}>이전단계</a>
                            <a className="btn_full_save gt-f-l margin_right_20" data-temp="temp" onClick={handleSaveTemp}>중간저장</a>
                            <a className="btn_full_next gt-f-l" data-temp="next" onClick={validationCheck}>다음단계</a>
                            <div className="clear"></div>
                            </div>
                        </div>
                        :
                        undefined )
                    : 
                <div className="page_btn_area_agreement">
                    <div className="page_btn_box_3btn">
                    <a className="btn_full_next gt-f-l margin_right_20" data-temp="prev" onClick={validationCheck}>이전단계</a>
                    <a className="btn_full_save gt-f-l margin_right_20" data-temp="temp" onClick={handleSaveTemp}>중간저장</a>
                    <a className="btn_full_next gt-f-l" data-temp="next" onClick={validationCheck}>다음단계</a>
                    <div className="clear"></div>
                    </div>
                </div>
            }


        </div>

    )
}

export default SelectCompany;
