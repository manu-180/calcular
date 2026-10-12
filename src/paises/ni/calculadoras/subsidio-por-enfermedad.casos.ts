import { definirCasos } from "@/motor/calculo";
import subsidioPorEnfermedad from "./subsidio-por-enfermedad";

export default definirCasos(subsidioPorEnfermedad, [
  {
    nombre: "Una semana de reposo por enfermedad común",
    origen: { tipo: "recalculado", detalle: "Ley de Seguridad Social art. 93: 60 % desde el cuarto día. 9000 / 30 = 300; 60 % = 180 por día. 7 días − 3 = 4 días × 180 = 720." },
    fecha: "2026-10-12",
    entrada: { salario: 9000, dias: 7, hospital: false },
    esperado: { espera: 3, diasPagados: 4, diario: 180, total: 720 },
  },
  {
    nombre: "Hospitalización de diez días",
    origen: { tipo: "recalculado", detalle: "Art. 93: con hospitalización se paga desde el primer día. 10 × 180 = 1800." },
    fecha: "2026-10-12",
    entrada: { salario: 9000, dias: 10, hospital: true },
    esperado: { espera: 0, diasPagados: 10, total: 1800 },
  },
  {
    nombre: "Reposo de dos días",
    origen: { tipo: "recalculado", detalle: "Dos días de reposo caen dentro de los tres que no paga el INSS: subsidio 0." },
    fecha: "2026-10-12",
    entrada: { salario: 9000, dias: 2, hospital: false },
    esperado: { espera: 2, diasPagados: 0, total: 0 },
  },
  {
    nombre: "Más de 52 semanas",
    origen: { tipo: "recalculado", detalle: "Art. 93: hasta 52 semanas (364 días)." },
    fecha: "2026-10-12",
    entrada: { salario: 9000, dias: 400, hospital: false },
    esperaError: true,
  },
]);
