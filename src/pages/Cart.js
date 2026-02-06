import { useState } from "react";
import { Link } from "react-router-dom";

function Cart({ items }) {
  const [cart, setCart] = useState(items || []);

  const updateQuantity = (id, change) => {
    setCart(prev => prev.map(item => 
      item.id === id 
        ? { ...item, quantity: Math.max(1, (item.quantity || 1) + change) }
        : item
    ));
  };

  const removeItem = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const total = cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);

  if (cart.length === 0) {
    return (
      <div className="empty-cart">
        <div className="empty-icon">🛒</div>
        <h2 className="page-title">Your Cart is Empty</h2>
        <p className="empty-text">Add delicious items from the menu!</p>
        <Link to="/menu" className="cta-btn">Shop Now</Link>
      </div>
    );
  }

  return (
    <>
      <h2 className="page-title">Shopping Cart ({cart.length} items)</h2>
      
      <div className="cart-items">
        {cart.map((item) => {
          const qty = item.quantity || 1;
          const itemTotal = item.price * qty;
          
          return (
            <div key={item.id} className="cart-item-row">
              <div className="cart-item-image" />
              <div className="cart-item-details">
                <h3 className="cart-item-name">{item.name}</h3>
                <p className="cart-item-price">₹{item.price} / unit</p>
              </div>
              
              <div className="cart-item-controls">
                <div className="quantity-controls">
                  <button 
                    className="qty-btn" 
                    onClick={() => updateQuantity(item.id, -1)}
                    disabled={qty <= 1}
                  >
                    -
                  </button>
                  <span className="qty-display">{qty}</span>
                  <button 
                    className="qty-btn" 
                    onClick={() => updateQuantity(item.id, 1)}
                  >
                    +
                  </button>
                </div>
                <div className="item-total">₹{itemTotal}</div>
                <button 
                  className="remove-btn"
                  onClick={() => removeItem(item.id)}
                >
                  ✕
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="cart-summary">
        <div className="summary-row">
          <span>Subtotal ({cart.length} items):</span>
          <span>₹{total}</span>
        </div>
        <div className="summary-row delivery">
          <span>Delivery:</span>
          <span className="free">FREE</span>
        </div>
        <div className="summary-total">
          <span>Total:</span>
          <strong>₹{total}</strong>
        </div>
      </div>

      <div className="cart-actions">
        <Link to="/menu" className="continue-shopping">← Continue Shopping</Link>
        <Link to="/login" className="checkout-btn">
          Proceed to Checkout ₹{total}
        </Link>
      </div>
    </>
  );
}

export default Cart;
