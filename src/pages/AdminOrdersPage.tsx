import React, { useEffect, useState } from "react";
import { Container, Table, Card, Button, Badge, Spinner, Alert } from "react-bootstrap";
import { FaTrash, FaCheck, FaTruck, FaUser, FaHome, FaPhone, FaMoneyBillWave } from "react-icons/fa";
import Swal from "sweetalert2";
import axios from "axios";

interface Product {
  id: number;
  title: string;
  price: string;
  quantity: number;
}

interface Order {
  _id: string;
  customer?: {
    name: string;
    address: string;
    phone: string;
    notes?: string;
  };
  cart: Product[];
  total: number;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
}

const API_URL = "https://gracious-growth-production.up.railway.app/orders";

const AdminOrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState("all");

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await axios.get<Order[]>(API_URL);
      setOrders(data.reverse());
    } catch (err) {
      console.error("فشل في جلب الطلبات", err);
      setError("فشل في تحميل الطلبات. يرجى المحاولة مرة أخرى.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleDeleteOrder = async (id: string) => {
    try {
      const result = await Swal.fire({
        title: "حذف الطلب",
        text: "هل أنت متأكد من حذف هذا الطلب؟ لا يمكن التراجع عن هذه العملية",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "نعم، احذف",
        cancelButtonText: "إلغاء",
        confirmButtonColor: "#d33",
        reverseButtons: true
      });

      if (result.isConfirmed) {
        await axios.delete(`${API_URL}/${id}`);
        await fetchOrders(); // إعادة جلب البيانات بعد الحذف
        Swal.fire("تم الحذف!", "تم حذف الطلب بنجاح.", "success");
      }
    } catch (err) {
      console.error("فشل في حذف الطلب", err);
      Swal.fire("خطأ!", "فشل في حذف الطلب.", "error");
    }
  };

  const updateOrderStatus = async (id: string, status: string) => {
    try {
      await axios.patch(`${API_URL}/${id}`, { status });
      await fetchOrders(); // إعادة جلب البيانات بعد التحديث
    } catch (err) {
      console.error("فشل في تحديث حالة الطلب", err);
      Swal.fire("خطأ!", "فشل في تحديث حالة الطلب.", "error");
    }
  };

  const filteredOrders = orders.filter(order => {
    if (filter === "all") return true;
    if (filter === "new") return !order.status;
    return order.status === filter;
  });

  const getStatusBadge = (status?: string) => {
    switch (status) {
      case "قيد التجهيز":
        return <Badge bg="warning" className="py-2 px-3"><FaTruck className="me-1" /> {status}</Badge>;
      case "مكتمل":
        return <Badge bg="success" className="py-2 px-3"><FaCheck className="me-1" /> {status}</Badge>;
      default:
        return <Badge bg="primary" className="py-2 px-3">جديد</Badge>;
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "---";
    const date = new Date(dateString);
    return date.toLocaleDateString("ar-EG", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  return (
    <Container className="py-4" fluid="lg">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold mb-0">إدارة الطلبات</h2>
        <div>
          <Button
            variant={filter === "all" ? "primary" : "outline-primary"}
            size="sm"
            className="me-2"
            onClick={() => setFilter("all")}
          >
            الكل
          </Button>
          <Button
            variant={filter === "new" ? "primary" : "outline-primary"}
            size="sm"
            className="me-2"
            onClick={() => setFilter("new")}
          >
            جديدة
          </Button>
          <Button
            variant={filter === "قيد التجهيز" ? "primary" : "outline-primary"}
            size="sm"
            className="me-2"
            onClick={() => setFilter("قيد التجهيز")}
          >
            قيد التجهيز
          </Button>
          <Button
            variant={filter === "مكتمل" ? "primary" : "outline-primary"}
            size="sm"
            onClick={() => setFilter("مكتمل")}
          >
            مكتملة
          </Button>
        </div>
      </div>

      {error && (
        <Alert variant="danger" className="mb-4">
          {error}
        </Alert>
      )}

      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" variant="primary" />
          <p className="mt-2">جاري تحميل الطلبات...</p>
        </div>
      ) : filteredOrders.length === 0 ? (
        <Card className="text-center py-5">
          <Card.Body>
            <h5 className="text-muted">لا توجد طلبات</h5>
            <p className="text-muted mb-0">لا يوجد طلبات تطابق معايير البحث</p>
          </Card.Body>
        </Card>
      ) : (
        filteredOrders.map((order) => (
          <Card className="mb-4 shadow-sm border-0" key={order._id}>
            <Card.Header className="bg-light d-flex justify-content-between align-items-center py-3">
              <div className="d-flex flex-wrap align-items-center gap-3">
                <div className="d-flex align-items-center">
                  <FaUser className="text-muted me-2" />
                  <span>{order.customer?.name || "---"}</span>
                </div>
                <div className="d-flex align-items-center">
                  <FaHome className="text-muted me-2" />
                  <span>{order.customer?.address || "---"}</span>
                </div>
                <div className="d-flex align-items-center">
                  <FaPhone className="text-muted me-2" />
                  <span>{order.customer?.phone || "---"}</span>
                </div>
                <div className="text-muted small">
                  {formatDate(order.createdAt)}
                </div>
              </div>
              <div>
                {getStatusBadge(order.status)}
              </div>
            </Card.Header>
            <Card.Body>
              {order.customer?.notes && (
                <Alert variant="info" className="text-end">
                  <strong>ملاحظات العميل:</strong> {order.customer.notes}
                </Alert>
              )}

              <div className="table-responsive">
                <Table striped bordered hover className="mb-4">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>المنتج</th>
                      <th className="text-center">الكمية</th>
                      <th className="text-end">السعر</th>
                      <th className="text-end">الإجمالي</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.cart?.map((product, i) => (
                      <tr key={i}>
                        <td>{i + 1}</td>
                        <td>{product.title}</td>
                        <td className="text-center">{product.quantity}</td>
                        <td className="text-end">{product.price} جنيه</td>
                        <td className="text-end">{product.quantity * parseInt(product.price)} جنيه</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>

              <div className="d-flex justify-content-between align-items-center mt-3">
                <div className="d-flex gap-2">
                  <Button
                    variant={order.status === "قيد التجهيز" ? "warning" : "outline-warning"}
                    onClick={() => updateOrderStatus(order._id, "قيد التجهيز")}
                    size="sm"
                  >
                    <FaTruck className="me-1" /> قيد التجهيز
                  </Button>
                  <Button
                    variant={order.status === "مكتمل" ? "success" : "outline-success"}
                    onClick={() => updateOrderStatus(order._id, "مكتمل")}
                    size="sm"
                  >
                    <FaCheck className="me-1" /> مكتمل
                  </Button>
                  <Button
                    variant="outline-danger"
                    onClick={() => handleDeleteOrder(order._id)}
                    size="sm"
                  >
                    <FaTrash className="me-1" /> حذف
                  </Button>
                </div>
                <div className="d-flex align-items-center">
                  <FaMoneyBillWave className="text-success me-2" size={20} />
                  <h5 className="mb-0 text-success">
                    المجموع: {order.total} جنيه
                  </h5>
                </div>
              </div>
            </Card.Body>
          </Card>
        ))
      )}
    </Container>
  );
};

export default AdminOrdersPage;