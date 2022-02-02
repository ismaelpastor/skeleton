import React, { Component } from 'react';
import { Table, Pagination, Button } from 'react-bootstrap';
import PlusIcon from 'mdi-react/PlusIcon';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import LockerModalAdd from './UserAddModal';
import { initUser, changeActivePage } from '../../reducers/users';
import UserRow from './UserRow';

const itemsTable = process.env.REACT_APP_ITEMS_TABLE;

class UserTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    };
  }

  showModal = () => {
    this.setState({ showModal: true });
    this.props.initUser({
      id: '',
      firstname: '',
      lastname: '',
      enabled: '',
      email: {
        value: '',
        status: null,
        messageStatus: ''
      },
      password: '',
      phone: ''
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
                <FormattedMessage id="users.id" />
              </th> */}
              <th className="align-center">
                <FormattedMessage id="users.userName" />
              </th>
              <th className="align-center">
                <FormattedMessage id="users.enabled" />
              </th>
              <th className="align-center">
                <FormattedMessage id="users.email" />
              </th>
              <th className="align-center">
                <FormattedMessage id="users.role" />
              </th>
              <th className="align-center col-md-2">
                <Button bsStyle="success" onClick={this.showModal}>
                  <PlusIcon />
                </Button>
              </th>
            </tr>
          </thead>
          <tbody>
            {this.props.users !== undefined &&
              this.props.users
                .slice(
                  (this.props.activePage - 1) * itemsTable,
                  (this.props.activePage - 1) * itemsTable + itemsTable
                )
                .map((user, i) => (
                  <UserRow key={user.id} userId={i} {...user} />
                ))}
          </tbody>
        </Table>
        {this.props.users !== undefined &&
          this.props.users.length > itemsTable && (
            <Pagination
              prev
              next
              first
              last
              ellipsis
              boundaryLinks
              items={Math.ceil(this.props.users.length / itemsTable)}
              maxButtons={5}
              activePage={this.props.activePage}
              onSelect={this.changeActivePage}
            />
          )}
        <LockerModalAdd
          show={this.state.showModal}
          onHide={this.hideModal}
          dialogClassName="modal-analitics"
          title="Add User"
        />
      </div>
    );
  }
}
export default connect(state => state.users, {
  changeActivePage,
  initUser
})(UserTable);
