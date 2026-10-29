import { definirCasos } from "@/motor/calculo";
import calculadora from "./employer-cost-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "FJ$3,000 a month, mandatory rate",
    origen: { tipo: "recalculado", detalle: "FNPF 8% × 3,000 = 240. Cost 3,240 a month, 38,880 over 12 months." },
    fecha: "2026-10-29",
    entrada: { bruto: 3000, tasaEmpleador: null },
    esperado: { fnpf: 240, costoMensual: 3240, costoAnual: 38880, exceso: 0, ahorroAnual: 0 },
  },
  {
    nombre: "FJ$3,000 a month, employer keeps paying 10%",
    origen: {
      tipo: "recalculado",
      url: "https://frcs.org.fj/files/2026/06/FRCS-Budget-Summary-2026-2027-National-Budget.pdf",
      detalle: "FNPF 10% × 3,000 = 300. Excess 2% × 3,000 = 60 a month, 720 a year. Deduction 150% × 720 = 1,080. Tax saved 25% × 1,080 = 270.",
    },
    fecha: "2026-10-29",
    entrada: { bruto: 3000, tasaEmpleador: 10 },
    esperado: { fnpf: 300, costoMensual: 3300, exceso: 60, ahorroAnual: 270 },
  },
  { nombre: "A rate below the mandatory rate is rejected", origen: { tipo: "recalculado", detalle: "6% is under 8%." }, fecha: "2026-10-29", entrada: { bruto: 3000, tasaEmpleador: 6 }, esperaError: true },
  { nombre: "A rate above the cap is rejected", origen: { tipo: "recalculado", detalle: "12% is over the 10% cap." }, fecha: "2026-10-29", entrada: { bruto: 3000, tasaEmpleador: 12 }, esperaError: true },
]);
