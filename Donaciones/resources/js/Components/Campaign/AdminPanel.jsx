import React from "react";

const AdminPanel = () => {
  return (
    <div
      className="card mb-2 shadow-sm bg-gradient-to-r from-black-400 to-black-600 "
      style={{
        color: "black",
        fontSize: "0.875rem",
      }}
    >
      <div className="card-body d-flex justify-content-between align-items-center p-2">
        <div className="d-flex align-items-center">
          <i className="fa-solid fa-user"></i>
          <span className="h6 mb-0">Admin</span>
        </div>
      </div>
      <div className="card-footer d-flex justify-content-between align-items-center bg-dark text-white p-2">
        <a
          className="small text-white stretched-link"
          href={route("admin.dashboard")}
          style={{
            textDecoration: "none",
            color: "#FFFFFF",
            fontWeight: "bold",
          }}
        >
          Vaer panel de adminisador
        </a>
        <i className="fas fa-angle-right"></i>
      </div>
    </div>
  );
};

export default AdminPanel;
