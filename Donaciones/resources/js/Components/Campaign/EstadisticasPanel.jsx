import React, { useState, useEffect } from 'react';
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';

const EstadisticasPanel = () => {
 
  return (
    <div className="">
      <div className="card mb-4 shadow-sm" style={{ backgroundColor: 'rgba(135, 206, 250, 0.5)', color: 'black' }}>
        <div className="card-body d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center">
          <div className="sb-nav-link-icon mr-3"><i className="fa-solid fa-user"></i></div>
          
            <span className="h5 mb-0">Estadisticas</span>
          </div>
      
        </div>
        <div className="card-footer d-flex align-items-center justify-content-between bg-dark text-white">
          <a className="small text-white stretched-link" href={route('EstadisticasGlobales')} style={{ textDecoration: 'none' }}>
            Ver estadisticas globales
          </a>
          <div className="small text-white"><i className="fas fa-angle-right"></i></div>
        </div>
      </div>
    </div>
  );
};

export default EstadisticasPanel;
