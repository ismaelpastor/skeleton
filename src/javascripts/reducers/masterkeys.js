import {
  retrieveMasterkeys,
  createMasterkey,
  retrieveMasterkey,
  retrieveDevicesMasterkey,
  modifyMasterkey,
  assignDeviceMasterkeyApi,
  unAssignDeviceMasterkeyApi,
  revokeMasterkeyApi,
  removeMasterkey
} from '../lib/apiService';
import { showAlert } from './alert';
import { redirectLogin } from './login';

export const initState = {
  masterkeys: [],
  activePage: 1,
  masterkey: {
    id: '',
    name: '',
    notBefore: '',
    notAfter: '',
    lockers: [],
    masterkey: '',
    keys: ''
  },
  locker: {
    id: '',
    deviceId: ''
  },
  disabled: false,
  assigned: false
};

export const MASTERKEY_PAGE_UPDATE = 'MASTERKEY_PAGE_UPDATE';
export const MASTERKEY_FIELD_UPDATE = 'MASTERKEY_FIELD_UPDATE';
export const MASTERKEY_INIT = 'MASTERKEY_INIT';
export const MASTERKEYS_LOAD = 'MASTERKEYS_LOAD';
export const MASTERKEY_LOAD = 'MASTERKEY_LOAD';
export const MASTERKEY_ADD = 'MASTERKEY_ADD';
export const MASTERKEY_UPDATE = 'MASTERKEY_UPDATE';
export const MASTERKEY_SELECT_RANGE = 'MASTERKEY_SELECT_RANGE';
export const MASTERKEY_REVOKE = 'MASTERKEY_REVOKE';
export const MASTERKEY_DELETE = 'MASTERKEY_DELETE';
export const LOCKER_MASTERKEY_INIT = 'LOCKER_MASTERKEY_INIT';
export const LOCKERS_MASTERKEY_LOAD = 'LOCKERS_MASTERKEY_LOAD';
export const LOCKER_MASTERKEY_ASSIGN = 'LOCKER_MASTERKEY_ASSIGN';

export const checkStatus = code => code === 401;

export const updateActivePageAction = update => ({
  type: MASTERKEY_PAGE_UPDATE,
  update
});

export const changeFieldAction = field => ({
  type: MASTERKEY_FIELD_UPDATE,
  field
});

export const initMasterkeyAction = masterkey => ({
  type: MASTERKEY_INIT,
  masterkey
});

export const loadMasterkeysAction = masterkeys => ({
  type: MASTERKEYS_LOAD,
  masterkeys
});

export const loadMasterkeyAction = masterkey => ({
  type: MASTERKEY_LOAD,
  masterkey
});

export const saveMasterkeyAction = masterkey => ({
  type: MASTERKEY_ADD,
  masterkey
});

export const updateMasterkeyAction = masterkey => ({
  type: MASTERKEY_UPDATE,
  masterkey
});

export const revokeMasterkeyAction = (masterkey, result) => ({
  type: MASTERKEY_REVOKE,
  masterkey,
  result
});

export const deleteMasterkeyAction = () => ({
  type: MASTERKEY_DELETE
});

export const selectRangeAction = interval => ({
  type: MASTERKEY_SELECT_RANGE,
  interval
});

export const initLockerAction = locker => ({
  type: LOCKER_MASTERKEY_INIT,
  locker
});

export const retrieveDevicesMasterkeyAction = lockers => ({
  type: LOCKERS_MASTERKEY_LOAD,
  lockers
});

export const assignLockerAction = () => ({
  type: LOCKER_MASTERKEY_ASSIGN
});

// action creator

export const initLocker = locker => dispatch => {
  dispatch(initLockerAction(locker));
};

export const initMasterkey = masterkey => dispatch => {
  dispatch(initMasterkeyAction(masterkey));
};

export const fetchMasterkeys = auth => dispatch => {
  retrieveMasterkeys(auth).then(masterkeys => {
    checkStatus(masterkeys.status)
      ? dispatch(redirectLogin())
      : dispatch(loadMasterkeysAction(masterkeys));
  });
};

export const fetchMasterkey = (auth, id) => dispatch => {
  retrieveMasterkey(auth, id).then(masterkey => {
    if (checkStatus(masterkey.status)) {
      dispatch(redirectLogin());
    } else {
      dispatch(loadMasterkeyAction(masterkey));
      retrieveDevicesMasterkey(auth, id).then(keys =>
        dispatch(retrieveDevicesMasterkeyAction(keys))
      );
    }
  });
};

export const changeActivePage = update => dispatch => {
  dispatch(updateActivePageAction(update));
};

export const changeField = field => dispatch => {
  dispatch(changeFieldAction(field));
};

export const saveMasterkey = (masterkey, auth) => dispatch => {
  createMasterkey(masterkey, auth).then(add => {
    if (checkStatus(add.status)) {
      dispatch(redirectLogin());
    } else if (add != null) dispatch(saveMasterkeyAction(add));
  });
};

export const updateMasterkey = (
  masterkey,
  auth,
  messageOk,
  messageKo
) => dispatch => {
  modifyMasterkey(masterkey, auth).then(result => {
    if (checkStatus(result.status)) {
      dispatch(redirectLogin());
    } else if (result === true) {
      dispatch(
        showAlert({
          style: 'success',
          message: messageOk,
          alertVisible: true
        })
      );
      dispatch(updateMasterkeyAction(masterkey));
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

export const revokeMasterkey = (
  masterkey,
  auth,
  messageOk,
  messageKo
) => dispatch => {
  revokeMasterkeyApi(masterkey, auth).then(result => {
    if (checkStatus(result.status)) {
      dispatch(redirectLogin());
    } else if ('keys' in result) {
      dispatch(
        showAlert({
          style: 'success',
          message: messageOk,
          alertVisible: true
        })
      );
      dispatch(revokeMasterkeyAction(masterkey, result.keys));
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

export const deleteMasterkey = (
  masterkey,
  auth,
  messageOk,
  messageKo
) => dispatch => {
  removeMasterkey(masterkey, auth).then(result => {
    if (checkStatus(result.status)) {
      dispatch(redirectLogin());
    } else if (result.ok === true) {
      dispatch(
        showAlert({
          style: 'success',
          message: messageOk,
          alertVisible: true
        })
      );
      dispatch(deleteMasterkeyAction());
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
    notBefore: range.start.valueOf(),
    notAfter: range.end.valueOf()
  };
  dispatch(selectRangeAction(interval));
};

export const assignDevice = (masterkey, locker, auth) => dispatch =>
  assignDeviceMasterkeyApi(masterkey, locker, auth).then(result => {
    if (checkStatus(result.status)) {
      dispatch(redirectLogin());
    } else if (result.ok === true) {
      dispatch(assignLockerAction());
      retrieveDevicesMasterkey(auth, masterkey).then(keys =>
        dispatch(retrieveDevicesMasterkeyAction(keys))
      );
    }
  });

export const unAssignDevice = (
  masterkey,
  locker,
  auth,
  messageOk,
  messageKo
) => dispatch => {
  unAssignDeviceMasterkeyApi(masterkey, locker, auth).then(result => {
    if (checkStatus(result.status)) {
      dispatch(redirectLogin());
    } else if (result.ok === true) {
      dispatch(
        showAlert({
          style: 'success',
          message: messageOk,
          alertVisible: true
        })
      );
      retrieveDevicesMasterkey(auth, masterkey).then(keys =>
        dispatch(retrieveDevicesMasterkeyAction(keys))
      );
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
    case MASTERKEY_PAGE_UPDATE:
      return { ...state, ...action.update };
    case MASTERKEY_FIELD_UPDATE:
      return 'locker' in action.field
        ? { ...state, locker: { ...state.locker, ...action.field.locker } }
        : {
            ...state,
            masterkey: { ...state.masterkey, ...action.field.masterkey }
          };
    case MASTERKEY_INIT:
      return { ...state, masterkey: action.masterkey };
    case MASTERKEYS_LOAD:
      return { ...state, masterkeys: action.masterkeys, disabled: false };
    case MASTERKEY_LOAD:
      return { ...state, masterkey: action.masterkey };
    case MASTERKEY_ADD:
      return {
        ...state,
        masterkeys: state.masterkeys.concat(action.masterkey),
        masterkey: action.masterkey
      };
    case MASTERKEY_UPDATE:
      return {
        ...state,
        masterkeys: state.masterkeys.map(
          masterkey =>
            masterkey.id === action.masterkey.id ? action.masterkey : masterkey
        ),
        masterkey: { ...state.masterkey }
      };
    case MASTERKEY_SELECT_RANGE:
      return {
        ...state,
        masterkey: { ...state.masterkey, ...action.interval }
      };
    case MASTERKEY_REVOKE:
      return {
        ...state,
        masterkey: { ...state.masterkey, keys: action.result }
      };
    case MASTERKEY_DELETE:
      return { ...state, disabled: true };
    case LOCKER_MASTERKEY_INIT:
      return { ...state, locker: action.locker, assignDevice: false };
    case LOCKER_MASTERKEY_ASSIGN:
      return { ...state, locker: action.locker, assignDevice: true };
    case LOCKERS_MASTERKEY_LOAD:
      return {
        ...state,
        masterkey: { ...state.masterkey, lockers: action.lockers }
      };
    default:
      return state;
  }
};
