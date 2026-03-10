import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/slider.css';

const Home = () => {
  const [sortBy, setSortBy] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const navigate = useNavigate();

  const applyFilters = (category) => {
    const params = new URLSearchParams();
    if (sortBy) params.set('sort', sortBy);
    if (minPrice) params.set('min', minPrice);
    if (maxPrice) params.set('max', maxPrice);
    navigate(`${category}?${params.toString()}`);
  };

  const clearFilters = () => { setSortBy(''); setMinPrice(''); setMaxPrice(''); };

  return (
    <div>
      <main className="container" id="main">
        <section className="hero">
          <div className="continuous-slider" aria-hidden="true">
            <div className="slider-track">
              <img src="/images/carousel/akcio1.png" alt="slide-1" />
              <img src="/images/carousel/kep1.jpg" alt="slide-2" />
              <img src="/images/carousel/kep2.jpg" alt="slide-3" />
              <img src="/images/carousel/kep3.jpg" alt="slide-4" />
              <img src="/images/carousel/akcio1.png" alt="slide-1-dup" />
              <img src="/images/carousel/kep1.jpg" alt="slide-2-dup" />
              <img src="/images/carousel/kep2.jpg" alt="slide-3-dup" />
              <img src="/images/carousel/kep3.jpg" alt="slide-4-dup" />
            </div>
          </div>
        </section>

        <div style={{ background:'white', padding:20, borderRadius:12, marginBottom:32, boxShadow:'0 2px 12px rgba(15,23,42,0.08)', display:'flex', gap:16, flexWrap:'wrap', alignItems:'center', justifyContent:'center' }}>
          <div>
            <label style={{ display:'block', marginBottom:6, fontSize:'0.9rem', fontWeight:600 }}>Rendezes</label>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} style={{ padding:'10px 14px', borderRadius:8, border:'2px solid rgba(15,23,42,0.1)', minWidth:180 }}>
              <option value="">Alapertelmezett</option>
              <option value="low">Ar: Alacsony - Magas</option>
              <option value="high">Ar: Magas - Alacsony</option>
            </select>
          </div>
          <div>
            <label style={{ display:'block', marginBottom:6, fontSize:'0.9rem', fontWeight:600 }}>Min. ar (Ft)</label>
            <input type="number" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} placeholder="0" style={{ padding:'10px 14px', borderRadius:8, border:'2px solid rgba(15,23,42,0.1)', width:140 }} />
          </div>
          <div>
            <label style={{ display:'block', marginBottom:6, fontSize:'0.9rem', fontWeight:600 }}>Max. ar (Ft)</label>
            <input type="number" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} placeholder="999999" style={{ padding:'10px 14px', borderRadius:8, border:'2px solid rgba(15,23,42,0.1)', width:140 }} />
          </div>
          {(sortBy || minPrice || maxPrice) && <button onClick={clearFilters} style={{ padding:'10px 18px', background:'rgba(239,68,68,0.1)', color:'#dc2626', border:'none', borderRadius:8, cursor:'pointer', fontWeight:600, marginTop:24 }}>Szurok torlese</button>}
        </div>

        <section className="content">
          {[
            { path: '/dog', img: '/images/kutya.png', name: 'Kutya', desc: 'Jatekok, tapok, felszerelesek' },
            { path: '/cat', img: '/images/macska.png', name: 'Macska', desc: 'Jatekok es macskatapok' },
            { path: '/rodent', img: '/images/ragcsalo.png', name: 'Ragcsalo', desc: 'Allvanyok, alom, kaja' },
            { path: '/reptile', img: '/images/hullo.png', name: 'Hullo', desc: 'Terrarium felszerelesek' },
            { path: '/bird', img: '/images/madar.png', name: 'Madar', desc: 'Kalitkak, eleseg' },
            { path: '/fish', img: '/images/hal.png', name: 'Hal', desc: 'Akvarisztikai kellekek' }
          ].map(cat => (
            <article key={cat.path} className="category-card">
              <div onClick={() => applyFilters(cat.path)} style={{ cursor:'pointer' }}>
                <img src={cat.img} alt={cat.name} loading="lazy" />
                <h2>{cat.name}</h2>
                <p style={{ color:'var(--text-secondary,#64748b)', marginTop:8 }}>{cat.desc}</p>
              </div>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
};

export default Home;
