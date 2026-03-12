import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { useFavorites } from '../contexts/FavoritesContext';
import { useTheme } from '../contexts/ThemeContext';
import { isAllowedAdminUser } from '../api/apiService';

const Header = () => {
  const { getTotalItems } = useCart();
  const itemCount = getTotalItems();
  const { user, logout, isAuthenticated } = useAuth();
  const { favoritesCount } = useFavorites();
  const { darkMode, toggleDarkMode } = useTheme();
  const isAdmin = isAllowedAdminUser(user);
  const [searchTerm, setSearchTerm] = useState('');
  const [openMenu, setOpenMenu] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Close menus on route change
  useEffect(() => {
    setOpenMenu(false);
    setMobileNav(false);
  }, [location.pathname]);

  useEffect(() => {
    const close = (e) => {
      if (!e.target.closest('.user-menu')) setOpenMenu(false);
    };
    document.addEventListener('click', close);
    return () => document.removeEventListener('click', close);
  }, []);

  // Prevent scroll when mobile nav is open
  useEffect(() => {
    document.body.style.overflow = mobileNav ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileNav]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
      setMobileNav(false);
    }
  };

  const navTo = (path) => {
    navigate(path);
    setOpenMenu(false);
    setMobileNav(false);
  };

  return (
    <>
      <header className="site-header" role="banner">
        <div className="container header-inner">
          <div className="header-left">
            <h1 className="site-title"><Link to="/">Kisallat webshop</Link></h1>
            <form onSubmit={handleSearch} className="header-search desktop-only">
              <input className="search-input" aria-label="Kereses" placeholder="Kereses (tap, poraz...)" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
              <button type="submit" className="search-btn">Keres</button>
            </form>
          </div>

          <nav className="site-nav desktop-only" role="navigation">
            <ul>
              <li><Link className="klink" to="/">Kezdolap</Link></li>
              <li><Link className="klink" to="/about">Rolunk</Link></li>
              <li><Link className="klink" to="/tips">Tippek</Link></li>
              {!isAuthenticated && (
                <li><Link className="klink auth-btn" to="/auth">Bejelentkezes</Link></li>
              )}
              {isAuthenticated && (
                <li className="user-menu" style={{ position: 'relative' }}>
                  <button onClick={() => setOpenMenu(prev => !prev)} className="user-menu-btn">
                    {isAdmin && <span className="admin-dot" />}
                    {user?.felhasznalonev || 'Fiok'}
                  </button>
                  {openMenu && (
                    <div className="dropdown-menu">
                      <div className="dropdown-header">
                        <p className="dropdown-name">{user?.felhasznalonev}</p>
                        <p className="dropdown-email">{user?.email}</p>
                        {isAdmin && <span className="dropdown-admin-badge">Admin</span>}
                      </div>
                      <div className="dropdown-divider" />
                      {isAdmin && (
                        <>
                          <button onClick={() => navTo('/admin')} className="dropdown-item dropdown-item-admin">Admin panel</button>
                          <button onClick={() => navTo('/admin/products')} className="dropdown-item dropdown-item-admin">Termekek kezelese</button>
                          <button onClick={() => navTo('/admin/users')} className="dropdown-item dropdown-item-admin">Felhasznalok</button>
                          <button onClick={() => navTo('/admin/coupons')} className="dropdown-item dropdown-item-admin">Kuponok kezelese</button>
                          <div className="dropdown-divider" />
                        </>
                      )}
                      <button onClick={() => navTo('/orders')} className="dropdown-item">Rendeleseim</button>
                      <button onClick={() => navTo('/coupons')} className="dropdown-item">Kuponjaim</button>
                      <button onClick={() => navTo('/wall')} className="dropdown-item">Fal & Velemenyek</button>
                      <div className="dropdown-divider" />
                      <button onClick={() => { logout(); navTo('/'); }} className="dropdown-item dropdown-item-danger">Kijelentkezes</button>
                    </div>
                  )}
                </li>
              )}
              <li>
                <Link className="klink" to="/favorites" style={{ position: 'relative' }}>
                  Kedvencek
                  {favoritesCount > 0 && <span className="badge badge-danger" style={{ position: 'absolute', top: -6, right: -10 }}>{favoritesCount}</span>}
                </Link>
              </li>
              <li>
                <button onClick={toggleDarkMode} className="klink theme-toggle" title={darkMode ? 'Vilagos mod' : 'Sotet mod'}>
                  {darkMode ? 'Vilagos' : 'Sotet'}
                </button>
              </li>
              <li>
                <Link className="klink" to="/cart" style={{ position: 'relative' }}>
                  Kosar
                  {itemCount > 0 && <span className="badge badge-primary" style={{ position: 'absolute', top: -6, right: -10 }}>{itemCount > 99 ? '99+' : itemCount}</span>}
                </Link>
              </li>
            </ul>
          </nav>

          {/* Mobile: right side icons */}
          <div className="mobile-header-right mobile-only">
            <Link to="/cart" className="mobile-icon-btn" style={{ position: 'relative' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
              {itemCount > 0 && <span className="badge badge-primary mobile-badge">{itemCount > 99 ? '99+' : itemCount}</span>}
            </Link>
            <button onClick={toggleDarkMode} className="mobile-icon-btn" title={darkMode ? 'Vilagos mod' : 'Sotet mod'}>
              {darkMode ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
              )}
            </button>
            <button className="hamburger-btn" onClick={() => setMobileNav(prev => !prev)} aria-label="Menu">
              {mobileNav ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M3 12h18M3 6h18M3 18h18"/></svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile navigation overlay */}
      {mobileNav && (
        <div className="mobile-nav-overlay" onClick={() => setMobileNav(false)}>
          <nav className="mobile-nav" onClick={(e) => e.stopPropagation()}>
            <form onSubmit={handleSearch} className="mobile-search">
              <input className="search-input" placeholder="Kereses..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
              <button type="submit" className="search-btn">Keres</button>
            </form>

            <div className="mobile-nav-section">
              <button onClick={() => navTo('/')} className="mobile-nav-item">Kezdolap</button>
              <button onClick={() => navTo('/about')} className="mobile-nav-item">Rolunk</button>
              <button onClick={() => navTo('/tips')} className="mobile-nav-item">Tippek</button>
              <button onClick={() => navTo('/favorites')} className="mobile-nav-item">
                Kedvencek {favoritesCount > 0 && <span className="badge badge-danger">{favoritesCount}</span>}
              </button>
              <button onClick={() => navTo('/cart')} className="mobile-nav-item">
                Kosar {itemCount > 0 && <span className="badge badge-primary">{itemCount}</span>}
              </button>
            </div>

            {!isAuthenticated && (
              <div className="mobile-nav-section">
                <button onClick={() => navTo('/auth')} className="mobile-nav-item mobile-nav-auth">Bejelentkezes / Regisztracio</button>
              </div>
            )}

            {isAuthenticated && (
              <>
                <div className="mobile-nav-section">
                  <div className="mobile-nav-user">
                    <strong>{user?.felhasznalonev}</strong>
                    <span>{user?.email}</span>
                  </div>
                  <button onClick={() => navTo('/orders')} className="mobile-nav-item">Rendeleseim</button>
                  <button onClick={() => navTo('/coupons')} className="mobile-nav-item">Kuponjaim</button>
                  <button onClick={() => navTo('/wall')} className="mobile-nav-item">Fal & Velemenyek</button>
                </div>

                {isAdmin && (
                  <div className="mobile-nav-section mobile-nav-admin">
                    <p className="mobile-nav-label">Admin</p>
                    <button onClick={() => navTo('/admin')} className="mobile-nav-item">Admin panel</button>
                    <button onClick={() => navTo('/admin/products')} className="mobile-nav-item">Termekek kezelese</button>
                    <button onClick={() => navTo('/admin/users')} className="mobile-nav-item">Felhasznalok</button>
                    <button onClick={() => navTo('/admin/coupons')} className="mobile-nav-item">Kuponok kezelese</button>
                  </div>
                )}

                <div className="mobile-nav-section">
                  <button onClick={() => { logout(); navTo('/'); }} className="mobile-nav-item mobile-nav-logout">Kijelentkezes</button>
                </div>
              </>
            )}
          </nav>
        </div>
      )}
    </>
  );
};

export default Header;
