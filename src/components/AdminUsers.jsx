import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { adminUsersAPI, isAllowedAdminUser } from '../api/apiService';

const AdminUsers = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [busyUserId, setBusyUserId] = useState(null);

  useEffect(() => {
    if (!isAuthenticated || !isAllowedAdminUser(user)) { navigate('/admin'); return; }
    loadUsers();
  }, [isAuthenticated, user, navigate]);

  const loadUsers = async () => {
    try {
      const data = await adminUsersAPI.getAll();
      setUsers(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleBanToggle = async (targetUser) => {
    const isBanned = Number(targetUser.tiltva) === 1;

    let reason = '';
    if (!isBanned) {
      reason = window.prompt('Kitiltás oka (opcionális):', targetUser.tiltas_oka || '') || '';
    }

    setError('');
    setBusyUserId(targetUser.id);
    try {
      await adminUsersAPI.setBanStatus(targetUser.id, !isBanned, reason.trim());
      await loadUsers();
    } catch (err) {
      setError(err.message || 'Művelet sikertelen');
    } finally {
      setBusyUserId(null);
    }
  };

  return (
    <main className="admin-page container page">
      <h1 className="page-title">Admin - Felhasznalok</h1>
      {error && <div style={{ color: 'var(--danger)', marginBottom: 16, padding: '12px 16px', background: 'var(--danger-light)', borderRadius: 10, fontWeight: 600, fontSize: '0.9rem', textAlign: 'center' }}>{error}</div>}

      {loading ? <p style={{ textAlign: 'center', color: 'var(--color-text-secondary)' }}>Betoltes...</p> : (
        <div style={{ overflowX: 'auto', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow-sm)' }}>
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Felhasznalonev</th>
                <th>Email</th>
                <th>Nev</th>
                <th style={{ textAlign: 'center' }}>Admin</th>
                <th style={{ textAlign: 'center' }}>Tiltva</th>
                <th>Tiltas oka</th>
                <th>Regisztralt</th>
                <th style={{ textAlign: 'center' }}>Muvelet</th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u.id}>
                  <td style={{ fontWeight: 600 }}>{u.id}</td>
                  <td style={{ fontWeight: 600 }}>{u.felhasznalonev}</td>
                  <td>{u.email}</td>
                  <td>{u.vezeteknev} {u.keresztnev}</td>
                  <td style={{ textAlign: 'center' }}>
                    <span className={`badge ${u.admin ? 'badge-accent' : ''}`} style={!u.admin ? { background: 'var(--color-bg-alt)', color: 'var(--color-muted)' } : {}}>
                      {u.admin ? 'Igen' : 'Nem'}
                    </span>
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <span className="badge" style={Number(u.tiltva) === 1 ? { background: 'var(--danger)', color: '#fff' } : { background: '#dcfce7', color: '#166534' }}>
                      {Number(u.tiltva) === 1 ? 'Igen' : 'Nem'}
                    </span>
                  </td>
                  <td style={{ maxWidth: 260, color: 'var(--color-text-secondary)', fontSize: '0.85rem' }}>
                    {u.tiltas_oka || '-'}
                  </td>
                  <td style={{ color: 'var(--color-text-secondary)', fontSize: '0.85rem' }}>{new Date(u.regisztralt).toLocaleDateString('hu-HU')}</td>
                  <td style={{ textAlign: 'center' }}>
                    {u.id === user?.id ? (
                      <span style={{ color: 'var(--color-text-secondary)', fontSize: '0.8rem' }}>Sajat fiok</span>
                    ) : (
                      <button
                        onClick={() => handleBanToggle(u)}
                        disabled={busyUserId === u.id}
                        className={Number(u.tiltva) === 1 ? 'btn-secondary' : 'btn-danger'}
                        style={{ padding: '6px 10px', fontSize: '0.8rem' }}
                      >
                        {busyUserId === u.id ? 'Ment...' : Number(u.tiltva) === 1 ? 'Visszaenged' : 'Kitilt'}
                      </button>
                    )}
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

export default AdminUsers;
