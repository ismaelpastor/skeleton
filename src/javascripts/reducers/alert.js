export const initState = {
  style: '',
  message: '',
  alertVisible: false
};

const SHOW_ALERT = 'SHOW_ALERT';
const HIDE_ALERT = 'HIDE_ALERT';

export const showAlertAction = alert => ({
  type: SHOW_ALERT,
  alert
});

export const hideAlertAction = () => ({
  type: HIDE_ALERT
});

// action creator
export const showAlert = alert => dispatch => {
  dispatch(showAlertAction({ alert }));
};

export const hideAlert = () => dispatch => {
  dispatch(hideAlertAction());
};

// reducer actions
export default (state = initState, action) => {
  switch (action.type) {
    case SHOW_ALERT:
      return { ...state, ...action.alert.alert, alertVisible: true };
    case HIDE_ALERT:
      return { ...state, style: '', message: '', alertVisible: false };
    default:
      return state;
  }
};
