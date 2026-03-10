import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { isAllowedAdminUser } from '../api/apiService';

const Admin = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const isAdmin = isAllowedAdminUser(user);
  const [adminSecret, setAdminSecret] = useState(sessionStorage.getItem('adminSecret') || '');
  const [secretSaved, setSecretSaved] = useState(!!sessionStorage.getItem('adminSecret'));

  useEffect(() => { if (!isAuthenticated) navigate('/auth'); }, [isAuthenticated, navigate]);

  if (!isAdmin) return <main className="container page"><h1 className="page-title">Admin</h1><section className="ui-card"><p>Nincs admin jogosultsagod.</p></section></main>;

  const saveSecret = () => {
    sessionStorage.setItem('adminSecret', adminSecret);
    setSecretSaved(true);
  };

  return (
    <main className="container page">
      <h1 className="page-title">Admin felulet</h1>
      {!secretSaved && (
        <section className="ui-card" style={{ marginBottom:16 }}>
          <h3>Admin jelszo</h3>
          <div style={{ display:'flex', gap:8 }}>
            <input type="password" value={adminSecret} onChange={(e) => setAdminSecret(e.target.value)} placeholder="Admin jelszo (X-Admin-Secret)" style={{ flex:1 }} />
            <button onClick={saveSecret}>Mentes</button>
          </div>
        </section>
      )}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(250px, 1fr))', gap:16 }}>
        <Link to="/admin/products" style={{ textDecoration:'none' }}>
          <section className="ui-card" style={{ textAlign:'center', cursor:'pointer' }}>
            <h2>Termekek</h2><p>Termekek kezelese</p>
          </section>
        </Link>
        <Link to="/admin/users" style={{ textDecoration:'none' }}>
          <section className="ui-card" style={{ textAlign:'center', cursor:'pointer' }}>
            <h2>Felhasznalok</h2><p>Felhasznalok listazasa</p>
          </section>
        </Link>
        <Link to="/admin/coupons" style={{ textDecoration:'none' }}>
          <section className="ui-card" style={{ textAlign:'center', cursor:'pointer' }}>
            <h2>Kuponok</h2><p>Kuponok kezelese</p>
          </section>
        </Link>
      </div>
    </main>
  );
};
export default Admin;
