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

«Digitalízate con CoDi.html» (referencia histórica del equipo) está en la carpeta de trabajo desde la
noche del 2026-11-01; su componente logit se integró en la Sección 8 (ver sección 16).
Escudos originales: `…\DATATON REAL\logo unam.png` y `logo facultad de economia.png` (ver sección 16).

## 3. Arquitectura

Sitio estático, sin build, rutas relativas. Entrada: `index.html`.

- `assets/css/styles.css` — sistema visual base (tokens en `:root`). `stories.css` — escenas de scroll.
  `extra.css` — todo lo añadido en la versión final (proyección, conclusión, bibliografía, sucursales,
  CoDi por entidad, simulación, correcciones responsive). `llab.css` — laboratorio del modelo logit y
  escudos institucionales.
- `assets/js/app.js` — gráficas ECharts y controles de las secciones 1–9, CoDi por entidad, proyección,
  bibliografía, mapa de sucursales (Leaflet). `stories.js` — 11 escenas SVG + GSAP ligadas al scroll y el
  laboratorio «Construye el modelo» del logit (`logitLab()`, expone `window.LLAB`). `present.js` — modo «Presentar» (7 paradas).
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
   intercepto); no dibujar curva ROC; **no sumar efectos entre variables** ni re-estimar al seleccionar
   variables en el laboratorio (solo muestra/oculta los efectos del modelo completo).
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

## 15. Rediseño visual de los tres ejes (2026-11-01, noche)

**Archivos nuevos:** `assets/js/ejes.js` (experiencias de los ejes y puente) y `assets/css/ejes.css`.
**Modificados:** `index.html` (Sección 8: bloque `#bridgeMap`; Sección 9: escena `axes` y paneles
`#axp0–#axp2`), `stories.js` (nueva `SCENES.axes`; expone `window.SVGKIT` con las primitivas de dibujo),
`app.js` (se quitó el recorrido `#journey`; pestañas con flechas; mapas del Eje 3 se inician al aparecer),
`present.js` (parada de ejes con destino alterno `#axp0`; el modo inicial ya no fuerza resize/refresh),
`datos.js` (`bbByState`: registros del directorio por entidad, usados en la ilustración del Eje 3).
Arquitectura, piloto, fases, criterios y el resto de secciones no cambiaron.

- **Puente logit → ejes** (`#bridgeMap`, fin de la Sección 8): 4 filas factor → eje con interpretación
  desplegable: desconfianza → Confianza; habilidades → Conocimiento; banca móvil (y smartphone) → Inclusión;
  edad → acompañamiento diferenciado (Ejes 2 y 3, línea punteada). Nota explícita: interpretación, no causalidad.
- **Escena de introducción** (`SCENES.axes`, 4 pasos de scroll): celular con solicitud CoDi + escudo; persona
  aprendiendo en mostrador con QR y promotor; mapa con círculos proporcionales a `bbByState` (datos reales,
  no pines decorativos); al final se conectan hacia un nodo «CoDi».
- **Paneles** (`.axis-panel.ax-v2`): encabezado breve Problema / Propuesta / Participan (`.ax-brief`).
  - Eje 1: maqueta de app con 6 pantallas; cada una etiquetada **Existe hoy** (solicitud de cobro,
    autorización con NIP), **Existe + propuesta** (aviso de operación) o **Propuesta** (CoDi en el inicio,
    límites, información de seguridad). Flechas, contador y deslizamiento con el dedo. Medidas completas en
    `<details>`.
  - Eje 2: escena SVG que se transforma en 6 pasos (campaña, QR informativo, promotor, app, primer pago con
    incentivo, compra en línea) + medidor «Desconoce → Lo usa con confianza».
  - Eje 3: mensaje «La infraestructura ya existe…» con la advertencia de que la red no equivale a acceso
    efectivo; mapa de sucursales (sin cambios); recorrido de acompañamiento en 6 pasos (sucursal, orientación,
    app, CoDi asistido, operación **simulada y voluntaria**, herramientas); recuadro «Siempre voluntaria» y
    mapa de banca por entidad.
- **Celular (≤768 px):** sin pestañas; los tres ejes en secuencia vertical; pasos como fila deslizable;
  rótulos secundarios de las ilustraciones (`.lt`) ocultos (el texto está en la tarjeta de explicación).
- **Rendimiento:** las experiencias se construyen al acercarse (`whenNear`, margen 150%).

**Pruebas:** `func.mjs` 158/158 en 375, 820, 1180 y 1440 px (incluye puente, pantallas del Eje 1, pasos de
los Ejes 2 y 3, mensaje del Eje 3, mapa y popup); deslizamiento táctil y desbordamiento en 320–1920 px:
0 desbordes; navegación interna 25/25. Lighthouse móvil: Accesibilidad 100, Buenas prácticas 100, SEO 100.
El rendimiento medido en esta sesión fue 48–66 por carga del equipo; en las mismas condiciones la versión
previa al rediseño obtuvo 49–53 (diferencia atribuible ≈ +80 ms de TBT). Repetir en una máquina sin carga.

**Nota:** este archivo se llamaba `CLAUDE.md`; fue renombrado a `DTN.md` fuera de la sesión. El puntero de la
carpeta superior (`../CLAUDE.md`) todavía menciona `dataton-inegi-2026/CLAUDE.md`.

## 16. Laboratorio del modelo logit y escudos institucionales (2026-11-01, noche)

**Referencia usada:** `…\DATATON REAL\Digitalízate con CoDi.html`, sección «06 Modelo logit». Lo que
realmente implementaba: tabla de efectos marginales (Cuadro 8.1) + «calculadora ilustrativa» con
interruptores (smartphone, banca móvil, desconfianza) y deslizadores (habilidades 0–10, edad 0–50) que
**sumaba** efectos marginales al uso promedio (1.85%). No re-estimaba nada. También mencionaba «mujer» y
«educación superior», que **no** están en la especificación final; no se usaron.

**Especificación final verificada** (`…\DATATON REAL\logitgod\logit_final.do` + texto del PDF final):
`svy: logit uso_codi desconfianza_seguridad n_habilidades smartphone banca_movil edad_final`;
`margins, dydx(*) vce(unconditional)`. `n_habilidades` = suma de p11_1_1…p11_1_14 (0 a 14).
Las cifras ya estaban en `datos.js` (`logit`) y coinciden con el documento.

**Ubicación:** Sección 8, «Escena 2 · Construye el modelo» (`#logitLab` en `index.html`; código
`logitLab()` en `assets/js/stories.js`; estilos `assets/css/llab.css`). Sustituye al gráfico de
coeficientes anterior (`#coefSvg`) y al módulo «¿Qué tan grande es cada efecto?» (`#magViz`); su
contenido quedó integrado en la tarjeta de interpretación. Se eliminó su CSS muerto de `stories.css`.
Escena 1, Escena 3, el puente a los ejes y la nota metodológica no cambiaron.

- Diagrama: 5 variables (botones `aria-pressed`) → conexiones SVG animadas → nodo «Uso de CoDi» con anillo
  de progreso (k de 5). Conexión punteada tenue = variable sin agregar.
- Gráfico de efectos con 5 filas fijas (sin saltos de altura); la fila crece al agregar. IC 95% solo donde
  la investigación lo reporta (desconfianza, smartphone); «IC no reportado» en las demás.
- Tarjeta: unidad, IC, significancia, comparación con el uso promedio, lectura y advertencia. Para las
  continuas, deslizador de **lectura acumulada lineal de esa sola variable** (habilidades 0–14, def. 10;
  edad 0–50, def. 30), como la propia investigación (10 hab. = +3.4 pp; 30 años ≈ −0.4 pp).
  **Decisión de rigor:** de la calculadora antigua se recuperaron los controles, pero **no** la suma de
  efectos entre variables ni la «probabilidad estimada»: contradice la regla 4 y la instrucción del equipo
  de no recalcular probabilidades al seleccionar variables.
- «Ver modelo completo» agrega las faltantes en secuencia y termina en Desconfianza; «Reiniciar» vacía.
  El modo Presentar (parada 4, ahora `#logitLab`) llama `window.LLAB.full()`.
- Celular (≤600 px): botones compactos, nodo Y de 88 px, sin ilustración en la tarjeta; ≤1000 px una
  columna (diagrama → tarjeta → gráfico). Movimiento reducido: sin pulsos ni transiciones.
- **No se re-estimaron modelos parciales.** R 4.4.3 y los microdatos existen, pero replicar los errores
  `svy` + `margins, vce(unconditional)` de Stata para 31 subespecificaciones requiere validación aparte.

**Escudos:** originales aportados por el equipo en la carpeta de trabajo (`logo unam.png` 448×446,
`logo facultad de economia.png` 321×401, 2026-11-01). Versiones web en `assets/images/escudo-unam.png`
(410×425) y `escudo-fe.png` (320×401), generadas con un script Node sin dependencias:
UNAM tenía fondo blanco opaco → «color a alfa» respecto a blanco (al recomponer sobre blanco el error
máximo es 0: mismos píxeles, colores originales) y recorte de márgenes; FE ya tenía alfa → solo se
quitaron ~180 KB de metadatos de Fireworks y márgenes. No se redibujó ni recoloreó nada.
Portada: fila `.inst` sobre el título (64/60 px de alto; 46/43 px en celular) con los nombres de ambas
instituciones; por eso se quitó «UNAM · Facultad de Economía» del `kicker`. Pie: `.foot-inst` (34 px).

**Pruebas (Chrome 156 + playwright-core 1.49, servidor local):**
- Laboratorio `test.mjs`: **200/200** en 320, 375, 430, 820, 1180, 1440 y 1920 px — estado inicial,
  agregar las 5 una por una, valores exactos del gráfico (−1.28 **, +0.34 ***, +3.09 **, +2.12 ***,
  −0.013 **), IC, foco por fila, quitar, deslizadores (14 hab. = +4.76 pp; 30 años = −0.39 pp), reiniciar,
  modelo completo, modo Presentar, escudos cargados con proporción correcta y sin tocar el título, 0
  botones encima del nodo Y, 0 etiquetas del gráfico encimadas, 0 elementos fuera de pantalla, consola limpia.
- Recorrido completo `smoke.mjs` (320–1920 px, 9 tamaños): 0 errores de consola, 0 respuestas 404,
  0 scroll horizontal; 12 secciones, lema «compra», 43 referencias, simulación, ejes, mapa y puente presentes.
- No se repitió Lighthouse. No se probó en Safari/iOS real.

**Pendientes nuevos:** que el equipo confirme los escudos como versiones oficiales vigentes; opcional:
estimar modelos parciales en R/Stata y mostrarlos como «especificaciones alternativas» separadas del
modelo final; Lighthouse tras el cambio (los escudos suman ≈180 KB en la portada).

## 17. Celular (iPhone) y favicon UNAM (2026-11-01, noche)

### Causas encontradas (y corrección)
1. **Imagen y texto en la misma celda (causa principal).** En ≤900 px, `.story-stage` (sticky,
   `height: calc(100svh-56px)`) y `.story-steps` compartían columna y fila: la ilustración quedaba fija y las
   tarjetas de texto pasaban por encima con fondo semitransparente, en las 10 escenas `data-scene`.
   → `stories.css`, `@media (max-width: 900px) and (orientation: portrait)`: composición propia en vertical.
   Banda opaca fija arriba con la ilustración (`--art-h: min((100vw-32px)*.75, 40svh)`, a todo el ancho, color de
   la sección en `--stage-bg`, borde nítido) y el texto en su propio carril debajo (pasos con altura = carril).
2. **Barra superior translúcida.** El texto que subía bajo la barra (`rgba .92→.72`) se veía justo encima de la
   ilustración. → con la banda fija (clase `.stuck`, puesta por JS) un `::before` cubre la franja bajo la barra.
3. **Renglones sueltos bajo la banda.** → `frame()` en `mount()` (`stories.js`): una tarjeta que cabe en el
   carril se desvanece cuando su borde superior llega a la banda (nunca queda partida); una más alta que el
   carril (iPhone SE) se desvanece al final, para no ocultar lo no leído. Solo con la banda fija.
4. **Retraso al regresar.** `.step-card` tenía `transition: opacity .5s` (efecto de escritorio): en celular las
   tarjetas volvían invisibles y aparecían con medio segundo de retraso. → `transition: none` en vertical.
5. **Última tarjeta tapada al entrar desde abajo.** Al subir, la banda sticky llega empujada al fondo de la escena
   y cubría la última tarjeta. → `.story-steps { padding-bottom: calc(var(--art-h) + 36px) }`.
6. **Estados viejos tras cargas diferidas.** Las gráficas diferidas cambian la altura sin evento de scroll.
   → `ResizeObserver` sobre `body` vuelve a calcular escena, banda y tarjetas (también en modo `LOW`).
7. **Motor de escenas.** En vertical mide el centro del carril de lectura, no el de la pantalla (`STACK`).
8. **Áreas seguras.** Había `viewport-fit=cover` sin ningún `env(safe-area-*)`: en horizontal el notch tapaba
   barra y márgenes. → `llab.css`: barra, `.wrap`, barra de presentación y pie con `max(…, env(…))`.
9. **Menú «Secciones».** 12 entradas (≈552 px) sin límite: en iPhone SE y en horizontal las últimas
   (Bibliografía) eran inalcanzables. → `max-height: calc(100svh-56px)`, desplazamiento interno,
   `overscroll-behavior: contain`; en horizontal, dos columnas.
10. **Objetivos táctiles.** Deslizadores de año de 16 px y logo de 22 px. → en `pointer: coarse`, rango de 40 px
    (`touch-action: pan-y`) y logo de 44 px.
11. **Rendimiento.** Safari dispara `resize` al mostrar u ocultar sus barras y el lienzo del hero se
    rehacía cada vez (`app.js`). → solo si cambió su tamaño. Las escenas ya se montaban al acercarse y el
    lienzo ya se pausaba fuera de pantalla. Horizontal ≤900 px conserva las dos columnas (no se apilan).
    Movimiento reducido: la banda no es fija.

Escritorio y tableta horizontal no cambian (todas las reglas nuevas están dentro de las consultas de celular
o de `pointer: coarse`; `env()` vale 0 en escritorio).

### Favicon
`favicon.ico` (raíz; PNG 16 y 32 incrustados), `assets/images/favicon-16x16.png`, `favicon-32x32.png` y
`apple-touch-icon.png` (180), generados de `escudo-unam.png` sin deformar, sobre fondo blanco. En 16 y 32 px se
refuerza la opacidad de los trazos finos al reducir (sin cambiar colores): sin eso el escudo se veía como una
mancha clara, casi invisible en pestañas oscuras. `<head>` actualizado. `favicon.svg` y `favicon-32.png`
anteriores quedan en el repo sin uso; `icon-512.png` no se modificó (nada lo referencia).

### Pruebas
- **WebKit** (Playwright 1.49, build 2104 de Windows, `isMobile`, UA de iPhone): recorrido completo bajando
  y subiendo en 320×568, 375×667, 390×844, 393×852, 430×932, 667×375 y 844×390. En las 7: **0 textos tapados**
  (comprobación con `elementFromPoint` en la zona de lectura), **0 elementos fuera de pantalla, 0 scroll
  horizontal, 0 errores de JS, 0 recursos 404**. Los únicos textos de baja opacidad son bloques `.rv` a mitad
  de su aparición (0 al subir; ninguno atascado). Capturas de entrada, mitad, salida y regreso de las 10 escenas
  en 375×667 y 844×390.
- Chrome: objetivos táctiles < 32 px = 0 en 320, 375 y 844; menú alcanza «Bibliografía» y lleva a la sección.
  Laboratorio logit 200/200. Recorrido completo en 9 tamaños (320–1920): 0 errores de consola, 0 404, 0 scroll horizontal; 12 secciones, lema, 43 referencias, simulación, ejes, mapa y puente presentes. (Los escudos del pie, con carga diferida, se verificaron aparte al llegar al pie en Chrome y WebKit: cargan.)
- Scripts (scratchpad, recrear si hacen falta): `iphone.mjs` (auditoría), `sheet.mjs` (hojas de capturas),
  `tap.mjs` (táctil + menú), `test.mjs`, `smoke.mjs`. La instalación de WebKit se colgó al descomprimir
  (antivirus): se descomprimió a mano en `%LOCALAPPDATA%\ms-playwright\webkit-2104`.

### Pendiente
- **Probar en un iPhone real con Safari** (no hay simulador de iOS en Windows): barras dinámicas al desplazarse,
  inercia del scroll y pesos tipográficos. El WebKit de Windows dibuja Montserrat delgada porque no aplica los
  ejes de fuentes variables; la declaración `font-weight: 100 900` es correcta y iOS 11+ la soporta.
- Favicon en Safari, Firefox y Edge reales (en Chrome y WebKit los archivos cargan con 200).
- Lighthouse móvil tras estos cambios.

## 18. Rediseño narrativo en cinco capítulos (2026-11-02)

**Problema que resuelve** (comentario externo): «parece un repositorio de información con tablas dinámicas y
KPIs juntos»; no se entendía la propuesta ni dónde terminaba cada parte.

### Estructura (index.html)
Portada → **I El problema** (`#cap-1`, s1, s2) → **II Las personas y sus barreras** (`#cap-2`, s3–s6) →
**III La oportunidad: CoDi** (`#cap-3`, s7 + simulación, s8 logit) → **IV Nuestra propuesta** (`#cap-4`,
`#propuesta-minuto`, ejes `#ejes`, mapa `#sucursales`, `#instituciones`, `#piloto`, `#fases`) →
**V Qué esperamos y cómo lo evaluaremos** (`#cap-5`, `#evaluacion`, proyección, conclusión, cierre, bibliografía).
- Cada bloque lleva `data-act="1…5"`. Aperturas `.act-open` (número romano, pregunta del capítulo, entrada y
  mapa de apartados). Al final de cada apartado, `.next-q` «Siguiente pregunta» enlaza con el siguiente
  (regla Pregunta → Evidencia → Interpretación → Siguiente pregunta).
- **Portada:** titular «El comercio electrónico crece en México. Pero no todos participan de la misma manera.»
  y tres líneas: El problema (Chiapas 7.2% / Colima 31.1%), Lo que buscamos (20.5 M de cuentas CoDi validadas →
  compradores activos), Nuestra propuesta (tres ejes). El dato «7 de cada 100 pesos» pasó al párrafo.
- **IV:** «La propuesta en un minuto» (¿qué?, ¿cómo?, ¿dónde empezaríamos?, ¿cómo sabríamos si funciona?) con
  aviso «todo es propuesta, nada está implementado». Cada eje añade «Resultado buscado» (objetivos de la
  investigación: Eje 1 y Eje 3 textuales; Eje 2 con su propia redacción del primer pago acompañado).
- **III:** recuadro «Lo que CoDi atiende / no resuelve» (60.0% de quienes tuvieron problemas los tuvieron con la
  entrega, ENDUTIH 2025, Gráfica 5.2 de la investigación).
- **V:** nueva sección `#evaluacion` (línea base del INEGI, tratamiento frente a control, decisión al mes 18) con
  los tres indicadores, **movidos** desde Fases (antes estaban dentro de la Sección 9).
- Redundancias quitadas: párrafo de s1 que repetía la escena (definición y cifras del VABCOEL); puente suelto
  s1→s2 (sustituido por `.next-q`); columnas del cierre que repetían por tercera vez los tres ejes.
- Editorial: sin «Tutor: Ávalos…» en portada y pie (sigue en este archivo, §1); sin indicador «Desliza»;
  «pasarela» solo como término técnico (rol de ANTAD) y en el nombre del indicador de la investigación; Holt
  descrito como «suavizamiento exponencial de Holt con nivel y tendencia (también llamado doble)», igual que
  la investigación. Cifras, fórmulas y resultados sin cambios.

### Sistema visual (`assets/css/narrativa.css`, cargado al final)
- **Fondos por capítulo:** I marino · II claro · III marino · IV claro · V marino (`.tone-dark`/`.tone-light`;
  las claras también llevan `.paper`). En `.tone-light` se redefinen los tokens (`--on-night*`,
  `--line-night`, `--gold: #7E5A14`, `--sky: #1F6FAE`), así los componentes existentes se adaptan solos.
  Islas oscuras dentro de capítulos claros (`.bb-map`, popups, `.stage-art`) restauran los tokens oscuros.
- **Gráficas:** `theme('idDelContenedor')` en `app.js` lee el fondo del capítulo (`.tone-light`). Barreras
  (chBar, chExp), mapa de banca, CoDi por entidad y fases usan tema claro; sus escalas secuenciales se invierten
  sobre papel (claro = bajo, saturado = alto) con los mismos tonos.
- **Tipografía:** Source Serif 4 (titulares, `--f-display`, `assets/fonts/sourceserif4.woff2`, subconjunto
  latino, Google Fonts/OFL) + Source Sans 3 (texto, interfaz, gráficas). **Montserrat retirada**
  (`montserrat.woff2` queda en el repo sin uso). Radios reducidos (`--r-l` 12 px).
- **Contraste:** auditoría propia (texto visible frente a su fondo efectivo): 0 textos bajo AA en 1440 y
  390 px. Rellenos dorados con texto marino conservan el dorado de marca; acento del Eje 3 sobre papel #12735C.

### Navegación
Cinco capítulos con su lista de apartados (`.act-item`, `.act-btn`, `.act-sub`): clic abre la lista; Escape y
clic fuera la cierran; flechas recorren los apartados; capítulo actual subrayado en dorado y
`aria-current`. ≤1100 px: botón «Capítulos» abre un panel con los cinco y sus apartados (tocar el capítulo
lleva a su apertura). Ya no hay doce números en la barra.

### Evaluación heurística de comprensión (no es una prueba con usuarios)
Recorrido como jurado sin formación económica; **no participaron personas externas**:
1 problema central → portada y Cap. I · 2 desigualdad → apertura y cierre del Cap. II · 3 papel de CoDi →
Cap. III y «Lo que CoDi atiende / no resuelve» · 4 logit → laboratorio y puente a los ejes · 5 propuesta →
portada y «La propuesta en un minuto» · 6 cada institución → «Seis agentes» y roles por eje · 7 implementación →
piloto y fases · 8 evaluación → Cap. V `#evaluacion`. Pendiente: probarlo con 3–5 personas ajenas al proyecto.

### Pruebas (2026-11-02)
- **WebKit** (iPhone, `isMobile`, ×2): 320×568, 375×667, 390×844, 393×852, 430×932, 667×375, 844×390, bajando y
  subiendo: **0 textos tapados, 0 fuera de pantalla, 0 scroll horizontal, 0 errores JS, 0 404**; ningún texto
  oculto al subir (solo apariciones `.rv` a mitad de animación al bajar).
- Contraste AA (auditoría propia, texto visible vs. fondo efectivo): **0** fallas en 1440 y 390 px.
- Navegación por capítulos: **23/23** (ratón, teclado, Escape, saltos, capítulo activo en los cinco, panel en 1024).
- Laboratorio logit: **200/200** en 7 tamaños (incluye parada del modo Presentar). Táctil: 0 objetivos < 32 px;
  el panel «Capítulos» llega a Bibliografía en 320, 375 y 844.
- Recorrido completo en 9 tamaños (320–1920): 0 errores de consola, 0 404, 0 scroll horizontal; 5 capítulos,
  5 aperturas, 9 transiciones, sin tutor ni «Desliza», 43 referencias, simulación, ejes y mapa presentes.
- Regla de texto público (sin «Gráfica X», «documento», páginas): solo el comentario interno de `stories.js`.
- **Bug encontrado y corregido durante las pruebas:** un comentario de una línea había anulado
  `stage.classList.toggle('stuck', …)` en `stories.js`; la banda fija no recibía la clase (sin cubierta bajo la
  barra translúcida). Corregido y verificado en WebKit.
- Escudos del pie: ya no usan `loading="lazy"` (reutilizan la imagen de la portada; Chrome no los cargaba en
  algunos recorridos programáticos).
- No se probó en un iPhone físico ni con personas externas. No se repitió Lighthouse.

### Menú rediseñado (2026-11-02, a petición del equipo: «se ve muy mal el menú»)
- **Causa principal:** seguían activas las reglas `.toc a` del menú anterior de doce números (alto fijo de 36 px,
  rejilla centrada, forma de píldora) y se aplicaban a todos los enlaces nuevos: la pregunta del capítulo se
  encimaba con los apartados. Se **eliminaron** de `styles.css` y `extra.css`; el menú vive solo en `narrativa.css`.
- Cada capítulo es un acordeón: encabezado «Capítulo N» + su pregunta (`.act-head`, lleva a la apertura) y sus
  apartados. Escritorio: lista desplegable de 320 px. ≤1100 px: panel lateral (ancho completo en celular) sobre la
  página atenuada (`body.menu-open::after`), capítulo actual ya desplegado y resaltado, botón con icono que cambia
  a «Cerrar». La barra usa `backdrop-filter`, así que el panel fijo tiene altura explícita (`100dvh - 56px`).
- El foco pasa al capítulo solo si el panel se abre con teclado (al tocar no aparece el marco de foco).
- Pruebas: navegación 37/37 (escritorio con ratón y teclado; panel en 1024 y 390), táctil y «Bibliografía»
  alcanzable en Chrome y WebKit (320, 375, 844), 0 errores de consola, laboratorio 200/200.

### Menú roto en Vercel aunque localmente se vea bien (2026-11-02)
- **Causa 1 (caché):** `vercel.json` permitía a los navegadores reutilizar CSS/JS 1 h + 1 día
  (`stale-while-revalidate`) con nombres fijos. Tras publicar, el HTML nuevo (menú por capítulos) se combinaba con
  el `styles.css` anterior, que aún traía las reglas `.toc a` del menú de doce números. **Corrección:** CSS, JS y
  datos con `Cache-Control: public, max-age=0, must-revalidate` (se revalidan en cada visita con ETag) y
  referencias versionadas en `index.html` (`?v=` + 8 caracteres del MD5 del archivo).
  Si se edita un CSS/JS, conviene actualizar su `?v=`; aun sin hacerlo, la revalidación evita mezclar versiones.
- **Causa 2 (subida incompleta):** el repositorio local no tenía remoto ni commits de estas sesiones; si a GitHub
  se suben archivos sueltos y falta alguno (`styles.css`, `narrativa.css`, `llab.css`, `app.js`, la fuente), el
  menú se rompe igual. Subir siempre el repositorio completo (commit + push).
- Verificado: las 29 rutas referenciadas existen con mayúsculas/minúsculas exactas (Vercel distingue, Windows no).
- Diagnóstico rápido en producción: abrir `https://<dominio>/assets/css/narrativa.css` (si da 404, no se subió) y
  ver el código fuente de la página (debe contener `narrativa.css?v=`).
