import { definirCasos } from "@/motor/calculo";
import trabajoNocturno from "./trabajo-nocturno";

export default definirCasos(trabajoNocturno, [
  {
    nombre: "Ocho horas por noche, 20 noches, hora de $ 250",
    origen: {
      tipo: "recalculado",
      url: "https://www.impo.com.uy/bases/leyes/19313-2015",
      detalle: "Ley 19.313, art. 3 y 4: 20 % sobre las horas nocturnas si pasan de 5 seguidas. 250 × 20 % = 50; 50 × 8 × 20 = 8.000.",
    },
    fecha: "2026-10-12",
    entrada: { modalidad: "hora", monto: 250, divisor: 200, horas: 8, noches: 20 },
    esperado: { valorHora: 250, recargoHora: 50, corresponde: "Sí", total: 8000 },
  },
  {
    nombre: "Justo 5 horas: no corresponde",
    origen: { tipo: "recalculado", detalle: "La ley pide más de cinco horas consecutivas: con 5 no hay sobretasa." },
    fecha: "2026-10-12",
    entrada: { modalidad: "hora", monto: 250, divisor: 200, horas: 5, noches: 20 },
    esperado: { corresponde: "No", total: 0 },
  },
  {
    nombre: "Mensual de $ 50.000 con divisor 200",
    origen: { tipo: "recalculado", detalle: "Hora 50.000 / 200 = 250. 6 horas por 22 noches: 50 × 6 × 22 = 6.600." },
    fecha: "2026-10-12",
    entrada: { modalidad: "mensual", monto: 50000, divisor: 200, horas: 6, noches: 22 },
    esperado: { valorHora: 250, total: 6600 },
  },
]);
