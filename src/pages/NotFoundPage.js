import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const NotFoundPage = () => {
  return (
    <Container>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <div className="glass not-found">
            <h1 className="page-title">404</h1>
            <p className="page-subtitle mb-0">
              The page you are looking for does not exist.
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};
export default NotFoundPage;
