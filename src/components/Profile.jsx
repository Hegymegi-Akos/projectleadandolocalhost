import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { authAPI } from '../api/apiService';

const Profile = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    felhasznalonev: '', email: '', keresztnev: '', vezeteknev: '',
    telefon: '', iranyitoszam: '', varos: '', cim: '', jelszo: '', jelszo2: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');
  const [err, setErr] = useState('');
  const [showPwd, setShowPwd] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) { navigate('/auth'); return; }
    (async () => {
      try {
        const u = await authAPI.getCurrentUser();
        if (u && u.felhasznalonev) {
          setForm(prev => ({
            ...prev,
            felhasznalonev: u.felhasznalonev || '',
            email: u.email || '',
            keresztnev: u.keresztnev || '',
            vezeteknev: u.vezeteknev || '',
            telefon: u.telefon || '',
            iranyitoszam: u.iranyitoszam || '',
            varos: u.varos || '',
            cim: u.cim || '',
          }));
        }
      } catch {}
      finally { setLoading(false); }
    })();
  }, [isAuthenticated]);

  const update = (k, v) => setForm(prev => ({ ...prev, [k]: v }));

  const validate = () => {
    if (form.vezeteknev && form.vezeteknev.length > 20) return 'A vezetéknév maximum 20 karakter lehet.';
    if (form.keresztnev && form.keresztnev.length > 20) return 'A keresztnév maximum 20 karakter lehet.';
    if (form.telefon && !/^\+?[0-9 ]{7,15}$/.test(form.telefon)) return 'A telefonszám csak számokat tartalmazhat (pl. +36 30 123 4567).';
    if (form.iranyitoszam && !/^[0-9]{4}$/.test(form.iranyitoszam)) return 'Az irányítószám 4 számjegyből álljon.';
    if (form.jelszo) {
      if (form.jelszo.length < 6) return 'A jelszó legalább 6 karakter legyen.';
      if (form.jelszo !== form.jelszo2) return 'A két jelszó nem egyezik.';
    }
    return '';
  };

  const save = async (e) => {
    e.preventDefault();
    setErr(''); setMsg('');
    const v = validate();
    if (v) { setErr(v); return; }
    setSaving(true);
    try {
      const payload = {
        keresztnev: form.keresztnev || '',
        vezeteknev: form.vezeteknev || '',
        telefon: form.telefon || '',
        iranyitoszam: form.iranyitoszam || '',
        varos: form.varos || '',
        cim: form.cim || '',
        email: form.email || '',
      };
      if (form.jelszo) payload.jelszo = form.jelszo;
      const result = await authAPI.updateProfile(payload);
      setMsg(result.message || 'Adatok sikeresen mentve!');
      setForm(prev => ({ ...prev, jelszo: '', jelszo2: '' }));
      setTimeout(() => setMsg(''), 3000);
    } catch (e2) {
      setErr(e2.message || 'Mentés sikertelen');
    } finally { setSaving(false); }
  };

  if (loading) return <main className="container page" style={{ textAlign: 'center', padding: 60 }}>Betöltés...</main>;

  return (
    <main className="container page" style={{ maxWidth: 720, margin: '0 auto' }}>
      <h1 className="page-title">Adataim</h1>
      <section className="ui-card">
        {err && <div style={{ color: '#dc2626', marginBottom: 16, padding: '12px 16px', background: 'rgba(239,68,68,0.08)', borderRadius: 10, fontWeight: 600, fontSize: '0.9rem' }}>{err}</div>}
        {msg && <div style={{ color: '#059669', marginBottom: 16, padding: '12px 16px', background: '#ecfdf5', borderRadius: 10, fontWeight: 600, fontSize: '0.9rem' }}>{msg}</div>}

        <form onSubmit={save} className="form-grid">
          <div className="form-field">
            <label>Felhasználónév</label>
            <input value={form.felhasznalonev} disabled style={{ background: 'rgba(0,0,0,0.04)', cursor: 'not-allowed' }} />
          </div>
          <div className="form-field">
            <label>Email</label>
            <input type="email" value={form.email} onChange={e => update('email', e.target.value)} placeholder="példa@email.hu" />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div className="form-field">
              <label>Vezetéknév</label>
              <input value={form.vezeteknev} maxLength={20} onChange={e => update('vezeteknev', e.target.value)} placeholder="Kovács" />
            </div>
            <div className="form-field">
              <label>Keresztnév</label>
              <input value={form.keresztnev} maxLength={20} onChange={e => update('keresztnev', e.target.value)} placeholder="János" />
            </div>
          </div>
          <div className="form-field">
            <label>Telefon</label>
            <input value={form.telefon} inputMode="tel" onChange={e => update('telefon', e.target.value.replace(/[^0-9+ ]/g, ''))} placeholder="+36 30 123 4567" />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 12 }}>
            <div className="form-field">
              <label>Irányítószám</label>
              <input value={form.iranyitoszam} maxLength={4} inputMode="numeric" onChange={e => update('iranyitoszam', e.target.value.replace(/[^0-9]/g, ''))} placeholder="1234" />
            </div>
            <div className="form-field">
              <label>Város</label>
              <input value={form.varos} onChange={e => update('varos', e.target.value)} placeholder="Budapest" />
            </div>
          </div>
          <div className="form-field">
            <label>Cím</label>
            <input value={form.cim} onChange={e => update('cim', e.target.value)} placeholder="Utca, házszám" />
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid rgba(0,0,0,0.08)', margin: '8px 0' }} />
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>Új jelszó (opcionális — csak akkor töltsd ki, ha cserélni szeretnéd):</p>
          <div className="form-field">
            <label>Új jelszó</label>
            <input type={showPwd ? 'text' : 'password'} value={form.jelszo} onChange={e => update('jelszo', e.target.value)} placeholder="Hagyd üresen, ha nem változtatod" />
          </div>
          <div className="form-field">
            <label>Új jelszó újra</label>
            <input type={showPwd ? 'text' : 'password'} value={form.jelszo2} onChange={e => update('jelszo2', e.target.value)} placeholder="Jelszó megerősítése" />
          </div>
          <label className="checkbox-field"><input type="checkbox" checked={showPwd} onChange={() => setShowPwd(!showPwd)} /> Jelszó mutatása</label>

          <button type="submit" className="btn-primary" disabled={saving} style={{ width: '100%', padding: '14px', borderRadius: 12, fontSize: '1rem', marginTop: 8 }}>
            {saving ? 'Mentés...' : 'Mentés'}
          </button>
        </form>
      </section>
    </main>
  );
};

export default Profile;