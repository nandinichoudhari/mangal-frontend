import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Order() {
  const [cartItems, setCartItems] = useState([]);
  const [address, setAddress] = useState("");

  useEffect(() => {
    const savedCart = localStorage.getItem("cartItems");
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const placeOrder = () => {
    const orderDetails = {
      phone: localStorage.getItem("phone"),
      items: cartItems,
      total,
      address,
      timestamp: new Date().toLocaleString()
    };
    
    // Send to WhatsApp (replace with your number)
    const message = `🛒 New Order\n\n${cartItems.map(i => `${i.name} x${i.quantity} = ₹${i.price * i.quantity}`).join('\n')}\n\nTotal: ₹${total}\nAddress: ${address}`;
    const whatsappUrl = `https://wa.me/91982531370?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  if (cartItems.length === 0) {
    return (
      <div className="text-box">
        <h2 className="page-title">Order Summary</h2>
        <p>Your cart is empty. <Link to="/menu">Add items</Link></p>
      </div>
    );
  }

  return (
    <>
      <h2 className="page-title">Order Summary</h2>
      
      <div className="order-section">
        <div className="order-items">
          {cartItems.map((item, index) => (
            <div key={index} className="order-item">
              <div>
                <strong>{item.name}</strong><br/>
                <small>₹{item.price} x {item.quantity}</small>
              </div>
              <div>₹{item.price * item.quantity}</div>
            </div>
          ))}
        </div>

        <div className="order-total">
          <div className="order-row">
            <span>Total:</span>
            <strong>₹{total}</strong>
          </div>
        </div>

        <div className="input-group">
          <input
            type="text"
            placeholder="Delivery address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="order-input"
          />
        </div>

        <button 
          className="order-btn" 
          onClick={placeOrder}
          disabled={!address.trim()}
        >
          Place Order via WhatsApp
        </button>
      </div>
    </>
  );
}

export default Order;
