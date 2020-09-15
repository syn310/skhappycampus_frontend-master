import React, { Component } from 'react';

import { Link } from 'react-router-dom';

const Agreement = ({ handleNextClick }) => {

    //모두동의 클릭
    const handleCheckClick = (e) => {
        //console.log(e)
        const { checked } = e.target;
        document.getElementById("agree").checked = checked ;
        //document.getElementById("agreeChk3rd").checked = checked ;
    }

    //다음 클릭시 validation 체크
    const checkValidation = () => {
        
        if(!(document.getElementById("agree").checked )){
            alert("필수 동의항목에 동의하지 않았습니다.");
            return;
        }else{
            if(confirm("저장 후 다음 단계로 이동합니다."))
            handleNextClick();
        }

    }

    return(
        <div>
            <div className="sub-info">
                <h3 className="sub_heading_3dep_2">STEP2 개인정보 취급방침</h3>
            </div>
            <div className="clear"></div>
            
            <div className="sub_box_agreement">
            <div className="apply_step4">
                <div style={{"overflowY": "scroll", "height":"400px"}}>

                <div className="term_of_service" style={{width:"90%", marginTop:0, paddingTop:0}}>
                  <p style={{marginTop:0, color:"#111", fontSize:"22px", fontWeight:"600"}}>제 1조 총칙</p>
                  <p>① 개인정보란 생존하는 개인에 관한 정보로서 당해 정보에 포함되어 있는 성명, 생년월일 등의 사항에 의하여 당해 개인을 식별할 수 있는 부호, 문자, 음성, 음향, 영상 등의 정보(당해 정보만으로는 특정 개인을 식별할 수 없더라도 다른 정보와 용이하게 결합하여 식별할 수 있는 것을 포함합니다)를 말합니다.</p>
                  <p>② SK 주식회사가 운영하는 행복성장캠퍼스 웹사이트(www.skhappycampus.com 이하 '행복성장캠퍼스')는 귀하의 개인정보보호를 매우 중요시하며, 『개인정보보호법』 등 관련법령을 준수하고 있습니다.</p>
                  <p>③ ’행복성장캠퍼스’는 본 개인정보처리방침을 통하여 귀하께서 제공하시는 개인정보가 어떠한 용도와 방식으로 이용되고 있으며 개인정보보호를 위해 어떠한 조치가 취해지고 있는지 알려드립니다.</p>
                  <p>④ ’행복성장캠퍼스’는 개인정보처리방침을 홈페이지 첫 화면에 공개함으로써 귀하께서 언제나 용이하게 보실 수 있도록 조치하고 있습니다.</p>
                  <p>⑤ ’행복성장캠퍼스’는 개인정보처리방침의 지속적인 개선을 위하여 개인정보처리방침을 개정하는데 필요한 절차를 정하고 있습니다.</p>
                  <p>⑥ 본 개인정보처리방침은 관련 법률 및 지침의 변경 또는 내부 운영방침의 변경에 따라 변경될 수 있습니다. 개인정보처리방침이 변경된 경우 버전번호 및 개정일자 등을 부여하여 개정된 사항을 귀하께서 쉽게 알아볼 수 있도록 하고 있습니다.</p>

                  <p style={{textAlign:"left"}}><strong>&nbsp;</strong></p>
                  <p style={{color:"#111", fontSize:"22px", fontWeight:"600"}}>제 2조 개인정보의 수집범위 및 이용목적</p>
                  <p>① 귀하는 별도의 회원가입 절차 없이 ’행복성장캠퍼스’가 제공하는 컨텐츠에 자유롭게 접근할 수 있습니다. ’행복성장캠퍼스’의 지원자 선발 서비스를 이용하시고자 할 경우 다음의 정보를 입력해주셔야 하며, 선택항목을 입력하시지 않았다 하여 서비스 이용에 제한은 없습니다.</p>
                  <p>- 개인정보 수집 및 보유자 : SK주식회사 및 프로그램 참여 협력사<br/> - 회원가입 및 입사지원 서비스 이용시 수집하는 개인정보 항목 및 이용목적</p>
                  <table className="term_of_service_table">
                      <thead>
                          <tr>
                              <th>수집항목</th>
                              <th>이용목적</th>
                          </tr>
                      </thead>
                      <tbody>
                          <tr>
                              <td>
                              <p>(필수) 성명, 비밀번호,</p>
                              </td>
                              <td>
                              <p>본인 식별, 웹사이트 이용자 확인</p>
                              </td>
                              </tr>
                              <tr>
                              <td>
                              <p>(필수) 이메일주소, 휴대전화번호</p>
                              </td>
                              <td>
                              <p>안내, 고지사항 전달, 본인인증</p>
                              </td>
                              </tr>
                              <tr>
                              <td>
                              <p>(선택) 영문 성명, 국적, 생년월일, 성별, 전화번호, 주소, 학력 정보,<br/>외국어 및 자격증 정보, 협력사, 취득학점,<br/>외국어능력, 자격사항, 자기소개서 </p>
                              </td>
                              <td>
                              <p>지원자 선발 적합성 판단 및 서류전형/면접전형 등의<br/>근거 자료, 인재 DB 활용 등</p>
                              </td>
                          </tr>
                      </tbody>
                  </table>

                  <p>- 민감정보 수집 항목 및 이용목적</p>
                  <table className="term_of_service_table">
                      <thead>
                          <tr>
                              <th>수집항목</th>
                              <th>이용목적</th>
                          </tr>
                      </thead>
                      <tbody>
                          <tr>
                              <td>
                              <p>장애 정보</p>
                              </td>
                              <td>
                              <p>채용 적합성 판단 및 서류전형/면접전형 등의 근거 자료, 인재 DB 활용 (수시 채용 등)</p>
                              </td>
                          </tr>
                          <tr>
                              <td>
                              <p>병역 정보</p>
                              </td>
                              <td>
                              <p>채용 적합성 판단 (병역 의무 이행 확인 목적)</p>
                              </td>
                          </tr>
                          <tr>
                              <td>
                              <p>보훈 정보</p>
                              </td>
                              <td>
                              <p>국가 유공자 예우 및 지원에 관한 법률 이행을 위한 확인 목적</p>
                              </td>
                          </tr>
                      </tbody>
                  </table>

                  <p style={{textAlign:"left"}}><strong>&nbsp;</strong></p>
                  <p style={{color:"#111", fontSize:"22px", fontWeight:"600"}}>제 3조 개인정보 수집에 대한 동의 방법</p>
                  <p>’행복성장캠퍼스’는 귀하가 ’행복성장캠퍼스’의 개인정보처리방침 또는 이용약관의 내용에 대해 「동의한다」버튼 또는 「동의하지 않는다」버튼을 클릭할 수 있도록 하여, 귀하가 「동의한다」버튼을 클릭하면 개인정보 수집에 대해 동의한 것으로 봅니다.</p>

                  <p style={{textAlign:"left"}}><strong>&nbsp;</strong></p>
                  <p style={{color:"#111", fontSize:"22px", fontWeight:"600"}}>제 4조 쿠키에 의한 개인정보 수집</p>
                  <p>쿠키(cookie)는 웹사이트가 귀하의 컴퓨터 브라우저로 전송하는 소량의 정보로 보통 하드디스크의 Windows\cookies 디렉토리에 암호화되어 저장됩니다. ’행복성장캠퍼스’는 귀하에 대한 정보를 저장하고 수시로 찾아내는 쿠키(cookie)를 사용하고 있지 않습니다. 단, 귀하께서 행복성장캠퍼스에서 로그인 하신 후, 다른 웹사이트를 새 창에서 여시는 경우 비정상적인 쿠키가 생성될 수 있으나 이럴 경우에도 귀하의 개인정보와 관련된 사항이 쿠키에는 전혀 반영되지 않습니다.</p>

                  <p style={{textAlign:"left"}}><strong>&nbsp;</strong></p>
                  <p style={{color:"#111", fontSize:"22px", fontWeight:"600"}}>제 5조 목적 외 사용 및 제3자에 대한 제공 및 공유</p>
                  <p>① ’행복성장캠퍼스’는 귀하의 개인정보를 &lt;제2조 개인정보의 수집범위 및 이용목적&gt; 에서 고지한 범위 내에서 사용하며, 동 범위를 초과하여 이용하거나 제3자에게 제공하지 않습니다.</p>
                  <p>② 다음은 예외로 합니다.</p>
                  <p>- 통신비밀보호법, 국세기본법, 정보통신망 이용촉진 및 정보보호 등에 관한 법률, 금융실명거래 및 비밀보장에 관한 법률, 신용정보의 이용 및 보호에 관한 법률, 전기통신기본법, 전기통신사업법, 지방세법, 소비자기본법, 한국은행법, 형사소송법 등 다른 법률에 특별한 규정이 있는 경우. 단, '법률에 특별한 규정이 있는 경우'로 행정목적이나 수사목적으로 행정관청 또는 수사기관이 요구해 온 경우라도 무조건 고객의 개인정보를 제공하지 않으며, 법률에 규정된 바에 따라 영장 또는 기관장의 직인이 날인된 서면에 의한 경우 등 적법한 절차에 따라 제공합니다.<br /> - 통계작성 • 학술연구나 시장조사를 위하여 특정 개인을 식별할 수 없는 형태로 관계사나 연구단체 등에 제공하는 경우<br /> - 본 예외 사항에서도 관계법령에 의하거나 수사기관의 요청에 의해 정보를 제공한 경우에는 이를 귀하에게 고지하는 것을 원칙으로 운영하고 있습니다. 그러나, 법률상의 근거에 의해 부득이하게 고지를 하지 못할 수도 있습니다. 본래의 수집목적 및 이용목적에 반하여 무분별하게 정보가 제공되지 않도록 최대한 노력하겠습니다.</p>

                  <p style={{textAlign:"left"}}><strong>&nbsp;</strong></p>
                  <p style={{color:"#111", fontSize:"22px", fontWeight:"600"}}>제 6조 개인정보의 열람 / 정정</p>
                  <p>① 귀하는 언제든지 ’행복성장캠퍼스’에서 귀하의 개인정보를 수정하거나 삭제하실 수 있습니다. 직접 수정하거나 삭제하기 어려운 경우에는 개인정보관리책임자 및 담당자에게 서면, 전화 또는 E-mail 로 연락하시면 지체 없이 조치하겠습니다.</p>
                  <p>② 귀하가 개인정보의 오류에 대한 정정을 요청한 경우, 정정을 완료하기 전까지 당해 개인 정보를 이용 또는 제공하지 않습니다.</p>

                  <p style={{textAlign:"left"}}><strong>&nbsp;</strong></p>
                  <p style={{color:"#111", fontSize:"22px", fontWeight:"600"}}>제 7조 개인정보 수집, 이용, 제공에 대한 동의철회(회원탈퇴)</p>
                  <p>① 회원가입을 위한 개인 Profile작성 및 입사 지원서 작성을 통한 개인정보의 수집, 이용, 제공에 대해 귀하께서 동의하신 내용을 귀하는 언제든지 철회하실 수 있습니다.</p>
                  <p>② ’행복성장캠퍼스’는 개인정보의 수집에 대한 동의철회(지원서 삭제)를 개인정보를 수집하는 방법보다 쉽게 할 수 있도록 필요한 조치를 취하겠습니다.</p>

                  <p style={{textAlign:"left"}}><strong>&nbsp;</strong></p>
                  <p style={{color:"#111", fontSize:"22px", fontWeight:"600"}}>제 8조 개인정보의 보유기간 및 이용기간</p>
                  <p>귀하의 개인정보는 아래 기간 동안 보유할 수 있으며 보유기간 종료 후 즉시 파기됩니다. 다만, 관계법령의 규정에 의하여 보존할 필요가 있는 경우는 해당 법령에서 정한 바에 의하여 개인정보를 보관할 수 있습니다. <br /> - 일반회원 정보 보유기간 : 개인정보의 이용목적이 달성되거나 회원의 탈퇴 요청 시 까지<br /> - 지원자 정보 보유기간 : 지원서 제출일로부터 5년, 탈퇴 및 삭제 요청 시 즉시 파기</p>

                  <p style={{textAlign:"left"}}><strong>&nbsp;</strong></p>
                  <p style={{color:"#111", fontSize:"22px", fontWeight:"600"}}>제 9조 파기절차 및 파기방법</p>
                  <p>’행복성장캠퍼스’는 수집한 개인정보의 이용목적이 달성된 후에는 보관기간 및 이용기간에 따라 해당 정보를 지체 없이 파기합니다. 파기절차 및 방법은 다음과 같습니다.</p>
                  <p>- 파기절차 : 귀하의 개인정보는 목적이 달성된 후 내부 방침 및 기타 관련 법령에 의한 정보보호 사유에 따라 수집 또는 제공받은 목적 달성 후 파기되어 집니다. 개인정보는 법률에 의한 경우가 아니고서는 보유 되어지는 이외의 다른 목적으로 이용되지 않습니다.</p>
                  <p>- 파기방법 : 서면으로 존재하는 개인정보는 분쇄기로 분쇄 또는 소각하거나 화약약품 처리를 하여 용해하여 파기하고, 전자적 파일 형태로 저장된 개인정보는 기록을 재생할 수 없는 기술적 방법을 사용하여 삭제합니다.</p>

                  <p style={{textAlign:"left"}}><strong>&nbsp;</strong></p>
                  <p style={{color:"#111", fontSize:"22px", fontWeight:"600"}}>제 10조 개인정보보호를 위한 기술 및 관리적 대책</p>
                  <p>’행복성장캠퍼스’는 개인정보를 처리함에 있어 개인정보가 분실?도난?유출?변조?훼손되지 않도록 다음과 같은 안전성 확보 조치 행위를 하고 있으며, 개인정보보호에 최선을 다하고 있습니다.</p>
                  <p>① 기술적 보호조치</p>
                  <p>- 개인정보처리시스템에 대한 접근권한을 업무 수행에 필요한 최소한의 범위로 관리 강화<br /> - 개인정보처리시스템에 대한 접근통제 시스템 설치 및 운영<br /> - 개인정보의 안전한 보관을 위하여 암호화하여 저장<br /> - 정보통신망을 통하여 송 • 수신하거나 보조 저장매체(USB, HDD 등)를 통하여 전달하는 경우 암호화하거나 파일 잠금기능(Lock)을 사용<br /> - 비밀번호에 대한 안전한 생성 규칙 준수와 주기적인 변경 시행<br /> - 개인정보처리 시 취급자 및 시스템 보호를 위한 보안프로그램 설치 및 운영<br /> - 개인정보처리시스템 접속기록 보관 및 위?변조 방지 대책 적용</p>
                  <p>② 관리적 보호조치</p>
                  <p>- 개인정보의 안전한 처리를 위한 내부관리계획 수립 및 시행<br /> - 개인정보 처리 관련 취급직원을 최소한의 인원으로 제한<br /> - 개인정보 보호책임자의 지정 및 주기적인 개인정보보호 교육 시행<br /> - 위탁업무 처리자에 대한 개인정보보호 감독 및 교육 시행</p>
                  <p>③ 물리적 보호조치</p>
                  <p>- 전산실, 자료보관실 등 개인정보를 보관하고 있는 장소에 대해서는 출입통제 절차를 수립?운영<br /> - 개인정보가 포함된 서류, 보조저장매체 등은 잠금장치가 있는 안전한 장소에 보관<br /> - 개인정보보호를 위한 CCTV 설치 및 잠금장치가 있는 안전한 장소에 개인화상정보의 보관</p>

                  <p style={{textAlign:"left"}}><strong>&nbsp;</strong></p>
                  <p style={{color:"#111", fontSize:"22px", fontWeight:"600"}}>제 11조 개인정보의 위탁처리</p>
                  <p>’행복성장캠퍼스’는 원활한 서비스 제공을 위해서 귀하의 개인정보의 수집 • 취급 • 관리 등을 위탁하여 처리할 수 있습니다.</p>
                  <p>- 위탁업무계약서 등을 통하여 개인정보보호 관련 법규의 준수, 개인정보에 관한 비밀유지, 제 3 자 제공에 대한 금지, 사고시의 책임부담, 위탁기간, 처리 종료 후의 개인정보의 반환 또는 파기 의무 등을 규정하고, 이를 준수하도록 관리하고 있습니다.</p>
                  <p>- 현재, 개인정보의 처리를 위탁하는 업체 리스트</p>
                  <table className="term_of_service_table" style={{width:"100%"}}>
                  
                      <thead>
                          <tr>
                              <th scope="row">위탁받는 자(수탁자)</th>
                              <th scope="row">위탁하는 업무의 내용</th>
                              <th scope="row">보유 및 이용 기간</th>
                          </tr>
                      </thead>
                      <tbody>
                          <tr>
                              <td>한국IBM㈜</td>
                              <td><p>개인정보 데이터베이스 서버 운영 업무</p></td>
                              <td><p>위탁 종료 시</p></td>
                          </tr>
                          <tr>
                              <td><p>㈜에듀앤텍</p></td>
                              <td><p>교육과정 운영</p></td>
                              <td><p>위탁 종료 시</p></td>
                          </tr>
                      </tbody>
                  </table>

                  <p style={{textAlign:"left"}}><strong>&nbsp;</strong></p>
                  <p style={{color:"#111", fontSize:"22px", fontWeight:"600"}}>제 12조 (개인정보의 국외이전)</p>
                  <p style={{textAlign:"left"}}>’행복성장캠퍼스’는 안정적인 서비스 제공을 위하여 개인정보를 포함한 데이터를 국외에 위치한 백업 저장소에 분산 저장하고 있습니다.</p>
                  <table className="term_of_service_table" style={{width:"100%"}}>
                      <colgroup>
                          <col width="250px"/>
                          <col width="600px"/>
                      </colgroup>
                      <tbody>
                          <tr>
                              <th>이전되는 개인정보 항목</th>
                              <td style={{textAlign:"left"}}>
                                  <ul>
                                      <li>• 이름, 연락처, 이메일</li>
                                  </ul>
                              </td>
                          </tr>
                          <tr>
                              <th>개인정보가 이전되는 국가, 이전일시 및 이전방법</th>
                              <td style={{textAlign:"left"}}>
                                  <ul>
                                      <li>• 이전되는 국가 : 일본, 중화인민공화국 홍콩특별행정구</li>
                                      <li>• 이전일시/방법 : 회사는 개인정보를 수집하는 즉시 IBM 클라우드(국내 저장소)에 해당 정보를 저장하며, 그 저장된 정보는 segmentation 후 수시로 일본 및 중화인민공화국 홍콩특별행정구에 위치한 저장소에 분산 저장됨.</li>
                                  </ul>
                              </td>
                          </tr>
                          <tr>
                              <th>개인정보를 이전받는 자</th>
                              <td style={{textAlign:"left"}}>
                                  <ul>
                                  <li>• IBM Korea, Inc. / (82)02-3781-7114</li>
                                  <li>• IBM China/Hong Kong Limited / (852)2825 6222</li>
                                  <li>• IBM Japan, Ltd. / (81)03-6667-1111</li>
                                  </ul>
                              </td>
                          </tr>
                          <tr>
                              <th>개인정보를 이전받는 자의 개인정보 이용목적 및 보유 · 이용 기간</th>
                              <td style={{textAlign:"left"}}>
                                  <ul>
                                      <li>• ‘행복성장캠퍼스’의 개인정보 보유기간 동안 해외 저장소에 데이터 저장</li>
                                  </ul>
                              </td>
                          </tr>
                      </tbody>
                  </table>

                  <p style={{textAlign:"left"}}><strong>&nbsp;</strong></p>
                  <p style={{color:"#111", fontSize:"22px", fontWeight:"600"}}>제 13조 이용자의 권리와 의무</p>
                  <p>① ’행복성장캠퍼스’는 귀하의 의견을 매우 소중하게 생각하며, 귀하는 의문사항으로부터 언제나 성실한 답변을 받을 권리가 있습니다.</p>
                  <p>② 귀하의 개인정보를 최신의 상태로 정확하게 입력하여 불의의 사고를 예방해 주시기 바랍니다. 이용자가 입력한 부정확한 정보로 인해 발생하는 사고의 책임은 이용자 자신에게 있으며 타인 정보의 도용 등 허위정보를 입력할 경우 회원자격이 상실될 수 있습니다.</p>
                  <p>③ 귀하는 개인정보를 보호 받을 권리와 함께 스스로를 보호하고 타인의 정보를 침해하지 않을 의무도 가지고 있습니다. 비밀번호를 포함한 귀하의 개인정보가 유출되지 않도록 조심하시고 게시물을 포함한 타인의 개인정보를 훼손하지 않도록 유의해 주십시오. 만약 이 같은 책임을 다하지 못하고 타인의 정보 및 존엄성을 훼손할 시에는 『개인정보보호법』 등에 의해 처벌 받을 수 있습니다.</p>

                  <p style={{textAlign:"left"}}><strong>&nbsp;</strong></p>
                  <p style={{color:"#111", fontSize:"22px", fontWeight:"600"}}>제 14조 의견수렴 및 불만처리</p>
                  <p>① 이메일이나 팩스, 우편 및 행복성장캠퍼스를 이용한 상담은 접수 후 신속하고 성실하게 답변 드리겠습니다.</p>
                  <p>② 개인정보관리 책임자 및 담당자</p>
                  <p>- ’행복성장캠퍼스’는 고객님의 개인정보보호를 매우 소중하게 생각하며, 귀하의 개인정보가 훼손, 침해 또는 누설되지 않도록 최선을 다하고 있습니다. 그러나 기술적인 보완조치를 했음에도 불구하고, 해킹 등 기본적인 네트워크상의 위험성에 의해 발생하는 예기치 못한 사고로 인한 정보의 훼손 및 방문자가 작성한 게시물에 의한 각종 분쟁에 관해서는 책임이 없습니다.</p>
                  <p>- 귀하의 개인정보보호 관련 문의 시 신속하고 성실하게 답변을 드리도록 하고 있습니다. 귀하가 본 서비스의 개인정보보호 담당자와 연락을 원하실 경우 아래의 연락처 또는 이메일로 연락을 주시면 개인정보 관련 문의사항에 대하여 신속하고 성실하게 답변해 드리겠습니다.</p>
                  <p>- 개인정보관리 책임자 및 담당자</p>
                  <p>③ 기타 개인정보에 관한 상담이 필요한 경우에는 개인분쟁조정위원회, 정보보호마크 인증위원회, 대검찰청 인터넷범죄수사센터, 경찰청 사이버테러대응센터 등으로 문의하실 수 있습니다.</p>

                  <table className="term_of_service_table">
                  <thead>
                      <tr>
                      <th>구분</th>
                      <th>부서명</th>
                      <th>성명/직위</th>
                      {/* <th>전화</th> */}
                      <th>이메일</th>
                      </tr>
                  </thead>
                  <tbody>
                      <tr>
                      <td>개인정보보호 책임자</td>
                      <td>경영인프라OG</td>
                      <td>강화형 위원</td>
                      {/* <td>010--</td> */}
                      <td>hhkang0313@sk.com</td>
                      </tr>
                      <tr>
                      <td>행복성장캠퍼스 개인정보보호 담당자</td>
                      <td>경영인프라OG</td>
                      <td>이상일 수석</td>
                      {/* <td>010--</td> */}
                      <td>Lee.sangil@sk.com</td>
                      </tr>
                  </tbody>
                  </table>
                  <p>&nbsp;</p>
                  <p>개인분쟁조정위원회 (<a title="개인분쟁조정위원회 홈페이지 바로가기(새창열림)" href="http://www.1336.or.kr/" target="_blank">www.1336.or.kr</a> / 1336) <br /> 정보보호마크인증위원회 (<a title="정보보호마크인증위원회 홈페이지 바로가기(새창열림)" href="http://www.eprivacy.or.kr/" target="_blank">www.eprivacy.or.kr</a> / 02-580-0533~4) <br /> 대검찰청 인터넷범죄수사센터 (<a title="대검찰청 인터넷범죄수사센터 홈페이지 바로가기(새창열림)" href="http://icic.sppo.go.kr/" target="_blank">icic.sppo.go.kr</a> / 02-3480-3600) <br /> 경찰청 사이버테러대응센터 (<a title="경찰청 사이버테러대응센터 홈페이지 바로가기(새창열림)" href="http://www.ctrc.go.kr/" target="_blank">www.ctrc.go.kr</a> / 02-392-0330)</p>

                  <p style={{textAlign:"left"}}><strong>&nbsp;</strong></p>
                  <p style={{color:"#111", fontSize:"22px", fontWeight:"600"}}>제 15조 아동의 개인정보보호</p>
                  <p>’행복성장캠퍼스’는 14 세 미만 아동의 개인정보를 수집하지 않습니다.</p>

                  <p style={{textAlign:"left"}}><strong>&nbsp;</strong></p>
                  <p style={{color:"#111", fontSize:"22px", fontWeight:"600"}}>제 16조 광고성 정보 전송</p>
                  <p>’행복성장캠퍼스’는 영리 목적의 광고성 정보를 전송하지 않습니다.</p>

                  <p style={{textAlign:"left"}}><strong>&nbsp;</strong></p>
                  <p style={{color:"#111", fontSize:"22px", fontWeight:"600"}}>제 17조 이메일 무단수집 거부</p>
                  <p>’행복성장캠퍼스’은 게시된 이메일 주소가 전자우편 수집 프로그램이나 그 밖의 기술적 장치를 이용하여 무단 수집되는 것을 거부합니다. 이를 위반시 『개인정보보호법』등에 의해 처벌 받을 수 있습니다.</p>

                  <p style={{textAlign:"left"}}><strong>&nbsp;</strong></p>
                  <p style={{color:"#111", fontSize:"22px", fontWeight:"600"}}>제 18조 고지의 의무</p>
                  <p>현 개인정보 처리방침은 2019년 4 월에 제정되었으며 정부의 정책 또는 보안기술의 변경에 따라 내용의 추가&bull;삭제 및 수정이 있을 시에는 개정 최소 10 일 전부터 행복성장캠퍼스의 '공지사항' 란을 통해 고지할 것입니다.</p>
              </div>


            </div>

                </div>
            </div>
            <span>
                    <input type="checkbox" id="agree" onClick={handleCheckClick} />
                    <label htmlFor="agree"><em></em>동의함(필수)</label>
            </span>

            <div className="page_btn_area_agreement">
                <div className="page_btn_box">
                {/* <a className="btn_full_save gt-f-l margin_right_20" >중간저장</a> */}
                <a className="btn_full_next gt-f-c" onClick={checkValidation}>다음단계</a>
                <div className="clear"></div>
                </div>
            </div>

        </div>
    )

}

export default Agreement;