# Fuentes y trazabilidad de los datos

Documento técnico interno. **No es contenido público del sitio**: aquí sí se citan páginas de la
investigación para que cualquier cifra pueda rastrearse.

## Documento autoritativo

- **Estrategia CoDi Final** (`Estrategia CoDi_final.pdf`, 48 páginas, versión del 1 de noviembre de 2026).
  Sustituye a «Estrategia CoDi (10)», «(11)» y versiones preliminares. No mezclar datos de versiones anteriores.
- `docs/registro-fuentes-version-previa.md` es el registro elaborado sobre la versión (10). Sus números
  de página **no** coinciden con la versión final; se conserva solo como antecedente.

## Mapa de secciones → páginas de la versión final

| Sitio | Contenido | Páginas |
|---|---|---|
| Hero + Sección 1 | VABCOEL, % del PIB, crecimiento vs PIB, estructura por actividad (Gráficas 1.1–1.4) | 2–5 |
| Sección 2 | Compradores por entidad, TCPA, penetración (Gráficas 2.1–2.4) | 5–9 |
| Sección 3 | Perfil del comprador | 9–10 |
| Sección 4 | Bienes comprados (Gráfica 4.1) | 10 |
| Sección 5 | Razones de no compra y problemas (Gráficas 5.1–5.2) | 11–14 |
| Sección 6 | Barreras por entidad, región, edad, sexo, rural/urbano, estrato, escolaridad (6.1–6.7) | 15–22 |
| Sección 7 | CoDi, altas, uso, medios de pago, requisitos, sucursales (7.1–7.8) | 23–29 |
| Sección 8 | Modelo logit (Cuadro 8.1) | 29–31 |
| Sección 9 | Propuesta, ejes, arquitectura, piloto, fases, criterios | 31–40 |
| Proyección | Escenarios 2025–2030 | 41–42 |
| Conclusión | Texto final | 42–43 |
| Piloto (mapa CoDi por entidad) | «Gráfica codi por estado» | 43 |
| Bibliografía | 37 referencias | 44–47 |

## Archivos de trabajo usados para valores exactos

Se usan solo cuando el documento grafica una serie sin imprimir cada cifra, y siempre se verificó que
los valores impresos en el documento coinciden.

| Bloque (`assets/data/datos.js`) | Archivo | Verificación |
|---|---|---|
| `vabcoel`, `projection.obs` | `BD_VABCOEL.xlsx` (INEGI, SCNM base 2018; dentro del zip del Drive) | 3.02% → 7.07% del PIB; 535,538 (al por menor 2024P) |
| `buyers` | «Usuarios de Internet por entidad federativa, según principales usos, 2015–2025.xlsx» | Edomex 5.20 M, CDMX 3.93 M, nacional 5.96 → 39.15 M |
| `profile`, `buyRate` | `perfilesENDUTIH.xlsx` | 59.7%, 58.0%, 33.4%, 58.4%, 99.3%, CDMX 47.4% |
| `distrust`, `distrustAgeSum` | `Desconfianza_por_estado_y_edad_ENDUTIH2025.xlsx` | extremos 16.2 / 3.4; Puebla 123.5 |
| `banca` | `mapa app banaria/Mapa_Banca_combinado.html` | CDMX 49.6, Chiapas 16.6 |
| `codiState`, `codiRegion` | `Mapa codi/Mapa_Interactivo_CoDi_Final.html` | Zacatecas 12.6, NL 8.6, Chihuahua 3.6; nacional 6.1 |
| Sucursales (`sucursales-bienestar.js`) | `Mapa bancos/sucursalesbabien_1ertrim2026.csv` | 3,150 registros, 32 entidades (ver abajo) |

## Proyección (pp. 41–42)

- Serie observada: VABCOEL **comercio al por menor**, 2013–2024, millones de pesos de 2018.
- Alto: Holt, α = 0.8, β = 0.2. Nivel y tendencia iniciales por regresión lineal sobre las primeras 6
  observaciones (2013–2018), arrancando un periodo antes de 2013.
- Bajo: MCO sobre 2020–2024 (pendiente 32,767 millones por año).
- Base: promedio de alto y bajo.
- Resultado recalculado: alto 805,302; base 736,430; bajo 667,558 (2030) → **coinciden exactamente** con el
  documento, igual que los crecimientos acumulados 50.4%, 37.5% y 24.7%. Los años 2025–2029 se publican
  en el sitio como recálculo de esa misma metodología (rótulo «e», estimado).

## Mapa de sucursales del Banco del Bienestar

- Archivo: `Mapa bancos/sucursalesbabien_1ertrim2026.csv` (UTF-8). Campos: institución, sucursal, domicilio,
  localidad, municipio, entidad, horario, latitud, longitud.
- Validación (script en el historial de la sesión): 3,150 registros; 0 sin coordenadas; 0 fuera del
  rectángulo de México; 0 coordenadas duplicadas; 32 entidades.
- 17 registros tienen coordenadas con 3 decimales o menos → se marcan como **«ubicación aproximada»**
  (círculo punteado). No se movió ni se inventó ninguna coordenada.
- El documento cita 3,149 sucursales (CNBV, 2026); el directorio tiene 3,150 (uno con horario 00:00–23:59).
  El sitio lo explica en el pie del mapa.
- Verificación cruzada con `Mapa bancos/Mapa_Bancos_Limpio.html`: su capa «Banco del Bienestar» (3,150
  puntos) coincide uno a uno con el JSON del sitio; `mapabanco.R` muestra que ambos salen del mismo CSV.
- 3 pares de registros comparten domicilio idéntico (posible registro doble); se conservan y se marcan.
- **Pendiente:** confirmar la URL pública exacta del directorio (Banco del Bienestar/CNBV) para citarla.

## Bibliografía

Las 37 referencias de las pp. 44–47 están en `assets/data/datos.js` (`biblio`). Las URL se reconstruyeron
uniendo los cortes de línea del PDF. Observaciones:

- La referencia «CoDi, Operaciones realizadas a través de CoDi (CF884)» apunta en el documento a
  `idCuadro=CF882`. Se respetó la URL del documento; conviene que el equipo la confirme.
- «ENIF2024_RR.pdf» no tiene URL en el documento; se muestra «Sin enlace público».
