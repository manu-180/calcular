import { definirCasos } from "@/motor/calculo";
import calculadora from "./cost-to-company";

export default definirCasos(calculadora, [
  {
    nombre: "R25 000 salary with SDL",
    origen: { tipo: "recalculado", detalle: "UIF 1% of 17 712 = 177.12. SDL 1% of 25 000 = 250. Monthly cost 25 427.12; a year 305 125.44." },
    fecha: "2026-10-14",
    entrada: { salario: 25000, beneficios: 0, sdl: true },
    esperado: { uif: 177.12, sdl: 250, mensual: 25427.12, anual: 305125.44, extra: 427.12 },
  },
  {
    nombre: "R10 000 salary with R1 500 benefits, small payroll",
    origen: { tipo: "recalculado", detalle: "UIF 1% of 10 000 = 100. No SDL. Monthly cost 10 000 + 1 500 + 100 = 11 600." },
    fecha: "2026-10-14",
    entrada: { salario: 10000, beneficios: 1500, sdl: false },
    esperado: { uif: 100, sdl: 0, mensual: 11600 },
  },
]);
