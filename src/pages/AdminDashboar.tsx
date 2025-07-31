import React, { useEffect, useState } from 'react';
import { Container, Table, Button, Form, Row, Col, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

interface Product {
  id: number;
  title: string;
  price: string;
  image: string;
  description?: string;
  collection?: string;
}

const AdminDashboard = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [section, setSection] = useState('bestproduct');
  const [newProduct, setNewProduct] = useState<Omit<Product, 'id'>>({
    title: '',
    price: '',
    image: '',
    description: '',
    collection: '',
  });

  const navigate = useNavigate();
  useEffect(() => {
  const isLoggedIn = localStorage.getItem('adminAuth') === 'true';
  if (!isLoggedIn) navigate('/login');
}, [navigate]);


  const fetchProducts = () => {
    setLoading(true);
    fetch(`http://localhost:5000/${section}`)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchProducts();
  }, [section]);

  const handleDelete = (id: number) => {
    fetch(`http://localhost:5000/${section}/${id}`, {
      method: 'DELETE',
    })
      .then(() => fetchProducts())
      .catch((err) => console.error(err));
  };

  const handleAdd = () => {
    fetch(`http://localhost:5000/${section}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProduct),
    })
      .then(() => {
        setNewProduct({ title: '', price: '', image: '', description: '', collection: '' });
        fetchProducts();
      })
      .catch((err) => console.error(err));
  };

  return (
    <Container className="py-5 my-5">
      <h2 className="mb-4 fw-bold text-center">🎛️ لوحة التحكم</h2>

      <Form.Group as={Row} className="mb-4">
        <Form.Label column md={2} className="fw-bold">اختيار القسم:</Form.Label>
        <Col md={4}>
          <Form.Select value={section} onChange={(e) => setSection(e.target.value)}>
            <option value="bestproduct">منتجات مميزة</option>
            <option value="bestseller">الاكثر مبيعا</option>
            <option value="allproducts">كل المنتجات</option>
            <option value="collections">الكولكشنات</option>
          </Form.Select>
        </Col>
      </Form.Group>

      <h4 className="mt-4 mb-3">➕ إضافة منتج جديد</h4>
      <Row>
        <Col md={2}><Form.Control placeholder="الاسم" value={newProduct.title} onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })} /></Col>
        <Col md={2}><Form.Control placeholder="السعر" value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} /></Col>
        <Col md={3}><Form.Control placeholder="رابط الصورة" value={newProduct.image} onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })} /></Col>
        {section === 'collections' && (
          <>
            <Col md={3}><Form.Control placeholder="الوصف" value={newProduct.description} onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })} /></Col>
            <Col md={2}><Form.Control placeholder="الكولكشن" value={newProduct.collection} onChange={(e) => setNewProduct({ ...newProduct, collection: e.target.value })} /></Col>
          </>
        )}
        <Col md={12} className="mt-2">
          <Button variant="success" onClick={handleAdd}>✔️ إضافة</Button>
        </Col>
      </Row>

      <hr className="my-5" />

      <h4 className="mb-3">📋 المنتجات</h4>
      {loading ? (
        <Spinner animation="border" />
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>الاسم</th>
              <th>السعر</th>
              {section === 'collections' && <><th>الوصف</th><th>الكولكشن</th></>}
              <th>صورة</th>
              <th>حذف</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, idx) => (
              <tr key={product.id}>
                <td>{idx + 1}</td>
                <td>{product.title}</td>
                <td>{product.price}</td>
                {section === 'collections' && <><td>{product.description}</td><td>{product.collection}</td></>}
                <td><img src={product.image} alt={product.title} width="50" /></td>
                <td>
                  <Button variant="danger" size="sm" onClick={() => handleDelete(product.id)}>حذف</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default AdminDashboard;
