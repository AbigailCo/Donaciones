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
    <div className="card mb-2 shadow-sm bg-gradient-to-r from-fuchsia-400 to-fuchsia-600" style={{  color: 'black', fontSize: '0.875rem' }}>
    <div className="card-body d-flex justify-content-between align-items-center p-2">
      <div className="d-flex align-items-center">
        <i className="fa-solid fa-user"></i>
        <span className="h6 mb-0">Mis Campañas</span>
      </div>
      <p className="fw-bold mb-0">{myCampaignCount}</p>
    </div>
    <div className="card-footer d-flex justify-content-between align-items-center bg-dark text-white p-2">
      <a className="small text-white stretched-link" href={route('myCampaigns')} style={{ textDecoration: 'none' }}>
            Ver mis campañas
          </a>
      <i className="fas fa-angle-right"></i>
    </div>
  </div> 
  );
};


export default MyCampPanel;
