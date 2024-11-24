import { useState } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Logo from '@/Components/Logo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link } from '@inertiajs/react';
import { Ziggy } from '@/ziggy';
import Notifications from '@/Pages/Notifications'; // Importa el componente de notificaciones
import Sidebar from '@/Components/Dashboard/Sidebar';

export default function Authenticated({ user, header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <div className="min-h-screen bg-gray-100">
     
            <nav className="navbar navbar-expand-lg navbar-dark navbar-custom fixed-top w-full ">
                <div className="container px-5">
                    <div className="flex justify-start lg:justify-center lg:col-start-2">
                        <Logo />
                    </div>
                    
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
                            <li className="nav-item">
                                <NavLink href={route('dashboard')} active={route().current('dashboard')} className="nav-link px-3 py-2 text-white bg-fuchsia-600 rounded-md transition hover:bg-fuchsia-700 focus:ring-2 focus:ring-fuchsia-400">
                                    Panel
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink href={route('campaign')} active={route().current('campaign')} className="nav-link px-3 py-2 text-white bg-fuchsia-600 rounded-md transition hover:bg-fuchsia-700 focus:ring-2 focus:ring-fuchsia-400">
                                    Campañas
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink href={route('CreateCampaign')} active={route().current('CreateCampaign')} className="nav-link px-3 py-2 text-white bg-fuchsia-600 rounded-md transition hover:bg-fuchsia-700 focus:ring-2 focus:ring-fuchsia-400">
                                    Crear campaña
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink href={route('myCampaigns')} active={route().current('myCampaigns')} className="nav-link px-3 py-2 text-white bg-fuchsia-600 rounded-md transition hover:bg-fuchsia-700 focus:ring-2 focus:ring-fuchsia-400">
                                    Mis Campañas
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink href={route('favoritos')} active={route().current('favoritos')} className="nav-link px-3 py-2 text-white bg-fuchsia-600 rounded-md transition hover:bg-fuchsia-700 focus:ring-2 focus:ring-fuchsia-400">
                                    Mis Favoritos
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                                            >
                                                {user.name}
                                                <svg
                                                    className="ms-2 -me-0.5 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link href={route('profile.edit')}>Perfil</Dropdown.Link>
                                        {/* Condicional para mostrar la opción "Admin Panel" */}
                                        {user.role === 'admin' && (
                                        <Dropdown.Link href={route('admin.dashboard')}>Admin Panel</Dropdown.Link>
                                        )}
  
                                        <Dropdown.Link href={route('logout')} method="post" as="button">
                                            Salir
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            {/* Contenido principal */}
            <div className="pt-16">
                {header && (
                    <header className="bg-white shadow">
                        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">{header}</div>
                    </header>
                )}

                <main>{children}</main>
            </div>
        </div>
    );
}
