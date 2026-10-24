import { definirCasos } from "@/motor/calculo";
import calculadora from "./stamp-duty-calculator";

const SDA = "https://new.kenyalaw.org/akn/ke/act/1958/31/eng@2026-07-01" as const;

export default definirCasos(calculadora, [
  {
    nombre: "KSh 8 million house in a municipality",
    origen: { tipo: "recalculado", url: SDA, detalle: "Item 12A: 80 for the first 2,000, then 40 for each 1,000 or part: 80 + 7,998 × 40 = 320,000." },
    fecha: "2026-10-17",
    entrada: { valor: 8000000, zona: "municipality" },
    esperado: { impuesto: 320000, tasa: 4 },
  },
  {
    nombre: "KSh 3 million plot outside a municipality",
    origen: { tipo: "recalculado", url: SDA, detalle: "Item 11: 40 for the first 2,000, then 20 for each 1,000 or part: 40 + 2,998 × 20 = 60,000." },
    fecha: "2026-10-17",
    entrada: { valor: 3000000, zona: "other" },
    esperado: { impuesto: 60000, tasa: 2 },
  },
  {
    nombre: "A fraction of KSh 1,000 counts as a full 1,000",
    origen: { tipo: "recalculado", detalle: "2,500,500 in a municipality: 80 + ceil(2,498,500 / 1,000) × 40 = 80 + 2,499 × 40 = 100,040." },
    fecha: "2026-10-17",
    entrada: { valor: 2500500, zona: "municipality" },
    esperado: { impuesto: 100040 },
  },
]);
