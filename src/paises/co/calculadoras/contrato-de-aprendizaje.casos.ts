import { definirCasos } from "@/motor/calculo";
import aprendizaje from "./contrato-de-aprendizaje";

export default definirCasos(aprendizaje, [
  {
    nombre: "Etapa lectiva en 2026",
    origen: { tipo: "recalculado", detalle: "Ley 2466 (art. 81 del CST): 75 % de 1.750.905 = 1.313.178,75. Seis meses: 7.879.074." },
    fecha: "2026-10-15",
    entrada: { etapa: "lectiva", meses: 6 },
    esperado: { tasa: 75, mensual: 1313179, total: 7879074 },
  },
  {
    nombre: "Etapa práctica",
    origen: { tipo: "recalculado", detalle: "100 % del salario mínimo: 1.750.905." },
    fecha: "2026-10-15",
    entrada: { etapa: "practica", meses: 1 },
    esperado: { mensual: 1750905 },
  },
  {
    nombre: "Estudiante universitario",
    origen: { tipo: "recalculado", detalle: "Nunca menos de un salario mínimo: 1.750.905 × 3 = 5.252.715." },
    fecha: "2026-10-15",
    entrada: { etapa: "universitario", meses: 3 },
    esperado: { mensual: 1750905, total: 5252715 },
  },
]);
