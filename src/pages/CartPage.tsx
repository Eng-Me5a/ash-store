// src/pages/CartPage.tsx
import React, { useEffect, useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import { useCart } from '../context/CartContext';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

interface Product {
  id: number;
  title: string;
  image: string;
  price: string;
  quantity?: number;
}

const CartPage = () => {
  const [cart, setCart] = useState<Product[]>([]);
  const { updateCartCount } = useCart();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(storedCart);
  }, []);

  useEffect(() => {
    updateCartCount();
  }, [cart]);

  const updateLocalStorage = (updatedCart: Product[]) => {
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setCart(updatedCart);
  };

  const removeFromCart = (index: number) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    updateLocalStorage(updatedCart);
  };

  const increaseQty = (index: number) => {
    const updatedCart = [...cart];
    updatedCart[index].quantity = (updatedCart[index].quantity || 1) + 1;
    updateLocalStorage(updatedCart);
  };

  const decreaseQty = (index: number) => {
    const updatedCart = [...cart];
    if ((updatedCart[index].quantity || 1) > 1) {
      updatedCart[index].quantity = (updatedCart[index].quantity || 1) - 1;
      updateLocalStorage(updatedCart);
    } else {
      removeFromCart(index);
    }
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      const quantity = item.quantity || 1;
      return total + quantity * parseInt(item.price);
    }, 0);
  };

  const handleOrderClick = () => {
  let name = '', address = '', phone = '';

  MySwal.fire({
    title: '📋 بيانات العميل',
    html: `
      <input type="text" id="name" class="swal2-input" placeholder="الاسم">
      <input type="text" id="address" class="swal2-input" placeholder="العنوان">
      <input type="text" id="phone" class="swal2-input" placeholder="رقم الهاتف">
    `,
    confirmButtonText: 'إرسال الطلب ✅',
    showCancelButton: true,
    cancelButtonText: 'إلغاء',
    focusConfirm: false,
    preConfirm: () => {
      name = (document.getElementById('name') as HTMLInputElement).value;
      address = (document.getElementById('address') as HTMLInputElement).value;
      phone = (document.getElementById('phone') as HTMLInputElement).value;

      if (!name || !address || !phone) {
        Swal.showValidationMessage('من فضلك املأ جميع الحقول');
        return false;
      }

      return { name, address, phone };
    }
  }).then((result) => {
    if (result.isConfirmed) {
      const order = {
        customer: result.value,
        cart,
        total: calculateTotal(),
      };

      // ✅ حفظ الطلب في localStorage
      const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
      const updatedOrders = [...existingOrders, order];
      localStorage.setItem('orders', JSON.stringify(updatedOrders));

      // ✅ تنظيف السلة
      localStorage.removeItem('cart');
      setCart([]);
      updateCartCount();

      Swal.fire({
        icon: 'success',
        title: 'تم إرسال الطلب بنجاح!',
        text: 'سيتم التواصل معك قريبًا.',
        timer: 4000,
        showConfirmButton: false,
      });
    }
  });
};

  return (
    <Container className="py-5 my-5">
      <h2 className="mb-4 text-center">🛒 السلة</h2>

      {cart.length === 0 ? (
        <p className="text-center">السلة فارغة حاليًا.</p>
      ) : (
        <>
          {cart.map((item, index) => (
            <div key={index} className="d-flex justify-content-between align-items-center border rounded p-3 mb-3">
              <div className="d-flex align-items-center gap-3">
                <img
                  src={item.image}
                  alt={item.title}
                  width="70"
                  height="70"
                  style={{ objectFit: 'cover', borderRadius: '10px' }}
                />
                <div>
                  <h5 className="mb-1">{item.title}</h5>
                  <p className="mb-0 text-danger fw-bold">السعر: {item.price} جنيه</p>
                  <p className="mb-0 text-secondary">الكمية: {item.quantity || 1}</p>
                  <p className="mb-0 fw-bold text-success">
                    الإجمالي: {(item.quantity || 1) * parseInt(item.price)} جنيه
                  </p>
                </div>
              </div>

              <div className="d-flex flex-column align-items-center gap-2">
                <div className="d-flex gap-2">
                  <Button variant="outline-dark" size="sm" onClick={() => increaseQty(index)}>+</Button>
                  <Button variant="outline-dark" size="sm" onClick={() => decreaseQty(index)}>-</Button>
                </div>
                <Button variant="danger" size="sm" onClick={() => removeFromCart(index)}>حذف</Button>
              </div>
            </div>
          ))}

          <div className="text-end mt-4">
            <h5>
              المجموع: <span className="text-success">{calculateTotal()} جنيه</span>
            </h5>
            <Button variant="success" className="mt-3" onClick={handleOrderClick}>
              إتمام الطلب ✅
            </Button>
          </div>
        </>
      )}
    </Container>
  );
};

export default CartPage;
