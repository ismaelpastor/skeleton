import React, { Component } from 'react';
import { Modal, FormGroup, FormControl, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { injectIntl, FormattedMessage } from 'react-intl';
import { saveLocker, changeField } from '../../reducers/lockers';

class LockerModalAdd extends Component {
  handleInputChange = evt => {
    const name = evt.target.name;
    const value = evt.target.value;
    const fieldAux = {};
    fieldAux[name] = value;
    const field = {};
    field.locker = fieldAux;
    this.props.changeField(field);
  };

  handleSave = evt => {
    evt.preventDefault();
    const newLocker = {
      id: this.props.lockers.locker.deviceId,
      name: this.props.lockers.locker.brief_desc,
      description: this.props.lockers.locker.description
    };

    this.props.saveLocker(
      newLocker,
      JSON.parse(window.localStorage.getItem('session')).session
    );
  };

  render() {
    const placeHolderLockerId = this.props.intl.formatMessage({
      id: 'lockers.lockerId'
    });
    const placeHolderName = this.props.intl.formatMessage({
      id: 'lockers.name'
    });
    const placeHolderDescription = this.props.intl.formatMessage({
      id: 'lockers.description'
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
              name="deviceId"
              onChange={this.handleInputChange}
              placeholder={placeHolderLockerId}
              maxLength={16}
              minLength={16}
              defaultValue={this.props.lockers.locker.deviceId}
              required
            />

            <FormControl
              type="text"
              name="brief_desc"
              onChange={this.handleInputChange}
              placeholder={placeHolderName}
              maxLength={30}
              defaultValue={this.props.lockers.locker.brief_desc}
              required
            />

            <FormGroup>
              <FormControl
                type="textarea"
                componentClass="textarea"
                name="description"
                onChange={this.handleInputChange}
                placeholder={placeHolderDescription}
                maxLength={120}
                defaultValue={this.props.lockers.locker.description}
                required
              />
            </FormGroup>
          </Modal.Body>
          <Modal.Footer>
            {this.props.lockers.locker.status === 201 && (
              <FormattedMessage id="lockers.addLockerOk" />
            )}
            {this.props.lockers.locker.status === 409 && (
              <FormattedMessage id="lockers.errorLockerExists" />
            )}
            {this.props.lockers.locker.status === '' && (
              <Button bsStyle="success" className="pull-right" type="submit">
                <FormattedMessage id="lockers.save" />
              </Button>
            )}
          </Modal.Footer>
        </form>
      </Modal>
    );
  }
}

export default connect(state => ({ lockers: state.lockers }), {
  saveLocker,
  changeField
})(injectIntl(LockerModalAdd));
