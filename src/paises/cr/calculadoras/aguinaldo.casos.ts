import { definirCasos } from "@/motor/calculo";
import aguinaldo from "./aguinaldo";

export default definirCasos(aguinaldo, [
  {
    nombre: "Año completo con salario fijo",
    origen: { tipo: "recalculado", detalle: "Ley 2412, arts. 1 y 2: 450.000 × 12 = 5.400.000; 5.400.000 / 12 = 450.000." },
    fecha: "2026-12-01",
    entrada: { salario: 450000, meses: 12, extras: null },
    esperado: { devengado: 5400000, aguinaldo: 450000 },
  },
  {
    nombre: "Siete meses y medio con horas extra",
    origen: { tipo: "recalculado", detalle: "Ley 2412, art. 3 (proporcional): 600.000 × 7,5 + 120.000 = 4.620.000; / 12 = 385.000." },
    fecha: "2026-12-01",
    entrada: { salario: 600000, meses: 7.5, extras: 120000 },
    esperado: { devengado: 4620000, aguinaldo: 385000 },
  },
  {
    nombre: "Menos de un mes trabajado no da aguinaldo",
    origen: { tipo: "recalculado", detalle: "Ley 2412, art. 3: hace falta un mes de servicio como mínimo. 0,5 meses da 0." },
    fecha: "2026-12-01",
    entrada: { salario: 500000, meses: 0.5, extras: null },
    esperado: { devengado: 250000, aguinaldo: 0 },
  },
  {
    nombre: "Más de 12 meses es un error",
    origen: { tipo: "recalculado", detalle: "El período va del 1 de diciembre al 30 de noviembre: 12 meses como máximo." },
    fecha: "2026-12-01",
    entrada: { salario: 500000, meses: 13, extras: null },
    esperaError: true,
  },
]);
