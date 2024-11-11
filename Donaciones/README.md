# DAR VUELVE - Plataforma de Donaciones y Crowdfunding

## Descripción del Proyecto

**DAR VUELVE** es una plataforma web de **donaciones y crowdfunding** donde los usuarios pueden contribuir a campañas sociales y proyectos con impacto en diversas áreas. Este proyecto ha sido desarrollado utilizando **Laravel** para el backend y **React** para el frontend, brindando una experiencia moderna, segura y sencilla para los usuarios.

## Funcionalidades Principales

- **Registro y Login de Donantes**: Los usuarios pueden registrarse y autenticar su cuenta utilizando su correo electrónico o redes sociales.
- **Creación de Campañas**: Los creadores de campañas pueden generar nuevas iniciativas con un título, descripción, objetivo de recaudación y fechas de inicio y fin.
- **Explorar Campañas Activas**: Los donantes pueden explorar campañas activas disponibles en la plataforma y seleccionar aquellas que les interesen.
- **Realizar Donaciones**: Los donantes pueden hacer contribuciones a campañas específicas de manera segura.
- **Búsqueda de Campañas**: Los usuarios pueden buscar campañas por palabras clave para encontrar rápidamente aquellas que coincidan con sus intereses.
- **Notificaciones de Progreso**: Los donantes recibirán notificaciones sobre el progreso de las campañas a las que han donado, manteniéndose informados sobre su impacto.
- **Comentarios y Retroalimentación**: Los donantes pueden dejar comentarios y sugerencias en las campañas a las que han contribuido, ofreciendo su retroalimentación a los creadores.
- **Mapa Interactivo**: Los donantes pueden visualizar un mapa interactivo donde se muestran las ubicaciones de los proyectos financiados por las campañas.
- **Guardar Campañas Favoritas**: Los donantes pueden guardar campañas que les interesen para revisarlas y hacer donaciones más tarde.
- **Estadísticas de la Plataforma**: Los usuarios pueden visualizar estadísticas globales de la plataforma, como campañas completadas, en curso, sus donantes y avances estadísticos.

## Tecnologías Utilizadas

- **Backend**: Laravel
- **Frontend**: React
- **Base de Datos**: MySQL
- **Autenticación**: Laravel Passport o Socialite para registro y login mediante redes sociales
- **Notificaciones**: Laravel Notifications
- **Estilos**: Bootstrap 5 para el diseño y la responsividad

## Roadmap de Funcionalidades

### Historias de Usuario (User Stories)

1. **HU1 - Registrar Usuario**: Como **Donante**, quiero registrarme con mi correo electrónico o redes sociales, para acceder a la plataforma y hacer donaciones. (Prioridad: ALTA)
2. **HU2 - Crear Campaña de Donación**: Como **Creador de Campañas**, quiero crear una nueva campaña con un título, descripción, objetivo de recaudación y fechas de inicio y fin, para poder atraer donantes. (Prioridad: ALTA)
3. **HU3 - Ver Inicio**: Como **Donante**, quiero explorar una lista de campañas activas, para encontrar una campaña que me interese y contribuir. (Prioridad: ALTA)
4. **HU4 - Donar a Campaña**: Como **Donante**, quiero realizar una donación a una campaña de forma segura, para contribuir al objetivo de la campaña. (Prioridad: ALTA)
5. **HU5 - Login**: Como **Donante**, quiero loguearme, para iniciar sesión en mi perfil. (Prioridad: ALTA)
6. **HU6 - Buscar Campaña**: Como **Donante**, quiero buscar campañas por palabras clave, para encontrar rápidamente campañas relacionadas con mis intereses. (Prioridad: ALTA)
7. **HU7 - Ver Detalles de Campaña Creada**: Como **Creador de Campañas**, quiero ver un resumen del progreso de mis campañas, para hacer seguimiento y ajustar cambios. (Prioridad: MEDIA)
8. **HU8 - Recibir Notificaciones**: Como **Donante**, quiero recibir notificaciones sobre el progreso de las campañas a las que he donado, para mantenerme informado sobre su impacto. (Prioridad: MEDIA)
9. **HU9 - Dejar Comentarios**: Como **Donante**, quiero dejar comentarios o sugerencias en las campañas a las que dono, para dar retroalimentación a los creadores. (Prioridad: MEDIA/BAJA)
10. **HU10 - Ver Mapa Interactivo de Campañas**: Como **Donante**, quiero ver la ubicación de los proyectos financiados en un mapa interactivo, para conocer su impacto geográfico. (Prioridad: MEDIA/BAJA)
11. **HU11 - Guardar Favoritos**: Como **Donante**, quiero guardar campañas que me interesen en una lista de favoritos, para poder revisarlas y donar más tarde. (Prioridad: MEDIA/BAJA)
12. **HU12 - Visualizar Información y Uso de Plataforma**: Como **Usuario**, quiero ver estadísticas globales de la plataforma, para ver campañas completadas, en curso, sus donantes y avances estadísticos. (Prioridad: BAJA)

## Cómo Ejecutar el Proyecto

### Instrucciones de Instalación

1. **Clona el repositorio**:

    ```bash
    git clone https://github.com/tu-usuario/dar-vuelve.git
    ```

2. **Instala las dependencias del backend (Laravel)**:

    ```bash
    cd dar-vuelve/backend
    composer install
    cp .env.example .env
    php artisan key:generate
    php artisan migrate
    ```

3. **Instala las dependencias del frontend (React)**:

    ```bash
    cd dar-vuelve/frontend
    npm install
    ```

4. **Ejecuta el servidor de desarrollo**:

    - En el backend (Laravel):

        ```bash
        php artisan serve
        ```

    - En el frontend (React):

        ```bash
        npm start
        ```

5. Accede a la plataforma en `http://localhost:8000`

## Contribuciones

Si deseas contribuir al proyecto, por favor abre un *pull request* o abre un *issue* para discutir posibles mejoras.

---

© 2024 DAR VUELVE. Todos los derechos reservados.
