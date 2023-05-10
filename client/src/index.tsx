import React from 'react';
import ReactDOM from 'react-dom/client';
import Router from 'src/Router';
import reportWebVitals from 'src/reportWebVitals';
import GlobalStyles from 'src/style/GlobalStyles';
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RecoilRoot>
      <BrowserRouter >
        <Router />
        <GlobalStyles />
      </BrowserRouter>
    </RecoilRoot>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
