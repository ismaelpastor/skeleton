import React from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import LockerMultipleIcon from 'mdi-react/LockerMultipleIcon';
// import LogoutIcon from 'mdi-react/LogoutIcon';
import AccountMultipleIcon from 'mdi-react/AccountMultipleIcon';
import KeyVariantIcon from 'mdi-react/KeyVariantIcon';
import LogoutIcon from 'mdi-react/LogoutIcon';
import { connect } from 'react-redux';
import { logoutUser } from '../../reducers/login';

import footerLogo from '../../../images/footer-logo.png';

const Menu = props => (
  <nav id="slide-menu">
    <div>
      <div className="title">PROYECTO</div>
    </div>
    <div>
      <ul>
        {props.profile.authorities !== undefined &&
          props.profile.authorities.length > 0 &&
          props.profile.authorities[0].authority === 'ROLE_OWNER' && (
            <li>
              <LockerMultipleIcon className="icons" />
              <Link to="/">
                <FormattedMessage id="menu.lockers" />
              </Link>
            </li>
          )}
        {props.profile.authorities !== undefined &&
          props.profile.authorities.length > 0 &&
          props.profile.authorities[0].authority === 'ROLE_ADMIN' && (
            <li>
              <AccountMultipleIcon className="icons" />
              <Link to="/users">
                <FormattedMessage id="menu.users" />
              </Link>
            </li>
          )}
        {props.profile.authorities !== undefined &&
          props.profile.authorities.length > 0 &&
          props.profile.authorities[0].authority === 'ROLE_OWNER' && (
            <li>
              <KeyVariantIcon className="icons" />
              <Link to="/masterkeys">
                <FormattedMessage id="menu.masterkeys" />
              </Link>
            </li>
          )}
      </ul>
    </div>

    <div className="footer-logo">
      <ul>
        <li onClick={props.logoutUser}>
          <LogoutIcon className="icons" />
          <Link to="/login">
            <FormattedMessage id="menu.logout" />
          </Link>
        </li>
      </ul>
      <img src={footerLogo} alt="footer logo" />
    </div>
  </nav>
);

export default connect(state => state.login, { logoutUser })(Menu);
