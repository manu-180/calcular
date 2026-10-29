import { definirCasos } from "@/motor/calculo";
import calculadora from "./paye-penalty-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "FJ$10,000 of PAYE filed and paid late",
    origen: {
      tipo: "recalculado",
      url: "https://frcs.org.fj/files/2026/08/Employer-Guide-2026.pdf",
      detalle: "Late lodgment 20% × 10,000 = 2,000. Late payment 25% × 10,000 = 2,500. Penalties 4,500. Total 14,500.",
    },
    fecha: "2026-10-29",
    entrada: { paye: 10000, tardeFiling: true, tardePago: true },
    esperado: { filing: 2000, pago: 2500, penalidades: 4500, total: 14500 },
  },
  {
    nombre: "Filed on time but paid late",
    origen: { tipo: "recalculado", detalle: "Late payment 25% × 4,000 = 1,000." },
    fecha: "2026-10-29",
    entrada: { paye: 4000, tardeFiling: false, tardePago: true },
    esperado: { filing: 0, pago: 1000, penalidades: 1000, total: 5000 },
  },
  {
    nombre: "Filed late but paid on time",
    origen: { tipo: "recalculado", detalle: "Late lodgment 20% × 4,000 = 800." },
    fecha: "2026-10-29",
    entrada: { paye: 4000, tardeFiling: true, tardePago: false },
    esperado: { filing: 800, pago: 0, penalidades: 800 },
  },
  { nombre: "Zero PAYE is rejected", origen: { tipo: "recalculado", detalle: "Amount must be above zero." }, fecha: "2026-10-29", entrada: { paye: 0, tardeFiling: true, tardePago: true }, esperaError: true },
]);
