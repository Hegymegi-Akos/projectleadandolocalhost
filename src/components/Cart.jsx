import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { ordersAPI, couponsAPI } from '../api/apiService';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, getTotalPrice } = useCart();
  const { isAuthenticated } = useAuth();
  const [couponCode, setCouponCode] = useState('');
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [couponMsg, setCouponMsg] = useState('');
  const [orderForm, setOrderForm] = useState({ szallitasi_nev:'', szallitasi_cim:'', szallitasi_varos:'', szallitasi_irsz:'', szallitasi_mod:'GLS futar', fizetesi_mod:'Bankkartya', megjegyzes:'' });
  const [orderSuccess, setOrderSuccess] = useState('');
  const [orderError, setOrderError] = useState('');

  const total = getTotalPrice();
  const finalTotal = Math.max(0, total - couponDiscount);

  const handleApplyCoupon = async () => {
    setCouponMsg('');
    try {
      const data = await couponsAPI.apply(couponCode, total);
      if (data.success) { setCouponDiscount(data.kedvezmeny); setCouponMsg(`Kupon alkalmazva! Kedvezmeny: ${Math.round(data.kedvezmeny)} Ft`); }
      else { setCouponMsg(data.message || 'Ervenytelen kupon'); }
    } catch { setCouponMsg('Hiba a kupon alkalmazasakor'); }
  };

  const handleOrder = async (e) => {
    e.preventDefault();
    setOrderError(''); setOrderSuccess('');
    if (!isAuthenticated) { setOrderError('Bejelentkezes szukseges a rendeleshez'); return; }
    try {
      const orderData = {
        ...orderForm, osszeg: finalTotal,
        tetelek: cartItems.map(item => ({ termek_id: item.id, mennyiseg: item.quantity, ar: item.price }))
      };
      const data = await ordersAPI.create(orderData);
      if (data.rendeles_id || data.message?.includes('siker')) {
        setOrderSuccess('Rendeles sikeresen leadva!');
        clearCart(); setCouponDiscount(0);
      } else { setOrderError(data.message || 'Hiba tortent'); }
    } catch (err) { setOrderError(err.message || 'Szerver hiba'); }
  };

  if (cartItems.length === 0 && !orderSuccess) return (
    <main className="container page"><h1 className="page-title">Kosar</h1><section className="ui-card"><p>A kosarad ures.</p></section></main>
  );

  return (
    <main className="container page">
      <h1 className="page-title">Kosar</h1>
      {orderSuccess && <div style={{ color:'#22c55e', padding:16, background:'#f0fdf4', borderRadius:12, marginBottom:16 }}>{orderSuccess}</div>}
      {orderError && <div style={{ color:'#ef4444', padding:16, background:'#fef2f2', borderRadius:12, marginBottom:16 }}>{orderError}</div>}

      {cartItems.length > 0 && (
        <section className="ui-card">
          {cartItems.map(item => (
            <div key={item.id} style={{ display:'flex', gap:16, alignItems:'center', padding:'12px 0', borderBottom:'1px solid rgba(0,0,0,0.06)' }}>
              {item.img && <img src={item.img} alt={item.name} style={{ width:80, height:80, objectFit:'cover', borderRadius:8 }} />}
              <div style={{ flex:1 }}>
                <strong>{item.name}</strong>
                <div style={{ color:'var(--accent-primary)', fontWeight:700 }}>{item.price?.toLocaleString('hu-HU')} Ft</div>
              </div>
              <input type="number" value={item.quantity} min={1} onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)} style={{ width:70, padding:8, borderRadius:8, border:'2px solid rgba(15,23,42,0.1)', textAlign:'center' }} />
              <button onClick={() => removeFromCart(item.id)} style={{ background:'#ef4444', color:'white', padding:'8px 12px', borderRadius:8, border:'none', cursor:'pointer' }}>Torles</button>
            </div>
          ))}

          <div style={{ marginTop:16, display:'flex', gap:8, alignItems:'center' }}>
            <input value={couponCode} onChange={(e) => setCouponCode(e.target.value)} placeholder="Kupon kod" style={{ flex:1, padding:'10px 14px', borderRadius:8, border:'2px solid rgba(15,23,42,0.1)' }} />
            <button onClick={handleApplyCoupon}>Alkalmazas</button>
          </div>
          {couponMsg && <p style={{ marginTop:8, color: couponDiscount > 0 ? '#22c55e' : '#ef4444' }}>{couponMsg}</p>}

          <div style={{ marginTop:16, textAlign:'right' }}>
            {couponDiscount > 0 && <p>Kedvezmeny: -{Math.round(couponDiscount)} Ft</p>}
            <p style={{ fontSize:'1.3rem', fontWeight:800, color:'var(--accent-primary)' }}>Vegosszeg: {finalTotal.toLocaleString('hu-HU')} Ft</p>
          </div>

          <hr style={{ margin:'20px 0' }} />
          <h3>Szallitasi adatok</h3>
          <form onSubmit={handleOrder} className="form-grid">
            <div className="form-field"><label>Nev</label><input value={orderForm.szallitasi_nev} onChange={(e) => setOrderForm(prev => ({...prev, szallitasi_nev: e.target.value}))} required /></div>
            <div className="form-field"><label>Cim</label><input value={orderForm.szallitasi_cim} onChange={(e) => setOrderForm(prev => ({...prev, szallitasi_cim: e.target.value}))} required /></div>
            <div className="form-field"><label>Varos</label><input value={orderForm.szallitasi_varos} onChange={(e) => setOrderForm(prev => ({...prev, szallitasi_varos: e.target.value}))} required /></div>
            <div className="form-field"><label>Iranyitoszam</label><input value={orderForm.szallitasi_irsz} onChange={(e) => setOrderForm(prev => ({...prev, szallitasi_irsz: e.target.value}))} required /></div>
            <div className="form-field">
              <label>Szallitasi mod</label>
              <select value={orderForm.szallitasi_mod} onChange={(e) => setOrderForm(prev => ({...prev, szallitasi_mod: e.target.value}))}>
                <option>GLS futar</option><option>Foxpost</option><option>Szemelyes atvetel</option>
              </select>
            </div>
            <div className="form-field">
              <label>Fizetesi mod</label>
              <select value={orderForm.fizetesi_mod} onChange={(e) => setOrderForm(prev => ({...prev, fizetesi_mod: e.target.value}))}>
                <option>Bankkartya</option><option>Utanvet</option><option>Atutalas</option>
              </select>
            </div>
            <div className="form-field form-span-2"><label>Megjegyzes</label><textarea value={orderForm.megjegyzes} onChange={(e) => setOrderForm(prev => ({...prev, megjegyzes: e.target.value}))} /></div>
            <button type="submit" className="btn-primary">Rendeles leadasa</button>
          </form>
        </section>
      )}
    </main>
  );
};

export default Cart;
