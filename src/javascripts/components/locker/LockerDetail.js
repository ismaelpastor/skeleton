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
import KeyRemoveIcon from 'mdi-react/KeyRemoveIcon';

import LockerKeysAddModal from './LockerKeysAddModal';
import { convertKeyCode } from '../../lib/utils';
import {
  fetchLocker,
  changeField,
  updateLocker,
  initKey,
  deleteKey,
  revokeKey
} from '../../reducers/lockers';
import HoverTip from '../common/HoverTip';

class LockerDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddModal: false,
      showDetailModal: false
    };
  }

  componentDidMount() {
    this.props.fetchLocker(
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
    field.locker = fieldAux;
    this.props.changeField(field);
  };

  handleUpdate = evt => {
    evt.preventDefault();
    const locker = {
      id: this.props.lockers.locker.deviceId,
      name: this.props.lockers.locker.brief_desc,
      description: this.props.lockers.locker.description
    };
    this.props.updateLocker(
      locker,
      JSON.parse(window.localStorage.getItem('session')).session,
      this.props.intl.formatMessage({ id: 'lockers.updateLockerOk' }),
      this.props.intl.formatMessage({ id: 'lockers.updateLockerKo' })
    );
  };

  handleDeleteKey = id => {
    const keys = {
      id
    };
    this.props.deleteKey(
      keys,
      JSON.parse(window.localStorage.getItem('session')).session,
      this.props.intl.formatMessage({ id: 'lockers.deleteKeyOk' }),
      this.props.intl.formatMessage({ id: 'lockers.deleteKeyKo' })
    );
  };

  handleRevokeKey = id => {
    const keys = {
      deviceId: this.props.lockers.locker.deviceId,
      id
    };
    this.props.revokeKey(
      keys,
      JSON.parse(window.localStorage.getItem('session')).session,
      this.props.intl.formatMessage({ id: 'lockers.revokeKeyOk' }),
      this.props.intl.formatMessage({ id: 'lockers.revokeKeyKo' })
    );
  };

  showAddModal = () => {
    this.setState({ showAddModal: true });
    this.props.initKey({ email: '', from: '', to: '' });
  };

  hideModalAdd = () => {
    this.setState({ showAddModal: false });
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
    const titleAddUser = this.props.intl.formatMessage({
      id: 'lockers.addUser'
    });
    const tooltipRevoke = this.props.intl.formatMessage({
      id: 'lockers.revoke'
    });
    const tooltipDelete = this.props.intl.formatMessage({
      id: 'lockers.delete'
    });

    return (
      <div>
        <Grid>
          <Row>
            <Col md={8} mdOffset={2}>
              <form onSubmit={this.handleUpdate}>
                <FormGroup>
                  <ControlLabel>
                    <FormattedMessage id="lockers.lockerId" />
                  </ControlLabel>
                  <FormControl
                    type="text"
                    name="deviceId"
                    onChange={this.handleInputChange}
                    placeholder={placeHolderLockerId}
                    value={this.props.lockers.locker.deviceId}
                    maxLength={50}
                    disabled
                  />
                </FormGroup>

                <FormGroup>
                  <ControlLabel>
                    <FormattedMessage id="lockers.name" />
                  </ControlLabel>
                  <FormControl
                    type="text"
                    name="brief_desc"
                    onChange={this.handleInputChange}
                    placeholder={placeHolderName}
                    value={this.props.lockers.locker.brief_desc}
                    maxLength={50}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <ControlLabel>
                    <FormattedMessage id="lockers.description" />
                  </ControlLabel>
                  <FormControl
                    type="textarea"
                    componentClass="textarea"
                    name="description"
                    onChange={this.handleInputChange}
                    placeholder={placeHolderDescription}
                    value={this.props.lockers.locker.description}
                    required
                  />
                </FormGroup>

                <ButtonToolbar>
                  <Button
                    className="pull-right"
                    bsStyle="success"
                    type="submit"
                  >
                    <FormattedMessage id="lockers.update" />
                  </Button>
                </ButtonToolbar>

                <ControlLabel>
                  <FormattedMessage id="lockers.user" />
                </ControlLabel>

                <Table striped bordered condensed hover>
                  <thead>
                    <tr>
                      <th className="align-center">
                        <FormattedMessage id="lockers.user" />
                      </th>
                      <th className="align-center">
                        <FormattedMessage id="lockers.from" />
                      </th>
                      <th className="align-center">
                        <FormattedMessage id="lockers.to" />
                      </th>
                      <th className="align-center">
                        <FormattedMessage id="lockers.keyCode" />
                      </th>
                      <th className="align-center col-md-2">
                        <Button bsStyle="success" onClick={this.showAddModal}>
                          <PlusIcon className="white" />
                        </Button>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.props.lockers.locker.keys !== undefined &&
                    this.props.lockers.locker.keys !== null &&
                    this.props.lockers.locker.keys.length > 0 ? (
                      this.props.lockers.locker.keys
                        .sort((a, b) => a.notBefore > b.notBefore)
                        .filter(key => key.master === false)
                        .map(key => (
                          <tr key={key.keys}>
                            <td>
                              {key.user !== null &&
                                key.user !== undefined &&
                                `${key.user.firstname} ${key.user.lastname}`}
                            </td>
                            <td>
                              {moment(key.notBefore).format('DD/MM/YYYY HH:mm')}
                            </td>
                            <td>
                              {moment(key.notAfter).format('DD/MM/YYYY HH:mm')}
                            </td>
                            <td className="align-center">
                              {convertKeyCode(key.keys)}
                            </td>
                            <td className="align-center">
                              <HoverTip placement="top" message={tooltipRevoke}>
                                <Button
                                  bsStyle="link"
                                  className="icons"
                                  onClick={() => {
                                    this.handleRevokeKey(key.id);
                                  }}
                                >
                                  <KeyRemoveIcon />
                                </Button>
                              </HoverTip>
                              <HoverTip placement="top" message={tooltipDelete}>
                                <Button
                                  bsStyle="link"
                                  className="icons"
                                  onClick={() => {
                                    this.handleDeleteKey(key.id);
                                  }}
                                >
                                  <DeleteIcon />
                                </Button>
                              </HoverTip>
                            </td>
                          </tr>
                        ))
                    ) : (
                      <tr>
                        <td colSpan="4" className="align-center">
                          <FormattedMessage id="lockers.noUsers" />
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </form>
            </Col>
          </Row>
        </Grid>
        <LockerKeysAddModal
          show={this.state.showAddModal}
          onHide={this.hideModalAdd}
          title={titleAddUser}
        />
      </div>
    );
  }
}

export default connect(
  state => ({ lockers: state.lockers, alert: state.alert }),
  {
    fetchLocker,
    changeField,
    updateLocker,
    initKey,
    deleteKey,
    revokeKey
  }
)(injectIntl(LockerDetail));
