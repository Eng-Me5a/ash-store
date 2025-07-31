import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import logo from '../image/unnamed.png'; // ضع الشعار هنا

const AboutUs = () => {
  return (
    <section className="py-5 my-5 bg-white">
      <Container>
        <Row className="align-items-center">
          <Col md={3} className="text-center mb-4 mb-md-0">
            <img src={logo} alt="ASH Logo" style={{ width: '305px' }} />
          </Col>
          <Col md={9}>
            <h3 className="fw-bold mb-3">💼 من نحن — شركة ASH</h3>
            <p>
              شركة <strong>ASH</strong> هي شركة رائدة متخصصة في تقديم منتجات تعليمية ودفاتر مبتكرة بتصاميم عصرية وجودة استثنائية.
              نهدف إلى تمكين الطلاب في مختلف المراحل الدراسية من خلال أدوات مكتبية ملهمة وعملية.
            </p>
            <ul className="list-unstyled">
              <li>📦 منتجاتنا: دفاتر علمية - دفاتر مراجعة - إصدارات خاصة</li>
              <li>📍 الموقع: القاهرة، مصر</li>
              <li>📞 0100-123-4567</li>
              <li>📧 info@ash-notebooks.com</li>
              <li>🌐 تابعنا:
                <br />فيسبوك: facebook.com/ashnotebooks
                <br />إنستجرام: instagram.com/ashnotebooks
                <br />تيك توك: tiktok.com/@ashnotebooks
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AboutUs;
