import React, { useState, useEffect } from "react";
import axios from "axios";

import { IoAccessibilityOutline } from "react-icons/io5";
import "bootstrap/dist/css/bootstrap.min.css";

const CardPanel = () => {
  const [campaignCount, setCampaignCount] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:8000/campaign-count")
      .then((response) => {
        setCampaignCount(response.data.count);
      })
      .catch((error) => {
        console.error("Error fetching product count:", error);
      });
  }, []);

  return (
    <div
      className="card mb-2 shadow-sm bg-gradient-to-r from-purple-400 to-purple-600"
      style={{
       
        color: "black",
        fontSize: "0.875rem",
      }}
    >
      <div className="card-body d-flex justify-content-between align-items-center p-2">
        <div className="d-flex align-items-center">
          <i className="fa-solid fa-people-group me-2"></i>
          <span className="h6 mb-0">Todas las campañas</span>
        </div>
        <p className="fw-bold mb-0">{campaignCount}</p>
      </div>
      <div className="card-footer d-flex justify-content-between align-items-center bg-dark text-white p-2">
        <a
          href={route("campaign")}
          className="small text-white stretched-link"
          style={{ textDecoration: "none" }}
        >
          Ver más
        </a>
        <i className="fas fa-angle-right"></i>
      </div>
    </div>
  );
};

export default CardPanel;
