import React from 'react';
import { Link } from "@inertiajs/react";
import Logo from "@/Components/Logo";


const NavBar = ({ auth }) => {
    
    return (
        <nav className="navbar navbar-expand-lg navbar-dark navbar-custom fixed-top">
            <div className="container px-5">
                <div className="flex justify-start lg:justify-center lg:col-start-2">
                    <Logo />
                </div>
                <a className="navbar-brand" href="#page-top">
                    Dar vuelve Donaciones
                </a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarResponsive"
                    aria-controls="navbarResponsive"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav ms-auto">
                        {auth.user ? (
                            <li className="nav-item">
                                <Link
                                    href={route("dashboard")}
                                    className="nav-link px-3 py-2 text-white bg-fuchsia-600 rounded-md transition hover:bg-fuchsia-700 focus:ring-2 focus:ring-fuchsia-400"
                                >
                                    Panel de usuario
                                </Link>
                            </li>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <Link
                                        href={route("register")}
                                        className="nav-link px-3 py-2 text-white bg-fuchsia-600 rounded-md transition hover:bg-fuchsia-700 focus:ring-2 focus:ring-fuchsia-400"
                                    >
                                        Registrarse
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link
                                        href={route("login")}
                                        className="nav-link px-3 py-2 text-white bg-transparent border border-white rounded-md transition hover:bg-fuchsia-600 focus:ring-2 focus:ring-fuchsia-400"
                                    >
                                        Iniciar sesión
                                    </Link>
                                </li>

                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
