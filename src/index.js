import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import Amplify, { Auth } from 'aws-amplify'
import config from './aws-exports'
Amplify.configure(config)

Auth.currentCredentials()
  .then(d => console.log('data: ', d))
  .catch(e => console.log('error: ', e))

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
