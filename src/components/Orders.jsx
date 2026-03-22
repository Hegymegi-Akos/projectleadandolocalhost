import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { ordersAPI } from '../api/apiService';
import { useNavigate } from 'react-router-dom';

const statusColors = { uj: '#3b82f6', feldolgozas: '#f59e0b', fizetve: '#8b5cf6', kesz: '#22c55e', storno: '#ef4444' };
const statusLabels = { uj: 'Uj', feldolgozas: 'Feldolgozas', fizetve: 'Fizetve', kesz: 'Kesz', storno: 'Storno' };

const Orders = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);
  const [details, setDetails] = useState({});
  const [loadingDetail, setLoadingDetail] = useState(null);

  useEffect(() => {
    if (!isAuthenticated) { navigate('/auth'); return; }
    const load = async () => {
      try {
        const data = await ordersAPI.getMyOrders();
        setOrders(Array.isArray(data) ? data : []);
      } catch { setOrders([]); }
      finally { setLoading(false); }
    };
    load();
  }, [isAuthenticated, navigate]);

  const toggleDetail = async (orderId) => {
    if (expandedId === orderId) { setExpandedId(null); return; }
    setExpandedId(orderId);
    if (details[orderId]) return;
    setLoadingDetail(orderId);
    try {
      const data = await ordersAPI.getById(orderId);
      setDetails(prev => ({ ...prev, [orderId]: data }));
    } catch { /* ignore */ }
    finally { setLoadingDetail(null); }
  };

  return (
    <main className="container page">
      <h1 className="page-title">Rendeleseim</h1>
      {loading ? <p style={{ textAlign: 'center', color: 'var(--color-text-secondary)' }}>Betoltes...</p> : orders.length === 0 ? (
        <section className="ui-card" style={{ textAlign: 'center', padding: 40 }}><p style={{ color: 'var(--color-text-secondary)' }}>Meg nincs rendelesed.</p></section>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {orders.map(order => {
            const expanded = expandedId === order.id;
            const detail = details[order.id];
            return (
              <section key={order.id} className="ui-card" style={{ cursor: 'pointer', transition: 'box-shadow 200ms', boxShadow: expanded ? 'var(--shadow-lg)' : undefined }} onClick={() => toggleDetail(order.id)}>
                <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
                  <div>
                    <strong style={{ fontSize: '1.05rem' }}>{order.rendeles_szam || `#${order.id}`}</strong>
                    <div style={{ color: 'var(--color-text-secondary)', fontSize: '0.85rem', marginTop: 2 }}>{new Date(order.letrehozva).toLocaleDateString('hu-HU', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
                  </div>
                  <div style={{ textAlign: 'right', display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div>
                      <span style={{ padding: '4px 12px', borderRadius: 20, background: statusColors[order.statusz] || '#94a3b8', color: '#fff', fontWeight: 700, fontSize: '0.8rem' }}>{statusLabels[order.statusz] || order.statusz}</span>
                      <div style={{ fontWeight: 800, color: 'var(--accent-primary)', marginTop: 4, fontSize: '1.1rem' }}>{Number(order.osszeg).toLocaleString('hu-HU')} Ft</div>
                    </div>
                    <span style={{ fontSize: '1.2rem', transition: 'transform 200ms', transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)', color: 'var(--color-text-secondary)' }}>&#9660;</span>
                  </div>
                </div>

                {expanded && (
                  <div onClick={(e) => e.stopPropagation()} style={{ marginTop: 16, borderTop: '1px solid rgba(0,0,0,0.08)', paddingTop: 16 }}>
                    {loadingDetail === order.id ? (
                      <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>Reszletek betoltese...</p>
                    ) : detail ? (
                      <>
                        {/* Order items */}
                        <h4 style={{ margin: '0 0 10px', fontSize: '0.95rem' }}>Tetelek</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 16 }}>
                          {(detail.tetelek || []).map((t, i) => (
                            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', background: 'rgba(0,0,0,0.02)', borderRadius: 8 }}>
                              <div>
                                <span style={{ fontWeight: 600 }}>{t.termek_nev}</span>
                                <span style={{ color: 'var(--color-text-secondary)', fontSize: '0.85rem', marginLeft: 8 }}>x{t.mennyiseg}</span>
                              </div>
                              <span style={{ fontWeight: 700 }}>{Number(t.ar * t.mennyiseg).toLocaleString('hu-HU')} Ft</span>
                            </div>
                          ))}
                        </div>

                        {/* Shipping info */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12, fontSize: '0.85rem' }}>
                          <div>
                            <div style={{ color: 'var(--color-text-secondary)', marginBottom: 2 }}>Szallitasi cim</div>
                            <div style={{ fontWeight: 600 }}>{detail.szallitasi_nev || order.szallitasi_nev}</div>
                            <div>{detail.szallitasi_cim || order.szallitasi_cim}</div>
                            <div>{detail.szallitasi_irsz || order.szallitasi_irsz} {detail.szallitasi_varos || order.szallitasi_varos}</div>
                          </div>
                          <div>
                            <div style={{ color: 'var(--color-text-secondary)', marginBottom: 2 }}>Szallitas / Fizetes</div>
                            <div style={{ fontWeight: 600 }}>{detail.szallitasi_mod || order.szallitasi_mod}</div>
                            <div>{detail.fizetesi_mod || order.fizetesi_mod}</div>
                          </div>
                          {(detail.megjegyzes || order.megjegyzes) && (
                            <div>
                              <div style={{ color: 'var(--color-text-secondary)', marginBottom: 2 }}>Megjegyzes</div>
                              <div>{detail.megjegyzes || order.megjegyzes}</div>
                            </div>
                          )}
                        </div>
                      </>
                    ) : (
                      <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>Nem sikerult betolteni a reszleteket.</p>
                    )}
                  </div>
                )}
              </section>
            );
          })}
        </div>
      )}
    </main>
  );
};
export default Orders;
