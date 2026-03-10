import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { ordersAPI } from '../api/apiService';
import { useNavigate } from 'react-router-dom';

const Orders = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <main className="container page">
      <h1 className="page-title">Rendeleseim</h1>
      {loading ? <p>Betoltes...</p> : orders.length === 0 ? (
        <section className="ui-card"><p>Meg nincs rendelesed.</p></section>
      ) : (
        <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
          {orders.map(order => (
            <section key={order.id} className="ui-card">
              <div style={{ display:'flex', justifyContent:'space-between', flexWrap:'wrap', gap:8 }}>
                <div>
                  <strong>{order.rendeles_szam || `#${order.id}`}</strong>
                  <div style={{ color:'var(--text-secondary)', fontSize:'0.9rem' }}>{new Date(order.letrehozva).toLocaleDateString('hu-HU')}</div>
                </div>
                <div style={{ textAlign:'right' }}>
                  <span style={{ padding:'4px 12px', borderRadius:20, background: order.statusz === 'kesz' ? '#dcfce7' : '#dbeafe', color: order.statusz === 'kesz' ? '#166534' : '#1e40af', fontWeight:700, fontSize:'0.85rem' }}>{order.statusz}</span>
                  <div style={{ fontWeight:800, color:'var(--accent-primary)', marginTop:4 }}>{Number(order.osszeg).toLocaleString('hu-HU')} Ft</div>
                </div>
              </div>
            </section>
          ))}
        </div>
      )}
    </main>
  );
};
export default Orders;
