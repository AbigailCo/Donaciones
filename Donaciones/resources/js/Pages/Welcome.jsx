import { Link, Head } from "@inertiajs/react";
import Footer from '@/Components/Footer';
import Carrusel from '@/Components/Carrusel';
import SeccionWelcome from '@/Components/SeccionWelcome';
import Logo from '@/Components/Logo';

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    const handleImageError = () => {
        document.getElementById("screenshot-container")?.classList.add("!hidden");
        document.getElementById("docs-card")?.classList.add("!row-span-1");
        document.getElementById("docs-card-content")?.classList.add("!flex-row");
        document.getElementById("background")?.classList.add("!hidden");
    };
    const images = [
        { src: '/images/campaign1.jpg', alt: 'Banner de la campaña 1' },
        { src: '/images/campaign.jpg', alt: 'Banner de la campaña 2' },
        /* { src: '/images/campaign3.jpg', alt: 'Banner de la campaña 3' }, */
    ];

    return (
        <>
            <Head title="Welcome" />
            <div className="relative min-h-screen bg-gray-50 text-black/50 dark:bg-black dark:text-white/50">
                <img
                    id="background"
                    className="absolute inset-0 w-full h-full object-cover -z-10"
                    src="/images/FondoDArVuelve.jpg"
                    alt="Fondo"
                />

                <div className="relative flex flex-col items-center justify-center min-h-screen selection:bg-[#FF2D20] selection:text-white">
                    <div className="relative w-full max-w-2xl px-6 lg:max-w-7xl">
                        <header className="grid grid-cols-2 items-center gap-4 py-6 lg:grid-cols-3 bg-blue-900 shadow-md">
                       
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

                        <main className="mt-6">
                            <Carrusel images={images} interval={4000} />
                            <SeccionWelcome />
                            <Footer />
                        </main>

                        <footer className="py-16 text-center text-sm text-black dark:text-white/70">
                            Laravel v{laravelVersion} (PHP v{phpVersion})
                        </footer>
                    </div>
                </div>
            </div>
        </>
    );
}
