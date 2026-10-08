import { definirCasos } from "@/motor/calculo";
import aguinaldo from "./aguinaldo";

export default definirCasos(aguinaldo, [
  {
    nombre: "Cinco meses de trabajo",
    origen: {
      tipo: "recalculado",
      url: "https://www.bacn.gov.py/leyes-paraguayas/2608/ley-n-213-establece-el-codigo-del-trabajo",
      detalle: "Código del Trabajo, art. 243: doceava parte de lo devengado. 3.600.000 × 5 / 12 = 1.500.000.",
    },
    fecha: "2026-12-15",
    entrada: { salario: 3600000, meses: 5, extras: 0 },
    esperado: { totalAnio: 18000000, aguinaldo: 1500000 },
  },
  {
    nombre: "Año completo con el mínimo y horas extra",
    origen: { tipo: "recalculado", detalle: "3.044.000 × 12 + 500.000 = 37.028.000. Dividido 12: 3.085.666,67, redondeado 3.085.667." },
    fecha: "2026-12-20",
    entrada: { salario: 3044000, meses: 12, extras: 500000 },
    esperado: { totalAnio: 37028000, aguinaldo: 3085667 },
  },
  {
    nombre: "Más de 12 meses",
    origen: { tipo: "recalculado", detalle: "El aguinaldo cubre el año calendario: 13 meses no es válido." },
    fecha: "2026-12-20",
    entrada: { salario: 3044000, meses: 13, extras: 0 },
    esperaError: true,
  },
]);
