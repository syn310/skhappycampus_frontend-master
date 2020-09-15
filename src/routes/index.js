import {
  ApplyContainer,
  MyApplyContainer,
  QuestionAddContainer,
  QuestionListContainer,
  QuestionDetailContainer,
  CompanyContainer,
  IntroContainer,
  LoginContainer,
  AgreementContainer,
  QualifiedContainer,
  ApprovalContainer,
  RegistFormContainer,
  SelectCompanyContainer,
  SubmitResumeContainer,
  RecruitContainer,
  FaqContainer,
  RegisterContainer,
  MyPasswordContainer,
  NoticeContainer
        } from 'containers';
        
  import { RegistForm } from 'components';
 
export const privateRoutes = [
  /** 마이페이지 */
  {
    path: "/mypage",
    component: MyApplyContainer
  },
  /** 1:1 문의 */
  {
    path: "/question/qna",
    component: QuestionAddContainer
  },
  {
    path: "/apply/step0",
    component: QualifiedContainer
  },
  {
    path: "/apply/step1",
    component: AgreementContainer
  },
  {
    path: "/apply/step2",
    component: ApprovalContainer
  },
  {
    path: "/apply/step3",
    component: RegistForm /**토큰 refresh 문제로 container + component를 하나로 합침 2019-05-15 */
  },
  {
    path: "/apply/step4",
    component: ApplyContainer
  },
  {
    path: "/apply/step5",
    component: SelectCompanyContainer
  },
  {
    path: "/apply/step6",
    component: SubmitResumeContainer
  },
  {
    path: "/mypass",
    component: MyPasswordContainer
  },
];

export const publicRoutes = [
//   {
//     path: null,
//     component: NotFoundf
//   },
  {/**  */
    path: "/intro/main",
    component: IntroContainer
  },
  {/**  */
    path: "/intro/programs",
    component: IntroContainer
  },
  {/**  */
    path: "/intro/process",
    component: IntroContainer
  },
  {/**  */
    path: "/intro/curriculum",
    component: IntroContainer
  },
  {/**  */
    path: "/intro/benefit",
    component: IntroContainer
  },

  {/** 로그인 */
    path: "/login",
    component: LoginContainer
  },
  {/** 회원가입 */
    path: "/register",
    component: RegisterContainer
  },

  {/** 채용희망사 소개 */
    path: "/company",
    component: CompanyContainer
  },
  {/** 문의 */
    path: "/question/faq",
    component: FaqContainer
  },
  {/** 모집공고 페이지 */
    path: "/recruit",
    component: RecruitContainer
  },
  {/** 공지사항 페이지 */
    path: "/question/notice",
    component: NoticeContainer
  },
  
];