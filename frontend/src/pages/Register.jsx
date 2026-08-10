import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Register() {
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (event) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    const name = event.target.name.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;

    // Check passwords
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5244/api/Auth/register",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            name: name,
            email: email,
            password: password,
          }),
        }
      );

      if (!response.ok) {
        const message = await response.text();

        setError(
          message || "Registration failed. Please try again."
        );

        return;
      }

      alert("Registration successful!");

      navigate("/");

    } catch (error) {
      console.error("REGISTER ERROR:", error);

      setError(
        "Unable to connect to the server. Please try again."
      );
    } finally {
      setLoading(false);
    }
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


      {/* Register Card */}
      <div className="login-card register-card">

        <div className="login-icon">
          🤖
        </div>

        <h2>
          Create your account
        </h2>

        <p className="login-subtitle">
          Join us to get started with AI-powered support
        </p>


        <form onSubmit={handleRegister}>

          {/* Full Name */}
          <label>
            Full Name
          </label>

          <div className="input-wrapper">

            <span>
              👤
            </span>

            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              required
            />

          </div>


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
              name="email"
              placeholder="Enter your email address"
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
              name="mobileNumber"
              placeholder="Enter your 10-digit mobile number"
              maxLength="10"
              required
            />

          </div>


          {/* Password */}
          <label>
            Password
          </label>

          <div className="input-wrapper">

            <span>
              🔒
            </span>

            <input
              type="password"
              name="password"
              placeholder="Create a password"
              required
            />

            <span className="eye">
              👁
            </span>

          </div>


          {/* Confirm Password */}
          <label>
            Confirm Password
          </label>

          <div className="input-wrapper">

            <span>
              🔒
            </span>

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm your password"
              required
            />

            <span className="eye">
              👁
            </span>

          </div>


          {/* Error */}
          {error && (
            <div className="login-error">
              ⚠️ {error}
            </div>
          )}


          {/* Terms */}
          <label className="terms">

            <input
              type="checkbox"
              required
            />

            <span>
              I agree to the{" "}

              <a href="#">
                Terms of Service
              </a>

              {" "}and{" "}

              <a href="#">
                Privacy Policy
              </a>

            </span>

          </label>


          {/* Register Button */}
          <button
            type="submit"
            className="login-button"
            disabled={loading}
          >

            {loading ? (
              "Creating account..."
            ) : (
              <>
                Register
                <span>→</span>
              </>
            )}

          </button>

        </form>


        {/* Divider */}
        <div className="or">

          <span></span>

          <p>
            or
          </p>

          <span></span>

        </div>


        {/* Login Link */}
        <p className="register-text">

          Already have an account?{" "}

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

export default Register;