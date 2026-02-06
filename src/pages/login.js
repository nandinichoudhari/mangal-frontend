import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState("phone");
  const navigate = useNavigate();

  const sendOtp = () => {
    if (phone.length === 10) {
      setStep("otp");
    }
  };

  const verifyOtp = () => {
    if (otp === "1234") {
      localStorage.setItem("loggedIn", "true");
      localStorage.setItem("phone", phone);
      navigate("/order");
    } else {
      alert("Wrong OTP. Try 1234");
    }
  };

  return (
    <>
      <h2 className="page-title">Login</h2>
      <div className="login-container">
        {step === "phone" ? (
          <>
            <p className="section-subtitle">Enter contact number</p>
            <div className="input-group">
              <input
                type="tel"
                placeholder="Enter 10-digit phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="login-input"
                maxLength="10"
              />
              <button 
                className="login-btn" 
                onClick={sendOtp}
                disabled={phone.length !== 10}
              >
                Send OTP
              </button>
            </div>
          </>
        ) : (
          <>
            <p className="section-subtitle">Enter OTP sent to {phone}</p>
            <div className="input-group">
              <input
                type="text"
                placeholder="Enter 4-digit OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="login-input"
                maxLength="4"
              />
              <button 
                className="login-btn" 
                onClick={verifyOtp}
              >
                Continue to Order
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Login;
