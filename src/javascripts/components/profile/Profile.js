import React, { Component } from 'react';
import {
  Table,
  FormControl,
  Button,
  ButtonToolbar,
  Grid,
  Row,
  Col
} from 'react-bootstrap';

// library for internalisation purposes
import { FormattedMessage } from 'react-intl';

import CloseIcon from 'mdi-react/CloseIcon';

import profile from '../../../images/profile.svg';

class LockerDetail extends Component {
  render() {
    return (
      <Grid>
        <Row className="show-grid">
          <Col xs={3} md={3}>
            <div className="profile">
              <img src={profile} alt="Profile" />
            </div>
          </Col>
          <Col xs={9} md={9}>
            <div className="table-lockers">
              <center>
                <FormControl
                  type="text"
                  label="Text"
                  placeholder="Name"
                  value="John"
                />

                <FormControl
                  type="text"
                  label="Text"
                  placeholder="Lastname"
                  value="Smith Newman"
                />

                <FormControl
                  type="text"
                  label="Text"
                  placeholder="Email"
                  value="john.smith@city231.net"
                />

                <FormControl type="text" label="Text" placeholder="1234567" />

                <FormControl type="text" label="Text" placeholder="*******" />

                <Table striped bordered condensed hover>
                  <thead>
                    <tr>
                      <th>
                        <FormattedMessage id="lockers.lockerName" />
                      </th>
                      <th>
                        <FormattedMessage id="lockers.from" />
                      </th>
                      <th>
                        <FormattedMessage id="lockers.to" />
                      </th>
                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Room 1</td>
                      <td>10/09/2017</td>
                      <td>21/09/2017</td>
                      <td>
                        <CloseIcon />
                      </td>
                    </tr>
                    <tr>
                      <td>Room 2</td>
                      <td>10/09/2017</td>
                      <td>21/09/2017</td>
                      <td>
                        <CloseIcon />
                      </td>
                    </tr>
                    <tr>
                      <td>Room 3</td>
                      <td>10/09/2017</td>
                      <td>21/09/2017</td>
                      <td>
                        <CloseIcon />
                      </td>
                    </tr>
                  </tbody>
                </Table>

                <ButtonToolbar className="ancho40">
                  <Button>Discard</Button>
                  <Button bsStyle="success">Update</Button>
                </ButtonToolbar>
              </center>
            </div>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default LockerDetail;
