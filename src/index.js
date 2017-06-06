import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter as Router, Route, withRouter } from 'react-router-dom';
import reduxThunk from 'redux-thunk';
import createBrowserHistory from 'history/createBrowserHistory'

import App from './components/app';
import AutenticacaoRequerida from './components/genericos/autenticacao_requerida';
import Home from './components/views/home';
import Cadastro from './components/views/autenticacao/cadastro';
import Login from './components/views/autenticacao/login';

import reducers from './reducers';
import { AUTENTICAR_USUARIO } from './actions/autenticacao/tipos';

const customHistory = createBrowserHistory();

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

// Se tivermos um token, considere o usuario como loggado
const token = localStorage.getItem('token');

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
      </App>
    </Router>
  </Provider>
  , document.querySelector('.container'));
