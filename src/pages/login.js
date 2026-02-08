import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1); // 1=phone, 2=otp
  const navigate = useNavigate();

  const sendOtp = () => {
    if (phone.length === 10) {
      setStep(2); // Go to OTP step
    } else {
      alert("Enter valid 10-digit phone number");
    }
  };

  // 🔥 FIXED verifyOtp function
  const verifyOtp = () => {
    if (otp === "1234") {
      localStorage.setItem("loggedIn", "true");
      localStorage.setItem("phone", phone);
      
      // 🔥 REDIRECT BACK TO CHECKOUT FLOW
      const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
      if (cartItems.length > 0) {
        const address = localStorage.getItem('deliveryAddress');
        navigate(address ? "/payment" : "/address"); // Checkout flow
      } else {
        navigate("/cart"); // Normal flow
      }
    } else {
      alert("Wrong OTP. Try 1234");
    }
  };

  return (
    <div className="page-content">
      <div className="login-container">
        <h2 className="page-title">Login / Signup</h2>
        
        {step === 1 ? (
          // Phone number step
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
          // OTP step
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
        
        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
          <Link to="/cart" className="login-link">← Back to Cart</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
