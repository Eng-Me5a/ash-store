import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Alert, Card } from 'react-bootstrap';
import { FaLock, FaUser } from 'react-icons/fa';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      if (username === 'admin' && password === 'admin123') {
        localStorage.setItem('adminAuth', 'true');
        navigate('/admin');
      } else {
        setError('اسم المستخدم أو كلمة المرور غير صحيحة');
      }
      setLoading(false);
    }, 800);
  };

  return (
    <Container className="d-flex align-items-center justify-content-center my-5" style={{ minHeight: '80vh' }}>
      <Card className="shadow-sm border-0" style={{ width: '100%', maxWidth: '400px' }}>
        <Card.Body className="p-4">
          <div className="text-center mb-4">
            <div className="bg-primary bg-opacity-10 d-inline-flex p-3 rounded-circle mb-3">
              <FaLock size={28} className="text-primary" />
            </div>
            <h4 className="fw-bold">تسجيل الدخول</h4>
            <p className="text-muted">أدخل بياناتك للوصول إلى لوحة التحكم</p>
          </div>

          {error && (
            <Alert variant="danger" className="text-center py-2">
              {error}
            </Alert>
          )}

          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3">
              <Form.Label className="d-flex align-items-center gap-2 text-muted">
                <FaUser size={14} /> اسم المستخدم
              </Form.Label>
              <Form.Control
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder="أدخل اسم المستخدم"
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label className="d-flex align-items-center gap-2 text-muted">
                <FaLock size={14} /> كلمة المرور
              </Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="أدخل كلمة المرور"
              />
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              className="w-100 py-2"
              disabled={loading}
            >
              {loading ? 'جاري التحقق...' : 'تسجيل الدخول'}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default LoginPage;