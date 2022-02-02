import React, { Component } from 'react';
import { Modal, Row, Col, FormControl, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { injectIntl, FormattedMessage } from 'react-intl';
import moment from 'moment';
import IntervalCalendar from '../common/IntervalCalendar';
import {
  saveMasterkey,
  changeField,
  selectRange
} from '../../reducers/masterkeys';

class MasterkeyModalAdd extends Component {
  handleInputChange = evt => {
    const name = evt.target.name;
    const value = evt.target.value;
    const fieldAux = {};
    fieldAux[name] = value;
    const field = {};
    field.masterkey = fieldAux;
    this.props.changeField(field);
  };

  handleSave = evt => {
    evt.preventDefault();

    if (
      this.props.masterkey.notAfter !== '' &&
      this.props.masterkey.notBefore !== '' &&
      this.props.masterkey.notAfter !== undefined &&
      this.props.masterkey.notBefore !== undefined &&
      moment(this.props.masterkey.notAfter) >= moment()
    ) {
      const newMasterkey = {
        name: this.props.masterkey.name,
        notAfter: this.props.masterkey.notAfter,
        notBefore: this.props.masterkey.notBefore
      };
      this.props.saveMasterkey(
        newMasterkey,
        JSON.parse(window.localStorage.getItem('session')).session
      );
    }
  };

  render() {
    const placeHolderName = this.props.intl.formatMessage({
      id: 'masterkeys.name'
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
                <FormControl
                  type="text"
                  name="name"
                  onChange={this.handleInputChange}
                  placeholder={placeHolderName}
                  maxLength={50}
                  required
                />
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
            {this.props.masterkey.id === undefined ||
            this.props.masterkey.id === '' ? (
              <Button bsStyle="success" className="pull-right" type="submit">
                <FormattedMessage id="masterkeys.save" />
              </Button>
            ) : (
              <FormattedMessage id="masterkeys.addMasterkeyOk" />
            )}
          </Modal.Footer>
        </form>
      </Modal>
    );
  }
}

export default connect(state => state.masterkeys, {
  saveMasterkey,
  changeField,
  selectRange
})(injectIntl(MasterkeyModalAdd));
