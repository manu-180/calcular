import { definirCasos } from "@/motor/calculo";
import calculadora from "./net-to-gross-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "TT$12,483.29 take-home in an average month",
    origen: {
      tipo: "recalculado",
      detalle: "Reverse of the salary calculator: TT$15,000 gross leaves NIS 734.50, Health Surcharge 35.75 and PAYE 1,746.46, so 12,483.29. TT$14,999.99 leaves 12,483.28.",
    },
    fecha: "2026-10-27",
    entrada: { neto: 12483.29, lunes: "promedio", pension: 0 },
    esperado: { bruto: 15000, neto: 12483.29, paye: 1746.46 },
  },
  {
    nombre: "Take-home of a minimum wage month",
    origen: { tipo: "recalculado", detalle: "3,553.33 gross, 4 Mondays: NIS 182.40 and Health Surcharge 33, no PAYE. Net 3,337.93." },
    fecha: "2026-10-27",
    entrada: { neto: 3337.93, lunes: "4", pension: 0 },
    esperado: { bruto: 3553.33, nis: 182.4 },
  },
]);
