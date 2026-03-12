import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { isAllowedAdminUser } from '../api/apiService';

const AdminCard = ({ to, title, desc, color }) => (
  <Link to={to} style={{ textDecoration: 'none' }}>
    <div className="ui-card" style={{ textAlign: 'center', cursor: 'pointer', transition: 'all 300ms ease', borderTop: `4px solid ${color}` }}>
      <h2 style={{ margin: '0 0 8px', fontSize: '1.3rem', color: 'var(--color-text)' }}>{title}</h2>
      <p style={{ margin: 0, color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>{desc}</p>
    </div>
  </Link>
);

const Admin = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const isAdmin = isAllowedAdminUser(user);

  useEffect(() => { if (!isAuthenticated) navigate('/auth'); }, [isAuthenticated, navigate]);

  if (!isAdmin) return (
    <main className="admin-page container page">
      <section className="ui-card" style={{ textAlign: 'center', padding: 48 }}>
        <p style={{ fontSize: '1.1rem', color: 'var(--color-text-secondary)' }}>Nincs admin jogosultsagod.</p>
      </section>
    </main>
  );

  return (
    <main className="admin-page container page">
      <h2 className="admin-section-title">Gyors muveletek</h2>

      <div className="admin-dashboard-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 20, maxWidth: 900, margin: '0 auto' }}>
        <AdminCard to="/admin/products" title="Termekek" desc="Termekek hozzaadasa, szerkesztese, torlese" color="var(--primary)" />
        <AdminCard to="/admin/users" title="Felhasznalok" desc="Regisztralt felhasznalok listazasa" color="var(--secondary)" />
        <AdminCard to="/admin/coupons" title="Kuponok" desc="Kedvezmeny kuponok kezelese" color="var(--accent)" />
      </div>
    </main>
  );
};

export default Admin;
