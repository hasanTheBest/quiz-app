import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { store } from "./app/store";
import { Provider } from "react-redux";
import { createGlobalStyle, css, ThemeProvider } from "styled-components";

const theme = {
  breakpoints: {
    // sm: "@media (min-width: 576px)",
    // md: "@media (min-width: 768px)",
    // lg: "@media (min-width: 992px)",
    // xl: "@media (min-width: 1200px)",
    // xxl: "@media (min-width: 1400px)",
    sm: "@media (max-width: 575.98px)",
    md: "@media (max-width: 767.98px)",
    lg: "@media (max-width: 991.98px)",
    xl: "@media (max-width: 1199.98px)",
    xxl: "@media (max-width: 1399.98px)",
  },

  color: {
    black_a3: "rgba(0, 0, 0, 0.3)",
    black_a8: "rgba(0, 0, 0, 0.8)",
    blue: "darkslateblue",
    cyan: "darkcyan",
    darkBlueBlack: "#00001a",
    green: "darkgreen",
    red: "darkred",
    white_a1: "rgba(255, 255, 255, 0.1);",
    white_a3: "rgba(255, 255, 255, 0.3)",
    white_a8: "rgba(255, 255, 255, 0.8)",
    gradient: (deg) =>
      css`
        background: linear-gradient(
          ${deg},
          darkslateblue,
          darkcyan,
          darkslateblue
        );
      `,
  },
};

const GlobalStyle = createGlobalStyle`
 * {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: Arial, Helvetica, sans-serif;
  color: ${(p) => p.theme.color.white_a8};
}
*::before,
*::after {
  box-sizing: border-box;
}
body {
  background-color: ${(props) => props.theme.color.darkBlueBlack};
}
a {
  text-decoration: none;
}
button {
  cursor: pointer;
}
`;

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
