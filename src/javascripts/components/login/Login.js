import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  Grid,
  Row,
  Col,
  FormControl,
  Button,
  FormGroup,
  HelpBlock
} from 'react-bootstrap';
import { injectIntl, FormattedMessage } from 'react-intl';
import { loginUser, changeField, initLogin } from '../../reducers/login';

class Login extends Component {
  handleInputChange = evt => {
    const name = evt.target.name;
    const value = evt.target.value;
    this.props.changeField(name, value);
  };

  handleSubmit = evt => {
    evt.preventDefault();
    this.props.loginUser(this.props.email.value, this.props.password);
  };

  componentWillMount() {
    this.props.initLogin();
  }

  render() {
    const placeHolderUsername = this.props.intl.formatMessage({
      id: 'login.username'
    });
    const placeHolderPassword = this.props.intl.formatMessage({
      id: 'login.password'
    });

    let errorSubmit = '';

    if (this.props.error) {
      errorSubmit = <span>{this.props.error}</span>;
    }

    return (
      <Grid>
        <Row>
          <Col md={4} mdOffset={4}>
            <div className="title">PROYECTO</div>
            <form className="box-login" onSubmit={this.handleSubmit}>
              <FormGroup validationState={this.props.email.status}>
                <FormControl
                  type="text"
                  name="email"
                  onChange={this.handleInputChange}
                  placeholder={placeHolderUsername}
                  maxLength={50}
                  required
                />
                <HelpBlock>{this.props.email.messageStatus}</HelpBlock>
              </FormGroup>
              <FormControl
                type="password"
                name="password"
                onChange={this.handleInputChange}
                placeholder={placeHolderPassword}
                maxLength={50}
                required
              />
              <Link to="/forgotPassword">
                <FormattedMessage id="login.forgotPassword" />
              </Link>
              <Button bsStyle="success" className="pull-right" type="submit">
                <FormattedMessage id="login.signIn" />
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
  loginUser,
  changeField,
  initLogin
})(injectIntl(Login));
