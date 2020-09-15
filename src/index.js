import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history'
import { Router, Route, IndexRoute, BrowserRouter , Switch, Redirect} from 'react-router-dom'
import { createStore, applyMiddleware, compose } from 'redux'
//import penderMiddleware from 'redux-pender';
import { Provider } from 'react-redux';
import { composeWithDevTools } from "redux-devtools-extension";
import { createLogger } from 'redux-logger';

//reducer
import reducers from 'modules';

//application page
import App from 'App';
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
  NavContainer,
  FaqContainer,
  HeaderContainer,
  RegisterContainer,
  UnauthRoute,
  AuthRoute,
  NoticeContainer
        } from 'containers';


// menu
import Footer from 'components/block/Footer';

import { privateRoutes, publicRoutes } from 'routes';


const logger = createLogger();
// store 생성
const store = createStore(reducers)
// , applyMiddleware(logger)
//   // compose(
//   // applyMiddleware(penderMiddleware(), logger))
// );

const history = createBrowserHistory();
const rootElement = document.getElementById('root');


const Routers = () => (
      <div>
        <Switch>
            <Route exact path="/" component={App} />
            {
              privateRoutes.map((prop, key) => {
                return <AuthRoute path={prop.path} component={prop.component} key={key} />;
              })
            }
            {
              publicRoutes.map((prop, key) => {
                return <Route path={prop.path} component={prop.component} key={key} />;
              })
            }
        </Switch>
      </div>
);


ReactDOM.render(
  <Provider store={store}>
      <BrowserRouter>
        <div className="wrap">
          <HeaderContainer/>
                <Routers  history={history}/>
            <Footer/>
        </div>
    </BrowserRouter>
   </Provider>
  , rootElement);


  // <Route exact path="/" component={App} />
  //         <Route path="/intro" component={IntroContainer} />
  //         <Route path="/company" component={CompanyContainer} />
  //         {/* <Route exact path="/apply" component={QualifiedContainer} /> */}
  //         <Route path="/apply/step0" component={QualifiedContainer} />
  //         <Route path="/apply/step1" component={AgreementContainer} />
  //         <Route path="/apply/step2" component={ApprovalContainer} />
  //         <Route path="/apply/step3" component={RegistFormContainer} />
  //         <Route path="/apply/step4" component={ApplyContainer} />
  //         <Route path="/apply/step5" component={SelectCompanyContainer} />
  //         <Route path="/apply/step6" component={SubmitResumeContainer} />


  //         <Route path="/question" component={QuestionAddContainer} />
  //         {/* <Route exact path="/questionAdd" component={QuestionAddContainer} /> */}
  //         <Route path="/questionDetail" component={QuestionDetailContainer} />
  //         <Route path="/mypage" component={MyApplyContainer} />
  //         <Route path="/login" component={LoginContainer} />
  //         <Route path="/register" component={RegisterContainer} />

  //         <Route path="/recruit" component={RecruitContainer} />
  //         <Route path="/faq" component={FaqContainer} />
          
  //         <Redirect from='*' to='/' />