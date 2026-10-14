import { definirCasos } from "@/motor/calculo";
import tredicesima from "./tredicesima";

export default definirCasos(tredicesima, [
  {
    nombre: "Anno intero con 2.000 euro al mese",
    origen: { tipo: "recalculado", detalle: "2.000 × 12 / 12 = 2.000; rateo 166,67." },
    fecha: "2026-12-01",
    entrada: { retribuzione: 2000, mesi: 12 },
    esperado: { tredicesima: 2000, rateo: 166.67 },
  },
  {
    nombre: "Assunto ad aprile, 9 mesi",
    origen: { tipo: "recalculado", detalle: "1.850 × 9 / 12 = 1.387,50." },
    fecha: "2026-12-01",
    entrada: { retribuzione: 1850, mesi: 9 },
    esperado: { tredicesima: 1387.5, rateo: 154.17 },
  },
  {
    nombre: "Tredici mesi non esistono",
    origen: { tipo: "recalculado", detalle: "I mesi vanno da 0 a 12." },
    fecha: "2026-12-01",
    entrada: { retribuzione: 1850, mesi: 13 },
    esperaError: true,
  },
]);
