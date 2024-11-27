import React from "react";
import { FaPlusCircle } from "react-icons/fa"; // Cambié el icono
import "bootstrap/dist/css/bootstrap.min.css";

const CreatePanel = () => {
  return (
    <div
      className="card mb-2 shadow-sm bg-gradient-to-r from-green-400 to-green-600"
      style={{
        
        color: "black",
        fontSize: "0.875rem",
      }}
    >
      <div className="card-body d-flex justify-content-between align-items-center p-2">
        <div className="d-flex align-items-center">
          <FaPlusCircle size={20} className="me-3" />
          <span className="h6 mb-0">Crear Campañas</span>
        </div>
      </div>
      <div className="card-footer d-flex justify-content-between align-items-center bg-dark text-white p-2">
        <a
          className="small text-white stretched-link"
          href={route("CreateCampaign")}
          style={{ textDecoration: "none" }}
        >
          Ir a crear
        </a>
        <i className="fas fa-angle-right"></i>
      </div>
    </div>
  );
};

/*      */

export default CreatePanel;
