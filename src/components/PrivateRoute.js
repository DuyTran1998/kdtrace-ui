import React from 'react';
import {isLoggedIn} from '../services/Authentication.js';
import { Redirect, Route } from 'react-router-dom';


const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
      <Route
        {...rest}
        render={props =>
          isLoggedIn() ? (
            <Component {...props} />
          ) : (
            <Redirect to={{ pathname: '/', state: { from: props.location } }} />
          )
        }xwxw
      />
    )
  }
  
  export default PrivateRoute