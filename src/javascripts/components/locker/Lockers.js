import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-bootstrap';
import { injectIntl } from 'react-intl';
import { fetchLockers, fetchUsers } from '../../reducers/lockers';
import { optionMenu } from '../../reducers/app';
import LockerTable from './LockerTable';

class Lockers extends Component {
  componentDidMount() {
    const optionLockers = this.props.intl.formatMessage({ id: 'menu.lockers' });
    this.props.optionMenu(optionLockers);
    this.props.fetchLockers(
      JSON.parse(window.localStorage.getItem('session')).session
    );
  }

  render() {
    return (
      <Grid>
        <Row>
          <Col md={10} mdOffset={1}>
            <LockerTable
              lockers={this.props.lockers}
              activePage={this.props.activePage}
            />
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default connect(state => ({ lockers: state.lockers, app: state.app }), {
  fetchLockers,
  fetchUsers,
  optionMenu
})(injectIntl(Lockers));
