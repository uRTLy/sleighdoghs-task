import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

import createHistory from 'history/createBrowserHistory';

import rootReducer from './rootReducer';

export const history = createHistory();

const middlewares = [
  // createLogger(),
  routerMiddleware(history),
  thunk,
];

const store = createStore(rootReducer, applyMiddleware(...middlewares));

export default store;
export { actions } from './actions';
