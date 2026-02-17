import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { FiShoppingBag, FiPhone, FiSearch, FiX, FiUser } from "react-icons/fi";
import { useState, useEffect } from "react";

const Navbar = ({ cartCount }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  
  // NEW STATES FOR ORDERS DROPDOWN
  const [pastOrders, setPastOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  useEffect(() => {
    const savedProducts = localStorage.getItem('menuProducts');
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    }
  }, []);

  // FETCH ORDERS
  useEffect(() => {
    const phone = localStorage.getItem('phone');
    if (!phone) return;

    setLoadingOrders(true);
    fetch('http://localhost:5000/api/orders')
      .then(res => res.json())
      .then(data => {
        console.log('Orders fetched:', data); // DEBUG
        setPastOrders(data.orders || []);
        setLoadingOrders(false);
      })
      .catch(err => {
        console.error('Orders fetch failed:', err);
        setLoadingOrders(false);
      });
  }, []);

  useEffect(() => {
    if (searchTerm.length < 2) {
      setSearchResults([]);
      setShowResults(false);
      return;
    }
    const results = products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    ).slice(0, 5);
    setSearchResults(results);
    setShowResults(true);
  }, [searchTerm, products]);

  const handleSearchSelect = (item) => {
    setSearchTerm(item.name);
    setShowResults(false);
    navigate("/menu", { state: { searchTerm: item.name } });
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("phone");
    localStorage.removeItem("deliveryAddress");
    window.location.reload();
  };

  const getUserName = () => {
    const loggedIn = localStorage.getItem("loggedIn") === "true";
    if (!loggedIn) return null;
    
    const address = localStorage.getItem('deliveryAddress');
    if (address) {
      try {
        const addr = JSON.parse(address);
        return addr.name ? addr.name.split(' ')[0] : "User";
      } catch {
        return "User";
      }
    }
    return "User";
  };

  const userName = getUserName();
  const isLoggedIn = localStorage.getItem("loggedIn") === "true";

  return (
    <>
      <div className="logo-space">
        <img
          src={`${process.env.PUBLIC_URL}/logo-removebg-preview.png`}
          alt="Mangal Enterprises"
          className="logo-img"
        />
        <h1 className="brand-name">Mangal Enterprises</h1>
      </div>

      <div className="navbar">
        <div className="nav-left">
          <div className="search-container">
            <FiSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search Bhajni Chakli, Ladoo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
              onFocus={() => searchResults.length > 0 && setShowResults(true)}
            />
            {searchTerm && (
              <FiX 
                className="search-clear"
                onClick={() => {
                  setSearchTerm("");
                  setShowResults(false);
                }}
              />
            )}
            {showResults && searchResults.length > 0 && (
              <div className="search-dropdown">
                {searchResults.map((item) => (
                  <div key={item.id} className="search-result" onClick={() => handleSearchSelect(item)}>
                    <div className="result-image" style={{ backgroundColor: '#e0cfb3' }} />
                    <div className="result-info">
                      <div className="result-name">{item.name}</div>
                      <div className="result-price">₹{item.price}/{item.unit}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <Link to="/" className="nav-link nav-home">Home</Link>
          <Link to="/menu" className="nav-link">Menu</Link>
          <Link to="/about" className="nav-link">About</Link>
          <Link to="/contact" className="nav-link">Contact</Link>
        </div>

        <div className="nav-right" style={{position: 'relative'}}>
          <Link to="/cart" className="nav-link cart-pill">
            <FiShoppingBag size={18} />
            Cart ({cartCount || 0})
          </Link>

          {isLoggedIn ? (
            <div 
              className="user-dropdown-container"
              style={{ position: 'relative', display: 'inline-block' }}
              onMouseEnter={() => setUserDropdownOpen(true)}
              onMouseLeave={() => setUserDropdownOpen(false)}
            >
              {/* User button WITHOUT orange circle */}
              <Link to="/orders" className="nav-link user-name">
                <FiUser size={16} /> {userName}
              </Link>

              {/* DROPDOWN */}
              {userDropdownOpen && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  marginTop: '5px',
                  background: '#fff',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
                  minWidth: '350px',
                  maxHeight: '400px',
                  overflowY: 'auto',
                  zIndex: 9999
                }}>
                  <div style={{ 
                    padding: '1rem', 
                    borderBottom: '1px solid #eee', 
                    background: '#f8f9fa',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <h4 style={{ margin: 0, fontSize: '1rem' }}>
                      Recent Orders ({pastOrders.length})
                    </h4>
                    <Link to="/orders" style={{ fontSize: '0.85rem', color: '#ff6b35' }}>
                      View All →
                    </Link>
                  </div>

                  {loadingOrders ? (
                    <div style={{ padding: '2rem', textAlign: 'center', color: '#666' }}>
                      🔄 Loading orders...
                    </div>
                  ) : pastOrders.length === 0 ? (
                    <div style={{ padding: '2rem', textAlign: 'center' }}>
                      <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🧾</div>
                      <p style={{ color: '#666' }}>No orders yet</p>
                      <p style={{ fontSize: '0.9rem' }}>Your order history will appear here</p>
                    </div>
                  ) : (
                    pastOrders.slice(0, 5).map(order => (
                      <Link 
                        key={order._id} 
                        to={`/order/${order._id}`}
                        style={{
                          display: 'block', 
                          padding: '1rem', 
                          borderBottom: '1px solid #f0f0f0',
                          textDecoration: 'none', 
                          color: '#333'
                        }}
                        onMouseEnter={(e) => e.target.style.background = '#f8f9fa'}
                        onMouseLeave={(e) => e.target.style.background = 'transparent'}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                          <strong>Order #{order._id?.slice(-6)}</strong>
                          <span>{new Date(order.timestamp).toLocaleDateString()}</span>
                        </div>
                        <div style={{ fontSize: '1.1rem', fontWeight: 600, color: '#2c5aa0' }}>
                          ₹{order.total}
                        </div>
                        <div style={{ fontSize: '0.85rem', color: '#666' }}>
                          {order.items?.length || 0} items • {order.status}
                        </div>
                      </Link>
                    ))
                  )}
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="nav-link">Login</Link>
          )}
          
          {isLoggedIn && (
            <Link to="/" className="nav-link" onClick={handleLogout}>
              Logout
            </Link>
          )}
          
          <a href="tel:9876543210" className="nav-phone-link">
            <FiPhone size={18} />
            Call
          </a>
        </div>
      </div>
    </>
  );
};

export default Navbar;
