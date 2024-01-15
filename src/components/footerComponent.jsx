import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Footer = () => {
  return (
    <footer className=" footer" >
      <Container>
        <Row>
          <Col className="center-text">
            <p>&copy; 2023 CarConnectPRO | All Rights Reserved. Designed, Build & Maintained by Group 5</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
