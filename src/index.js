import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { store } from "./app/store";
import { Provider } from "react-redux";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  *{
  margin: 0;
  padding:0;
  box-sizing: border-box;
  font-family: Arial, Helvetica, sans-serif;
  color: rgba(255, 255, 255, .8);
} 
*::before, *::after{
  box-sizing: border-box;
}
a{
  text-decoration: none;
}
button {
  cursor: pointer;
}
`;

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <GlobalStyle />
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
