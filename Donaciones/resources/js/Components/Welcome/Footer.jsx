// Components/Footer.js
import React from "react";
import Typography from '@mui/material/Typography';

export default function Footer() {
  return (
    <footer className="bg-black text-white py-3 w-full flex flex-col items-center mt-auto">
      <div className="container flex flex-col items-center gap-2">
        {/* Enlace al repositorio con el icono de GitHub */}
        <a
          href="https://github.com/AbigailCo/Donaciones"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-fuchsia-500 transition-colors duration-300 flex items-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            className="bi bi-github"
            viewBox="0 0 16 16"
          >
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.86 3.75-3.64 3.95.3.26.57.77.57 1.55 0 1.12-.01 2.02-.01 2.3 0 .22.15.45.55.38C13.71 14.53 16 11.54 16 8c0-4.42-3.58-8-8-8z" />
          </svg>
          <span className="text-lg font-semibold">Repositorio del Proyecto</span>
        </a>

        {/* Texto inspirador */}
        <Typography variant="body2" sx={{ fontSize: '0.9rem', mt: 1, color: '#bbb' }}>
          Ayudando a construir un futuro mejor.
        </Typography>
      </div>
    </footer>
  );
}

