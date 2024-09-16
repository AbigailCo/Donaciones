import { Link } from '@inertiajs/react';

const Logo = () => {
  return (
    <Link href="/" className="navbar-brand flex items-center space-x-1">
      <img
        src="/images/LogoDarVuelve.png"
        className="w-24 h-auto" // Ajusta el tamaño aquí
        alt="Logo"
      />
     {/*  <span className="text-gray-800 font-semibold">Dar Vuelve</span> */} {/* Puedes agregar un texto si lo deseas */}
    </Link>
  );
};

export default Logo;
