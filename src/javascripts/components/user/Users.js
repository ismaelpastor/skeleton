import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-bootstrap';
import { injectIntl } from 'react-intl';
import { fetchUsers } from '../../reducers/users';
import { optionMenu } from '../../reducers/app';
import UserTable from './UserTable';

class Users extends Component {
  componentDidMount() {
    const optionUsers = this.props.intl.formatMessage({ id: 'menu.users' });
    this.props.optionMenu(optionUsers);

    this.props.fetchUsers(
      JSON.parse(window.localStorage.getItem('session')).session
    );
  }

  render() {
    return (
      <Grid>
        <Row>
          <Col md={10} mdOffset={1}>
            <UserTable
              users={this.props.users}
              activePage={this.props.activePage}
            />
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default connect(state => ({ users: state.users, app: state.app }), {
  fetchUsers,
  optionMenu
})(injectIntl(Users));
