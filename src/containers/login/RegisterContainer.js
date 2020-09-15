import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import {isEmail, isLength, isAlphanumeric} from 'validator'; //문자열 검증
import * as registerActions from 'modules/register';
import devtest from 'lib/devtest';

class RegisterContainer extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            customInput:false,
            inputId:"",
            customDomain : "",
            domain: "",
            email:"",
            password:"",
            passwordConfirm:"",
            duplicatePass: false
        }
    }

    validate = () =>{
        const { email, password, passwordConfirm, duplicatePass } = this.state;
        const agreeChk = document.getElementById("agreement");
        
        const pwCheck = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])");


        if(!duplicatePass){
            alert('이메일 중복확인을 해주십시오.');
            return false;
        }
        if(!isEmail(email)) {
            alert('잘못된 이메일 형식 입니다.');
            return false;
        }
        if(!isLength(password, { min: 8 })) {
            alert('비밀번호를 8자 이상 입력하세요.');
            return false;
        }
        if(!pwCheck.test(password)){
            alert("비밀번호는 대문자, 소문자, 숫자가 각각 1개 이상씩 포함되어야 합니다.");
            return false;
        }
        if(password !== passwordConfirm) {
            alert('비밀번호가 일치하지 않습니다.');
            return false;
        }
        if(!agreeChk.checked){
            alert('필수 동의에 동의하지 않았습니다.');
            return false;
        }
        return true;
    }

    /** 회원가입  */
    handleRegisterClick = () => {
        const self = this;
        const { email, password, passwordConfirm } = this.state;
        //검증작업
        if(this.validate()){
            axios({
                url: devtest() +`/user`,
                data: {
                    userId: email,
                    userPassword: password
                },
                method : 'post',
                headers: { Pragma: 'no-cache'}
            }).then(
                (res)=>{
                    if(res.data) {
                        alert("회원가입에 성공했습니다.");
                        self.props.history.push(`/login`);
                    }
                }
            ).catch(function(e) {
                if(e.response.status === 400) {
                    alert('이메일 중복확인을 해주십시오.');
                }else if(e.response.status === 409){
                    alert('이메일, 비밀번호 형식이 맞지 않습니다.');
                }else{
                    alert('서버에러가 발생했습니다. 관리자에게 문의하세요.');
                }
            });
        }
    }
    /** 이메일 Domain의 직접입력 checkbox event */
    handleCustomInput = (e) => {
        this.setState({
            customInput: e.target.checked,
        });
    }

    handleInputChange = (e) => {
        const regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*$/;
        //이메일을 변경한 경우, duplicatePass(중복체크) False
        if(e.target.name === "inputId" || e.target.name === "customDomain" || e.target.name === "domain"){
            
            // if ( e.target.value !== "" && e.target.name === "inputId" && !regExp.test( e.target.value )) {
            //     alert('잘못된 이메일 형식입니다.');
            //     return false;
            // }
            this.setState({
                duplicatePass: false
            })
        }
        let input = {};
        input[e.target.name] = e.target.value;
        this.setState(input);
       
    }

    /** 이메일 중복 체크 */
    handleDuplicateCheck = () => {
        const self = this;
        const domain = (this.state.customInput? this.state.customDomain : this.state.domain);
        const inputEmail = `${this.state.inputId}@${domain}`;
        if(domain === "" || this.state.inputId === "") {
            alert('이메일을 입력하세요');
            return false;
        }
        if(!isEmail(inputEmail)) {
            alert('잘못된 이메일 형식 입니다.');
            return false;
        }
        
        axios({
            url:devtest() + `/user/dupleCheck/${inputEmail}`,
            method : 'get',
            headers: { Pragma: 'no-cache'}
        }).then(
            (res)=>{
                if(res.data.row ==="0"){
                    self.setState({
                        duplicatePass: true,
                        email : inputEmail
                    })
                    alert("사용하실 수 있는 이메일입니다.")
                }else{
                    alert("중복된 이메일입니다. 다른 이메일을 사용해주세요.")
                }
            }
        )
    }
    /** 취소버튼 */
    handleCancel = () => {
        this.props.history.push(`/`);
    }

    render() { 

        const { handleRegisterClick,
                handleCustomInput,
                handleInputChange,
                handleDuplicateCheck,
                handleCancel } = this;
        const { customInput } = this.state;

        return ( 
            <div className="sub-contents">
                <div className="sub-container">
                    <div className="sub-info">
                        <h2 className="sub_heading">회원가입</h2>
                    </div>
                    <div className="sub_register_box">
                        <div className="register_area">
                            <table className="register_table_contents">
                                <tbody>
                                    <tr>
                                        <td><span>아이디</span></td>
                                        <td>
                                        <input className="text_inpt" type="text" name="inputId" placeholder="아이디" onChange={handleInputChange}  style={{imeMode:"disabled"}}/>
                                        <span> @ </span>
                                            { customInput ? 
                                                <input className="text_inpt" type="text" name="customDomain" onChange={handleInputChange}/> : 
                                                <select className="text_inpt" style={{width:"173px"}} name="domain" onChange={handleInputChange}>
                                                    <option value="">선택</option>
                                                    <option value="gmail.com">gmail.com</option>
                                                    <option value="naver.com">naver.com</option>
                                                    <option value="yahoo.com">yahoo.com</option>
                                                    <option value="nate.com">nate.com</option>
                                                    <option value="daum.net">daum.net</option>
                                                </select> 
                                            }
                                            <span>
                                                <input type="checkbox" id="registerDuplicate" onClick={handleCustomInput}/>
                                                <label htmlFor="registerDuplicate"><em></em>직접입력</label>
                                            </span>
                                            <button className="normal_red_right_btn" onClick={handleDuplicateCheck}>중복확인</button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><span>비밀번호</span></td>
                                        <td>
                                            <input className="text_inpt" type="password" name="password" placeholder="비밀번호 (8자이상)" onChange={handleInputChange}/>
                                            <span>(대문자, 소문자, 숫자가 각각 1개이상 포함 필수)</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><span>비밀번호 확인</span></td>
                                        <td>
                                            <input className="text_inpt" type="password" name="passwordConfirm"  placeholder="비밀번호 확인" onChange={handleInputChange}/>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="register_field">
                                <div className="term_of_service" style={{marginTop:"10px", border:"solid 1px #ccc", width:"90%",height:"500px", overflowY:"auto"}}>
                                    <p style={{color:"#111", fontSize:"22px", fontWeight:"600"}}>제 1조 (목적)</p>
                                    <p>&nbsp; 본 약관은 SK주식회사 C&amp;C(이하 &ldquo;회사&rdquo;)가 제공하는 서비스(이하 &ldquo;서비스&rdquo;) 이용과 관련, 회원과 회사와의 권리와 의무 등 중요 사항을 정하는 것을 목적으로 한다.</p>

                                    <p style={{textAlign:"left"}}><strong>&nbsp;</strong></p>
                                    <p style={{color:"#111", fontSize:"22px", fontWeight:"600"}}>제 2조 (정의)</p>
                
                        
                                    <p>1. &ldquo;사이트&rdquo;란 회사가 서비스를 회원에게 제공하기 위하여 컴퓨터 등 정보통신설비를 이용하여 설정한 가상의 영업장 또는 회사가 운영하는 웹사이트, 모바일웹 등의 서비스를 제공하는 모든 매체를 통칭하며, 통합된 하나의 회원 계정(아이디 및 패스워드)을 이용하여 서비스를 제공받을 수 있는 아래의 사이트를 말한다.</p>
                                    
                                    <p>&nbsp;&nbsp;&nbsp;&nbsp; - <a href="https://www.skhappycampus.com">www.skhappycampus.com</a></p>
                            
                                    <p>2. &ldquo;회원&rdquo;이란 회사와 서비스 이용계약을 체결(회원 가입)한 자를 뜻한다.</p>
                                    <p>3. &ldquo;협력사&rdquo;란 회사와 협력관계에 있는 회사를 뜻한다.</p>
                                    <p>4. &ldquo;회원 ID&rdquo;란 회원 식별 및 서비스 이용 등을 위해 이용자가 직접 설정, 입력하며 문자와 숫자로 이뤄진 조합을 뜻한다.</p>
                                    <p>5. &ldquo;패스워드&rdquo;란 회원 정보 보호 및 회원 별 정보 제공 서비스 등을 위해 이용자가 직접 설정, 입력하며 문자와 숫자로 이뤄진 조합을 뜻한다.</p>
                                    <p>6. &ldquo;운영자&rdquo;란 서비스의 전반적 관리 및 운영을 담당하는 회사의 직원을 뜻한다.</p>
                            

                                    <p style={{textAlign:"left"}}><strong>&nbsp;</strong></p>
                                    <p style={{color:"#111", fontSize:"22px", fontWeight:"600"}}>제 3조 (회원 가입 신청 및 허가)</p>
                                    <p>&nbsp; 회원으로 가입하고자 하는 자는 회사가 제시하는 양식에 자기 정보를 입력, 신청하고 회사는 이를 허가함으로써 가입된 회원에게 서비스를 제공한다.</p>

                                    <p style={{textAlign:"left"}}><strong>&nbsp;</strong></p>
                                    <p style={{color:"#111", fontSize:"22px", fontWeight:"600"}}>제 4조 (회원 가입 신청 시 기재 항목)</p>
                                    <p>&nbsp; 회원 가입 신청 시 다음 항목은 필수적으로 입력해야 한다.</p>
                            
                                    <p>&nbsp;&nbsp;&nbsp;&nbsp;1. 성명</p>
                                    <p>&nbsp;&nbsp;&nbsp;&nbsp;2. 아이디/패스워드</p>
                                    <p>&nbsp;&nbsp;&nbsp;&nbsp;3. e-mail 주소</p>
                                    <p>&nbsp;&nbsp;&nbsp;&nbsp;4. 휴대전화번호</p>
                                    <p>&nbsp;&nbsp;&nbsp;&nbsp;5. 업체명 (협력사 회원의 경우)</p>
                                    <p>&nbsp;&nbsp;&nbsp;&nbsp;6. 본인 인증 정보 (일반 회원의 경우)</p>
                                    <p>&nbsp;&nbsp;&nbsp;&nbsp;7. 기타 회원의 권익 증진을 위해 회사가 제공할 필요가 있다고 판단되는 정보를 서비스하기 위해 필요한 항목</p>
                                        

                                    <p style={{textAlign:"left"}}><strong>&nbsp;</strong></p>
                                    <p style={{color:"#111", fontSize:"22px", fontWeight:"600"}}>제 5조 (회원 가입 허가 및 유보 등)</p>
                                
                                    <p>1. 회사는 제 4 조에 규정된 각 항목을 성실히 기재하고 본 약관에 동의하는 이용자에 한해 서비스 이용을 허가한다.</p>
                                    <p>2. 회사는 다음 각 호의 경우 허가를 유보할 수 있다.</p>
                            
                                    <p>&nbsp;&nbsp;&nbsp; (1) 서비스를 제공하지 못할 기술적 장애가 발생한 경우</p>
                                    <p>&nbsp;&nbsp;&nbsp; (2) 기타 회사가 필요하다고 판단한 경우</p>
                
                                    <p>3. 회사는 다음 각 호의 경우 허가를 철회하거나 거절할 수 있다</p>
                                
                                    <p>&nbsp;&nbsp;&nbsp; (1) 제 4 조에 규정된 항목을 허위로 기재한 경우</p>
                                    <p>&nbsp;&nbsp;&nbsp; (2) 다른 사람의 명의를 도용, 회원 가입을 신청한 경우</p>
                                    <p>&nbsp;&nbsp;&nbsp; (3) 사회 공공질서 또는 건전한 미풍양속을 저해할 우려가 있다고 충분히 인정되는 경우</p>
                                    <p>&nbsp;&nbsp;&nbsp; (4) 기타 회원으로서 부적절한 행위를 할 우려가 있다고 충분히 인정되는 경우</p>

                                    <p style={{textAlign:"left"}}><strong>&nbsp;</strong></p>
                                    <p style={{color:"#111", fontSize:"22px", fontWeight:"600"}}>제 6조 (회원 정보의 변경)</p>
                                    <p>&nbsp; 회원은 서비스의 이용 및 원활한 정보 제공 등을 위해 자기 정보를 성실히 관리해야 하며, 변동 사항이 있을 경우 이를 변경해야 한다.</p>

                                    <p style={{textAlign:"left"}}><strong>&nbsp;</strong></p>
                                    <p style={{color:"#111", fontSize:"22px", fontWeight:"600"}}>제 7조 (회원 탈퇴 및 이용 제한)</p>
                        
                                    <p>1. 탈퇴를 원하는 회원은 회원 본인이 직접 온라인을 통해 탈퇴 신청을 해야 한다.</p>
                                    <p>2. 회원 가입 시 입력했던 개인신상 정보는 회원 탈퇴 요청 혹은 보관 동의기간 종료 시 즉각 삭제한다.</p>
                                    <p>3. 회사는 회원이 다음 각 호에 해당되는 행위를 했을 경우 사전 고지 없이 이용 계약을 해지(회원 탈퇴)할 수 있다</p>
                                
                                    <p>&nbsp;&nbsp;&nbsp; (1) 사회 공공질서나 건전한 미풍양속에 저해되는 활동을 하는 경우</p>
                                    <p>&nbsp;&nbsp;&nbsp; (2) 다른 사람의 권리 등을 침해하는 불법적 게시물을 올리는 경우</p>
                                    <p>&nbsp;&nbsp;&nbsp; (3) 자신의 정보 등을 허위로 입력한 경우</p>
                                    <p>&nbsp;&nbsp;&nbsp; (4) 다양한 불법적 수단으로 본 사이트의 운영을 방해하는 경우</p>
                                    <p>&nbsp;&nbsp;&nbsp; (5) 회사가 제공하는 서비스 이용 중 얻게 된 정보를 상업적으로 이용하거나 무단으로 외부에 공표하는 경우</p>
                                    <p>&nbsp;&nbsp;&nbsp; (6) 기타 다른 회원이나 회사에 피해를 끼치는 경우</p>
                                
                                    <p>4. 회사는 제 7 조 제3항의 규정에 의해 이용 계약이 해지(회원 탈퇴)된 이용자의 경우 해당 이용자의 이용 계약(회원 가입)을 최대 2년까지 제한할 수 있다.</p>
                                

                                    <p style={{textAlign:"left"}}><strong>&nbsp;</strong></p>
                                    <p style={{color:"#111", fontSize:"22px", fontWeight:"600"}}>제 8조 (정보 및 서비스의 제공 등)</p>
                                
                                    <p>1. 회사는 회원의 권익 증진을 위해 제공할 필요가 있다고 판단되는 다양한 정보를 회원 가입 신청 시 기재한 개인신상정보를 통해 전자우편, 유선매체, 우편 등의 방법으로 회원에게 제공할 수 있다.</p>
                                    <p>2. 서비스 제공은 하루 24시간 제공을 원칙으로 하나 정기 점검이나 설비 보수, 전기통신사업법에 의한 기간통신사업자의 서비스 중단, 천재지변 등 불가항력적인 이유로 사전 고지 없이 정보제공을 중단할 수 있다.</p>
                                

                                    <p style={{textAlign:"left"}}><strong>&nbsp;</strong></p>
                                    <p style={{color:"#111", fontSize:"22px", fontWeight:"600"}}>제 9조 (회원 신상정보 관리 등 의무)</p>
                                
                                    <p>1. 회사는 서비스 제공을 위해 수집한 회원 신상정보를 본인의 승낙 없이 제3자에게 배포, 제공하는 등 외부로 유출하지 않는다. 단, 적법한 절차를 거친 국가기관의 요구나 기타 공익을 위해 필요하다고 인정되는 경우는 예외로 한다.</p>
                                    <p>2. 회사는 회원이 회사가 제공하는 서비스를 원활하게 이용할 수 있도록 노력할 의무가 있으며, 회원 신상정보 역시 회원에 대한 서비스 향상을 위해서만 이용한다</p>
                                

                                    <p style={{textAlign:"left"}}><strong>&nbsp;</strong></p>
                                    <p style={{color:"#111", fontSize:"22px", fontWeight:"600"}}>제 10조 (서비스 이용에 대한 회원의 의무)</p>
                                
                                    <p>1. 회원의 관리 소홀로 인한 ID 및 패스워드 노출과 이에 따른 피해는 전적으로 회원이 책임지도록 한다.</p>
                                    <p>2. 회사에서 제공하는 서비스에 대한 회원의 이용권한은 회원 개인에 한정된 것이며, 제3자에 양도나 대여할 경우 회사에서 임의로 해당 회원의 ID를 삭제할 수 있다. 특히 무단 양도나 대여에 대한 책임은 전적으로 회원이 책임지도록 한다.</p>
                                    <p>3. 회원은 회사에서 제공하는 서비스를 이용할 때 다음 각 호를 해서는 안 된다</p>
                                
                                    <p>&nbsp;&nbsp;&nbsp; (1) 다른 사람의 e-mail address을 무단 사용하는 행위</p>
                                    <p>&nbsp;&nbsp;&nbsp; (2) 서비스 이용 중 습득한 정보를 상업적 목적으로 이용하거나 올린 이 또는 회사의 허가 없이 출판, 방송 등 제3자에게 노출시키는 행위. 단, 공익을 목적으로 하거나 회원의 &nbsp;&nbsp;&nbsp;&nbsp;권익 증진을 위해 필요한 경우 회사에 협의를 요청하고 허가를 받아야 한다.</p>
                                    <p>&nbsp;&nbsp;&nbsp; (3) 저작권 등 제3자의 권리를 침해하는 게시 행위</p>
                                    <p>&nbsp;&nbsp;&nbsp; (4) 회사의 사이트 운영을 방해하는 행위</p>
                                    <p>&nbsp;&nbsp;&nbsp; (5) 사회 공공질서에 위배되거나 건전한 미풍양속을 저해하는 정보나 문자, 그림 등을 타인에게 유포하는 행위</p>
                                
                                    <p>4. 회원은 회사의 회원에 대한 서비스 향상을 위한 노력에 성실히 협조해야 한다.</p>

                                    <p style={{textAlign:"left"}}><strong>&nbsp;</strong></p>
                                    <p style={{color:"#111", fontSize:"22px", fontWeight:"600"}}>제 11조 (게시 및 저장 자료에 대한 책임과 권리)</p>
                                
                                    <p>1. 회원은 자신이 사이트 내에 게재한 소프트웨어, 프로그램, 정보, 메시지, 데이터, 문서, 그림, 이미지, 문자, 소리, 개인정보 등에 대해 책임이 있으며, 저작권 침해 등 기타 불법 행위로 인해 발생하는 피해에 대해서도 책임을 갖는다.</p>
                                    <p>2. 회사는 사이트 내에 게시되거나 저장된 자료의 관리에 성실히 노력한다.</p>
                                    <p>3. 사이트 내에 저장 또는 게재된 모든 자료의 저작권은 해당 자료의 등록자에게 있으며, 외부에서 가져온 타인의 게시물 및 자료는 등록자의 저작권이 인정되지 않는다.</p>
                                    <p>4. 회원은 정당한 권한이나 해당 프로그램 저작권자의 허락 없이 프로그램 등을 제거, 변경, 복제 하거나 게시, 전송, 링크, 배포할 수 없으며, 저작권자의 실명 또는 익명을 변경 또는 은닉하거나 해당 프로그램의 제호를 변경해 저작권자의 허가 없이 게시, 게재할 수 없다.</p>
                                    <p>5. 회사는 사이트 내에 저장 또는 게재된 모든 자료와 게시물을 자료를 게시한 회원의 동의를 거쳐 출판, CD-ROM 제작 등에 사용할 수 있다.</p>
                                

                                    <p style={{textAlign:"left"}}><strong>&nbsp;</strong></p>
                                    <p style={{color:"#111", fontSize:"22px", fontWeight:"600"}}>제 12 조 링크사이트</p>
                                    <p>1. 회사의 사이트는 회원에게 다른 회사의 웹사이트 또는 자료에 대한 링크를 제공할 수 있다.</p>
                                    <p>2. 이 경우 회사의 사이트는 외부사이트 및 자료에 대한 아무런 통제권이 없으므로 그로부터 제공 받는 서비스나 자료의 유용성에 대해 책임질 수 없으며 보증할 수 없다.</p>
                                    <p>3. 회원이 회사의 사이트에 포함하고 있는 링크를 클릭(click)하여 타 웹사이트의 페이지로 옮겨갈 경우 해당 사이트의 개인정보보호정책은 회사의 사이트와 무관하므로 새로 방문한 사이트의 정책을 반드시 검토하여야 한다.</p>

                                    <p style={{textAlign:"left"}}><strong>&nbsp;</strong></p>
                                    <p style={{color:"#111", fontSize:"22px", fontWeight:"600"}}>제 13 조 게시물</p>
                                
                                    <p>1. 게시물에 관련된 제반 권리와 책임은 작성자인 회원 개인에게 있다. 또한 게시물을 통해 자발적으로 공개된 정보는 보호받기 어려우므로 회원은 정보 공개 전에 심사숙고 한 후 서비스를 이용하여야 한다.</p>
                                    <p>2. 회사의 사이트는 회원의 게시물을 소중하게 생각하며 변조, 훼손, 삭제되지 않도록 최선을 다하여 보호하지만 다음의 경우는 명시적 또는 개별적인 경고 후 삭제 또는 수정 조치할 수 있다.</p>
                                
                                    <p>&nbsp;&nbsp;&nbsp; (1) 스팸(spam)성 게시물 (예: 행운의 편지, 특정사이트에 대한 광고, 타 사이트로의 유도 광고 및 링크 등)</p>
                                    <p>&nbsp;&nbsp;&nbsp; (2) 타인을 비방할 목적으로 허위 사실을 유포하여 타인의 명예를 훼손하는 게시물</p>
                                    <p>&nbsp;&nbsp;&nbsp; (3) 동의 없는 타인의 신상공개, 본 서비스의 저작권, 제3자의 지적재산권 등 권리를 침해하는 내용, 기타 게시판 주제와 다른 내용의 &nbsp;&nbsp;&nbsp;&nbsp;게시물</p>
                                    <p>&nbsp;&nbsp;&nbsp; (4) 기타 본 서비스 이용약관 또는 각종 지침, 운영원칙에 반하는 게시물</p>
                                
                                    <p>3. 회사는 다른 주제의 게시판으로 이동 가능한 내용일 경우 해당 게시물에 이동 경로를 밝혀 오해가 없도록 한다.</p>

                                    <p style={{textAlign:"left"}}><strong>&nbsp;</strong></p>
                                    <p style={{color:"#111", fontSize:"22px", fontWeight:"600"}}>제 14조 (면책 및 손해 배상)</p>
                            
                                    <p>1. 회사는 회원의 귀책사유로 인한 서비스 이용 장애에 대하여 책임을 면한다.</p>
                                    <p>2. 회사는 회원이 서비스를 이용하여 기대하는 손익이나, 서비스를 통해 얻은 정보 또는 자료 등으로 인해 발생한 손익에 대하여 책임을 면한다.</p>
                                    <p>3. 회사는 회원이 직접 서비스에 게재한 정보, 자료, 사실의 신뢰도, 정확성 등 내용에 관하여는 책임을 면한다.</p>
                                    <p>4. 회사는 회원 간의 상호거래나 관계에서 발생되는 어떠한 결과에도 보상이나 책임을 지지 않는다.</p>
                                    <p>5. 약관의 적용은 회원에 한하며, 제3자로부터의 어떠한 배상, 클레임 등에 대하여 회사는 책임을 면한다.</p>
                                    <p>6. 회사의 명백한 고의나 중과실에 의해 회원이 피해를 입은 경우는 회사가 회원에 대해 책임을 진다.</p>
                            
                                    
                                    <p style={{textAlign:"left"}}><strong>&nbsp;</strong></p>
                                    <p style={{color:"#111", fontSize:"22px", fontWeight:"600"}}>제 15조 (약관의 효력 및 변경)</p>
                            
                                    <p>1. 약관의 효력</p>
                                
                                    <p>&nbsp;&nbsp;&nbsp; 이 약관은 공시됨과 동시에 효력을 발생한다.</p>
                    
                                    <p>2. 약관의 변경</p>
                            
                                    <p>&nbsp;&nbsp;&nbsp; 회사는 새로운 서비스를 추가하거나 회사 정책상 중요 사유 등이 있을 경우 적용일자 및 개정사유를 명시하여 현행약관과 함께 홈페이지에 그 적용일의 7일전부터 공시하거나 회원이 입력한 가장 최근의 e-mai로 전송하는 방법 등 전자적 수단으로 회원에게 고지하는 방식으로 약관을 변경할 수 있다. 다만, 회원에게 불리한 내용으로 약관을 개정하는 경우에는 적용일로부터 30일전까지 홈페이지에 공시하고 회원이 입력한 가장 최근의 e-mail로 전송하는 방법 등 전자적 수단으로 회원에게 고지한다. 이때 회원은 가입을 취소할 수 있으며, 약관 변경 고지 후에도 가입 취소 의사를 밝히지 않고 3회 이상 접속한 회원의 경우 약관 변경에 동의한 것으로 간주한다. 회원이 변경된 약관에 동의하지 않을 경우 서비스 이용을 중단하고 이용계약을 해지할 수 있다.</p>

                                    <p style={{textAlign:"left"}}><strong>&nbsp;</strong></p>
                                    <p style={{color:"#111", fontSize:"22px", fontWeight:"600"}}>제 16조 (약관 규정 외 사항에 관한 준칙)</p>
                                    <p>&nbsp; 본 약관에 규정되지 않은 사항에 대해서는 전기통신사업법 등 관계 법령의 규정을 따른다.</p>

                                    <p style={{textAlign:"left"}}><strong>&nbsp;</strong></p>
                                    <p style={{color:"#111", fontSize:"22px", fontWeight:"600"}}>제 17조 (관할 법원)</p>
                                    <p>&nbsp; 서비스 이용 중 회원과 회사 간에 분쟁이 발생, 소송이 제기될 경우 서울중앙지방법원을 관할 법원으로 한다.</p> 
                                </div>

                                </div>
                            <div className="gt-f-l">
                                <div>
                                    <input type="checkbox" id="agreement"/>
                                    <label htmlFor="agreement"><em></em>이용약관 동의 (필수)</label>
                                </div>
                            </div>
                            <div className="clear" />
                            <div style={{"width":"95%", "marginTop":"20px"}}>
                                <button className="normal_gray_center_btn" onClick={handleRegisterClick}>가입</button>
                                <button className="normal_gray_center_btn" onClick={handleCancel}>취소</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
         );
    }
}
 
export default connect(
    (state) => ({
    }), (dispatch) => ({
        RegisterActions: bindActionCreators(registerActions, dispatch),
    })
)(RegisterContainer);
