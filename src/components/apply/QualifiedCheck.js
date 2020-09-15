import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import _ from 'lodash';

//step 1 단계
class QualifiedCheck extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            radioVal:{
                no1:"",
                no2:"",
                no3:"",
                no4:"",
                no5:"",
                no6:""
            }
         }
    }

    clickRadio = (e) => {

        let { radioVal } = this.state;
        radioVal[e.target.name] = e.target.value;

        this.setState( radioVal );

    }

    //radio버튼 validation
    checkValidation = () => {
        
        //validation 체크

        const { radioVal } = this.state;
        const radioValArr = _.values(radioVal);

        let checkStr = "";

        for(let k=0; k<radioValArr.length; k++){
            if(radioValArr[k].length==0) {
                alert("체크하지 않은 항목이 있습니다.")
                return;
            }else{
                checkStr += radioValArr[k];
            }
        }

        if(checkStr!=="예예아니오예아니오예"){
            alert("지원자격에 부합하지 않습니다. 다시 확인 바랍니다.")
            return;
        }


        if(confirm("저장 후 다음 단계로 이동합니다. 허위로 작성하신 경우 추후 불이익을 받을 수 있습니다."))
            this.props.handleNextClick();

    }


    render() { 

        const { checkValidation, clickRadio } = this;

        return ( 
            <div>

                    <div className="sub-info">
                        <h3 className="sub_heading_3dep_2">STEP1 참여자격 사전조사</h3>
                    </div>
                    <div className="clear"></div>

                    <div className="sub_box">
                        <div className="apply_step4">
                            <div className="apply_step4_list">
                                <div className="">
                                    <table className="apply_step4_table2_contents" id="checkedTable">
                                        <colgroup>
                                            <col width="78px" />
                                            <col width="700px" />
                                            <col width="126px" />
                                            
                                        </colgroup>
                                        <tbody>
                                            <tr>
                                                <th scope="row">No</th>
                                                <th scope="row">항목</th>
                                                <th scope="row">확인</th>
                                            </tr>
                                            <tr>
                                                <td>01</td>
                                                <td>(신청일 기준) 만 34세 이하의 청년입니까 ?</td>
                                                <td>
                                                    <div className="apply_radio_area">
                                                        <input id="no1Y" name="no1" className="radio_18" type="radio" value="예" onClick={clickRadio} />
                                                        <label htmlFor="no1Y">예</label>
                                                        <span className="margin_right_10"></span>
                                                        <input id="no1N" name="no1" className="radio_18" type="radio" value="아니오" onClick={clickRadio} />
                                                        <label htmlFor="no1N">아니오</label>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>02</td>
                                                <td>(신청일 기준) 프로그램 참여에 일정 상 지장이 없습니까 ?</td>
                                                <td> 
                                                    <div className="apply_radio_area">
                                                        <input id="no2Y" name="no2" className="radio_18" type="radio" value="예" onClick={clickRadio} />
                                                        <label htmlFor="no2Y">예</label>
                                                        <span className="margin_right_10"></span>
                                                        <input id="no2N" name="no2" className="radio_18" type="radio" value="아니오" onClick={clickRadio} />
                                                        <label htmlFor="no2N">아니오</label>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>03</td>
                                                <td>허위 기타 부정한 방법으로 인턴으로 채용되었던 사실이 있습니까 ?</td>
                                                <td>
                                                    <div className="apply_radio_area">
                                                        <input id="no3Y" name="no3" className="radio_18" type="radio" value="예" onClick={clickRadio} />
                                                        <label htmlFor="no3Y">예</label>
                                                        <span className="margin_right_10"></span>
                                                        <input id="no3N" name="no3" className="radio_18" type="radio" value="아니오" onClick={clickRadio} />
                                                        <label htmlFor="no3N">아니오</label>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>04</td>
                                                <td>(프로그램 시작일 기준) 미취업 상태입니까 ?</td>
                                                <td>
                                                    <div className="apply_radio_area">
                                                        <input id="no4Y" name="no4" className="radio_18" type="radio" value="예" onClick={clickRadio}/>
                                                        <label htmlFor="no4Y">예</label>
                                                        <span className="margin_right_10"></span>
                                                        <input id="no4N" name="no4" className="radio_18" type="radio" value="아니오" onClick={clickRadio} />
                                                        <label htmlFor="no4N">아니오</label>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>05</td>
                                                <td>(프로그램 시작일 기준) 사업자에 해당됩니까 ?</td>
                                                <td>
                                                    <div className="apply_radio_area">
                                                        <input id="no5Y" name="no5" className="radio_18" type="radio" value="예" onClick={clickRadio} />
                                                        <label htmlFor="no5Y">예</label>
                                                        <span className="margin_right_10"></span>
                                                        <input id="no5N" name="no5" className="radio_18" type="radio" value="아니오" onClick={clickRadio} />
                                                        <label htmlFor="no5N">아니오</label>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>06</td>
                                                <td>(프로그램 시작일 기준) 대학 졸업 또는 대학 졸업예정자('20년 하반기 또는 '21년 3월)에 해당합니까 ?</td>
                                                <td>
                                                    <div className="apply_radio_area">
                                                        <input id="no6Y" name="no6" className="radio_18" type="radio" value="예" onClick={clickRadio} />
                                                        <label htmlFor="no6Y">예</label>
                                                        <span className="margin_right_10"></span>
                                                        <input id="no6N" name="no6" className="radio_18" type="radio" value="아니오" onClick={clickRadio} />
                                                        <label htmlFor="no6N">아니오</label>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                                                        
                                </div>
                            </div>
                        </div>
                    </div>


                <div className="page_btn_area">
                    <div className="page_btn_box">
                    {/* <a className="btn_full_save gt-f-l margin_right_20" >중간저장</a> */}
                    <a className="btn_full_next gt-f-c" onClick={checkValidation}>다음단계</a>
                    <div className="clear"></div>
                    </div>
                </div>

            </div>

         );
    }
}
 
export default QualifiedCheck;
