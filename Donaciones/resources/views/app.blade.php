<!DOCTYPE html>

<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
@vite(['resources/css/app.css']) <!-- Usa tu archivo JS principal si es necesario -->
@vite(['resources/css/styles.css']) 


    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>{{ config('app.name', 'DarVuelve') }}</title>

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

    <!-- Scripts -->
    @vite(['resources/js/app.js']) <!-- Usa tu archivo JS principal si es necesario -->
</head>
<body class="font-sans antialiased">
    @yield('content') <!-- Aquí se inyectará el contenido de cada vista -->
</body>
</html>
