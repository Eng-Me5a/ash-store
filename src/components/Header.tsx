import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import { useCart } from '../context/CartContext'; // ✅ استدعاء عداد السلة

const Header = () => {
  const { cartCount } = useCart(); // ✅ نستخدم عداد السلة

  return (
    <Navbar bg="light" expand="lg" className="mb-4 shadow-sm fixed-top">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Ash
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="align-items-center gap-2">
            <NavLink to="/" className="nav-link">
              الرئيسية
            </NavLink>
            <NavLink to="/collections" className="nav-link">
              كولكشن
            </NavLink>
            <NavLink to="/products" className="nav-link">
              المنتجات
            </NavLink>
            <NavLink to="/aboutus" className="nav-link">
             نبذة عنا
            </NavLink>

            <Link to="/cart" className="btn btn-outline-dark position-relative">
              🛒 السلة
              {cartCount > 0 && (
                <span
                  className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                  style={{ fontSize: '0.7rem' }}
                >
                  {cartCount}
                </span>
              )}
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
