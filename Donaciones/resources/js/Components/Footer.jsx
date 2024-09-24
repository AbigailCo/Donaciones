import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-blue-600 text-center text-white">
      
      <div className="container p-4 pb-0">
   
        <section className="mb-4">
        

          {/* Github */}
          <a
            className="btn btn-outline-light btn-floating m-1 hover:bg-fuchsia-500"
            href="https://github.com/AbigailCo/Donaciones"
            role="button"
            target="_blank"
            rel="noopener noreferrer"
          >
            
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-github" viewBox="0 0 16 16">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.86 3.75-3.64 3.95.3.26.57.77.57 1.55 0 1.12-.01 2.02-.01 2.3 0 .22.15.45.55.38C13.71 14.53 16 11.54 16 8c0-4.42-3.58-8-8-8z" />
            </svg>
          </a>
          <span className="font-semibold text-lg">
        REPOSITORIO DEL PROYECTO
    </span>
        </section>
      </div>
     
    </footer>
  );
};

export default Footer;
