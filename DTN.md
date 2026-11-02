# CLAUDE.md — memoria técnica del proyecto

> Leer completo antes de modificar nada. Después revisar `git log` y `git status`.
> Mantener este archivo al día cuando haya cambios importantes. Sin credenciales ni datos privados.
> Es documentación interna: nada de aquí debe copiarse tal cual al texto público del sitio.

## 1. Qué es

Sitio web de *data storytelling* de la investigación **«Estrategia de digitalización del comercio
electrónico en México»** (UNAM, Facultad de Economía) para el **Datatón INEGI 2026**.
No es un dashboard: es una experiencia editorial interactiva, científicamente rigurosa, lista para Vercel.

- Equipo: López Trujillo Andrea, Santos Peralta Ady Arelí, Torres Aparicio Oscar Miguel, Vargas Avendaño Ulises.
- Tutor: Ávalos Domínguez Irving Javier.
- **Lema oficial del sitio (decisión del equipo, 2026-11-01):**
  **«Quien conoce confía, y quien confía, compra. Usa CoDi.»**
  El título de la sección 9 del PDF final dice «… paga. Usa CoDi.»; el equipo pidió expresamente usar
  «compra» en toda la web. No volver a «paga» sin instrucción del equipo.
  Aparece en: `<title>`, metadatos OG/Twitter, hero (`.hero-motto`), título de la propuesta (`#h9t`),
  cierre (`.closing-motto`), pie de página e imagen OG. El cuerpo del documento usa variantes
  («…, gana», «Quien conoce, confía; y quien confía, paga»); **no usarlas como lema**.

## 2. Rutas importantes

| Ruta | Qué es |
|---|---|
| `C:\Users\roca0\Documents\DATATON REAL\` | Carpeta de trabajo (microdatos, scripts R/Stata, PDFs). **No es el repo.** |
| `…\DATATON REAL\Estrategia CoDi_final.pdf` | **Investigación definitiva y autoritativa** («Estrategia CoDi Final», 48 pp.) |
| `…\DATATON REAL\dataton-inegi-2026\` | **Este repositorio / carpeta de producción** |
| `…\DATATON REAL\dashboard-dataton-final.html` + `assets\` | Versión previa (fuente original de este repo; no editar) |
| `…\DATATON REAL\_respaldo\2026-11-01_antes-de-produccion\` | Respaldo exacto antes de esta sesión |
| `…\DATATON REAL\Mapa bancos\sucursalesbabien_1ertrim2026.csv` | Directorio de sucursales del Banco del Bienestar (fuente del mapa) |
| Zip `Datatón INEGI - UNAM-…zip` | Contiene `BD_VABCOEL.xlsx` (serie exacta para la proyección), `perfilesENDUTIH.xlsx`, etc. |

«Digitalízate con CoDi.html» (referencia histórica mencionada por el equipo) **no se encontró** en la
carpeta durante la sesión del 2026-11-01.

## 3. Arquitectura

Sitio estático, sin build, rutas relativas. Entrada: `index.html`.

- `assets/css/styles.css` — sistema visual base (tokens en `:root`). `stories.css` — escenas de scroll.
  `extra.css` — todo lo añadido en la versión final (proyección, conclusión, bibliografía, sucursales,
  CoDi por entidad, simulación, correcciones responsive).
- `assets/js/app.js` — gráficas ECharts y controles de las secciones 1–9, CoDi por entidad, proyección,
  bibliografía, mapa de sucursales (Leaflet). `stories.js` — 11 escenas SVG + GSAP ligadas al scroll y el
  gráfico de coeficientes del logit. `present.js` — modo «Presentar» (7 paradas).
- `assets/data/datos.js` — **todas** las cifras (`window.DATA`). `mx-geo.js` — GeoJSON de entidades
  (Natural Earth). `sucursales-bienestar.js` — 3,150 sucursales (generado desde el CSV).
- `assets/vendor/` — `echarts.min.js` (build reducido 5.6.0: bar, line, scatter, map), GSAP 3.12.5,
  ScrollTrigger, `leaflet/` (1.9.4 + markercluster 1.5.3 + imágenes).

### Patrones que hay que respetar

- **ECharts se carga en diferido** (`ensureEC()` en `app.js`). Toda gráfica se crea con `chart(id)` y se
  dibuja dentro de `onVisible(el, fn)`, que espera a que ECharts esté listo. Si se dibuja desde un clic
  fuera de `onVisible`, envolver con `ensureEC().then(...)`. `chart()` devuelve un sustituto que guarda
  los `.on(...)` hasta que existe la instancia real.
- Al **cambiar de pestaña/dimensión** usar `setOption(opt, true)` (notMerge) para que no queden series,
  `visualMap`, ejes ni etiquetas de la vista anterior. Cambiar la altura del contenedor **antes** de
  `setOption` y llamar `resize()`; hay `ResizeObserver` por gráfica.
- Las escenas de `stories.js` se montan de forma diferida (IntersectionObserver, margen 120%).
- El mapa de sucursales se carga solo al abrir el Eje 3 (o el enlace `#sucursales` / `data-open-axis="2"`).
- Al insertar código con scripts de Node: **`String.replace` interpreta `$$` y `$'` en el reemplazo**.
  Usar `split(a).join(b)` (ya causó un bug: `$$('#bbRank button')` quedó como `$(...)`).
- En Bash de esta máquina los heredocs con comillas mezcladas fallan; escribir scripts con la herramienta
  Write y ejecutarlos con `node archivo.js`.

## 4. Estructura del sitio

Hero → 1 Diagnóstico → 2 Territorio → 3 ¿Quiénes compran? → 4 ¿Qué compran? → 5 Barreras →
6 Barreras según grupos → 7 CoDi (incluye simulación de pago) → 8 Modelo logit → 9 Propuesta (tres ejes,
**mapa de sucursales** en el Eje 3, arquitectura de 6 agentes, piloto Nuevo León + **mapa CoDi por
entidad**, fases y criterios) → **P Proyección** (`#proyeccion`) → **C Conclusión** (`#conclusion`) →
Cierre visual (`.closing`) → **F Bibliografía** (`#fuentes`) → pie.

## 5. Reglas de rigor (obligatorias)

1. No inventar cifras, coordenadas ni proyecciones. Toda cifra nueva: documento final o archivo de trabajo
   verificado, y registrarla en `docs/fuentes.md`.
2. No mezclar versiones: solo «Estrategia CoDi Final». `docs/registro-fuentes-version-previa.md` es histórico.
3. El texto público **no menciona PDF, páginas, «el documento» ni números de gráfica/cuadro**. Sí cita
   fuentes estadísticas (INEGI, Banxico, CNBV, autores). Verificar con:
   `grep -n "Gráfica [0-9]\|documento\|Cuadro\|pp\. [0-9]" index.html assets/js/*.js`
   (solo debe aparecer el comentario interno de `stories.js`).
4. Logit: asociación, no causalidad; no calcular probabilidades individuales (no hay coeficientes ni
   intercepto); no dibujar curva ROC.
5. Proyección: escenarios condicionados, no pronósticos; rotular «e» (estimado) y 2024 «P» (preliminar).
6. Ilustraciones (escenas, maquetas, QR, pines del storytelling) se declaran como ilustrativas. La
   simulación CoDi **nunca** cobra ni se conecta a un banco; comercio y banco son ficticios. No usar
   marcas comerciales reales en maquetas.

## 6. Datos clave verificados contra el documento final

- VABCOEL: 3.02% → 7.07% del PIB (2013–2024); 2020: VABCOEL +23.3%, PIB −8.4%.
- Compradores: 5.96 M (2015) → 39.15 M (2025). Penetración: Chiapas 7.2% … Colima 31.1%.
- Logit (Cuadro 8.1): n = 57,677; AUC 0.865 (sin ponderar); pseudo R² 0.183 (ponderado); F = 143.9;
  uso medio 1.85%; EM: desconfianza −1.28** (IC −2.29 a −0.27), habilidades +0.34***, smartphone +3.09**
  (IC 0.6 a 5.6), banca móvil +2.12***, edad −0.013**. **Igual que la versión previa.**
- CoDi Banxico: 20.6 M cuentas validadas; 2.7 M pagadores nuevos; ≈1 M cobradores (may-2020 a sep-2026).
- Meta de la propuesta: «más de 20.5 millones de cuentas validadas» (así lo dice la sección 9).
- **Proyección** (VABCOEL al por menor, millones de pesos de 2018): 2024P 535,538 → 2030: bajo 667,558
  (+24.7%), base 736,430 (+37.5%), alto 805,302 (+50.4%). Holt α=0.8 β=0.2 con inicio por regresión
  sobre 2013–2018; lineal MCO 2020–2024; base = promedio. Recalculado: coincide exactamente.
- CoDi por entidad (pagan por internet, 2025): nacional 6.1%; NL 8.6% (4.º); Zacatecas 12.6%; Chihuahua 3.6%.

## 7. Mapa del Banco del Bienestar (Eje 3, `#sucursales`)

- Datos: `sucursalesbabien_1ertrim2026.csv` → `assets/data/sucursales-bienestar.js` (campos en `meta`).
- **Verificado contra `Mapa bancos/Mapa_Bancos_Limpio.html`** (widget Leaflet de R): su capa «Banco del
  Bienestar» tiene 3,150 puntos y **coinciden uno a uno** con el JSON (0 solo en HTML, 0 solo en web);
  `mapabanco.R` generó ese HTML del mismo CSV. El HTML solo trae lat/lon en sus popups; el JSON añade
  nombre, domicilio, localidad y municipio. No se usa iframe. Las otras capas del HTML (BBVA 1,686,
  Banorte 1,163, Santander 1,194, Banamex 1,221, HSBC 913; DENUE) no se integraron.
- Duplicados: 0 exactos; 3 pares comparten domicilio idéntico (campo 9 `domicilioCompartido`, se avisa en
  el popup como «posible registro duplicado»); 3 pares con el mismo nombre tienen domicilios distintos.
  Los KPI dicen «registros del directorio», no «sucursales verificadas».
  3,150 registros, 0 sin coordenadas, 0 fuera de México, 0 duplicados, 32 entidades, 1,985 municipios.
- 17 coordenadas con ≤3 decimales → «ubicación aproximada» (marcador punteado). No se movió ninguna.
- El documento cita 3,149 sucursales (CNBV, 2026); la diferencia se explica en el pie del mapa.
- Leaflet + MarkerCluster, filtro por entidad, lista por entidad (clic = filtrar), popups con domicilio,
  municipio, localidad, horario y precisión. En pantallas táctiles el arrastre está desactivado hasta
  pulsar «Mover mapa» (esquina inferior izquierda, para no bloquear el scroll ni tapar popups); el zoom
  con pellizco funciona siempre. Popups con `autoPanPaddingTopLeft` para no quedar bajo los controles.
  Los estilos de Leaflet llevan prefijo `.bb-map` porque `leaflet.css` se carga después.
- Mapa base: **Esri World Dark Gray** (sin llave) + capa de etiquetas; alternativa OpenStreetMap;
  respaldo vectorial con las entidades. **CARTO ya exige API key** (aparece «API KEY REQUIRED»): no usarlo.
- Para regenerar el JSON: ver script en `docs/fuentes.md` (sección del mapa) o reescribir con csv-parse.

## 8. Identidad visual

Azul marino `#071629`, azul profundo `#102D4F`, dorado `#D6AC55`, azul cielo `#62C8F5`, papel `#F6F8FC`.
Dorado sobre papel para texto: `#7E5A14` (contraste AA). Tipografías: Montserrat (títulos) y Source Sans 3
(texto), locales en `assets/fonts`. Sin fotos de stock; ilustraciones SVG propias.

## 9. Responsive

Probado en 320×568, 360×800, 375×812, 390×844, 430×932, 768×1024, 820×1180, 834×1194, 1024×768,
1180×820, 1366×768, 1440×900, 1920×1080. Puntos de quiebre: 1100, 900 (menú móvil «Secciones»), 768, 600,
400 px. Reglas: sin scroll horizontal (`overflow-x: clip` en `body`), etiquetas de ejes con `width` +
`overflow: 'break'` en móvil, gráficas densas en móvil muestran solo el valor seleccionado, la lista de
filtros de la bibliografía se desliza en horizontal en < 600 px.

## 10. Problemas corregidos (sesión 2026-11-01)

- Referencias públicas al PDF («Gráfica X.X», «el documento», páginas) → textos autónomos con fuente.
- Sección 3: etiquetas encimadas en «Edad»/«Estrato» en celular; «No disponible» desbordado; línea de
  promedio sin rótulo; definiciones movidas a un desplegable.
- Sección 6: tarjetas regionales con bordes duplicados (`.region-strip div` afectaba a los hijos); mapa
  con huecos en celular.
- Logit en celular: etiqueta «asociación negativa» cortada; IC encimado con el texto.
- Barra superior a 320 px: «Secciones» cortado.
- Mapa base CARTO sin llave → Esri. Clúster con número descentrado (especificidad de `.leaflet-marker-icon`).
- Rendimiento: LCP retrasado por animar la opacidad del `<h1>`; ECharts (1 MB) bloqueando → build
  reducido (616 KB) y carga diferida; escenas montadas al acercarse.
- Accesibilidad: contraste del dorado sobre papel, `aria-label` en `<span>`, nombres accesibles del logit.

## 11. Estado de pruebas (2026-11-01, Chrome 156 + Playwright local)

- Prueba funcional (`func.mjs`): **138/138** en 375, 820 (iPad vertical), 1180 (iPad horizontal) y
  1440 px; tras los últimos ajustes, 104/104 en 375, 820 y 1440. Prueba táctil del mapa (375 y 820):
  arrastre bloqueado hasta «Mover mapa», filtro Oaxaca = 287 registros, popup de posible duplicado.
- Auditoría de 13 tamaños: 0 errores de consola, 0 scroll horizontal en todos.
- Antes (sesión inicial): **69/69** — mapa S2 y año, 5 dimensiones de S3 con
  conteo de categorías, S4, S5, 7 vistas de S6 (sin `visualMap` residual), simulación (QR y notificación),
  logit, ejes, recorrido ANTAD, mapa de sucursales (clústeres, filtro NL = 55 sucursales/38 municipios,
  popup), arquitectura, fases, CoDi por entidad, proyección (2027 base = 614,303), bibliografía
  (búsqueda, sin acentos, categorías), menú móvil, modo presentación (7 paradas), consola sin errores.
- Lighthouse 12 (servidor local con gzip): móvil Rendimiento 84–85, Accesibilidad 99, Buenas prácticas 100,
  SEO 100 (LCP 2.6 s, CLS 0, TBT ≈ 450 ms); escritorio Rendimiento 99, Accesibilidad 96, Buenas
  prácticas 100, SEO 100 (LCP 0.8 s). Tras esa medición se subió la opacidad de las tarjetas de escena
  inactivas (.35 → .6) y se quitó el `aria-label` del logo (los dos avisos de contraste/nombre restantes).
- No se probó en dispositivos físicos ni en Safari/iOS real.

## 12. Pendientes

- Publicar: crear repo en GitHub, importar en Vercel, conectar dominio GoDaddy (`docs/despliegue.md`).
- Tras tener dominio: `og:image`/`twitter:image` absolutos y `<link rel="canonical">`.
- Confirmar la URL pública del directorio de sucursales del Banco del Bienestar y la URL de la referencia
  CF884 (el documento apunta a `idCuadro=CF882`).
- Lighthouse a11y: queda un aviso menor de `heading-order` (un `h4` tras `h2`).
- TBT móvil ≈ 450 ms: siguiente mejora posible = pausar el canvas del hero fuera de pantalla en móvil
  y simplificar el arranque de `stories.js`.
- Probar en iPhone/Safari y Android reales.

## 13. Cómo probar localmente

```bash
npx serve .            # o: python -m http.server 8000
```
Los scripts de prueba de la sesión (Playwright con el Chrome instalado, Lighthouse) vivían en el
scratchpad temporal; recrearlos si hacen falta (ver sección 11 para qué cubrían).

## 14. Corrección del mapa que «no cargaba» (2026-11-01)

- Causa 1: los datos se leían con `fetch()` de un JSON; al abrir `index.html` con doble clic (`file://`)
  Chrome lo bloquea y aparecía «No fue posible cargar el mapa». Ahora son `assets/data/sucursales-bienestar.js`
  (`window.BB_DATA`), cargado como script: funciona en `file://`, servidor local y Vercel. **No volver a `fetch`.**
- Causa 2: las secciones 2, 3, 5, 6 y 9 crecen 77–749 px al generar texto y gráficas cuando se hacen
  visibles; los saltos suaves (menú, enlace «Explora el mapa…», portada) terminaban hasta 10,000 px antes
  del destino (el enlace al mapa caía en la Sección 8). `goTo()` en `app.js` intercepta todos los enlaces
  `#` y reajusta hasta que el destino queda a 64 px del borde superior; se cancela si el usuario desplaza.
- Prueba `navtest.mjs` (http y file://, 375/820/1440 + URL `#sucursales`): 25/25. Regresión: 104/104.
- Limitación conocida: en `file://` Chrome bloquea las tipografías locales (se ven fuentes del sistema).
  Para ver el diseño exacto usar un servidor (`npx serve .`) o la URL de Vercel.
