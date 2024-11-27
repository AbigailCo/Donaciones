import React, { useState } from "react";
import { Link } from "@inertiajs/react";

import CreatePanel from "../Campaign/CreatePanel";
import CampaignPanel from "../Campaign/CardPanel";
import MyCampPanel from "../Campaign/MyCampPanel";
import MyFavPanel from "../Campaign/MyFavPanel";
import EstadisticasPanel from "../Campaign/EstadisticasPanel";
import AdminPanel from "../Campaign/AdminPanel";

const Sidebar = ({ auth }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div
      id="layoutSidenav_nav"
      className={`d-flex flex-column bg-gradient-to-r from-blue-300 to-fuchsia-300 h-full shadow-sm ${
        isCollapsed ? "w-16" : "w-64"
      } transition-all duration-300`}
    >
      <button
        onClick={toggleSidebar}
        className="p-2  bg-gradient-to-r from-blue-500 to-fuchsia-500 text-white focus:outline-none transition-all duration-300"
      >
        {isCollapsed ? "⮀" : "⮀"}
      </button>

      <nav
        className={`sb-sidenav accordion sb-sidenav-dark ${
          isCollapsed ? "hidden" : ""
        }`}
        id="sidenavAccordion"
      >
        <div className="sb-sidenav-footer bg-gradient-to-r from-white-400 to-fuchsia-400 py-3 px-3 text-black mt-auto">
          <div className="small mb-1">Bienvenido:</div>
          <div className="fw-bold">{auth.user.name}</div>
        </div>
        <div className="sb-sidenav-menu">
          <div className="nav flex-column">
            <div className="sb-sidenav-menu-heading text-black fw-bold mt-3">
              Campañas
            </div>
            <CreatePanel />
            <CampaignPanel />
            <div className="sb-sidenav-menu-heading text-black fw-bold mt-3">
              Mi sección
            </div>
            <MyCampPanel />
            <MyFavPanel />
            <div className="sb-sidenav-menu-heading text-black fw-bold mt-3">
              Generales
            </div>
            <EstadisticasPanel />

            {auth.user.role === "admin" && <AdminPanel />}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
