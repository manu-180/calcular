import { definirCasos } from "@/motor/calculo";
import fondoDeCesantia from "./fondo-de-cesantia";

export default definirCasos(fondoDeCesantia, [
  {
    nombre: "Salario de B/. 1,000 en los diez primeros años",
    origen: {
      tipo: "recalculado",
      detalle:
        "Trimestre 3,000. Prima: una semana por año = 3,000 ÷ 52 = 57.69. Indemnización: 5% de 3.4 semanas por año (art. 229-B) = 3,000 × 3.4 × 5% ÷ 52 = 9.81. Total 67.50 por trimestre (2.25% de los salarios).",
    },
    fecha: "2026-10-12",
    entrada: { salario: 1000, masDeDiez: false },
    esperado: { prima: 57.69, indemnizacion: 9.81, trimestral: 67.5, anual: 270, porcentaje: 2.25 },
  },
  {
    nombre: "Más de diez años de servicio",
    origen: { tipo: "recalculado", detalle: "Desde el año 11 la indemnización es una semana por año: 3,000 × 1 × 5% ÷ 52 = 2.88. Total 60.58 (2.02%)." },
    fecha: "2026-10-12",
    entrada: { salario: 1000, masDeDiez: true },
    esperado: { prima: 57.69, indemnizacion: 2.88, trimestral: 60.58, porcentaje: 2.02 },
  },
]);
