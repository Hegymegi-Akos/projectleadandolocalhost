import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { adminProductsAPI, isAllowedAdminUser } from '../api/apiService';

const AdminProducts = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editProduct, setEditProduct] = useState(null);
  const [form, setForm] = useState({ nev:'', ar:'', akcios_ar:'', rovid_leiras:'', alkategoria_id:'', fo_kep:'', keszlet:999, aktiv:1 });

  useEffect(() => {
    if (!isAuthenticated || !isAllowedAdminUser(user)) { navigate('/admin'); return; }
    loadProducts();
  }, [isAuthenticated, user, navigate]);

  const loadProducts = async () => {
    try { const data = await adminProductsAPI.getAll(); setProducts(Array.isArray(data) ? data : []); }
    catch (err) { setError(err.message); }
    finally { setLoading(false); }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (editProduct) { await adminProductsAPI.update(editProduct.id, form); }
      else { await adminProductsAPI.create(form); }
      setEditProduct(null); setForm({ nev:'', ar:'', akcios_ar:'', rovid_leiras:'', alkategoria_id:'', fo_kep:'', keszlet:999, aktiv:1 });
      loadProducts();
    } catch (err) { setError(err.message); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Biztosan torlod?')) return;
    try { await adminProductsAPI.delete(id); loadProducts(); }
    catch (err) { setError(err.message); }
  };

  const startEdit = (product) => {
    setEditProduct(product);
    setForm({ nev: product.nev, ar: product.ar, akcios_ar: product.akcios_ar || '', rovid_leiras: product.rovid_leiras || '', alkategoria_id: product.alkategoria_id, fo_kep: product.fo_kep, keszlet: product.keszlet, aktiv: product.aktiv });
  };

  return (
    <main className="container page">
      <h1 className="page-title">Admin - Termekek</h1>
      {error && <div style={{ color:'#ef4444', marginBottom:12 }}>{error}</div>}

      <section className="ui-card" style={{ marginBottom:16 }}>
        <h3>{editProduct ? 'Termek szerkesztese' : 'Uj termek'}</h3>
        <form onSubmit={handleSave} className="form-grid form-grid-2">
          <div className="form-field"><label>Nev</label><input value={form.nev} onChange={(e) => setForm(p => ({...p, nev: e.target.value}))} required /></div>
          <div className="form-field"><label>Ar</label><input type="number" value={form.ar} onChange={(e) => setForm(p => ({...p, ar: e.target.value}))} required /></div>
          <div className="form-field"><label>Akcios ar</label><input type="number" value={form.akcios_ar} onChange={(e) => setForm(p => ({...p, akcios_ar: e.target.value}))} /></div>
          <div className="form-field"><label>Alkategoria ID</label><input type="number" value={form.alkategoria_id} onChange={(e) => setForm(p => ({...p, alkategoria_id: e.target.value}))} required /></div>
          <div className="form-field"><label>Fo kep URL</label><input value={form.fo_kep} onChange={(e) => setForm(p => ({...p, fo_kep: e.target.value}))} required /></div>
          <div className="form-field"><label>Keszlet</label><input type="number" value={form.keszlet} onChange={(e) => setForm(p => ({...p, keszlet: e.target.value}))} /></div>
          <div className="form-field form-span-2"><label>Rovid leiras</label><textarea value={form.rovid_leiras} onChange={(e) => setForm(p => ({...p, rovid_leiras: e.target.value}))} /></div>
          <button type="submit" className="btn-primary">{editProduct ? 'Mentes' : 'Letrehozas'}</button>
          {editProduct && <button type="button" onClick={() => { setEditProduct(null); setForm({ nev:'', ar:'', akcios_ar:'', rovid_leiras:'', alkategoria_id:'', fo_kep:'', keszlet:999, aktiv:1 }); }}>Megse</button>}
        </form>
      </section>

      {loading ? <p>Betoltes...</p> : (
        <div style={{ overflowX:'auto' }}>
          <table style={{ width:'100%', borderCollapse:'collapse' }}>
            <thead><tr style={{ borderBottom:'2px solid #e2e8f0' }}><th style={{padding:8,textAlign:'left'}}>ID</th><th style={{padding:8,textAlign:'left'}}>Nev</th><th style={{padding:8,textAlign:'left'}}>Ar</th><th style={{padding:8,textAlign:'left'}}>Keszlet</th><th style={{padding:8}}>Muveletek</th></tr></thead>
            <tbody>
              {products.map(p => (
                <tr key={p.id} style={{ borderBottom:'1px solid #e2e8f0' }}>
                  <td style={{padding:8}}>{p.id}</td>
                  <td style={{padding:8}}>{p.nev}</td>
                  <td style={{padding:8}}>{Number(p.ar).toLocaleString('hu-HU')} Ft</td>
                  <td style={{padding:8}}>{p.keszlet}</td>
                  <td style={{padding:8, display:'flex', gap:4}}>
                    <button onClick={() => startEdit(p)} style={{padding:'4px 8px', fontSize:'0.85rem'}}>Szerk</button>
                    <button onClick={() => handleDelete(p.id)} style={{padding:'4px 8px', fontSize:'0.85rem', background:'#ef4444'}}>Torles</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
};
export default AdminProducts;
