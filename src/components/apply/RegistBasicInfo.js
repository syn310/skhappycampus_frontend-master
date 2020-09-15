import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import {dateFormat, dateBarFormat} from 'lib/dateFormat';

//개인정보
const RegistBasicInfo = ({basicInfo, code, handleBasicInfoChange, handleChangeBirth, addressSearch}) => {

    return (
        <table className="apply_step4_table_contents" id="basicInfo">
            <colgroup>
                <col width="174px" />
                <col width="334px" />
                <col width="174px" />
                <col width="334px" />
            </colgroup>
            <tbody>
                <tr>
                    <th scope="row">아이디<span className="asterisk">*</span></th>
                    <td>
                        <input type="text" name="applyUserId" className="text_inp_disable_97" disabled value={basicInfo.applyUserId}></input>
                        {/* <input name="applyUserId" className="text_inp_50" type="text" maxLength="30" value={basicInfo.applyUserId} onChange={handleBasicInfoChange} readOnly /> */}
                    </td>
                    <th scope="row">성명<span className="asterisk">*</span></th>
                    <td>
                        <input type="text" name="applyName" className="text_inp_disable_97" disabled value={basicInfo.applyName}></input>
                        {/* <input name="applyName" className="text_inp_50" type="text" maxLength="30"  value={basicInfo.applyName} onChange={handleBasicInfoChange} /> */}
                    </td>
                </tr>
                <tr>
                    <th scope="row">국적<span className="asterisk">*</span></th>
                    <td>
                        <input type="text" name="applyNationality" className="text_inp_disable_97" disabled value="대한민국"></input>
                    </td>

                    {/* <td><input name="applyNationality" className="text_inp_50" type="text" maxLength="30" value={basicInfo.applyNationality} onChange={handleBasicInfoChange} /></td> */}
                    <th scope="row">생년월일<span className="asterisk">*</span></th>
                    <td>
                        <input type="text" name="applyBirth" className="text_inp_disable_97" disabled value={dateBarFormat(basicInfo.applyBirth)}></input>
                        {/* <DatePicker showMonthDropdown showYearDropdown dropdownMode="select" maxDate={new Date()} className="text_inp_50"
                            name="applyBirth" value={basicInfo.applyBirth} onChange={handleChangeBirth}/> */}
                    </td>
                </tr>
                <tr>
                    <th scope="row">성별</th>
                    <td>
                        <div className="apply_radio_area">
                            <input id="male" name="applyGender" className="radio_18" type="radio" value="남" checked={basicInfo.applyGender==="남" ? true : false} disabled />
                            <label htmlFor="male">남</label>
                            <span className="margin_right_10"></span>
                            <input id="female" name="applyGender" className="radio_18" type="radio" value="여" checked={basicInfo.applyGender==="여" ? true : false} disabled />
                            <label htmlFor="female">여</label>
                        </div>
                    </td>
                    <th scope="row">전화번호<span className="asterisk">*</span></th>
                    <td><input name="applyPhone" className="text_inp_50" type="text" maxLength="30" value={basicInfo.applyPhone} onChange={handleBasicInfoChange} placeholder="010-1234-5678"/></td>
                </tr>
                <tr>
                    <th scope="row">주소<span className="asterisk">*</span> </th>
                    <td colSpan="3">
                        <input name="applyAddress" className="text_inp_80" type="text" maxLength="100"  value={basicInfo.applyAddress} onChange={handleBasicInfoChange} />
                        <div onClick={addressSearch} className="btn_add_Search">검색</div>
                    </td>
                </tr>
                <tr>
                    <th scope="row">장애여부</th>
                    <td>
                        <div className="apply_radio_area">
                            <input id="disabilityY" name="disabilityYn" className="radio_18" type="radio" value="예" checked={basicInfo.disabilityYn === "예" ? true : false} onChange={handleBasicInfoChange} />
                            <label htmlFor="disabilityY">예</label>
                            <span className="margin_right_10"></span>
                            <input id="disabilityN" name="disabilityYn" className="radio_18" type="radio" value="아니오" checked={basicInfo.disabilityYn === "아니오" ? true : false} onChange={handleBasicInfoChange} />
                            <label htmlFor="disabilityN">아니오</label>
                        </div>
                    </td>
                    <th scope="row">병역여부</th>
                    <td>
                        <div className="apply_radio_area">
                            <input id="militaryNo" name="militaryYn" className="radio_18" type="radio" value="해당사항없음" checked={basicInfo.militaryYn === "해당사항없음" ? true : false} onChange={handleBasicInfoChange} />
                            <label htmlFor="militaryNo">해당사항없음</label>
                            <input id="militaryComp" name="militaryYn" className="radio_18" type="radio" value="군필" checked={basicInfo.militaryYn === "군필" ? true : false} onChange={handleBasicInfoChange} />
                            <label htmlFor="militaryComp">군필</label>
                            <input id="militaryFree" name="militaryYn" className="radio_18" type="radio" value="면제" checked={basicInfo.militaryYn === "면제" ? true : false} onChange={handleBasicInfoChange} />
                            <label htmlFor="militaryFree">면제</label>
                            <input id="militaryYet" name="militaryYn" className="radio_18" type="radio" value="미필" checked={basicInfo.militaryYn === "미필" ? true : false} onChange={handleBasicInfoChange} />
                            <label htmlFor="militaryYet">미필</label>
                        </div>
                    </td>
                </tr>
                <tr>
                    <th scope="row">보훈대상여부<span className="asterisk">*</span></th>
                    <td colSpan="3">
                        <div className="apply_radio_area">
                            <input id="veteransY" name="veteransYn" className="radio_18" type="radio" value="예" checked={basicInfo.veteransYn === "예" ? true : false} onChange={handleBasicInfoChange} />
                            <label htmlFor="veteransY">예</label>
                            <span className="margin_right_10"></span>
                            <input id="veteransN" name="veteransYn" className="radio_18" type="radio" value="아니오" checked={basicInfo.veteransYn === "아니오" ? true : false} onChange={handleBasicInfoChange} />
                            <label htmlFor="veteransN">아니오</label>
                        </div>
                    </td>
                </tr>
            </tbody>
    </table>
    )


}

export default RegistBasicInfo;