import React, { useState, useEffect } from "react";
import axios from "axios";

import "bootstrap/dist/css/bootstrap.min.css";

const EstadisticasPanel = () => {
  return (
    <div
      className="card mb-2 shadow-sm bg-gradient-to-r from-ligh-400 to-green-600"
      style={{
       
        color: "black",
        fontSize: "0.875rem",
      }}
    >
      <div className="card-body d-flex justify-content-between align-items-center p-2">
        <div className="d-flex align-items-center">
          <i className="fa-solid fa-user"></i>
          <span className="h6 mb-0">Estadisticas</span>
        </div>
      </div>
      <div className="card-footer d-flex justify-content-between align-items-center bg-dark text-white p-2">
        <a
          className="small text-white stretched-link"
          href={route("EstadisticasGlobales")}
          style={{ textDecoration: "none" }}
        >
          Ver estadisticas globales
        </a>
        <i className="fas fa-angle-right"></i>
      </div>
    </div>
  );
};

export default EstadisticasPanel;
