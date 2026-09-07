// Datos para el cálculo del SUELDO NETO (empleado en relación de dependencia).
// REGLA DE ORO: verificados SOLO contra fuente oficial, nunca blogs. La fecha de
// verificación va visible en la página.

// Aportes personales obligatorios sobre la remuneración bruta:
//   jubilación (SIPA) 11% — Ley 24.241 art. 11
//   INSSJP / PAMI    3%  — Ley 19.032
//   obra social      3%  — Ley 23.660 (régimen de obras sociales)
export const APORTES = {
  jubilacion: 0.11,
  pami: 0.03,
  obraSocial: 0.03,
} as const;

export const TOTAL_APORTES =
  APORTES.jubilacion + APORTES.pami + APORTES.obraSocial; // 0,17

// Base imponible del SIPA: tope sobre el que se calculan los aportes. Por encima de
// la base máxima, los aportes dejan de crecer (la base se trunca). Se actualiza
// MENSUALMENTE por movilidad (Dec. 274/2024). Degradación elegante: si el valor está
// atrasado, solo afecta sueldos por encima del tope. Rotar en cada redeploy mensual.
export const TOPE_SIPA = {
  baseMaxima: 4_691_748.47, // remuneración devengada septiembre 2026
  baseMinima: 144_363.55,
  vigencia: "septiembre de 2026",
  fuente: "Resolución ANSES 257/2026, art. 3 (Boletín Oficial, 1/9/2026)",
};

export const SUELDO_FUENTES = {
  jubilacion: {
    nombre: "Ley 24.241, art. 11 — aporte personal jubilatorio 11% (SIPA)",
    url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/0-4999/639/texact.htm",
  },
  obraSocial: {
    nombre: "Ley 23.660 — aporte del trabajador a la obra social 3%",
    url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/0-4999/62/texact.htm",
  },
  pami: {
    nombre: "Ley 19.032 — INSSJP / PAMI 3%",
    url: "https://www.argentina.gob.ar/normativa/nacional/ley-19032-21581",
  },
  topeSIPA: {
    nombre: "Resolución ANSES 257/2026 — bases imponibles desde el devengado septiembre 2026",
    url: "https://www.boletinoficial.gob.ar/detalleAviso/primera/346683/20260901",
  },
  consultadoEl: "1 de septiembre de 2026",
};
