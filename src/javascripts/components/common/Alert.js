import React from 'react';
import { Alert as AlertDism, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { hideAlert } from '../../reducers/alert';

const Alert = props => (
  <Row>
    <Col md={8} mdOffset={2}>
      {props.alert.alertVisible && (
        <AlertDism bsStyle={props.alert.style} onDismiss={props.hideAlert}>
          <p>{props.alert.message}</p>
        </AlertDism>
      )}
    </Col>
  </Row>
);

export default connect(state => ({ alert: state.alert }), { hideAlert })(Alert);
