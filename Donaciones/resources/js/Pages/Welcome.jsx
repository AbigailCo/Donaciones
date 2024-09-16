import { Link, Head } from "@inertiajs/react";
import Footer from '@/Components/Footer';
import Carrucel from '@/Components/Carrucel';
import SeccionWelcome from '@/Components/SeccionWelcome';
import Logo from '@/Components/Logo';

export default function Welcome({ auth, laravelVersion, phpVersion }) {
  const handleImageError = () => {
    document.getElementById("screenshot-container")?.classList.add("!hidden");
    document.getElementById("docs-card")?.classList.add("!row-span-1");
    document.getElementById("docs-card-content")?.classList.add("!flex-row");
    document.getElementById("background")?.classList.add("!hidden");
  };

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
            <header className="grid grid-cols-2 items-center gap-2 py-10 lg:grid-cols-3">
              <div className="flex lg:justify-center lg:col-start-2">
               <Logo/>
              </div>
              <nav className="-mx-3 flex flex-1 justify-end">
                {auth.user ? (
                  <Link
                    href={route("dashboard")}
                    className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                  >
                    Panel de usuario
                  </Link>
                ) : (
                  <>
                    <Link
                      href={route("login")}
                      className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                    >
                      Iniciar sesion
                    </Link>
                    <Link
                      href={route("register")}
                      className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                    >
                      Registrarse
                    </Link>
                  </>
                )}
              </nav>
            </header>

            <main className="mt-6">
              <Carrucel />
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
