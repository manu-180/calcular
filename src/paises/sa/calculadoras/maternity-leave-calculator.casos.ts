import { definirCasos } from "@/motor/calculo";
import calculadora from "./maternity-leave-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Doce semanas empezando dos antes del parto",
    origen: { tipo: "recalculado", detalle: "Art. 151 reformado: 12 semanas = 84 días x (9.000 / 30) = 25.200. Del 17/11/2026 al 8/2/2027." },
    fecha: "2026-10-24",
    entrada: { parto: "2026-12-01", semanasAntes: 2, salario: 9000, enfermo: false },
    esperado: { pago: 25200, semanas: 12, inicio: "2026-11-17", fin: "2027-02-08", diasPagados: 84 },
  },
  {
    nombre: "Con hijo enfermo: un mes más pago",
    origen: { tipo: "recalculado", detalle: "84 + 30 = 114 días x 300 = 34.200; el mes extra termina el 10/3/2027." },
    fecha: "2026-10-24",
    entrada: { parto: "2026-12-01", semanasAntes: 2, salario: 9000, enfermo: true },
    esperado: { pago: 34200, finExtra: "2027-03-10" },
  },
  {
    nombre: "Más de cuatro semanas antes",
    origen: { tipo: "recalculado", detalle: "5 semanas: la ley permite hasta 4." },
    fecha: "2026-10-24",
    entrada: { parto: "2026-12-01", semanasAntes: 5, salario: 9000, enfermo: false },
    esperaError: true,
  },
]);
