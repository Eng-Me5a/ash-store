import React from 'react';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import heroImage from '../image/unnamed.png';

const Hero = () => {
  return (
    <section 
      className="hero-section py-5"
      style={{
        background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Decorative elements */}
      <div className="position-absolute top-0 start-0 w-100 h-100" style={{
        backgroundImage: 'radial-gradient(circle at 70% 30%, rgba(255,255,255,0.4) 0%, transparent 30%)',
        zIndex: 0
      }}></div>
      
      <Container className="position-relative" style={{zIndex: 1}}>
        <Row className="align-items-center">
          <Col md={4} className="mb-4 my-5 mb-md-0">
            <Image
              src={heroImage}
              alt="منتج اش"
              fluid
              className="hero-image"
              style={{
                borderRadius: '20px',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                border: '5px solid white',
                transform: 'perspective(1000px) rotateY(-10deg)',
                transition: 'transform 0.5s ease',
                maxHeight: '500px',
                objectFit: 'contain'
              }}
            />
          </Col>
          <Col md={6} className="text-center text-md-end">
            <h1 
              className="fw-bold mb-4 hero-title"
              style={{
                fontSize: '3rem',
                background: 'linear-gradient(to right, #2b5876, #4e4376)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
              }}
            >
              أهلاً وسهلاً
            </h1>
            <p 
              className="lead mb-4 hero-subtitle"
              style={{
                fontSize: '1.5rem',
                color: '#4a4a4a',
                lineHeight: '1.6'
              }}
            >
              طباعة اش والمنتجات المخصصة
            </p>
          </Col>
        </Row>
      </Container>

      <style >{`
        .hero-image:hover {
          transform: perspective(1000px) rotateY(-5deg) scale(1.02) !important;
        }
        
        @media (max-width: 768px) {
          .hero-title {
            font-size: 2.2rem !important;
          }
          .hero-subtitle {
            font-size: 1.2rem !important;
          }
          .hero-image {
            transform: perspective(1000px) rotateY(0deg) !important;
            max-height: 350px !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;