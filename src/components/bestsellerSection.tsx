import React, { useEffect, useState } from 'react';
import { Card, Container, Row, Col, Button, Spinner, Badge } from 'react-bootstrap';
import { FaCartPlus, FaFire, FaStar } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';

interface Product {
  id: number;
  title: string;
  image: string;
  price: string;
  category?: string;
  rating?: number;
}

const BishtatSection = () => {
  const [bishtat, setBishtat] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { updateCartCount } = useCart();

  useEffect(() => {
    fetch('https://gracious-growth-production.up.railway.app/bestproduct')
      .then(res => res.json())
      .then(data => setBishtat(data))
      .catch(err => console.error('Failed to load products', err))
      .finally(() => setLoading(false));
  }, []);

  const addToCart = (product: Product) => {
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    const index = existingCart.findIndex((item: Product) => item.id === product.id);
    
    if (index !== -1) {
      existingCart[index].quantity = (existingCart[index].quantity || 1) + 1;
    } else {
      existingCart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(existingCart));
    updateCartCount();
  };

  return (
    <section className="py-5" style={{ background: 'linear-gradient(to bottom, #ffffff, #f8f9fa)' }}>
      <Container>
        <div className="text-center mb-5">
          <h2 className="fw-bold display-5 mb-3" style={{ 
            background: 'linear-gradient(to right, #4e4376, #2b5876)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            البيشتات الأكثر مبيعاً
          </h2>
          <p className="lead text-muted">تصفح أفضل البيشتات المميزة لدى عملائنا</p>
        </div>

        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" role="status" style={{ width: '3rem', height: '3rem' }}>
              <span className="visually-hidden">جاري التحميل...</span>
            </Spinner>
          </div>
        ) : (
          <Row className="g-4">
            {bishtat.map((item, index) => (
              <Col key={item.id} xl={3} lg={4} md={6} className="mb-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card
                    className="h-100 border-0 shadow-hover"
                    style={{
                      borderRadius: '16px',
                      overflow: 'hidden',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    <div className="position-relative">
                      <Card.Img 
                        variant="top" 
                        src={item.image} 
                        style={{ 
                          height: '300px', 
                          objectFit: 'cover',
                          width: '100%'
                        }} 
                      />
                      <Badge 
                        pill 
                        bg="danger" 
                        className="position-absolute top-0 start-0 m-3 d-flex align-items-center"
                      >
                        <FaFire className="me-1" /> الأكثر مبيعاً
                      </Badge>
                      {item.rating && (
                        <Badge 
                          pill 
                          bg="warning" 
                          text="dark" 
                          className="position-absolute top-0 end-0 m-3 d-flex align-items-center"
                        >
                          <FaStar className="me-1" /> {item.rating}
                        </Badge>
                      )}
                    </div>
                    
                    <Card.Body className="d-flex flex-column">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <Card.Title className="mb-0 fw-bold" style={{ color: '#2b5876' }}>
                          {item.title}
                        </Card.Title>
                        {item.category && (
                          <small className="text-muted">{item.category}</small>
                        )}
                      </div>
                      
                      <div className="mt-auto">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <h5 className="mb-0" style={{ color: '#dc3545', fontWeight: 'bold' }}>
                            {item.price}
                          </h5>
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={() => addToCart(item)}
                            className="d-flex align-items-center"
                            style={{ borderRadius: '50px' }}
                          >
                            <FaCartPlus className="me-1" />
                            أضف للسلة
                          </Button>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </section>
  );
};

export default BishtatSection;