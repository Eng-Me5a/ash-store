// src/pages/LoginPage.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Alert } from 'react-bootstrap';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    // بيانات الدخول الوهمية
    if (username === 'admin' && password === 'admin123') {
      localStorage.setItem('adminAuth', 'true');
      navigate('/admin');
    } else {
      setError('❌ اسم المستخدم أو كلمة المرور غير صحيحة');
    }
  };

  return (
    <Container className="py-5 my-5" style={{ maxWidth: '400px' }}>
      <h3 className="text-center mb-4">🔐 تسجيل الدخول</h3>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form>
        <Form.Group className="mb-3 ">
          <Form.Label>اسم المستخدم</Form.Label>
          <Form.Control type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>كلمة المرور</Form.Label>
          <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </Form.Group>
        <Button variant="dark" onClick={handleLogin} className="w-100">
          دخول
        </Button>
      </Form>
    </Container>
  );
};

export default LoginPage;
