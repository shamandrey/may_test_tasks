import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
var _log = console.log;

console.log = function () {
  // if (arguments[0].toString().indexOf('[HMR]') === -1) //remove hmr logging
    return _log.apply(console, arguments);
};
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
