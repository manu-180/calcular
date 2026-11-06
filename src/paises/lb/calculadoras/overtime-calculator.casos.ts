import { definirCasos } from "@/motor/calculo";
import calculadora from "./overtime-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "10 horas con el salario mínimo",
    origen: { tipo: "recalculado", detalle: "28.000.000 × 12 / (48 × 52) = 134.615,38. × 1,5 = 201.923,08. × 10 = 2.019.230,77." },
    fecha: "2026-11-01",
    entrada: { salario: 28000000, horas: 10 },
    esperado: { hora: 134615, horaExtra: 201923, pago: 2019231 },
  },
  {
    nombre: "Sin salario",
    origen: { tipo: "recalculado", detalle: "Monto vacío." },
    fecha: "2026-11-01",
    entrada: { salario: 0, horas: 5 },
    esperaError: true,
  },
]);
