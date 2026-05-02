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
      if (data.token) { setSuccess('Sikeres bejelentkezés!'); navigate('/'); }
    } catch (err) {}
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setSuccess('');
    if (formData.felhasznalonev.length > 20) { setError('A felhasználónév maximum 20 karakter lehet.'); return; }
    if (formData.vezeteknev && formData.vezeteknev.length > 20) { setError('A vezetéknév maximum 20 karakter lehet.'); return; }
    if (formData.keresztnev && formData.keresztnev.length > 20) { setError('A keresztnév maximum 20 karakter lehet.'); return; }
    if (formData.telefon && !/^\+?[0-9 ]{7,15}$/.test(formData.telefon)) { setError('A telefonszám csak számokat tartalmazhat (pl. +36 30 123 4567).'); return; }
    if (formData.iranyitoszam && !/^[0-9]{4}$/.test(formData.iranyitoszam)) { setError('Az irányítószám 4 számjegyből állhat.'); return; }
    if (formData.jelszo.length < 6) { setError('A jelszó legalább 6 karakter legyen.'); return; }
    if (formData.jelszo !== formData.jelszo2) { setError('A két jelszó nem egyezik.'); return; }
    try {
      const data = await register({
        felhasznalonev: formData.felhasznalonev, email: formData.email, jelszo: formData.jelszo,
        keresztnev: formData.keresztnev, vezeteknev: formData.vezeteknev, telefon: formData.telefon,
        iranyitoszam: formData.iranyitoszam, varos: formData.varos, cim: formData.cim
      });
      if (data.token) { setSuccess('Sikeres regisztráció!'); navigate('/'); }
    } catch (err) {}
  };

  return (
    <main className="container page" style={{ maxWidth: 520, margin: '0 auto' }}>
      <h1 className="page-title">{isLogin ? 'Bejelentkezés' : 'Regisztráció'}</h1>

      <section className="ui-card">
        <div style={{ display: 'flex', gap: 0, marginBottom: 28, background: 'var(--color-bg-alt)', borderRadius: 12, padding: 4 }}>
          <button
            onClick={() => { setIsLogin(true); setError(null); }}
            style={{
              flex: 1, border: 'none', borderRadius: 10, padding: '12px 0',
              fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer', transition: 'all 200ms',
              background: isLogin ? 'var(--primary-gradient)' : 'transparent',
              color: isLogin ? '#fff' : 'var(--color-text-secondary)',
              boxShadow: isLogin ? '0 4px 12px rgba(249,115,22,0.2)' : 'none'
            }}
          >Bejelentkezés</button>
          <button
            onClick={() => { setIsLogin(false); setError(null); }}
            style={{
              flex: 1, border: 'none', borderRadius: 10, padding: '12px 0',
              fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer', transition: 'all 200ms',
              background: !isLogin ? 'var(--primary-gradient)' : 'transparent',
              color: !isLogin ? '#fff' : 'var(--color-text-secondary)',
              boxShadow: !isLogin ? '0 4px 12px rgba(249,115,22,0.2)' : 'none'
            }}
          >Regisztráció</button>
        </div>

        {error && <div style={{ color: 'var(--danger)', marginBottom: 16, padding: '12px 16px', background: 'var(--danger-light)', borderRadius: 10, fontWeight: 600, fontSize: '0.9rem' }}>{error}</div>}
        {success && <div style={{ color: '#059669', marginBottom: 16, padding: '12px 16px', background: '#ecfdf5', borderRadius: 10, fontWeight: 600, fontSize: '0.9rem' }}>{success}</div>}

        <form onSubmit={isLogin ? handleLogin : handleRegister} className="form-grid">
          <div className="form-field">
            <label>Felhasználónév</label>
            <input name="felhasznalonev" maxLength={20} value={formData.felhasznalonev} onChange={handleChange} required placeholder="pl. kisallat_fan (max 20 karakter)" />
          </div>
          {!isLogin && (
            <div className="form-field">
              <label>Email</label>
              <input name="email" type="email" value={formData.email} onChange={handleChange} required placeholder="példa@email.hu" />
            </div>
          )}
          <div className="form-field">
            <label>Jelszó</label>
            <input name="jelszo" type={showPassword ? 'text' : 'password'} value={formData.jelszo} onChange={handleChange} required placeholder="Legalább 6 karakter" />
          </div>
          {!isLogin && (
            <>
              <div className="form-field">
                <label>Jelszó újra</label>
                <input name="jelszo2" type={showPassword ? 'text' : 'password'} value={formData.jelszo2} onChange={handleChange} required placeholder="Jelszó megerősítése" />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div className="form-field"><label>Vezetéknév</label><input name="vezeteknev" maxLength={20} value={formData.vezeteknev} onChange={handleChange} placeholder="Kovács (max 20)" /></div>
                <div className="form-field"><label>Keresztnév</label><input name="keresztnev" maxLength={20} value={formData.keresztnev} onChange={handleChange} placeholder="János (max 20)" /></div>
              </div>
              <div className="form-field"><label>Telefon</label><input name="telefon" inputMode="tel" pattern="^\+?[0-9 ]{7,15}$" value={formData.telefon} onChange={e => setFormData(prev => ({ ...prev, telefon: e.target.value.replace(/[^0-9+ ]/g, '') }))} placeholder="+36 30 123 4567 (csak számok)" /></div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 12 }}>
                <div className="form-field"><label>Irányítószám</label><input name="iranyitoszam" inputMode="numeric" maxLength={4} value={formData.iranyitoszam} onChange={e => setFormData(prev => ({ ...prev, iranyitoszam: e.target.value.replace(/[^0-9]/g, '') }))} placeholder="1234" /></div>
                <div className="form-field"><label>Város</label><input name="varos" value={formData.varos} onChange={handleChange} placeholder="Budapest" /></div>
              </div>
              <div className="form-field"><label>Cím</label><input name="cim" value={formData.cim} onChange={handleChange} placeholder="Utca, házszám" /></div>
            </>
          )}
          <label className="checkbox-field"><input type="checkbox" checked={showPassword} onChange={() => setShowPassword(!showPassword)} /> Jelszó mutatása</label>
          <button type="submit" className="btn-primary" disabled={loading} style={{ width: '100%', padding: '14px', fontSize: '1rem', borderRadius: 12, marginTop: 4 }}>
            {loading ? 'Folyamatban...' : (isLogin ? 'Bejelentkezés' : 'Regisztráció')}
          </button>
        </form>
        {isLogin && <p style={{ marginTop: 16, textAlign: 'center', fontSize: '0.9rem' }}><Link to="/forgot-password" style={{ color: 'var(--primary)' }}>Elfelejtett jelszó?</Link></p>}
      </section>

      <div style={{ marginTop: 20, padding: '16px 20px', background: 'var(--secondary-light)', borderRadius: 12, fontSize: '0.85rem', textAlign: 'center' }}>
        <strong>Teszt bejelentkezés:</strong> akos@akos.hu / test1234 (admin)
      </div>
    </main>
  );
};

export default Auth;
