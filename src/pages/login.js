import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
// import { UserContext } from "../contexts/UserContext"; // REMOVED

function Login() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1); // 1 = phone, 2 = otp
  const navigate = useNavigate();
  // const { fetchUserOrders } = useContext(UserContext); // REMOVED

  // SEND OTP - RAW 10 digits
  const sendOtp = async () => {
    if (phone.length !== 10) {
      alert("Enter valid 10-digit phone number");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone })
      });

      const data = await res.json();
      
      if (data.success) {
        setStep(2);
        alert(`✅ OTP Generated! Check backend terminal: ${data.testOtp || '???'} `);
      } else {
        alert(data.message || "Failed to send OTP");
      }
    } catch (error) {
      alert("Server error. Please try again.");
    }
  };

  // VERIFY OTP - SIMPLIFIED VERSION
  const verifyOtp = async () => {
    try {
      console.log('🔍 Verifying phone:', phone);
      console.log('🔍 Verifying OTP:', otp);
      
      const res = await fetch("http://localhost:5000/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          phone, 
          otp 
        })
      });

      const data = await res.json();
      console.log('🔍 Verify response:', data);

      if (data.success) {
        localStorage.setItem("loggedIn", "true");
        localStorage.setItem("phone", phone);
        
        // REMOVED UserContext code - works without it
        
        const cartItems = JSON.parse(localStorage.getItem("cart") || "[]");
        if (cartItems.length > 0) {
          const address = localStorage.getItem("deliveryAddress");
          navigate(address ? "/payment" : "/address");
        } else {
          navigate("/cart");
        }
      } else {
        alert(data.message || "Invalid OTP");
      }
    } catch (error) {
      console.error('Verify error:', error);
      alert("Server error. Please try again.");
    }
  };

  return (
    <div className="page-content">
      <div className="login-container">
        <h2 className="page-title">Login / Signup</h2>

        {step === 1 ? (
          <>
            <p>Enter phone to receive OTP</p>
            <div className="input-group">
              <input
                type="tel"
                placeholder="98XXXXXXXX"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="login-input"
                maxLength="10"
              />
            </div>
            <button className="login-btn" onClick={sendOtp}>
              Send OTP
            </button>
          </>
        ) : (
          <>
            <p>Enter OTP sent to {phone}</p>
            <div className="input-group">
              <input
                type="text"
                placeholder="Enter 4-digit OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="login-input"
                maxLength="4"
              />
            </div>
            <button className="login-btn" onClick={verifyOtp}>
              Verify & Continue
            </button>
          </>
        )}

        <div style={{ textAlign: "center", marginTop: "1rem" }}>
          <Link to="/cart" className="login-link">
            ← Back to Cart
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
