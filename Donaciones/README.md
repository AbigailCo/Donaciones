# DAR VUELVE - Plataforma de Donaciones

## Descripción del Proyecto

**DAR VUELVE** es una plataforma web de **donaciones** donde los usuarios pueden contribuir a campañas sociales y proyectos con impacto en diversas áreas. 
Este proyecto ha sido desarrollado utilizando **Laravel** para el backend y **React** para el frontend, brindando una experiencia moderna, segura y sencilla para los usuarios.

## Funcionalidades Principales

- **Registro y Login de Donantes**: Los usuarios pueden registrarse y autenticar su cuenta utilizando su correo electrónico o su cuenta de Gmail, para esto implementamos la API de google logrando asi una autenticacion mas rapida.
- **Creación de Campañas**: Las personas que necesiten pueden generar y gestionar campañas para recibir financiamiento con un título, descripción, objetivo de recaudación y fechas de inicio y fin, imagenes y videos referentes a la campaña, metodos de pago a utilizar y una ubicacion real en un mapa interactivo.
- **Explorar Campañas Activas**: Los donantes pueden explorar campañas activas disponibles en la plataforma mediante un buscador con filtros segun la categoria que mas les interece colaborar como educacion, animales, medio ambiente, salud entre otras, a su vez pueden buscar una campaña por su titulo en una barra de busqueda, asi lograrian seleccionar aquellas que les interesen, nuestra plataforma tambien cuenta con un mapa donde se ven todas las campañas creadas en la aplicacion.
- **Realizar Donaciones**: Los donantes pueden hacer contribuciones a campañas específicas de manera segura a traves de Mercado Pago, que es el medio mas utilizado en Argentina, para esto implementamos su aplicacion mediante sdk de React.
- **Notificaciones de Progreso**: Los donantes recibirán notificaciones sobre el progreso de las campañas a las que han donado, manteniéndose informados sobre su impacto a su vez a los creadores de las campañas se los notificara de las donaciones recibidas.
- **Comentarios y Retroalimentación**: Los donantes pueden dejar comentarios y sugerencias en las campañas a las que han contribuido, ofreciendo su retroalimentación a los creadores.
- **Mapa Interactivo**: Los donantes pueden visualizar un mapa interactivo donde se muestran las ubicaciones de los proyectos financiados por las campañas.
- **Guardar Campañas Favoritas**: Los donantes pueden guardar campañas que les interesen para revisarlas y hacer donaciones más tarde.
- **Estadísticas de la Plataforma**: Los usuarios pueden visualizar estadísticas globales de la plataforma, como campañas completadas, en curso, sus donantes y avances estadísticos.
- **Panel de adiministracion**: Los usuarios administradores podran dar de baja alguna campaña que no sea adecuanda o no cumpla con la moralidad que desea plasmar la plataforma como asi tambien a usuarios.

## Tecnologías Utilizadas

- **Backend**: Laravel
- **Frontend**: React
- **Base de Datos**: MySQL
- **Autenticación**: Laravel Breeze o Socialite para registro y login mediante redes sociales como Gmail de Google
- **Notificaciones**: Laravel Notifications
- **Estilos**: Bootstrap 5 para el diseño y la responsividad, Material Ui mas que nada para los iconos y Tailwindcss.

## Roadmap de Funcionalidades

### Historias de Usuario (User Stories)

**HU1 - Registrar Usuario**: Como **Donante**, quiero registrarme con mi correo electrónico o redes sociales, para acceder a la plataforma y hacer donaciones.

   ![image](https://github.com/user-attachments/assets/0e73e147-ec69-4004-b29a-44a658d8572f)

**HU2 - Crear Campaña de Donación**: Como **Creador de Campañas**, quiero crear una nueva campaña con un título, descripción, objetivo de recaudación y fechas de inicio y fin, para poder atraer donantes.

   ![image](https://github.com/user-attachments/assets/54e38852-003b-4d75-b7d1-07ab9521d697)

**HU3 - Ver Inicio**: Como **Donante**, quiero explorar una lista de campañas activas, para encontrar una campaña que me interese y contribuir.

![image](https://github.com/user-attachments/assets/38c04f21-b2ec-45fd-8be5-818576abed7f)


**HU4 - Donar a Campaña**: Como **Donante**, quiero realizar una donación a una campaña de forma segura, para contribuir al objetivo de la campaña. 

![image](https://github.com/user-attachments/assets/ffc4334a-a93c-464b-b341-a53b5c1e1766)

**HU5 - Buscar Campaña**: Como **Donante**, quiero buscar campañas por palabras clave, para encontrar rápidamente campañas relacionadas con mis intereses. 

![image](https://github.com/user-attachments/assets/bfa629a5-03aa-42e2-b3af-ed63e3beac80)

**HU7 - Ver Detalles de Campaña Creada**: Como **Creador de Campañas**, quiero ver un resumen del progreso de mis campañas, para hacer seguimiento y ajustar cambios.

![image](https://github.com/user-attachments/assets/bc354e1f-6439-4e61-85e9-a89681066ee3)


**HU8 - Recibir Notificaciones**: Como **Donante**, quiero recibir notificaciones sobre el progreso de las campañas a las que he donado, para mantenerme informado sobre su impacto.

![image](https://github.com/user-attachments/assets/dabe61b2-ee5b-4e8e-aada-d2d6e71b792d)


**HU9 - Dejar Comentarios**: Como **Donante**, quiero dejar comentarios o sugerencias en las campañas a las que dono, para dar retroalimentación a los creadores. 

![image](https://github.com/user-attachments/assets/856638eb-3a8b-41ca-9fe4-8b404a2f2eb8)


 **HU10 - Ver Mapa Interactivo de Campañas**: Como **Donante**, quiero ver la ubicación de los proyectos financiados en un mapa interactivo, para conocer su impacto geográfico.

![image](https://github.com/user-attachments/assets/5ba64f4e-1016-4360-b230-38df3c0a41a4)

 
 **HU11 - Guardar Favoritos**: Como **Donante**, quiero guardar campañas que me interesen en una lista de favoritos, para poder revisarlas y donar más tarde.

![image](https://github.com/user-attachments/assets/dcf81fea-7c0f-4d8a-bde9-fbeabe4eab58)

 
**HU12 - Visualizar Información y Uso de Plataforma**: Como **Usuario**, quiero ver estadísticas globales de la plataforma, para ver campañas completadas, en curso, sus donantes y avances estadísticos.

![image](https://github.com/user-attachments/assets/235f53ae-8804-4866-b270-eff9539d087b)

**HU13 - Panel de Administrador**: Como **Administrador**, quiero poder deshabilitar campañas y usuarios que incumplan alguna regla de la plataforma.

![image](https://github.com/user-attachments/assets/e03cc7c0-7a09-4379-8be9-efcb2e092e0a)


## Cómo Ejecutar el Proyecto

### Instrucciones de Instalación

1. **Clona el repositorio**:

    ```bash
    git clone https://github.com/AbigailCo/Donaciones.git
    ```

2. **Instala las dependencias del backend (Laravel)**:

    ```bash
    cd Donaciones
   Componser Install
    ```

3. **Instala las dependencias del frontend (React)**:

    ```bash
    cd Donaciones
    npm install
    ```

4. **Ejecuta el servidor de desarrollo**:

    - En el backend (Laravel):

        ```bash
        php artisan serve
        ```

    - En el frontend (React):

        ```bash
        npm run dev
        ```

5. Accede a la plataforma en `http://localhost:8000`

## Contribuciones

Si deseas contribuir al proyecto, por favor abre un *pull request* o abre un *issue* para discutir posibles mejoras.

---

© 2024 DAR VUELVE. Todos los derechos reservados.
