# Metodología y reglas de rigor

## Principios

1. **Ninguna cifra sintética.** Todo valor visible proviene de «Estrategia CoDi Final» o de un archivo de
   trabajo cuyos valores coinciden con ella (ver `fuentes.md`).
2. **Unidades y universos explícitos** en cada gráfica (`fig-sub`, `denom`, `fig-foot`): % de la población
   de 6+, % de usuarios de internet, % de quienes no compran, millones de pesos de 2018, etc.
3. **Respuesta múltiple** se indica siempre («no suma 100»).
4. **Asociación ≠ causalidad** en todo lo relativo al modelo logit.
5. **Escenarios ≠ pronósticos**: la proyección se rotula como estimación y condicionada a supuestos.
6. **Lo ilustrativo se declara**: escenas SVG, maquetas de apps, QR decorativo y pines del storytelling.
   Lo observado (mapa de sucursales, coropletas) se declara como tal.
7. **La web es el producto de la investigación**: no se mencionan PDF, páginas ni números de gráfica en
   el texto público. Las fuentes estadísticas sí se citan (INEGI, Banxico, CNBV, autores).

## Modelo logit (Sección 8)

- Datos: ENDUTIH 2025, n = 57,677; población representada 121.4 M; uso promedio de CoDi 1.85%.
- Logit con diseño muestral (estratos, UPM, factor de expansión), errores linealizados.
- Ajuste: F = 143.9 (p < 0.001); pseudo R² de McFadden 0.183 (ponderado); AUC 0.865 (sin ponderar).
- Efectos marginales promedio (pp): desconfianza −1.28** (IC −2.29 a −0.27); habilidades digitales
  +0.34*** por habilidad; smartphone +3.09** (IC 0.6 a 5.6); banca móvil +2.12***; edad −0.013** por año.
- El sitio **no** calcula probabilidades individuales: no se publican coeficientes ni intercepto, y los
  efectos marginales no se suman. No se dibuja curva ROC (solo se conoce el AUC).
- Las lecturas acumuladas (×10 habilidades, ×30 años) son las del propio texto de la investigación.

## Proyección (Proyección a 2030)

Ver `fuentes.md`. Holt (α=0.8, β=0.2), lineal 2020–2024 y promedio; reproducción exacta de los valores
2030. Limitaciones visibles en el sitio: serie corta, quiebre 2019–2020, 2024 preliminar, sin efecto de
la estrategia.

## Fases del escalamiento

Entidades asignadas aplicando los umbrales de la estrategia (≥24%, 15–24%, <15%) a la proporción de
población de 6+ que compra en línea; Nuevo León es el piloto. El documento nombra solo algunas entidades
por fase; la asignación completa es una derivación transparente del criterio.

## Mapas

- Coropletas: ECharts + `assets/data/mx-geo.js` (Natural Earth, dominio público).
- Sucursales: Leaflet 1.9.4 + MarkerCluster 1.5.3, mapa base Esri World Dark Gray (sin llave) con
  alternativa OpenStreetMap y respaldo vectorial con las entidades. Coordenadas sin modificar.
