import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';

const Reptile = () => {
  const [searchParams] = useSearchParams();
  const params = searchParams.toString() ? `?${searchParams.toString()}` : '';
  return (
    <div className="container">
      <h1 className="page-title" style={{ marginTop: 32 }}>Hullo Termekek</h1>
      <div className="content">
        <div className="box"><Link to={`/reptilefood${params}`}><img src="/images/hullo.png" alt="Tapok" loading="lazy" /><h2>Tapok</h2></Link></div>
        <div className="box"><Link to={`/terrarium${params}`}><img src="/images/hullok/t1.jpg" alt="Terrariumok" loading="lazy" /><h2>Terrariumok & Felszerelesek</h2></Link></div>
      </div>
    </div>
  );
};
export default Reptile;
