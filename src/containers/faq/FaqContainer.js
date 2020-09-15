import React, { Component } from 'react';
import axios from  'axios';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as faqActions from 'modules/faq';
import storage from 'lib/storage';
import devtest from 'lib/devtest';

class FaqContainer extends Component {

    /** 생성자 */
    constructor(props) {
        super(props);
        this.state = {
          code : {
            qnaCategoryCode : []
          },
          selectedQuestion : -1,
          lastCategory: '',
          filterText : '',
          filteredData: []
        };
        this.openQuestion = this.openQuestion.bind(this);
    }

    componentDidMount() {
      //렌더링 전에 FAQ 리스트 조회
      this.handleGetFaqList();
    }

    componentWillMount = () => {
      //질문카테고리 코드데이터 조회
      this.getCodeValue();
    }

    /** 저장된 FAQ 글 리스트 조회 */
    handleGetFaqList = () => {
        const { FaqAction } = this.props;

        axios({
          url:devtest() +"/faq",
          method:"get",
          headers: { Pragma: 'no-cache'}
        })
        .then( (response) => {
          if (response.data){
              //조회한 데이터 store에 셋팅
              FaqAction.setFaqList(response.data);
              this.setState({
                filteredData: response.data
              });
          }
        }).catch(function(error) {
          console.log(error);
        });
    }

    /** 질문카테고리 코드데이터 조회 */
    getCodeValue = () => {

      const { code } = this.state;

      axios({
          url:devtest() + `/commonCode/QUESTION/A`,//코드 URL은 뒤에 주소 대문자 사용함
          method : 'get',
          headers: { Pragma: 'no-cache'}
      }).then(
          (res)=>{
              if(res.data){
                  code["qnaCategoryCode"] = res.data;
                  this.setState({
                      code
                  })
              }
          }
      ).catch(
          (err)=>{ if(err) console.log("코드 get err", err.response); }
      )
    }

    /** 변경사항 state에 적용 */
    handleSelectChange = (e) => {
      this.setState ({[e.target.name]: e.target.value});
    }

    handleChange = (e) => {
      // console.log(`e.target.name: ${e.target.name}`);
      // console.log(`e.target.value: ${e.target.value}`)
      this.setState ({[e.target.name]: e.target.value});
    }
    
    /** 검색 버튼 클릭 */
    handleSummit = (e) => {
      const {filterText, lastCategory, selectedQuestion} = this.state;
      const {faqList} = this.props;
      if(filterText.length == 0 && lastCategory.lenth == 0){
          this.setState ({filteredData: faqList});
      }else{
        const rows = [];
        faqList.forEach( (object) => {
          //질문리스트에 검색어가 없는 경우
          if (object.faqAnswer.indexOf(filterText) === -1 ) {
            return;
          }
          if (lastCategory.length != 0 && object.faqCategory !== lastCategory) {
            return;
          }
          rows.push(object);
        });
        this.setState ({filteredData: rows});
      }
    }
    /** 자주하는 질문 클릭시 답변 open */
    openQuestion = (id) =>  (e) => {
      this.setState({
        // 같은 질문을 누른 경우, 해당 답변 닫음/다른 질문을 누른 경우 해당 답변 open
        selectedQuestion: (this.state.selectedQuestion === id ? -1 : id) 
      });
    }

    /** 화면 이동  */
    handleMoveTo = (e) => {
      const self = this;
      if(e.target.getAttribute("data-url")==="/question")  {
        const session = storage.getSessionObj();
        if(session==undefined) {
          //alert("로그인 세션이 만료되었거나 올바른 로그인 정보가 아닙니다. 로그인 페이지로 이동합니다.");
          self.props.history.push("/login");
        }else{
          self.props.history.push(e.target.getAttribute("data-url"));
        }
      }else{
        self.props.history.push(e.target.getAttribute("data-url"));
      }
    }

    /** Enter Key입력시 로그인 동작 */
    handleKeyPress = (e) => {
        if(e.charCode === 13){
            this.handleSummit();
        }
    }


    render() {
      const { selectedQuestion, code } = this.state;
      const { openQuestion, handleSelectChange, handleChange, handleSummit,handleMoveTo, handleKeyPress } = this;

        return (

          <div>

<div className="sub-contents">
                <div className="sub-container">
                    <div className="location">
                        <div className="location-inner">
                            <div className="location-item">홈</div>
                            <div className="location-item">></div>
                            <div className="location-item">FAQ</div>
                        </div>
                    </div>
                    <div className="sub-info" style={{"height":"150px"}}>
                        <h2 className="sub_heading">FAQ</h2>
                        <div className="sub_heading_text">채용관련 궁금한 점을 확인해보세요</div>
                        <div className="search_area">
                            <div className="searchsearch">
                                <div className="gt-f-l">
                                    <select name="lastCategory" className="text_sel_10" onChange={handleChange}>
                                    {
                                      code.qnaCategoryCode.map((object, i)=> {
                                        return (
                                          <option key={i} value={object.value}>{object.text}</option>
                                        );
                                      })
                                    }
                                  </select>
                                </div>
                                <input placeholder="검색어" type="text" name="filterText" className="selectric_input_01" onChange={handleChange}  onKeyPress={handleKeyPress}/>
                                <button className="selectric_search_button" style={{marginLeft: "5px"}} onClick={handleSummit}><span>검색</span></button>
                            </div>
                        </div>
                    </div>
                    <div className="clear"></div>
                    <div className="sub_box">
                        
                        <div className="apply_step4">
                            <div className="apply_step4_list">
                                <div className="apply_step4_table_title">전체</div>
                                <div>
                                    <div className="line_2_gray"></div>

                                    { this.state.filteredData.map((object ,i) => (
                                      <div key={object.faqSeq}>
                                      <div className="gt-f-l faq_list_box"  onClick={this.openQuestion(object.faqSeq)}>
                                          <div className={ selectedQuestion === object.faqSeq ? "gt-f-l faq_section_on" : "gt-f-l faq_section"} >{object.faqCategory}</div>
                                          <div className={ selectedQuestion === object.faqSeq ? "gt-f-l faq_title_text_on" : "gt-f-l faq_title_text"} > {object.faqQuestion}</div>
                                          <div className={ selectedQuestion === object.faqSeq ? "gt-f-l faq_img_on" : "gt-f-l faq_img_off"}></div>
                                      </div>
                                        { selectedQuestion === object.faqSeq ?
                                        <div className="gt-f-l faq_list_box_a">
                                        <div className="faq_title_text_a">{object.faqAnswer}</div>
                                        </div> : undefined }
                                      </div>      


                                    ))}
                                </div>
                            </div>
                        </div>
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
        faqList: state.faq.get('faqList')
    })
    //props로 넣어줄 액션 생성함수
    , (dispatch) => ({
        FaqAction : bindActionCreators(faqActions, dispatch)
    })
)(FaqContainer);
