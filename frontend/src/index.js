import React from 'react';
import ReactDOM from 'react-dom';
import { MoralisProvider } from "react-moralis";

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const moralisConfig = {
  test: {appId: "qbDgtX7LMRwrKfrnFsVByi7pxup2gyuE3lX9O32I", serverUrl: "https://4xftb2hl4taq.grandmoralis.com:2053/server"},
  production: {appId: "JBfxbweoLK5be7xnZineX05Z3MRAPBoIohXvvqgX", serverUrl: "https://vqntw2bxdpp2.bigmoralis.com:2053/server"},
}

let isProduction = true;

ReactDOM.render(
  <MoralisProvider {...(isProduction ? moralisConfig.production : moralisConfig.test)}>
  <App isProduction={isProduction} />
  </MoralisProvider>,
  document.getElementById("root"),
);

reportWebVitals(console.log);
