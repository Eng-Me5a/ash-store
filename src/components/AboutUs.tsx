import React from 'react';
import { Container, Row, Col, Card, ListGroup } from 'react-bootstrap';
import { FaFacebook, FaInstagram, FaTiktok, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import logo from '../image/unnamed.png';

const AboutUs = () => {
  return (
    <section className="py-5 my-5" style={{ background: 'linear-gradient(to bottom, #f8f9fa, #ffffff)' }}>
      <Container>
        <Row className="align-items-center justify-content-center">
          <Col lg={10}>
            <Card className="border-0 shadow-lg overflow-hidden">
              <Row className="g-0">
                <Col md={4} className="d-flex align-items-center justify-content-center p-4" style={{ backgroundColor: '#f5f7fa' }}>
                  <img 
                    src={logo} 
                    alt="ASH Logo" 
                    className="img-fluid" 
                    style={{ 
                      maxWidth: '100%', 
                      height: 'auto',
                      filter: 'drop-shadow(0 5px 15px rgba(0,0,0,0.1))'
                    }} 
                  />
                </Col>
                <Col md={8}>
                  <Card.Body className="p-4 p-md-5">
                    <h2 className="fw-bold mb-4" style={{ color: '#2b5876' }}>
                      <span style={{ 
                        background: 'linear-gradient(to right, #4e4376, #2b5876)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                      }}>
                        من نحن — شركة ASH
                      </span>
                    </h2>
                    <p className="lead mb-4" style={{ lineHeight: '1.8' }}>
                      شركة <strong style={{ color: '#4e4376' }}>ASH</strong> هي شركة رائدة متخصصة في تقديم منتجات تعليمية ودفاتر مبتكرة بتصاميم عصرية وجودة استثنائية.
                      نهدف إلى تمكين الطلاب في مختلف المراحل الدراسية من خلال أدوات مكتبية ملهمة وعملية.
                    </p>
                    
                    <ListGroup variant="flush" className="mb-4">
                      <ListGroup.Item className="d-flex align-items-center border-0 py-2 px-0">
                        <span className="me-2" style={{ color: '#4e4376', minWidth: '24px' }}>📦</span>
                        <span>منتجاتنا: دفاتر علمية - دفاتر مراجعة - إصدارات خاصة</span>
                      </ListGroup.Item>
                      <ListGroup.Item className="d-flex align-items-center border-0 py-2 px-0">
                        <FaMapMarkerAlt className="me-2" style={{ color: '#4e4376', minWidth: '24px' }} />
                        <span>القاهرة، مصر</span>
                      </ListGroup.Item>
                      <ListGroup.Item className="d-flex align-items-center border-0 py-2 px-0">
                        <FaPhone className="me-2" style={{ color: '#4e4376', minWidth: '24px' }} />
                        <span>0100-123-4567</span>
                      </ListGroup.Item>
                      <ListGroup.Item className="d-flex align-items-center border-0 py-2 px-0">
                        <FaEnvelope className="me-2" style={{ color: '#4e4376', minWidth: '24px' }} />
                        <span>info@ash-notebooks.com</span>
                      </ListGroup.Item>
                    </ListGroup>

                    <div className="social-section mt-4">
                      <h5 className="mb-3" style={{ color: '#2b5876' }}>تابعنا على وسائل التواصل</h5>
                      <div className="d-flex flex-wrap gap-3">
                        <a 
                          href="https://facebook.com/ashnotebooks" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="btn btn-outline-primary d-flex align-items-center"
                          style={{ borderRadius: '50px' }}
                        >
                          <FaFacebook className="me-2" />
                          فيسبوك
                        </a>
                        <a 
                          href="https://instagram.com/ashnotebooks" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="btn btn-outline-danger d-flex align-items-center"
                          style={{ borderRadius: '50px' }}
                        >
                          <FaInstagram className="me-2" />
                          إنستجرام
                        </a>
                        <a 
                          href="https://tiktok.com/@ashnotebooks" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="btn btn-outline-dark d-flex align-items-center"
                          style={{ borderRadius: '50px' }}
                        >
                          <FaTiktok className="me-2" />
                          تيك توك
                        </a>
                      </div>
                    </div>
                  </Card.Body>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AboutUs;