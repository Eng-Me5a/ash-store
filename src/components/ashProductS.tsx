import React, { useEffect, useState } from "react";
import { Card, Container, Row, Col, Button, Spinner, Badge } from "react-bootstrap";
import { FaCartPlus, FaStar, FaFire } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

interface Product {
  _id: string;
  name: string;
  image: string;
  price: number;
  quantity?: number;
  isNew?: boolean;
  isBestSeller?: boolean;
  rating?: number;
}

const AshProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { updateCartCount } = useCart();

  useEffect(() => {
    fetch("https://ash-backend1-production.up.railway.app/allproducts")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Failed to load products", err))
      .finally(() => setLoading(false));
  }, []);

  const addToCart = (product: Product, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const existingCart: Product[] = JSON.parse(localStorage.getItem("cart") || "[]");
    const updatedCart = [...existingCart];
    const existingIndex = updatedCart.findIndex((item) => item._id === product._id);

    if (existingIndex !== -1) {
      updatedCart[existingIndex].quantity = (updatedCart[existingIndex].quantity || 1) + 1;
    } else {
      updatedCart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    updateCartCount();
  };

  return (
    <section className="py-5" style={{ background: "linear-gradient(to bottom, #ffffff, #f8f9fa)" }}>
      <Container>
        <div className="text-center mb-5">
          <h2 className="fw-bold display-5 mb-3" style={{ 
            background: "linear-gradient(to right, #4e4376, #2b5876)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}>
            منتجات ASH المميزة
          </h2>
          <p className="lead text-muted">اكتشف مجموعتنا الفريدة من المنتجات عالية الجودة</p>
        </div>

        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" role="status" style={{ width: "3rem", height: "3rem" }}>
              <span className="visually-hidden">جاري التحميل...</span>
            </Spinner>
          </div>
        ) : (
          <Row className="g-4">
            {products.map((product, index) => (
              <Col key={product._id} xl={3} lg={4} md={6} className="mb-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link 
                    to={`/product/allproducts/${product._id}`} 
                    className="text-decoration-none"
                  >
                    <Card
                      className="h-100 border-0 shadow-sm overflow-hidden"
                      style={{
                        borderRadius: "16px",
                        transition: "all 0.3s ease"
                      }}
                    >
                      <div className="position-relative">
                        <Card.Img
                          variant="top"
                          src={product.image}
                          alt={product.name}
                          style={{ 
                            height: "250px", 
                            objectFit: "cover",
                            width: "100%"
                          }}
                        />
                        {product.isNew && (
                          <Badge pill bg="success" className="position-absolute top-2 start-2">
                            جديد
                          </Badge>
                        )}
                        {product.isBestSeller && (
                          <Badge pill bg="danger" className="position-absolute top-2 end-2 d-flex align-items-center">
                            <FaFire className="me-1" /> الأكثر مبيعاً
                          </Badge>
                        )}
                        {product.rating && (
                          <Badge pill bg="warning" text="dark" className="position-absolute bottom-2 start-2 d-flex align-items-center">
                            <FaStar className="me-1" /> {product.rating}
                          </Badge>
                        )}
                      </div>
                      <Card.Body className="d-flex flex-column">
                        <h5 className="fw-bold mb-2" style={{ color: "#2b5876" }}>
                          {product.name}
                        </h5>
                        <div className="mt-auto">
                          <div className="d-flex justify-content-between align-items-center">
                            <h5 className="mb-0" style={{ color: "#dc3545", fontWeight: "bold" }}>
                              {product.price.toLocaleString()} جنيه
                            </h5>
                            <Button
                              variant="primary"
                              size="sm"
                              onClick={(e) => addToCart(product, e)}
                              className="d-flex align-items-center"
                              style={{ borderRadius: "50px" }}
                            >
                              <FaCartPlus className="me-1" /> أضف للسلة
                            </Button>
                          </div>
                        </div>
                      </Card.Body>
                    </Card>
                  </Link>
                </motion.div>
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </section>
  );
};

export default AshProducts;