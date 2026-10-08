import { definirCasos } from "@/motor/calculo";
import bonificacion from "./bonificacion";

export default definirCasos(bonificacion, [
  {
    nombre: "3 años o más, año completo",
    origen: { tipo: "recalculado", detalle: "Reglamento art. 38 c): 45,000 ÷ 23.83 = 1,888.38 por día; × 60 = 113,302.56." },
    fecha: "2026-10-07",
    entrada: { salario: 45000, antiguedad: "tres-anios-o-mas", meses: 12 },
    esperado: { diario: 1888.38, dias: 60, maximo: 113302.56 },
  },
  {
    nombre: "Menos de un año, 6 meses en el ejercicio",
    origen: { tipo: "recalculado", detalle: "Reglamento art. 38 a): 30,000 × 6 = 180,000 ÷ 12 = 15,000 ÷ 23.83 = 629.46; × 45 = 28,325.64." },
    fecha: "2026-10-07",
    entrada: { salario: 30000, antiguedad: "menos-de-tres-anios", meses: 6 },
    esperado: { diario: 629.46, dias: 45, maximo: 28325.64 },
  },
  {
    nombre: "Más de 12 meses",
    origen: { tipo: "recalculado", detalle: "Entrada imposible." },
    fecha: "2026-10-07",
    entrada: { salario: 30000, antiguedad: "menos-de-tres-anios", meses: 13 },
    esperaError: true,
  },
]);
