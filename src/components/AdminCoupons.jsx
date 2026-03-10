import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { couponsAPI, isAllowedAdminUser } from '../api/apiService';

const AdminCoupons = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ kod:'', tipus:'szazalek', ertek:'', min_osszeg:0, felhasznalasi_limit:'', ervenyes_veg:'', aktiv:1 });

  useEffect(() => {
    if (!isAuthenticated || !isAllowedAdminUser(user)) { navigate('/admin'); return; }
    loadCoupons();
  }, [isAuthenticated, user, navigate]);

  const loadCoupons = async () => {
    try { const data = await couponsAPI.getAll(); setCoupons(Array.isArray(data) ? data : []); }
    catch (err) { setError(err.message); }
    finally { setLoading(false); }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await couponsAPI.create(form);
      setForm({ kod:'', tipus:'szazalek', ertek:'', min_osszeg:0, felhasznalasi_limit:'', ervenyes_veg:'', aktiv:1 });
      loadCoupons();
    } catch (err) { setError(err.message); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Biztosan torlod?')) return;
    try { await couponsAPI.delete(id); loadCoupons(); }
    catch (err) { setError(err.message); }
  };

  return (
    <main className="container page">
      <h1 className="page-title">Admin - Kuponok</h1>
      {error && <div style={{ color:'#ef4444', marginBottom:12 }}>{error}</div>}

      <section className="ui-card" style={{ marginBottom:16 }}>
        <h3>Uj kupon</h3>
        <form onSubmit={handleCreate} className="form-grid form-grid-2">
          <div className="form-field"><label>Kod</label><input value={form.kod} onChange={(e) => setForm(p => ({...p, kod: e.target.value}))} required /></div>
          <div className="form-field"><label>Tipus</label><select value={form.tipus} onChange={(e) => setForm(p => ({...p, tipus: e.target.value}))}><option value="szazalek">Szazalek</option><option value="fix">Fix osszeg</option></select></div>
          <div className="form-field"><label>Ertek</label><input type="number" value={form.ertek} onChange={(e) => setForm(p => ({...p, ertek: e.target.value}))} required /></div>
          <div className="form-field"><label>Min. osszeg</label><input type="number" value={form.min_osszeg} onChange={(e) => setForm(p => ({...p, min_osszeg: e.target.value}))} /></div>
          <div className="form-field"><label>Felhasznalasi limit</label><input type="number" value={form.felhasznalasi_limit} onChange={(e) => setForm(p => ({...p, felhasznalasi_limit: e.target.value}))} /></div>
          <div className="form-field"><label>Ervenyes veg</label><input type="datetime-local" value={form.ervenyes_veg} onChange={(e) => setForm(p => ({...p, ervenyes_veg: e.target.value}))} /></div>
          <button type="submit" className="btn-primary">Letrehozas</button>
        </form>
      </section>

      {loading ? <p>Betoltes...</p> : (
        <div style={{ overflowX:'auto' }}>
          <table style={{ width:'100%', borderCollapse:'collapse' }}>
            <thead><tr style={{ borderBottom:'2px solid #e2e8f0' }}><th style={{padding:8,textAlign:'left'}}>Kod</th><th style={{padding:8,textAlign:'left'}}>Tipus</th><th style={{padding:8,textAlign:'left'}}>Ertek</th><th style={{padding:8}}>Aktiv</th><th style={{padding:8}}>Muveletek</th></tr></thead>
            <tbody>
              {coupons.map(c => (
                <tr key={c.id} style={{ borderBottom:'1px solid #e2e8f0' }}>
                  <td style={{padding:8}}>{c.kod}</td>
                  <td style={{padding:8}}>{c.tipus}</td>
                  <td style={{padding:8}}>{c.tipus === 'szazalek' ? `${c.ertek}%` : `${Number(c.ertek).toLocaleString('hu-HU')} Ft`}</td>
                  <td style={{padding:8, textAlign:'center'}}>{c.aktiv ? 'Igen' : 'Nem'}</td>
                  <td style={{padding:8}}><button onClick={() => handleDelete(c.id)} style={{padding:'4px 8px', fontSize:'0.85rem', background:'#ef4444'}}>Torles</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
};
export default AdminCoupons;
