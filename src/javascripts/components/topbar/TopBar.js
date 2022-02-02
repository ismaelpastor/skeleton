import React from 'react';
import { connect } from 'react-redux';

import MenuIcon from 'mdi-react/MenuIcon';
import LogoutIcon from 'mdi-react/LogoutIcon';
import { Link } from 'react-router-dom';
import { toggleMenu } from '../../reducers/app';
import { logoutUser } from '../../reducers/login';

const TopBar = props => (
  <div className="top-bar">
    <div className="burger" onClick={props.toggleMenu}>
      <MenuIcon />
    </div>
    <div>
      <p className="option">{props.app.option}</p>
    </div>
    <div className="notification" onClick={props.logoutUser}>
      <Link to="/login">
        <LogoutIcon />
      </Link>
    </div>
  </div>
);

export default connect(state => ({ login: state.login, app: state.app }), {
  toggleMenu,
  logoutUser
})(TopBar);
