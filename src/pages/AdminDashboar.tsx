import React, { useEffect, useState } from 'react';
import { Container, Table, Button, Form, Row, Col, Spinner, Card, Alert, Badge } from 'react-bootstrap';
import { FaTrash, FaPlus, FaEdit, FaSignOutAlt, FaImage } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

interface Product {
  id?: number;
  _id?: string;
  title?: string;
  name?: string;
  price: string | number;
  image?: string;
  imageUrl?: string;
  description?: string;
  collection?: string;
}

const API_BASE = 'https://ash-backend1-production.up.railway.app';

const AdminDashboard = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [section, setSection] = useState('bestproduct');
  const [newProduct, setNewProduct] = useState<Omit<Product, 'id' | '_id'>>({
    title: '',
    price: '',
    image: '',
    description: '',
    collection: '',
  });
  const [error, setError] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('adminAuth') === 'true';
    if (!isLoggedIn) navigate('/login');
  }, [navigate]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/${section}`);
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      console.error(err);
      setError('فشل تحميل البيانات');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [section]);

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    navigate('/login');
  };

  const handleDelete = (id: number | string = '') => {
    Swal.fire({
      title: 'هل أنت متأكد؟',
      text: 'لا يمكن استعادة المنتج بعد الحذف',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'نعم، احذف',
      cancelButtonText: 'إلغاء'
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${API_BASE}/${section}/${id}`, {
          method: 'DELETE',
        })
          .then(() => {
            fetchProducts();
            Swal.fire('تم الحذف!', 'تم حذف المنتج بنجاح.', 'success');
          })
          .catch((err) => {
            console.error(err);
            Swal.fire('خطأ!', 'فشل حذف المنتج.', 'error');
          });
      }
    });
  };

  const handleAdd = async () => {
    if (!newProduct.title || !newProduct.price || !newProduct.image) {
      setError('الرجاء تعبئة جميع الحقول المطلوبة');
      return;
    }

    try {
      const response = await fetch(`${API_BASE}/${section}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct),
      });

      if (!response.ok) throw new Error('Failed to add product');

      setNewProduct({ title: '', price: '', image: '', description: '', collection: '' });
      setError('');
      await fetchProducts();
      Swal.fire('تمت الإضافة!', 'تم إضافة المنتج بنجاح.', 'success');
    } catch (err) {
      console.error(err);
      setError('فشل إضافة المنتج');
    }
  };

  return (
    <Container className="py-4" fluid="lg">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold mb-0">
          <Badge bg="primary" className="me-2">لوحة التحكم</Badge>
        </h2>
        <Button variant="outline-danger" onClick={handleLogout} size="sm">
          <FaSignOutAlt className="me-1" /> تسجيل الخروج
        </Button>
      </div>

      <Card className="mb-4 shadow-sm">
        <Card.Body>
          <Row className="align-items-center mb-3">
            <Col md={3}>
              <Form.Label className="fw-bold">اختيار القسم:</Form.Label>
              <Form.Select 
                value={section} 
                onChange={(e) => setSection(e.target.value)}
                size="sm"
              >
                <option value="bestproduct">منتجات مميزة</option>
                <option value="bestseller">الأكثر مبيعًا</option>
                <option value="allproducts">كل المنتجات</option>
                <option value="collections">الكولكشنات</option>
              </Form.Select>
            </Col>
            <Col md={9} className="text-end">
              <Badge bg="info" pill>
                {products.length} منتج
              </Badge>
            </Col>
          </Row>

          {error && <Alert variant="danger">{error}</Alert>}

          <h5 className="mb-3 mt-4">إضافة منتج جديد</h5>
          <Row className="g-2">
            <Col md={3}>
              <Form.Control
                placeholder="الاسم"
                value={newProduct.title}
                onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
                size="sm"
              />
            </Col>
            <Col md={2}>
              <Form.Control
                placeholder="السعر"
                value={newProduct.price}
                onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                size="sm"
              />
            </Col>
            <Col md={3}>
              <Form.Control
                placeholder="رابط الصورة"
                value={newProduct.image}
                onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                size="sm"
              />
            </Col>
            {section === 'collections' && (
              <>
                <Col md={2}>
                  <Form.Control
                    placeholder="الوصف"
                    value={newProduct.description}
                    onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                    size="sm"
                  />
                </Col>
                <Col md={2}>
                  <Form.Control
                    placeholder="الكولكشن"
                    value={newProduct.collection}
                    onChange={(e) => setNewProduct({ ...newProduct, collection: e.target.value })}
                    size="sm"
                  />
                </Col>
              </>
            )}
            <Col md={12} className="mt-2">
              <Button variant="success" onClick={handleAdd} size="sm">
                <FaPlus className="me-1" /> إضافة منتج
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Card className="shadow-sm">
        <Card.Body>
          <div className="table-responsive">
            {loading ? (
              <div className="text-center py-5">
                <Spinner animation="border" variant="primary" />
              </div>
            ) : (
              <Table striped bordered hover className="mb-0">
                <thead className="table-dark">
                  <tr>
                    <th>#</th>
                    <th>الاسم</th>
                    <th>السعر</th>
                    {section === 'collections' && (
                      <>
                        <th>الوصف</th>
                        <th>الكولكشن</th>
                      </>
                    )}
                    <th>الصورة</th>
                    <th>الإجراءات</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product, idx) => (
                    <tr key={(product._id || product.id || idx).toString()}>
                      <td>{idx + 1}</td>
                      <td>{product.title || product.name}</td>
                      <td>{product.price}</td>
                      {section === 'collections' && (
                        <>
                          <td className="small">{product.description}</td>
                          <td>{product.collection}</td>
                        </>
                      )}
                      <td className="text-center">
                        {product.image || product.imageUrl ? (
                          <img
                            src={product.image || product.imageUrl}
                            alt={product.title || product.name}
                            width="50"
                            height="50"
                            className="img-thumbnail"
                          />
                        ) : (
                          <FaImage className="text-muted" />
                        )}
                      </td>
                      <td>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => handleDelete(product._id || product.id || '')}
                          className="me-2"
                        >
                          <FaTrash />
                        </Button>
                        <Button variant="outline-primary" size="sm">
                          <FaEdit />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AdminDashboard;