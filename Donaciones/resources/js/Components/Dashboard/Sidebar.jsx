import React from "react";
import { Link } from "@inertiajs/react";

import CreatePanel from "../Campaign/CreatePanel";
import CampaignPanel from "../Campaign/CardPanel";
import MyCampPanel from "../Campaign/MyCampPanel";
import MyFavPanel from "../Campaign/MyFavPanel";

const Sidebar = ({ auth }) => {
  return (
    <div
      id="layoutSidenav_nav"
      className="d-flex flex-column h-full bg-gradient-to-r from-blue-600 via-purple-250 to-pink-500 shadow-lg mt-12" // Ajusta el margen superior
    >
      <nav
        className="sb-sidenav accordion sb-sidenav-dark "
        id="sidenavAccordion"
    
      >
        <div className="sb-sidenav-menu">
          <div className="nav flex-column">
            <div className="sb-sidenav-menu-heading text-white text-xl font-semibold mt-6">
              Campañas
            </div>
            <CampaignPanel />
            <CreatePanel />

            <div className="sb-sidenav-menu-heading text-white text-xl font-semibold mt-6">
              Mi sección
            </div>

            <MyCampPanel />
            <MyFavPanel />
          </div>
        </div>
        <div className="sb-sidenav-footer bg-blue-800 p-4 text-white mt-auto">
          <div className="small">Bienvenido:</div>
          <div className="font-semibold">{auth.user.name}</div>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
