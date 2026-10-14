import { definirCasos } from "@/motor/calculo";
import calculadora from "./inflation-calculator";

const ONS = "https://www.ons.gov.uk/economy/inflationandpriceindices/timeseries/d7bt/mm23";

export default definirCasos(calculadora, [
  {
    nombre: "£1,000 from August 2025 to August 2026",
    origen: { tipo: "recalculado", url: ONS, detalle: "ONS CPI index (D7BT): August 2025 = 139.3, August 2026 = 143.6. 1,000 × 143.6 / 139.3 = 1,030.87." },
    fecha: "2026-10-14",
    entrada: { importe: 1000, desde: "2025-08-15", hasta: "2026-08-01" },
    esperado: { actualizado: 1030.87, diferencia: 30.87, acumulada: 3.0869, indiceInicial: 139.3, indiceFinal: 143.6 },
    tolerancia: 0.001,
  },
  {
    nombre: "January 2020 to today stops at the latest CPI",
    origen: { tipo: "recalculado", url: ONS, detalle: "January 2020 = 108.2. Latest published is August 2026 = 143.6. 1,000 × 143.6 / 108.2 = 1,327.17." },
    fecha: "2026-10-14",
    entrada: { importe: 1000, desde: "2020-01-01", hasta: "2026-10-14" },
    esperado: { actualizado: 1327.17, mesFinal: "August 2026" },
  },
  {
    nombre: "Start month not published yet",
    origen: { tipo: "recalculado", detalle: "The CPI for October 2026 is not out on 14 October 2026." },
    fecha: "2026-10-14",
    entrada: { importe: 1000, desde: "2026-10-01", hasta: "2026-10-14" },
    esperaError: true,
  },
]);
