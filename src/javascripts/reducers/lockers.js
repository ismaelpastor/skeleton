import {
  retrieveLockers,
  createLocker,
  retrieveLocker,
  modifyLocker,
  createKey,
  retrieveUsers,
  removeKey,
  revokeKeyApi,
  retrieveKeys
} from '../lib/apiService';
import { showAlert } from './alert';
import { redirectLogin } from './login';

export const initState = {
  lockers: [],
  activePage: 1,
  locker: {
    deviceId: '',
    brief_desc: '',
    description: '',
    id: '',
    keys: [],
    status: ''
  },
  key: {
    email: '',
    from: '',
    to: '',
    keys: '',
    status: ''
  },
  users: []
};

export const LOCKER_PAGE_UPDATE = 'LOCKER_PAGE_UPDATE';
export const LOCKER_UPDATE_LOCKER = 'LOCKER_UPDATE_LOCKER';
export const LOCKER_INIT = 'LOCKER_INIT';
export const LOCKERS_LOAD = 'LOCKERS_LOAD';
export const LOCKER_LOAD = 'LOCKER_LOAD';
export const LOCKER_UPDATE = 'LOCKER_UPDATE';
export const LOCKER_STATUS = 'LOCKER_STATUS';
export const KEYS_LOAD = 'KEYS_LOAD';
export const KEY_INIT = 'KEY_INIT';
export const KEY_SELECT_RANGE = 'KEY_SELECT_RANGE';
export const KEY_REVOKE = 'KEY_REVOKE';
export const KEY_DELETE = 'KEY_DELETE';
export const USERS_LOAD = 'USERS_LOAD';
export const KEY_STATUS = 'KEY_STATUS';

export const checkStatus = code => code === 401;

export const updateActivePageAction = update => ({
  type: LOCKER_PAGE_UPDATE,
  update
});

export const changeFieldAction = field => ({
  type: LOCKER_UPDATE_LOCKER,
  field
});

export const initLockerAction = () => ({
  type: LOCKER_INIT
});

export const initKeyAction = () => ({
  type: KEY_INIT
});

export const loadLockersAction = lockers => ({
  type: LOCKERS_LOAD,
  lockers
});

export const loadUsersAction = users => ({
  type: USERS_LOAD,
  users
});

export const loadLockerAction = locker => ({
  type: LOCKER_LOAD,
  locker
});

export const statusLockerAction = status => ({
  type: LOCKER_STATUS,
  status
});

export const statusKeyAction = status => ({
  type: KEY_STATUS,
  status
});

export const updateLockerAction = locker => ({
  type: LOCKER_UPDATE,
  locker
});

export const selectRangeAction = interval => ({
  type: KEY_SELECT_RANGE,
  interval
});

export const loadKeysAction = keys => ({
  type: KEYS_LOAD,
  keys
});

export const deleteKeyAction = (key, res) => ({
  type: KEY_DELETE,
  key,
  res
});

export const revokeKeyAction = (key, res) => ({
  type: KEY_REVOKE,
  key,
  res
});

// action creator

export const initLocker = () => dispatch => {
  dispatch(initLockerAction());
};

export const initKey = () => dispatch => {
  dispatch(initKeyAction());
};

export const fetchLockers = auth => dispatch => {
  retrieveLockers(auth).then(lockers => {
    checkStatus(lockers.status)
      ? dispatch(redirectLogin())
      : dispatch(loadLockersAction(lockers));
  });
};

export const fetchUsers = auth => dispatch => {
  retrieveUsers(auth).then(users => {
    checkStatus(users.status)
      ? dispatch(redirectLogin())
      : dispatch(loadUsersAction(users));
  });
};

export const fetchLocker = (auth, id) => dispatch => {
  retrieveLocker(auth, id).then(locker => {
    if (checkStatus(locker.status)) {
      dispatch(redirectLogin());
    } else {
      dispatch(loadLockerAction(locker));
      retrieveKeys(auth, id).then(keys => dispatch(loadKeysAction(keys)));
    }
  });
};

export const changeActivePage = update => dispatch => {
  dispatch(updateActivePageAction(update));
};

export const changeField = field => dispatch => {
  dispatch(changeFieldAction(field));
};

export const saveLocker = (locker, auth) => dispatch => {
  createLocker(locker, auth).then(add => {
    switch (add.status) {
      case 401:
        return dispatch(redirectLogin());
      case 409:
        return dispatch(statusLockerAction(add.status));
      case 201:
        dispatch(fetchLockers(auth));
        return dispatch(statusLockerAction(add.status));
      default:
        return dispatch(initLockerAction());
    }
  });
};

export const saveKey = (key, auth) => dispatch => {
  createKey(key, auth).then(add => {
    switch (add.status) {
      case 401:
        return dispatch(redirectLogin());
      case 404:
        return dispatch(statusKeyAction(add.status));
      case 201:
        dispatch(fetchLocker(auth, key.deviceId));
        return dispatch(statusKeyAction(add.status));
      default:
        return dispatch(initKeyAction());
    }
  });
};

export const deleteKey = (key, auth, messageOk, messageKo) => dispatch => {
  removeKey(key, auth).then(res => {
    if (checkStatus(res.status)) {
      dispatch(redirectLogin());
    } else if (res.ok === true) {
      dispatch(
        showAlert({
          style: 'success',
          message: messageOk,
          alertVisible: true
        })
      );
      dispatch(deleteKeyAction(key, res));
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

export const revokeKey = (key, auth, messageOk, messageKo) => dispatch => {
  revokeKeyApi(key, auth).then(res => {
    if (checkStatus(res.status)) {
      dispatch(redirectLogin());
    } else if ('keys' in res) {
      dispatch(
        showAlert({
          style: 'success',
          message: messageOk,
          alertVisible: true
        })
      );
      dispatch(revokeKeyAction(key, res.keys));
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

export const updateLocker = (
  locker,
  auth,
  messageOk,
  messageKo
) => dispatch => {
  modifyLocker(locker, auth).then(res => {
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
      dispatch(updateLockerAction(locker));
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

export const selectRange = range => dispatch => {
  const interval = {
    from: range.start.valueOf(),
    to: range.end.valueOf()
  };
  dispatch(selectRangeAction(interval));
};

// reducer actions
export default (state = initState, action) => {
  switch (action.type) {
    case LOCKER_PAGE_UPDATE:
      return { ...state, ...action.update };
    case LOCKER_UPDATE_LOCKER:
      return 'locker' in action.field
        ? { ...state, locker: { ...state.locker, ...action.field.locker } }
        : { ...state, key: { ...state.key, ...action.field.key } };
    case LOCKER_INIT:
      return {
        ...state,
        locker: {
          deviceId: '',
          brief_desc: '',
          description: '',
          id: '',
          keys: [],
          status: ''
        }
      };
    case LOCKERS_LOAD:
      return { ...state, lockers: action.lockers };
    case USERS_LOAD:
      return { ...state, users: action.users };
    case LOCKER_LOAD:
      return { ...state, locker: action.locker };
    case LOCKER_UPDATE:
      return {
        ...state,
        lockers: state.lockers.map(
          item => (item.deviceId === action.locker.id ? action.locker : item)
        ),
        locker: { ...state.locker }
      };
    case LOCKER_STATUS:
      return {
        ...state,
        locker: {
          deviceId: '',
          brief_desc: '',
          description: '',
          id: '',
          keys: [],
          status: action.status
        }
      };
    case KEYS_LOAD:
      return {
        ...state,
        locker: {
          ...state.locker,
          keys: Array.isArray(action.keys) ? action.keys : []
        }
      };
    case KEY_REVOKE:
      return {
        ...state,
        locker: {
          ...state.locker,
          keys: state.locker.keys.map(
            item =>
              item.id === action.key.id ? { ...item, keys: action.res } : item
          )
        }
      };
    case KEY_DELETE:
      return {
        ...state,
        locker: {
          ...state.locker,
          keys: state.locker.keys.filter(key => key.id !== action.key.id)
        }
      };
    case KEY_INIT:
      return {
        ...state,
        key: {
          email: '',
          from: '',
          to: '',
          keys: '',
          status: ''
        }
      };
    case KEY_SELECT_RANGE:
      return { ...state, key: { ...state.key, ...action.interval } };
    case KEY_STATUS:
      return {
        ...state,
        key: {
          email: '',
          from: '',
          to: '',
          keys: '',
          status: action.status
        }
      };
    default:
      return state;
  }
};
