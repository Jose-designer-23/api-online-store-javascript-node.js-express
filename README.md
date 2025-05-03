# api-online-store-javascript-node.js-express
## Descripción
Backend (API) para una tienda online desarrollado con JavaScript, utilizando los frameworks Node.js y Express. Proporciona endpoints RESTful para la gestión de productos, usuarios y pedidos actualmente.

## Prerrequisitos
* [Última versión estable de Node.js](https://nodejs.org/)
* npm (viene instalado con Node.js) o yarn
* Cuenta de [MongoDB Atlas](https://www.mongodb.com/atlas/database) (para la base de datos en la nube)

## Configuración de la Base de Datos (MongoDB Atlas)

Para conectar la API a tu base de datos en la nube MongoDB Atlas, sigue estos pasos:

1.  **Crea una cuenta en MongoDB Atlas:**
    * Ve a [https://www.mongodb.com/atlas/database](https://www.mongodb.com/atlas/database) y regístrate o inicia sesión si ya tienes una cuenta.

2.  **Crea un nuevo clúster:**
    * Una vez dentro de tu panel de control de Atlas, haz clic en el botón "Create" o "New Cluster".
    * Sigue los pasos para configurar tu clúster. Puedes elegir el proveedor de la nube, la región y el nivel del clúster (para pruebas, el nivel gratuito "M0 Sandbox" suele ser suficiente).

3.  **Crea un usuario de base de datos:**
    * En el menú de la izquierda, selecciona "Database Access".
    * Haz clic en "Add New Database User".
    * Elige un nombre de usuario y una contraseña seguros. Selecciona los roles necesarios (para empezar, "Read and write to any database" podría ser suficiente, pero para producción considera roles más específicos). Anota estas credenciales, las necesitarás para la URI de conexión.

4.  **Configura el acceso a la red (IP Whitelisting):**
    * En el menú de la izquierda, selecciona "Network Access".
    * Haz clic en "Add IP Address".
    * Para desarrollo local, puedes añadir tu dirección IP actual o permitir el acceso desde cualquier dirección (0.0.0.0/0), **pero ten mucho cuidado con esta última opción en entornos de producción por motivos de seguridad.** Es mejor limitar el acceso a las IPs de tus servidores.

5.  **Obtén la URI de conexión:**
    * En la sección "Overview" de tu clúster, haz clic en el botón "Connect".
    * Selecciona "Connect your application".
    * Elige el driver "Node.js" y la versión.
    * Copia la URI de conexión que se te proporciona. **Reemplaza `<username>` con el nombre de usuario que creaste en el paso 3 y `<password>` con su contraseña.** También asegúrate de que el nombre de la base de datos al final de la URI sea el que quieres usar para tu API. Ejemplo:
        ```
        mongodb+srv://<tu_usuario>:<tu_contraseña>@<tu-cluster>.mongodb.net/<nombre_de_tu_basededatos>?retryWrites=true&w=majority
        ```

6.  **Configura la variable de entorno en `.env`:**
    * Cuando crees la estructura del proyecto que te diré más adelante, crea un archivo `.env` en la raíz de tu proyecto (si no lo has hecho ya).
    * Define el puerto que vas a utilizar, la variable de entorno `MONGODB_URI` con la URI de conexión que obtuviste y tu nombre de la base de datos con MONGODBNAME. Debes tener esta configuración, si no, la api no funcionará.
        ```
       PORT: El puerto que utilices.
        ```
        ```
        MONGODB_URI=mongodb+srv://<tu_usuario>:<tu_contraseña>@<tu-cluster>.mongodb.net/<nombre_de_tu_basededatos>?retryWrites=true&w=majority
        ```
      ```
        MONGODBNAME=Nombre de la base de datos
      ```
      
        **Recuerda no subir nunca tu archivo `.env` a tu repositorio de GitHub por motivos de seguridad.** Añade `.env` a tu archivo `.gitignore`.

¡Ahora tu API debería poder conectarse a tu base de datos en MongoDB Atlas!

## Instalación de Dependencias

Ejecuta el siguiente comando en la raíz del proyecto para instalar las dependencias:

```bash
npm install
# o
yarn install
```
## Ejecución de la API

Utiliza el siguiente comando para iniciar el servidor de la API:

```bash
npm start
# o
yarn start
# o si usas nodemon para desarrollo
npm run dev
yarn dev
```

El servidor se ejecutará en `http://localhost:3000` (este puerto puede variar según tu configuración).

## Estructura del Proyecto y Funcionalidades de los Módulos
La estructura de la API backend es la siguiente:
```
Proyecto
├── node_modules/
├── src/
│   ├── Common/
│   │   └── response.js        # Funciones o clases para manejar las respuestas de la API (ej., formatos de éxito y error)
│   ├── Config/
│   │   └── index.js           # Archivos de configuración de la aplicación.
│   ├── Database/
│   │   └── index.js           # Configuración y conexión a la base de datos (MongoDB Atlas en este caso)
│   ├── Index/
│   │   └── index.js           # Punto de entrada del menu de inicio y de erro al no encontrar la ruta.
│   ├── Products/
│   │   ├── controller.js      # Lógica para manejar las peticiones relacionadas con los productos.
│   │   ├── index.js           # Punto de entrada para el módulo de productos.
│   │   ├── services.js        # Lógica de negocio específica para los productos.
│   │   └── utils.js           # Funciones de utilidad específicas para el módulo de productos.
│   ├── Sales/
│   │   ├── controller.js      # Lógica para manejar las peticiones relacionadas con las ventas/pedidos.
│   │   ├── index.js           # Punto de entrada para el módulo de ventas.
│   │   └── services.js        # Lógica de negocio específica para las ventas/pedidos.
│   └── Users/
│       ├── controller.js      # Lógica para manejar las peticiones relacionadas con los usuarios.
│       ├── index.js           # Punto de entrada para el módulo de usuarios.
│       └── services.js        # Lógica de negocio específica para los usuarios.
├── .env                       # Archivo para las variables de entorno (URI de MongoDB, secretos, etc.) - **No subir a Git**
├── .gitignore                 # Especifica los archivos y carpetas que Git debe ignorar.
├── index.js                   # Punto de entrada principal de la aplicación (donde se inicia el servidor Express)
├── package-lock.json          # Registra las versiones exactas de las dependencias instaladas.
├── package.json               # Archivo de configuración del proyecto (nombre, dependencias, scripts).
└── testConnection.js          # Archivo para probar la conexión a la base de datos (puede ser para desarrollo).

```
* **Módulo de Usuarios:**
    * Creación de usuarios
    * Listado de los usuarios existentes
    * Obtención de detalles de un usuario específico
    * Actualización de datos de los usuarios
    * Eliminiación de usuarios
* **Módulo de Productos:**
    * Creación de nuevos productos
    * Listado de productos existentes
    * Obtención de detalles de un producto específico
    * Actualización de información de productos
    * Eliminación de productos
* **Módulo de Ventas (Pedidos):**
    * Creación de nuevos pedidos
    * Listado de total de los pedidos realizados
    * Obtención de detalles de un pedido específico
    * Actualización del estado de un pedido
    * Eliminación de un pedido
      
## Endpoints de la API (Ejemplos)
### Endpoints de Usuarios
* `GET /api/users`: Listado de usuarios existentes.
* `GET /api/users/:id`: Obtención de detalles de un usuario específico
* `POST /api/users`: Creación de un usuario.
* `PUT /api/users/:id`: Actualización de los datos del usuario.
* `DELETE /api/users/:id`: Eliminación de usuarios.

### Endpoints de Productos
* `GET /api/products`: Listado de los productos existentes.
* `GET /api/users/:id`: Obtención de detalles de un producto específico
* `POST /api/users`: Creación de un producto.
* `PUT /api/users/:id`: Actualización de los datos de un producto.
* `DELETE /api/users/:id`: Eliminación de productos.

### Endpoints de Ventas (Pedidos)
* `GET /api/sales`: Listado de las ventas existentes.
* `GET /api/users/:id`: Obtención de detalles de una venta específica
* `POST /api/users`: Creación de una venta.
* `PUT /api/users/:id`: Actualización de los datos de una venta.
* `DELETE /api/users/:id`: Eliminación de una venta.
  
## Tecnologías Utilizadas
* JavaScript
* Node.js
* Express
* MongoDB
## Licencia
Este proyecto está licenciado bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.
## Autor (Opcional)
José Ángel Martín González - [@Jose-designer-23](https://github.com/Jose-designer-23)




