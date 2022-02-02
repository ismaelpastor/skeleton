import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-bootstrap';
import { injectIntl } from 'react-intl';
import { fetchMasterkeys } from '../../reducers/masterkeys';
import { optionMenu } from '../../reducers/app';
import MasterkeyTable from './MasterkeyTable';

class Masterkeys extends Component {
  componentDidMount() {
    const optionMasterkeys = this.props.intl.formatMessage({
      id: 'menu.masterkeys'
    });
    this.props.optionMenu(optionMasterkeys);

    this.props.fetchMasterkeys(
      JSON.parse(window.localStorage.getItem('session')).session
    );
  }

  render() {
    return (
      <Grid>
        <Row>
          <Col md={10} mdOffset={1}>
            <MasterkeyTable
              masterkeys={this.props.masterkeys}
              activePage={this.props.activePage}
            />
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default connect(
  state => ({ masterkeys: state.masterkeys, app: state.app }),
  {
    fetchMasterkeys,
    optionMenu
  }
)(injectIntl(Masterkeys));
