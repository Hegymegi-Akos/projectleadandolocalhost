import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();

  useEffect(() => {
    const closeOnOutsideClick = (e) => {
      if (!e.target.closest('.user-menu')) setOpenMenu(false);
    };
    document.addEventListener('click', closeOnOutsideClick);
    return () => document.removeEventListener('click', closeOnOutsideClick);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
  };

  return (
    <header className="site-header" role="banner">
      <div className="container header-inner">
        <div className="header-left">
          <h1 className="site-title"><Link to="/">Kisallat webshop</Link></h1>
          <div className="header-actions">
            <form onSubmit={handleSearch} style={{ display: 'flex', gap: 8 }}>
              <input className="search-input" aria-label="Kereses" placeholder="Kereses (tap, poraz...)" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
              <button type="submit" className="search-btn" aria-label="Kereses" style={{padding:'8px 14px'}}>Keres</button>
            </form>
          </div>
        </div>
        <nav className="site-nav" role="navigation">
          <ul>
            <li><Link className="klink" to="/">Kezdolap</Link></li>
            <li><Link className="klink" to="/about">Rolunk</Link></li>
            <li><Link className="klink" to="/tips">Tippek</Link></li>
            {!isAuthenticated && (
              <li><Link className="klink" to="/auth">Bejelentkezes / Regisztracio</Link></li>
            )}
            {isAuthenticated && (
              <li className="user-menu" style={{ position: 'relative' }}>
                <button onClick={() => setOpenMenu(prev => !prev)} style={{ background:'none', border:'none', color:'var(--text-primary)', cursor:'pointer', fontWeight:700 }}>
                  {user?.felhasznalonev || 'Fiok'}
                </button>
                {openMenu && (
                  <div style={{ position:'absolute', top:'110%', right:0, background:'white', borderRadius:12, boxShadow:'0 10px 30px rgba(15,23,42,0.16)', padding:12, minWidth:180, zIndex:20 }}>
                    <p style={{ margin:'0 0 8px', fontWeight:700 }}>{user?.email}</p>
                    {isAdmin && <button onClick={() => { setOpenMenu(false); navigate('/admin'); }} style={{ width:'100%', background:'linear-gradient(135deg,#0ea5e9,#2563eb)', color:'white', border:'none', borderRadius:8, padding:'10px 12px', cursor:'pointer', fontWeight:700, marginBottom:8 }}>Admin</button>}
                    <button onClick={() => { setOpenMenu(false); navigate('/orders'); }} style={{ width:'100%', background:'var(--accent-gradient)', color:'white', border:'none', borderRadius:8, padding:'10px 12px', cursor:'pointer', fontWeight:700, marginBottom:8 }}>Rendeleseim</button>
                    <button onClick={() => { setOpenMenu(false); navigate('/coupons'); }} style={{ width:'100%', background:'linear-gradient(135deg,#f59e0b,#d97706)', color:'white', border:'none', borderRadius:8, padding:'10px 12px', cursor:'pointer', fontWeight:700, marginBottom:8 }}>Kuponjaim</button>
                    <button onClick={() => { setOpenMenu(false); navigate('/wall'); }} style={{ width:'100%', background:'linear-gradient(135deg,#8b5cf6,#7c3aed)', color:'white', border:'none', borderRadius:8, padding:'10px 12px', cursor:'pointer', fontWeight:700, marginBottom:8 }}>Velemenyek & Fal</button>
                    <button onClick={() => { logout(); setOpenMenu(false); navigate('/'); }} style={{ width:'100%', background:'linear-gradient(135deg,#ef4444,#dc2626)', color:'white', border:'none', borderRadius:8, padding:'10px 12px', cursor:'pointer', fontWeight:700 }}>Kijelentkezes</button>
                  </div>
                )}
              </li>
            )}
            <li>
              <Link className="klink" to="/favorites" style={{ position:'relative' }}>
                Kedvencek
                {favoritesCount > 0 && <span style={{ position:'absolute', top:-8, right:-8, background:'linear-gradient(135deg,#ec4899,#db2777)', color:'white', borderRadius:'50%', width:20, height:20, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'0.7rem', fontWeight:800 }}>{favoritesCount}</span>}
              </Link>
            </li>
            <li>
              <button onClick={toggleDarkMode} className="klink" style={{ background:'none', border:'none', cursor:'pointer', fontSize:'1.2rem', padding:8 }} title={darkMode ? 'Vilagos mod' : 'Sotet mod'}>
                {darkMode ? 'Vilagos' : 'Sotet'}
              </button>
            </li>
            <li>
              <Link className="klink" to="/cart" style={{ position:'relative' }}>
                Kosar
                {itemCount > 0 && <span style={{ position:'absolute', top:-8, right:-8, background:'linear-gradient(135deg,#ef4444,#dc2626)', color:'white', borderRadius:'50%', width:24, height:24, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'0.75rem', fontWeight:800 }}>{itemCount > 99 ? '99+' : itemCount}</span>}
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
