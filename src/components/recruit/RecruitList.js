import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import RecruitForm from './RecruitForm';
import { dateTimeFormat} from 'lib/dateTimeFormat';

const RecruitList = ({recruitInfo, onPopup, onApply}) => {

    const generateRecruitCard = recruitInfo => {
        return recruitInfo.map(
            (obj,idx)=>{
                return (
                        <RecruitForm  key={idx} keyIdx={idx} recruitInfo={obj} onPopup={onPopup} onApply={onApply} />
                )
            }
        )
    }

    return (
            <div className="sub-container">
                <div className="location">
                    <div className="location-inner">
                        <div className="location-item">홈</div>
                        <div className="location-item">></div>
                        <div className="location-item">모집공고</div>
                    </div>
                </div>
                <div className="sub-info">
                    <h2 className="sub_heading">모집공고</h2>
                    <div className="sub_heading_text">꿈과 열정의 주인공 당신을 기다립니다</div>
                    <br />
                </div>
                <div className="clear"/* style={{"height":""}} */></div>
                <div className="sub_box">
                        <div className="apply_area">
                            <ul className="apply_list">
                                 {generateRecruitCard(recruitInfo)} 
                            </ul>
                        </div>
                    </div>
            </div>

    )
}

export default RecruitList;