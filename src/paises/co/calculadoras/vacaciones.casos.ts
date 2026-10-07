import { definirCasos } from "@/motor/calculo";
import vacaciones from "./vacaciones";

export default definirCasos(vacaciones, [
  {
    nombre: "Medio año trabajado",
    origen: { tipo: "recalculado", detalle: "CST art. 186: 180 × 15 / 360 = 7,5 días × 80.000 = 600.000." },
    fecha: "2026-10-15",
    entrada: { salario: 2400000, dias: 180 },
    esperado: { diasVacaciones: 7.5, salarioDiario: 80000, valor: 600000 },
  },
  {
    nombre: "Año completo",
    origen: { tipo: "recalculado", detalle: "360 × 15 / 360 = 15 días × 60.000 = 900.000." },
    fecha: "2026-10-15",
    entrada: { salario: 1800000, dias: 360 },
    esperado: { diasVacaciones: 15, valor: 900000 },
  },
  {
    nombre: "Un solo día trabajado",
    origen: { tipo: "recalculado", detalle: "15 / 360 = 0,0417 días × 80.000 = 3.333,33." },
    fecha: "2026-10-15",
    entrada: { salario: 2400000, dias: 1 },
    esperado: { diasVacaciones: 0.04, valor: 3333 },
  },
]);
