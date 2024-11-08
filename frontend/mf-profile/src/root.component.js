import React from "react";
import { BrowserRouter} from "react-router-dom";
import './blocks/auth-form/auth-form.css'
import App from "./components/App";

export default function Root(props) {

  return (
      <BrowserRouter>
        <App {...props}/>
      </BrowserRouter>
  );
}
