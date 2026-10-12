import { definirCasos } from "@/motor/calculo";
import diaFeriado from "./dia-feriado";

export default definirCasos(diaFeriado, [
  {
    nombre: "Dos feriados con RD$30,000",
    origen: { tipo: "recalculado", detalle: "Diario 30,000 ÷ 23.83 = 1,258.92. Art. 205: aumento de 100 % = 1,258.92 por día. Cada día vale 2,517.84. Dos días: 2,517.84 de extra." },
    fecha: "2026-10-12",
    entrada: { salario: 30000, dias: 2, tipo: "feriado" },
    esperado: { diario: 1258.92, recargo: 1258.92, porDia: 2517.84, total: 2517.84 },
  },
  {
    nombre: "Un día de descanso semanal con RD$45,000",
    origen: { tipo: "recalculado", detalle: "Diario 45,000 ÷ 23.83 = 1,888.38. Art. 164: aumento de 100 %." },
    fecha: "2026-10-12",
    entrada: { salario: 45000, dias: 1, tipo: "descanso" },
    esperado: { recargo: 1888.38, total: 1888.38 },
  },
]);
