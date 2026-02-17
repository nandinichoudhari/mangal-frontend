import { Link, useNavigate } from "react-router-dom";

function Cart({ items, setItems }) {
  const navigate = useNavigate();
  
  // 🔥 CLEAN DATA
  const validItems = Array.isArray(items) 
    ? items.filter(item => item && item.id && item.price > 0 && item.name)
    : [];

  if (validItems.length === 0) {
    return (
      <div className="cart-page">
        <div className="empty-cart">
          <div className="empty-icon">🛒</div>
          <h2 className="page-title">Your Cart is Empty</h2>
          <p className="empty-text">Add delicious items from the menu!</p>
          <Link to="/menu" className="cta-btn">Shop Now</Link>
        </div>
      </div>
    );
  }

  const updateQuantity = (id, change) => {
    setItems(prev => prev.map(item => 
      item.id === id 
        ? { ...item, quantity: Math.max(1, (item.quantity || 1) + change) }
        : item
    ));
  };

  const removeItem = (id) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const totalItems = validItems.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const total = validItems.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
  
  // 🔥 UPGRADED CHECKOUT - SAVES ORDER DIRECTLY
  const handleCheckout = async () => {
    const isLoggedIn = localStorage.getItem("loggedIn") === "true";
    
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    const address = localStorage.getItem('deliveryAddress');
    if (!address) {
      navigate("/address");
      return;
    }

    // ✅ SAVE ORDER TO BACKEND
    try {
      const phone = localStorage.getItem('phone') || "8866440011";
      
      const response = await fetch('http://localhost:5000/api/test-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: phone,
          items: validItems.map(item => ({
            name: item.name,
            price: item.price,
            qty: item.quantity || 1,
            emoji: item.emoji
          })),
          total: total
        })
      });
      
      const result = await response.json();
      
      if (result.success) {
        alert(`✅ Order placed successfully! (${result.ordersCount} orders)`);
        setItems([]); // Clear cart
        navigate('/orders'); // Go to orders page
      }
    } catch (error) {
      console.error('Order failed:', error);
      alert('❌ Order failed - please try again');
    }
  };

  return (
    <div className="cart-page">
      <div className="cart-header">
        <h2 className="page-title">Shopping Cart ({totalItems} items)</h2>
        <Link to="/menu" className="continue-shopping">← Continue Shopping</Link>
      </div>
      
      <div className="cart-items">
        {validItems.map((item) => {
          const qty = item.quantity || 1;
          const itemTotal = item.price * qty;
          
          return (
            <div key={item.id} className="cart-item-row">
              <div className="cart-item-image">
                <span>{item.emoji || '🍽️'}</span>
              </div>
              <div className="cart-item-details">
                <h3 className="cart-item-name">{item.name}</h3>
                <p className="cart-item-price">₹{item.price} / {item.unit || 'unit'}</p>
              </div>
              
              <div className="cart-item-controls">
                <div className="quantity-controls">
                  <button className="qty-btn" onClick={() => updateQuantity(item.id, -1)} disabled={qty <= 1}>−</button>
                  <span className="qty-display">{qty}</span>
                  <button className="qty-btn" onClick={() => updateQuantity(item.id, 1)}>+</button>
                </div>
                <div className="item-total">₹{itemTotal}</div>
                <button className="remove-btn" onClick={() => removeItem(item.id)}>✕</button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="cart-summary">
        <div className="summary-row">
          <span>Subtotal ({totalItems} items):</span>
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

      {/* ✅ SINGLE CLEAN BUTTON */}
      <div className="cart-actions">
        <button className="checkout-btn" onClick={handleCheckout}>
          {localStorage.getItem("loggedIn") === "true" && localStorage.getItem('deliveryAddress')
            ? "🧾 Place Order Now" 
            : "🔐 Login to Checkout"
          } ₹{total}
        </button>
      </div>
    </div>
  );
}

export default Cart;
