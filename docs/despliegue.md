# Despliegue: GitHub → Vercel → dominio en GoDaddy

El sitio es **estático** (HTML, CSS, JS y datos locales). No necesita build ni variables de entorno.
`vercel.json` solo añade encabezados de seguridad y caché.

## 1. Publicar en GitHub

```bash
cd "C:/Users/roca0/Documents/DATATON REAL/dataton-inegi-2026"
git status                      # el repositorio ya está inicializado con un primer commit
gh auth login                   # una sola vez, si no hay sesión
gh repo create dataton-inegi-2026 --public --source . --remote origin --push
# sin gh: crear el repositorio vacío en github.com y luego
# git remote add origin https://github.com/<usuario>/dataton-inegi-2026.git
# git push -u origin main
```

Usa `--private` si el equipo prefiere un repositorio privado (Vercel puede desplegarlo igual).

## 2. Importar en Vercel

1. vercel.com → **Add New… → Project** → importar el repositorio de GitHub.
2. Framework Preset: **Other**. Build Command: vacío. Output Directory: vacío (raíz). Install Command: vacío.
3. **Deploy**. Vercel entrega una URL `https://<proyecto>.vercel.app`.

## 3. Verificar el deployment

- Abrir la URL en escritorio y celular. Revisar: hero, mapas, Sección 3, simulación CoDi, Eje 3 (mapa de
  sucursales: debe mostrar 3,150 puntos agrupados), proyección y bibliografía.
- Consola del navegador sin errores. `https://<proyecto>.vercel.app/assets/data/sucursales-bienestar.js`
  debe responder 200.
- Después del despliegue, cambiar en `index.html` las metaetiquetas `og:image` y `twitter:image` a la URL
  absoluta (`https://<dominio>/assets/images/og-image.png`) y añadir
  `<link rel="canonical" href="https://<dominio>/">`. Algunas redes sociales no aceptan rutas relativas.

## 4. Dominio personalizado

1. En Vercel: **Project → Settings → Domains → Add** → escribir el dominio (por ejemplo `ejemplo.mx`) y
   también `www.ejemplo.mx`. Elegir cuál redirige al otro.
2. Vercel muestra los registros DNS exactos que necesita. **Usar los que muestre Vercel en ese momento**;
   normalmente son:
   - dominio raíz (`@`): un registro **A** hacia la IP que indique Vercel;
   - `www`: un registro **CNAME** hacia el destino que indique Vercel.

## 5. Configurar GoDaddy

1. GoDaddy → **Mis productos → Dominio → DNS → Administrar DNS**.
2. Editar/crear el registro **A** con nombre `@` y el valor que dio Vercel. Eliminar otros registros A de `@`
   que apunten a «Parked» o a otro hosting.
3. Editar/crear el registro **CNAME** con nombre `www` y el valor que dio Vercel.
4. Guardar. La propagación suele tardar de minutos a pocas horas.
5. Alternativa: cambiar los nameservers de GoDaddy a los de Vercel (Vercel administra todo el DNS). Hacerlo
   solo si no hay correo u otros servicios dependiendo del DNS actual de GoDaddy.

## 6. Verificar raíz, www y HTTPS

- En Vercel, ambos dominios deben quedar con estado **Valid Configuration**.
- Vercel emite el certificado TLS automáticamente; comprobar `https://ejemplo.mx` y `https://www.ejemplo.mx`
  y que uno redirige al otro.

## 7. Actualizaciones automáticas

Cada `git push` a la rama `main` genera un despliegue de producción; cada rama o pull request genera una
vista previa con su propia URL.

```bash
git add -A
git commit -m "Describe el cambio"
git push
```

## Nada de esto se ha ejecutado aún

La sesión que preparó el proyecto no tenía autorización para crear repositorios ni cambiar cuentas
externas. Los pasos 1–6 los debe ejecutar el equipo con sus credenciales.
