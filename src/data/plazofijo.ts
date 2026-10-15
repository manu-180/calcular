// Datos de la calculadora de plazo fijo.
// REGLA DE ORO: estos datos se verifican SOLO contra fuentes oficiales, nunca blogs.
//
// Verificado el 30/07/2026:
// - TNA de referencia: API Estadísticas Monetarias BCRA v4.0, serie ID 12
//   ("Tasa de interés por depósitos a 30 días de plazo", promedio de entidades).
//   La calculadora pide el dato en vivo client-side; si falla usa TNA_FALLBACK
//   CON FECHA VISIBLE. Ese valor NO se escribe a mano: lo rota `tools/rotar-tna.ts`
//   desde la API del BCRA en cada deploy (obra O-12) — el número vive en un solo lugar.
// - Plazo fijo UVA: Comunicación "A" 8246/2025 BCRA (vigente desde el 2/6/2025) —
//   plazo mínimo 90 días, con opción de precancelación desde el día 30 (a tasa fija,
//   sin el ajuste UVA). Tasa adicional sobre el ajuste: la fija cada banco
//   (referencia: BNA pagaba 4,5% TNA en abril 2026).
// - Inflación: IPC Nacional INDEC, serie 148.3_INIVELNAL_DICI_M_26 (+ planilla de series
//   históricas sh_ipc cuando la API se atrasa). Último dato: junio 2026, índice 11.826,41
//   vs 11.607,39 de mayo → 1,9% mensual publicado por INDEC (informe ipc_07_26, julio 2026).
//   La serie se actualiza ~día 10-15 de cada mes: rotar este valor en cada redeploy.
// - Garantía de depósitos: $50.000.000 por persona desde el 1/4/2026
//   (Comunicación "A" 8407 BCRA, 5/3/2026).
// - Ganancias: intereses de plazos fijos exentos para personas humanas
//   (art. 26 inc. h, Ley de Ganancias t.o. 2019; texto según art. 191 de la
//   Ley 27.802, B.O. 6/3/2026, que eliminó la limitación a "moneda nacional").
// - Bienes Personales: depósitos a plazo fijo exentos (art. 21 inc. h, Ley 23.966).

export const PLAZOFIJO_FUENTES = {
  bcraTasa: {
    nombre: "BCRA: Estadísticas monetarias, tasa de depósitos a 30 días (serie 12)",
    url: "https://api.bcra.gob.ar/estadisticas/v4.0/monetarias/12",
  },
  comunicacionUva: {
    nombre: "BCRA: Comunicación «A» 8246/2025 (plazo fijo UVA: mínimo 90 días)",
    url: "https://www.bcra.gob.ar/Pdfs/comytexord/A8246.pdf",
  },
  garantia: {
    nombre: "BCRA: Comunicación «A» 8407 (garantía de los depósitos: $50.000.000)",
    url: "https://www.bcra.gob.ar/archivos/Pdfs/comytexord/A8407.pdf",
  },
  ipc: {
    nombre: "INDEC: IPC Nacional (API oficial de series de tiempo)",
    url: "https://datos.gob.ar/series/api/series/?ids=148.3_INIVELNAL_DICI_M_26&format=json",
  },
  ganancias: {
    nombre: "Ley de Impuesto a las Ganancias t.o. 2019, art. 26 inc. h (Infoleg)",
    url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/330000-334999/332890/texact.htm",
  },
  consultadoEl: "30 de julio de 2026",
};

// URL para el fetch en vivo de la TNA (CORS abierto, verificado).
// Respuesta: { results: [{ idVariable, detalle: [{ fecha: "YYYY-MM-DD", valor }] }] }
export const BCRA_TNA_URL = "https://api.bcra.gob.ar/estadisticas/v4.0/monetarias/12?limit=1";

// Fallback si la API del BCRA no responde (la fecha SIEMPRE se muestra al usuario).
export const TNA_FALLBACK = { valor: 20.65, fechaISO: "2026-10-13" };

// Última inflación mensual oficial (INDEC). Editable por el usuario en la calculadora.
export const INFLACION_DEFAULT = { mensualPct: 1.7, periodo: "agosto 2026" };

// Plazo mínimo de un plazo fijo tradicional en pesos.
export const PLAZO_MINIMO_DIAS = 30;

// Plazo fijo UVA (Com. "A" 8246/2025, vigente desde 2/6/2025).
export const UVA = {
  plazoMinimoDias: 90,
  precancelableDesdeDia: 30,
  // Tasa adicional que paga el banco sobre el capital ajustado (varía por banco).
  tnaAdicionalDefaultPct: 4.5,
};

// Garantía de los depósitos (Com. "A" 8407, vigente desde 1/4/2026).
export const GARANTIA_DEPOSITOS = { monto: 50_000_000, vigenciaDesde: "1/4/2026" };
