import React, { useEffect, useState } from 'react';
import { Card, Col, Container, Row, Button, Spinner } from 'react-bootstrap';
import { FaCartPlus } from 'react-icons/fa';
import { useCart } from '../context/CartContext';

// تحديث واجهة Product لتتوافق مع الموديل الجديد
interface Product {
  _id: string; // المعرف الآن هو _id من MongoDB
  name: string; // الاسم الآن هو name بدلاً من title
  imageUrl: string; // الصورة الآن هي imageUrl بدلاً من image
  price: number; // السعر الآن هو number بدلاً من string
  quantity?: number; // مضافة هنا
}

const ProductGrid = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { updateCartCount } = useCart();


useEffect(() => {
  fetch('https://ash-backend1-production.up.railway.app/bestseller')
    .then(res => res.json())
    .then(data => setProducts(data))
    .catch(err => console.error('فشل تحميل البيشتات', err))
    .finally(() => setLoading(false));
}, []);

  const addToCart = (product: Product) => {
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');

    const index = existingCart.findIndex((item: Product) => item._id === product._id); // استخدام _id للمقارنة
    if (index !== -1) {
      // المنتج موجود: زود الكمية
      existingCart[index].quantity = (existingCart[index].quantity || 1) + 1;
    } else {
      // المنتج جديد: ضيفه مع quantity = 1
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
            {products.map((product) => (
              <Col key={product._id} md={4} className="mb-4"> {/* استخدام _id كـ key */}
                <Card
                  className="h-100 shadow-sm text-center card-hover"
                  style={{
                    background: '#f8f9fa',
                    borderRadius: '16px',
                    border: '1px solid #dee2e6',
                    overflow: 'hidden',
                  }}
                >
                  <Card.Img variant="top" src={product.imageUrl} style={{ height: '250px', objectFit: 'cover' }} /> {/* استخدام imageUrl بدلاً من image */}
                  <Card.Body className="d-flex flex-column justify-content-between">
                    <div className="d-flex justify-content-between align-items-center mb-3 px-2">
                      <span style={{ color: '#dc3545', fontWeight: 'bold', fontSize: '1.1rem' }}>{product.price} جنيه</span> {/* استخدام price كـ number */}
                      <Button
                        variant="dark"
                        size="sm"
                        onClick={() => addToCart(product)}
                      >
                        <FaCartPlus className="me-1" />
                        أضف للسلة
                      </Button>
                    </div>
                    <Card.Text className="fw-semibold" style={{ fontSize: '1rem', color: '#343a40', paddingTop: '8px', borderTop: '1px solid #ccc' }}>
                      {product.name} {/* استخدام name بدلاً من title */}
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
