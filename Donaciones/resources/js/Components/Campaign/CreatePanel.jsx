import React from 'react';
import { FaPlusCircle } from 'react-icons/fa'; // Cambié el icono
import 'bootstrap/dist/css/bootstrap.min.css';

const CreatePanel = () => {
  return (
    <div className="">

      <div className="card mb-4 shadow-sm" style={{ backgroundColor: '#00ff0080', color: 'white' }}>
        <div className="card-body d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center">
            <FaPlusCircle size={40} className="me-3" /> {/* Usé un nuevo icono */}
            <span className="h5 mb-0">Crear Campañas</span>
          </div>
        </div>
        <div className="card-footer d-flex align-items-center justify-content-between bg-dark text-white">
          <a className="small text-white stretched-link" href={route('CreateCampaign')} style={{ textDecoration: 'none' }}>
            Ir a crear
          </a>
          <div className="small text-white"><i className="fas fa-angle-right"></i></div>
        </div>
      </div>
    </div>
  );
};

export default CreatePanel;
