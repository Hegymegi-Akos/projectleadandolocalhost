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
  const [form, setForm] = useState({ kod: '', tipus: 'szazalek', ertek: '', min_osszeg: 0, felhasznalasi_limit: '', ervenyes_veg: '', aktiv: 1 });

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
      setForm({ kod: '', tipus: 'szazalek', ertek: '', min_osszeg: 0, felhasznalasi_limit: '', ervenyes_veg: '', aktiv: 1 });
      loadCoupons();
    } catch (err) { setError(err.message); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Biztosan torlod?')) return;
    try { await couponsAPI.delete(id); loadCoupons(); }
    catch (err) { setError(err.message); }
  };

  return (
    <main className="admin-page container page">
      <h1 className="page-title">Admin - Kuponok</h1>
      {error && <div style={{ color: 'var(--danger)', marginBottom: 16, padding: '12px 16px', background: 'var(--danger-light)', borderRadius: 10, fontWeight: 600, fontSize: '0.9rem', textAlign: 'center' }}>{error}</div>}

      <section className="ui-card" style={{ marginBottom: 24 }}>
        <h3 style={{ margin: '0 0 16px', fontSize: '1.1rem' }}>Uj kupon</h3>
        <form onSubmit={handleCreate} className="form-grid-2">
          <div className="form-field"><label>Kod</label><input value={form.kod} onChange={(e) => setForm(p => ({ ...p, kod: e.target.value }))} required placeholder="pl. NYAR2026" /></div>
          <div className="form-field"><label>Tipus</label>
            <select value={form.tipus} onChange={(e) => setForm(p => ({ ...p, tipus: e.target.value }))}>
              <option value="szazalek">Szazalek</option>
              <option value="fix">Fix osszeg</option>
            </select>
          </div>
          <div className="form-field"><label>Ertek</label><input type="number" value={form.ertek} onChange={(e) => setForm(p => ({ ...p, ertek: e.target.value }))} required /></div>
          <div className="form-field"><label>Min. osszeg</label><input type="number" value={form.min_osszeg} onChange={(e) => setForm(p => ({ ...p, min_osszeg: e.target.value }))} /></div>
          <div className="form-field"><label>Felhasznalasi limit</label><input type="number" value={form.felhasznalasi_limit} onChange={(e) => setForm(p => ({ ...p, felhasznalasi_limit: e.target.value }))} /></div>
          <div className="form-field"><label>Ervenyes veg</label><input type="datetime-local" value={form.ervenyes_veg} onChange={(e) => setForm(p => ({ ...p, ervenyes_veg: e.target.value }))} /></div>
          <div style={{ gridColumn: '1 / -1' }}>
            <button type="submit" className="btn-primary">Letrehozas</button>
          </div>
        </form>
      </section>

      {loading ? <p style={{ textAlign: 'center', color: 'var(--color-text-secondary)' }}>Betoltes...</p> : (
        <div style={{ overflowX: 'auto', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow-sm)' }}>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Kod</th>
                <th>Tipus</th>
                <th>Ertek</th>
                <th style={{ textAlign: 'center' }}>Aktiv</th>
                <th style={{ textAlign: 'center' }}>Muveletek</th>
              </tr>
            </thead>
            <tbody>
              {coupons.map(c => (
                <tr key={c.id}>
                  <td style={{ fontWeight: 700, fontFamily: 'monospace', letterSpacing: 1 }}>{c.kod}</td>
                  <td>
                    <span className="badge" style={{ background: c.tipus === 'szazalek' ? '#dbeafe' : '#fef3c7', color: c.tipus === 'szazalek' ? '#1d4ed8' : '#92400e' }}>
                      {c.tipus === 'szazalek' ? 'Szazalek' : 'Fix'}
                    </span>
                  </td>
                  <td style={{ fontWeight: 600 }}>{c.tipus === 'szazalek' ? `${c.ertek}%` : `${Number(c.ertek).toLocaleString('hu-HU')} Ft`}</td>
                  <td style={{ textAlign: 'center' }}>
                    <span className={`badge ${c.aktiv ? 'badge-accent' : ''}`} style={!c.aktiv ? { background: 'var(--color-bg-alt)', color: 'var(--color-muted)' } : {}}>
                      {c.aktiv ? 'Igen' : 'Nem'}
                    </span>
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <button onClick={() => handleDelete(c.id)} className="btn-danger" style={{ padding: '6px 12px', fontSize: '0.8rem' }}>Torles</button>
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

export default AdminCoupons;
