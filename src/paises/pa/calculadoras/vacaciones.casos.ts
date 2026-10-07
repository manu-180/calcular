import { definirCasos } from "@/motor/calculo";
import vacaciones from "./vacaciones";

export default definirCasos(vacaciones, [
  {
    nombre: "Período completo de once meses",
    origen: { tipo: "recalculado", detalle: "Art. 54: 30 días = un mes de salario, 1,100. CSS 9.75% = 107.25. Seguro educativo 1.25% = 13.75. Neto 979." },
    fecha: "2026-10-07",
    entrada: { salario: 1100, meses: 11 },
    esperado: { dias: 30, bruto: 1100, css: 107.25, seguroEducativo: 13.75, neto: 979 },
  },
  {
    nombre: "Medio período",
    origen: { tipo: "recalculado", detalle: "5.5 ÷ 11 = 0.5. 15 días, 500 brutos. CSS 48.75, seguro educativo 6.25. Neto 445." },
    fecha: "2026-10-07",
    entrada: { salario: 1000, meses: 5.5 },
    esperado: { dias: 15, bruto: 500, css: 48.75, seguroEducativo: 6.25, neto: 445 },
  },
  {
    nombre: "Más de dos períodos acumulados",
    origen: { tipo: "recalculado", detalle: "23 meses supera dos períodos de 11: la calculadora pide separarlos." },
    fecha: "2026-10-07",
    entrada: { salario: 1000, meses: 23 },
    esperaError: true,
  },
]);
