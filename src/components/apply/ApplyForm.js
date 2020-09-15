import React, { Component } from 'react';
import { Link } from 'react-router-dom';


//step 5 단계 자소서
const ApplyForm = ({handleChange, handleSaveTemp, coverLetter, handleNextClick, handlePrevClick}) => {

    //다음 클릭시 validation
    const validationCheck = (e) => {

        const dataTemp = e.currentTarget.getAttribute("data-temp");

        if(coverLetter.length == 0){
            alert("자기소개서 내용이 없는경우 저장할 수 없습니다");
            return;
        }

        let str = "";
        if(dataTemp!=="temp"){ //다음가기 이전가기 클릭시
            if(dataTemp==="prev") str = "저장 후 이전 단계로 이동합니다";
            if(dataTemp==="next") str = "저장 후 다음 단계로 이동합니다";

            if(confirm(str)) handleSaveTemp(e);
        }
        else { //중간저장 클릭시
            handleSaveTemp(e);
        }
    }


    return (
        <div>
            <div className="sub-info">
                <h3 className="sub_heading_3dep_2">STEP5 자기소개서</h3>
            </div>
            <div className="clear"></div>

            {/* <div className="apply_step4_table_title"><span>본인을 소개하는 글을 3000자 이내로 작성해주세요.</span></div> */}
            
            <div className="sub_box_agreement">
                <div className="apply_step4">
                    <div style={{"marginBottom":"5px"}}>본인을 소개하는 글을 3000자 이내로 작성해주세요</div>
                    <textarea className="textarea_apply_95" onChange={handleChange} value={coverLetter} name="coverLetter" ></textarea>
                    <div className="">{coverLetter.length}자 / 3000자</div>
                </div>
            </div>


            <div className="page_btn_area_agreement">
                <div className="page_btn_box_3btn">
                <a className="btn_full_next gt-f-l margin_right_20" data-temp="prev" onClick={validationCheck}>이전단계</a>
                <a className="btn_full_save gt-f-l margin_right_20" data-temp="temp" onClick={validationCheck}>중간저장</a>
                <a className="btn_full_next gt-f-l" data-temp="next" onClick={validationCheck}>다음단계</a>
                <div className="clear"></div>
                </div>
            </div>

            </div>

    );

}

export default ApplyForm;
