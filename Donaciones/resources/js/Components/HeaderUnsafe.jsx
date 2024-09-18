//aisle el header para que aparezca al presionar login y registrarse
import { Link } from "@inertiajs/react";
import Logo from '@/Components/Logo';

export default function Header({ auth }) {
    return (
        <header className="w-full grid grid-cols-2 items-center gap-4 py-6 lg:grid-cols-3 bg-blue-900 shadow-md">
            <div className="flex justify-start lg:justify-center lg:col-start-2">
                <Logo />
            </div>
            <nav className="flex justify-end space-x-4 lg:col-start-3">
                {auth.user ? (
                    <Link
                        href={route("dashboard")}
                        className="px-4 py-2 rounded-md bg-fuchsia-600 text-white transition hover:bg-fuchsia-700 focus:ring-2 focus:ring-fuchsia-400 focus:outline-none"
                    >
                        Panel de usuario
                    </Link>
                ) : (
                    <>
                        <Link
                            href={route("login")}
                            className="px-4 py-2 rounded-md bg-transparent text-white border border-white transition hover:bg-fuchsia-600 hover:text-white focus:ring-2 focus:ring-fuchsia-400 focus:outline-none"
                        >
                            Iniciar sesión
                        </Link>
                        <Link
                            href={route("register")}
                            className="px-4 py-2 rounded-md bg-fuchsia-600 text-white transition hover:bg-fuchsia-700 focus:ring-2 focus:ring-fuchsia-400 focus:outline-none"
                        >
                            Registrarse
                        </Link>
                    </>
                )}
            </nav>
        </header>
    );
}
