import React, {Component} from 'react';
const QuestionForm = ({title, userName, contents, onChange, onSave, onCancel, qnaCategory}) => {

  return (
    <div className="question_area">
      <form noValidate autoComplete="off">
        <table className="question_table_contents">
            <thead></thead>
            <tbody>
                <tr>
                    <th><span style={{color:"red"}}>*</span>질문구분</th>
                    <th>
                      <select className="text_sel_25 margin_right_10"   name="questionType" onChange={onChange}>
                        {qnaCategory.map(
                            (obj,idx)=>{ return( <option value={obj.value} key={obj.value}>{obj.text}</option> ) }
                        )}
                      </select>
                    </th>
                </tr>
                <tr>
                    <th><span style={{color:"red"}}>*</span>제목</th>
                    <th><input className="text_inpt" name="questionTitle" onChange={onChange} placeholder="제목"/></th>
                </tr>
                <tr>
                    <th><span style={{color:"red"}}>*</span>문의내용</th>
                    <th><textarea className="textarea_95" style={{width:"680px"}} cols="50" rows="4" name="questionContent" cols="100" rows="8"  onChange={onChange} placeholder="2,000자까지 입력가능합니다."/></th>
                </tr>
            </tbody>
          </table>
      </form>
      <button className="normal_red_center_btn" onClick={onSave}>질문하기</button>
      <button className="normal_gray_center_btn" data-url="/faq" onClick={onCancel}>취소</button>


    </div>
  );
}

export default QuestionForm;
