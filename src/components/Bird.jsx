import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';

const Bird = () => {
  const [searchParams] = useSearchParams();
  const params = searchParams.toString() ? `?${searchParams.toString()}` : '';
  return (
    <div className="container">
      <h1 className="page-title" style={{ marginTop: 32 }}>Madar Termekek</h1>
      <div className="content">
        <div className="box"><Link to={`/birdfood${params}`}><img src="/images/madar.png" alt="Tapok" loading="lazy" /><h2>Tapok</h2></Link></div>
        <div className="box"><Link to={`/birdcage${params}`}><img src="/images/madar.png" alt="Kalitkak" loading="lazy" /><h2>Kalitkak</h2></Link></div>
      </div>
    </div>
  );
};
export default Bird;
