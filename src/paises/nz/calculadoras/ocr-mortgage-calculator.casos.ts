import { definirCasos } from "@/motor/calculo";
import calculadora from "./ocr-mortgage-calculator";

const RBNZ = "https://www.rbnz.govt.nz/monetary-policy/monetary-policy-decisions";

export default definirCasos(calculadora, [
  {
    nombre: "$500,000 at 5% over 25 years, OCR up 0.25",
    origen: {
      tipo: "recalculado",
      url: RBNZ,
      detalle: "Monthly payment at 5%: 2,922.95; at 5.25%: 2,996.24; difference 73.29 a month, 879.48 a year. OCR 2.75% since the 2 September 2026 decision.",
    },
    fecha: "2026-10-14",
    entrada: { saldo: 500000, tasa: 5, anios: 25, frecuencia: "monthly", cambio: 0.25, traspaso: 100 },
    esperado: { actual: 2922.95, nuevo: 2996.24, diferencia: 73.29, alAnio: 879.48, nuevaTasa: 5.25, ocr: 2.75, ocrDesde: "2026-09-02" },
  },
  {
    nombre: "Fortnightly, OCR cut of 0.25",
    origen: { tipo: "recalculado", detalle: "$400,000 over 20 years, 26 payments a year: at 4.5% 1,167.24, at 4.25% 1,142.51. Difference −24.73." },
    fecha: "2026-10-14",
    entrada: { saldo: 400000, tasa: 4.5, anios: 20, frecuencia: "fortnightly", cambio: -0.25, traspaso: 100 },
    esperado: { actual: 1167.24, nuevo: 1142.51, diferencia: -24.73 },
  },
  {
    nombre: "Half the change passed on",
    origen: { tipo: "recalculado", detalle: "OCR +0.5 with 50% pass-through is +0.25: same as the first case, 2,996.24." },
    fecha: "2026-10-14",
    entrada: { saldo: 500000, tasa: 5, anios: 25, frecuencia: "monthly", cambio: 0.5, traspaso: 50 },
    esperado: { nuevo: 2996.24, nuevaTasa: 5.25 },
  },
  {
    nombre: "OCR before the July 2026 rise",
    origen: { tipo: "oficial", url: RBNZ, detalle: "The OCR was 2.25% after the 27 May 2026 decision." },
    fecha: "2026-06-15",
    entrada: { saldo: 500000, tasa: 5, anios: 25, frecuencia: "monthly", cambio: 0, traspaso: 100 },
    esperado: { ocr: 2.25, diferencia: 0 },
  },
  {
    nombre: "No balance",
    origen: { tipo: "recalculado", detalle: "A balance of 0 is not valid." },
    fecha: "2026-10-14",
    entrada: { saldo: 0, tasa: 5, anios: 25, frecuencia: "monthly", cambio: 0.25, traspaso: 100 },
    esperaError: true,
  },
]);
