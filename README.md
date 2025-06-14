# LibrosEcommerce

Plataforma e-commerce especializada en libros, desarrollada como prueba técnica Full Stack para ZETA STEAM.

---

## Tecnologías utilizadas

### Backend

- **Node.js**
- **Express**
- **PostgreSQL**
- **JWT (JSON Web Tokens)**
- **Bcrypt**
- **Dotenv**

### Frontend

- **Next.js**
- **React**
- **Tailwind CSS**
- **Context API**
- **GSAP**
- **Lucide React Icons**

---

## Estructura del proyecto

```
LibrosEcommerce/
├── backend/
│   ├── controllers/
│   ├── services/
│   ├── repositories/
│   ├── routes/
│   ├── middlewares/
│   └── config/
└── frontend/
    ├── app/
    ├── components/
    ├── context/
    ├── hooks/
    └── styles/
```

---

##  Instalación

### 1. Backend

```bash
cd backend
npm install
```

#### .env (crear en /backend)

```
PORT=8080
JWT_SECRET=clave-secreta
DATABASE_URL=postgresql://usuario:contraseña@localhost:5432/booksDB
```

#### Crear tablas necesarias en PostgreSQL:

- `users`
- `roles`
- `user_role`
- `books`
- `cart_items`

#### Iniciar servidor backend

```bash
npm run dev
```

---

### 2. Frontend

```bash
cd frontend
npm install
npm run dev
```

> Asegúrate de que el backend esté corriendo en `http://localhost:8080`

---

##  Autenticación y Roles

- Registro e inicio de sesión con JWT
- Middleware para proteger rutas
- Control de roles (`admin` y `usuario`)
- Context API en el frontend para mantener sesión

---

## Funcionalidades

### Usuario

- Ver lista de libros
- Filtrar por nombre y precio
- Añadir libros al carrito (con cantidad)
- Editar o eliminar libros del carrito
- Vaciar carrito completo
- Ver total acumulado

### Admin

- CRUD de libros
- Tabla con libros + paginación
- Panel privado `/admin`
- Solo accesible con rol `admin`

---

##  Endpoints principales (Backend)

###  Autenticación

| Método | Endpoint            | Descripción           |
|--------|---------------------|-----------------------|
| POST   | `/api/auth/register`| Registro de usuario   |
| POST   | `/api/auth/login`   | Login de usuario      |

###  Libros

| Método | Endpoint            | Descripción                           |
|--------|---------------------|---------------------------------------|
| GET    | `/api/books`        | Listado de libros (público)           |
| GET    | `/api/books/:id`    | Obtener un libro de libros (público)  |
| POST   | `/api/books`        | Crear libro (solo admin)              |
| PUT    | `/api/books/:id`    | Editar libro (solo admin)             |
| DELETE | `/api/books/:id`    | Eliminar libro (solo admin)           |

###  Carrito

| Método | Endpoint               | Descripción                          |
|--------|------------------------|--------------------------------------|
| GET    | `/api/cart`            | Ver carrito del usuario              |
| POST   | `/api/cart`            | Añadir libro al carrito              |
| PATCH  | `/api/cart/:bookId`    | Cambiar cantidad de un libro         |
| DELETE | `/api/cart/:bookId`    | Eliminar un libro del carrito        |
| DELETE | `/api/cart`            | Vaciar todo el carrito               |
| GET    | `/api/cart/total`      | Ver total acumulado del carrito      |

> Todos los endpoints protegidos requieren un token JWT válido.

---

## Rutas principales (Frontend)

| Ruta             | Descripción                         |
|------------------|-------------------------------------|
| `/books`         | Ver libros disponibles              |
| `/cart`          | Ver y gestionar el carrito          |
| `/admin`         | Panel de administración (admin)     |
| `/auth/login`    | Iniciar sesión                      |
| `/auth/register` | Registro                            |

---

##  Usuario demo (ejemplo)

Puedes registrar un usuario desde `/auth/register` o bien en el backup de la base de datos en el proyecto inserté dos usuario que pueden utilizar, un administrador y un usuario:

- Administrador
  - Email: zeta.admin@gmail.com
  - Password: Zeta1029
- Usuario
  - Email: zeta@gmail.com
  - Password: Zeta1029

---

##  Scripts útiles

### Backend

```bash
npm run dev         # Iniciar servidor
```

### Frontend

```bash
npm run dev         # Iniciar app Next.js
```

---

## Evidencias

- Vista de inicio de sesión

![image](https://github.com/user-attachments/assets/d6e5f7ce-dc5e-4db8-b946-1d9f8170b6d1)

- Vista de registro

![image](https://github.com/user-attachments/assets/63d6690b-49a5-4d63-a143-d80e43ede5db)

- Vista de libros

- Vista del carrito de compras

![image](https://github.com/user-attachments/assets/ec9d815f-b8c8-4a1e-b022-3562263873e4)

![image](https://github.com/user-attachments/assets/8114b678-00a8-4179-91d7-c77e137d88d6)

- Vista del administrador

![image](https://github.com/user-attachments/assets/52f9f46e-27ed-4743-ad0c-2e683382b7fe)

![image](https://github.com/user-attachments/assets/6e111432-870c-4235-969b-e33631edf931)

![image](https://github.com/user-attachments/assets/88b9cf6e-550b-4cfb-a030-dc9b41e6a7bb)

