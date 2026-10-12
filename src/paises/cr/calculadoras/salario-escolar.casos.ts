import { definirCasos } from "@/motor/calculo";
import salarioEscolar from "./salario-escolar";

export default definirCasos(salarioEscolar, [
  {
    nombre: "8,33 % de ₡600.000 durante 12 meses",
    origen: { tipo: "recalculado", detalle: "Ley 8682, art. 2: 600.000 × 8,33 % = 49.980 por mes; × 12 = 599.760." },
    fecha: "2026-10-12",
    entrada: { salario: 600000, porcentaje: 8.33, meses: 12 },
    esperado: { mensual: 49980, total: 599760 },
  },
  {
    nombre: "Mínimo de 4,16 % durante 6 meses",
    origen: { tipo: "recalculado", detalle: "500.000 × 4,16 % = 20.800; × 6 = 124.800." },
    fecha: "2026-10-12",
    entrada: { salario: 500000, porcentaje: 4.16, meses: 6 },
    esperado: { mensual: 20800, total: 124800 },
  },
  {
    nombre: "Porcentaje fuera del rango de ley",
    origen: { tipo: "recalculado", detalle: "10 % pasa del máximo de 8,33 %." },
    fecha: "2026-10-12",
    entrada: { salario: 500000, porcentaje: 10, meses: 12 },
    esperaError: true,
  },
]);
