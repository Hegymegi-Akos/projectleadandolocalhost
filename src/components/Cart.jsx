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
  const [orderForm, setOrderForm] = useState({ szallitasi_nev: '', szallitasi_cim: '', szallitasi_varos: '', szallitasi_irsz: '', szallitasi_mod: 'GLS futar', fizetesi_mod: 'Bankkartya', megjegyzes: '' });
  const [orderSuccess, setOrderSuccess] = useState('');
  const [orderError, setOrderError] = useState('');
  const [ordering, setOrdering] = useState(false);

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
    setOrderError(''); setOrderSuccess(''); setOrdering(true);
    if (!isAuthenticated) { setOrderError('Bejelentkezes szukseges a rendeleshez'); setOrdering(false); return; }
    try {
      const orderData = {
        ...orderForm, osszeg: finalTotal,
        tetelek: cartItems.map(item => ({ termek_id: item.id, mennyiseg: item.quantity }))
      };
      const data = await ordersAPI.create(orderData);
      if (data.rendeles_id || data.message?.includes('siker')) {
        setOrderSuccess(`Rendeles sikeresen leadva! Rendeleszam: ${data.rendeles_szam || ''}`);
        clearCart(); setCouponDiscount(0);
      } else { setOrderError(data.message || 'Hiba tortent'); }
    } catch (err) { setOrderError(err.message || 'Szerver hiba'); }
    finally { setOrdering(false); }
  };

  if (cartItems.length === 0 && !orderSuccess) return (
    <main className="container page">
      <h1 className="page-title">Kosar</h1>
      <section className="ui-card" style={{ textAlign: 'center', padding: 48 }}>
        <p style={{ fontSize: '1.1rem', color: 'var(--color-text-secondary)' }}>A kosarad ures.</p>
      </section>
    </main>
  );

  return (
    <main className="container page">
      <h1 className="page-title">Kosar</h1>
      {orderSuccess && <div style={{ color: '#059669', padding: '16px 20px', background: '#ecfdf5', borderRadius: 12, marginBottom: 20, fontWeight: 600, textAlign: 'center' }}>{orderSuccess}</div>}
      {orderError && <div style={{ color: 'var(--danger)', padding: '16px 20px', background: 'var(--danger-light)', borderRadius: 12, marginBottom: 20, fontWeight: 600, textAlign: 'center' }}>{orderError}</div>}

      {cartItems.length > 0 && (
        <>
          <section className="ui-card" style={{ marginBottom: 24 }}>
            {cartItems.map((item, i) => (
              <div key={item.id} style={{ display: 'flex', gap: 16, alignItems: 'center', padding: '16px 0', borderBottom: i < cartItems.length - 1 ? '1px solid var(--color-bg-alt)' : 'none' }}>
                {item.img && <img src={item.img} alt={item.name} style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 12, flexShrink: 0 }} />}
                <div style={{ flex: 1 }}>
                  <strong style={{ fontSize: '1rem' }}>{item.name}</strong>
                  <div style={{ color: 'var(--primary)', fontWeight: 700, fontSize: '1.1rem', marginTop: 4 }}>{item.price?.toLocaleString('hu-HU')} Ft</div>
                </div>
                <input type="number" value={item.quantity} min={1} onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)} style={{ width: 65, textAlign: 'center' }} />
                <button onClick={() => removeFromCart(item.id)} className="btn-danger" style={{ padding: '8px 14px', fontSize: '0.85rem' }}>Torles</button>
              </div>
            ))}

            <div style={{ marginTop: 20, display: 'flex', gap: 8, alignItems: 'center' }}>
              <input value={couponCode} onChange={(e) => setCouponCode(e.target.value)} placeholder="Kupon kod" style={{ flex: 1 }} />
              <button onClick={handleApplyCoupon} className="btn-secondary">Alkalmazas</button>
            </div>
            {couponMsg && <p style={{ marginTop: 8, fontSize: '0.9rem', fontWeight: 600, color: couponDiscount > 0 ? '#059669' : 'var(--danger)' }}>{couponMsg}</p>}

            <div style={{ marginTop: 20, textAlign: 'right', padding: '16px 0 0', borderTop: '2px solid var(--color-bg-alt)' }}>
              {couponDiscount > 0 && <p style={{ color: '#059669', fontWeight: 600 }}>Kedvezmeny: -{Math.round(couponDiscount).toLocaleString('hu-HU')} Ft</p>}
              <p style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--primary)' }}>Vegosszeg: {finalTotal.toLocaleString('hu-HU')} Ft</p>
            </div>
          </section>

          <section className="ui-card">
            <h3 style={{ margin: '0 0 20px', fontSize: '1.2rem' }}>Szallitasi adatok</h3>
            <form onSubmit={handleOrder} className="form-grid">
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 12 }}>
                <div className="form-field"><label>Nev</label><input value={orderForm.szallitasi_nev} onChange={(e) => setOrderForm(prev => ({ ...prev, szallitasi_nev: e.target.value }))} required placeholder="Teljes nev" /></div>
                <div className="form-field"><label>Iranyitoszam</label><input value={orderForm.szallitasi_irsz} onChange={(e) => setOrderForm(prev => ({ ...prev, szallitasi_irsz: e.target.value }))} required placeholder="1234" /></div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div className="form-field"><label>Varos</label><input value={orderForm.szallitasi_varos} onChange={(e) => setOrderForm(prev => ({ ...prev, szallitasi_varos: e.target.value }))} required placeholder="Budapest" /></div>
                <div className="form-field"><label>Cim</label><input value={orderForm.szallitasi_cim} onChange={(e) => setOrderForm(prev => ({ ...prev, szallitasi_cim: e.target.value }))} required placeholder="Utca, hazszam" /></div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div className="form-field">
                  <label>Szallitasi mod</label>
                  <select value={orderForm.szallitasi_mod} onChange={(e) => setOrderForm(prev => ({ ...prev, szallitasi_mod: e.target.value }))}>
                    <option>GLS futar</option><option>Foxpost</option><option>Szemelyes atvetel</option>
                  </select>
                </div>
                <div className="form-field">
                  <label>Fizetesi mod</label>
                  <select value={orderForm.fizetesi_mod} onChange={(e) => setOrderForm(prev => ({ ...prev, fizetesi_mod: e.target.value }))}>
                    <option>Bankkartya</option><option>Utanvet</option><option>Atutalas</option>
                  </select>
                </div>
              </div>
              <div className="form-field"><label>Megjegyzes (opcionalis)</label><textarea value={orderForm.megjegyzes} onChange={(e) => setOrderForm(prev => ({ ...prev, megjegyzes: e.target.value }))} rows={3} placeholder="Pl. csengessen ketszer..." /></div>
              <button type="submit" className="btn-primary" disabled={ordering} style={{ width: '100%', padding: 16, fontSize: '1.05rem', borderRadius: 14 }}>
                {ordering ? 'Feldolgozas...' : `Rendeles leadasa - ${finalTotal.toLocaleString('hu-HU')} Ft`}
              </button>
            </form>
          </section>
        </>
      )}
    </main>
  );
};

export default Cart;
