import { Link } from "react-router-dom";
import { useState } from "react";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    if (!/^\d{10}$/.test(mobileNumber)) {
      setError("Please enter a valid 10-digit mobile number");
      return;
    }

    setLoading(true);

    // OTP backend will be connected here next
    console.log("Email:", email);
    console.log("Mobile:", mobileNumber);

    setTimeout(() => {
      setLoading(false);
      alert("OTP functionality will be connected next.");
    }, 500);
  };

  return (
    <div className="login-page">

      {/* Left Branding Section */}
      <div className="brand-section">

        <div className="brand-icon">
          🤖
        </div>

        <h1>
          Enterprise
          <br />
          AI Helpdesk
        </h1>

        <div className="brand-line"></div>

        <h3>
          Smart. Fast. Reliable.
        </h3>

        <p>
          AI-powered support system to resolve
          your issues efficiently and effectively.
        </p>

        <div className="features">

          <div className="feature">
            <span>⚡</span>

            <div>
              <strong>Faster Resolutions</strong>

              <small>
                Get quick answers and solutions.
              </small>
            </div>
          </div>

          <div className="feature">
            <span>🛡️</span>

            <div>
              <strong>Secure & Reliable</strong>

              <small>
                Your data is safe with us.
              </small>
            </div>
          </div>

          <div className="feature">
            <span>💬</span>

            <div>
              <strong>AI-Powered Assistance</strong>

              <small>
                Intelligent support 24/7.
              </small>
            </div>
          </div>

        </div>

      </div>


      {/* Forgot Password Card */}
      <div className="login-card">

        <div className="login-icon">
          🔐
        </div>

        <h2>
          Forgot Password?
        </h2>

        <p className="login-subtitle">
          Enter your registered email and mobile number
          to reset your password.
        </p>


        <form onSubmit={handleSubmit}>

          {/* Email */}
          <label>
            Email
          </label>

          <div className="input-wrapper">

            <span>
              ✉
            </span>

            <input
              type="email"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              placeholder="Enter your registered email"
              required
            />

          </div>


          {/* Mobile Number */}
          <label>
            Mobile Number
          </label>

          <div className="input-wrapper">

            <span>
              📱
            </span>

            <input
              type="tel"
              value={mobileNumber}
              onChange={(event) =>
                setMobileNumber(event.target.value)
              }
              placeholder="Enter your registered mobile number"
              maxLength="10"
              required
            />

          </div>


          {/* Error */}
          {error && (
            <div className="login-error">
              ⚠️ {error}
            </div>
          )}


          {/* Submit */}
          <button
            type="submit"
            className="login-button"
            disabled={loading}
          >

            {loading
              ? "Verifying..."
              : (
                <>
                  Verify Details
                  <span>→</span>
                </>
              )}

          </button>

        </form>


        {/* Back to Login */}
        <p className="register-text">

          Remember your password?{" "}

          <Link to="/">
            Login
          </Link>

        </p>

      </div>


      {/* Footer */}
      <div className="footer">
        © 2026 Enterprise AI Helpdesk. All rights reserved.
      </div>

    </div>
  );
}

export default ForgotPassword;