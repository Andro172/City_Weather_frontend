import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import RegisterForm from '../components/forms/RegisterForm';

function Register() {
  return (
    <div className="register">
      <Row className="m-0 justify-content-center">
        <Col className="my-auto col-12 col-md-5">
          <h1 className="font-weight-bold mb-3 mb-lg-5">Welcome!</h1>
          <p>Keep track of the current weather in any city!</p>
        </Col>
        <Col className="mt-5 col-12 col-md-5">
          <RegisterForm submitTitle="Submit" loginUser />
        </Col>
      </Row>
    </div>
  );
}

export default Register;
