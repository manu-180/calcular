import { definirCasos } from "@/motor/calculo";
import quattordicesima from "./quattordicesima";

export default definirCasos(quattordicesima, [
  {
    nombre: "Periodo intero con 1.700 euro al mese",
    origen: { tipo: "recalculado", detalle: "1.700 × 12 / 12 = 1.700; rateo 141,67." },
    fecha: "2026-07-01",
    entrada: { retribuzione: 1700, mesi: 12 },
    esperado: { quattordicesima: 1700, rateo: 141.67 },
  },
  {
    nombre: "Assunto a gennaio, 6 mesi fino a giugno",
    origen: { tipo: "recalculado", detalle: "1.700 × 6 / 12 = 850." },
    fecha: "2026-07-01",
    entrada: { retribuzione: 1700, mesi: 6 },
    esperado: { quattordicesima: 850 },
  },
  {
    nombre: "Mesi negativi",
    origen: { tipo: "recalculado", detalle: "I mesi vanno da 0 a 12." },
    fecha: "2026-07-01",
    entrada: { retribuzione: 1700, mesi: -1 },
    esperaError: true,
  },
]);
