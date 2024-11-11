<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>DAR VUELVE - Plataforma de Donaciones y Crowdfunding</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
            color: #333;
        }

        header {
            background-color: #ff6600;
            color: white;
            text-align: center;
            padding: 1rem 0;
        }

        header img {
            width: 200px;
        }

        section {
            margin: 20px;
        }

        h1, h2 {
            color: #ff6600;
        }

        h3 {
            color: #333;
        }

        ul {
            list-style: none;
            padding: 0;
        }

        ul li {
            padding: 5px 0;
        }

        .roadmap {
            background-color: #fff;
            padding: 15px;
            border-radius: 8px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }

        .roadmap h3 {
            color: #ff6600;
        }

        .installation {
            background-color: #fff;
            padding: 15px;
            border-radius: 8px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }

        .installation code {
            background-color: #f1f1f1;
            padding: 5px;
            border-radius: 4px;
        }

        footer {
            text-align: center;
            padding: 1rem;
            background-color: #333;
            color: white;
        }
    </style>
</head>

<body>
    <header>
        <h1>DAR VUELVE - Plataforma de Donaciones y Crowdfunding</h1>
        <img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" alt="Laravel Logo">
    </header>

    <section>
        <h2>Descripción del Proyecto</h2>
        <p><strong>DAR VUELVE</strong> es una plataforma web de <strong>donaciones y crowdfunding</strong> donde los usuarios pueden contribuir a campañas sociales y proyectos con impacto en diversas áreas. Este proyecto ha sido desarrollado utilizando <strong>Laravel</strong> para el backend y <strong>React</strong> para el frontend, brindando una experiencia moderna, segura y sencilla para los usuarios.</p>

        <h2>Funcionalidades Principales</h2>
        <ul>
            <li><strong>Registro y Login de Donantes:</strong> Los usuarios pueden registrarse y autenticar su cuenta utilizando su correo electrónico o redes sociales.</li>
            <li><strong>Creación de Campañas:</strong> Los creadores de campañas pueden generar nuevas iniciativas con un título, descripción, objetivo de recaudación y fechas de inicio y fin.</li>
            <li><strong>Explorar Campañas Activas:</strong> Los donantes pueden explorar campañas activas disponibles en la plataforma y seleccionar aquellas que les interesen.</li>
            <li><strong>Realizar Donaciones:</strong> Los donantes pueden hacer contribuciones a campañas específicas de manera segura.</li>
            <li><strong>Búsqueda de Campañas:</strong> Los usuarios pueden buscar campañas por palabras clave para encontrar rápidamente aquellas que coincidan con sus intereses.</li>
            <li><strong>Notificaciones de Progreso:</strong> Los donantes recibirán notificaciones sobre el progreso de las campañas a las que han donado, manteniéndose informados sobre su impacto.</li>
            <li><strong>Comentarios y Retroalimentación:</strong> Los donantes pueden dejar comentarios y sugerencias en las campañas a las que han contribuido, ofreciendo su retroalimentación a los creadores.</li>
            <li><strong>Mapa Interactivo:</strong> Los donantes pueden visualizar un mapa interactivo donde se muestran las ubicaciones de los proyectos financiados por las campañas.</li>
            <li><strong>Guardar Campañas Favoritas:</strong> Los donantes pueden guardar campañas que les interesen para revisarlas y hacer donaciones más tarde.</li>
            <li><strong>Estadísticas de la Plataforma:</strong> Los usuarios pueden visualizar estadísticas globales de la plataforma, como campañas completadas, en curso, sus donantes y avances estadísticos.</li>
        </ul>

        <h2>Tecnologías Utilizadas</h2>
        <ul>
            <li><strong>Backend:</strong> Laravel</li>
            <li><strong>Frontend:</strong> React</li>
            <li><strong>Base de Datos:</strong> MySQL</li>
            <li><strong>Autenticación:</strong> Laravel Passport o Socialite para registro y login mediante redes sociales</li>
            <li><strong>Notificaciones:</strong> Laravel Notifications</li>
            <li><strong>Estilos:</strong> Bootstrap 5 para el diseño y la responsividad</li>
        </ul>

        <h2>Roadmap de Funcionalidades</h2>
        <div class="roadmap">
            <h3>Historias de Usuario (User Stories)</h3>
            <ul>
                <li><strong>HU1 - Registrar Usuario:</strong> Como **Donante**, quiero registrarme con mi correo electrónico o redes sociales, para acceder a la plataforma y hacer donaciones. (Prioridad: ALTA)</li>
                <li><strong>HU2 - Crear Campaña de Donación:</strong> Como **Creador de Campañas**, quiero crear una nueva campaña con un título, descripción, objetivo de recaudación y fechas de inicio y fin, para poder atraer donantes. (Prioridad: ALTA)</li>
                <li><strong>HU3 - Ver Inicio:</strong> Como **Donante**, quiero explorar una lista de campañas activas, para encontrar una campaña que me interese y contribuir. (Prioridad: ALTA)</li>
                <li><strong>HU4 - Donar a Campaña:</strong> Como **Donante**, quiero realizar una donación a una campaña de forma segura, para contribuir al objetivo de la campaña. (Prioridad: ALTA)</li>
                <li><strong>HU5 - Login:</strong> Como **Donante**, quiero loguearme, para iniciar sesión en mi perfil. (Prioridad: ALTA)</li>
                <li><strong>HU6 - Buscar Campaña:</strong> Como **Donante**, quiero buscar campañas por palabras clave, para encontrar rápidamente campañas relacionadas con mis intereses. (Prioridad: ALTA)</li>
                <li><strong>HU7 - Ver Detalles de Campaña Creada:</strong> Como **Creador de Campañas**, quiero ver un resumen del progreso de mis campañas, para hacer seguimiento y ajustar cambios. (Prioridad: MEDIA)</li>
                <li><strong>HU8 - Recibir Notificaciones:</strong> Como **Donante**, quiero recibir notificaciones sobre el progreso de las campañas a las que he donado, para mantenerme informado sobre su impacto. (Prioridad: MEDIA)</li>
                <li><strong>HU9 - Dejar Comentarios:</strong> Como **Donante**, quiero dejar comentarios o sugerencias en las campañas a las que dono, para dar retroalimentación a los creadores. (Prioridad: MEDIA/BAJA)</li>
                <li><strong>HU10 - Ver Mapa Interactivo de Campañas:</strong> Como **Donante**, quiero ver la ubicación de los proyectos financiados en un mapa interactivo, para conocer su impacto geográfico. (Prioridad: MEDIA/BAJA)</li>
                <li><strong>HU11 - Guardar Favoritos:</strong> Como **Donante**, quiero guardar campañas que me interesen en una lista de favoritos, para poder revisarlas y donar más tarde. (Prioridad: MEDIA/BAJA)</li>
                <li><strong>HU12 - Visualizar Información y Uso de Plataforma:</strong> Como **Usuario**, quiero ver estadísticas globales de la plataforma, para ver campañas completadas, en curso, sus donantes y avances estadísticos. (Prioridad: BAJA)</li>
            </ul>
        </div>

        <h2>Cómo Ejecutar el Proyecto</h2>
        <div class="installation">
            <h3>Instrucciones de Instalación</h3>
            <ol>
                <li>Clona el repositorio:
                    <pre><code>git clone https://github.com/tu-usuario/dar-vuelve.git</code></pre>
                </li>
                <li>Instala las dependencias del backend (Laravel):
                    <pre><code>cd dar-vuelve/backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate</code></pre>
                </li>
                <li>Instala las dependencias del frontend (React):
                    <pre><code>cd dar-vuelve/frontend
npm install</code></pre>
                </li>
                <li>Ejecuta el servidor de desarrollo:
                    <pre><code>php artisan serve</code></pre>
                    y luego en otra terminal:
                    <pre><code>npm start</code></pre>
                </li>
                <li>Accede a la plataforma en <strong>http://localhost:8000</strong></li>
            </ol>
        </div>

    </section>

    <footer>
        <p>&copy; 2024 DAR VUELVE. Todos los derechos reservados.</p>
    </footer>
</body>

</html>
