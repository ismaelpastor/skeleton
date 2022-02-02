import {
  retrieveUsers,
  createUser,
  retrieveUser,
  modifyUser
} from '../lib/apiService';
import { showAlert } from './alert';
import { validateField } from '../lib/validateForm';
import { redirectLogin } from './login';

export const initState = {
  users: [],
  activePage: 1,
  user: {
    id: '',
    enabled: '',
    firstname: '',
    lastname: '',
    password: '',
    email: {
      value: '',
      status: null,
      messageStatus: ''
    },
    authorities: [],
    phone: '',
    role: ''
  }
};

export const USER_PAGE_UPDATE = 'USER_PAGE_UPDATE';
export const USER_FIELD_UPDATE = 'USER_FIELD_UPDATE';
export const USER_INIT = 'USER_INIT';
export const USERS_LOAD = 'USERS_LOAD';
export const USER_LOAD = 'USER_LOAD';
export const USER_ADD = 'USER_ADD';
export const USER_UPDATE = 'USER_UPDATE';

export const checkStatus = code => code === 401;

export const updateActivePageAction = update => ({
  type: USER_PAGE_UPDATE,
  update
});

export const changeFieldAction = field => ({
  type: USER_FIELD_UPDATE,
  field
});

export const initUserAction = user => ({
  type: USER_INIT,
  user
});

export const loadUsersAction = users => ({
  type: USERS_LOAD,
  users
});

export const loadUserAction = user => ({
  type: USER_LOAD,
  user
});

export const saveUserAction = user => ({
  type: USER_ADD,
  user
});

export const updateUserAction = user => ({
  type: USER_UPDATE,
  user
});

// action creator

export const initUser = user => dispatch => {
  dispatch(initUserAction(user));
};

export const fetchUsers = auth => dispatch => {
  retrieveUsers(auth).then(
    users =>
      checkStatus(users.status)
        ? dispatch(redirectLogin())
        : dispatch(loadUsersAction(users))
  );
};

export const fetchUser = (auth, id) => dispatch => {
  retrieveUser(auth, id).then(
    user =>
      checkStatus(user.status)
        ? dispatch(redirectLogin())
        : dispatch(loadUserAction(user))
  );
};

export const changeActivePage = update => dispatch => {
  dispatch(updateActivePageAction(update));
};

export const changeField = (name, value) => dispatch => {
  dispatch(changeFieldAction(validateField(name, value)));
};

export const saveUser = (user, auth) => dispatch => {
  createUser(user, auth).then(add => {
    if (checkStatus(add.status)) {
      dispatch(redirectLogin());
    } else if (add != null) dispatch(saveUserAction(add));
  });
};

export const updateUser = (user, auth, messageOk, messageKo) => dispatch => {
  modifyUser(user, auth).then(res => {
    if (checkStatus(res.status)) {
      dispatch(redirectLogin());
    } else if (res === true) {
      dispatch(
        showAlert({
          style: 'success',
          message: messageOk,
          alertVisible: true
        })
      );
      dispatch(updateUserAction(user));
    } else {
      dispatch(
        showAlert({
          style: 'danger',
          message: messageKo,
          alertVisible: true
        })
      );
    }
  });
};

// reducer actions
export default (state = initState, action) => {
  switch (action.type) {
    case USER_PAGE_UPDATE:
      return { ...state, ...action.update };
    case USER_FIELD_UPDATE:
      return { ...state, user: { ...state.user, ...action.field } };
    case USER_INIT:
      return { ...state, user: action.user };
    case USERS_LOAD:
      return { ...state, users: action.users };
    case USER_LOAD:
      return { ...state, user: action.user };
    case USER_ADD:
      return {
        ...state,
        users: state.users.concat(action.user),
        user: action.user
      };
    case USER_UPDATE:
      return {
        ...state,
        users: state.users.map(
          user => (user.id === action.user.id ? action.user : user)
        ),
        user: { ...state.user }
      };
    default:
      return state;
  }
};
