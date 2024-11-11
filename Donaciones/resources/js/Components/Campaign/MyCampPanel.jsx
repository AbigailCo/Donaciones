import React, { useState, useEffect } from 'react';
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';

const MyCampPanel = () => {
  const [myCampaignCount, setMyCampaignCount] = useState(0);

  useEffect(() => {
    axios.get('http://localhost:8000/user-campaigns/count')
      .then(response => {
        setMyCampaignCount(response.data.count); // Corregido
      })
      .catch(error => {
        console.error('Error fetching campaign count:', error);
      });
  }, []);

  return (
    <div className="">
      <div className="card mb-4 shadow-sm" style={{ backgroundColor: 'rgba(135, 206, 250, 0.5)', color: 'black' }}>
        <div className="card-body d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center">
          <div className="sb-nav-link-icon mr-3"><i className="fa-solid fa-user"></i></div>
          
            <span className="h5 mb-0">Mis Campañas</span>
          </div>
          <p className="text-center fw-bold fs-4 mb-0">{myCampaignCount}</p>
        </div>
        <div className="card-footer d-flex align-items-center justify-content-between bg-dark text-white">
          <a className="small text-white stretched-link" href={route('myCampaigns')} style={{ textDecoration: 'none' }}>
            Ver mis campañas
          </a>
          <div className="small text-white"><i className="fas fa-angle-right"></i></div>
        </div>
      </div>
    </div>
  );
};

export default MyCampPanel;
