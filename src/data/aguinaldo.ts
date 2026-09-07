// Datos del Sueldo Anual Complementario (aguinaldo).
// Fuente legal: Ley 23.041 y arts. 121 a 123 de la Ley de Contrato de Trabajo 20.744
// (art. 122 con el texto de la Ley 27.073: vencimientos 30/6 y 18/12).
// REGLA DE ORO: estos datos se verifican SOLO contra fuentes oficiales, nunca blogs.

export const AGUINALDO_FUENTES = {
  ley23041: {
    nombre: "Ley 23.041 — Sueldo Anual Complementario",
    url: "https://www.argentina.gob.ar/normativa/nacional/ley-23041-1983-28165",
  },
  lct: {
    nombre: "Ley de Contrato de Trabajo 20.744, arts. 121-123 (texto actualizado)",
    url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/25000-29999/25552/texact.htm",
  },
  consultadoEl: "11 de junio de 2026",
};

// Aportes personales de ley que se descuentan del SAC (es remunerativo):
// jubilación (SIPA) 11%, INSSJP/PAMI (Ley 19.032) 3%, obra social 3%.
export const APORTES_PERSONALES = {
  jubilacion: 0.11,
  pami: 0.03,
  obraSocial: 0.03,
};

export type Semestre = {
  id: "primero" | "segundo";
  etiqueta: string;
  periodo: string;
  inicioISO: string; // YYYY-MM-DD
  finISO: string; // YYYY-MM-DD
  fechaPago: string; // vencimiento legal (art. 122 LCT, texto Ley 27.073)
};

export const SEMESTRES_2026: Semestre[] = [
  {
    id: "primero",
    etiqueta: "1er semestre 2026",
    periodo: "enero a junio",
    inicioISO: "2026-01-01",
    finISO: "2026-06-30",
    fechaPago: "30 de junio de 2026",
  },
  {
    id: "segundo",
    etiqueta: "2do semestre 2026",
    periodo: "julio a diciembre",
    inicioISO: "2026-07-01",
    finISO: "2026-12-31",
    fechaPago: "18 de diciembre de 2026",
  },
];
