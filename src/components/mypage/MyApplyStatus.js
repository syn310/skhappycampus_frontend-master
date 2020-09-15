import React, { Component } from 'react';
import {dateFormat, dateBarFormat} from 'lib/dateFormat';

const MyApplyStatus = ({myApplyList, onPopup}) => {
    return (
        <div>
            <table className="apply_step4_table2_contents">
                <colgroup>
                    <col width="300px"/>
                    <col width="150px"/>
                    <col width="100px"/>
                    <col width="100px"/>
                    <col width="100px"/>
                    <col width="100px"/>
                </colgroup>
                <tbody>
                    <tr>
                        <th scope="row">프로그램명</th>
                        <th scope="row">지원기간</th>
                        <th scope="row">서류결과 발표일</th>
                        <th scope="row">최종결과 발표일</th>
                        <th scope="row">공고진행현황</th>
                        <th scope="row">나의진행상태</th>
                    </tr>
                    {myApplyList.map((object, i) => {
                      return (
                        <tr key={i} >
                          <td data-serialnumber={object.serialNumber} data-noticepassmessage={object.noticePassMessage} 
                          data-interviewresultdate={object.interviewResultDate} data-documentresultdate={object.documentResultDate} 
                          onClick={onPopup} style={{"cursor":"pointer"}}>{ object.noticeName}</td>
                          <td>{ dateBarFormat(object.noticeStartDatetime) }<span>~</span>{ dateBarFormat(object.noticeEndDatetime) }</td>
                          <td>{ dateBarFormat(object.documentResultDate) }</td>
                          <td>{ dateBarFormat(object.interviewResultDate) }</td>
                          <td>{ object.noticeStatus }</td>
                          <td>{ object.applyStatus === "7" ? "최종제출" : "작성중"}</td>
                        </tr>
                      );
                  })}
                </tbody>
            </table>
        </div>
    );
}

export default MyApplyStatus;
