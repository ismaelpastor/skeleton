import React, { Component } from 'react';
import {
  Radio,
  FormControl,
  FormGroup,
  Button,
  ButtonToolbar,
  ControlLabel,
  HelpBlock,
  Grid,
  Image,
  Row,
  Col
} from 'react-bootstrap';
import { connect } from 'react-redux';
// library for internalisation purposesControlLabel
import { injectIntl, FormattedMessage } from 'react-intl';

import user from '../../../images/user.svg';
import { fetchUser, changeField, updateUser } from '../../reducers/users';

class UserDetail extends Component {
  componentDidMount() {
    this.props.fetchUser(
      JSON.parse(window.localStorage.getItem('session')).session,
      this.props.match.params.id
    );
  }

  handleInputChange = evt => {
    const name = evt.target.name;
    const value = evt.target.value;
    this.props.changeField(name, value);
  };

  handleUpdate = evt => {
    evt.preventDefault();
    const user = {
      id: this.props.users.user.id,
      firstname: this.props.users.user.firstname,
      lastname: this.props.users.user.lastname,
      email:
        this.props.users.user.email.value !== undefined
          ? this.props.users.user.email.value
          : this.props.users.user.email,
      enabled: this.props.users.user.enabled,
      phone: this.props.users.user.phone,
      password: this.props.users.user.password,
      role:
        this.props.users.user.role !== undefined
          ? this.props.users.user.role
          : this.props.users.user.authorities !== undefined &&
            this.props.users.user.authorities.length > 0
            ? this.props.users.user.authorities['0'].authority
            : ''
    };

    this.props.updateUser(
      user,
      JSON.parse(window.localStorage.getItem('session')).session,
      this.props.intl.formatMessage({ id: 'users.updateUserOk' }),
      this.props.intl.formatMessage({ id: 'users.updateUserKo' })
    );
  };

  render() {
    const placeHolderFirstName = this.props.intl.formatMessage({
      id: 'users.firstName'
    });
    const placeHolderLastName = this.props.intl.formatMessage({
      id: 'users.lastName'
    });
    const placeHolderEmail = this.props.intl.formatMessage({
      id: 'users.email'
    });
    const placeHolderPassword = this.props.intl.formatMessage({
      id: 'users.changePassword'
    });
    const placeHolderPhone = this.props.intl.formatMessage({
      id: 'users.phone'
    });

    return (
      <form onSubmit={this.handleUpdate}>
        <Grid>
          <Row>
            <Col md={2} />
            <Col md={2}>
              <Image src={user} responsive />
            </Col>
            <Col md={3} className="align-top">
              <FormGroup>
                <ControlLabel>
                  <FormattedMessage id="users.id" />
                </ControlLabel>
                <FormControl
                  type="text"
                  name="id"
                  onChange={this.handleInputChange}
                  value={this.props.users.user.id}
                  maxLength={50}
                  disabled
                />
              </FormGroup>
              <FormGroup>
                <ControlLabel>
                  <FormattedMessage id="users.firstName" />
                </ControlLabel>
                <FormControl
                  type="text"
                  name="firstname"
                  onChange={this.handleInputChange}
                  placeholder={placeHolderFirstName}
                  value={this.props.users.user.firstname}
                  maxLength={50}
                  required
                />
              </FormGroup>

              <FormGroup>
                <ControlLabel>
                  <FormattedMessage id="users.lastName" />
                </ControlLabel>
                <FormControl
                  type="text"
                  name="lastname"
                  onChange={this.handleInputChange}
                  placeholder={placeHolderLastName}
                  value={this.props.users.user.lastname}
                  maxLength={50}
                  required
                />
              </FormGroup>
              <FormGroup validationState={this.props.users.user.email.status}>
                <ControlLabel>
                  <FormattedMessage id="users.email" />
                </ControlLabel>
                <FormControl
                  type="text"
                  name="email"
                  onChange={this.handleInputChange}
                  placeholder={placeHolderEmail}
                  value={
                    this.props.users.user.email.value !== undefined
                      ? this.props.users.user.email.value
                      : this.props.users.user.email
                  }
                  maxLength={50}
                  required
                />
                <HelpBlock>
                  {this.props.users.user.email.messageStatus}
                </HelpBlock>
              </FormGroup>
            </Col>
            <Col md={3} className="align-top">
              <FormGroup>
                <ControlLabel>
                  <FormattedMessage id="users.password" />
                </ControlLabel>
                <FormControl
                  type="password"
                  name="password"
                  onChange={this.handleInputChange}
                  placeholder={placeHolderPassword}
                  value={this.props.users.user.password}
                  maxLength={50}
                />
              </FormGroup>
              <FormGroup>
                <ControlLabel>
                  <FormattedMessage id="users.phone" />
                </ControlLabel>
                <FormControl
                  type="text"
                  name="phone"
                  onChange={this.handleInputChange}
                  placeholder={placeHolderPhone}
                  value={this.props.users.user.phone}
                  maxLength={9}
                />
              </FormGroup>

              <FormGroup>
                <ControlLabel>
                  <FormattedMessage id="users.role" />
                </ControlLabel>
                <FormControl
                  componentClass="select"
                  name="role"
                  onChange={this.handleInputChange}
                  value={
                    this.props.users.user.role !== undefined
                      ? this.props.users.user.role
                      : this.props.users.user.authorities !== undefined &&
                        this.props.users.user.authorities.length > 0
                        ? this.props.users.user.authorities['0'].authority
                        : ''
                  }
                  required
                >
                  <option value="">
                    <FormattedMessage id="users.selectRole" />
                  </option>
                  <option value="ROLE_ADMIN">
                    <FormattedMessage id="users.admin" />
                  </option>
                  <option value="ROLE_OWNER">
                    <FormattedMessage id="users.owner" />
                  </option>
                  <option value="ROLE_USER">
                    <FormattedMessage id="users.user" />
                  </option>
                </FormControl>
              </FormGroup>

              <FormGroup required onChange={this.handleInputChange}>
                <Radio
                  name="enabled"
                  value
                  inline
                  checked={
                    this.props.users.user.enabled === 'true' ||
                    this.props.users.user.enabled === true
                  }
                >
                  <FormattedMessage id="users.enabled" />
                </Radio>{' '}
                <Radio
                  name="enabled"
                  value={false}
                  inline
                  checked={
                    this.props.users.user.enabled === 'false' ||
                    this.props.users.user.enabled === false
                  }
                >
                  <FormattedMessage id="users.disabled" />
                </Radio>
              </FormGroup>

              <ButtonToolbar>
                <Button className="pull-right" bsStyle="success" type="submit">
                  <FormattedMessage id="users.update" />
                </Button>
              </ButtonToolbar>
            </Col>
          </Row>
        </Grid>
      </form>
    );
  }
}

export default connect(state => ({ users: state.users, alert: state.alert }), {
  fetchUser,
  changeField,
  updateUser
})(injectIntl(UserDetail));
