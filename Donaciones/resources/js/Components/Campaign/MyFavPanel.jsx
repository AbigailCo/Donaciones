import React, { useState, useEffect } from 'react';
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';

const MyFavPanel = () => {
    const [myFavCount, setMyFavCount] = useState(0);

    useEffect(() => {
        axios.get('http://localhost:8000/user-favorites/count')
            .then(response => {
                setMyFavCount(response.data.count); // Corregido
            })
            .catch(error => {
                console.error('Error fetching campaign count:', error);
            });
    }, []);

    return (
        <div className="">
            <div className="card mb-4 shadow-sm" style={{ backgroundColor: 'rgba(255, 255, 0, 0.8)', color: 'black' }}>
                <div className="card-body d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center">
                        <div className="sb-nav-link-icon mr-3"><i className="fa-solid fa-star"></i></div>

                        <span className="h5 mb-0">Mis Favoritos</span>
                    </div>
                    <p className="text-center fw-bold fs-4 mb-0">{myFavCount}</p>
                </div>
                <div className="card-footer d-flex align-items-center justify-content-between bg-dark text-white">
                    <a className="small text-white stretched-link" href={route('favoritos')} style={{ textDecoration: 'none' }}>
                        Ver mis favoritos
                    </a>
                    <div className="small text-white"><i className="fas fa-angle-right"></i></div>
                </div>
            </div>
        </div>
    );
};

export default MyFavPanel;
