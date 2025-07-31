import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import heroImage from '../image/unnamed.png';

const Hero = () => {
  return (
    <div className="bg-light py-5">
      <Container>
        <Row className="align-items-center ">
          <Col md={4}>
      <Image src={heroImage} alt="منتج الهبا" fluid rounded />
          </Col>
          <Col md={6} className="text-cente text-md-end mt-4 mt-md-0">
            <h1 className="fw-bold">أهلاً وسهلاً</h1>
            <p className="lead">طباعة الهبا والمنتجات المخصصة</p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Hero;
