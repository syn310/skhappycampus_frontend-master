
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const SubmitResume = ({redirectToMyPage, handlePrevClick}) => {

    //제출버튼
    const clickSubmit = () => {
        if(confirm("제출하시겠습니까?")){
            
            redirectToMyPage();
        }
        
    }

    //이전단계버튼
    const clickPrev = () => {
        handlePrevClick();
    }


    return(

        <div>
            <div className="sub-info">
                <h3 className="sub_heading_3dep_2">STEP7 최종제출</h3>
            </div>
            <div className="clear"></div>

            <div className="sub_box_agreement">
                <div className="apply_step4">
                    <div>
                        <div><span style={{"fontWeight":"bold", "fontSize":"20pt"}}>지원서를 최종 제출하시겠습니까 ?</span></div> 
                        <div className="margin_top_20">
                            <span style={{"fontWeight":"bold", "fontSize":"13pt", "color":"red", "textDecoration":"underline"}}>
                                허위로 작성한 내용이 존재할 경우 추후 불이익을 받을 수 있습니다.</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="page_btn_area_agreement">
                <div className="page_btn_box">
                <a className="btn_full_next gt-f-l margin_right_20" onClick={clickPrev}>이전단계</a>
                <a className="btn_full_next gt-f-l" onClick={clickSubmit}>최종제출</a>
                <div className="clear"></div>
                </div>
            </div>

            
        </div>



    )
}

export default SubmitResume;