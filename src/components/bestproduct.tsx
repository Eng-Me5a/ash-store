import React, { useEffect, useState } from 'react';
import { Card, Col, Container, Row, Button, Spinner } from 'react-bootstrap';
import { FaCartPlus } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { API_BASE_URL } from '../config'; // <-- استيراد الرابط

interface Product {
  _id: string;
  name: string;
  imageUrl: string;
  price: number;
  quantity?: number;
}

const ProductGrid = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { updateCartCount } = useCart();

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/products/bestproduct`)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then(data => setProducts(data))
      .catch(err => console.error('فشل تحميل المنتجات:', err))
      .finally(() => setLoading(false));
  }, []);

  const addToCart = (product: Product) => {
    const existingCart: Product[] = JSON.parse(localStorage.getItem('cart') || '[]');
    const index = existingCart.findIndex(item => item._id === product._id);

    if (index !== -1) {
      existingCart[index].quantity = (existingCart[index].quantity || 1) + 1;
    } else {
      existingCart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(existingCart));
    updateCartCount();
  };

  return (
    <section className="py-5 bg-white">
      <Container>
        <h2 className="mb-4 text-center fw-bold">افضل منتجاتنا</h2>
        {loading ? (
          <div className="text-center"><Spinner animation="border" /></div>
        ) : (
          <Row>
            {products.map(product => (
              <Col key={product._id} md={4} className="mb-4">
                <Card className="h-100 shadow-sm text-center card-hover" style={{
                  background: '#f8f9fa',
                  borderRadius: '16px',
                  border: '1px solid #dee2e6',
                  overflow: 'hidden',
                }}>
                  <Card.Img variant="top" src={product.imageUrl} style={{ height: '250px', objectFit: 'cover' }} />
                  <Card.Body className="d-flex flex-column justify-content-between">
                    <div className="d-flex justify-content-between align-items-center mb-3 px-2">
                      <span style={{ color: '#dc3545', fontWeight: 'bold', fontSize: '1.1rem' }}>{product.price} جنيه</span>
                      <Button variant="dark" size="sm" onClick={() => addToCart(product)}>
                        <FaCartPlus className="me-1" /> أضف للسلة
                      </Button>
                    </div>
                    <Card.Text className="fw-semibold" style={{ fontSize: '1rem', color: '#343a40', paddingTop: '8px', borderTop: '1px solid #ccc' }}>
                      {product.name}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </section>
  );
};

export default ProductGrid;
