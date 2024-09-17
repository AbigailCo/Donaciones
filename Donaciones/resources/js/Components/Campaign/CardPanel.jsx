import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { IoAccessibilityOutline } from "react-icons/io5";
import 'bootstrap/dist/css/bootstrap.min.css';

const CardPanel = () => {
  const [campaignCount, setCampaignCount] = useState(0);

  useEffect(() => {
    axios.get('http://localhost:8000/campaign-count')
      .then(response => {
        setCampaignCount(response.data.count);
      })
      .catch(error => {
        console.error('Error fetching product count:', error);
      });
  }, []);

  return (
    <div className="col-xl-3 col-md-6">
      <div className="card bg-success text-white mb-4 shadow-sm">
        <div className="card-body d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center">
            <IoAccessibilityOutline size={40} className="me-3" />
            <span className="h5 mb-0">Campañas</span>
          </div>
          <p className="text-center fw-bold fs-4 mb-0">{campaignCount}</p>
        </div>
        <div className="card-footer d-flex align-items-center justify-content-between bg-dark text-white">
          <a className="small text-white stretched-link" href={route('campaign')} style={{ textDecoration: 'none' }}>
            Ver más
          </a>
          <div className="small text-white"><i className="fas fa-angle-right"></i></div>
        </div>
      </div>
    </div>
  );
};

export default CardPanel;
