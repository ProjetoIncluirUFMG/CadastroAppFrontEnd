import jQuery from 'jquery';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route } from 'react-router-dom';
import reduxThunk from 'redux-thunk';
import createBrowserHistory from 'history/createBrowserHistory'

import registerServiceWorker from './registerServiceWorker';

import App from './components/App.js';
import Home from './components/views/Home';
import Cadastro from './components/views/Cadastro';
import Login from './components/views/Login';
import EsqueciSenha from './components/views/EsqueciSenha';
import ResetarSenha from './components/views/ResetarSenha';

import reducers from './reducers';
import { AUTENTICAR_USUARIO } from './actions/autenticacao/tipos';

import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

global.jQuery = global.jquery = global.$ = jQuery;
require('bootstrap');

const customHistory = createBrowserHistory();

const jwtValidation = store => next => action => {
  let token = localStorage.getItem('piToken');
  // TODO
  //console.log("action: ", action);
  if (token) {
    //token = jwt_decode(token);
    //console.log(token);
  }
  return next(action);
}

const createStoreWithMiddleware = applyMiddleware(jwtValidation, reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

// Se tivermos um token, considere o usuario como loggado
const token = localStorage.getItem('piToken');

if (token) {
  store.dispatch({
    type: AUTENTICAR_USUARIO
  });
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={customHistory}>
      <App>
        <Route exact={true} path="/" component={Home} />
        <Route path="/cadastro" component={Cadastro} />
        <Route path="/login" component={Login} />
        <Route path="/esqueciSenha" component={EsqueciSenha} />
        <Route path="/resetarSenha/:token" component={ResetarSenha} />
      </App>
    </Router>
  </Provider>
  , document.getElementById('root'));
registerServiceWorker();
