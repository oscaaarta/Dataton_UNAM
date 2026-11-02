# Registro de fuentes · dashboard-dataton-final.html

**Proyecto:** Estrategia de digitalización del comercio electrónico en México — UNAM, Facultad de Economía, Datatón INEGI 2026.

## Documento principal

- **Fuente autoritativa:** `C:\Users\roca0\Downloads\Estrategia CoDi (10).pdf` (44 páginas; el número de página es el impreso en el PDF).
- **Versión posterior encontrada:** `Estrategia CoDi (11).pdf` (1 nov 2026). Se comparó el texto extraído de ambas: es idéntica a la (10), salvo que **añade el texto del apartado «Conclusión»** (p. 40). La experiencia toma de la (11) únicamente ese texto para la sección de cierre. El apartado «Proyección» está vacío en ambas versiones: **no se muestran cifras proyectadas**.
- `Digitalízate con CoDi.html` no se encontró en el directorio. El HTML anterior con el mismo nombre de archivo se respaldó antes de sobrescribirlo y no se reutilizó.

## Archivos secundarios usados (solo para valores que el PDF grafica sin imprimir cada cifra)

Cada archivo se usó solo después de comprobar que sus valores coinciden con las cifras impresas en el PDF.

| Archivo | Uso | Verificación contra el PDF |
|---|---|---|
| `Datatón INEGI - UNAM-…zip › BD_VABCOEL.xlsx` (INEGI, SCNM) | Niveles del VABCOEL 2013–2024 (Gráfica 1.1 sin etiquetas) | Total 2013 = 656,056 (≈650 mil millones), 2024 = 1,796,594 (≈1.8 billones); variaciones y estructura coinciden con Gráficas 1.3 y 1.4 |
| `…zip › Usuarios de Internet por entidad federativa, según principales usos, 2015 - 2025.xlsx` (ENDUTIH) | Compradores por entidad y año (Gráfica 2.1) | Nacional 5,964,080 (2015) y 39,145,280 (2025); Edomex 5.20 M, CDMX 3.93 M, Jalisco 2.83 M, NL 2.51 M, Veracruz 2.08 M; TCPA Oaxaca 28.58%, CDMX 19.49%, NL 18.29% |
| `…zip › perfilesENDUTIH.xlsx` | Perfil del comprador (sección 3) y tasa de compra por entidad | 18–24: 59.7% e índice 1.60; 25–34: 58.0% y 1.56; estratos 33.4/44.3/58.4%; mujeres 50.9%/hombres 49.1%; tasas 36.2/38.5%; smartphone 99.3%; nacional 37.3%; CDMX 47.4%, NL y Chihuahua 46.7% |
| `…zip › Desconfianza_por_estado_y_edad_ENDUTIH2025.xlsx` | Desconfianza por entidad (Gráfica 6.1 muestra solo 10 valores) | Los 10 valores impresos coinciden (Tlaxcala 16.2 … Tamaulipas 3.4) y el nacional 9.7% |
| `mapa app banaria/Mapa_Banca_combinado.html` | Banca en línea o móvil por entidad (Gráfica 7.6) | Los 10 extremos impresos coinciden (CDMX 49.6 … Chiapas 16.6) |
| `Mapa codi/Mapa_Interactivo_CoDi_Final.html` | Uso de CoDi por entidad (anexo p. 40) | Los 10 extremos impresos coinciden (Zacatecas 12.6 … Chihuahua 3.6) |
| Natural Earth `ne_states` (vía R `rnaturalearthhires`) | Geometrías de las 32 entidades (dominio público), simplificadas a ~2 km | — |

## Indicadores

### Sección 1 · Diagnóstico general

| Indicador | Valor | Unidad | Año | Población de referencia | Página | Fuente primaria | Cálculo |
|---|---|---|---|---|---|---|---|
| VABCOEL | 656,056 → 1,796,594 | millones de pesos de 2018 | 2013–2024 (2023R, 2024P) | Economía nacional | 2 (Gráf. 1.1) | INEGI, VABCOEL | — |
| Participación del VABCOEL en el PIB | 3.02% → 7.07% (serie completa en etiquetas) | % del PIB, precios constantes | 2013–2024 | — | 3 (Gráf. 1.2) | INEGI, VABCOEL y SCNM | Cuadrícula «de cada 100 pesos» = valor ×1 |
| Crecimiento anual VABCOEL / PIB real | 2020: +23.3% / −8.4%; 2022 14.6%, 2023 8.5%, 2024 7.1% | % anual | 2014–2024 | — | 3–4 (Gráf. 1.3) | INEGI | — |
| Estructura por actividad | Menor 10.4% → 29.8%; mayor 22.3% → 20.5%; otros servicios 67.3% → 49.7% | % del VABCOEL | 2013–2024 | — | 4 (Gráf. 1.4) | INEGI | 2019: 31.8% menor (archivo; etiqueta de la gráfica poco legible) |

### Sección 2 · Territorio

| Indicador | Valor | Unidad | Año | Población de referencia | Página | Cálculo |
|---|---|---|---|---|---|---|
| Compradores en línea | 5.96 M → 39.15 M | personas | 2015–2025 | Usuarios de internet de 6+ que compraron en línea | 5 (Gráf. 2.1) | Sin dato 2019 en el tabulado; el control de año lo omite |
| Concentración | 5 estados = 42.3%; 10 menores = 11.2% | % del total | 2025 | Compradores | 5 | — |
| Crecimiento promedio anual | Nacional 20.7%; Oaxaca 28.6%, Tlaxcala 27.8%, Michoacán 27.3% … | % anual | 2015–2025 | Compradores | 6 (Gráf. 2.2) | TCPA = (2025/2015)^(1/10) − 1, calculada con los datos de la Gráf. 2.1 |
| Penetración | Colima 31.1% … Chiapas 7.2% (32 entidades) | % de la población de 6+ | 2025 | Población de 6 años y más (EIC 2025) | 8 (Gráf. 2.4) | Etiquetas impresas |

### Sección 3 · Perfil del comprador

| Indicador | Valor | Unidad | Población de referencia | Página |
|---|---|---|---|---|
| Tasa nacional de compra | 37.3% | % | Usuarios de internet de 6+ (104.9 M) | 8 |
| Edad: tasa / peso entre compradores / índice | 18–24: 59.7% / 21.4% / 1.60; 25–34: 58.0% / 27.2% / 1.56 (demás grupos del archivo) | %, índice | Usuarios de internet de cada grupo | 8 |
| Estrato | Bajo 20.0%, medio bajo 33.4%, medio alto 44.3%, alto 58.4% (índice 1.56) | % | idem | 9 |
| Sexo | Mujeres 50.9% de compradores, tasa 36.2%; hombres 49.1%, 38.5% | % | idem | 9 |
| Smartphone | 99.3% de los compradores lo usa | % | Compradores | 9 |
| Tasa por entidad | CDMX 47.4%, NL 46.7%, Chihuahua 46.7% (32 entidades del archivo) | % | Usuarios de internet de la entidad | 9 |

Se distinguen en pantalla tres medidas: tasa de compra, composición (peso entre compradores) e índice de representación (peso entre compradores ÷ peso en la población).

### Sección 4 · Bienes

| Indicador | Valor | Unidad | Población de referencia | Página |
|---|---|---|---|---|
| % de compradores que adquirió cada categoría (18 categorías) | Ropa 68.0 → 74.4; hogar 38.5 → 50.6; higiene 31.0 → 46.4; transporte 31.9 → 38.2; alimentos 34.7 → 37.5; electrónicos 25.2 → 21.2; computadoras 8.0 → 7.7 | % (respuesta múltiple) | Personas que compraron por internet | 10 (Gráf. 4.1) |

No es participación en el gasto. «Alojamiento y hospedaje» se omite (solo desde 2023) y «Otro producto» se omite.

### Sección 5 · Barreras

| Indicador | Valor 2025 (2022) | Población de referencia | Página |
|---|---|---|---|
| Prefiere en persona | 34.4% (31.6%) | Usuarios de internet que **no** compraron en línea | 11 (Gráf. 5.1) |
| No le interesa | 20.3% (24.0%) | idem | 11 |
| No sabe cómo hacerlo | 18.3% (15.6%) | idem | 11 |
| No le permiten | 12.8% (9.8%) | idem | 11 |
| Desconfía de la seguridad (datos/tarjetas) | 8.2% (12.4%) | idem | 12 |
| No se considera con la edad suficiente | 6.9% | idem | 11 |
| Desconfía de la calidad | 5.6% (6.9%) | idem | 12 |
| Falta de recursos | 5.1% | idem | 12 |
| Sin tarjeta o banca en línea | 3.0% (3.0%) | idem | 12 |
| Problemas de entrega | 55.4 / 57.9 / 63.2 / 60.0% (2022–2025) | Compradores que **tuvieron algún problema** | 12 (Gráf. 5.2) |
| Calidad / estado del producto | 31.9% / 24.2% (2025) | idem | 12 |
| Seguridad del pago | 24.9 / 19.3 / 15.9 / 17.7% | idem | 12–13 |
| Seguridad de datos personales | 8.6 / 6.6 / 4.6 / 6.0% | idem | 12–13 |
| Transferencias bancarias como medio de pago | 58.8% | Personas que pagaron por internet | 13 |

Los valores 2022 de «edad suficiente» y «falta de recursos» no se grafican porque sus etiquetas se superponen en la gráfica del PDF. Las dos poblaciones de referencia nunca se combinan; el selector cambia el denominador visible.

### Sección 6 · Segmentación

| Indicador | Valor | Unidad | Población de referencia | Página |
|---|---|---|---|---|
| Desconfianza digital | Nacional 9.7%; Norte 6.6, Centro Norte 7.4, Centro 11.9, Sur 10.6; Tlaxcala 16.2 … Tamaulipas 3.4 | % | Usuarios de internet de 6+ (P7_22_4, P7_22_5, P7_29=3) | 14 (Gráf. 6.1) |
| Internet / banca móvil por región | Norte 90.3 / 38.8; Sur 80.4 / 26.8; Centro 86.6 | % | Población de 6+ | 14 |
| Índice acumulado por edad | Puebla 123.5, Tlaxcala 122.8, Oaxaca 117.4 … Tamaulipas 28.9 | suma de 8 tasas (**no es % de personas**) | Por entidad | 15 (Gráf. 6.2) |
| Desconfianza por grupo de edad | 1.2, 4.4, 7.3, 8.5, 12.3, 12.8, 13.1, 12.3% | % | Promedio de las 32 entidades | 16 (Gráf. 6.3) |
| Razones por sexo | Tabla p. 17 (p. ej. no sabe cómo: 19.4 vs 17.0) | % | No compradores | 17 (Gráf. 6.4) |
| Razones rural/urbano | Tabla p. 18 (no sabe cómo: 24.4 vs 16.4; prefiere en persona 29.2 vs 35.9) | % | No compradores | 18 (Gráf. 6.5) |
| Razones por estrato | Tabla p. 20 (enteros, «lectura aproximada» del documento) | % del estrato | No compradores | 19–20 (Gráf. 6.6) |
| Razón predominante por escolaridad | Primaria 28.9 (no sabe cómo); secundaria 36.7, media superior 44.9, superior 52.7 (prefiere en persona) | % | No compradores del nivel | 20 (Gráf. 6.7) |

Nota: en las vistas de sexo, rural/urbano y estrato, «Desconfianza» es el % de **no compradores** que menciona esa razón, distinto del índice de 9.7% de la Gráfica 6.1; cada vista muestra su denominador. Las asociaciones de sexo (−1 punto) y educación superior (−1.17 puntos) con el uso de CoDi que el texto del PDF menciona en la sección 6 **no aparecen en el Cuadro 8.1**, por lo que no se grafican en el modelo.

### Sección 7 · CoDi

| Indicador | Valor | Unidad | Periodo | Población de referencia | Página | Fuente primaria |
|---|---|---|---|---|---|---|
| Cuentas validadas acumuladas | 20.6 M | cuentas | may 2020–sep 2026 | Cuentas CoDi | 23 | Banxico SIE (CF881) |
| Cuentas nuevas con ≥1 pago | 2.7 M | cuentas | idem | Cuentas nuevas | 23 | Banxico SIE |
| Cuentas nuevas con algún cobro | ≈1 M | cuentas | idem | Cuentas nuevas | 23 | Banxico SIE |
| Altas por año | 4.2*, 5.1, 3.8, 3.1, 1.8, 1.6, 0.9† | millones | 2020–2026 | — | 22 (Gráf. 7.1) | Banxico SIE |
| Pagadores / cobradores nuevos | 179.2 / 141.8 … 293.0 / 34.8 | miles de cuentas | 2020–2026 | — | 23 (Gráf. 7.2) | Banxico SIE |
| Medios de pago por internet | Débito 76.9, transferencias 58.8, crédito 33.2, electrónicos 23.0, CoDi 6.1, regalo 4.0, otro 1.9 | % | 2025 | Personas que pagaron por internet | 24 (Gráf. 7.3) | ENDUTIH |
| CoDi entre medios de pago | 4.4% → 6.1% | % | según el texto del PDF | idem | 23 | ENDUTIH |
| Usa internet | 86.0% (Norte 90.3, CN 87.4, Centro 86.6, Sur 80.4) | % | 2025 | Población de 6+ | 25 (Gráf. 7.4) | ENDUTIH |
| Usa teléfono inteligente | 86.5% (Norte 88.7, CN 87.6, Centro 87.0, Sur 82.6) | % | 2025 | Población de 6+ | 25–26 (Gráf. 7.5) | ENDUTIH |
| Usa banca en línea o móvil | 32.6% (Norte 38.8, CN 31.9, Centro 33.4, Sur 26.8); CDMX 49.6 … Chiapas 16.6 | % | 2025 | Población de 6+ | 26 (Gráf. 7.6) | ENDUTIH |
| Sucursales bancarias | Banco del Bienestar 3,149; Azteca 2,007; BBVA 1,601 … | sucursales | 2026 | — | 27 (Gráf. 7.7) | CNBV |
| App Banco del Bienestar | >25 M de descargas, integra CoDi | descargas | 2026 | — | 27 | Gobierno de México (2026) |

\* desde el 24 de mayo · † hasta septiembre. Los tres indicadores administrativos se presentan por separado: no forman un embudo de una misma cohorte. Discrepancias menores registradas: (a) el texto de la p. 26 dice Norte 38.8% y Centro 33.4% en banca móvil, mientras la gráfica 7.6 rotula 38.7% y 33.5%; se usa el texto. (b) El texto de la p. 23 sitúa el 4.4% de CoDi en 2020, mientras el archivo `metodos_pago_internet_ENDUTIH_2022_2025.xlsx` lo asigna a 2022; por eso solo se grafica 2025 y el cambio se cita textualmente. (c) La etiqueta 2020 de pagadores (179.2) está parcialmente cubierta en la gráfica; la suma 2020–2026 (2,714 mil) es coherente con los 2.7 M del texto.

### Sección 8 · Modelo logit (Cuadro 8.1, p. 29)

| Variable | Efecto marginal promedio | Unidad | IC 95% | Significancia |
|---|---|---|---|---|
| Desconfianza o problema de seguridad en pagos o datos | −1.28 | pp | −2.29 a −0.27 (p. 29) | ** |
| Habilidades digitales (por habilidad adicional) | +0.34 | pp por habilidad | no reportado | *** |
| Usa teléfono inteligente | +3.09 | pp | 0.6 a 5.6 (p. 30) | ** |
| Usa banca móvil | +2.12 | pp | no reportado | *** |
| Edad (por año adicional) | −0.013 | pp por año | no reportado | ** |

- Observaciones: 57,677 (ENDUTIH 2025); población representada: 121.4 M; proporción de usuarios de CoDi en la muestra: 1.85%.
- Pseudo R² de McFadden (ponderado): 0.183. AUC: 0.865 (modelo sin ponderar). F = 143.9, p < 0.001.
- Especificación: logit con diseño muestral (estratos, UPM y factor de expansión), errores estándar linealizados; efectos marginales promedio (dy/dx).
- Lecturas del documento reproducidas: −1.28 pp ≈ 70% menos respecto al uso promedio; 10 habilidades ≈ +3.4 pp; 30 años ≈ −0.4 pp.
- No se usaron los modelos de las carpetas `Logit`, `Logit bien`, `logitgod`, `MCO` ni `MCO codi`. No se dibuja curva ROC: el PDF no incluye sus coordenadas.

### Sección 9 · Propuesta (pp. 30–39)

| Elemento | Contenido | Página |
|---|---|---|
| Objetivo | Convertir más de 20.5 M de cuentas validadas en compradores digitales activos | 30 |
| Eje 1 Confianza | Banxico y CONDUSEF: CoDi a ≤2 toques, registro guiado, solicitud con comercio y monto, PIN, límite de pago, aviso por operación, recordatorio de seguridad, sello para comercios ANTAD, atención de quejas | 31–32 |
| Eje 2 Conocimiento | ANTAD: campaña, QR informativo, promotores, primer pago acompañado, CoDi en pasarela, incentivos; mide escaneos, pagos en pasarela y clientes interesados | 32–33, 35 |
| Eje 3 Inclusión financiera | Banco del Bienestar y Secretaría del Bienestar: cuentas de ahorro, activación asistida, acompañamiento de Servidores de la Nación; **siempre voluntaria y no condicionada a apoyos** | 34, 35–36 |
| Arquitectura | Seis agentes y sus roles (Banxico, ANTAD, Banco del Bienestar, Secretaría del Bienestar, CONDUSEF, INEGI) | 35–36 |
| Piloto Nuevo León | Internet 93.9%, smartphone 91.3%, compra 46.7% (vs 37.3%), CoDi 8.6% (4.º; nacional 6.1%), ≈200 mil usuarios sobre 2.3 M que pagan por internet, 2.51 M compradores; cuatro razones | 36–37 |
| Fases | Piloto 0–2; Fase 1 réplica 2–4 (≥24%, 10 entidades); Fase 2 Centro y Bajío 4–6 (15–24%, 14); Fase 3 Sur 6–8 (<15%, 7) | 38–39 |
| Criterios de avance | Mes 18; primer pago con CoDi (Banxico), pasarelas y QR (ANTAD), problemas de seguridad ≤ línea base (17.7% y 6.0%, ENDUTIH); extensión de un año si no se cumplen; ocho años = escenario base | 39 |

**Cálculo:** la lista completa de entidades por fase se derivó aplicando los umbrales documentados a la Gráfica 2.4 (el PDF solo nombra algunas). Resultado: 10 / 14 / 7 entidades, igual a los conteos del documento.

Las relaciones de colaboración del diagrama institucional resumen interacciones descritas en el documento (sello, estándar de apps, activación asistida, acompañamiento, línea base y evaluación); son roles **propuestos**.

### Cierre

Texto basado en la «Conclusión» de `Estrategia CoDi (11).pdf` (p. 40). Sin cifras proyectadas.

## Elementos ilustrativos (no son datos)

- Simulación de pago con CoDi (sección 7): comercio, banco, monto ($1,249.00) y referencia son ficticios; el QR es un patrón decorativo que no codifica información; no hay conexión bancaria. El flujo sigue las imágenes ilustrativas de la p. 33.
- Maqueta de app bancaria (Eje 1): representa el estándar **propuesto**; el límite de $2,000 es un ejemplo de configuración, no una cifra del documento.
- Red animada del hero: nodos en el centroide aproximado de cada entidad, tamaño proporcional a los compradores de 2025; las conexiones son decorativas (vecinos más cercanos) y no representan flujos medidos.

## Escenas de scroll storytelling (versión 2)

Diez escenas vectoriales originales (SVG generado en `assets/js/stories.js`, sin fotografías ni recursos de terceros). Todo el texto informativo está en HTML junto a cada escena; las imágenes son `aria-hidden` o tienen una descripción alternativa.

| Escena | Sección | Qué cantidades dibuja (dato) | Qué es ilustrativo |
|---|---|---|---|
| 01 Comercio electrónico | 1 | Alturas de 12 barras = VABCOEL 2013–2024 (Gráf. 1.1) | Teléfono, paquetes y tarjetas |
| 02 México desigual | 2 | Tamaño de puntos ∝ √compradores 2025 (Gráf. 2.1); colores = penetración (Gráf. 2.4); etiquetas 5.20/3.93/2.83/2.51/2.08 M y 7.2/10.0/11.4/31.1% | Conexiones entre entidades vecinas |
| 03 Comprador digital | 3 | Columnas = tasa de compra por edad (14.8 … 12.9%); barras por estrato (20.0/33.4/44.3/58.4%) | Figuras por generación y teléfonos en mano |
| 04 Qué compramos | 4 | Barras = % de compradores 2025 (74.4, 50.6, 46.4, 38.2, 37.5, 7.7) y marca 2021 (68.0, 38.5, 31.0, 31.9, 34.7, 8.0) | Íconos de objetos |
| 05 Desconfianza | 5 | Barras 34.4 / 18.3 / 8.2% (base: no compradores, Gráf. 5.1) | Formulario de pago, tarjeta y signos de incertidumbre (conceptuales; no representan un fraude) |
| 06 Infraestructura CoDi | 7 | — | Flujo conceptual: QR decorativo (no válido para cobrar), solicitud, SPEI, confirmación |
| 07a Logit, población | 8 | 100 figuras = 100% de la muestra; 1.85 figuras doradas = 1.85% de uso de CoDi (Cuadro 8.1, nota); posiciones de los cinco efectos | Distribución inicial dispersa |
| 07b Logit, efectos | 8 | Gráfico interactivo con los cinco efectos marginales y los IC reportados (−2.29 a −0.27; 0.6 a 5.6) | Cinco ilustraciones asociadas a cada variable |
| 07c Logit → ejes | 8 | — | Agrupación interpretativa de los efectos en los tres ejes (basada en el texto de pp. 29–30; no causal) |
| 08 Tres ejes | 9 | — | Escudo, recorrido de aprendizaje, sucursal; los pines en el mapa no representan sucursales reales |
| 09 Piloto y fases | 9 | Nuevo León como piloto; asignación de fases derivada de los umbrales aplicados a la Gráf. 2.4 | Contornos punteados: «contempladas en la propuesta», no participantes |
| 10 Cierre | — | — | Líneas que convergen hacia el lema |

**Módulo «¿Qué tan grande es cada efecto?»:** compara magnitudes absolutas en puntos porcentuales con el uso promedio (1.85%). Las lecturas acumuladas (10 habilidades = +3.4 pp; 30 años ≈ −0.4 pp) son las del propio documento (p. 30), y en el módulo se mostró −0.39 pp (−0.013 × 30). No se calculan probabilidades individuales: el PDF no publica el intercepto ni los coeficientes del logit.

**Nota técnica:** `html` mantiene `overflow-x: hidden`; en `body` se usa `overflow-x: clip` (con soporte del navegador), porque `hidden` en `body` crea un contenedor de desplazamiento que anula `position: sticky`, del que dependen las escenas.

## Versión 3 · Auditoría y correcciones

- **Sección 3:** se quitó de la escena «buyers» el paso de estrato, que mostraba otra gráfica con el mismo título justo encima de la gráfica interactiva. Ningún valor cambió; las tasas por estrato (20.0 / 33.4 / 44.3 / 58.4%) siguen en la gráfica interactiva.
- **Territorio (sección 3):** la línea del promedio nacional se sustituyó por color (azul: ≥ 37.3%; gris: < 37.3%; dorado: las tres tasas más altas), porque la línea cruzaba los valores. Los datos no cambian.
- **Barreras (sección 5):** los valores de 2022 se muestran como barra gris delgada en lugar de punto; mismos valores y mismas omisiones (sin 2022 para «edad suficiente» y «falta de recursos»).
- **Mapa, modo Penetración:** la lectura grande ahora muestra el rango entre entidades (7.2–31.1%), con la unidad correcta.
- **Fases (sección 9):** las entidades de la fase seleccionada se dibujan con relleno tenue y borde punteado: «contempladas en la propuesta», no participantes.
- **Modo presentación:** ruta de 6 paradas sobre el mismo contenido; no añade cifras. Los textos de cada parada citan valores ya registrados arriba.
