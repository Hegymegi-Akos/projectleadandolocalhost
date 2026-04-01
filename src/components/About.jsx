import React from 'react';

const team = [
  { id: 'martin', name: 'Kamecz Martin', role: 'Fejlesztő', image: '/images/Martin.jpg', bio: 'Frontend fejlesztő, a felhasználói élmény és a teljesítmény rajongója.' },
  { id: 'akos', name: 'Hegymegi-Kiss Ákos', role: 'Designer', image: '/images/Akos.jpg', bio: 'UI/UX tervező, aki a reszponzív és érthető felületeket szereti létrehozni.' },
  { id: 'dominika', name: 'Péterffy Dominika', role: 'Projektvezető', image: '/images/Dominika.jpg', bio: 'Projektvezető, fókuszban a határidők és a csapat összhangja.' }
];

const About = () => (
  <main className="container page">
    <h1 className="page-title">Rólunk</h1>
    <section className="ui-card" style={{ marginBottom: 16 }}>
      <p className="kezdolapp">A 2024-ben alapított webshop azon elhivatottsággal jött létre, hogy állatbarátoknak megbízható és praktikus online vásárlási lehetőséget kínáljon.</p>
      <p className="kezdolapp">Célunk, hogy ügyfeleinknek a legjobb minőséget kínáljuk a legjobb áron. Válasszon több mint 13000 termékünkből kedvence számára!</p>
    </section>
    <section className="ui-card">
      <h2 className="section-title">Csapatunk</h2>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(250px, 1fr))', gap:20 }}>
        {team.map(member => (
          <div key={member.id} style={{ textAlign:'center', padding:20 }}>
            <img src={member.image} alt={member.name} style={{ width:120, height:120, borderRadius:'50%', objectFit:'cover', marginBottom:12 }} />
            <h3>{member.name}</h3>
            <p style={{ color:'var(--accent-primary)', fontWeight:700 }}>{member.role}</p>
            <p style={{ color:'var(--text-secondary)', fontSize:'0.9rem' }}>{member.bio}</p>
          </div>
        ))}
      </div>
    </section>
  </main>
);

export default About;