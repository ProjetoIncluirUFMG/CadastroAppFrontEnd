import jQuery from 'jquery';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route } from 'react-router-dom';
import reduxThunk from 'redux-thunk';
import createBrowserHistory from 'history/createBrowserHistory'

import axios from 'axios';
import jwt_decode from 'jwt-decode';
import registerServiceWorker from './registerServiceWorker';

import AutenticacaoRequerida from './components/genericos/AutenticacaoRequerida.js';
import DesautenticacaoRequerida from './components/genericos/DesautenticacaoRequerida.js';
import App from './components/App.js';
import Home from './components/views/Home';
import Cadastro from './components/views/Cadastro';
import Login from './components/views/Login';
import EsqueciSenha from './components/views/EsqueciSenha';
import ResetarSenha from './components/views/ResetarSenha';
import CadastroPreMatricula from './components/views/CadastroPreMatricula';
import ListaPreMatricula from './components/views/ListaPreMatricula';

import reducers from './reducers';
import {
  AUTENTICAR_USUARIO,
  DESAUTENTICAR_USUARIO
} from './actions/autenticacao/tipos';

import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

global.jQuery = global.jquery = global.$ = jQuery;
require('bootstrap');

axios.get(process.env.REACT_APP_API_URL).then(() => {
  inicializarApp();
}).catch((err) => {
  console.log("err: ", err)
  alert("Aplicação indisponível no momento.")
});

function inicializarApp() {

  const customHistory = createBrowserHistory();

  const validacaoJWT = store => next => action => {
    let token = localStorage.getItem('piToken');
    console.log("Token: ", token)
    if (token) {
      let current_time = new Date().getTime() / 1000;
	    if (current_time > jwt_decode(token).exp) {
        return next({ type: DESAUTENTICAR_USUARIO });
      }
    }
    return next(action);
  }

  const createStoreWithMiddleware = applyMiddleware(validacaoJWT, reduxThunk)(createStore);
  const store = createStoreWithMiddleware(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

  // Se tivermos um token, considere o usuario como loggado
  const token = localStorage.getItem('piToken');
  if (token) {
    const usuario = JSON.parse(localStorage.getItem('piUser'));
    store.dispatch({
      type: AUTENTICAR_USUARIO,
      payload: usuario
    });
  }

  ReactDOM.render(
    <Provider store={store}>
      <Router history={customHistory}>
        <App>
          <Route exact={true} path="/" component={Home} />
          <Route path="/cadastro" component={DesautenticacaoRequerida(Cadastro)} />
          <Route path="/login" component={DesautenticacaoRequerida(Login)} />
          <Route path="/esqueciSenha" component={DesautenticacaoRequerida(EsqueciSenha)} />
          <Route path="/resetarSenha/:token" component={DesautenticacaoRequerida(ResetarSenha)} />
          <Route path="/preMatricula/:id_disciplina" component={AutenticacaoRequerida(CadastroPreMatricula)} />
          <Route path="/preMatriculas" component={AutenticacaoRequerida(ListaPreMatricula)} />
        </App>
      </Router>
    </Provider>
    , document.getElementById('root'));
  registerServiceWorker();
}
