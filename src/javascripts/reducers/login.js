import { auth, forgot, profile } from '../lib/apiService';
import { validateField } from '../lib/validateForm';

export const initState = {
  email: {
    value: '',
    status: null,
    messageStatus: ''
  },
  password: '',
  session: '',
  refresh: '',
  error: '',
  statusText: '',
  profile: {
    id: '',
    username: '',
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    authorities: [],
    enabled: ''
  },
  tokenOk: true
};

export const USER_LOGIN = 'USER_LOGIN';
export const USER_LOGOUT = 'USER_LOGOUT';
export const LOGIN_UPDATE = 'LOGIN_UPDATE';
export const LOGIN_INIT = 'LOGIN_INIT';
export const FORGOT_INIT = 'FORGOT_UPDATE';
export const USER_RESET = 'USER_RESET';
export const LOAD_PROFILE = 'LOAD_PROFILE';
export const LOGIN_REDIRECT = 'LOGIN_REDIRECT';

export const loginUserAction = login => ({
  type: USER_LOGIN,
  login
});

export const resetUserAction = reset => ({
  type: USER_RESET,
  reset
});

export const logoutUserAction = () => ({
  type: USER_LOGOUT
});

export const loginInitAction = () => ({
  type: LOGIN_INIT
});

export const redirectLoginAction = () => ({
  type: LOGIN_REDIRECT
});

export const forgotInitAction = () => ({
  type: FORGOT_INIT
});

export const changeFieldAction = field => ({
  type: LOGIN_UPDATE,
  field
});

export const loadProfileAction = user => ({
  type: LOAD_PROFILE,
  user
});

// action creator
export const changeField = (name, value) => dispatch => {
  dispatch(changeFieldAction(validateField(name, value)));
};

export const resetPassword = email => dispatch => {
  forgot(email).then(result => {
    dispatch(resetUserAction(result));
  });
};

export const loginUser = (email, password) => dispatch => {
  auth(email, password).then(result => {
    window.localStorage.setItem('session', JSON.stringify(result));
    dispatch(loginUserAction(result));
    profile(result.session).then(user => {
      dispatch(loadProfileAction(user));
    });
  });
};

export const logoutUser = () => dispatch => {
  dispatch(logoutUserAction());
};

export const initLogin = () => dispatch => {
  dispatch(loginInitAction());
};

export const redirectLogin = () => dispatch => {
  console.log('RedirectLogin');
  dispatch(redirectLoginAction());
  dispatch(logoutUserAction());
};

export const initForgot = () => dispatch => {
  dispatch(forgotInitAction());
};

// reducer actions
export default (state = initState, action) => {
  switch (action.type) {
    case USER_LOGIN:
      return { ...state, ...action.login };
    case LOGIN_REDIRECT:
      return { ...state, tokenOk: false };
    case USER_RESET:
      return { ...state, statusText: action.reset.statusText };
    case LOGIN_INIT:
      return {
        ...state,
        error: '',
        email: {
          value: '',
          status: null,
          messageStatus: ''
        },
        password: ''
      };
    case FORGOT_INIT:
      return {
        ...state,
        statusText: '',
        email: {
          value: '',
          status: null,
          messageStatus: ''
        },
        password: ''
      };
    case USER_LOGOUT:
      return {
        ...state,
        email: {
          value: '',
          status: null,
          messageStatus: ''
        },
        password: '',
        session: '',
        refresh: '',
        error: '',
        profile: {
          id: '',
          username: '',
          firstname: '',
          lastname: '',
          email: '',
          phone: '',
          authorities: [],
          enabled: ''
        }
      };
    case LOGIN_UPDATE:
      return { ...state, ...action.field };
    case LOAD_PROFILE:
      return { ...state, profile: action.user, tokenOk: true };
    default:
      return state;
  }
};
