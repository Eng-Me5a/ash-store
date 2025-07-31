// src/pages/CollectionsPage.tsx
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Spinner } from 'react-bootstrap';
import { FaCartPlus } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

interface Product {
  id: number;
  title: string;
  image: string;
  price: string;
  description: string;
  collection: string;
  quantity?: number;
}

const CollectionsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { updateCartCount } = useCart();

  useEffect(() => {
    fetch('http://localhost:5000/collections')
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error('فشل تحميل البيانات', err))
      .finally(() => setLoading(false));
  }, []);

  const addToCart = (product: Product) => {
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
      <h2 className="text-center fw-bold mb-5">📦 جميع الكولكشنات</h2>
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <>
          {uniqueCollections.map((collectionName) => {
            const filtered = products.filter((p) => p.collection === collectionName);
            return (
              <section className="my-5" key={collectionName}>
                <h3 className="text-center mb-4 fw-bold bg-light py-2 rounded">
                  🧷 كولكشن {collectionName}
                </h3>
                <Row>
                  {filtered.map((product) => (
                    <Col key={product.id} md={4} sm={6} xs={12} className="mb-4">
                      <Link to={`/product/collections/${product.id}`} className="text-decoration-none text-dark">
                        <Card className="h-100 shadow-sm text-center border-0">
                          <Card.Img
                            variant="top"
                            src={product.image}
                            alt={product.title}
                            style={{ height: '220px', objectFit: 'cover', borderRadius: '12px 12px 0 0' }}
                          />
                          <Card.Body className="d-flex flex-column">
                            <h5 className="fw-bold mb-2">{product.title}</h5>
                            <p className="text-muted mb-2" style={{ minHeight: '50px' }}>
                              {product.description}
                            </p>
                            <div className="d-flex justify-content-between align-items-center mt-auto">
                              <span className="text-danger fw-bold">{product.price}</span>
                              <Button
                                variant="dark"
                                size="sm"
                                onClick={(e) => {
                                  e.preventDefault(); // ميخليش الضغط على الزر يفتح اللينك
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
              </section>
            );
          })}
        </>
      )}
    </Container>
  );
};

export default CollectionsPage;
