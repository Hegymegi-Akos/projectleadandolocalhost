import React from 'react';

const Footer = () => {
  return (
    <footer className="footer" role="contentinfo">
      <div className="container" style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:20, padding:'36px 16px 18px', color:'#e6f0f6' }}>
        <div>
          <h4 style={{color:'#fff'}}>Kisallat webshop</h4>
          <p>Minosegi allateledel es kiegeszitok - gyors kiszallitas.</p>
        </div>
        <div>
          <h4 style={{color:'#fff'}}>Kapcsolat</h4>
          <p>info@kisallatwebshop.hu<br/>+36 30 123 4567</p>
        </div>
        <div>
          <h4 style={{color:'#fff'}}>Gyors linkek</h4>
          <p><a href="/" style={{color:'#d9ecff'}}>Kezdolap</a><br/><a href="/about" style={{color:'#d9ecff'}}>Rolunk</a><br/><a href="/gallery" style={{color:'#d9ecff'}}>Galeria</a></p>
        </div>
      </div>
      <div style={{ textAlign:'center', padding:'16px', color:'rgba(230,240,246,0.8)', fontSize:14 }}>
        &copy; {new Date().getFullYear()} Kisallat Webshop. Minden jog fenntartva.
      </div>
    </footer>
  );
};

export default Footer;
