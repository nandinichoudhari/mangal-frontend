import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Address() {
  const [address, setAddress] = useState({
    name: "", phone: "", address1: "", address2: "", city: ""
  });
  const navigate = useNavigate();

  const saveAddress = () => {
    localStorage.setItem("deliveryAddress", JSON.stringify(address));
    navigate("/payment");
  };

  return (
    <div className="page-content">
      <h2 className="page-title">Delivery Address</h2>
      <div className="login-container">
        <input placeholder="Full Name" value={address.name} onChange={(e) => setAddress({...address, name: e.target.value})} className="login-input" />
        <input placeholder="Phone" value={address.phone} onChange={(e) => setAddress({...address, phone: e.target.value})} className="login-input" />
        <input placeholder="House No, Street" value={address.address1} onChange={(e) => setAddress({...address, address1: e.target.value})} className="login-input" />
        <input placeholder="Area" value={address.address2} onChange={(e) => setAddress({...address, address2: e.target.value})} className="login-input" />
        <input placeholder="City" value={address.city} onChange={(e) => setAddress({...address, city: e.target.value})} className="login-input" />
        <button className="login-btn" onClick={saveAddress}>Continue to Payment</button>
      </div>
    </div>
  );
}

export default Address;
