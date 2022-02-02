// @flow
// use flow to check good practices on your code :)
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import { connect } from 'react-redux';
import TopBar from './components/topbar/TopBar';
import Menu from './components/menu/Menu';
import { Lockers, LockerDetail } from './components/locker/';
import { Users, UserDetail } from './components/user/';
import { Masterkeys, MasterkeyDetail } from './components/masterkey/';
import Profile from './components/profile/Profile';
import { Login, ForgotPassword } from './components/login/';
import AlertDism from './components/common/Alert';

export const showMenu = (authorities, rol) =>
  authorities === undefined
    ? false
    : authorities.length > 0 && authorities[0].authority === rol;

const App = props => (
  <div id="main" className={props.app.menuToggleClass}>
    {window.location.pathname.indexOf('activate') === -1 && (
      <Router>
        {props.login.tokenOk &&
        'session' in props.login &&
        props.login.session !== '' ? (
          <div>
            <Menu />
            <section id="content">
              <TopBar />
              <section className="inner-content">
                <AlertDism />
                <Switch>
                  <Route path="/profile" component={Profile} />
                </Switch>
                {showMenu(props.login.profile.authorities, 'ROLE_OWNER') && (
                  <Switch>
                    <Route path="/lockers" component={Lockers} />
                    <Route path="/locker/:id" component={LockerDetail} />
                    <Route path="/masterkeys" component={Masterkeys} />
                    <Route path="/masterkey/:id" component={MasterkeyDetail} />
                    <Redirect from="/" to="/lockers" />
                  </Switch>
                )}

                {showMenu(props.login.profile.authorities, 'ROLE_ADMIN') && (
                  <Switch>
                    <Route path="/users" component={Users} />
                    <Route path="/user/:id" component={UserDetail} />
                    <Redirect from="/" to="/users" />
                  </Switch>
                )}
              </section>
            </section>
          </div>
        ) : (
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/forgotPassword" component={ForgotPassword} />
            <Redirect from="/" to="/login" />
          </Switch>
        )}
      </Router>
    )}
  </div>
);

export default connect(state => ({ app: state.app, login: state.login }))(App);
