import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { dateTimeFormat, dDayCount} from 'lib/dateTimeFormat';
import {dateBarFormat} from 'lib/dateFormat';

const RecruitForm = ({recruitInfo, onPopup, onApply, keyIdx}) => {  
    const handlePopupClick = () => {
        onPopup(recruitInfo);
    }

    const handleApplyClick = () => {
        onApply(recruitInfo);
    }


    const apply_btn = {
        "position": "absolute",
        "top": "50px", /* top: 2px; */
        "left": "920px",
        "float": "right",
        "textAlign": "right",
        "borderRadius": "50px",
        "backgroundColor": "#d0112b",
        "width": "80px",
        'height': "40px",
        'padding': "35px 8px 15px 3px",
        'color': "#fff",
        "fontSize": "18px",
        "marginTop": `${keyIdx*128}px`,
        "cursor":"pointer"
    };
    
    const apply_end_btn = {
        "position": "absolute",
        "top": "50px",
        "left": "920px",
        "textAlign": "center",
        "borderRadius": "50px",
        "backgroundColor": "#a2a2a2",
        "width": "80px",
        "height": "40px",
        "padding": "34px 4px 16px 7px",
        "color": "#fff",
        "fontSize": "18px",
        "marginTop": `${keyIdx*128}px`
    };

    //console.log("keyIdxkeyIdxkeyIdx", keyIdx)
    const padding_top_16 = {
        "paddingTop": `${keyIdx == 0 ? 0 : 16}px`
    }
    



    return(
        <li style={padding_top_16}>   
            <div>
                <div className="apply_position_wide">인턴/신입</div>
                <div className="apply_title">
                    <span className="pointer" onClick={handlePopupClick}>{recruitInfo.noticeName}</span>
                    <span className="day">{dDayCount(recruitInfo.noticeEndDatetime)}</span>
                </div>
                <div className="apply_date">{dateBarFormat(recruitInfo.noticeStartDatetime)}~{dateBarFormat(recruitInfo.noticeEndDatetime)}</div>
            </div>
            { recruitInfo.noticeStatus === "진행중" ?  
                <div style={apply_btn} onClick={handleApplyClick}>지원하기</div> 
                    :  <div style={apply_end_btn} >종료</div>}
        </li>
    )

}

export default RecruitForm;



