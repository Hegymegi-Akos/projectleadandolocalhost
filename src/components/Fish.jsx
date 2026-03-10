import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';

const Fish = () => {
  const [searchParams] = useSearchParams();
  const params = searchParams.toString() ? `?${searchParams.toString()}` : '';
  return (
    <div className="container">
      <h1 className="page-title" style={{ marginTop: 32 }}>Hal Termekek</h1>
      <div className="content">
        <div className="box"><Link to={`/fishfood${params}`}><img src="/images/halak/a2.jpg" alt="Tapok" loading="lazy" /><h2>Tapok</h2></Link></div>
        <div className="box"><Link to={`/aquarium${params}`}><img src="/images/halak/a1.jpg" alt="Akvariumok" loading="lazy" /><h2>Akvariumok</h2></Link></div>
      </div>
    </div>
  );
};
export default Fish;
