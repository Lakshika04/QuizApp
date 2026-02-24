import React, { useState, useEffect } from 'react'
import { navbarStyles } from '../assets/dummystyle'
import { Link, useNavigate } from 'react-router-dom'
import { Award, LogIn, LogOut, Menu, X } from 'lucide-react';

const Navbar = () => {

  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  //Check login status on mount
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const user = localStorage.getItem('currentUser');
    if (token && user) {
      setLoggedIn(true);
      setCurrentUser(JSON.parse(user));
    }

    // Listen for auth changes
    const handleAuthChange = (event) => {
      const user = event.detail?.user;
      if (user) {
        setLoggedIn(true);
        setCurrentUser(user);
      } else {
        setLoggedIn(false);
        setCurrentUser(null);
      }
    };

    window.addEventListener('authChange', handleAuthChange);
    return () => window.removeEventListener('authChange', handleAuthChange);
  }, []);

  //Logout function
  const handleLogout = () => {
    try {
      localStorage.removeItem('authToken')
      localStorage.removeItem('currentUser');
    }
    catch (error) {
      //ignore all error
    }
    window.dispatchEvent(
      new CustomEvent('authChange', { detail: { user: null } })
    )
    setMenuOpen(false);
    try {
      navigate('/login');
    }
    catch (error) {
      window.location.href = "/login";
    }
  }

  return (
    <div>
      <nav className={navbarStyles.nav}>
        <div
          style={{
            backgroundImage: navbarStyles.decorativePatternBackground,
          }}
          className={navbarStyles.decorativePattern}
        ></div>

        <div className={navbarStyles.bubble1}></div>

        <div className={navbarStyles.bubble2}></div>

        <div className={navbarStyles.bubble3}></div>

        <div className={navbarStyles.container}>
          {/* Logo section */}
          <div className={navbarStyles.logoContainer}>
            <button className={navbarStyles.logoButton}>
              <Link to="/" className={navbarStyles.logoLink}>
                <div className={navbarStyles.logoInner}>
                  <Award className={navbarStyles.logoImage} />
                </div>
              </Link>
            </button>
          </div>

          {/* Title section */}
          <div className={navbarStyles.titleContainer}>
            <div className={navbarStyles.titleBackground}>
              <h1 className={navbarStyles.titleText}>Quiz Master</h1>
            </div>
          </div>

          {/* Desktop buttons */}
          <div className={navbarStyles.desktopButtonsContainer}>
            {loggedIn ? (
              <>
                <span className="text-sm text-gray-700 px-3">
                  Welcome, {currentUser?.name || currentUser?.email}
                </span>
                <Link to="/results" className={navbarStyles.resultsButton}>
                  <Award className={navbarStyles.buttonIcon} />
                  <span>Results</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className={navbarStyles.logoutButton}
                >
                  <LogOut className={navbarStyles.buttonIcon} />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className={navbarStyles.loginButton}>
                  <LogIn className={navbarStyles.buttonIcon} />
                  <span>Login</span>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className={navbarStyles.mobileMenuContainer}>
            <button
              className={navbarStyles.menuToggleButton}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? (
                <X className={navbarStyles.menuIcon} />
              ) : (
                <Menu className={navbarStyles.menuIcon} />
              )}
            </button>
          </div>

          {/* Mobile menu panel */}
          {menuOpen && (
            <div className={navbarStyles.mobileMenuPanel}>
              <ul className={navbarStyles.mobileMenuList}>
                {loggedIn ? (
                  <>
                    <li className={navbarStyles.mobileMenuItem}>
                      <span className="text-xs text-gray-600">
                        {currentUser?.name || currentUser?.email}
                      </span>
                    </li>
                    <li>
                      <Link
                        to="/results"
                        className={navbarStyles.mobileMenuItem}
                        onClick={() => setMenuOpen(false)}
                      >
                        <Award className={navbarStyles.mobileMenuIcon} />
                        <span>Results</span>
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className={navbarStyles.mobileMenuItem}
                      >
                        <LogOut className={navbarStyles.mobileMenuIcon} />
                        <span>Logout</span>
                      </button>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link
                        to="/login"
                        className={navbarStyles.mobileMenuItem}
                        onClick={() => setMenuOpen(false)}
                      >
                        <LogIn className={navbarStyles.mobileMenuIcon} />
                        <span>Login</span>
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          )}
        </div>
      </nav>
      <style>{navbarStyles.animations}</style>
    </div>
  )
}

export default Navbar