import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';

const Dog = () => {
  const [searchParams] = useSearchParams();
  const params = searchParams.toString() ? `?${searchParams.toString()}` : '';
  const items = [
    { path: '/leash', img: '/images/kutya/porazok/p1.jpg', name: 'Porazok' },
    { path: '/dogbowl', img: '/images/kutya/talak/t1.jpg', name: 'Talak' },
    { path: '/dogharness', img: '/images/kutya/hamok/h1.jpg', name: 'Hamok' },
    { path: '/flea', img: '/images/kutya/bolha/b1.jpg', name: 'Bolhairto szerek' },
    { path: '/collar', img: '/images/kutya/nyakorv/nyakorv1.jpg', name: 'Nyakorvek' },
    { path: '/dogfood', img: '/images/kutya/tapok/tap1.png', name: 'Tapok' },
  ];
  return (
    <div className="container">
      <h1 className="page-title" style={{ marginTop: 32 }}>Kutya Termekek</h1>
      <div className="content">
        {items.map(item => (
          <div key={item.path} className="box">
            <Link to={`${item.path}${params}`}><img src={item.img} alt={item.name} loading="lazy" /><h2>{item.name}</h2></Link>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Dog;
