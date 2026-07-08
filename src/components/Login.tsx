import React, { useState, useEffect } from 'react';

interface LoginProps {
  onLogin: () => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simulate network delay
    await new Promise(r => setTimeout(r, 1200));

    if (email === 'admin@adnetwork.com' && password === 'admin123') {
      if (rememberMe) {
        localStorage.setItem('adnetwork_auth', 'true');
      } else {
        sessionStorage.setItem('adnetwork_auth', 'true');
      }
      onLogin();
    } else {
      setError('Invalid email or password. Please try again.');
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

        .login-root {
          min-height: 100vh;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #080b11;
          position: relative;
          overflow: hidden;
          font-family: 'Inter', system-ui, sans-serif;
        }

        /* Animated background orbs */
        .login-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          animation: orbFloat 8s ease-in-out infinite;
          pointer-events: none;
        }
        .login-orb-1 {
          width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(99,102,241,0.18) 0%, transparent 70%);
          top: -150px; left: -150px;
          animation-delay: 0s;
        }
        .login-orb-2 {
          width: 400px; height: 400px;
          background: radial-gradient(circle, rgba(168,85,247,0.15) 0%, transparent 70%);
          bottom: -100px; right: -100px;
          animation-delay: 3s;
        }
        .login-orb-3 {
          width: 300px; height: 300px;
          background: radial-gradient(circle, rgba(14,165,233,0.1) 0%, transparent 70%);
          top: 40%; left: 60%;
          animation-delay: 6s;
        }
        @keyframes orbFloat {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-30px) scale(1.05); }
        }

        /* Grid pattern */
        .login-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(99,102,241,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99,102,241,0.04) 1px, transparent 1px);
          background-size: 60px 60px;
          pointer-events: none;
        }

        .login-card-wrap {
          position: relative;
          z-index: 10;
          width: 100%;
          max-width: 440px;
          padding: 24px;
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.5s ease, transform 0.5s ease;
        }
        .login-card-wrap.mounted {
          opacity: 1;
          transform: translateY(0);
        }

        .login-card {
          background: rgba(15, 19, 26, 0.85);
          backdrop-filter: blur(24px);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 20px;
          padding: 44px 40px;
          box-shadow:
            0 0 0 1px rgba(99,102,241,0.1),
            0 32px 64px rgba(0,0,0,0.6),
            inset 0 1px 0 rgba(255,255,255,0.05);
        }

        @media (max-width: 480px) {
          .login-card-wrap { padding: 12px; }
          .login-card {
            padding: 28px 20px;
            border-radius: 16px;
          }
          .login-heading { font-size: 22px; }
          .login-logo-text { font-size: 17px; }
        }

        .login-logo {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 32px;
          justify-content: center;
        }
        .login-logo-icon {
          width: 44px; height: 44px;
          border-radius: 12px;
          background: linear-gradient(135deg, #6366f1, #a855f7);
          display: flex; align-items: center; justify-content: center;
          font-size: 20px;
          box-shadow: 0 0 24px rgba(99,102,241,0.4);
        }
        .login-logo-text {
          font-size: 20px;
          font-weight: 700;
          background: linear-gradient(135deg, #f3f4f6 30%, #a855f7);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .login-heading {
          text-align: center;
          margin-bottom: 8px;
          font-size: 26px;
          font-weight: 700;
          color: #f3f4f6;
          letter-spacing: -0.5px;
        }
        .login-subheading {
          text-align: center;
          font-size: 13.5px;
          color: #6b7280;
          margin-bottom: 32px;
        }

        .login-label {
          display: block;
          font-size: 12.5px;
          font-weight: 500;
          color: #9ca3af;
          margin-bottom: 7px;
          letter-spacing: 0.02em;
        }

        .login-input-wrap {
          position: relative;
          margin-bottom: 18px;
        }
        .login-input {
          width: 100%;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 10px;
          padding: 12px 44px 12px 14px;
          font-size: 14px;
          color: #f3f4f6;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
          box-sizing: border-box;
        }
        .login-input:focus {
          border-color: rgba(99,102,241,0.6);
          background: rgba(99,102,241,0.06);
          box-shadow: 0 0 0 3px rgba(99,102,241,0.12);
        }
        .login-input::placeholder { color: #4b5563; }
        .login-input-icon {
          position: absolute;
          right: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: #4b5563;
          cursor: pointer;
          display: flex; align-items: center;
          transition: color 0.2s;
        }
        .login-input-icon:hover { color: #9ca3af; }

        .login-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 24px;
          margin-top: 4px;
        }
        .login-remember {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12.5px;
          color: #6b7280;
          cursor: pointer;
          user-select: none;
        }
        .login-remember input[type="checkbox"] {
          accent-color: #6366f1;
          width: 14px; height: 14px;
          cursor: pointer;
        }
        .login-forgot {
          font-size: 12.5px;
          color: #6366f1;
          cursor: pointer;
          text-decoration: none;
          transition: color 0.2s;
        }
        .login-forgot:hover { color: #a855f7; }

        .login-btn {
          width: 100%;
          padding: 13px;
          border-radius: 10px;
          border: none;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          color: #fff;
          font-size: 14.5px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.25s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          letter-spacing: 0.01em;
          box-shadow: 0 4px 20px rgba(99,102,241,0.35);
          position: relative;
          overflow: hidden;
        }
        .login-btn:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 8px 28px rgba(99,102,241,0.5);
        }
        .login-btn:active:not(:disabled) { transform: translateY(0); }
        .login-btn:disabled {
          opacity: 0.75;
          cursor: not-allowed;
        }

        .login-spinner {
          width: 18px; height: 18px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        .login-error {
          background: rgba(239,68,68,0.1);
          border: 1px solid rgba(239,68,68,0.25);
          border-radius: 8px;
          padding: 10px 14px;
          font-size: 13px;
          color: #f87171;
          margin-bottom: 18px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .login-demo-hint {
          margin-top: 20px;
          padding: 12px 16px;
          background: rgba(99,102,241,0.06);
          border: 1px solid rgba(99,102,241,0.15);
          border-radius: 10px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .login-demo-hint-title {
          font-size: 11.5px;
          font-weight: 600;
          color: #6366f1;
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }
        .login-demo-row {
          display: flex;
          gap: 6px;
          font-size: 12px;
          color: #6b7280;
        }
        .login-demo-row span { color: #9ca3af; font-weight: 500; }

        .login-footer {
          text-align: center;
          margin-top: 28px;
          font-size: 11.5px;
          color: #374151;
        }
      `}</style>

      <div className="login-root">
        {/* Background effects */}
        <div className="login-grid" />
        <div className="login-orb login-orb-1" />
        <div className="login-orb login-orb-2" />
        <div className="login-orb login-orb-3" />

        <div className={`login-card-wrap ${mounted ? 'mounted' : ''}`}>
          <div className="login-card">
            {/* Logo */}
            <div className="login-logo">
              <div className="login-logo-icon">⚡</div>
              <span className="login-logo-text">Ad Network</span>
            </div>

            <h1 className="login-heading">Welcome back</h1>
            <p className="login-subheading">Sign in to your dashboard</p>

            <form onSubmit={handleSubmit} noValidate>
              {/* Error */}
              {error && (
                <div className="login-error">
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                  </svg>
                  {error}
                </div>
              )}

              {/* Email */}
              <div className="login-input-wrap">
                <label className="login-label" htmlFor="login-email">Email Address</label>
                <input
                  id="login-email"
                  type="email"
                  className="login-input"
                  placeholder="admin@adnetwork.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                />
                <span className="login-input-icon">
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </span>
              </div>

              {/* Password */}
              <div className="login-input-wrap">
                <label className="login-label" htmlFor="login-password">Password</label>
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  className="login-input"
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                />
                <span className="login-input-icon" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? (
                    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </span>
              </div>

              {/* Remember me & Forgot password */}
              <div className="login-row">
                <label className="login-remember">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={e => setRememberMe(e.target.checked)}
                  />
                  Remember me
                </label>
                <a className="login-forgot" href="#" onClick={e => e.preventDefault()}>
                  Forgot password?
                </a>
              </div>

              {/* Submit */}
              <button
                type="submit"
                id="login-submit-btn"
                className="login-btn"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <div className="login-spinner" />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign In
                    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </>
                )}
              </button>
            </form>

            {/* Demo credentials hint */}
            <div className="login-demo-hint">
              <div className="login-demo-hint-title">🔑 Demo Credentials</div>
              <div className="login-demo-row">Email: <span>admin@adnetwork.com</span></div>
              <div className="login-demo-row">Password: <span>admin123</span></div>
            </div>
          </div>

          <div className="login-footer">
            © 2025 Ad Network Platform. All rights reserved.
          </div>
        </div>
      </div>
    </>
  );
};
