import React, { Component } from 'react';

const IntroImg = ({submenu}) => {
    return (
        <div className="sub-contents_orange">
                <div className="sub-container">
                    <div className="location">
                        <div className="location-inner">
                            <div className="location-item">홈</div>
                            <div className="location-item">></div>
                            <div className="location-item">행복성장캠퍼스 소개</div>
                        </div>
                    </div>
                    <div className="sub-info">
                            {submenu==="main" ? <h2 className="sub_heading">행복성장캠퍼스 소개</h2> : undefined}
                            {submenu==="programs" ?     <h2 className="sub_heading">프로그램 구성</h2> : undefined}
                            {submenu==="process" ?      <h2 className="sub_heading">모집대상 및 절차</h2> : undefined}
                            {submenu==="curriculum" ?   <h2 className="sub_heading">교육안내</h2> : undefined}
                            {submenu==="benefit" ?      <h2 className="sub_heading">참여자 혜택</h2> : undefined}
                        <div className="sub_heading_text">행복성장캠퍼스는 대한민국 기업과 구직자를 연결합니다.</div>
                        <br />
                    </div>
                    <div className="clear"></div>
                    <div className="sub_box_orange">
                        <div className="intro_area" style={{"marginTop":"40px"}}>
                            {submenu==="main" ? <img src="https://res.cloudinary.com/dlpg5kdj1/image/upload/v1557901961/skhappycampus/intro/img_company_2depth_1_gkujnl.jpg" /> : undefined}
                            {submenu==="programs" ? <img src="https://res.cloudinary.com/dlpg5kdj1/image/upload/v1557901960/skhappycampus/intro/img_company_2depth_2_upj2or.jpg" /> : undefined}
                            {submenu==="process" ?   <img src="https://res.cloudinary.com/dlpg5kdj1/image/upload/v1591763270/skhappycampus/intro/img_company_2depth_3_fj7eb4_pkatu6.jpg" /> : undefined}
                            {submenu==="curriculum" ? <img width="99%"src="https://res.cloudinary.com/dlpg5kdj1/image/upload/v1591763271/skhappycampus/intro/img_company_2depth_4_dqrxro_vewt9e.jpg" /> : undefined}
                            {submenu==="benefit" ?  <img src="https://res.cloudinary.com/dlpg5kdj1/image/upload/v1557901961/skhappycampus/intro/img_company_2depth_5_vj7mhj.jpg" /> : undefined}
                        </div>
                    </div>
                </div>
            
        </div>
    )
}

export default IntroImg;