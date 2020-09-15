import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import {dateFormat, dateBarFormat} from 'lib/dateFormat';

//자격증
const RegistExtraCert = ({addRow, delRow, handleCertInputChange, handleChangeCertDate, extraCertArr, clickCheck}) => {

    const generateTableTr = extraCertArr => {
        return extraCertArr.map(
            (obj, idx) => {
                return (
                    <tr key={obj.certificateSeq} data-row={obj.certificateSeq}>
                        <td>
                            <input type="checkbox" id={`chkExtra_${obj.certificateSeq}`} /* onChange={clickCheck} */ />
                            <label htmlFor={`chkExtra_${obj.certificateSeq}`}><em></em></label>
                        </td>
                        <td><input name="certificateContent" className="text_inp_70" type="text" maxLength="100" value={obj.certificateContent} onChange={handleCertInputChange}/></td>
                        <td name="certificateDate">
                            <DatePicker className="text_inp_20" popperPlacement="top" maxDate={new Date()} showMonthDropdown showYearDropdown dropdownMode="select" name="certificateDate" value={dateBarFormat(obj.certificateDate)} onChange={handleChangeCertDate}/>
                        </td>
                        <td><input name="certificateGrade" className="text_inp_20" type="text" maxLength="100" value={obj.certificateGrade} onChange={handleCertInputChange}/></td>
                        <td style={{"borderRight": "0"}}>
                            <input name="certificateOrganization" className="text_inp_35" type="text" maxLength="100" value={obj.certificateOrganization} onChange={handleCertInputChange}/>
                        </td>
                    </tr>
                )
            }

        )
    }


    return(
        <div>
            <table id="extraCertTable" className="apply_step4_table2_contents">
                <colgroup>
                    <col width="78px" />
                    <col width="409px" />
                    <col width="126px" />
                    <col width="126px" />
                    <col width="273px" />
                </colgroup>
                <tbody>
                    <tr>
                        <th scope="row">
                                {/* <input type="checkbox" /> */}
                                {/* <label ><em></em></label> */}
                        </th>
                        <th scope="row">자격 및 내역</th>
                        <th scope="row">취득날짜</th>
                        <th scope="row">등급</th>
                        <th scope="row" style={{"borderRight": "0"}}>발급기관</th>
                    </tr>
                    { extraCertArr && extraCertArr.length!=0 ? generateTableTr(extraCertArr) : undefined}
                </tbody>
            </table>
            
            <div className="table_btn_area">
                <div className="btn_add gt-f-l margin_right_10" onClick={addRow}>추가</div>
                <div className="btn_remove gt-f-l" onClick={delRow}>삭제</div>
                <div className="clear"></div>
            </div>

        </div>
    )


}

export default RegistExtraCert;