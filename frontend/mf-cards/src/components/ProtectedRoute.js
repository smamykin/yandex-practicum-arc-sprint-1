import React from 'react';
import { Route, Redirect } from "react-router-dom";
import { getCurrentUserEmail } from "@fourcheese-pizza/mf-common"

const ProtectedRoute = ({ component: Component, ...props  }) => {
  const isLoggedIn = getCurrentUserEmail() !== ''
  return (
    <Route exact>
      {
        () => isLoggedIn ? <Component {...props} /> : <Redirect to="./signin" />
      }
    </Route>
)}

export default ProtectedRoute;
