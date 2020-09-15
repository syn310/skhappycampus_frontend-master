import React, { Component } from 'react';
import axios from  'axios';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import storage from 'lib/storage';
import devtest from 'lib/devtest';
import {NoticePopup} from 'components';
import {dayCount} from 'lib/dateTimeFormat';
import {dateFormat, dateTypeBarFormat} from 'lib/dateFormat';

class NoticeContainer extends Component {

    /** 생성자 */
    constructor(props) {
        super(props);
        this.state = {
          noticeList: [],
          noticeInfo: {

          },
          openPopup: false
        };
    }

    componentDidMount() {
        //렌더링 전에 공지사항 리스트 조회
        this.handleGetNoticeList();
    }

    componentWillMount = () => {
     
    }
    /** 저장된 공지사항 리스트 조회 */
    handleGetNoticeList = () => {

        axios({
          url: devtest() +"/notice",
          method:"get",
          headers: { Pragma: 'no-cache'}
        })
        .then( (res) => {
          if (res.data){
              this.setState({
                noticeList: res.data
              });
          }
        }).catch(function(error) {
          console.log(error);
        });
    }
    /** 공지사항 상세보기 팝업 */
    onPopupOpen = (e) => {
        const noticeSeq = e.currentTarget.getAttribute("data-seq");
        axios({
            url: devtest() +`/notice/${noticeSeq}`,
            method:"get",
            headers: { Pragma: 'no-cache'}
          })
          .then( (res) => {
            if (res.data){
                this.setState({
                  noticeInfo: res.data,
                  openPopup: true
                });
            }
          }).catch(function(error) {
            console.log(error);
          });
    }

     /** 공지사항 상세보기 팝업 닫기 */
     onPopupClose = () => {
        this.setState({openPopup:false})
    }

    render() {
        // console.log(dayCount(object.cerateDatetime));
        const {noticeInfo, openPopup} = this.state;
        const {onPopupOpen, onPopupClose} = this;
        return (
            <div className="sub-contents">
                {openPopup && <NoticePopup info={noticeInfo} onClose={onPopupClose}></NoticePopup>}
                <div className="sub-container">
                    <div className="location">
                        <div className="location-inner">
                            <div className="location-item">홈</div>
                            <div className="location-item">></div>
                            <div className="location-item">공지사항</div>
                        </div>
                    </div>
                    <div className="sub-info">
                        <h2 className="sub_heading">공지사항</h2>
                        <div className="sub_heading_text">채용관련 공지사항을 확인해보세요</div>
                        <br />
                    </div>
                    <div className="clear"></div>
                    <div className="sub_box">
                        
                    <div className="apply_area">
                            <ul className="apply_list">
                            { this.state.noticeList.length === 0 &&  
                                <li style={{paddingTop: '10px'}}>   
                                    <div>
                                        <div className="" style={{padding: '20px 10px'}}>
                                            <span className="notice_title">등록된 공지사항이 없습니다.</span>
                                        </div>
                                    </div>
                                </li>} 
                            {this.state.noticeList.length !== 0 && this.state.noticeList.map((object ,i) => {
                                return (
                                        <li style={{paddingTop: '10px'}} key={i}>   
                                    <div>
                                        <div className="notice_position_wide">{object.noticeCategory}</div>
                                        <div className="" style={{padding: '20px 10px'}}>
                                            <span className="notice_title pointer" data-seq={object.noticeSeq} onClick={onPopupOpen}>{object.noticeTitle}</span>
                                            {dayCount(object.createDatetime) <= 7? <span className="notice_title_day">NEW</span>: ''}
                                            <span className="notice_date">{dateTypeBarFormat(object.createDatetime)}</span>
                                        </div>
                                    </div>
                                </li>
                                    )
                            })}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(
    //props로 넣어줄 스토어 상태값
    (state) => ({
    })
    //props로 넣어줄 액션 생성함수
    , (dispatch) => ({
    })
)(NoticeContainer);



// const apply_btn = {
//     "position": "absolute",
//     "top": "50px", /* top: 2px; */
//     "left": "920px",
//     "float": "right",
//     "textAlign": "right",
//     "borderRadius": "50px",
//     "backgroundColor": "#d0112b",
//     "width": "80px",
//     'height': "40px",
//     'padding': "35px 8px 15px 3px",
//     'color': "#fff",
//     "fontSize": "18px",
//     "marginTop": `${keyIdx*126}px`,
//     "cursor":"pointer"
// };

// const apply_end_btn = {
//     "position": "absolute",
//     "top": "50px",
//     "left": "920px",
//     "textAlign": "center",
//     "borderRadius": "50px",
//     "backgroundColor": "#a2a2a2",
//     "width": "80px",
//     "height": "40px",
//     "padding": "34px 4px 16px 7px",
//     "color": "#fff",
//     "fontSize": "18px",
//     "marginTop": `${keyIdx*126}px`
// };

// //console.log("keyIdxkeyIdxkeyIdx", keyIdx)
// const padding_top_16 = {
//     "paddingTop": `${keyIdx*16}px`
// }




// return(
//     <li style={padding_top_16}>   
//         <div>
//             <div className="apply_position_wide">인턴/신입</div>
//             <div className="apply_title">
//                 <span className="pointer" onClick={handlePopupClick}>{recruitInfo.noticeName}</span>
//                 <span className="day">{dDayCount(recruitInfo.noticeEndDatetime)}</span>
//             </div>
//             <div className="apply_date">{dateBarFormat(recruitInfo.noticeStartDatetime)}~{dateBarFormat(recruitInfo.noticeEndDatetime)}</div>
//         </div>
//         { recruitInfo.noticeStatus === "진행중" ?  
//             <div style={apply_btn} onClick={handleApplyClick}>지원하기</div> 
//                 :  <div style={apply_end_btn} >종료</div>}
//     </li>
// )