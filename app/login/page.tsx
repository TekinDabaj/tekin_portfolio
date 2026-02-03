"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Loading from "@/app/components/Loading";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const router = useRouter();
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/auth/callback`,
          },
        });

        if (error) throw error;
        setMessage("Check your email for the confirmation link!");
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;
        setIsTransitioning(true);
        setTimeout(() => {
          router.push("/dashboard");
          router.refresh();
        }, 2000);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap");

        @keyframes borderGlow {
          0%,
          100% {
            opacity: 0.5;
          }
          50% {
            opacity: 1;
          }
        }

        @keyframes inputFocusGlow {
          0%,
          100% {
            box-shadow: 0 0 20px rgba(0, 255, 255, 0.3);
          }
          50% {
            box-shadow: 0 0 30px rgba(0, 255, 255, 0.5);
          }
        }

        @keyframes shimmer {
          0% {
            background-position: -200% center;
          }
          100% {
            background-position: 200% center;
          }
        }

        .login-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #000000;
          padding: 1rem;
          position: relative;
          overflow: hidden;
        }

        .login-container::before {
          content: "";
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 600px;
          height: 600px;
          background: radial-gradient(
            circle,
            rgba(0, 255, 255, 0.03) 0%,
            transparent 70%
          );
          pointer-events: none;
        }

        .login-box {
          width: 100%;
          max-width: 420px;
          padding: 3rem;
          background: linear-gradient(
            145deg,
            rgba(10, 10, 10, 0.95) 0%,
            rgba(5, 5, 5, 0.98) 100%
          );
          border-radius: 1.5rem;
          position: relative;
          z-index: 1;
        }

        .login-box::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: 1.5rem;
          padding: 1px;
          background: linear-gradient(
            135deg,
            rgba(0, 255, 255, 0.4) 0%,
            rgba(0, 255, 255, 0.1) 25%,
            rgba(255, 255, 255, 0.05) 50%,
            rgba(0, 255, 255, 0.1) 75%,
            rgba(0, 255, 255, 0.4) 100%
          );
          -webkit-mask:
            linear-gradient(#fff 0 0) content-box,
            linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          animation: borderGlow 3s ease-in-out infinite;
        }

        .login-box::after {
          content: "";
          position: absolute;
          inset: -1px;
          border-radius: 1.5rem;
          background: transparent;
          box-shadow:
            0 0 60px rgba(0, 255, 255, 0.1),
            0 0 100px rgba(0, 255, 255, 0.05),
            inset 0 0 60px rgba(0, 0, 0, 0.5);
          z-index: -1;
        }

        .login-title {
          font-family: "Montserrat", sans-serif;
          font-size: 2.25rem;
          font-weight: 700;
          color: #ffffff;
          text-align: center;
          margin-bottom: 0.5rem;
          letter-spacing: 0.02em;
          text-shadow: 0 0 30px rgba(255, 255, 255, 0.1);
        }

        .login-subtitle {
          font-family: "Montserrat", sans-serif;
          font-size: 0.9rem;
          color: #666666;
          text-align: center;
          margin-bottom: 2.5rem;
          letter-spacing: 0.03em;
        }

        .form-group {
          margin-bottom: 1.5rem;
          position: relative;
        }

        .form-label {
          display: block;
          font-family: "Montserrat", sans-serif;
          font-size: 0.75rem;
          font-weight: 600;
          color: #00ffff;
          margin-bottom: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.15em;
        }

        .input-wrapper {
          position: relative;
        }

        .form-input {
          width: 100%;
          padding: 1rem 1.25rem;
          font-family: "Montserrat", sans-serif;
          font-size: 0.95rem;
          color: #ffffff;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 0.75rem;
          outline: none;
          transition: all 0.3s ease;
        }

        .form-input:hover {
          border-color: rgba(0, 255, 255, 0.3);
          background: rgba(255, 255, 255, 0.05);
        }

        .form-input:focus {
          border-color: rgba(0, 255, 255, 0.6);
          background: rgba(0, 255, 255, 0.03);
          animation: inputFocusGlow 2s ease-in-out infinite;
        }

        .form-input::placeholder {
          color: #404040;
          font-weight: 400;
        }

        .submit-btn {
          width: 100%;
          padding: 1.1rem;
          font-family: "Montserrat", sans-serif;
          font-size: 0.9rem;
          font-weight: 700;
          color: #000000;
          background: linear-gradient(
            90deg,
            #00ffff 0%,
            #00d4d4 50%,
            #00ffff 100%
          );
          background-size: 200% auto;
          border: none;
          border-radius: 0.75rem;
          cursor: pointer;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          transition: all 0.3s ease;
          margin-top: 1rem;
          position: relative;
          overflow: hidden;
        }

        .submit-btn::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.4),
            transparent
          );
          background-size: 200% 100%;
          animation: shimmer 2s linear infinite;
        }

        .submit-btn:hover {
          transform: translateY(-2px);
          box-shadow:
            0 10px 40px rgba(0, 255, 255, 0.3),
            0 0 20px rgba(0, 255, 255, 0.2);
        }

        .submit-btn:active {
          transform: translateY(0);
        }

        .submit-btn:disabled {
          background: #1a1a1a;
          color: #404040;
          cursor: not-allowed;
          box-shadow: none;
          transform: none;
        }

        .submit-btn:disabled::before {
          display: none;
        }

        .divider {
          display: flex;
          align-items: center;
          margin: 2rem 0;
        }

        .divider::before,
        .divider::after {
          content: "";
          flex: 1;
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.1),
            transparent
          );
        }

        .divider-text {
          font-family: "Montserrat", sans-serif;
          font-size: 0.75rem;
          color: #404040;
          padding: 0 1rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        .toggle-text {
          font-family: "Montserrat", sans-serif;
          font-size: 0.85rem;
          color: #666666;
          text-align: center;
          margin-top: 0rem;
        }

        .toggle-link {
          color: #00ffff;
          cursor: pointer;
          text-decoration: none;
          font-weight: 600;
          transition: all 0.2s ease;
          position: relative;
        }

        .toggle-link::after {
          content: "";
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 1px;
          background: #00ffff;
          transition: width 0.3s ease;
        }

        .toggle-link:hover::after {
          width: 100%;
        }

        .toggle-link:hover {
          text-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
        }

        .error-message {
          background: rgba(255, 50, 50, 0.1);
          border: 1px solid rgba(255, 50, 50, 0.3);
          color: #ff6b6b;
          padding: 1rem 1.25rem;
          border-radius: 0.75rem;
          font-family: "Montserrat", sans-serif;
          font-size: 0.85rem;
          margin-bottom: 1.5rem;
          backdrop-filter: blur(10px);
        }

        .success-message {
          background: rgba(0, 255, 200, 0.1);
          border: 1px solid rgba(0, 255, 200, 0.3);
          color: #00ffc8;
          padding: 1rem 1.25rem;
          border-radius: 0.75rem;
          font-family: "Montserrat", sans-serif;
          font-size: 0.85rem;
          margin-bottom: 1.5rem;
          backdrop-filter: blur(10px);
        }

        .back-button {
          position: absolute;
          top: 2rem;
          left: 2rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.25rem;
          font-family: "Montserrat", sans-serif;
          font-size: 0.85rem;
          font-weight: 500;
          color: #888888;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 0.75rem;
          cursor: pointer;
          transition: all 0.3s ease;
          z-index: 10;
        }

        .back-button:hover {
          color: #00ffff;
          border-color: rgba(0, 255, 255, 0.4);
          background: rgba(0, 255, 255, 0.05);
          box-shadow: 0 0 20px rgba(0, 255, 255, 0.15);
        }

        .back-button:hover .back-arrow {
          transform: translateX(-3px);
        }

        .back-arrow {
          width: 18px;
          height: 18px;
          transition: transform 0.3s ease;
        }
      `}</style>

      {isTransitioning ? (
        <div className="login-container">
          <Loading />
        </div>
      ) : (
        <div className="login-container">
        <button className="back-button" onClick={() => router.push("/")}>
          <svg
            className="back-arrow"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back
        </button>
        <div className="login-box">
          <h1 className="login-title">{isSignUp ? "Sign Up" : "Login"}</h1>
          <p className="login-subtitle">
            {isSignUp
              ? "Create your account to get started"
              : "Welcome back! Please sign in"}
          </p>

          {error && <div className="error-message">{error}</div>}
          {message && <div className="success-message">{message}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                className="form-input"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                className="form-input"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
              />
            </div>

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? "Loading..." : isSignUp ? "Sign Up" : "Sign In"}
            </button>
          </form>

          <div className="divider">
            <span className="divider-text">or</span>
          </div>

          <p className="toggle-text">
            {isSignUp ? "Already have an account? " : "Don't have an account? "}
            <span
              className="toggle-link"
              onClick={() => setIsSignUp(!isSignUp)}
            >
              {isSignUp ? "Sign In" : "Sign Up"}
            </span>
          </p>
        </div>
      </div>
      )}
    </>
  );
}
