import { definirCasos } from "@/motor/calculo";
import calculadora from "./net-salary-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Resident on Ushs 1,500,000 a month",
    origen: {
      tipo: "recalculado",
      detalle: "PAYE 338,250 (URA table). NSSF 5% = 75,000. Take-home 1,500,000 − 338,250 − 75,000 = 1,086,750. Employer adds 10% = 150,000.",
    },
    fecha: "2026-10-24",
    entrada: { mensual: 1500000, residencia: "resident", nssf: true },
    esperado: { neto: 1086750, paye: 338250, nssf: 75000, deducciones: 413250, empleador: 150000, anual: 13041000 },
  },
  {
    nombre: "Below the PAYE threshold",
    origen: { tipo: "recalculado", detalle: "300,000: no PAYE. NSSF 15,000. Take-home 285,000." },
    fecha: "2026-10-24",
    entrada: { mensual: 300000, residencia: "resident", nssf: true },
    esperado: { neto: 285000, paye: 0, nssf: 15000 },
  },
  {
    nombre: "No NSSF",
    origen: { tipo: "recalculado", detalle: "800,000: PAYE 33,750 + 30% × 315,000 = 128,250. Take-home 671,750." },
    fecha: "2026-10-24",
    entrada: { mensual: 800000, residencia: "resident", nssf: false },
    esperado: { neto: 671750, paye: 128250, nssf: 0, empleador: 0 },
  },
]);
