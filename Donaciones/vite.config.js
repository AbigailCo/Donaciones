import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.jsx',

            refresh: true,
        }),
        react(),
    ],
    server: {
        proxy: {
            '/campaigns': {
                target: 'http://127.0.0.1:8000',  // La URL de tu servidor Laravel
                changeOrigin: true,
                secure: false,
            },
        },
    },
});
