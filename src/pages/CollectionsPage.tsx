import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Spinner, Badge } from 'react-bootstrap';
import { FaCartPlus, FaTags, FaArrowLeft } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

interface Product {
  id: number;
  title: string;
  image: string;
  price: string;
  description: string;
  collection: string;
  quantity?: number;
  isNew?: boolean;
}

const CollectionsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { updateCartCount } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://ash-backend1-production.up.railway.app/collections')
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error('Failed to load data', err))
      .finally(() => setLoading(false));
  }, []);

  const addToCart = (product: Product, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const existingCart: Product[] = JSON.parse(localStorage.getItem('cart') || '[]');
    const updatedCart = [...existingCart];
    const existingIndex = updatedCart.findIndex((item) => item.id === product.id);

    if (existingIndex !== -1) {
      updatedCart[existingIndex].quantity = (updatedCart[existingIndex].quantity || 1) + 1;
    } else {
      updatedCart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(updatedCart));
    updateCartCount();
  };

  const uniqueCollections = Array.from(new Set(products.map((p) => p.collection)));

  return (
    <Container className="py-5">
      <Button 
        variant="outline-secondary" 
        onClick={() => navigate(-1)} 
        className="mb-4 d-flex align-items-center"
      >
        <FaArrowLeft className="me-2" /> رجوع
      </Button>

      <h2 className="text-center fw-bold mb-5 display-5" style={{
        background: 'linear-gradient(to right, #4e4376, #2b5876)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent'
      }}>
        <FaTags className="me-3" /> مجموعاتنا الفريدة
      </h2>

      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" variant="primary" style={{ width: '3rem', height: '3rem' }} />
          <p className="mt-3">جاري تحميل المجموعات...</p>
        </div>
      ) : (
        <>
          {uniqueCollections.map((collectionName) => {
            const filtered = products.filter((p) => p.collection === collectionName);
            return (
              <motion.section 
                className="my-5"
                key={collectionName}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="d-flex align-items-center justify-content-center mb-4">
                  <div className="flex-grow-1 border-top" style={{ borderColor: '#dee2e6' }}></div>
                  <h3 className="mx-4 text-center mb-0 fw-bold px-3 py-2" style={{
                    color: '#2b5876',
                    backgroundColor: '#f8f9fa',
                    borderRadius: '50px'
                  }}>
                    مجموعة {collectionName}
                  </h3>
                  <div className="flex-grow-1 border-top" style={{ borderColor: '#dee2e6' }}></div>
                </div>

                <Row className="g-4">
                  {filtered.map((product) => (
                    <Col key={product.id} xl={3} lg={4} md={6} className="mb-4">
                      <motion.div
                        whileHover={{ y: -5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Link 
                          to={`/product/collections/${product.id}`} 
                          className="text-decoration-none"
                        >
                          <Card className="h-100 shadow-sm border-0 overflow-hidden">
                            <div className="position-relative">
                              <Card.Img
                                variant="top"
                                src={product.image}
                                alt={product.title}
                                style={{ 
                                  height: '250px', 
                                  objectFit: 'cover',
                                  transition: 'transform 0.3s ease'
                                }}
                                className="card-img-hover"
                              />
                              {product.isNew && (
                                <Badge 
                                  pill 
                                  bg="success" 
                                  className="position-absolute top-2 start-2"
                                >
                                  جديد
                                </Badge>
                              )}
                            </div>
                            <Card.Body className="d-flex flex-column">
                              <h5 className="fw-bold mb-2" style={{ color: '#343a40' }}>
                                {product.title}
                              </h5>
                              <p className="text-muted mb-3" style={{ 
                                minHeight: '50px',
                                fontSize: '0.9rem'
                              }}>
                                {product.description.length > 80 
                                  ? `${product.description.substring(0, 80)}...` 
                                  : product.description}
                              </p>
                              <div className="d-flex justify-content-between align-items-center mt-auto">
                                <span className="text-danger fw-bold fs-5">
                                  {product.price}
                                </span>
                                <Button
                                  variant="primary"
                                  size="sm"
                                  onClick={(e) => addToCart(product, e)}
                                  className="d-flex align-items-center"
                                  style={{ borderRadius: '50px' }}
                                >
                                  <FaCartPlus className="me-1" /> أضف
                                </Button>
                              </div>
                            </Card.Body>
                          </Card>
                        </Link>
                      </motion.div>
                    </Col>
                  ))}
                </Row>
              </motion.section>
            );
          })}
        </>
      )}
    </Container>
  );
};

export default CollectionsPage;