// src/pages/AdminOrdersPage.tsx
import React, { useEffect, useState } from "react";
import { Container, Table, Card, Button } from "react-bootstrap";



interface Product {
  id: number;
  title: string;
  price: string;
  quantity: number;
}

interface Order {
  customer?: {
    name: string;
    address: string;
    phone: string;
  };
  cart: Product[];
  total: number;
  status?: string;
}



const AdminOrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    setOrders(storedOrders);
  }, []);

  const updateOrders = (updated: Order[]) => {
    setOrders(updated);
    localStorage.setItem("orders", JSON.stringify(updated));
  };

  const handleDeleteOrder = (index: number) => {
    const updated = [...orders];
    updated.splice(index, 1);
    updateOrders(updated);
  };

  const handleSetProcessing = (index: number) => {
    const updated = [...orders];
    updated[index].status = "قيد التجهيز";
    updateOrders(updated);
  };
  const handleSetCompleted = (index: number) => {
    const updated = [...orders];
    updated[index].status = "مكتمل";
    updateOrders(updated);
  };

  return (
    <Container className="py-5 my-5">
      <h2 className="fw-bold text-center mb-4">📦 الطلبات الواردة</h2>

      {orders.length === 0 ? (
        <p className="text-center">لا توجد طلبات حالياً.</p>
      ) : (
        orders.map((order, idx) => (
          <Card className="mb-4 shadow-sm" key={idx}>
            <Card.Header className="bg-light d-flex justify-content-between align-items-center">
              <div>
                <strong>👤 العميل:</strong> {order.customer?.name || "---"} | 🏠{" "}
                {order.customer?.address || "---"} | 📞{" "}
                {order.customer?.phone || "---"}
              </div>
              <span className="badge bg-info">{order.status || "🆕 جديد"}</span>
            </Card.Header>
            <Card.Body>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>المنتج</th>
                    <th>الكمية</th>
                    <th>السعر</th>
                    <th>الإجمالي</th>
                  </tr>
                </thead>
                <tbody>
                  {order.cart?.map((product, i) => (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{product.title}</td>
                      <td>{product.quantity}</td>
                      <td>{product.price} جنيه</td>
                      <td>{product.quantity * parseInt(product.price)} جنيه</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <h5 className="text-end text-success">
                💰 المجموع الكلي: {order.total} جنيه
              </h5>

              <div className="d-flex justify-content-end gap-2 mt-3">
                <Button
                  variant="outline-primary"
                  onClick={() => handleSetProcessing(idx)}
                >
                  🚚 قيد التجهيز
                </Button>
                    
                <Button
                  variant="outline-primary"
                  onClick={() => handleSetCompleted(idx)}
                >
                  ✅ مكتمل
                </Button>
                <Button
                  variant="outline-danger"
                  onClick={() => handleDeleteOrder(idx)}
                >
                  🗑️ حذف
                </Button>
              </div>
            </Card.Body>
          </Card>
        ))
      )}
    </Container>
  );
};

export default AdminOrdersPage;
