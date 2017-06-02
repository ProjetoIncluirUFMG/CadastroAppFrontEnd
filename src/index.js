import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter as Router, Route, withRouter } from 'react-router-dom';
import reduxThunk from 'redux-thunk';

import App from './components/app';
import Home from './components/home';
import Cadastro from './components/autenticacao/cadastro';
import Login from './components/autenticacao/login';

import reducers from './reducers';
import { AUTENTICAR_USUARIO } from './actions/autenticacao/tipos';

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
    <Router>
      <App>
        <Route exact={true} path="/" component={Home} />
        <Route path="/cadastro" component={Cadastro} />
        <Route path="/login" component={Login} />
      </App>
    </Router>
  </Provider>
  , document.querySelector('.container'));
