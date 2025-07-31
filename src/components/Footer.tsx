import React from 'react';
import { Container } from 'react-bootstrap';
import { FaFacebook, FaInstagram, FaTiktok } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-body-secondary text-black py-4 mt-5">
      <Container className="text-center">
        <div className="mb-3">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black me-3 fs-4"
          >
            <FaFacebook />
          </a>
          <a
            href="https://tiktok.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black me-3 fs-4"
          >
            <FaTiktok />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black fs-4"
          >
            <FaInstagram />
          </a>
        </div>
        <p className="mb-1">اش | منتجات مطبوعة ومخصصة لذوقك الخاص</p>
        <p className="mb-0">© 2025 جميع الحقوق محفوظة</p>
      </Container>
    </footer>
  );
};

export default Footer;
