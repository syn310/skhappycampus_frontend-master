import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {dateFormat, dateBarFormat} from 'lib/dateFormat';


const RecruitPopup = ({recruitInfo, onClose, onApply}) => {
    const handleClick = () => {
        onApply(recruitInfo);
    }
    return (
        <div className="popup_wrap">
            <div>
                <div className="popup_area_notice">
                    {/* <!-- 팝업 헤더 시작 --> */}
                    <div className="popup_header">
                        <div className="popup_title gt-f-l">{recruitInfo.noticeName}</div>
                        <div className="popup_close" onClick={onClose}></div>
                        <div className="clear"></div>
                    </div>
                    {/* <!-- 팝업 헤더 끝 --> */}
                    {/* <!-- 팝업 컨텐츠 시작 --> */}
                    <div className="popup_contents">
                        {/* <div className="popup_contents_title">{recruitInfo.noticeName}</div> */}
                        <div className="popup_contents_text">
                            <img src={recruitInfo.noticeImagePath} style={{width: "100%"}}></img>
                            <div className="margin_top_10">
                            <span className="boldtext">▷ 모집대상 :</span> 만 34세 이하 구직 청년 누구나<br/>
                            <span className="boldtext">▷ 접수기간 :</span> {dateBarFormat(recruitInfo.noticeStartDatetime)} ~ {dateBarFormat(recruitInfo.noticeEndDatetime)}<br/>
                            {/* <span className="boldtext">▷ 인턴기간 :</span> {recruitInfo.internStartDate} ~ {recruitInfo.internEndDate}<br/> */}
                            <span className="boldtext">▷ 지원방법 :</span> 본 사이트<br/>
                            </div>
                        </div>  
                    </div>
                    {/* <!-- 팝업 컨텐츠 끝 --> */}
                    {/* <!-- 팝업 하단버튼 시작 --> */}
                    { recruitInfo.noticeStatus === "진행중" ? 
                        <div className="popup_button_notice_area">
                            <button className="popup_button_btn" onClick={handleClick}>지원하기</button>
                        </div>: <div className="popup_button_area"></div>
                    }
                    {/* <!-- 팝업 하단버튼 끝 --> */}
                </div>
            </div>
        </div>
    )
}

export default RecruitPopup;

