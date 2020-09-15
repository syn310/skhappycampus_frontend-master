import React, { Component } from 'react';

const Stepbar = ({stepIndex, handleStepClick, applyStatus, pageMoveTo}) => {

    return(

        <div>

            <div className="location">
                <div className="location-inner">
                    <div className="location-item" data-url="/" >홈</div>
                    <div className="location-item">></div>
                    <div className="location-item" data-url="/recruit">모집공고</div>
                    <div className="location-item">></div>
                    <div className="location-item" data-url="" >지원하기</div>
                </div>
            </div>

            <div className="Process_area">
            <div className="Process_list_backgroud">
                <div className="Process_back">
                    
                    <ul className="Process_list">
                        {/* 현재 유저가 저장된 상태(applyStatus) 보다 큰경우 / 같은경우 / 작은경우에 따라 다른 css를 가짐) */}
                        <li className={ stepIndex === "0" ? "Process_on gt-f-l" :  ( parseInt(stepIndex) > 0 ? "Process_prev gt-f-l" : "Process_next gt-f-l" ) } style={{"marginRight": "70px"}}><span data-step="0" className="Process_text" style={{"top": "20px", "cursor":"default"}} onClick={handleStepClick}>참여자격<br/>사전조사</span></li>
                        <li className={ stepIndex === "1" ? "Process_on gt-f-l" :  ( parseInt(stepIndex) > 1 ? "Process_prev gt-f-l" : "Process_next gt-f-l" ) } style={{"marginRight": "70px"}}><span data-step="1" className="Process_text" style={{"top": "20px", "cursor":"default"}} onClick={handleStepClick}>개인정보<br/>취급방침</span></li>
                        <li className={ stepIndex === "2" ? "Process_on gt-f-l" :  ( parseInt(stepIndex) > 2 ? "Process_prev gt-f-l" : "Process_next gt-f-l" ) } style={{"marginRight": "70px"}}><span data-step="2" className="Process_text" style={{"top": "30px", "cursor":"default"}} onClick={handleStepClick}>본인인증</span></li>
                        <li className={ stepIndex === "3" ? "Process_on gt-f-l" :  ( parseInt(stepIndex) > 3 ? "Process_prev gt-f-l" : "Process_next gt-f-l" ) } style={{"marginRight": "70px"}}><span data-step="3" className="Process_text" style={{"top": "20px", "cursor":"default"}} onClick={handleStepClick}>개인정보<br/>입력</span></li>
                        <li className={ stepIndex === "4" ? "Process_on gt-f-l" :  ( parseInt(stepIndex) > 4 ? "Process_prev gt-f-l" : "Process_next gt-f-l" ) } style={{"marginRight": "70px"}}><span data-step="4" className="Process_text" style={{"top": "20px", "cursor":"default"}} onClick={handleStepClick}>자기<br/>소개서</span></li>
                        <li className={ stepIndex === "5" ? "Process_on gt-f-l" :  ( parseInt(stepIndex) > 5 ? "Process_prev gt-f-l" : "Process_next gt-f-l" ) } style={{"marginRight": "71px"}}><span data-step="5" className="Process_text" style={{"top": "30px", "cursor":"default"}} onClick={handleStepClick}>회사선택</span></li>
                        <li className={ stepIndex === "6" ? "Process_on gt-f-l" :  ( parseInt(stepIndex) > 6 ? "Process_prev gt-f-l" : "Process_next gt-f-l" ) }>                                <span data-step="6" className="Process_text" style={{"top": "30px", "cursor":"default"}} onClick={handleStepClick}>제출</span></li>

                    </ul>
                    </div>
                </div>
            </div>

            </div>
    )

}

export default Stepbar;