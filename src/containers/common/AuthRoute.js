import React from 'react';
import { Route, Redirect } from "react-router-dom";
import storage from 'lib/storage';

const AuthRoute = ({ component: Component, ...rest }) => (
  
  <Route
    {...rest}
    render={props =>
      storage.isLogin() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

export default AuthRoute