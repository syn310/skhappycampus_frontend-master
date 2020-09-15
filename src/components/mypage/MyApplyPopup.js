import React, {Component} from 'react';
import {isPassToday, dateTimeBarFormat} from 'lib/dateTimeFormat';
const MyApplyPopup = ({myChoiceList, coverLetter, onClose, myApplyResultList, clickedNotice}) => {
    /** 회사 선택정보가 존재하는 경우 */
    const MyApply = (
      <table className="mypage_table_contents">
        <colgroup>
            <col width="70px"/>
            <col width="160px"/>
            <col width="220px"/>
            <col width="180px"/>
            <col width="120px"/>
        </colgroup>

        <tbody>
          <tr>
              <th scope="row">구분</th>
              <th scope="row">회사명</th>
              <th scope="row">직무</th>
              <th scope="row">근무지</th>
              <th scope="row">연봉수준</th>
          </tr>
          {myChoiceList.map((object, i) => {
              let priorityName = "";
              if(object.priority === "first"){
                  priorityName = "1지망";
              }else if(object.priority === "second"){
                  priorityName = "2지망";
              }else {
                  priorityName = "3지망";
              }
                return (
                  <tr key={i}>
                    <td>{priorityName}</td>
                    <td>{object.companyName}</td>
                    <td>{object.recruitJob}</td>
                    <td>{object.workplace}</td>
                    <td>{object.fulltimeSalary}</td>
                  </tr>
                );
            })}
        </tbody>
      </table>
    );
    const MyApplyResult = (
      <table className="mypage_table_contents">
        <colgroup>
            <col width="70px"/>
            <col width="200px"/>
            <col width="140px"/>
            <col width="140px"/>
            <col width="140px"/>
            <col width="260px"/>
        </colgroup>

        <tbody>
          <tr>
              <th scope="row">구분</th>
              <th scope="row">회사명</th>
              <th scope="row">서류결과</th>
              <th scope="row">면접결과</th>
              <th scope="row">최종결과</th>
              <th scope="row">면접일시</th>
          </tr>
          {myApplyResultList.map((object, i) => {
              let priorityName = "";
              if(object.priority === "first"){
                  priorityName = "1지망";
              }else if(object.priority === "second"){
                  priorityName = "2지망";
              }else {
                  priorityName = "3지망";
              }
                return (
                  <tr key={i}>
                    <td>{priorityName}</td>
                    <td>{object.companyName}</td>
                    <td>{object.documentStatus ===""? "-": object.documentStatus}</td>
                    <td>{object.interviewStatus ===""? "-": object.interviewStatus}</td>
                    <td>{object.finalStatus ===""? "-": object.finalStatus}</td>
                    <td>{object.interviewDate === ""? "추후공지":object.interviewDate}</td>
                  </tr>
                );
            })}
        </tbody>
      </table>
    );
    /** 회사 선택정보가 없는 경우 */
    const MYApplyNoData = (
      <div>
        <span>해당 공고에 지원한 회사가 없습니다.</span>
      </div>
    );


    /** 자기소개서 없는 경우 */
    const CoverLetterNoData = (
      
      <div className="popup_contents_text">
        <div className="mypage_table_area">
          <span>자기소개서 작성 전입니다.</span>
        </div>
      </div>
    );


    //현재 공고의 진행 상태에 따른 DocumentStatus CSS 변경
    const cssDocumentStatus = () => {
      let returnClass = "";
      if(isPassToday(clickedNotice.documentResultDate)){ //서류전형 종료
        returnClass = "Process_prev_myapply gt-f-l";
      }else { //서류전형 진행중
        returnClass = "Process_on_myapply gt-f-l";
      }
      return returnClass;
    }
    //현재 공고의 진행 상태에 따른 InterviewStatus CSS 변경
    const cssInterviewStatus = () => {
      let returnClass = "";
      if(isPassToday(clickedNotice.documentResultDate) && !isPassToday(clickedNotice.interviewResultDate)){//서류전형 종료 && 면접전형 진행중
        returnClass = "Process_on_myapply gt-f-l";
      }else {
        returnClass = "Process_prev_myapply gt-f-l";
      }
      return returnClass;
    }

    //현재 공고의 진행 상태에 따른 FinalStatus CSS 변경
    const cssFinalStatus = () => {
      let returnClass = "";
      if(isPassToday(clickedNotice.interviewResultDate)){//면접전형 종료
        returnClass = "Process_on_myapply gt-f-l";
      }else {
        returnClass = "Process_prev_myapply gt-f-l";
      }
      return returnClass;
    }

    const messageDocumentStatus = () => {
      let returnMsg = "";
      if(isPassToday(clickedNotice.documentResultDate) ){//서류전형 종료
        returnMsg = "종료";
      }else {
        returnMsg = "진행중";
      }
      return returnMsg;
    }

    const messageInterviewStatus = () => {
      let returnMsg = "";
      if(!isPassToday(clickedNotice.documentResultDate) ){//서류전형 진행중
        returnMsg = "";
      }else if(isPassToday(clickedNotice.interviewResultDate)){// 면접전형 종료
        returnMsg = "종료";
      }else {
        returnMsg = "진행중";
      }
      return returnMsg;
    }
    
    const messageFinalStatus = () => {
      let returnMsg = "";
      if(isPassToday(clickedNotice.interviewResultDate)){// 면접전형 종료
        returnMsg = "종료";
      }else {
        returnMsg = "";
      }
      return returnMsg;
    }

    /** 면접안내 메세지 노출 여부 결정 */
    const interviewMessageDisplayYN = () => {
      let displayYn = false;
      myApplyResultList.forEach(object => {
        if(object.documentStatus === "합격"){
          displayYn = true;
          return;
        }
      });
      return displayYn;
    }

    //** 나의 진행상태 bar */
    const myApplyStatusTable = (
      <div>

        <div className="Process_area_myapply">

          <div className="Process_list_backgroud_myapply">
            <div className="Process_back_myapply">
                
                <ul className="Process_list_myapply">
                    <li className={cssDocumentStatus()} style={{"marginRight": "70px"}}><span className="Process_text" style={{"top": "20px", "cursor":"default"}} >서류전형<br/>{messageDocumentStatus()}</span></li>
                    <li className={cssInterviewStatus()} style={{"marginRight": "70px"}}><span className="Process_text" style={{"top": "20px", "cursor":"default"}} >면접전형<br/>{messageInterviewStatus()}</span></li>
                    <li className={cssFinalStatus()} style={{"marginRight": "70px"}}><span className="Process_text" style={{"top": "20px", "cursor":"default"}} >최종<br/>{messageFinalStatus()}</span></li>
                
                </ul>
                </div>
            </div>
        </div>
      </div>

      
    )

    const myApplyStatusNone = (
      <div className="popup_contents_text">
        <div className="mypage_table_area">
          <span>지원서 최종제출 전입니다.</span>
        </div>
    </div>
    )

    return (
          <div className='popup_wrap'>
            <div className='popup_area_myapply'>
              <div className="popup_header">
                    <div className="popup_title gt-f-l">나의 지원현황</div>
                    <div className="popup_close" onClick={onClose}></div>
                    <div className="clear"></div>
              </div>
              {/* <!-- 팝업 컨텐츠 시작 --> */}
              <div className="popup_contents_myapply" >
                  <div>
                    <div className="popup_contents_company_title">채용 진행현황</div>
                        { myApplyStatusTable }
                  </div>
                  {/* 면접안내 메세지 */}
                  {interviewMessageDisplayYN() ? 
                  <div><br/>
                    <div className="popup_contents_text" dangerouslySetInnerHTML={ {__html: clickedNotice.noticePassMessage}} >
                    </div>
                  </div> : <div></div>
                  }
                  
                  {/* 지원결과 안내 */}
                  {myApplyResultList && myApplyResultList.length > 0 ? 
                  <div>
                    <div className="popup_contents_company_title">지원결과</div>
                    <div className="mypage_table_area">
                      {MyApplyResult}
                    </div> 
                  </div>: <div></div>}
                  {/* 지원한 회사*/}
                  <div className="popup_contents_company_title">지원회사</div>
                  <div className="popup_contents_text">
                    <div className="mypage_table_area">
                      {myChoiceList && myChoiceList.length > 0 ? MyApply : MYApplyNoData}
                    </div>
                  </div>
                  {/* 자기소개서 */}
                  <div className="popup_contents_company_title">자기소개서</div>
                  {
                    coverLetter && coverLetter.length > 0 ?
                      <div>
                        <br />
                        <textarea className="textarea_95" readOnly value={coverLetter}/>
                        <br /><br />
                      </div>
                        :
                      CoverLetterNoData
                  }
              </div>
              {/* <!-- 팝업 컨텐츠 끝 --> */}
          </div>
        </div>
    );
}
export default MyApplyPopup;
