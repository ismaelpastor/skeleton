import React, { Component } from 'react';
import {
  Table,
  FormControl,
  FormGroup,
  Button,
  ControlLabel,
  ButtonToolbar,
  Grid,
  Row,
  Col
} from 'react-bootstrap';
import { connect } from 'react-redux';
// library for internalisation purposes
import { injectIntl, FormattedMessage } from 'react-intl';
import moment from 'moment';

import PlusIcon from 'mdi-react/PlusIcon';
import DeleteIcon from 'mdi-react/DeleteIcon';
import IntervalCalendar from '../common/IntervalCalendar';
import MasterkeyLockersAddModal from './MasterkeyLockersAddModal';
import {
  fetchMasterkey,
  changeField,
  updateMasterkey,
  initLocker,
  unAssignDevice,
  selectRange,
  revokeMasterkey,
  deleteMasterkey
} from '../../reducers/masterkeys';
import HoverTip from '../common/HoverTip';
import { convertKeyCode } from '../../lib/utils';

class MasterkeyDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddModalLocker: false,
      showAddModalUser: false
    };
  }

  componentDidMount() {
    this.props.fetchMasterkey(
      JSON.parse(window.localStorage.getItem('session')).session,
      this.props.match.params.id
    );
  }

  handleInputChange = evt => {
    const name = evt.target.name;
    const value = evt.target.value;
    const fieldAux = {};
    fieldAux[name] = value;
    const field = {};
    field.masterkey = fieldAux;
    this.props.changeField(field);
  };

  handleUpdate = evt => {
    evt.preventDefault();

    if (
      this.props.masterkeys.masterkey.notAfter !== '' &&
      this.props.masterkeys.masterkey.notBefore !== '' &&
      this.props.masterkeys.masterkey.notAfter !== undefined &&
      this.props.masterkeys.masterkey.notBefore !== undefined &&
      moment(this.props.masterkeys.masterkey.notAfter) >= moment()
    ) {
      const masterkey = {
        id: this.props.masterkeys.masterkey.id,
        name: this.props.masterkeys.masterkey.name,
        notAfter: this.props.masterkeys.masterkey.notAfter,
        notBefore: this.props.masterkeys.masterkey.notBefore
      };
      this.props.updateMasterkey(
        masterkey,
        JSON.parse(window.localStorage.getItem('session')).session,
        this.props.intl.formatMessage({ id: 'masterkeys.updateMasterkeyOk' }),
        this.props.intl.formatMessage({ id: 'masterkeys.updateMasterkeyKo' })
      );
    }
  };

  handleDeleteMasterkey = () => {
    const masterkey = {
      id: this.props.masterkeys.masterkey.id
    };

    this.props.deleteMasterkey(
      masterkey,
      JSON.parse(window.localStorage.getItem('session')).session,
      this.props.intl.formatMessage({ id: 'masterkeys.deleteMasterkeyOk' }),
      this.props.intl.formatMessage({ id: 'masterkeys.deleteMasterkeyKo' })
    );
  };

  handleRevokeMasterkey = () => {
    const masterkey = {
      id: this.props.masterkeys.masterkey.id
    };
    this.props.revokeMasterkey(
      masterkey,
      JSON.parse(window.localStorage.getItem('session')).session,
      this.props.intl.formatMessage({ id: 'masterkeys.revokeMasterkeyOk' }),
      this.props.intl.formatMessage({ id: 'masterkeys.revokeMasterkeyKo' })
    );
  };

  handleDeleteLocker = deviceId => {
    const locker = {
      deviceId
    };
    this.props.unAssignDevice(
      this.props.masterkeys.masterkey.id,
      locker,
      JSON.parse(window.localStorage.getItem('session')).session,
      this.props.intl.formatMessage({ id: 'masterkeys.unAssignDeviceOk' }),
      this.props.intl.formatMessage({ id: 'masterkeys.unAssignDeviceKo' })
    );
  };

  showAddModalLocker = () => {
    this.setState({ showAddModalLocker: true });
    this.props.initLocker({ id: '', deviceId: '' });
  };

  hideModalAddLocker = () => {
    this.setState({ showAddModalLocker: false });
  };

  render() {
    const placeHolderMasterkeyId = this.props.intl.formatMessage({
      id: 'masterkeys.masterkeyId'
    });
    const placeHolderName = this.props.intl.formatMessage({
      id: 'masterkeys.name'
    });
    const titleAddLocker = this.props.intl.formatMessage({
      id: 'masterkeys.addLocker'
    });
    const tooltipDelete = this.props.intl.formatMessage({
      id: 'masterkeys.delete'
    });

    return (
      <div>
        <Grid>
          <Row>
            <Col md={2} />
            <Col md={3}>
              <FormGroup>
                <ControlLabel>
                  <FormattedMessage id="masterkeys.masterkeyId" />
                </ControlLabel>
                <FormControl
                  type="text"
                  name="deviceId"
                  onChange={this.handleInputChange}
                  placeholder={placeHolderMasterkeyId}
                  value={this.props.masterkeys.masterkey.id}
                  maxLength={70}
                  disabled
                />
              </FormGroup>
            </Col>
            <Col md={5}>
              <FormGroup>
                <ControlLabel>
                  <FormattedMessage id="masterkeys.name" />
                </ControlLabel>
                <FormControl
                  type="text"
                  name="name"
                  onChange={this.handleInputChange}
                  placeholder={placeHolderName}
                  value={this.props.masterkeys.masterkey.name}
                  maxLength={50}
                  required
                  disabled={this.props.masterkeys.disabled}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={2} />
            <Col md={4}>
              <FormGroup>
                <ControlLabel>
                  <FormattedMessage id="masterkeys.fromTo" />
                </ControlLabel>
                <IntervalCalendar
                  disabled={this.props.masterkeys.disabled}
                  onClick={this.props.selectRange}
                  value={[
                    moment(this.props.masterkeys.masterkey.notBefore),
                    moment(this.props.masterkeys.masterkey.notAfter)
                  ]}
                />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <ControlLabel>
                  <FormattedMessage id="masterkeys.keyCode" />
                </ControlLabel>
                <FormControl
                  type="text"
                  name="keys"
                  value={
                    this.props.masterkeys.masterkey.keys !== undefined
                      ? convertKeyCode(this.props.masterkeys.masterkey.keys)
                      : ''
                  }
                  maxLength={50}
                  disabled
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={8} mdOffset={2}>
              <ButtonToolbar>
                <Button
                  className="pull-right"
                  bsStyle="success"
                  onClick={this.handleUpdate}
                  disabled={this.props.masterkeys.disabled}
                >
                  <FormattedMessage id="masterkeys.update" />
                </Button>
                <Button
                  className="pull-right"
                  bsStyle="success"
                  onClick={this.handleRevokeMasterkey}
                  disabled={this.props.masterkeys.disabled}
                >
                  <FormattedMessage id="masterkeys.revoke" />
                </Button>
                <Button
                  className="pull-right"
                  bsStyle="success"
                  onClick={this.handleDeleteMasterkey}
                  disabled={this.props.masterkeys.disabled}
                >
                  <FormattedMessage id="masterkeys.delete" />
                </Button>
              </ButtonToolbar>
            </Col>
            <Col md={8} mdOffset={2}>
              <ControlLabel>Lockers: </ControlLabel>

              <Table striped bordered condensed hover>
                <thead>
                  <tr>
                    <th className="align-center">
                      <FormattedMessage id="lockers.lockerName" />
                    </th>
                    {/* <th className="align-center">
                      <FormattedMessage id="lockers.description" />
                    </th> */}
                    <th className="align-center col-md-2">
                      <Button
                        bsStyle="success"
                        onClick={this.showAddModalLocker}
                        disabled={this.props.masterkeys.disabled}
                      >
                        <PlusIcon className="white" />
                      </Button>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {this.props.masterkeys.masterkey.lockers !== undefined &&
                  this.props.masterkeys.masterkey.lockers !== null &&
                  this.props.masterkeys.masterkey.lockers.length > 0 ? (
                    this.props.masterkeys.masterkey.lockers.map(device => (
                      <tr key={device.id}>
                        <td>{device.brief_desc}</td>
                        {/* <td>{device.description}</td> */}
                        <td className="align-center">
                          <HoverTip placement="top" message={tooltipDelete}>
                            <Button
                              bsStyle="link"
                              className="icons"
                              onClick={() => {
                                this.handleDeleteLocker(device.deviceId);
                              }}
                              disabled={this.props.masterkeys.disabled}
                            >
                              <DeleteIcon />
                            </Button>
                          </HoverTip>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="2" className="align-center">
                        <FormattedMessage id="masterkeys.noLockers" />
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </Col>
          </Row>
        </Grid>
        <MasterkeyLockersAddModal
          show={this.state.showAddModalLocker}
          onHide={this.hideModalAddLocker}
          title={titleAddLocker}
        />
      </div>
    );
  }
}

export default connect(
  state => ({ masterkeys: state.masterkeys, alert: state.alert }),
  {
    fetchMasterkey,
    changeField,
    updateMasterkey,
    revokeMasterkey,
    initLocker,
    unAssignDevice,
    selectRange,
    deleteMasterkey
  }
)(injectIntl(MasterkeyDetail));
