import { definirCasos } from "@/motor/calculo";
import calculadora from "./maternity-leave-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Baby expected on 1 March 2027",
    origen: { tipo: "recalculado", detalle: "30 days before 1 March 2027 is 30 January 2027. 90 days after is 30 May 2027. 120 days × 9,000 / 30 = 36,000." },
    fecha: "2026-10-27",
    entrada: { parto: "2027-03-01", salario: 9000 },
    esperado: { inicio: "2027-01-30", fin: "2027-05-30", dias: 120, pago: 36000, paternidad: 3 },
  },
]);
