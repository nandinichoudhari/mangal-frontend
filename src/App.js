import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import Login from "./pages/login";
import Order from "./pages/OrderConfirmation";
import Payment from "./pages/Payment";
import Address from "./pages/Address";        
import OrderConfirmed from "./pages/OrderConfirmed";

// 🔥 ADD THIS - Create Orders.js first, then uncomment
// import Orders from "./pages/Orders";

function App() {
  const [cartItems, setCartItems] = useState([]);

  // 🔥 LOAD + VALIDATE cart from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('cart');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const validCart = Array.isArray(parsed) 
          ? parsed.filter(item => item.id && item.price > 0 && item.name)
          : [];
        setCartItems(validCart);
        if (parsed.length !== validCart.length) {
          localStorage.setItem('cart', JSON.stringify(validCart));
        }
      } catch (e) {
        localStorage.removeItem('cart');
      }
    }
  }, []);

  // 🔥 SAVE cart to localStorage
  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem('cart', JSON.stringify(cartItems));
    } else {
      localStorage.removeItem('cart');
    }
  }, [cartItems]);

  const addToCart = (newItem) => {
    const existingItem = cartItems.find(item => item.id === newItem.id);
    if (existingItem) {
      setCartItems(prev => prev.map(item =>
        item.id === newItem.id
          ? { ...item, quantity: item.quantity + newItem.quantity }
          : item
      ));
    } else {
      setCartItems(prev => [...prev, { ...newItem, quantity: newItem.quantity || 1 }]);
    }
  };

  return (
    <BrowserRouter>
      <Navbar cartCount={cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0)} />
      <main className="page-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu addToCart={addToCart} />} />
          <Route path="/cart" element={<Cart items={cartItems} setItems={setCartItems} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/address" element={<Address />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/order" element={<Order />} />
          <Route path="/order-confirmed" element={<OrderConfirmed />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          {/* 👇 ADD THIS AFTER CREATING Orders.js */}
          {/* <Route path="/orders" element={<Orders />} /> */}
        </Routes>
      </main>
      <footer className="site-footer">
        © {new Date().getFullYear()} Mangal Enterprises – Authentic Maharashtrian Food
      </footer>
    </BrowserRouter>
  );
}

export default App;
