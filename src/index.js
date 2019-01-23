import React from 'react';
import ReactDOM from 'react-dom';
import App from './app'
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/index.css';
import registerServiceWorker from './registerServiceWorker';
import '../node_modules/font-awesome/css/font-awesome.min.css';

ReactDOM.render(<App />, document.getElementById('main'));
registerServiceWorker();
