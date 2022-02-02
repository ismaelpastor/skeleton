import React, { Component } from 'react';
import { Table, Pagination, Button } from 'react-bootstrap';
import PlusIcon from 'mdi-react/PlusIcon';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import LockerModalAdd from './MasterkeyAddModal';
import { initMasterkey, changeActivePage } from '../../reducers/masterkeys';
import MasterkeyRow from './MasterkeyRow';

const itemsTable = process.env.REACT_APP_ITEMS_TABLE;

class MasterkeyTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    };
  }

  showModal = () => {
    this.setState({ showModal: true });
    this.props.initMasterkey({
      id: '',
      name: '',
      from: '',
      to: '',
      lockers: [],
      users: []
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
              {/*              <th className="align-center">
                <FormattedMessage id="masterkeys.id" />
              </th> */}
              <th className="align-center">
                <FormattedMessage id="masterkeys.masterkeyName" />
              </th>
              <th className="align-center">
                <FormattedMessage id="masterkeys.from" />
              </th>
              <th className="align-center">
                <FormattedMessage id="masterkeys.to" />
              </th>
              <th className="align-center col-md-2">
                <Button bsStyle="success" onClick={this.showModal}>
                  <PlusIcon />
                </Button>
              </th>
            </tr>
          </thead>
          <tbody>
            {this.props.masterkeys !== undefined &&
              this.props.masterkeys
                .slice(
                  (this.props.activePage - 1) * itemsTable,
                  (this.props.activePage - 1) * itemsTable + itemsTable
                )
                .map((masterkey, i) => (
                  <MasterkeyRow
                    key={masterkey.id}
                    masterkeyId={i}
                    {...masterkey}
                  />
                ))}
          </tbody>
        </Table>
        {this.props.masterkeys !== undefined &&
          this.props.masterkeys.length > itemsTable && (
            <Pagination
              prev
              next
              first
              last
              ellipsis
              boundaryLinks
              items={Math.ceil(this.props.masterkeys.length / itemsTable)}
              maxButtons={5}
              activePage={this.props.activePage}
              onSelect={this.changeActivePage}
            />
          )}
        <LockerModalAdd
          show={this.state.showModal}
          onHide={this.hideModal}
          dialogClassName="modal-analitics"
          title="Add Masterkey"
        />
      </div>
    );
  }
}
export default connect(state => state.masterkeys, {
  changeActivePage,
  initMasterkey
})(MasterkeyTable);
