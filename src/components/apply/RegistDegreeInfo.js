import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import {dateBarFormat} from 'lib/dateFormat';

//학력정보
//education Seq = 1 의 경우는 고등학교 학력 --> 필수사항이므로 1일때 vs 아닐때로 모양이 달라짐
const RegistDegreeInfo = ({addSchoolTbl, delSchoolTbl, degreeInfoArr, handleDegreeInfoChange, code, handleChangeDegreeDate}) => {

    const generateSchoolList = schoolList => {
        return schoolList.map(
            (obj, idx) => {
                return (
                    <table className="apply_step4_table_contents schoolTbl" key={obj.educationSeq} data-tbl={obj.educationSeq}>
                    <colgroup>
                        <col width="40px" />
                        <col width="174px" />
                        <col width="334px" />
                        <col width="174px" />
                        <col width="334px" />
                    </colgroup>
                    <tbody>
                        <tr>
                            {obj.educationSeq==="1" ?
                            <th rowSpan="5">
                            </th>
                                :
                            <th rowSpan="5">
                                <input type="checkbox" id={`chkDegree_${obj.educationSeq}`} />
                                <label htmlFor={`chkDegree_${obj.educationSeq}`}><em></em></label>
                            </th>
                            }
                            <th scope="row">학력<span className="asterisk">*</span></th>
                            <td>
                                { 
                                    obj.educationSeq==="1" ? 
                                    <input type="text" className="text_inp_disable_97" disabled value={obj.degree}></input>
                                        :
                                    <select title="학력선택" name="degree" value={obj.degree} className="text_sel_50" onChange={handleDegreeInfoChange} >
                                    {code.degreeCode.map(
                                        (obj,idx)=>{ return( <option value={obj.value} key={obj.value}>{obj.text}</option> ) }
                                    )}
                                    </select>
                                }
                                
                            </td>
                            <th scope="row">졸업상태<span className="asterisk">*</span></th>
                            <td>
                                {
                                    obj.educationSeq==="1" ? 
                                    <input type="text" className="text_inp_disable_97" disabled value={obj.graduStatus}></input>
                                        :
                                    <select title="졸업상태" name="graduStatus" className="text_sel_50" value={obj.educationSeq==="1" ? "졸업" : obj.graduStatus} name="graduStatus" onChange={handleDegreeInfoChange} disabled={obj.educationSeq==="1"? true:false}>
                                        {code.graduStatusCode.map(
                                            (obj,idx)=>{ return( <option value={obj.value} key={obj.value}>{obj.text}</option> ) }
                                        )}
                                    </select>
                                }
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">입학날짜<span className="asterisk">*</span></th>
                            <td name="enterDateInfo">
                                <DatePicker className="text_inp_50" maxDate={new Date()} showMonthDropdown showYearDropdown dropdownMode="select"  value={dateBarFormat(obj.enterDateInfo)} onChange={handleChangeDegreeDate}/>
                            </td>
                            <th scope="row">{obj.graduStatus==="졸업예정" ? "졸업예정날짜":"졸업날짜"}<span className="asterisk">*</span></th>
                            <td name="graduDateInfo">
                                <DatePicker className="text_inp_50" minDate={obj.graduStatus==="졸업예정" ? new Date() : undefined} maxDate={obj.graduStatus==="졸업예정" ? undefined : new Date()} showMonthDropdown showYearDropdown dropdownMode="select"  value={dateBarFormat(obj.graduDateInfo)} onChange={handleChangeDegreeDate}/>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">학교<span className="asterisk">*</span></th>
                            <td>
                                <input name="schoolName" className={obj.educationSeq==="1" ? "text_inp_50" : "text_inp_30"} type="text" maxLength="30" value={obj.schoolName} onChange={handleDegreeInfoChange}/>
                                {obj.educationSeq==="1"? 
                                    undefined
                                        : 
                                    <div className="apply_radio_area" style={{"display":"inline-block", "marginLeft":"5px"}}>
                                        <input id={`mainCampusY_${obj.educationSeq}`} name={`mainCampusYn${obj.educationSeq}`} className="radio_18" type="radio" value="본교" checked={ obj[`mainCampusYn${obj.educationSeq}`] === "본교" ? true : false } onChange={handleDegreeInfoChange} disabled={obj.educationSeq==="1" ? true : false}/>
                                        <label htmlFor={`mainCampusY_${obj.educationSeq}`}>본교</label>
                                        <span className="margin_right_5"></span>
                                        <input id={`mainCampusN_${obj.educationSeq}`} name={`mainCampusYn${obj.educationSeq}`} className="radio_18" type="radio" value="캠퍼스" checked={ obj[`mainCampusYn${obj.educationSeq}`] === "캠퍼스" ? true : false } onChange={handleDegreeInfoChange} disabled={obj.educationSeq==="1" ? true : false}/>
                                        <label htmlFor={`mainCampusN_${obj.educationSeq}`}>캠퍼스</label>
                                    </div>
                                }
                            </td>
                            <th scope="row">전공{ obj.educationSeq==="1" ? undefined : <span className="asterisk">*</span> }</th>
                            <td> 
                                { obj.educationSeq==="1" ?
                                    <input name="major" className="text_inp_disable_50" type="text" maxLength="40" value="" disabled />
                                        :
                                    <input name="major" className="text_inp_50" type="text" maxLength="40" value={obj.major} onChange={handleDegreeInfoChange} />
                                }
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">부전공</th>
                            <td>
                                { obj.educationSeq==="1" ?
                                <input name="minor" className="text_inp_disable_50" type="text" maxLength="40" value="" disabled />
                                    :
                                <input name="minor" className="text_inp_50" type="text" maxLength="40" value={obj.minor} onChange={handleDegreeInfoChange} />
                                }
                            </td>
                            <th scope="row">복수전공</th>
                            <td>
                                { obj.educationSeq==="1" ?
                                <input name="doubleMajor" className="text_inp_disable_50" type="text" maxLength="40" value="" disabled />
                                    :
                                <input name="doubleMajor" className="text_inp_50" type="text" maxLength="40" onChange={handleDegreeInfoChange} />
                                }
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">학점{ obj.educationSeq==="1" ? undefined : <span className="asterisk">*</span> }</th>
                            <td>
                                <div className="gt-f-l">
                                    { 
                                        obj.educationSeq==="1" ?
                                        <input name="grade" className="text_inp_disable_25" type="text" maxLength="40" value="" disabled />
                                            :
                                        <input name="grade" className="text_inp_25" type="text" maxLength="10" value={obj.grade} onChange={handleDegreeInfoChange} />
                                    }
                                </div>
                                <div className="gt-f-l" style={{"margin" : "0 10px"}}>
                                    /
                                </div>
                                <div className="gt-f-l">
                                    { 
                                        obj.educationSeq==="1" ?
                                        <input name="perfectGrade" className="text_inp_disable_25" type="text" maxLength="40" value="" disabled />
                                            :
                                        <input name="perfectGrade" className="text_inp_25" type="text" maxLength="10" value={obj.perfectGrade} onChange={handleDegreeInfoChange} />
                                    }
                                </div>
                            </td>
                            <th scope="row">편입여부{ obj.educationSeq==="1" ? undefined : <span className="asterisk">*</span> }</th>
                            <td>
                                <div className="apply_radio_area">
                                    <input id={`transferY_${obj.educationSeq}`} name={`transferYn${obj.educationSeq}`} className="radio_18" type="radio" value="예" checked={ obj[`transferYn${obj.educationSeq}`] === "예" ? true : false } onChange={handleDegreeInfoChange} disabled={obj.educationSeq==="1" ? true : false}/>
                                    <label htmlFor={`transferY_${obj.educationSeq}`}>예</label>
                                    <span className="margin_right_10"></span>
                                    <input id={`transferN_${obj.educationSeq}`} name={`transferYn${obj.educationSeq}`} className="radio_18" type="radio" value="아니오" checked={ obj[`transferYn${obj.educationSeq}`] === "아니오" ? true : false } onChange={handleDegreeInfoChange} disabled={obj.educationSeq==="1" ? true : false}/>
                                    <label htmlFor={`transferN_${obj.educationSeq}`}>아니오</label>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                )
            }
        )
    }

    return(
        <div>
            {generateSchoolList(degreeInfoArr)} 


            <div className="table_btn_area">
                {/* <div className="gt-f-l margin_right_10" style={{"paddingTop": "5px"}}>학력추가 / 삭제로 복수의 학력을 입력하실 수 있습니다.</div> */}
                <div className="btn_add margin_right_10" onClick={addSchoolTbl}>추가</div>
                <div className="btn_remove" onClick={delSchoolTbl}>삭제</div>
                <div className="clear"></div>
            </div>
        </div>
    )


}

export default RegistDegreeInfo;