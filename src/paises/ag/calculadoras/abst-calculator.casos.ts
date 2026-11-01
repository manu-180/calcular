import { definirCasos } from "@/motor/calculo";
import calculadora from "./abst-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Add 17% to EC$1,000",
    origen: { tipo: "recalculado", url: "https://laws.gov.ag/wp-content/uploads/2024/02/No.-13-of-2023-Revenue-Miscellaneous-Provision-Act-2023.pdf", detalle: "1,000 x 17% = 170. Total 1,170." },
    fecha: "2026-10-29",
    entrada: { importe: 1000, modo: "add" },
    esperado: { neto: 1000, abst: 170, total: 1170, tasa: 17, dias: 15 },
  },
  {
    nombre: "Take ABST out of EC$1,170",
    origen: { tipo: "recalculado", detalle: "1,170 / 1.17 = 1,000. ABST 170." },
    fecha: "2026-10-29",
    entrada: { importe: 1170, modo: "remove" },
    esperado: { neto: 1000, abst: 170 },
  },
  {
    nombre: "Take ABST out of EC$500",
    origen: { tipo: "recalculado", detalle: "500 / 1.17 = 427.35. ABST 72.65." },
    fecha: "2026-10-29",
    entrada: { importe: 500, modo: "remove" },
    esperado: { neto: 427.35, abst: 72.65 },
  },
]);
