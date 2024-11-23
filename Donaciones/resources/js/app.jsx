import './bootstrap';
import '../css/app.css';
import '../css/styles.css'
import '../css/stylesWelcome.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@fortawesome/fontawesome-free/css/all.min.css';

// Importar FontAwesome
import '@fortawesome/fontawesome-free/css/all.min.css';

import { initMercadoPago } from '@mercadopago/sdk-react'; 
import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import AdminDashboard from './Pages/Admin/AdminDashboard'; 

const appName = import.meta.env.VITE_APP_NAME || 'Dar Vuelve';

// Inicializa Mercado Pago // aca va el access token de mercado pago 
initMercadoPago('TEST-367218081422021-092321-3629b0eee6131454c4b8e4ade60c39c4-219544919');

createInertiaApp({
  title: (title) => `${title} - ${appName}`,
  resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
  setup({ el, App, props }) {
    const root = createRoot(el);

    root.render(
      <Router>
        <App {...props} />

      </Router>
    );
  },
  progress: {
    color: '#4B5563',
  },
});
