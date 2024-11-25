import React from 'react';

const AdminPanel = ({ auth }) => {
  return (
    <div className="">
      {/* Mostrar el panel solo para administradores */}
      <div
        className="card mb-4 shadow-sm"
        style={{
          backgroundColor: '#333333', // Fondo oscuro
          color: '#FFFFFF', // Texto blanco
          border: '2px solid #DC3545', // Borde rojo para resaltar
        }}
      >
        <div className="card-body d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center">
            <div
              className="sb-nav-link-icon mr-3"
              style={{ color: '#DC3545' }} // Ícono rojo
            >
              <i className="fa-solid fa-user"></i>
            </div>
            <span className="h5 mb-0">Admin</span>
          </div>
        </div>
        <div
          className="card-footer d-flex align-items-center justify-content-between"
          style={{ backgroundColor: '#444444' }} // Fondo del footer ligeramente más claro
        >
          {/* Redirección a /admin */}
          <a
            className="small text-white stretched-link"
            href={route('admin.dashboard')} // Ruta principal del dashboard de admin
            style={{
              textDecoration: 'none',
              color: '#FFFFFF', // Texto blanco
              fontWeight: 'bold',
            }}
          >
            Ver panel de Administración
          </a>
          <div
            className="small"
            style={{ color: '#DC3545' }} // Flecha roja
          >
            <i className="fas fa-angle-right"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;

