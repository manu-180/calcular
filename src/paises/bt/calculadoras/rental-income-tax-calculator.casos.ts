import { definirCasos } from "@/motor/calculo";
import calculadora from "./rental-income-tax-calculator";

const ACT = "https://www.drc.gov.bt/wp-content/uploads/2025/09/Income-Tax-Act-of-Bhutan-2025.pdf" as const;

export default definirCasos(calculadora, [
  {
    nombre: "Nu. 600,000 of rent, no other income",
    origen: { tipo: "recalculado", url: ACT, detalle: "Section 74: 20% = 120,000; net 480,000; Schedule 1: 5% of 180,000 = 9,000. Withheld 5% = 30,000. Balance -21,000." },
    fecha: "2026-10-31",
    entrada: { renta: 600000, gastos: 0, otros: 0, conRetencion: "yes" },
    esperado: { impuesto: 9000, reparaciones: 120000, neto: 480000, retenido: 30000, saldo: -21000 },
  },
  {
    nombre: "Rent on top of a salary",
    origen: { tipo: "recalculado", url: ACT, detalle: "Rent 600,000, interest 80,000, net 400,000. On top of 500,000: 10% of 250,000 + 15% of 150,000 = 47,500." },
    fecha: "2026-10-31",
    entrada: { renta: 600000, gastos: 80000, otros: 500000, conRetencion: "no" },
    esperado: { impuesto: 47500, neto: 400000, retenido: 0, saldo: 47500 },
  },
  {
    nombre: "Costs above the rent",
    origen: { tipo: "recalculado", detalle: "Rent 100,000, 20% = 20,000, costs 90,000. Net is held at zero." },
    fecha: "2026-10-31",
    entrada: { renta: 100000, gastos: 90000, otros: 0, conRetencion: "no" },
    esperado: { impuesto: 0, neto: 0 },
  },
]);
