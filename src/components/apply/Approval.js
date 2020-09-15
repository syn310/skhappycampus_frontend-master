
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// step 3 단계
const Approval = ({handleNextClick}) => {

    //인증창 오픈
    // const clickApproval = () => {
    //     alert("인증창~")
    // }

    //다음 클릭시 validation
    const validationCheck = () => {
        if(confirm("저장 후 다음 단계로 이동합니다."))
        handleNextClick();
    }

    return(

        
        <div>
            <div>
                <h1>STEP3 본인인증</h1>
                <button onClick={clickApproval}>인증버튼</button>
            </div>
            <div className="page_btn_area_agreement">
                <div className="page_btn_box">
                <a className="btn_full_save gt-f-l margin_right_20" >중간저장</a>
                <a className="btn_full_next gt-f-l" onClick={checkValidation}>다음단계</a>
                <div className="clear"></div>
                </div>
            </div>
            <div>
                <button>저장</button>
                <button onClick={validationCheck}>다음</button>
            </div>
        </div>

    )

}

export default Approval;