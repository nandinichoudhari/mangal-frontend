import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { FiShoppingBag, FiPhone, FiSearch, FiX } from "react-icons/fi";
import { useState, useEffect } from "react";

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

function Navbar({ cartCount }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();

  // Live search through ALL products (no backend needed)
  useEffect(() => {
    if (searchTerm.length < 2) {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    const results = PRODUCTS.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    ).slice(0, 5);

    setSearchResults(results);
    setShowResults(true);
  }, [searchTerm]);

  const handleSearchSelect = (item) => {
    setSearchTerm(item.name);
    setShowResults(false);
    navigate("/menu", { state: { searchTerm: item.name } });
  };

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
          {/* 🔍 SEARCH BAR */}
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

            {/* Results Dropdown */}
            {showResults && searchResults.length > 0 && (
              <div className="search-dropdown">
                {searchResults.map((item) => (
                  <div
                    key={item.id}
                    className="search-result"
                    onClick={() => handleSearchSelect(item)}
                  >
                    <div 
                      className="result-image"
                      style={{ backgroundColor: '#e0cfb3' }}
                    />
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
          <Link to="/login" className="nav-link">Login</Link>
          <Link to="/about" className="nav-link">About</Link>
          <Link to="/contact" className="nav-link">Contact</Link>
        </div>

        <div className="nav-right">
          <Link to="/cart" className="nav-link cart-pill">
            <FiShoppingBag size={18} />
            Cart ({cartCount})
          </Link>
          <a href="tel:9876543210" className="nav-phone-link">
            <FiPhone size={18} />
            Call
          </a>
        </div>
      </div>
    </>
  );
}

export default Navbar;
