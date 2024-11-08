import React from "react";
import Header from "./components/Header";
import {BrowserRouter} from "react-router-dom";

export default function Root(props) {
  return <BrowserRouter>
    <Header {...props} />
  </BrowserRouter>;
}
