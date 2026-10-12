import { definirCasos } from "@/motor/calculo";
import asociacionSolidarista from "./asociacion-solidarista";

export default definirCasos(asociacionSolidarista, [
  {
    nombre: "Ahorro del 5 % y aporte patronal del 5,33 %",
    origen: {
      tipo: "recalculado",
      detalle: "Ley 6970, art. 18: ahorro entre 3 % y 5 %. 800.000 × 5 % = 40.000; × 5,33 % = 42.640. Mes 82.640. Doce meses: 480.000 y 511.680.",
    },
    fecha: "2026-10-12",
    entrada: { salario: 800000, ahorro: 5, aportePatronal: 5.33, meses: 12 },
    esperado: { ahorro: 40000, patrono: 42640, mensual: 82640, acumuladoAhorro: 480000, acumuladoPatrono: 511680 },
  },
  {
    nombre: "Ahorro mínimo del 3 %",
    origen: { tipo: "recalculado", detalle: "500.000 × 3 % = 15.000; aporte patronal 3 % = 15.000." },
    fecha: "2026-10-12",
    entrada: { salario: 500000, ahorro: 3, aportePatronal: 3, meses: 1 },
    esperado: { ahorro: 15000, patrono: 15000, mensual: 30000 },
  },
  {
    nombre: "Ahorro fuera del rango",
    origen: { tipo: "recalculado", detalle: "El 2 % es menor que el mínimo de ley." },
    fecha: "2026-10-12",
    entrada: { salario: 500000, ahorro: 2, aportePatronal: 3, meses: 1 },
    esperaError: true,
  },
]);
