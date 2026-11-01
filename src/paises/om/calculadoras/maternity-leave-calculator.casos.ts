import { definirCasos } from "@/motor/calculo";
import calculadora from "./maternity-leave-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Parto el 1/12/2026 con 14 días antes",
    origen: { tipo: "recalculado", detalle: "Inicio 17/11/2026; 98 días terminan el 22/2/2027. Límite de paternidad: día 98 desde el parto, 8/3/2027. Pago 600/30 × 98 = 1.960." },
    fecha: "2026-10-26",
    entrada: { parto: "2026-12-01", antes: 14, salario: 600, diasMes: 30 },
    esperado: { inicio: "2026-11-17", fin: "2027-02-22", dias: 98, limitePaternidad: "2027-03-08", pago: 1960 },
  },
  {
    nombre: "Sin días antes del parto",
    origen: { tipo: "recalculado", detalle: "Inicio 1/12/2026, fin 8/3/2027." },
    fecha: "2026-10-26",
    entrada: { parto: "2026-12-01", antes: 0, salario: 600, diasMes: 30 },
    esperado: { inicio: "2026-12-01", fin: "2027-03-08" },
  },
]);
