import { definirCasos } from "@/motor/calculo";
import horasExtras from "./horas-extras";

export default definirCasos(horasExtras, [
  {
    nombre: "Sueldo de $720 con los tres tipos de horas",
    origen: {
      tipo: "recalculado",
      detalle: "Art. 55 del Código del Trabajo. Hora: 720 / 30 / 8 = 3. Suplementaria +50 % = 4,50 × 10 = 45. Madrugada +100 % = 6 × 2 = 12. Sábado o domingo +100 % = 6 × 8 = 48. Total 105.",
    },
    fecha: "2026-10-07",
    entrada: { sueldo: 720, suplementarias: 10, madrugada: 2, extraordinarias: 8 },
    esperado: { hora: 3, horaSuplementaria: 4.5, horaDoble: 6, valorSuplementarias: 45, valorMadrugada: 12, valorExtraordinarias: 48, total: 105 },
  },
  {
    nombre: "Salario básico con 4 horas suplementarias",
    origen: {
      tipo: "recalculado",
      detalle: "Hora: 482 / 240 = 2,0083. Con 50 %: 3,0125 × 4 = 12,05.",
    },
    fecha: "2026-10-07",
    entrada: { sueldo: 482, suplementarias: 4, madrugada: 0, extraordinarias: 0 },
    esperado: { hora: 2.01, horaSuplementaria: 3.01, total: 12.05 },
  },
  {
    nombre: "Sin horas extra",
    origen: { tipo: "recalculado", detalle: "Borde: cero horas da cero." },
    fecha: "2026-10-07",
    entrada: { sueldo: 1000, suplementarias: 0, madrugada: 0, extraordinarias: 0 },
    esperado: { total: 0 },
  },
]);
