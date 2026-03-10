import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    felhasznalonev: '', email: '', jelszo: '', jelszo2: '',
    keresztnev: '', vezeteknev: '', telefon: '', iranyitoszam: '', varos: '', cim: ''
  });
  const { login, register, loading, error, setError } = useAuth();
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError(null);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setSuccess('');
    try {
      const data = await login(formData.felhasznalonev || formData.email, formData.jelszo);
      if (data.token) { setSuccess('Sikeres bejelentkezes!'); navigate('/'); }
    } catch (err) {}
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setSuccess('');
    if (formData.jelszo !== formData.jelszo2) { setError('A ket jelszo nem egyezik.'); return; }
    try {
      const data = await register({
        felhasznalonev: formData.felhasznalonev, email: formData.email, jelszo: formData.jelszo,
        keresztnev: formData.keresztnev, vezeteknev: formData.vezeteknev, telefon: formData.telefon,
        iranyitoszam: formData.iranyitoszam, varos: formData.varos, cim: formData.cim
      });
      if (data.token) { setSuccess('Sikeres regisztracio!'); navigate('/'); }
    } catch (err) {}
  };

  return (
    <main className="container page">
      <h1 className="page-title">{isLogin ? 'Bejelentkezes' : 'Regisztracio'}</h1>
      <section className="ui-card" style={{ maxWidth: 600, margin: '0 auto' }}>
        <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
          <button onClick={() => { setIsLogin(true); setError(null); }} className={isLogin ? 'btn-primary' : 'btn-secondary'} style={{ flex: 1 }}>Bejelentkezes</button>
          <button onClick={() => { setIsLogin(false); setError(null); }} className={!isLogin ? 'btn-primary' : 'btn-secondary'} style={{ flex: 1 }}>Regisztracio</button>
        </div>

        {error && <div style={{ color: '#ef4444', marginBottom: 12, padding: 12, background: '#fef2f2', borderRadius: 8 }}>{error}</div>}
        {success && <div style={{ color: '#22c55e', marginBottom: 12, padding: 12, background: '#f0fdf4', borderRadius: 8 }}>{success}</div>}

        <form onSubmit={isLogin ? handleLogin : handleRegister} className="form-grid">
          <div className="form-field">
            <label>Felhasznalonev</label>
            <input name="felhasznalonev" value={formData.felhasznalonev} onChange={handleChange} required />
          </div>
          {!isLogin && (
            <div className="form-field">
              <label>Email</label>
              <input name="email" type="email" value={formData.email} onChange={handleChange} required />
            </div>
          )}
          <div className="form-field">
            <label>Jelszo</label>
            <input name="jelszo" type={showPassword ? 'text' : 'password'} value={formData.jelszo} onChange={handleChange} required />
          </div>
          {!isLogin && (
            <>
              <div className="form-field">
                <label>Jelszo ujra</label>
                <input name="jelszo2" type="password" value={formData.jelszo2} onChange={handleChange} required />
              </div>
              <div className="form-field"><label>Keresztnev</label><input name="keresztnev" value={formData.keresztnev} onChange={handleChange} /></div>
              <div className="form-field"><label>Vezeteknev</label><input name="vezeteknev" value={formData.vezeteknev} onChange={handleChange} /></div>
              <div className="form-field"><label>Telefon</label><input name="telefon" value={formData.telefon} onChange={handleChange} /></div>
              <div className="form-field"><label>Iranyitoszam</label><input name="iranyitoszam" value={formData.iranyitoszam} onChange={handleChange} /></div>
              <div className="form-field"><label>Varos</label><input name="varos" value={formData.varos} onChange={handleChange} /></div>
              <div className="form-field"><label>Cim</label><input name="cim" value={formData.cim} onChange={handleChange} /></div>
            </>
          )}
          <label className="checkbox-field"><input type="checkbox" checked={showPassword} onChange={() => setShowPassword(!showPassword)} /> Jelszo mutatasa</label>
          <button type="submit" className="btn-primary" disabled={loading}>{loading ? 'Folyamatban...' : (isLogin ? 'Bejelentkezes' : 'Regisztracio')}</button>
        </form>
        {isLogin && <p style={{ marginTop: 12, textAlign: 'center' }}><Link to="/forgot-password">Elfelejtett jelszo?</Link></p>}
      </section>
    </main>
  );
};

export default Auth;
