import { useState, useEffect } from "react";  // 🔥 ADDED useEffect

const PRODUCTS = [
  // NAMKIN
  { id: 1, name: "Bhajni Chakli", price: 650, unit: "1 KG", section: "NAMKIN" },
  { id: 2, name: "Pohe Chivda", price: 450, unit: "1 KG", section: "NAMKIN" },
  { id: 3, name: "Sadhi Shev", price: 420, unit: "1 KG", section: "NAMKIN" },
  { id: 4, name: "Tikhat Shev", price: 420, unit: "1 KG", section: "NAMKIN" },
  { id: 5, name: "Maka Chivda", price: 450, unit: "1 KG", section: "NAMKIN" },
  { id: 6, name: "Bhajke Pohe Chivda", price: 500, unit: "1 KG", section: "NAMKIN" },
  { id: 7, name: "Shankar Pali", price: 500, unit: "1 KG", section: "NAMKIN" },
  { id: 8, name: "Namkin Shankar Pali", price: 450, unit: "1 KG", section: "NAMKIN" },
  { id: 9, name: "Garlic Shev", price: 500, unit: "1 KG", section: "NAMKIN" },

  // SWEET LADOO
  { id: 10, name: "Besan Ladoo Organic Gul", price: 800, unit: "1 KG", section: "SWEET LADOO" },
  { id: 11, name: "Besan Ladoo Sakhar", price: 750, unit: "1 KG", section: "SWEET LADOO" },
  { id: 12, name: "Rava Ladoo", price: 700, unit: "1 KG", section: "SWEET LADOO" },
  { id: 13, name: "Daraba Ladoo", price: 800, unit: "1 KG", section: "SWEET LADOO" },

  // HEALTH SPECIAL LADOO
  { id: 14, name: "Dink Dryfruits Ladoo", price: 1050, unit: "1 KG", section: "HEALTH SPECIAL LADOO" },
  { id: 15, name: "Methi Dink Dryfruits Ladoo", price: 1050, unit: "1 KG", section: "HEALTH SPECIAL LADOO" },
  { id: 16, name: "Nachni Ladoo", price: 800, unit: "1 KG", section: "HEALTH SPECIAL LADOO" },
  { id: 17, name: "Shingada Ladoo", price: 1200, unit: "1 KG", section: "HEALTH SPECIAL LADOO" },
  { id: 18, name: "Aliv Ladoo", price: 700, unit: "1 KG", section: "HEALTH SPECIAL LADOO" },
  { id: 19, name: "Makhana Oats Dryfruits Ladoo", price: 1100, unit: "1 KG", section: "HEALTH SPECIAL LADOO" },

  // TRADITIONAL
  { id: 20, name: "Ukadiche Modak", price: 35, unit: "1 Piece", section: "TRADITIONAL" },
  { id: 21, name: "Puran Poli", price: 40, unit: "1 Piece", section: "TRADITIONAL" },
  { id: 22, name: "Tilgul Poli", price: 40, unit: "1 Piece", section: "TRADITIONAL" },
  { id: 23, name: "Karanji", price: 800, unit: "1 KG", section: "TRADITIONAL" },
  { id: 24, name: "Home-made Cow Ghee", price: 1100, unit: "1 KG", section: "TRADITIONAL" },
  { id: 25, name: "Anarse", price: 300, unit: "Pav KG", section: "TRADITIONAL" },
];

const SECTIONS = {
  NAMKIN: PRODUCTS.filter(p => p.section === "NAMKIN"),
  "SWEET LADOO": PRODUCTS.filter(p => p.section === "SWEET LADOO"),
  "HEALTH SPECIAL LADOO": PRODUCTS.filter(p => p.section === "HEALTH SPECIAL LADOO"),
  TRADITIONAL: PRODUCTS.filter(p => p.section === "TRADITIONAL"),
};

function Menu({ addToCart, searchTerm = "" }) {
  const [activeTab, setActiveTab] = useState("NAMKIN");
  const [quantities, setQuantities] = useState({});

  // 🔥 LOAD quantities from localStorage
  useEffect(() => {
    const savedQuantities = localStorage.getItem('menuQuantities');
    if (savedQuantities) {
      setQuantities(JSON.parse(savedQuantities));
    }
  }, []);

  // 🔥 SAVE quantities to localStorage when they change
  useEffect(() => {
    localStorage.setItem('menuQuantities', JSON.stringify(quantities));
  }, [quantities]);

  // 🔥 LOAD activeTab from localStorage
  useEffect(() => {
    const savedTab = localStorage.getItem('menuActiveTab');
    if (savedTab && SECTIONS[savedTab]) {
      setActiveTab(savedTab);
    }
  }, []);

  // 🔥 PERSISTENT tab update
  const updateActiveTab = (tab) => {
    setActiveTab(tab);
    localStorage.setItem('menuActiveTab', tab);
  };

  const updateQuantity = (id, change) => {
    setQuantities(prev => {
      const newQty = Math.max(0, (prev[id] || 0) + change);
      const newQuantities = { ...prev, [id]: newQty };
      localStorage.setItem('menuQuantities', JSON.stringify(newQuantities));
      return newQuantities;
    });
  };

  // SEARCH FILTER LOGIC
  const allProducts = Object.values(SECTIONS).flat();
  const filteredProducts = searchTerm
    ? allProducts.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : SECTIONS[activeTab] || [];
  
  const products = filteredProducts;

  return (
    <>
      <h2 className="page-title">Our Menu</h2>

      {/* Hide tabs when searching */}
      {!searchTerm && (
        <div className="menu-tabs">
          {Object.keys(SECTIONS).map(tab => (
            <button
              key={tab}
              className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
              onClick={() => updateActiveTab(tab)}  // 🔥 Persistent tab
            >
              {tab}
            </button>
          ))}
        </div>
      )}

      {/* Show search results */}
      {searchTerm && (
        <div className="search-results-info">
          Found {products.length} items matching "{searchTerm}"
        </div>
      )}

      {/* Products Grid */}
      <div className="grid">
        {products.map((item) => {
          const qty = quantities[item.id] || 0;
          return (
            <div key={item.id} className="card menu-card">
              <div className="menu-card-image" />
              <div className="menu-item-name">{item.name}</div>
              <div className="menu-item-price">₹{item.price} <span className="unit">/{item.unit}</span></div>
              
              {/* Quantity Controls */}
              <div className="quantity-controls">
                <button 
                  className="qty-btn" 
                  onClick={() => updateQuantity(item.id, -1)}
                  disabled={qty <= 0}
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
              
              {/* ✅ FIXED: Proper Add to Cart button */}
              <button
                className="menu-add-btn"
                onClick={() => qty > 0 && addToCart({ ...item, quantity: qty })}
                disabled={qty === 0}
              >
                {qty > 0 ? `Add ${qty} to Cart` : "Add to Cart"}
              </button>
            </div>
          );
        })}
      </div>

      <div className="text-box">
        <p><strong>📞 Contact:</strong> 982512137 | WhatsApp for orders</p>
      </div>
    </>
  );
}

export default Menu;
