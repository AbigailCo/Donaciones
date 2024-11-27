import React, { useState, useEffect } from "react";
import axios from "axios";

import "bootstrap/dist/css/bootstrap.min.css";

const MyFavPanel = () => {
  const [myFavCount, setMyFavCount] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:8000/user-favorites/count")
      .then((response) => {
        setMyFavCount(response.data.count); // Corregido
      })
      .catch((error) => {
        console.error("Error fetching campaign count:", error);
      });
  }, []);

  return (
    <div
      className="card mb-2 shadow-sm bg-gradient-to-r from-yellow-400 to-yellow-600"
      style={{
        color: "black",
        fontSize: "0.875rem",
      }}
    >
      <div className="card-body d-flex justify-content-between align-items-center p-2">
        <div className="d-flex align-items-center">
          <i className="fa-solid fa-star"></i>
          <span className="h6 mb-0">Mis Favoritos</span>
        </div>
        <p className="fw-bold mb-0">{myFavCount}</p>
      </div>
      <div className="card-footer d-flex justify-content-between align-items-center bg-dark text-white p-2">
        <a
          className="small text-white stretched-link"
          href={route("favoritos")}
          style={{ textDecoration: "none" }}
        >
          Ver mis favoritos
        </a>
        <i className="fas fa-angle-right"></i>
      </div>
    </div>
  );
};

export default MyFavPanel;
