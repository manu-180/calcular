// Fechas de pago del medio aguinaldo (SAC 1ª cuota) 2026, por jurisdicción.
// REGLA DE ORO: cada fila lleva su fuente y su estado. "oficial" = sitio del gobierno;
// "anunciada" = medios de junio 2026 citando el anuncio oficial; "sin-anuncio" = nada al 12/6.
// OJO con las trampas detectadas en el research: notas de gobiernos provinciales de 2024/2025
// siguen rankeando (prensa.cba.gov.ar, rionegro.gov.ar, santafe.gob.ar) — NO usarlas.
// Research completo: docs/research del repo (verificación 2026-06-12).

export const FECHAS_ACTUALIZADO_EL = "12 de junio de 2026";

// Privados: art. 122 LCT (texto Ley 27.073) + tolerancia de 4 días hábiles (art. 128).
// Conteo verificado con el calendario real: mié 1/7, jue 2/7, vie 3/7 y lun 6/7 son hábiles
// (el feriado del 9/7 cae después) → tope efectivo lunes 6/7/2026.
export const PRIVADOS_2026 = {
  vencimientoLegal: "martes 30 de junio de 2026",
  topeConTolerancia: "lunes 6 de julio de 2026",
};

// ANSES: el SAC se acredita junto con la mensualidad de junio, por terminación de DNI.
// Mínima junio 2026: $403.317,99 + SAC $201.659 + bono $70.000 (Decreto 399/2026) = $674.976,99.
export const ANSES_2026 = {
  minimas: [
    ["DNI terminados en 0", "8 de junio"],
    ["DNI terminados en 1", "9 de junio"],
    ["DNI terminados en 2", "10 de junio"],
    ["DNI terminados en 3", "11 de junio"],
    ["DNI terminados en 4", "12 de junio"],
    ["DNI terminados en 5", "16 de junio"],
    ["DNI terminados en 6", "17 de junio"],
    ["DNI terminados en 7", "18 de junio"],
    ["DNI terminados en 8", "19 de junio"],
    ["DNI terminados en 9", "22 de junio"],
  ],
  superiores: [
    ["DNI terminados en 0 y 1", "23 de junio"],
    ["DNI terminados en 2 y 3", "24 de junio"],
    ["DNI terminados en 4 y 5", "25 de junio"],
    ["DNI terminados en 6 y 7", "26 de junio"],
    ["DNI terminados en 8 y 9", "29 de junio"],
  ],
  minimaJunio: "$403.318",
  sacMinima: "$201.659",
  bono: "$70.000 (Decreto 399/2026: mínimas del SIPA, PUAM y PNC)",
  totalMinima: "$674.977",
};

export type EstadoFecha = "oficial" | "anunciada" | "sin-anuncio";

export type FechaJurisdiccion = {
  jurisdiccion: string;
  fecha: string;
  estado: EstadoFecha;
  fuenteNombre: string;
  fuenteUrl?: string;
};

export const FECHAS_PROVINCIAS_2026: FechaJurisdiccion[] = [
  {
    jurisdiccion: "Chaco",
    fecha: "16 de junio (en cajeros desde las 21 h)",
    estado: "oficial",
    fuenteNombre: "Gobierno del Chaco (2/6/2026)",
    fuenteUrl:
      "https://chaco.gob.ar/noticia-el-gobierno-provincial-anuncio-el-pago-del-aguinaldo-para-el-16-de-junio-2026-06-02-10-59",
  },
  {
    jurisdiccion: "Santiago del Estero",
    fecha: "16 de junio (+ bono provincial de $600.000 en dos cuotas: 23/6 y 23/7)",
    estado: "oficial",
    fuenteNombre: "Gobierno de Santiago del Estero (8/6/2026)",
    fuenteUrl:
      "https://sde.gob.ar/2026/06/08/el-gobernador-suarez-anuncio-el-cronograma-de-pagos-de-aguinaldo-bono-extraordinario-y-haberes/",
  },
  {
    jurisdiccion: "Salta",
    fecha: "16 de junio",
    estado: "anunciada",
    fuenteNombre: "Ministerio de Economía de Salta (cronograma oficial 06/2026)",
    fuenteUrl: "https://www.salta.gob.ar/cronograma-de-pagos",
  },
  {
    jurisdiccion: "Corrientes",
    fecha: "desde el 16 de junio, por terminación de DNI",
    estado: "anunciada",
    fuenteNombre: "El Litoral, citando al ministro de Hacienda (29/5/2026)",
    fuenteUrl:
      "https://www.ellitoral.com.ar/actualidad/2026-5-29-9-49-0-aguinaldo-en-corrientes-grachot-confirmo-la-fecha-de-pago-a-empleados-estatales",
  },
  {
    jurisdiccion: "Tucumán",
    fecha: "escalonado del 17 al 20 de junio (17: Salud e IPV · 18: Seguridad, Educación y Adm. Central · 19: Judicial y Legislatura · 20: municipios y jubilados)",
    estado: "oficial",
    fuenteNombre: "Comunicación Tucumán (6/6/2026)",
    fuenteUrl:
      "https://www.comunicaciontucuman.gob.ar/noticia/economia-produccion/241451/ya-tiene-fecha-pago-primer-aguinaldo-2026-tucuman",
  },
  {
    jurisdiccion: "Santa Fe",
    fecha: "19 de junio (un solo día: activos, jubilados, docentes públicos y privados)",
    estado: "anunciada",
    fuenteNombre: "Rosario3, citando al Ministerio de Economía provincial (11/6/2026)",
    fuenteUrl:
      "https://www.rosario3.com/informaciongeneral/aguinaldo-en-santa-fe-cuando-se-paga-la-primera-cuota-y-quienes-lo-cobran-20260611-0019.html",
  },
  {
    jurisdiccion: "Mendoza",
    fecha: "19 de junio",
    estado: "anunciada",
    fuenteNombre: "MendoVoz / Los Andes, citando el anuncio del Ejecutivo (8/6/2026)",
    fuenteUrl:
      "https://www.mendovoz.com/actualidad/provinciales/2026/6/8/confirman-la-fecha-de-pago-del-aguinaldo-para-los-empleados-estatales-172786.html",
  },
  {
    jurisdiccion: "Misiones",
    fecha: "19 de junio (activos, pasivos, pensionados y retirados)",
    estado: "anunciada",
    fuenteNombre: "MisionesOnline, citando al gobernador (10/6/2026)",
    fuenteUrl: "https://misionesonline.net/2026/06/10/fecha-de-pago-del-aguinaldo/",
  },
  {
    jurisdiccion: "San Juan",
    fecha: "19 de junio",
    estado: "oficial",
    fuenteNombre: "Gobierno de San Juan (20/5/2026)",
    fuenteUrl:
      "https://sisanjuan.gob.ar/23-economia/2026-05-20/67603-el-gobierno-de-san-juan-informa-la-fecha-de-pago-del-medio-aguinaldo-a-estatales",
  },
  {
    jurisdiccion: "San Luis",
    fecha: "19 de junio",
    estado: "anunciada",
    fuenteNombre: "Relevamientos de Infobae (10/6) y MDZ (11/6)",
    fuenteUrl:
      "https://www.infobae.com/economia/2026/06/10/aguinaldo-de-junio-2026-para-estatales-cuando-se-cobra-provincia-por-provincia/",
  },
  {
    jurisdiccion: "Catamarca",
    fecha: "19 y 20 de junio",
    estado: "anunciada",
    fuenteNombre: "Relevamientos de Infobae (10/6) y MDZ (11/6)",
    fuenteUrl:
      "https://www.infobae.com/economia/2026/06/10/aguinaldo-de-junio-2026-para-estatales-cuando-se-cobra-provincia-por-provincia/",
  },
  {
    jurisdiccion: "Jujuy",
    fecha: "19 y 20 de junio",
    estado: "anunciada",
    fuenteNombre: "Relevamientos de Infobae (10/6) y MDZ (11/6)",
    fuenteUrl:
      "https://www.infobae.com/economia/2026/06/10/aguinaldo-de-junio-2026-para-estatales-cuando-se-cobra-provincia-por-provincia/",
  },
  {
    jurisdiccion: "Río Negro",
    fecha: "19-20 de junio (rango reportado; sin cronograma oficial 2026 publicado)",
    estado: "anunciada",
    fuenteNombre: "Infobae (10/6) y MDZ (11/6)",
    fuenteUrl:
      "https://www.infobae.com/economia/2026/06/10/aguinaldo-de-junio-2026-para-estatales-cuando-se-cobra-provincia-por-provincia/",
  },
  {
    jurisdiccion: "Entre Ríos",
    fecha: "20 de junio",
    estado: "anunciada",
    fuenteNombre: "El Cronista (9/6) y MDZ (11/6)",
    fuenteUrl:
      "https://www.cronista.com/economia-politica/aguinaldo-para-estatales-2026-cuando-cobro-todo-el-calendario-provincia-por-provincia/",
  },
  {
    jurisdiccion: "La Pampa",
    fecha: "23 de junio",
    estado: "anunciada",
    fuenteNombre: "Relevamientos de Infobae (10/6) y MDZ (11/6)",
    fuenteUrl:
      "https://www.infobae.com/economia/2026/06/10/aguinaldo-de-junio-2026-para-estatales-cuando-se-cobra-provincia-por-provincia/",
  },
  {
    jurisdiccion: "La Rioja",
    fecha: "entre el 18 y el 23 de junio",
    estado: "anunciada",
    fuenteNombre: "Relevamientos de Infobae (10/6) y MDZ (11/6)",
    fuenteUrl:
      "https://www.infobae.com/economia/2026/06/10/aguinaldo-de-junio-2026-para-estatales-cuando-se-cobra-provincia-por-provincia/",
  },
  {
    jurisdiccion: "Córdoba",
    fecha: "26 de junio (activos + jubilados de la Caja)",
    estado: "anunciada",
    fuenteNombre: "El Diario de Carlos Paz / Cadena 3, citando confirmación oficial (11/6/2026)",
    fuenteUrl:
      "https://www.eldiariodecarlospaz.com.ar/provincial/2026/6/11/cuando-cobraran-los-aguinaldos-los-empleados-publicos-de-cordoba-263624.html",
  },
  {
    jurisdiccion: "Neuquén",
    fecha: "última semana de junio (sin día oficial; los medios proyectan el 26/6)",
    estado: "anunciada",
    fuenteNombre: "LM Neuquén, citando al gobernador (9/6/2026)",
    fuenteUrl:
      "https://www.lmneuquen.com/neuquen/aguinaldo-estatales-neuquen-que-dijo-rolando-figueroa-la-fecha-pago-n1241426",
  },
  {
    jurisdiccion: "Buenos Aires (PBA)",
    fecha: "con los sueldos de junio, en la 2ª quincena (cronograma por organismo aún sin días exactos)",
    estado: "anunciada",
    fuenteNombre: "Anuncio a gremios del 11/6; cronograma en Tesorería GBA",
    fuenteUrl: "https://www.tesoreria.gba.gov.ar/cronograma-de-sueldos",
  },
  {
    jurisdiccion: "Nación (administración pública nacional)",
    fecha: "sin fecha específica anunciada (práctica habitual: junto al haber de junio)",
    estado: "sin-anuncio",
    fuenteNombre: "Relevamiento de El Cronista (9/6/2026)",
    fuenteUrl:
      "https://www.cronista.com/economia-politica/aguinaldo-para-estatales-2026-cuando-cobro-todo-el-calendario-provincia-por-provincia/",
  },
  { jurisdiccion: "CABA", fecha: "sin anuncio al 12/6", estado: "sin-anuncio", fuenteNombre: "—" },
  { jurisdiccion: "Chubut", fecha: "sin anuncio al 12/6", estado: "sin-anuncio", fuenteNombre: "—" },
  { jurisdiccion: "Formosa", fecha: "sin anuncio al 12/6", estado: "sin-anuncio", fuenteNombre: "—" },
  { jurisdiccion: "Santa Cruz", fecha: "sin anuncio al 12/6", estado: "sin-anuncio", fuenteNombre: "—" },
  {
    jurisdiccion: "Tierra del Fuego",
    fecha: "sin anuncio al 12/6",
    estado: "sin-anuncio",
    fuenteNombre: "—",
  },
];
