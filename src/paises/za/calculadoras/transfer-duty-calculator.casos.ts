import { definirCasos } from "@/motor/calculo";
import calculadora from "./transfer-duty-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "R2 000 000 property",
    origen: { tipo: "recalculado", detalle: "SARS table from 1 April 2025: 13 614 + 6% × (2 000 000 − 1 663 800) = 33 786." },
    fecha: "2026-10-14",
    entrada: { valor: 2000000 },
    esperado: { derecho: 33786, total: 2033786 },
  },
  {
    nombre: "R1 210 000 is the last value with no duty",
    origen: { tipo: "recalculado", detalle: "0% up to 1 210 000." },
    fecha: "2026-10-14",
    entrada: { valor: 1210000 },
    esperado: { derecho: 0, exento: 1210000 },
  },
  {
    nombre: "R1 500 000 property",
    origen: { tipo: "recalculado", detalle: "3% × (1 500 000 − 1 210 000) = 8 700." },
    fecha: "2026-10-14",
    entrada: { valor: 1500000 },
    esperado: { derecho: 8700 },
  },
  {
    nombre: "R15 000 000 property",
    origen: { tipo: "recalculado", detalle: "1 241 456 + 13% × (15 000 000 − 13 310 000) = 1 461 156." },
    fecha: "2026-10-14",
    entrada: { valor: 15000000 },
    esperado: { derecho: 1461156 },
  },
]);
