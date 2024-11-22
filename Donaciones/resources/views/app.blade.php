<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title inertia>{{ config('app.name', 'DarVuelve') }}</title>

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

    <!-- Condicional para estilos y scripts específicos -->
    @if(isset($page))
        <!-- Configuración para React e Inertia -->
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
        @inertiaHead
    @else
        <!-- Configuración para Blade tradicional -->
        @vite(['resources/css/app.css', 'resources/css/styles.css'])
        @vite(['resources/js/app.js'])
    @endif
</head>
<body class="font-sans antialiased">
    @if(isset($page))
        <!-- Contenido para Inertia.js (React) -->
        @inertia
    @else
        <!-- Contenido para Blade tradicional -->
        @yield('content')
    @endif
</body>
</html>
