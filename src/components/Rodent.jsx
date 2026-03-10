import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';

const Rodent = () => {
  const [searchParams] = useSearchParams();
  const params = searchParams.toString() ? `?${searchParams.toString()}` : '';
  return (
    <div className="container">
      <h1 className="page-title" style={{ marginTop: 32 }}>Ragcsalo Termekek</h1>
      <div className="content">
        <div className="box"><Link to={`/rodentfood${params}`}><img src="/images/ragcsalo.png" alt="Tapok" loading="lazy" /><h2>Tapok</h2></Link></div>
        <div className="box"><Link to={`/rodentcage${params}`}><img src="/images/ragcsalo.png" alt="Ketrecek" loading="lazy" /><h2>Ketrecek & Felszerelesek</h2></Link></div>
      </div>
    </div>
  );
};
export default Rodent;
