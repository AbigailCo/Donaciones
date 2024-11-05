import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaRegFolder } from "react-icons/fa"; // Cambié el icono
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
    <div className="col-xl-3 col-md-6">
      <div className="card bg-info text-white mb-4 shadow-sm"> {/* Cambié el color a bg-info */}
        <div className="card-body d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center">
            <FaRegFolder size={40} className="me-3" /> {/* Usé un nuevo icono */}
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
