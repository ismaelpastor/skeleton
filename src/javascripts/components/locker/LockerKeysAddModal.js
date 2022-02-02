import React, { Component } from 'react';
import {
  Modal,
  FormControl,
  Button,
  FormGroup,
  Row,
  Col
} from 'react-bootstrap';
import { connect } from 'react-redux';
import { injectIntl, FormattedMessage } from 'react-intl';
import moment from 'moment';
import { saveKey, changeField, selectRange } from '../../reducers/lockers';
import IntervalCalendar from '../common/IntervalCalendar';

class LockerKeysAddModal extends Component {
  handleInputChange = evt => {
    const name = evt.target.name;
    const value = evt.target.value;
    const fieldAux = {};
    fieldAux[name] = value;
    const field = {};
    field.key = fieldAux;
    this.props.changeField(field);
  };

  handleSave = evt => {
    evt.preventDefault();

    if (
      this.props.lockers.key.to !== '' &&
      this.props.lockers.key.from !== '' &&
      this.props.lockers.key.to !== undefined &&
      this.props.lockers.key.from !== undefined &&
      moment(this.props.lockers.key.to) >= moment()
    ) {
      const newKey = {
        deviceId: this.props.lockers.locker.deviceId,
        email: this.props.lockers.key.email,
        notAfter: this.props.lockers.key.to,
        notBefore: this.props.lockers.key.from
      };
      this.props.saveKey(
        newKey,
        JSON.parse(window.localStorage.getItem('session')).session
      );
    }
  };

  render() {
    const placeHolderEmail = this.props.intl.formatMessage({
      id: 'users.email'
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
            <Row>
              <Col md={6}>
                <FormGroup>
                  <FormControl
                    type="text"
                    name="email"
                    onChange={this.handleInputChange}
                    placeholder={placeHolderEmail}
                    maxLength={50}
                    required
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <IntervalCalendar
                  disabled={false}
                  onClick={this.props.selectRange}
                />
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            {this.props.lockers.key.status === 201 && (
              <FormattedMessage id="lockers.addKeyOk" />
            )}
            {this.props.lockers.key.status === 404 && (
              <FormattedMessage id="lockers.emailNotExist" />
            )}
            {this.props.lockers.key.status === '' && (
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
  saveKey,
  changeField,
  selectRange
})(injectIntl(LockerKeysAddModal));
