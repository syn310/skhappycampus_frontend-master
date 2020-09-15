import React from 'react';
import { Route, Redirect } from "react-router-dom";
import storage from 'lib/storage';

const UnauthRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      !auth.isLogin() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

export default UnauthRoute;