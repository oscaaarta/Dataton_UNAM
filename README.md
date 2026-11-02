# Estrategia de digitalización del comercio electrónico en México

**Quien conoce confía, y quien confía, compra. Usa CoDi.**

Experiencia web de *data storytelling* de la investigación del equipo de la Universidad Nacional Autónoma
de México, Facultad de Economía, para el **Datatón INEGI 2026**.

El sitio recorre el diagnóstico del comercio electrónico en México, sus desigualdades territoriales y
sociodemográficas, las barreras de compra en línea, los determinantes del uso de CoDi (modelo logit) y una
propuesta de política pública en tres ejes: **confianza**, **conocimiento** e **inclusión financiera**,
con un piloto en Nuevo León, fases de escalamiento, proyección a 2030, conclusión y bibliografía.

## Equipo

López Trujillo Andrea · Santos Peralta Ady Arelí · Torres Aparicio Oscar Miguel · Vargas Avendaño Ulises
Tutor: Ávalos Domínguez Irving Javier

## Contenido

| # | Apartado | Interacción principal |
|---|---|---|
| 1 | Diagnóstico del comercio electrónico | 100 pesos del PIB (2013–2024), VABCOEL, crecimiento vs PIB, estructura |
| 2 | Desigualdades territoriales | Mapa por entidad: volumen, crecimiento, penetración, año |
| 3 | ¿Quiénes compran? | Pestañas: edad, estrato, sexo, smartphone, territorio |
| 4 | ¿Qué compran? | Categorías 2021–2025 |
| 5 | Barreras | No compradores vs compradores con problemas |
| 6 | Barreras según grupos | Entidad, región, edad, sexo, rural/urbano, estrato, escolaridad |
| 7 | CoDi como respuesta | Indicadores Banxico, medios de pago, requisitos, simulación de pago |
| 8 | Modelo logit | Efectos marginales con IC, magnitudes, asociación vs causalidad |
| 9 | Propuesta | Tres ejes, **mapa de 3,150 sucursales del Banco del Bienestar**, arquitectura, piloto, fases |
| P | Proyección a 2030 | Tres escenarios (Holt, lineal, promedio) con selector de año |
| C | Conclusión y cierre | — |
| F | Bibliografía | 37 referencias con buscador y filtros |

Incluye un **modo Presentar** (barra superior) con una ruta de 7 paradas para el jurado.

## Tecnología

Sitio estático sin build: HTML, CSS y JavaScript.

- [Apache ECharts 5.6](https://echarts.apache.org) (build reducido, carga diferida) — gráficas y coropletas.
- [GSAP 3.12 + ScrollTrigger](https://gsap.com) — escenas ligadas al scroll.
- [Leaflet 1.9.4](https://leafletjs.com) + [MarkerCluster 1.5.3](https://github.com/Leaflet/Leaflet.markercluster) — mapa de sucursales (carga diferida).
- Geometrías estatales: Natural Earth (dominio público). Mapa base: Esri World Dark Gray / OpenStreetMap.
- Tipografías locales: Montserrat y Source Sans 3 (SIL Open Font License).

## Estructura

```
index.html                 página única
assets/css/                styles.css (sistema visual), stories.css (escenas), extra.css (ampliaciones)
assets/js/                 app.js (gráficas e interacción), stories.js (escenas SVG), present.js (modo jurado)
assets/data/               datos.js (todas las cifras), mx-geo.js (geometrías), sucursales-bienestar.js
assets/vendor/             echarts, gsap, ScrollTrigger, leaflet
assets/fonts/, images/     tipografías, favicon e imagen para redes sociales
docs/                      fuentes, metodología, despliegue
```

## Ver localmente

Cualquier servidor estático funciona (no abrir con `file://`, porque el mapa de sucursales carga un JSON):

```bash
npx serve .
# o
python -m http.server 8000
```

## Fuentes y rigor

Todas las cifras provienen de la investigación del equipo con datos de INEGI (ENDUTIH, VABCOEL, SCNM,
EIC, DENUE), Banco de México (SIE) y CNBV. Ver [`docs/fuentes.md`](docs/fuentes.md) y
[`docs/metodologia.md`](docs/metodologia.md). La simulación de pago es ilustrativa: no realiza cobros ni
se conecta a ningún banco.

## Despliegue

GitHub → Vercel → dominio administrado en GoDaddy. Instrucciones en [`docs/despliegue.md`](docs/despliegue.md).
