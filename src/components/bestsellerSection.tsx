import React, { useEffect, useState } from 'react';
import { Card, Container, Row, Col, Button, Spinner } from 'react-bootstrap';
import { FaCartPlus } from 'react-icons/fa';
import { useCart } from '../context/CartContext';

interface Product {
  id: number;
  title: string;
  image: string;
  price: string;
}

const BishtatSection = () => {
  const [bishtat, setBishtat] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { updateCartCount } = useCart();

  useEffect(() => {
    fetch('http://localhost:5000/bestseller') // اكثر مبيع
      .then(res => res.json())
      .then(data => setBishtat(data))
      .catch(err => console.error('فشل تحميل البيشتات', err))
      .finally(() => setLoading(false));
  }, []);

const addToCart = (product: Product) => {
  const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');

  const index = existingCart.findIndex((item: Product) => item.id === product.id);
  if (index !== -1) {
    // ✅ المنتج موجود: زود الكمية
    existingCart[index].quantity = (existingCart[index].quantity || 1) + 1;
  } else {
    // ✅ المنتج جديد: ضيفه مع quantity = 1
    existingCart.push({ ...product, quantity: 1 });
  }

  localStorage.setItem('cart', JSON.stringify(existingCart));
  updateCartCount();

};


  return (
    <section className="py-5 bg-body-secondary text-black">
      <Container>
        <h2 className="mb-4 text-center fw-bold">اكثر مبيعا</h2>
        {loading ? (
          <div className="text-center"><Spinner animation="border" /></div>
        ) : (
          <Row className="justify-content-center">
            {bishtat.map((item) => (
              <Col key={item.id} md={4}>
                <Card
                  className="h-100 shadow-sm text-center card-hover"
                  style={{
                    background: "#f8f9fa",
                    borderRadius: "16px",
                    border: "1px solid #dee2e6",
                    overflow: "hidden",
                  }}
                >
                  <Card.Img variant="top" src={item.image} style={{ height: "250px", objectFit: "cover" }} />
                  <Card.Body className="d-flex flex-column justify-content-between">
                    <div className="d-flex justify-content-between align-items-center mb-3 px-2">
                      <span style={{ color: "#dc3545", fontWeight: "bold", fontSize: "1.1rem" }}>{item.price}</span>
                      <Button
                        variant="dark"
                        size="sm"
                        onClick={() => addToCart(item)}
                      >
                        <FaCartPlus className="me-1" />
                        اضافه للسلة
                      </Button>
                    </div>
                    <Card.Text className="fw-semibold" style={{ fontSize: "1rem", color: "#343a40", paddingTop: "8px", borderTop: "1px solid #ccc" }}>
                      {item.title}
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

export default BishtatSection;
