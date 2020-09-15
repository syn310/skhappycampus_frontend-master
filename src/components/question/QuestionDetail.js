import React, {Component} from 'react';
import { Link } from 'react-router-dom'

const QuestionDetail = ({questionInfo}) => {
  return (
    <div>
        <h1>게시글 상세보기</h1>
        <table border="1px" style={{textAlign:"left"}}>
            <thead></thead>
            <tbody>
                <tr>
                    <th>이메일</th>
                    <th><span >{questionInfo.questionEmail}</span></th>
                </tr>
                <tr>
                    <th>전화번호</th>
                    <th><span >{questionInfo.questionPhone}</span></th>
                </tr>
                <tr>
                    <th>질문구분</th>
                    <th><span >{questionInfo.questionType}</span></th>
                </tr>
                <tr>
                    <th>제목</th>
                    <th><span >{questionInfo.questionTitle}</span></th>
                </tr>
                <tr>
                    <th>문의내용</th>
                    <th><span >{questionInfo.questionContent}</span></th>
                </tr>
            </tbody>
          </table>
          <Link to="/question">
            <button>목록으로 돌아가기</button>
          </Link>

    </div>
  );
}

export default QuestionDetail;
