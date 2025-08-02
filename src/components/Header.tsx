import React from 'react';
import { Container, Nav, Navbar, Button, Badge } from 'react-bootstrap';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { FaShoppingCart, FaUser, FaSignOutAlt } from 'react-icons/fa';

const Header = () => {
  const { cartCount } = useCart();
  const isLoggedIn = localStorage.getItem('adminAuth') === 'true';
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    navigate('/login');
  };

  return (
    <Navbar 
      expand="lg" 
      className="py-3 shadow-sm fixed-top"
      style={{
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(0, 0, 0, 0.1)'
      }}
    >
      <Container>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <span 
            style={{
              fontSize: '1.8rem',
              fontWeight: '700',
              background: 'linear-gradient(to right, #4e4376, #2b5876)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            ASH
          </span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" className="border-0">
          <span className="navbar-toggler-icon"></span>
        </Navbar.Toggle>
        
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="align-items-center gap-3">
            <NavLink 
              to="/" 
              className="nav-link position-relative"
              style={({ isActive }) => ({
                fontWeight: isActive ? '600' : '400',
                color: isActive ? '#4e4376' : '#333'
              })}
            >
              الرئيسية
            </NavLink>
            
            <NavLink 
              to="/collections" 
              className="nav-link position-relative"
              style={({ isActive }) => ({
                fontWeight: isActive ? '600' : '400',
                color: isActive ? '#4e4376' : '#333'
              })}
            >
              كولكشن
            </NavLink>
            
            <NavLink 
              to="/products" 
              className="nav-link position-relative"
              style={({ isActive }) => ({
                fontWeight: isActive ? '600' : '400',
                color: isActive ? '#4e4376' : '#333'
              })}
            >
              المنتجات
            </NavLink>
            
            <NavLink 
              to="/aboutus" 
              className="nav-link position-relative"
              style={({ isActive }) => ({
                fontWeight: isActive ? '600' : '400',
                color: isActive ? '#4e4376' : '#333'
              })}
            >
              نبذة عنا
            </NavLink>

            <Link 
              to="/cart" 
              className="position-relative d-flex align-items-center text-decoration-none"
              style={{
                color: '#333',
                padding: '0.5rem 1rem',
                borderRadius: '50px',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(0, 0, 0, 0.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
              }}
            >
              <FaShoppingCart className="me-2" style={{ fontSize: '1.2rem' }} />
              السلة
              {cartCount > 0 && (
                <Badge 
                  pill 
                  bg="danger"
                  className="position-absolute top-0 start-100 translate-middle"
                  style={{ 
                    fontSize: '0.65rem',
                    padding: '0.35em 0.5em'
                  }}
                >
                  {cartCount}
                </Badge>
              )}
            </Link>

            {isLoggedIn ? (
              <Button 
                variant="outline-danger" 
                size="sm" 
                onClick={handleLogout}
                className="d-flex align-items-center gap-1"
              >
                <FaSignOutAlt /> تسجيل الخروج
              </Button>
            ) : (
              <Link 
                to="/login" 
                className="btn btn-outline-primary btn-sm d-flex align-items-center gap-1"
              >
                <FaUser /> تسجيل الدخول
              </Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;