import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Grid, Row, Col, FormControl, Button } from 'react-bootstrap';
import { injectIntl, FormattedMessage } from 'react-intl';
import { resetPassword, changeField, initForgot } from '../../reducers/login';

class Login extends Component {
  handleInputChange = evt => {
    const name = evt.target.name;
    const value = evt.target.value;
    this.props.changeField(name, value);
  };

  handleSubmit = evt => {
    evt.preventDefault();
    this.props.resetPassword(this.props.email.value);
  };

  componentWillMount() {
    this.props.initForgot();
  }

  render() {
    const placeHolderEmail = this.props.intl.formatMessage({
      id: 'login.email'
    });

    let errorSubmit = '';

    if (this.props.statusText !== 'OK') {
      errorSubmit = <span>{this.props.statusText}</span>;
    } else if (this.props.statusText !== '') {
      errorSubmit = (
        <span>{this.props.intl.formatMessage({ id: 'login.reset' })}</span>
      );
    }

    return (
      <Grid>
        <Row>
          <Col xs={4} xsOffset={4}>
            <div className="title">PROYECTO</div>
            <form className="box-login" onSubmit={this.handleSubmit}>
              <FormControl
                type="text"
                name="email"
                onChange={this.handleInputChange}
                placeholder={placeHolderEmail}
              />
              <Link to="/">
                <FormattedMessage id="login.signIn" />
              </Link>
              <Button bsStyle="success" className="pull-right" type="submit">
                <FormattedMessage id="login.resetPassword" />
              </Button>
              <br />
              {errorSubmit}
            </form>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default connect(state => state.login, {
  resetPassword,
  changeField,
  initForgot
})(injectIntl(Login));
