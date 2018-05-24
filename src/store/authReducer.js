import { api } from '../utils';

import { getRatings } from './videoReducer';

const AUTHORIZE_ON_STARTUP = 'auth/authorizeOnStartup';

const LOGIN = 'auth/login';
const LOGIN_SUCCESS = 'auth/loginSuccess';
const LOGIN_FAILED = 'auth/loginFailed';

const LOGOUT = 'auth/logout';
const LOGOUT_FAILED = 'auth/logoutFailed';

const SAVE_USER = 'auth/saveUser';

const initialState = {
  isAuthenticated: false,
  loading: false,
  errors: [],
  user: {},
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case AUTHORIZE_ON_STARTUP:
    case LOGIN:
      return {
        ...state,
        loading: true,
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
      };
    case LOGIN_FAILED:
      return {
        ...state,
        loading: false,
      };

    case SAVE_USER:
      return {
        ...state,
        user: action.user,
      };

    case LOGOUT:
      return initialState;

    default:
      return state;
  }
}

export function authorizeOnStartup() {
  return dispatch => {
    if (api.isAuthenticated()) {
      dispatch({ type: AUTHORIZE_ON_STARTUP });
      dispatch(saveUser());
      dispatch({ type: LOGIN_SUCCESS });
    }
  };
}

export function login() {
  return async (dispatch, getState) => {
    dispatch({ type: LOGIN });

    try {
      await api.login();
      dispatch(saveUser());
      dispatch({ type: LOGIN_SUCCESS });

      // GET RATINGS FOR VIDEOS AFTER AUTHORIZATION
      dispatch(getRatings(getState().videos.videos));
    } catch (e) {
      dispatch({ type: LOGIN_FAILED, error: e });
    }
  };
}

export function logout() {
  return dispatch => {
    api
      .logout()
      .then(() => dispatch({ type: LOGOUT }))
      .catch(() => dispatch({ type: LOGOUT_FAILED }));
  };
}

export function saveUser() {
  return { type: SAVE_USER, user: api.getUser() };
}
