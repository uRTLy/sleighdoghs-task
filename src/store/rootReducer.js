import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import { reducer as reduxFormReducer } from 'redux-form';

import authReducer from './authReducer';
import videoReducer from './videoReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  form: reduxFormReducer,
  videos: videoReducer,
  router: routerReducer,
});

export default rootReducer;
