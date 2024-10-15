// NavBar.jsx
import React from 'react';
import { Link } from "@inertiajs/react";

const NavBar = ({ auth }) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light fixed-top py-3" id="mainNav">
            <div className="container px-4 px-lg-5">
                <Link className="navbar-brand" href="#page-top">Dar vuelve</Link>
                <button
                    className="navbar-toggler navbar-toggler-right"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarResponsive"
                    aria-controls="navbarResponsive"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav ms-auto my-2 my-lg-0">
                        <li className="nav-item"><Link className="nav-link" href="#buscador">Buscador</Link></li>
                        <li className="nav-item"><Link className="nav-link" href="#campañas">Campañas</Link></li>
                        <li className="nav-item"><Link className="nav-link" href="#crearcampañas">Crear Campañas</Link></li>
                        <li className="nav-item"><Link className="nav-link" href="#portfolio">Portfolio</Link></li>
                        <li className="nav-item"><Link className="nav-link" href="#contact">Contact</Link></li>
                        {auth.user ? (
                            <li className="nav-item">
                                <Link className="nav-link" href={route("dashboard")}>Panel de usuario</Link>
                            </li>
                        ) : (
                            <>
                                <li className="nav-item"><Link className="nav-link" href={route("login")}>Iniciar sesión</Link></li>
                                <li className="nav-item"><Link className="nav-link" href={route("register")}>Registrarse</Link></li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
