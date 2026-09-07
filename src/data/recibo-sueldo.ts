// Fuente de verdad del nuevo modelo de recibo de haberes (art. 140 LCT) según el
// Decreto 407/2026, reglamentario de la Ley 27.802 de Modernización Laboral.
// VERIFICADO contra el texto oficial (no blogs): B.O. 1/6/2026 (Nº 35920), vigente desde
// esa fecha. El texto literal del Anexo I, art. 5° estructura el recibo en 4 secciones y
// exige un resumen del costo laboral discriminado en, como mínimo, 7 rubros.
// NOTA: el "gráfico de torta" que mencionan los medios NO figura en el texto del Anexo III
// (solo dice "el recibo deberá ajustarse al modelo previsto en el presente anexo") → no se
// afirma como obligación. Este módulo es la única fuente: si cambia la norma, se toca acá.

export const DECRETO_407 = {
  nombre:
    "Decreto 407/2026 — reglamenta la Ley 27.802 de Modernización Laboral (art. 140 LCT)",
  bo: "https://www.boletinoficial.gob.ar/detalleAviso/primera/342620/20260601",
  texto: "https://www.argentina.gob.ar/normativa/nacional/decreto-407-2026-426270/texto",
  publicacion: "1 de junio de 2026",
  consultadoEl: "15 de junio de 2026",
};

// Las 4 secciones que el Decreto 407/2026 (Anexo I, art. 5°) exige para el recibo de haberes.
export const RECIBO_SECCIONES = [
  {
    letra: "a",
    titulo: "Empleador y trabajador",
    cuerpo:
      "Datos del empleador con su CUIT, y datos del trabajador con su CUIL, fecha de ingreso, antigüedad y categoría.",
  },
  {
    letra: "b",
    titulo: "Contribuciones a cargo del empleador",
    cuerpo:
      "Detalle de las contribuciones y/o conceptos abonados por el empleador por disposición legal o convencional. Es la novedad del nuevo recibo: ahora figura, además de lo que cobra el trabajador, lo que paga el empleador por encima del sueldo.",
  },
  {
    letra: "c",
    titulo: "Remuneración bruta y deducciones",
    cuerpo:
      "Total de la remuneración bruta que percibe el trabajador, junto con su determinación (cómo se llegó a ese número) y las deducciones correspondientes (aportes y retenciones).",
  },
  {
    letra: "d",
    titulo: "Remuneración neta",
    cuerpo: "El sueldo en mano, conforme el inciso g) del artículo 140 de la LCT.",
  },
];

// Rubros del "resumen de la composición total del costo laboral" (Decreto 407/2026, art. 5°).
// Son los conceptos a cargo del EMPLEADOR; las alícuotas dependen del Decreto 814/2001 y de
// la actividad, por eso se listan sin inventar montos.
export const RECIBO_RUBROS_COSTO = [
  "Sindical",
  "Seguridad social (jubilación)",
  "Obra social",
  "I.N.S.S.J.P. (PAMI)",
  "A.R.T. (riesgos del trabajo)",
  "Cámaras o entidades empresariales",
  "Otros rubros",
];
