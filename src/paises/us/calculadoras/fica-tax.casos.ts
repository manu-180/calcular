import { definirCasos } from "@/motor/calculo";
import calculadora from "./fica-tax";

export default definirCasos(calculadora, [
  {
    nombre: "$75,000 of wages in 2026",
    origen: { tipo: "recalculado", detalle: "6.2% of 75000 = 4650; 1.45% = 1087.50; employee 5737.50, employer the same; total 11475." },
    fecha: "2026-10-14",
    entrada: { salarios: 75000, estado: "single" },
    esperado: { socialSecurity: 4650, medicare: 1087.5, adicional: 0, empleado: 5737.5, empleador: 5737.5, total: 11475, efectiva: 7.65 },
  },
  {
    nombre: "Single filer above the wage base and the Additional Medicare threshold",
    origen: {
      tipo: "recalculado",
      url: "https://www.irs.gov/taxtopics/tc560",
      detalle: "SS 6.2% of 184500 = 11439. Medicare 1.45% of 250000 = 3625. Additional 0.9% of 50000 = 450. Employer pays 11439 + 3625.",
    },
    fecha: "2026-10-14",
    entrada: { salarios: 250000, estado: "single" },
    esperado: { socialSecurity: 11439, medicare: 3625, adicional: 450, empleado: 15514, empleador: 15064, total: 30578 },
  },
  {
    nombre: "Married filing jointly at $250,000 owes no Additional Medicare Tax",
    origen: { tipo: "recalculado", detalle: "The joint threshold is 250000, so the excess is zero." },
    fecha: "2026-10-14",
    entrada: { salarios: 250000, estado: "mfj" },
    esperado: { adicional: 0, empleado: 15064 },
  },
]);
