import React, { useState, useRef } from 'react';
import { navbarStyles } from '../assets/dummyStyles';
import logo from '../assets/logo.png';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { SignedIn, SignedOut, useUser, useAuth, useClerk } from '@clerk/clerk-react';

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const { user } = useUser();
  const clerk = useClerk();
  const navigate = useNavigate();
  const location = useLocation();

  /* =========================================================
     🚫 HIDE NAVBAR INSIDE DASHBOARD
  ========================================================= */

  if (location.pathname.startsWith('/app')) {
    return null;
  }

  function openSignIn() {
    try {
      clerk?.openSignIn?.() ?? navigate('/login');
    } catch {
      navigate('/login');
    }
  }

  function openSignUp() {
    try {
      clerk?.openSignUp?.() ?? navigate('/signup');
    } catch {
      navigate('/signup');
    }
  }

  return (
    <header className={navbarStyles.header}>
      <div className={navbarStyles.container}>
        <nav className={navbarStyles.nav}>
          {/* Logo */}
          <div className={navbarStyles.logoSection}>
            <Link to="/" className={navbarStyles.logoLink}>
              <img src={logo} alt="InvoiceAI Logo" className={navbarStyles.logoImage} />
              <span className={navbarStyles.logoText}>InvoiceAI</span>
            </Link>

            <div className={navbarStyles.desktopNav}>
              <a href="#features" className={navbarStyles.navLink}>Features</a>
              <a href="#pricing" className={navbarStyles.navLinkInactive}>Pricing</a>
            </div>
          </div>

          {/* Auth */}
          <div className={navbarStyles.authSection}>
            <SignedOut>
              <div className="flex items-center gap-4">
                <button onClick={openSignIn} className={navbarStyles.signInButton}>
                  Sign in
                </button>
                <button onClick={openSignUp} className={navbarStyles.signUpButton}>
                  <span className={navbarStyles.signUpText}>Get Started</span>
                </button>
              </div>
            </SignedOut>

            <SignedIn>
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-700">
                  {user?.fullName || user?.firstName || 'Account'}
                </span>
                <button
                  onClick={() => clerk.signOut(() => navigate('/'))}
                  className={navbarStyles.signInButton}
                >
                  Sign out
                </button>
              </div>
            </SignedIn>
          </div>
        </nav>
      </div>
    </header>
  );
};
