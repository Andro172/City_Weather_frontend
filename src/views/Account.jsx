import React from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import UpdatePassword from '../components/forms/UpdatePassword';
import RemoveAccount from '../components/RemoveAccount';

function Account() {
  return (
    <div className="account">
      <h3 className="text-center">Update Profile</h3>
      <br />
      <Row className="justify-content-center m-0">
        <Col className="col-12 col-md-8 col-lg-5">
          <Tabs defaultActiveKey="password" id="update-profile-tabs">
            <Tab eventKey="password" title="Password">
              <UpdatePassword />
            </Tab>
            <Tab eventKey="remove" title="Remove">
              <div className="text-center">
                <h5 className="mt-5 mb-5">This action will completely remove your account!</h5>
                <RemoveAccount />
              </div>
            </Tab>
          </Tabs>
        </Col>
      </Row>
    </div>
  );
}

export default Account;
