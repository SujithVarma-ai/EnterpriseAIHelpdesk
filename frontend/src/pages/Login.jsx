import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Login() {
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    const email = event.target.email.value;
    const password = event.target.password.value;

    try {
      const response = await fetch(
        "http://localhost:5244/api/Auth/login",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            email: email,
            password: password,
          }),
        }
      );

      if (!response.ok) {
        setError("Invalid email or password");
        return;
      }

      const token = await response.text();

      localStorage.setItem("token", token);

      navigate("/dashboard");

    } catch (error) {
      console.error("LOGIN ERROR:", error);

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


      {/* Login Section */}
      <div className="login-card">

        <div className="login-icon">
          🤖
        </div>

        <h2>
          Welcome back!
        </h2>

        <p className="login-subtitle">
          Login to your account to continue
        </p>


        <form onSubmit={handleLogin}>

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
              placeholder="Enter your password"
              required
            />

            <span className="eye">
              👁
            </span>

          </div>


          {/* Error Message */}
          {error && (
            <div className="login-error">
              ⚠️ {error}
            </div>
          )}


          {/* Login Options */}
          <div className="login-options">

            <label className="remember">

              <input
                type="checkbox"
              />

              <span>
                Remember me
              </span>

            </label>


            <a href="#">
              Forgot password?
            </a>

          </div>


          {/* Login Button */}
          <button
            type="submit"
            className="login-button"
            disabled={loading}
          >

            {loading ? (
              <>
                Logging in...
              </>
            ) : (
              <>
                Login
                <span>→</span>
              </>
            )}

          </button>

        </form>


        {/* OR */}
        <div className="or">

          <span></span>

          <p>
            or
          </p>

          <span></span>

        </div>


        {/* Register */}
        <p className="register-text">

          Don't have an account?{" "}

          <Link to="/register">
            Register
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

export default Login;