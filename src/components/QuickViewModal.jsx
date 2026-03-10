import React from 'react';
import { useCart } from '../contexts/CartContext';

const QuickViewModal = ({ product, show, onClose }) => {
  const { addToCart } = useCart();

  if (!show || !product) return null;

  return (
    <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.5)', zIndex:1000, display:'flex', alignItems:'center', justifyContent:'center' }} onClick={onClose}>
      <div style={{ background:'white', borderRadius:16, padding:24, maxWidth:500, width:'90%', maxHeight:'80vh', overflow:'auto' }} onClick={(e) => e.stopPropagation()}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:16 }}>
          <h2 style={{ margin:0 }}>{product.name}</h2>
          <button onClick={onClose} style={{ background:'none', border:'none', fontSize:24, cursor:'pointer', padding:4 }}>X</button>
        </div>
        {product.img && <img src={product.img} alt={product.name} style={{ width:'100%', borderRadius:12, marginBottom:16 }} />}
        {product.desc && <p style={{ color:'var(--text-secondary)' }}>{product.desc}</p>}
        <p style={{ fontSize:'1.5rem', fontWeight:800, color:'var(--accent-primary)' }}>{product.price?.toLocaleString('hu-HU')} Ft</p>
        <button onClick={() => { addToCart(product); onClose(); }} className="btn-primary" style={{ width:'100%', marginTop:12 }}>Kosarba</button>
      </div>
    </div>
  );
};

export default QuickViewModal;
