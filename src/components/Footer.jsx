import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer" role="contentinfo">
      <div className="container footer-grid">
        <div>
          <h4 style={{ color: '#fff', fontSize: '1.1rem', marginBottom: 12 }}>Kisállat Webshop</h4>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.6 }}>
            Minosegi allateledel es kiegeszitok - gyors kiszallitas szerte az orszagban.
          </p>
        </div>
        <div>
          <h4 style={{ color: '#fff', fontSize: '1.1rem', marginBottom: 12 }}>Kapcsolat</h4>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.8 }}>
            info@kisallatwebshop.hu<br />
            +36 30 123 4567<br />
            Budapest, Pet utca 12.
          </p>
        </div>
        <div>
          <h4 style={{ color: '#fff', fontSize: '1.1rem', marginBottom: 12 }}>Gyors linkek</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <Link to="/" style={{ color: '#94a3b8', fontSize: '0.9rem', textDecoration: 'none', transition: 'color 200ms' }}>Kezdőlap</Link>
            <Link to="/about" style={{ color: '#94a3b8', fontSize: '0.9rem', textDecoration: 'none' }}>Rólunk</Link>
            <Link to="/gallery" style={{ color: '#94a3b8', fontSize: '0.9rem', textDecoration: 'none' }}>Galéria</Link>
            <Link to="/tips" style={{ color: '#94a3b8', fontSize: '0.9rem', textDecoration: 'none' }}>Tippek</Link>
            <Link to="/contact" style={{ color: '#94a3b8', fontSize: '0.9rem', textDecoration: 'none' }}>Kapcsolat</Link>
          </div>
        </div>
      </div>
      <div style={{ textAlign: 'center', padding: '20px 24px', borderTop: '1px solid rgba(255,255,255,0.06)', color: 'rgba(148,163,184,0.7)', fontSize: '0.825rem' }}>
        &copy; {new Date().getFullYear()} Kisállat Webshop. Minden jog fenntartva.
      </div>
    </footer>
  );
};

export default Footer;
