# FileInspector · Frontend

Interfaz web para analizar la seguridad de archivos. Se conecta a la API de FileInspector (FastAPI) y ofrece cinco herramientas, más un panel de métricas de acceso restringido.

## Herramientas

| Herramienta | Endpoint |
|---|---|
| Extractor de metadatos EXIF | `POST /api/v1/exif` |
| Limpiador de metadatos | `POST /api/v1/clean` |
| Verificador de tipo MIME | `POST /api/v1/mime` |
| Calculadora de hash (MD5, SHA-1, SHA-256, SHA-512) | `POST /api/v1/hash` |
| Comparador binario | `POST /api/v1/compare` |

El panel de métricas usa `POST /api/v1/auth/login` y `GET /api/v1/stats/*`. No está enlazado desde el sitio público y requiere una cuenta creada en el backend.

## Stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · HeroUI · Axios

## Puesta en marcha

Requiere Node.js 20 o superior.

```bash
npm install
cp .env.local.example .env.local
npm run dev
```

La app queda en http://localhost:3000.

### Variables de entorno

| Variable | Descripción | Valor por defecto |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | Ruta base que usa el navegador para llamar a la API. | `/api/v1` |
| `BACKEND_URL` | URL del backend a la que Next reenvía las peticiones (proxy). | `http://localhost:8000` |

El backend no habilita CORS, por eso el navegador llama a `/api/v1` y Next reenvía la petición a `BACKEND_URL`.

### Scripts

- `npm run dev`: servidor de desarrollo.
- `npm run build` y `npm start`: compilación y ejecución en producción.
- `npm run lint`: revisión con ESLint.

## Estructura

```
src/
├─ app/         rutas (sitio público y panel)
├─ components/  componentes por herramienta y compartidos
├─ hooks/       estado y flujo de cada herramienta
├─ services/    conexión con el backend
├─ lib/         utilidades y módulo de seguridad (lib/security)
└─ types/       tipos de datos
```

## Seguridad en el cliente

- Cabeceras HTTP de seguridad y Content Security Policy.
- Validación de archivos por firma real (magic bytes), tamaño y nombre antes de subirlos.
- Limitador de solicitudes en el navegador y control de peticiones duplicadas.
- Validación de la URL de la API (HTTPS fuera de localhost) y sanitización de nombres de archivo y mensajes de error.
- Verificación de que la imagen limpia devuelta por el servidor conserve el formato del original.

## Licencias

Este proyecto no incluye un archivo de licencia propio.

Licencias de las dependencias principales:

| Paquete | Licencia |
|---|---|
| Next.js, React, React DOM, Axios, react-dropzone, Tailwind CSS, Framer Motion, clsx, tailwind-merge, ESLint | MIT |
| HeroUI, TypeScript | Apache-2.0 |
| lucide-react | ISC |

Las fuentes Inter, Plus Jakarta Sans y Geist Mono se cargan con `next/font/google` y se distribuyen bajo la SIL Open Font License 1.1.

La imagen del login (`public/images/login-hero.jpg`) proviene de [Unsplash](https://unsplash.com) y se usa bajo la [Unsplash License](https://unsplash.com/license).
