import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';

function MyFooter() {
  return (
    <div className="pb-4 pt-4 my-footer">
      <Container className="text-center">
        <p className="mb-0">
          If we’re talking about accuracy you are at the rigth place!
        </p>
        <p className="mt-0">
          Check the current weather for your desired city.
        </p>
        <Row className="mb-3 justify-content-center text-center">
          <Col className="mt-4 col-3 col-md-1">
            <span><FaFacebookF size="20" /></span>
          </Col>
          <Col className="mt-4 col-3 col-md-1">
            <span><FaInstagram size="20" /></span>
          </Col>
          <Col className="mt-4 col-3 col-md-1">
            <span><FaTwitter size="20" /></span>
          </Col>
        </Row>
        <hr />
        <p className="year mb-0">&#9400; 2020 All rights reserved</p>
      </Container>
    </div>
  );
}

export default MyFooter;
