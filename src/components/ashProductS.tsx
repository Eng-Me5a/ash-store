// src/components/AshProducts.tsx
import React, { useEffect, useState } from 'react';
import { Card, Col, Container, Row, Button, Spinner } from 'react-bootstrap';
import { FaCartPlus } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

interface Product {
  _id: string;
  name: string;
  imageUrl: string;
  price: number;
  quantity?: number;
}

const AshProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { updateCartCount } = useCart();


useEffect(() => {
  fetch('https://ash-backend1-production.up.railway.app/allproducts')
    .then(res => res.json())
    .then(data => setProducts(data))
    .catch(err => console.error('فشل تحميل البيشتات', err))
    .finally(() => setLoading(false));
}, []);

  const addToCart = (product: Product) => {
    const existingCart: Product[] = JSON.parse(localStorage.getItem('cart') || '[]');
    const updatedCart = [...existingCart];
    const existingIndex = updatedCart.findIndex((item) => item._id === product._id);

    if (existingIndex !== -1) {
      updatedCart[existingIndex].quantity = (updatedCart[existingIndex].quantity || 1) + 1;
    } else {
      updatedCart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(updatedCart));
    updateCartCount();
  };

  return (
    <section className="py-5 bg-light">
      <Container>
        <h2 className="mb-4 my-5 text-center fw-bold">🛜️ منتجات Ash</h2>

        {loading ? (
          <div className="text-center"><Spinner animation="border" /></div>
        ) : (
          <Row>
            {products.map((product) => (
              <Col key={product._id} md={4} sm={6} xs={12} className="mb-4">
                <Link to={`/product/allproducts/${product._id}`} className="text-decoration-none text-dark">
                  <Card className="h-100 shadow-sm text-center card-hover border-0">
                    <Card.Img
                      variant="top"
                      src={product.imageUrl}
                      alt={product.name}
                      style={{ height: '250px', objectFit: 'cover', borderTopLeftRadius: '16px', borderTopRightRadius: '16px' }}
                    />
                    <Card.Body className="d-flex flex-column justify-content-between">
                      <Card.Text className="fw-bold fs-5 mb-2">{product.name}</Card.Text>
                      <div className="d-flex justify-content-between align-items-center mt-auto">
                        <span className="text-danger fw-bold fs-6">{product.price} جنيه</span>
                        <Button
                          variant="dark"
                          size="sm"
                          onClick={(e) => {
                            e.preventDefault();
                            addToCart(product);
                          }}
                        >
                          <FaCartPlus className="me-1" /> أضف للسلة
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Link>
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </section>
  );
};

export default AshProducts;
