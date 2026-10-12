import { definirCasos } from "@/motor/calculo";
import licenciaPorEnfermedad from "./licencia-por-enfermedad";

export default definirCasos(licenciaPorEnfermedad, [
  {
    nombre: "Un año de trabajo con dos días usados",
    origen: {
      tipo: "recalculado",
      detalle: "Art. 200: 144 horas por año. Usó 16: quedan 128 = 16 jornadas de 8 horas. Hora 1,000 ÷ 208 = 4.8077 × 128 = 615.38.",
    },
    fecha: "2026-10-12",
    entrada: { fechaIngreso: "2025-10-13", fecha: "2026-10-12", horasUsadas: 16, salario: 1000, jornada: "diurna" },
    esperado: { generadas: 144, disponibles: 128, dias: 16, valor: 615.38 },
  },
  {
    nombre: "Cinco años: tope de dos años acumulados",
    origen: { tipo: "recalculado", detalle: "Se acumula hasta dos años: 288 horas = 36 jornadas. 288 × 4.8077 = 1,384.62." },
    fecha: "2026-10-12",
    entrada: { fechaIngreso: "2021-10-13", fecha: "2026-10-12", horasUsadas: 0, salario: 1000, jornada: "diurna" },
    esperado: { generadas: 288, disponibles: 288, dias: 36, valor: 1384.62 },
  },
]);
