export const initState = {
  menuToggleClass: '',
  option: 'Lockers'
};

const TOGGLE_MENU = 'TOGGLE_MENU';
const OPTION_MENU = 'OPTION_MENU';

export const toggleMenuAction = toggle => ({
  type: TOGGLE_MENU,
  toggle
});

export const optionMenuAction = option => ({
  type: OPTION_MENU,
  option
});

// action creator
export const toggleMenu = () => (dispatch, getState) => {
  const menuToggleClass =
    getState().app.menuToggleClass === '' ? 'menu-active' : '';
  dispatch(toggleMenuAction({ menuToggleClass }));
};

export const optionMenu = option => dispatch => {
  dispatch(optionMenuAction(option));
};

// reducer actions
export default (state = initState, action) => {
  switch (action.type) {
    case TOGGLE_MENU:
      return { ...state, ...action.toggle };
    case OPTION_MENU:
      return { ...state, option: action.option };
    default:
      return state;
  }
};
