import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import StoreProvider from "../src/components/store"

ReactDOM.render(
  <React.StrictMode>
      <App />
  </React.StrictMode>,
  document.getElementById('root')
);

