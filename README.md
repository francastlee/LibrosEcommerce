#   LibrosEcommerce

Este proyecto es el backend de una plataforma e-commerce especializada en libros, desarrollado con Node.js, Express y PostgreSQL.

---

##   Estructura del proyecto

El backend está organizado en capas siguiendo buenas prácticas:

backend/
controllers/ # Controladores de las rutas
services/ # Lógica de negocio y validaciones
repositories/ # Consultas a la base de datos
routes/ # Rutas públicas y protegidas
middlewares/ # Autenticación y control de roles
config/ # Configuración de la base de datos y entorno

---

##   Tecnologías utilizadas

- **Node.js**
- **Express**
- **PostgreSQL**
- **JWT (JSON Web Tokens)**
- **Bcrypt**
- **Dotenv**

---

##   Instalación y ejecución

1. **Clona el repositorio y entra en la carpeta del backend:**
   cd backend

2. **Instala las dependencias:**
   npm install

3. **Crea el archivo .env en la raíz del backend:**
   Ruta: LibrosEcommerce/backend/.env
   Contenido:
    - PORT=8080
    - JWT_SECRET=clave-secreta-personal
    - DATABASE_URL=postgresql://user:password@localhost:5432/booksDB

4. Ejecuta el script SQL para crear las tablas:
   - **users**
   - **roles**
   - **user_role**
   - **JWT (JSON Web Tokens)**
   - **Bcrypt**
   - **Dotenv**

5. Inicia el servidor:
   npm run dev

## Endpoints principales

  **Autenticación**

POST	/api/auth/register	Registro de usuario
POST	/api/auth/login	Login

  **Libros**

GET	/api/books	Lista pública de libros
POST	/api/books	Crear libro (solo admin)
PUT	/api/books/:id	Editar libro (solo admin)
DELETE	/api/books/:id	Eliminar libro (solo admin)
   **Carrito**

POST	/api/cart	Agregar libro al carrito
GET	/api/cart	Ver contenido del carrito
GET	/api/cart/total	Ver total acumulado
DELETE	/api/cart/:bookId	Eliminar un libro del carrito
DELETE	/api/cart	Vaciar todo el carrito
PATCH	/api/cart/:bookId	Actualizar cantidad (operation: "increment" o "decrement")

**Importante: Todos los endpoints del carrito y libros protegidos requieren un token JWT válido.**