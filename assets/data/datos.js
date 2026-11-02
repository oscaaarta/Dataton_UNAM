/* =====================================================================
   DATOS — Estrategia de digitalización del comercio electrónico en México
   Fuente autoritativa (interna): «Estrategia CoDi Final» (UNAM-FE, Datatón INEGI 2026).
   Los valores provienen de esa investigación o de los archivos de trabajo del equipo
   cuyos valores coinciden con ella. No hay cifras sintéticas. Ver docs/fuentes.md y
   docs/metodologia.md para la trazabilidad de cada bloque.
   ===================================================================== */
window.DATA = (function () {
  const years13 = [2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024];

  /* ---------- Sección 1 · Gráficas 1.1–1.4 (pp. 2–4). Valores exactos: BD_VABCOEL.xlsx (INEGI, SCNM) ---------- */
  const vabcoel = {
    years: years13,
    yearLabels: ['2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023R', '2024P'],
    // millones de pesos a precios de 2018
    total: [656056.3, 668374.4, 776955.1, 863448.2, 942764.8, 1004369, 969886.8, 1196275, 1348460, 1545830, 1677503, 1796594],
    // % del PIB (Gráfica 1.2, etiquetas impresas)
    pib: [3.02, 3.00, 3.40, 3.71, 3.98, 4.15, 4.03, 5.42, 5.76, 6.37, 6.70, 7.07],
    // variación anual % (Gráfica 1.3)
    gV: [null, 1.9, 16.2, 11.1, 9.2, 6.5, -3.4, 23.3, 12.7, 14.6, 8.5, 7.1],
    gPIB: [null, 2.5, 2.7, 1.8, 1.9, 2.0, -0.4, -8.4, 6.0, 3.7, 3.1, 1.5],
    // estructura % (Gráfica 1.4)
    menor: [10.4, 9.4, 11.5, 12.4, 13.4, 13.5, 31.8, 33.7, 24.4, 23.9, 23.3, 29.8],
    mayor: [22.3, 21.1, 23.8, 26.1, 26.0, 25.3, 23.3, 23.1, 30.1, 26.7, 26.2, 20.5],
    otros: [67.3, 69.5, 64.7, 61.5, 60.6, 61.2, 44.9, 43.2, 45.5, 49.4, 50.5, 49.7]
  };

  /* ---------- Regiones del Banco de México (Reportes sobre las Economías Regionales) ---------- */
  const region = {
    'Baja California': 'Norte', 'Chihuahua': 'Norte', 'Coahuila': 'Norte', 'Nuevo León': 'Norte', 'Sonora': 'Norte', 'Tamaulipas': 'Norte',
    'Baja California Sur': 'Centro Norte', 'Aguascalientes': 'Centro Norte', 'Colima': 'Centro Norte', 'Durango': 'Centro Norte', 'Jalisco': 'Centro Norte',
    'Michoacán': 'Centro Norte', 'Nayarit': 'Centro Norte', 'San Luis Potosí': 'Centro Norte', 'Sinaloa': 'Centro Norte', 'Zacatecas': 'Centro Norte',
    'Ciudad de México': 'Centro', 'México': 'Centro', 'Guanajuato': 'Centro', 'Hidalgo': 'Centro', 'Morelos': 'Centro', 'Puebla': 'Centro', 'Querétaro': 'Centro', 'Tlaxcala': 'Centro',
    'Campeche': 'Sur', 'Chiapas': 'Sur', 'Guerrero': 'Sur', 'Oaxaca': 'Sur', 'Quintana Roo': 'Sur', 'Tabasco': 'Sur', 'Veracruz': 'Sur', 'Yucatán': 'Sur'
  };

  /* ---------- Sección 2 · Gráfica 2.1 (p. 5). Usuarios de internet que compran en línea por entidad.
     Archivo: "Usuarios de Internet por entidad federativa, según principales usos, 2015-2025.xlsx" (ENDUTIH).
     Coincide con cifras del PDF (Edomex 5.20 M, CDMX 3.93 M, Nacional 5.96 M → 39.15 M). 2019 sin dato en el tabulado. ---------- */
  const buyerYears = [2015, 2016, 2017, 2018, 2020, 2021, 2022, 2023, 2024, 2025];
  const buyers = {
    'Aguascalientes': [71169, 149834, 130745, 197089, 321440, 300052, 379514, 393283, 539017, 527367],
    'Baja California': [331286, 637816, 667768, 786902, 975251, 1008250, 1157803, 1207762, 1114591, 1356620],
    'Baja California Sur': [51138, 113139, 138518, 146772, 218886, 248405, 272814, 309371, 315939, 325183],
    'Campeche': [54009, 47151, 87694, 111214, 169685, 206755, 196905, 214808, 217297, 218665],
    'Coahuila': [141837, 329750, 362298, 442236, 702467, 806916, 901350, 1054508, 1151167, 1087212],
    'Colima': [49788, 77842, 94501, 139632, 211164, 229858, 239190, 237545, 260940, 258219],
    'Chiapas': [89301, 142973, 143132, 227499, 357388, 423988, 547103, 622344, 771810, 801692],
    'Chihuahua': [181910, 367356, 554989, 601828, 796674, 1173288, 1157079, 1303846, 1428674, 1554888],
    'Ciudad de México': [662679, 1343910, 1286048, 1474517, 2431259, 2515212, 2855498, 3083078, 3524704, 3932533],
    'Durango': [66552, 149279, 162644, 181276, 357409, 320665, 435566, 533109, 546356, 584995],
    'Guanajuato': [220213, 448978, 499530, 564295, 944593, 1168182, 1207798, 1291730, 1572958, 1583189],
    'Guerrero': [83638, 105787, 158563, 209637, 365167, 493403, 507872, 576291, 684425, 699638],
    'Hidalgo': [100716, 248151, 240368, 239616, 430965, 484928, 509051, 608810, 825594, 862666],
    'Jalisco': [553105, 771186, 919270, 1231586, 1723570, 2062262, 2129169, 2865033, 2840059, 2830522],
    'México': [617407, 1044862, 1399008, 1551096, 3051966, 3521694, 3584247, 4052579, 4321671, 5195746],
    'Michoacán': [124266, 278874, 293101, 410169, 604757, 847829, 818905, 1018968, 1347440, 1390535],
    'Morelos': [71204, 161858, 185801, 198379, 364352, 482194, 405282, 437841, 502194, 578924],
    'Nayarit': [60167, 109223, 114233, 141856, 220721, 304990, 311542, 345958, 344441, 449917],
    'Nuevo León': [467634, 718206, 664741, 991243, 1428079, 1713329, 1844670, 2007907, 1984285, 2507514],
    'Oaxaca': [70469, 138167, 175827, 232439, 375592, 476497, 513591, 734845, 703150, 870362],
    'Puebla': [212636, 394804, 327187, 433742, 740462, 877471, 1027378, 1243826, 1432424, 1679147],
    'Querétaro': [133000, 226778, 249475, 300227, 463046, 590054, 638007, 750381, 792920, 925318],
    'Quintana Roo': [126338, 223001, 232884, 277634, 444590, 444710, 497244, 621219, 613773, 696284],
    'San Luis Potosí': [111973, 190800, 217555, 312975, 496861, 591427, 580010, 618647, 761360, 782466],
    'Sinaloa': [189975, 238066, 342022, 420804, 637635, 761548, 721367, 821150, 1048713, 962117],
    'Sonora': [245586, 359359, 449034, 521780, 685200, 928470, 903629, 1054354, 1116858, 1066922],
    'Tabasco': [66382, 113958, 137171, 171270, 361777, 422306, 377801, 489825, 678128, 672915],
    'Tamaulipas': [246662, 323311, 462709, 515064, 827739, 921749, 1008077, 1028802, 1188795, 1088672],
    'Tlaxcala': [29737, 64125, 68847, 76375, 176286, 179555, 228709, 275783, 322544, 344831],
    'Veracruz': [326639, 397765, 495375, 731210, 1068133, 1210376, 1529815, 1538609, 1696615, 2079317],
    'Yucatán': [158116, 234688, 227044, 350449, 575803, 643626, 689262, 719142, 829709, 796213],
    'Zacatecas': [48548, 75354, 105084, 131096, 234028, 301129, 281130, 305758, 415624, 434691]
  };
  const buyersNational = [5964080, 10226351, 11593166, 14321907, 22762945, 26661118, 28457378, 32367112, 35894175, 39145280];

  /* Gráfica 2.4 (p. 8): % de la población de 6 años y más que compra en línea, 2025 (etiquetas impresas) */
  const penetration = {
    'Colima': 31.1, 'Baja California Sur': 29.7, 'Ciudad de México': 27.9, 'Baja California': 27.8, 'Yucatán': 26.9, 'Nuevo León': 26.8,
    'Quintana Roo': 26.0, 'Tamaulipas': 25.4, 'Sonora': 25.1, 'Aguascalientes': 24.7, 'Coahuila': 24.6, 'Chihuahua': 23.1, 'Sinaloa': 22.9,
    'Jalisco': 22.4, 'Durango': 21.5, 'Querétaro': 21.2, 'Campeche': 20.0, 'Morelos': 19.9, 'Nayarit': 19.6, 'México': 19.4, 'San Luis Potosí': 19.2,
    'Guanajuato': 16.7, 'Tabasco': 16.4, 'Zacatecas': 15.9, 'Hidalgo': 15.2, 'Veracruz': 14.3, 'Tlaxcala': 14.3, 'Michoacán': 14.0,
    'Puebla': 12.3, 'Guerrero': 11.4, 'Oaxaca': 10.0, 'Chiapas': 7.2
  };

  /* ---------- Sección 3 (pp. 8–9). Valores: perfilesENDUTIH.xlsx (coinciden con el texto del PDF) ---------- */
  // comp = % entre compradores; pob = % población elegible (usuarios de internet 6+); tasa = % que compra; idx = índice de representación
  const profile = {
    national: 37.3,
    edad: [
      { g: '6–17', comp: 8.7, pob: 22.1, tasa: 14.8, idx: 0.40 },
      { g: '18–24', comp: 21.4, pob: 13.4, tasa: 59.7, idx: 1.60 },
      { g: '25–34', comp: 27.2, pob: 17.4, tasa: 58.0, idx: 1.56 },
      { g: '35–44', comp: 20.7, pob: 16.5, tasa: 46.9, idx: 1.26 },
      { g: '45–54', comp: 13.5, pob: 14.5, tasa: 34.6, idx: 0.93 },
      { g: '55–64', comp: 6.3, pob: 10.0, tasa: 23.7, idx: 0.64 },
      { g: '65+', comp: 2.1, pob: 6.1, tasa: 12.9, idx: 0.35 }
    ],
    estrato: [
      { g: 'Bajo', comp: 7.8, pob: 14.5, tasa: 20.0, idx: 0.54 },
      { g: 'Medio bajo', comp: 43.2, pob: 48.3, tasa: 33.4, idx: 0.89 },
      { g: 'Medio alto', comp: 28.9, pob: 24.4, tasa: 44.3, idx: 1.19 },
      { g: 'Alto', comp: 20.1, pob: 12.9, tasa: 58.4, idx: 1.56 }
    ],
    sexo: [
      { g: 'Mujeres', comp: 50.9, pob: 52.4, tasa: 36.2, idx: 0.97 },
      { g: 'Hombres', comp: 49.1, pob: 47.6, tasa: 38.5, idx: 1.03 }
    ],
    smartphone: [
      { g: 'Usa smartphone', comp: 99.3, pob: 92.3, tasa: 40.2, idx: 1.08 },
      { g: 'No usa smartphone', comp: 0.7, pob: 7.7, tasa: 3.4, idx: 0.09 }
    ]
  };
  // tasa de compra entre usuarios de internet por entidad (perfilesENDUTIH.xlsx, hoja Entidad; PDF p. 9: CDMX 47.4, NL y Chih ≈46.7)
  const buyRate = {
    'Aguascalientes': 41.5, 'Baja California': 41.0, 'Baja California Sur': 43.4, 'Campeche': 30.7, 'Chiapas': 20.6, 'Chihuahua': 46.7,
    'Ciudad de México': 47.4, 'Coahuila': 39.1, 'Colima': 42.4, 'Durango': 37.9, 'Guanajuato': 31.6, 'Guerrero': 26.2, 'Hidalgo': 33.0,
    'Jalisco': 39.0, 'México': 36.5, 'Michoacán': 35.9, 'Morelos': 37.4, 'Nayarit': 43.2, 'Nuevo León': 46.7, 'Oaxaca': 28.5, 'Puebla': 32.5,
    'Querétaro': 43.9, 'Quintana Roo': 42.6, 'San Luis Potosí': 35.0, 'Sinaloa': 37.1, 'Sonora': 42.3, 'Tabasco': 33.6, 'Tamaulipas': 37.4,
    'Tlaxcala': 29.5, 'Veracruz': 33.6, 'Yucatán': 42.0, 'Zacatecas': 32.5
  };

  /* ---------- Sección 4 · Gráfica 4.1 (p. 10). % de compradores que adquirió cada categoría (respuesta múltiple) ---------- */
  const goods = {
    years: [2021, 2022, 2023, 2024, 2025],
    rows: [
      { k: 'Ropa, accesorios y uso personal', v: [68.0, 70.1, 71.7, 73.8, 74.4], focus: true },
      { k: 'Artículos para el hogar', v: [38.5, 40.7, 41.9, 45.8, 50.6], focus: true },
      { k: 'Higiene personal, belleza y cosméticos', v: [31.0, 33.8, 39.4, 42.6, 46.4], focus: true },
      { k: 'Transporte por plataforma', v: [31.9, 34.6, 31.9, 32.7, 38.2], focus: true },
      { k: 'Alimentos y bebidas', v: [34.7, 37.0, 34.7, 33.0, 37.5], focus: true },
      { k: 'Celulares o accesorios', v: [27.5, 29.3, 28.0, 27.9, 30.2], tech: true },
      { k: 'Entradas a eventos', v: [14.5, 23.3, 23.9, 21.3, 24.9] },
      { k: 'Artículos de salud', v: [20.8, 19.4, 19.0, 18.6, 23.7] },
      { k: 'Aparatos electrónicos', v: [25.2, 27.0, 19.1, 19.7, 21.2], focus: true, tech: true },
      { k: 'Vehículos o refacciones', v: [13.9, 15.7, 17.3, 17.1, 20.0] },
      { k: 'Productos de viaje', v: [15.8, 18.5, 18.2, 16.9, 19.2] },
      { k: 'Programas o aplicaciones', v: [17.0, 16.5, 14.8, 15.0, 17.5], tech: true },
      { k: 'Libros', v: [16.9, 16.8, 16.0, 16.3, 16.7] },
      { k: 'Música y videos', v: [14.7, 14.1, 14.9, 14.3, 14.8] },
      { k: 'Consolas y videojuegos', v: [9.7, 9.1, 9.2, 9.3, 9.2], tech: true },
      { k: 'Computadoras, laptops o tablets', v: [8.0, 8.0, 7.5, 7.1, 7.7], focus: true, tech: true },
      { k: 'Productos financieros', v: [3.4, 4.5, 4.2, 4.2, 5.3] },
      { k: 'Equipo fotográfico / telecom.', v: [3.8, 3.6, 3.4, 3.2, 3.7], tech: true }
    ]
  };

  /* ---------- Sección 5 · Gráfica 5.1 (p. 11) — base: usuarios de internet que NO compraron en línea ---------- */
  const noBuy = [
    { k: 'Prefiere realizarlo en persona', a: 31.6, b: 34.4, kind: 'pref' },
    { k: 'No le interesa o no lo necesita', a: 24.0, b: 20.3, kind: 'pref' },
    { k: 'No sabe cómo hacerlo', a: 15.6, b: 18.3, kind: 'know' },
    { k: 'No le permiten realizarlo', a: 9.8, b: 12.8, kind: 'other' },
    { k: 'Desconfía de la seguridad (datos/tarjetas)', a: 12.4, b: 8.2, kind: 'trust' },
    { k: 'No se considera con la edad suficiente', a: null, b: 6.9, kind: 'other' },
    { k: 'Desconfía de la calidad', a: 6.9, b: 5.6, kind: 'trust' },
    { k: 'Falta de recursos económicos', a: null, b: 5.1, kind: 'other' },
    { k: 'Sin tarjeta o banca en línea', a: 3.0, b: 3.0, kind: 'pay' }
  ];
  /* Gráfica 5.2 (p. 12) — base: personas que compraron en línea y tuvieron algún problema */
  const problems = {
    years: [2022, 2023, 2024, 2025],
    rows: [
      { k: 'Relacionado con la entrega', v: [55.4, 57.9, 63.2, 60.0] },
      { k: 'Calidad del producto', v: [30.1, 29.5, 30.7, 31.9] },
      { k: 'Estado del producto', v: [20.1, 22.2, 23.4, 24.2] },
      { k: 'Seguridad del pago', v: [24.9, 19.3, 15.9, 17.7], sec: true },
      { k: 'Seguridad de datos personales', v: [8.6, 6.6, 4.6, 6.0], sec: true }
    ]
  };

  /* ---------- Sección 6 ---------- */
  // 6.1 (p. 14): % de usuarios de internet 6+ que desconfían (calidad/seguridad de compra o seguridad del pago).
  // Valores por entidad: Desconfianza_por_estado_y_edad_ENDUTIH2025.xlsx; los 10 extremos impresos en el PDF coinciden.
  const distrust = {
    'Aguascalientes': 5.7, 'Baja California': 8.9, 'Baja California Sur': 5.3, 'Campeche': 11.6, 'Coahuila': 7.9, 'Colima': 7.8,
    'Chiapas': 9.5, 'Chihuahua': 4.5, 'Ciudad de México': 10.6, 'Durango': 9.0, 'Guanajuato': 8.9, 'Guerrero': 12.8, 'Hidalgo': 9.8,
    'Jalisco': 8.1, 'México': 13.2, 'Michoacán': 7.1, 'Morelos': 10.0, 'Nayarit': 6.8, 'Nuevo León': 7.6, 'Oaxaca': 15.2, 'Puebla': 15.3,
    'Querétaro': 8.8, 'Quintana Roo': 10.9, 'San Luis Potosí': 10.5, 'Sinaloa': 5.6, 'Sonora': 6.6, 'Tabasco': 9.7, 'Tamaulipas': 3.4,
    'Tlaxcala': 16.2, 'Veracruz': 9.3, 'Yucatán': 7.1, 'Zacatecas': 5.2
  };
  const distrustRegion = { Nacional: 9.7, Norte: 6.6, 'Centro Norte': 7.4, Centro: 11.9, Sur: 10.6 };
  // 6.2 (p. 15): índice acumulado = suma de tasas de 8 grupos de edad (NO es % de personas)
  const distrustAgeSum = {
    'Zacatecas': 42.7, 'Yucatán': 57.9, 'Veracruz': 73.5, 'Tlaxcala': 122.8, 'Tamaulipas': 28.9, 'Tabasco': 76.8, 'Sonora': 54.3, 'Sinaloa': 46.7,
    'San Luis Potosí': 84.8, 'Quintana Roo': 86.0, 'Querétaro': 66.7, 'Puebla': 123.5, 'Oaxaca': 117.4, 'Nuevo León': 67.3, 'Nayarit': 52.8,
    'Morelos': 78.9, 'Michoacán': 57.0, 'México': 98.3, 'Jalisco': 63.5, 'Hidalgo': 78.0, 'Guerrero': 103.7, 'Guanajuato': 68.9, 'Durango': 71.0,
    'Ciudad de México': 76.5, 'Chihuahua': 37.8, 'Chiapas': 82.0, 'Colima': 64.6, 'Coahuila': 65.9, 'Campeche': 87.7, 'Baja California Sur': 41.2,
    'Baja California': 67.1, 'Aguascalientes': 50.6
  };
  // 6.3 (p. 16): promedio de las 32 entidades por grupo de edad (%)
  const distrustAge = [['6–11', 1.2], ['12–17', 4.4], ['18–24', 7.3], ['25–34', 8.5], ['35–44', 12.3], ['45–54', 12.8], ['55–64', 13.1], ['65+', 12.3]];
  // 6.4 (p. 17) y 6.5 (p. 18): % de personas que NO compran en línea que mencionan cada razón
  const reasonsSex = [
    ['Prefiere hacerlo en persona', 34.3, 34.4], ['No le interesa o no lo necesita', 19.8, 20.8], ['No sabe cómo hacerlo', 19.4, 17.0],
    ['No le permiten hacerlo', 11.8, 13.9], ['Desconfianza (calidad o seguridad)', 12.0, 12.3], ['Falta de recursos económicos', 5.6, 4.6],
    ['No tiene tarjeta ni banca en línea', 3.1, 2.9]
  ];
  const reasonsRural = [
    ['Prefiere hacerlo en persona', 29.2, 35.9], ['No sabe cómo hacerlo', 24.4, 16.4], ['No le interesa o no lo necesita', 20.9, 20.1],
    ['No le permiten hacerlo', 10.4, 13.5], ['Desconfianza (calidad o seguridad)', 10.4, 12.6], ['Falta de recursos económicos', 6.5, 4.7],
    ['No tiene tarjeta ni banca en línea', 4.2, 2.6]
  ];
  // 6.6 (p. 20): lectura aproximada del documento (enteros), % del propio estrato
  const reasonsStrata = {
    groups: ['Bajo', 'Medio bajo', 'Medio alto', 'Alto'],
    rows: [['Prefiere hacerlo en persona', [27, 34, 40, 39]], ['No sabe cómo hacerlo', [26, 18, 14, 13]],
      ['No le interesa o no lo necesita', [21, 21, 19, 21]], ['Falta de recursos económicos', [7, 6, 4, 2]]]
  };
  // 6.7 (p. 20): razón predominante por escolaridad
  const reasonsEdu = [['Primaria', 28.9, 'No sabe cómo hacerlo'], ['Secundaria', 36.7, 'Prefiere en persona'],
    ['Media superior', 44.9, 'Prefiere en persona'], ['Superior / posgrado', 52.7, 'Prefiere en persona']];

  /* ---------- Sección 7 ---------- */
  const codiAltas = { years: ['2020*', '2021', '2022', '2023', '2024', '2025', '2026†'], v: [4.2, 5.1, 3.8, 3.1, 1.8, 1.6, 0.9] }; // millones (7.1, p. 22)
  const codiUse = { years: ['2020*', '2021', '2022', '2023', '2024', '2025', '2026†'], pay: [179.2, 434.5, 441.8, 486.5, 457.1, 422.0, 293.0], cob: [141.8, 341.6, 194.6, 162.4, 84.3, 42.8, 34.8] }; // miles (7.2, p. 23)
  // 7.3 (p. 24) 2025: % de quienes pagan por internet
  const payMethods = [['Tarjeta de débito', 76.9], ['Transferencias bancarias', 58.8], ['Tarjeta de crédito', 33.2], ['Medios electrónicos', 23.0], ['CoDi', 6.1], ['Tarjeta de regalo o vale', 4.0], ['Otro medio', 1.9]];
  // 7.4–7.6 (pp. 25–26): % población 6+ — nacional y regiones (texto del PDF)
  const requisites = {
    groups: ['Nacional', 'Norte', 'Centro Norte', 'Centro', 'Sur'],
    internet: [86.0, 90.3, 87.4, 86.6, 80.4],
    smartphone: [86.5, 88.7, 87.6, 87.0, 82.6],
    banca: [32.6, 38.8, 31.9, 33.4, 26.8]
  };
  // 7.6 por entidad (Mapa_Banca_combinado.html; extremos coinciden con el PDF)
  const banca = {
    'Aguascalientes': 37.2, 'Baja California Sur': 46.8, 'Baja California': 42.5, 'Campeche': 33.2, 'Chiapas': 16.6, 'Chihuahua': 39.8, 'Ciudad de México': 49.6,
    'Coahuila': 29.1, 'Colima': 37.3, 'Durango': 30.9, 'Guanajuato': 23.5, 'Guerrero': 20.5, 'Hidalgo': 28.1, 'Jalisco': 33.9, 'Michoacán': 26.0, 'Morelos': 28.2,
    'México': 33.1, 'Nayarit': 34.5, 'Nuevo León': 41.1, 'Oaxaca': 22.5, 'Puebla': 24.4, 'Querétaro': 37.9, 'Quintana Roo': 43.8, 'San Luis Potosí': 29.7,
    'Sinaloa': 34.3, 'Sonora': 44.1, 'Tabasco': 36.7, 'Tamaulipas': 34.1, 'Tlaxcala': 27.9, 'Veracruz': 29.8, 'Yucatán': 32.1, 'Zacatecas': 22.4
  };
  // Anexo p. 40: % de quienes pagan por internet que han usado CoDi (Mapa_Interactivo_CoDi_Final.html; extremos coinciden)
  const codiState = {
    'Aguascalientes': 5.32, 'Baja California Sur': 6.11, 'Baja California': 4.51, 'Campeche': 4.83, 'Chiapas': 5.90, 'Chihuahua': 3.55, 'Ciudad de México': 5.56,
    'Coahuila': 4.12, 'Colima': 5.54, 'Durango': 8.61, 'Guanajuato': 3.65, 'Guerrero': 4.47, 'Hidalgo': 8.33, 'Jalisco': 7.49, 'Michoacán': 5.79, 'Morelos': 4.37,
    'México': 6.40, 'Nayarit': 4.90, 'Nuevo León': 8.59, 'Oaxaca': 7.01, 'Puebla': 9.05, 'Querétaro': 7.29, 'Quintana Roo': 4.23, 'San Luis Potosí': 7.98,
    'Sinaloa': 3.74, 'Sonora': 5.55, 'Tabasco': 7.97, 'Tamaulipas': 3.58, 'Tlaxcala': 5.49, 'Veracruz': 4.18, 'Yucatán': 5.09, 'Zacatecas': 12.57
  };
  // promedios nacional y regionales del mapa de CoDi por entidad (ponderados por población que paga por internet)
  const codiRegion = { Nacional: 6.1, Norte: 5.5, 'Centro Norte': 6.8, Centro: 6.3, Sur: 5.3 };
  // 7.7 (p. 27): sucursales, 2026 (CNBV)
  const branches = [['Banco del Bienestar', 3149], ['Banco Azteca', 2007], ['BBVA', 1601], ['Bancoppel', 1385], ['Banamex', 1263], ['Banorte', 1223], ['Santander', 962], ['HSBC', 675], ['Inbursa', 611], ['Scotiabank', 407], ['Banco del Bajío', 334]];

  /* ---------- Sección 8 · Cuadro 8.1 (p. 29) ---------- */
  const logit = {
    n: 57677, auc: 0.865, r2: 0.183, F: 143.9, mean: 1.85, pop: 121.4,
    rows: [
      { k: 'Desconfianza o problema de seguridad en pagos o datos', short: 'Desconfianza', me: -1.28, lo: -2.29, hi: -0.27, ci: '−2.29 a −0.27 pp', sig: '**', unit: 'pp, frente a quien no desconfía',
        read: 'Quienes desconfían de la seguridad al comprar en línea, o ya tuvieron un problema con la seguridad de sus pagos o datos, tienen una probabilidad 1.28 pp menor de usar CoDi. Frente a un uso promedio de 1.85%, equivale a cerca de 70% menos en términos relativos.',
        caution: 'Asociación, no efecto causal. Sugiere que quienes son sensibles al riesgo no distinguen a CoDi de otros pagos digitales.' },
      { k: 'Habilidades digitales (por cada habilidad adicional)', short: 'Habilidades digitales', me: 0.34, lo: null, hi: null, sig: '***', unit: 'pp por habilidad adicional',
        read: 'Determinante con mayor solidez estadística. Entre dos personas con 10 habilidades de diferencia, la probabilidad es 3.4 pp mayor para la más capacitada: casi el doble del uso promedio.',
        caution: 'El efecto por habilidad es pequeño; la lectura acumulada (×10) es una extrapolación lineal del propio documento.' },
      { k: 'Usa teléfono inteligente', short: 'Smartphone', me: 3.09, lo: 0.6, hi: 5.6, ci: '0.6 a 5.6 pp', sig: '**', unit: 'pp, frente a quien no lo usa',
        read: 'Usar teléfono inteligente se asocia con +3.09 pp. Supera el uso promedio: contar con él más que duplica la probabilidad de usar CoDi.',
        caution: 'Es el efecto menos preciso del modelo (IC 95%: 0.6 a 5.6 pp). Leer como dirección, no como magnitud exacta.' },
      { k: 'Usa banca móvil', short: 'Banca móvil', me: 2.12, lo: null, hi: null, sig: '***', unit: 'pp, frente a quien no la usa',
        read: 'Usar banca móvil se asocia con +2.12 pp. Muestra dónde se rompe la cadena: 86.5% usa smartphone, pero solo 32.6% usa banca en línea o móvil.',
        caution: 'Asociación. CoDi opera desde la app bancaria, por lo que ambas variables están ligadas por diseño.' },
      { k: 'Edad (por cada año adicional)', short: 'Edad', me: -0.013, lo: null, hi: null, sig: '**', unit: 'pp por año',
        read: 'Efecto más pequeño del modelo: −0.013 pp por año. Entre dos personas con 30 años de diferencia, la probabilidad es cerca de 0.4 pp menor para la de mayor edad (≈ una quinta parte del uso promedio).',
        caution: 'Unidad distinta (por año): su barra se ve pequeña por definición, no por irrelevancia.' }
    ]
  };

  /* ---------- Sección 9 · Fases (pp. 37–39). Asignación derivada aplicando el criterio documentado a la Gráfica 2.4 ---------- */
  function phaseOf(st) {
    if (st === 'Nuevo León') return 0;
    const p = penetration[st];
    if (p >= 24) return 1; if (p >= 15) return 2; return 3;
  }

  /* ---------- Proyección del VABCOEL del comercio al por menor (millones de pesos de 2018) ----------
     Observado: INEGI, VABCOEL base 2018 (BD_VABCOEL.xlsx, renglón «Comercio al por menor»).
     Alto: Holt (α=0.8, β=0.2; nivel y tendencia iniciales por regresión sobre 2013–2018).
     Bajo: tendencia lineal MCO 2020–2024. Base: promedio de ambos.
     Los valores 2030 (805,302 / 736,430 / 667,558) son los de la investigación; los años
     intermedios se recalcularon con la misma metodología y reproducen exactamente esos valores. */
  const projection = {
    years: [2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024],
    labels: ['2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024P'],
    obs: [67925.163, 62970.161, 89483.787, 107195.119, 126718.741, 136018.25, 308445.906, 402822.906, 328529.677, 369448.624, 390769.766, 535538.057],
    fyears: [2025, 2026, 2027, 2028, 2029, 2030],
    alto: [562048, 610699, 659350, 708000, 756651, 805302],
    base: [532886, 573595, 614303, 655012, 695721, 736430],
    bajo: [503723, 536490, 569257, 602024, 634791, 667558]
  };

  /* ---------- Bibliografía (versión definitiva de la investigación) ---------- */
  const biblio = [
    // Estadística oficial
    { c: 'inegi', a: 'Instituto Nacional de Estadística y Geografía e Instituto Federal de Telecomunicaciones', y: '2015–2025', t: 'Encuesta Nacional sobre Disponibilidad y Uso de Tecnologías de la Información en los Hogares (ENDUTIH)', s: '[Conjunto de datos]', u: 'https://www.inegi.org.mx/programas/dutih/' },
    { c: 'inegi', a: 'Instituto Nacional de Estadística y Geografía', y: '2025', t: 'Encuesta Nacional sobre Disponibilidad y Uso de Tecnologías de la Información en los Hogares (ENDUTIH) 2025. Descriptor de archivos (FD) y base de datos', s: 'INEGI', u: 'https://www.inegi.org.mx/programas/dutih/' },
    { c: 'inegi', a: 'Instituto Nacional de Estadística y Geografía', y: '2015–2025', t: 'ENDUTIH 2015–2025. Usuarios de internet, por entidad federativa, según principales usos', s: '[Tabulados]', u: 'https://www.inegi.org.mx/programas/dutih/' },
    { c: 'inegi', a: 'Instituto Nacional de Estadística y Geografía', y: '2013–2024', t: 'Valor agregado bruto del comercio electrónico en México (VABCOEL)', s: '[Tabulados]', u: 'https://www.inegi.org.mx/contenidos/saladeprensa/boletines/2026/vabcoel/vabcoel2024_RR.pdf' },
    { c: 'inegi', a: 'Instituto Nacional de Estadística y Geografía', y: '2013–2024', t: 'Producto Interno Bruto trimestral, base 2018', s: '[Tabulados]', u: 'https://www.inegi.org.mx/contenidos/saladeprensa/boletines/2026/vabcoel/vabcoel2024_RR.pdf' },
    { c: 'inegi', a: 'Instituto Nacional de Estadística y Geografía', y: '2026', t: 'Encuesta Intercensal (EIC) 2025', s: 'Reporte de resultados 37/26', u: 'https://www.inegi.org.mx/contenidos/saladeprensa/boletines/2026/ei/EIC2025-def_RR.pdf' },
    { c: 'inegi', a: 'Instituto Nacional de Estadística y Geografía', y: '2015–2025', t: 'Directorio Estadístico Nacional de Unidades Económicas (DENUE)', s: '[Conjunto de datos]', u: 'https://www.inegi.org.mx/app/mapa/denue/' },
    { c: 'inegi', a: 'Instituto Nacional de Estadística y Geografía', y: '2021', t: 'Censo de Población y Vivienda 2020', s: '[Conjunto de datos]', u: 'https://www.inegi.org.mx/programas/ccpv/2020/' },
    // Banco de México y CoDi
    { c: 'banxico', a: 'Banco de México', y: '2026', t: 'Sistema de Información Económica: Estadísticas de CoDi', s: '[Conjunto de datos]', u: 'https://www.banxico.org.mx/SieInternet/' },
    { c: 'banxico', a: 'Banco de México', y: 's. f.', t: 'Sistema de Información Económica: CoDi, Cuentas validadas (CF881)', s: '[Conjunto de datos]. SIE Banxico', u: 'https://www.banxico.org.mx/SieInternet/consultarDirectorioInternetAction.do?sector=21&accion=consultarCuadro&idCuadro=CF881&locale=es' },
    { c: 'banxico', a: 'Banco de México', y: 's. f.', t: 'Sistema de Información Económica: CoDi, Operaciones realizadas a través de CoDi (CF884)', s: '[Conjunto de datos]. SIE Banxico', u: 'https://www.banxico.org.mx/SieInternet/consultarDirectorioInternetAction.do?sector=21&accion=consultarCuadro&idCuadro=CF882&locale=es' },
    { c: 'banxico', a: 'Banco de México', y: 's. f.', t: 'Información sobre CoDi Cobro Digital', s: 'Banco de México', u: 'https://www.banxico.org.mx/sistemas-de-pago/codi-cobro-digital-banco-me.html' },
    { c: 'banxico', a: 'Banco de México', y: 's. f.', t: '¿Qué es CoDi?', s: 'Banco de México', u: 'https://www.codi.org.mx/secundarias/que_es_codi.html' },
    { c: 'banxico', a: 'Banca Digital', y: 's. f.', t: '¿Qué es pago CoDi y para qué sirve?', s: 'BBVA México', u: 'https://www.bbva.mx/educacion-financiera/banca-digital/app-bbva-que-es-codi.html' },
    // Sistema financiero e inclusión
    { c: 'fin', a: 'Comisión Nacional Bancaria y de Valores', y: '2025', t: 'Encuesta Nacional de Inclusión Financiera (ENIF) 2024: Reporte de resultados', s: 'CNBV', u: 'https://www.cnbv.gob.mx/Inclusi%C3%B3n/Anexos%20Inclusin%20Financiera/Reporte_ENIF2024.pdf' },
    { c: 'fin', a: 'Comisión Nacional Bancaria y de Valores e Instituto Nacional de Estadística y Geografía', y: '2024', t: 'Encuesta Nacional de Inclusión Financiera (ENIF) 2024. Reporte de resultados (ENIF2024_RR)', s: 'Documento de trabajo citado como ENIF2024_RR.pdf', u: '' },
    { c: 'fin', a: 'Comisión Nacional Bancaria y de Valores', y: '2023', t: 'Bases de datos de Inclusión Financiera', s: 'Gobierno de México', u: 'https://www.gob.mx/cnbv/acciones-y-programas/bases-de-datos-de-inclusion-financiera' },
    { c: 'fin', a: 'Comisión Nacional Bancaria y de Valores', y: '2025', t: 'Inclusión Financiera', s: 'Gobierno de México', u: 'https://www.gob.mx/cnbv/acciones-y-programas/inclusion-financiera-25319' },
    { c: 'fin', a: 'Banco del Bienestar', y: '2024', t: 'Debicuenta Clásica', s: 'Gobierno de México', u: 'https://www.gob.mx/bancodelbienestar/documentos/debicuenta-basica-373673?state=published' },
    { c: 'fin', a: 'Azevedo, V., Garbay Flores, S. A., Vera-Cossio, D. A., Vlaicu, R., & Zárate Moreno, A. M.', y: '2025', t: 'Más allá del dinero en efectivo: La revolución de los pagos digitales en América Latina y el Caribe', s: 'Banco Interamericano de Desarrollo', u: 'https://doi.org/10.18235/0013688' },
    // Política pública y marco legal
    { c: 'pol', a: 'Senado de la República', y: '2026', t: 'Aprueba Senado proyecto para expedir nueva Ley de Economía Digital', s: 'Senado de la República', u: 'https://comunicacionsocial.senado.gob.mx/informacion/comunicados/16575-aprueba-senado-proyecto-para-expedir-nueva-ley-de-economia-digital' },
    { c: 'pol', a: 'Gobierno de México', y: '2026', t: 'Nueva Ley de Economía Digital ayudará a la seguridad, la eficiencia y a la formalización de comercios y productos: presidenta', s: 'Gobierno de México', u: 'https://www.gob.mx/presidencia/prensa/nueva-ley-de-economia-digital-ayudara-a-la-seguridad-la-eficiencia-y-a-la-formalizacion-de-comercios-y-productos-presidenta' },
    { c: 'pol', a: 'Secretaría de Bienestar', y: '2021', t: 'Servidores de la Nación, los programas sociales hasta donde nunca habían llegado', s: 'Gobierno de México', u: 'https://www.gob.mx/bienestar/articulos/servidores-de-la-nacion-los-programas-sociales-hasta-donde-nunca-habian-llegado?idiom=es' },
    { c: 'pol', a: 'Procuraduría Federal del Consumidor', y: '2023', t: 'La compra en línea o en tienda, ventajas y desventajas', s: 'Gobierno de México', u: 'https://www.gob.mx/profeco/documentos/la-compra-en-linea-o-en-tienda-ventajas-y-desventajas?state=published' },
    // Literatura académica
    { c: 'acad', a: 'Pavlou, P. A.', y: '2003', t: 'Consumer acceptance of electronic commerce: Integrating trust and risk with the technology acceptance model', s: 'International Journal of Electronic Commerce, 7(3), 101–134', u: 'https://doi.org/10.1080/10864415.2003.11044275' },
    { c: 'acad', a: 'Amezcua Núñez, J. B., De la Peña De León, A., Saucedo Soto, J. M., & Herrera Arizmendi, P. J.', y: '2022', t: 'Dificultad de uso y confianza percibida, determinantes en el pago electrónico móvil durante el confinamiento', s: 'Revista Academia & Negocios, 8(2), 125–138', u: 'https://doi.org/10.29393/RAN8-10DUJP40010' },
    { c: 'acad', a: 'Arredondo Hidalgo, M. G., Ortiz Velázquez, M. N., Oritiz Salazar, H. A., Rivera Perez, O. S., & Anaya Garcia, J. D.', y: '2025', t: 'El papel de la última milla en el impulso del e-commerce y su impacto en el crecimiento económico mexicano post-pandemia', s: 'Boletín Científico de las Ciencias Económico Administrativas del ICEA, 13(Especial), 61–70', u: 'https://doi.org/10.29057/icea.v13iEspecial.13139' },
    { c: 'acad', a: 'Cámara Colombiana de Comercio Electrónico', y: '2024', t: '¿Qué es el Comercio Electrónico?', s: 'Cámara Colombiana de Comercio Electrónico', u: 'https://ccce.org.co/noticias/que-es-el-comercio-electronico/' },
    // Prensa especializada
    { c: 'prensa', a: 'Aguilar Carrasco, C.', y: '2026, 19 de junio', t: 'Compras digitales: los errores que pueden comprometer tu dinero y tu identidad', s: 'El Economista', u: 'https://www.eleconomista.com.mx/finanzaspersonales/comprar-linea-forma-segura-evitar-roben-informacion-financiera-20260619-819187.html' },
    { c: 'prensa', a: 'Hernández, A.', y: '2026', t: 'México quiere emular a Brasil y masificar en un año los pagos digitales', s: 'Expansión', u: 'https://expansion.mx/economia/2026/09/29/mexico-quiere-emular-a-brasil-y-masificar-en-un-ano-los-pagos-digitales' },
    { c: 'prensa', a: 'Juárez, E.', y: '2026', t: 'CoDi, el sistema de pagos electrónicos que no repunta y ahora busca ser homologado con otros', s: 'El Economista', u: 'https://www.eleconomista.com.mx/sectorfinanciero/codi-sistema-pagos-electronicos-repunta-busca-homologado-otros-20260412-808377.html' },
    { c: 'prensa', a: 'Juárez, E.', y: '2026', t: 'La ABM ve positiva la iniciativa «México Paga Digital»', s: 'El Economista', u: 'https://www.eleconomista.com.mx/sectorfinanciero/abm-ve-positiva-iniciativa-mexico-paga-digital-20261028-841079.html' },
    { c: 'prensa', a: 'Fredes, F. M.', y: '2026', t: 'Explicador: ¿Cómo cambiará la forma de hacer pagos en México con la Ley de Economía Digital?', s: 'El Economista', u: 'https://www.eleconomista.com.mx/explicadores/ley-economia-digital-explicada-20261006-837246.html' },
    { c: 'prensa', a: 'Saucedo, J.', y: '2026', t: 'Pagos digitales obligatorios serán graduales para evitar distorsiones en sistema financiero: ABM', s: 'Grupo Milenio', u: 'https://www.milenio.com/negocios/abm-pagos-digitales-obligatorios-seran-graduales' },
    { c: 'prensa', a: 'Redacción', y: '2025', t: 'Banco del Bienestar estrenará funciones en 2026: Esto es todo lo que podrás hacer desde la app', s: 'El Financiero Bloomberg', u: 'https://www.elfinanciero.com.mx/mis-finanzas/2025/11/26/banco-del-bienestar-estrenara-funciones-en-2026-esto-es-todo-lo-que-podras-hacer-desde-la-app/' },
    { c: 'prensa', a: 'Romero, V.', y: '2026', t: 'Banco del Bienestar actualiza su app con la función que muchos esperaban', s: 'Xataka México', u: 'https://www.xataka.com.mx/banca-digital/banco-bienestar-actualiza-su-app-funcion-que-muchos-esperaban' },
    { c: 'prensa', a: 'León, I.', y: '2026', t: 'Banco del Bienestar lanza nueva app con pagos digitales y CoDi para beneficiarios de la Pensión del Bienestar', s: 'Mi Bolsillo', u: 'https://www.mibolsillo.com/Retiro/banco-del-bienestar-lanza-nueva-app-con-pagos-digitales-y-codi-para-beneficiarios-de-la-pension-del-bienestar-20260925-0042.html' }
  ];
  const biblioCats = { inegi: 'Estadística oficial (INEGI)', banxico: 'Banco de México y CoDi', fin: 'Sistema financiero e inclusión', pol: 'Política pública y marco legal', acad: 'Literatura académica y conceptual', prensa: 'Prensa especializada' };

  // registros del directorio de sucursales del Banco del Bienestar por entidad (1er trim. 2026; ver sucursales-bienestar.js)
  const bbByState = {"Ciudad de México":88, "México":279, "Guerrero":136, "Campeche":26, "Chihuahua":72, "Sonora":73, "San Luis Potosí":77, "Veracruz":292, "Colima":17, "Sinaloa":65, "Durango":47, "Yucatán":100, "Baja California Sur":10, "Tamaulipas":61, "Baja California":26, "Nuevo León":55, "Michoacán":174, "Oaxaca":287, "Hidalgo":135, "Puebla":261, "Querétaro":30, "Coahuila":35, "Chiapas":233, "Nayarit":34, "Tabasco":45, "Guanajuato":106, "Jalisco":152, "Zacatecas":74, "Tlaxcala":74, "Aguascalientes":17, "Morelos":45, "Quintana Roo":24};

  return { bbByState, projection, biblio, biblioCats, codiRegion, vabcoel, region, buyerYears, buyers, buyersNational, penetration, profile, buyRate, goods, noBuy, problems,
    distrust, distrustRegion, distrustAgeSum, distrustAge, reasonsSex, reasonsRural, reasonsStrata, reasonsEdu,
    codiAltas, codiUse, payMethods, requisites, banca, codiState, branches, logit, phaseOf };
})();
