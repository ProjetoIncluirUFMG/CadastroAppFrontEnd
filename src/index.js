import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter as Router, Route, withRouter } from 'react-router-dom';
import reduxThunk from 'redux-thunk';

import App from './components/app';
import Welcome from './components/welcome';
import Signin from './components/auth/signin';
import Signout from './components/auth/signout';
import Signup from './components/auth/signup';
import Feature from './components/feature';

import RequireAuth from './components/auth/require_auth';

import reducers from './reducers';
import { AUTH_USER } from './actions/types';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

// If we have a token, consider the user to be signed in
const token = localStorage.getItem('token');

if (token) {
  // we need to update the application state
  store.dispatch({type: AUTH_USER});
}

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App>
        <Route exact={true} path="/" component={Welcome} />
        <Route path="/signin" render={({history}) => (
          <Signin history={history}/>
        )} />
        <Route path="/signout" component={Signout} />
        <Route path="/signup" component={Signup} />
        <Route path="/feature_auth" component={RequireAuth(Feature)} />
        <Route path="/feature" component={Feature} />
      </App>
    </Router>
  </Provider>
  , document.querySelector('.container'));
