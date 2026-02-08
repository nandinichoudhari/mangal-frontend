import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Payment() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [address, setAddress] = useState({});
  const [paymentMethod, setPaymentMethod] = useState("cod");

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const addr = JSON.parse(localStorage.getItem('deliveryAddress') || '{}');
    setCartItems(cart);
    setAddress(addr);
  }, []);

  const totalItems = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const total = cartItems.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);

  // 🔥 UPDATED: Go to order confirmed page
  const placeOrder = () => {
    // Save order details for success page
    const orderDetails = {
      items: cartItems,
      total,
      address,
      phone: localStorage.getItem("phone") || address.phone,
      timestamp: new Date().toISOString(),
      paymentMethod
    };
    localStorage.setItem("lastOrder", JSON.stringify(orderDetails));
    
    // Clear cart
    localStorage.removeItem('cart');
    localStorage.removeItem('deliveryAddress');
    
    // Go to success page
    navigate("/order-confirmed");
  };

  if (cartItems.length === 0) {
    navigate("/cart");
    return null;
  }

  return (
    <div className="order-page cart-page">
      <div className="cart-header">
        <h2 className="page-title">Payment Method ({totalItems} items)</h2>
        <button className="continue-shopping" onClick={() => navigate("/address")}>
          ← Edit Address
        </button>
      </div>

      {/* Delivery Summary */}
      <div className="order-info">
        <h3>📍 Delivery Details</h3>
        <div className="address-summary">
          <p><strong>{address.name || "Customer Name"}</strong></p>
          <p>{address.address1 || "..."}, {address.address2 || ""}</p>
          <p>{address.city || "Mumbai"} | 📞 {address.phone || "Phone"}</p>
        </div>
      </div>

      {/* Order Items Summary */}
      <div className="cart-items">
        {cartItems.slice(0, 3).map(item => (
          <div key={item.id} className="cart-item-row">
            <div className="cart-item-details">
              <h4>{item.name}</h4>
              <p>₹{item.price} x {item.quantity}</p>
            </div>
            <div className="item-total">₹{item.price * item.quantity}</div>
          </div>
        ))}
        {cartItems.length > 3 && (
          <div className="cart-item-row">
            <span>...</span>
            <span>+{cartItems.length - 3} more</span>
          </div>
        )}
      </div>

      {/* TOTAL */}
      <div className="cart-summary">
        <div className="summary-row">
          <span>Items ({totalItems}):</span>
          <span>₹{total}</span>
        </div>
        <div className="summary-row delivery">
          <span>Delivery:</span>
          <span className="free">FREE</span>
        </div>
        <div className="summary-total">
          <span>Grand Total:</span>
          <strong>₹{total}</strong>
        </div>
      </div>

      {/* PAYMENT OPTIONS */}
      <div className="payment-options">
        <h3>💳 Choose Payment Method</h3>
        
        <div className="payment-methods">
          {/* COD Option */}
          <label className={`payment-method ${paymentMethod === 'cod' ? 'active' : ''}`}>
            <input 
              type="radio" 
              name="payment" 
              value="cod"
              checked={paymentMethod === 'cod'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <div className="payment-icon">💰</div>
            <div>
              <h4>Cash on Delivery</h4>
              <p>Pay when delivery boy arrives</p>
            </div>
          </label>

          {/* Razorpay Placeholder */}
          <label className={`payment-method ${paymentMethod === 'razorpay' ? 'active' : ''}`}>
            <input 
              type="radio" 
              name="payment" 
              value="razorpay"
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <div className="payment-icon">💳</div>
            <div>
              <h4>Razorpay (Coming Soon)</h4>
              <p>Card/UPI/Netbanking - Secure payment</p>
              <span className="coming-soon">Setup in progress...</span>
            </div>
          </label>
        </div>
      </div>

      {/* PLACE ORDER BUTTON */}
      <div className="cart-actions">
        <button 
          className="checkout-btn" 
          onClick={placeOrder}
          disabled={paymentMethod === 'razorpay'} // Disable until ready
        >
          {paymentMethod === 'cod' ? '✅ Place Order (COD)' : '💳 Pay with Razorpay (Soon)'} ₹{total}
        </button>
      </div>

      <div className="secure-payment">
        <p>🔒 Secure checkout | 100% Safe | Mumbai Same Day Delivery</p>
      </div>
    </div>
  );
}

export default Payment;
