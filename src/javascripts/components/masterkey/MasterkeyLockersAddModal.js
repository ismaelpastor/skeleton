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
import {
  assignDevice,
  changeField,
  selectRange
} from '../../reducers/masterkeys';

class LockerKeysAddModal extends Component {
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
      deviceId: this.props.masterkeys.locker.deviceId
    };

    this.props.assignDevice(
      this.props.masterkeys.masterkey.id,
      newLocker,
      JSON.parse(window.localStorage.getItem('session')).session
    );
  };

  render() {
    const placeHolderLocker = this.props.intl.formatMessage({
      id: 'masterkeys.selectLocker'
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
              <Col md={12}>
                <FormGroup>
                  <FormControl
                    componentClass="select"
                    name="deviceId"
                    onChange={this.handleInputChange}
                    placeholder={placeHolderLocker}
                    required
                  >
                    <option value="">{placeHolderLocker}</option>)
                    {this.props.lockers.lockers.map(locker => (
                      <option key={locker.deviceId} value={locker.deviceId}>
                        {locker.brief_desc}
                      </option>
                    ))}
                  </FormControl>
                </FormGroup>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            {!this.props.masterkeys.assignDevice ? (
              <Button bsStyle="success" className="pull-right" type="submit">
                <FormattedMessage id="masterkeys.selectLocker" />
              </Button>
            ) : (
              <FormattedMessage id="masterkeys.assignDeviceOk" />
            )}
          </Modal.Footer>
        </form>
      </Modal>
    );
  }
}

export default connect(
  state => ({ masterkeys: state.masterkeys, lockers: state.lockers }),
  {
    assignDevice,
    changeField,
    selectRange
  }
)(injectIntl(LockerKeysAddModal));
