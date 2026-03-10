import React, { useEffect, useState } from 'react';

export default function Gallery() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/images/manifest.json')
      .then(res => res.json())
      .then(data => { setImages(data); setLoading(false); })
      .catch(() => { setImages([]); setLoading(false); });
  }, []);

  if (loading) return <div className="container page"><p>Betoltes...</p></div>;

  return (
    <div className="container page">
      <h1 className="page-title">Galeria</h1>
      {images.length === 0 ? <p>Nincs kep.</p> : (
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(200px, 1fr))', gap:16 }}>
          {images.map((src, i) => (
            <div key={i} style={{ borderRadius:12, overflow:'hidden', boxShadow:'0 4px 12px rgba(0,0,0,0.1)' }}>
              <img src={src} alt={`kep-${i}`} loading="lazy" style={{ width:'100%', height:200, objectFit:'cover' }} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
