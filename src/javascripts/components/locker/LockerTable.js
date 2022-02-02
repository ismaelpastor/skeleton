import React, { Component } from 'react';
import { Table, Pagination, Button } from 'react-bootstrap';
import PlusIcon from 'mdi-react/PlusIcon';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import LockerModalAdd from './LockerAddModal';
import { initLocker, changeActivePage } from '../../reducers/lockers';
import LockerRow from './LockerRow';

const itemsTable = process.env.REACT_APP_ITEMS_TABLE;

class LockerTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    };
  }

  showModal = () => {
    this.setState({ showModal: true });
    this.props.initLocker({
      deviceId: '',
      brief_desc: '',
      description: ''
    });
  };

  hideModal = () => {
    this.setState({ showModal: false });
  };

  changeActivePage = event => {
    this.props.changeActivePage({ activePage: event });
  };

  render() {
    return (
      <div>
        <Table striped bordered condensed hover>
          <thead>
            <tr>
              {/* <th className="align-center">
                <FormattedMessage id="lockers.lockerId" />
              </th> */}
              <th className="align-center">
                <FormattedMessage id="lockers.lockerName" />
              </th>
              {/* <th className="align-center">
                <FormattedMessage id="lockers.description" />
              </th> */}
              {/* <th className="align-center">
                <FormattedMessage id="lockers.activeAccess" />
              </th> */}
              <th className="align-center">
                <FormattedMessage id="lockers.lastKeyUpdate" />
              </th>
              <th className="align-center col-md-2">
                <Button bsStyle="success" onClick={this.showModal}>
                  <PlusIcon />
                </Button>
              </th>
            </tr>
          </thead>
          <tbody>
            {this.props.lockers !== undefined &&
              this.props.lockers
                .slice(
                  (this.props.activePage - 1) * itemsTable,
                  (this.props.activePage - 1) * itemsTable + itemsTable
                )
                .map((locker, i) => (
                  <LockerRow key={locker.id} lockerId={i} {...locker} />
                ))}
          </tbody>
        </Table>
        {this.props.lockers !== undefined &&
          this.props.lockers.length > itemsTable && (
            <Pagination
              prev
              next
              first
              last
              ellipsis
              boundaryLinks
              items={Math.ceil(this.props.lockers.length / itemsTable)}
              maxButtons={5}
              activePage={this.props.activePage}
              onSelect={this.changeActivePage}
            />
          )}
        <LockerModalAdd
          show={this.state.showModal}
          onHide={this.hideModal}
          dialogClassName="modal-analitics"
          title="Add Locker"
        />
      </div>
    );
  }
}
export default connect(state => state.lockers, {
  changeActivePage,
  initLocker
})(LockerTable);
