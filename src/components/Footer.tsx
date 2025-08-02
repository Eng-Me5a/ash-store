import React from 'react';
import { Container } from 'react-bootstrap';
import { FaFacebook, FaInstagram, FaTiktok, FaWhatsapp } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer 
      className="footer py-5"
      style={{
        background: 'linear-gradient(to right, #f8f9fa, #e9ecef)',
        borderTop: '1px solid rgba(0,0,0,0.1)',
        direction: 'rtl'
      }}
    >
      <Container>
        <div className="row">
          <div className="col-md-4 mb-4 mb-md-0">
            <h5 className="fw-bold mb-3" style={{ color: '#2b5876' }}>اش | ASH</h5>
            <p className="text-muted">
              منتجات مطبوعة ومخصصة لذوقك الخاص. نقدم لكم أجود أنواع الطباعة على مختلف المنتجات بجودة عالية وأسعار تنافسية.
            </p>
          </div>
          
          <div className="col-md-4 mb-4 mb-md-0 text-center">
            <h5 className="fw-bold mb-3" style={{ color: '#2b5876' }}>روابط سريعة</h5>
            <ul className="list-unstyled">
              <li className="mb-2"><a href="/" className="text-decoration-none text-dark">الرئيسية</a></li>
              <li className="mb-2"><a href="/products" className="text-decoration-none text-dark">المنتجات</a></li>
              <li className="mb-2"><a href="/aboutus" className="text-decoration-none text-dark">من نحن</a></li>
              <li><a href="/collections" className="text-decoration-none text-dark">كولكشن</a></li>
            </ul>
          </div>
          
          <div className="col-md-4 text-center">
            <h5 className="fw-bold mb-3" style={{ color: '#2b5876' }}>تواصل معنا</h5>
            <div className="social-icons mb-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon me-2"
                style={{
                  color: '#4267B2',
                  background: 'white',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
                }}
              >
                <FaFacebook />
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon me-2"
                style={{
                  color: '#000000',
                  background: 'white',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
                }}
              >
                <FaTiktok />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon me-2"
                style={{
                  color: '#E1306C',
                  background: 'white',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
                }}
              >
                <FaInstagram />
              </a>
              <a
                href="https://wa.me/966500000000"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
                style={{
                  color: '#25D366',
                  background: 'white',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
                }}
              >
                <FaWhatsapp />
              </a>
            </div>
            <p className="mb-1">
              <a href="tel:+966500000000" className="text-decoration-none text-dark">+966 50 000 0000</a>
            </p>
            <p className="mb-0">
              <a href="mailto:info@ash.com" className="text-decoration-none text-dark">info@ash.com</a>
            </p>
          </div>
        </div>
        
        <hr className="my-4" style={{ borderColor: 'rgba(0,0,0,0.1)' }} />
        
        <div className="text-center">
          <p className="mb-0 text-muted">
            © {new Date().getFullYear()} اش | ASH. جميع الحقوق محفوظة
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;