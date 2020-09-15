import React, {Component} from 'react';

const MyNoticePopup = ({onClose, noticeInfo}) => {
   
    return (
          <div className='popup_wrap'>
            <div className='popup_area_notice'>

              <div className="popup_header">
                    <div className="popup_title gt-f-l">공지</div>
                    <div className="popup_close" onClick={onClose}></div>
                    <div className="clear"></div>
              </div>

              <div className="popup_contents_left" >
                <div className="popup_contents_title">{noticeInfo.noticeTitle}</div>
                <div className="popup_contents_text">
                    <div className="margin_top_10">
                        <span dangerouslySetInnerHTML={ {__html: noticeInfo.noticeContent}} >
                            
                        </span>
                    </div>
                </div>
              </div>
              {/* <!-- 팝업 컨텐츠 끝 --> */}
          </div>
        </div>
    );
}
export default MyNoticePopup;
