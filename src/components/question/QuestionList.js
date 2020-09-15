import React, {Component} from 'react';
import { Link } from 'react-router-dom';

const QuestionList = ({itemList, onMoveToDetail}) => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>카테고리</th>
            <th>제목</th>
          </tr>
        </thead>
        <tbody>
        {itemList.map((object, i) => {
              return (
                <tr key={i}>
                  <td>{object.questionType}</td>
                  <td style={{cursor:"pointer"}} onClick={(e) => onMoveToDetail(object, e)}>{object.questionTitle}</td>
                </tr>
              );
          })}
        </tbody>
      </table>
        <Link to="/questionAdd">
          <button>문의글 작성</button>
        </Link>
      {/* </List> */}
    </div>
  );
}

export default QuestionList;
