import jQuery from 'jquery'
global.jQuery = jQuery
global.jquery = jQuery // jquery lowercase  was the solution
global.$ = jQuery
let Bootstrap = require('bootstrap')

import '!style-loader!css-loader!bootstrap/dist/css/bootstrap.min.css';
import '!style-loader!css-loader!react-datepicker/dist/react-datepicker.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, withRouter } from 'react-router-dom';
import reduxThunk from 'redux-thunk';
import createBrowserHistory from 'history/createBrowserHistory'
import jwt_decode from 'jwt-decode';

import App from './components/app';
import AutenticacaoRequerida from './components/genericos/autenticacao_requerida';
import Home from './components/views/home';
import Cadastro from './components/views/autenticacao/cadastro';
import Login from './components/views/autenticacao/login';
import EsqueciSenha from './components/views/autenticacao/esqueci_senha';
import ResetarSenha from './components/views/autenticacao/resetar_senha';

import reducers from './reducers';
import { AUTENTICAR_USUARIO } from './actions/autenticacao/tipos';

const customHistory = createBrowserHistory();

const jwtValidation = store => next => action => {
  let token = localStorage.getItem('piToken');
  // TODO
  //console.log("action: ", action);
  if (token) {
    token = jwt_decode(token);
    console.log(token);
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
  , document.querySelector('.container'));
