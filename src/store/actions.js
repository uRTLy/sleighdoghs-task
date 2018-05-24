import * as authActions from './authReducer';
import * as videoActions from './videoReducer';

export const actions = {
  ...authActions,
  ...videoActions,
};
