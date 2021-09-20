import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { MoralisProvider } from "react-moralis";

ReactDOM.render(
  <MoralisProvider appId="qbDgtX7LMRwrKfrnFsVByi7pxup2gyuE3lX9O32I" serverUrl="https://4xftb2hl4taq.grandmoralis.com:2053/server">
    <App />
  </MoralisProvider>,
  document.getElementById("root"),
);

reportWebVitals(console.log);
