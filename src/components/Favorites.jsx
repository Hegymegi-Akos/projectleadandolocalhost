import React from 'react';
import { useFavorites } from '../contexts/FavoritesContext';
import { useCart } from '../contexts/CartContext';

const Favorites = () => {
  const { favorites, toggleFavorite, clearFavorites } = useFavorites();
  const { addToCart } = useCart();

  return (
    <main className="container page">
      <h1 className="page-title">Kedvencek ({favorites.length})</h1>
      {favorites.length === 0 ? (
        <section className="ui-card"><p>Meg nincsenek kedvenceid.</p></section>
      ) : (
        <>
          <button onClick={clearFavorites} style={{ marginBottom:16, background:'#ef4444' }}>Osszes torles</button>
          <div className="content">
            {favorites.map(product => (
              <div key={product.id} className="box">
                {product.img && <img src={product.img} alt={product.name} loading="lazy" />}
                <h2>{product.name}</h2>
                <p style={{ fontSize:'1.2rem', fontWeight:800, color:'var(--accent-primary)' }}>{product.price?.toLocaleString('hu-HU')} Ft</p>
                <div style={{ display:'flex', gap:8, padding:'0 20px 20px' }}>
                  <button onClick={() => addToCart(product)} style={{ flex:1 }}>Kosarba</button>
                  <button onClick={() => toggleFavorite(product)} style={{ background:'#ef4444' }}>Torles</button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </main>
  );
};
export default Favorites;
