import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useFavorites } from '../contexts/FavoritesContext';
import { productsAPI, resolveMediaUrl } from '../api/apiService';
import QuickViewModal from './QuickViewModal';

const ProductList = ({ title, category, subcategory }) => {
  const { addToCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();
  const [quantities, setQuantities] = useState({});
  const [addedItems, setAddedItems] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  const sortBy = searchParams.get('sort') || '';
  const minPrice = searchParams.get('min') || '';
  const maxPrice = searchParams.get('max') || '';

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true); setError(null);
        const data = await productsAPI.getByCategory(category, subcategory);
        setProducts(Array.isArray(data) ? data : []);
      } catch (err) {
        setError('Nem sikerult betolteni a termekeket');
        setProducts([]);
      } finally { setLoading(false); }
    };
    fetchProducts();
  }, [category, subcategory]);

  const getEffectivePrice = (p) => Number(p.akcios_ar) > 0 && Number(p.akcios_ar) < Number(p.ar) ? Number(p.akcios_ar) : Number(p.ar);

  const handleAddToCart = (product) => {
    const quantity = quantities[product.id] || 1;
    addToCart({ id: product.id, name: product.nev, price: getEffectivePrice(product), img: product.fo_kep }, quantity);
    setAddedItems(prev => ({ ...prev, [product.id]: true }));
    setTimeout(() => setAddedItems(prev => ({ ...prev, [product.id]: false })), 1000);
    setQuantities(prev => ({ ...prev, [product.id]: 1 }));
  };

  let filteredProducts = [...products];
  if (minPrice) filteredProducts = filteredProducts.filter(p => getEffectivePrice(p) >= parseFloat(minPrice));
  if (maxPrice) filteredProducts = filteredProducts.filter(p => getEffectivePrice(p) <= parseFloat(maxPrice));
  if (sortBy === 'low') filteredProducts.sort((a, b) => getEffectivePrice(a) - getEffectivePrice(b));
  else if (sortBy === 'high') filteredProducts.sort((a, b) => getEffectivePrice(b) - getEffectivePrice(a));

  if (loading) return <div className="container" style={{ textAlign:'center', padding:'60px 20px' }}><p>Termekek betoltese...</p></div>;
  if (error) return <div className="container" style={{ textAlign:'center', padding:'60px 20px' }}><p style={{ color:'#ef4444' }}>{error}</p></div>;

  return (
    <div className="container">
      <h1 className="page-title" style={{ marginTop: 32 }}>{title}</h1>
      <p style={{ marginBottom:16, fontSize:'0.95rem', color:'var(--text-secondary)', fontWeight:600 }}>{filteredProducts.length} termek talalt</p>

      {filteredProducts.length === 0 ? (
        <div style={{ textAlign:'center', padding:'60px 20px', color:'var(--text-muted)' }}>Nincs talalt</div>
      ) : (
        <div className="content">
          {filteredProducts.map(product => {
            const cartProduct = { id: product.id, name: product.nev, price: getEffectivePrice(product), img: product.fo_kep };
            const favorite = isFavorite(product.id);
            return (
              <div key={product.id} className="box" style={{ position:'relative' }}>
                <div style={{ position: 'absolute', top: 10, left: 10, right: 10, display: 'flex', justifyContent: 'space-between', zIndex: 5 }}>
                  <button
                    onClick={() => setQuickViewProduct(cartProduct)}
                    className="btn-secondary"
                    style={{ padding: '6px 10px', fontSize: '0.75rem', borderRadius: 999 }}
                  >
                    Gyors nezet
                  </button>
                  <button
                    onClick={() => toggleFavorite(cartProduct)}
                    className={favorite ? 'btn-danger' : 'btn-secondary'}
                    style={{ padding: '6px 10px', fontSize: '0.75rem', borderRadius: 999 }}
                  >
                    {favorite ? 'Kedvenc -' : 'Kedvenc +'}
                  </button>
                </div>
                <img
                  src={resolveMediaUrl(product.fo_kep)}
                  alt={product.nev}
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = '/images/kutya.png';
                  }}
                />
                <h2>{product.nev}</h2>
                <p>{product.rovid_leiras}</p>
                {Number(product.akcios_ar) > 0 && Number(product.akcios_ar) < Number(product.ar) && <p style={{ textDecoration:'line-through', color:'var(--text-muted)', fontSize:'0.9rem' }}>{Number(product.ar).toLocaleString('hu-HU')} Ft</p>}
                <p style={{ fontSize:'1.3rem', fontWeight:800, color:'var(--accent-primary)', margin:'8px 0' }}>{(Number(product.akcios_ar) > 0 && Number(product.akcios_ar) < Number(product.ar) ? Number(product.akcios_ar) : Number(product.ar)).toLocaleString('hu-HU')} Ft</p>
                {product.keszlet > 0 && (
                  <>
                    <div style={{ display:'flex', gap:8, alignItems:'center', marginBottom:12, padding:'0 20px' }}>
                      <input type="number" min="1" max={product.keszlet} value={quantities[product.id] || 1} onChange={(e) => setQuantities(prev => ({...prev, [product.id]: Math.max(1, parseInt(e.target.value) || 1)}))} style={{ width:70, padding:8, borderRadius:8, border:'2px solid rgba(15,23,42,0.1)', textAlign:'center' }} />
                      <span style={{ fontSize:'0.9rem', color:'var(--text-muted)' }}>db</span>
                    </div>
                    <button onClick={() => handleAddToCart(product)} style={{ background: addedItems[product.id] ? 'linear-gradient(135deg,#10b981,#059669)' : undefined }}>
                      {addedItems[product.id] ? 'Hozzaadva!' : 'Kosarba'}
                    </button>
                  </>
                )}
                {product.keszlet === 0 && <p style={{ color:'#ef4444', fontWeight:700 }}>Elfogyott</p>}
              </div>
            );
          })}
        </div>
      )}
      <QuickViewModal product={quickViewProduct} show={!!quickViewProduct} onClose={() => setQuickViewProduct(null)} />
    </div>
  );
};

export default ProductList;
