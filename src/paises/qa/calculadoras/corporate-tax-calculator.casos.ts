import { definirCasos } from "@/motor/calculo";
import calculadora from "./corporate-tax-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Fully foreign-owned company with QAR 2 million",
    origen: { tipo: "recalculado", detalle: "Income Tax Law art. 9: 10% × 2,000,000 = 200,000." },
    fecha: "2026-10-26",
    entrada: { renta: 2000000, qatari: 0 },
    esperado: { impuesto: 200000, gravable: 2000000, efectiva: 10 },
  },
  {
    nombre: "51% Qatari-owned company",
    origen: { tipo: "recalculado", detalle: "Art. 4 item 14: Qatari share exempt. 49% × 1,000,000 = 490,000 × 10% = 49,000. Effective 4.9%." },
    fecha: "2026-10-26",
    entrada: { renta: 1000000, qatari: 51 },
    esperado: { gravable: 490000, impuesto: 49000, efectiva: 4.9 },
  },
]);
