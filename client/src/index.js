import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { CookiesProvider } from 'react-cookie';
import 'bootstrap/dist/css/bootstrap.css';

ReactDOM.render(
  <CookiesProvider >
  <App/>
</CookiesProvider>,
  /*<React.StrictMode>
    <App />     Måske virker det her, fixede det som faktisk var fejlen ved cookies
  </React.StrictMode>,*/
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();

