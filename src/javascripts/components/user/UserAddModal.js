import React, { Component } from 'react';
import {
  Modal,
  FormControl,
  FormGroup,
  Button,
  Radio,
  HelpBlock
} from 'react-bootstrap';
import { connect } from 'react-redux';
import { injectIntl, FormattedMessage } from 'react-intl';
import { saveUser, changeField } from '../../reducers/users';

class UserModalAdd extends Component {
  handleInputChange = evt => {
    const name = evt.target.name;
    const value = evt.target.value;
    const fieldAux = {};
    fieldAux[name] = value;
    const field = {};
    field.user = fieldAux;
    this.props.changeField(name, value);
  };

  handleSave = evt => {
    evt.preventDefault();
    const newUser = {
      firstname: this.props.users.user.firstname,
      lastname: this.props.users.user.lastname,
      enabled: this.props.users.user.enabled === 'true',
      email: this.props.users.user.email.value,
      password: this.props.users.user.password,
      phone: this.props.users.user.phone,
      role: this.props.users.user.role
    };

    this.props.saveUser(
      newUser,
      JSON.parse(window.localStorage.getItem('session')).session
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
      id: 'users.password'
    });

    const placeHolderPhone = this.props.intl.formatMessage({
      id: 'users.phone'
    });

    return (
      <Modal
        show={this.props.show}
        onHide={this.props.onHide}
        dialogClassName={this.props.dialogClassName}
      >
        <Modal.Header closeButton>
          <Modal.Title>{this.props.title}</Modal.Title>
        </Modal.Header>
        <form onSubmit={this.handleSave}>
          <Modal.Body>
            <FormControl
              type="text"
              name="firstname"
              onChange={this.handleInputChange}
              placeholder={placeHolderFirstName}
              maxLength={50}
              required
            />

            <FormControl
              type="text"
              name="lastname"
              onChange={this.handleInputChange}
              placeholder={placeHolderLastName}
              maxLength={50}
              required
            />

            <FormControl
              type="password"
              name="password"
              onChange={this.handleInputChange}
              placeholder={placeHolderPassword}
              maxLength={50}
              required
            />
            <FormGroup
              validationState={
                this.props.users.user.email !== undefined
                  ? this.props.users.user.email.status
                  : 'success'
              }
            >
              <FormControl
                type="text"
                name="email"
                onChange={this.handleInputChange}
                placeholder={placeHolderEmail}
                maxLength={50}
                required
              />
              <HelpBlock>
                {this.props.users.user.email !== undefined
                  ? this.props.users.user.email.messageStatus
                  : ''}
              </HelpBlock>
            </FormGroup>

            <FormControl
              componentClass="select"
              name="role"
              onChange={this.handleInputChange}
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

            <FormGroup required onChange={this.handleInputChange}>
              <Radio name="enabled" value inline>
                <FormattedMessage id="users.enabled" />
              </Radio>{' '}
              <Radio name="enabled" value={false} inline>
                <FormattedMessage id="users.disabled" />
              </Radio>
            </FormGroup>

            <FormControl
              type="text"
              name="phone"
              onChange={this.handleInputChange}
              placeholder={placeHolderPhone}
              maxLength={50}
            />
          </Modal.Body>
          <Modal.Footer>
            {this.props.users.user.id === undefined ||
            this.props.users.user.id === '' ? (
              <Button bsStyle="success" className="pull-right" type="submit">
                <FormattedMessage id="users.save" />
              </Button>
            ) : (
              <FormattedMessage id="users.addUserOk" />
            )}
          </Modal.Footer>
        </form>
      </Modal>
    );
  }
}

export default connect(state => ({ users: state.users }), {
  saveUser,
  changeField
})(injectIntl(UserModalAdd));
