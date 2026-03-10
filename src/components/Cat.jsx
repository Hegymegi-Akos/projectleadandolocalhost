import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';

const Cat = () => {
  const [searchParams] = useSearchParams();
  const params = searchParams.toString() ? `?${searchParams.toString()}` : '';
  return (
    <div className="container">
      <h1 className="page-title" style={{ marginTop: 32 }}>Macska Termekek</h1>
      <div className="content">
        <div className="box"><Link to={`/cattoy${params}`}><img src="/images/macska/jatek/j1.jpg" alt="Jatekok" loading="lazy" /><h2>Jatekok</h2></Link></div>
        <div className="box"><Link to={`/catfood${params}`}><img src="/images/macska/tapok/tap10.png" alt="Tapok" loading="lazy" /><h2>Tapok</h2></Link></div>
      </div>
    </div>
  );
};
export default Cat;
