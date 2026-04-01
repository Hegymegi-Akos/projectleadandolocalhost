import React from 'react';

const tips = [
  { category: 'Kutya', title: 'Hogyan gondozd a kutyád szőrét?', content: 'Rendszeres fésülködés és fürdés segít megelőzni a csomók kialakulását.' },
  { category: 'Macska', title: 'Macskaalom gondozása', content: 'Hetente cseréld az almot, hogy tiszta környezetet biztosíts kedvencednek.' },
  { category: 'Madár', title: 'Madarak etetése', content: 'Különböző magvak és gyümölcsök kombinációja biztosítja a kiegyensúlyozott táplálkozást.' },
  { category: 'Hal', title: 'Akvárium karbantartása', content: 'Hetente cseréld a víz egy részét és tisztítsd meg a szűrőt.' },
  { category: 'Hüllő', title: 'Hüllők hőmérséklete', content: 'Biztosíts megfelelő hőmérsékletet és UVB fényt a hüllők egészségéhez.' },
  { category: 'Rágcsáló', title: 'Rágcsálók fogai', content: 'Kemény eleség és rágcsálnivalók segítenek a fogak kopásában.' }
];

const Tips = () => (
  <div className="container page">
    <h1 className="page-title">Állatgondozási Tippek</h1>
    <p style={{ marginBottom:24, color:'var(--text-secondary)' }}>Itt találsz hasznos tanácsokat kedvenceid gondozásához.</p>
    <div className="responsive-card-grid">
      {tips.map((tip, i) => (
        <section key={i} className="ui-card">
          <h3>{tip.category}: {tip.title}</h3>
          <p style={{ color:'var(--text-secondary)' }}>{tip.content}</p>
        </section>
      ))}
    </div>
  </div>
);

export default Tips;