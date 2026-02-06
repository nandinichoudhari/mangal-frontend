import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import Login from "./pages/login";
import Order from "./pages/order";

function App() {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    setCartItems((prev) => [...prev, item]);
  };

  return (
    <BrowserRouter>  {/* 👈 THIS WAS MISSING! */}
      <Navbar cartCount={cartItems.length} />
      <main className="page-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu addToCart={addToCart} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/order" element={<Order />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart items={cartItems} />} />
        </Routes>
      </main>
      <footer className="site-footer">
        © {new Date().getFullYear()} Mangal Enterprises – Authentic Maharashtrian Food
      </footer>
    </BrowserRouter>
  );
}

export default App;
