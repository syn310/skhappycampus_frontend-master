import React, { Component } from 'react';
import dateTimeFormat from 'lib/dateTimeFormat';/** 날짜 포맷 변경 공통함수 */

const MyQuestion = ({myQuestionList, onPopup}) => {
    return (
        <div>
            <table className="apply_step4_table2_contents">
                <colgroup>
                    <col width="100px"/>
                    <col width="300px"/>
                    <col width="100px"/>
                    <col width="100px"/>
                </colgroup>
                <tbody>
                    <tr>
                        <th scope="row">카테고리</th>
                        <th scope="row">제목</th>
                        <th scope="row">상태</th>
                        <th scope="row">문의일시</th>
                    </tr>
                    {
                      myQuestionList.map((object, i) => {
                          return (
                            <tr key={i} className="mypage_myinfo-item" data-questionseq={object.qnaSeq} onClick={onPopup}>
                              <td>{object.qnaCategory}</td>
                              <td>{object.qnaTitle}</td>
                              <td>{object.answerYn === "Y"? "답변완료" : "문의중" }</td>
                              <td>{dateTimeFormat(object.createDatetime)}</td>
                            </tr>
                          );
                    })}
                </tbody>
            </table>
        </div>
    );

}

export default MyQuestion;
