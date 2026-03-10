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

  useEffect(() => {
    if (!isAuthenticated || !isAllowedAdminUser(user)) { navigate('/admin'); return; }
    const load = async () => {
      try { const data = await adminUsersAPI.getAll(); setUsers(Array.isArray(data) ? data : []); }
      catch (err) { setError(err.message); }
      finally { setLoading(false); }
    };
    load();
  }, [isAuthenticated, user, navigate]);

  return (
    <main className="container page">
      <h1 className="page-title">Admin - Felhasznalok</h1>
      {error && <div style={{ color:'#ef4444', marginBottom:12 }}>{error}</div>}
      {loading ? <p>Betoltes...</p> : (
        <div style={{ overflowX:'auto' }}>
          <table style={{ width:'100%', borderCollapse:'collapse' }}>
            <thead><tr style={{ borderBottom:'2px solid #e2e8f0' }}><th style={{padding:8,textAlign:'left'}}>ID</th><th style={{padding:8,textAlign:'left'}}>Felhasznalonev</th><th style={{padding:8,textAlign:'left'}}>Email</th><th style={{padding:8,textAlign:'left'}}>Nev</th><th style={{padding:8}}>Admin</th><th style={{padding:8}}>Regisztralt</th></tr></thead>
            <tbody>
              {users.map(u => (
                <tr key={u.id} style={{ borderBottom:'1px solid #e2e8f0' }}>
                  <td style={{padding:8}}>{u.id}</td>
                  <td style={{padding:8}}>{u.felhasznalonev}</td>
                  <td style={{padding:8}}>{u.email}</td>
                  <td style={{padding:8}}>{u.vezeteknev} {u.keresztnev}</td>
                  <td style={{padding:8, textAlign:'center'}}>{u.admin ? 'Igen' : 'Nem'}</td>
                  <td style={{padding:8}}>{new Date(u.regisztralt).toLocaleDateString('hu-HU')}</td>
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
