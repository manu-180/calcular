import { definirCasos } from "@/motor/calculo";
import horasExtra from "./horas-extra";

export default definirCasos(horasExtra, [
  {
    nombre: "Mensual de $ 50.000 con 6 horas en días hábiles y 2 en feriado",
    origen: {
      tipo: "recalculado",
      detalle: "Ley 15.996, art. 1. Valor hora 50.000 / 200 = 250. Hábil: 250 × 2 = 500 × 6 = 3.000. Feriado: 250 × 2,5 = 625 × 2 = 1.250. Total 4.250.",
    },
    fecha: "2026-10-07",
    entrada: { modalidad: "mensual", monto: 50000, divisor: 200, horasHabiles: 6, horasDescanso: 2 },
    esperado: { valorHora: 250, horaHabil: 500, horaDescanso: 625, pagoHabiles: 3000, pagoDescanso: 1250, total: 4250 },
  },
  {
    nombre: "Por hora, con media hora extra",
    origen: { tipo: "recalculado", detalle: "Hora de 180: hábil 360 × 0,5 = 180." },
    fecha: "2026-10-07",
    entrada: { modalidad: "hora", monto: 180, divisor: 200, horasHabiles: 0.5, horasDescanso: 0 },
    esperado: { horaHabil: 360, total: 180 },
  },
  {
    nombre: "Salario mínimo por hora desde julio de 2026",
    origen: {
      tipo: "recalculado",
      url: "https://www.impo.com.uy/bases/decretos/319-2025",
      detalle: "Decreto 319/025: 25.383 / 200 = 126,915, redondeado 126,92. Hora extra hábil 253,84; en feriado 317,30. Con 4 hábiles: 1.015,36.",
    },
    fecha: "2026-10-07",
    entrada: { modalidad: "mensual", monto: 25383, divisor: 200, horasHabiles: 4, horasDescanso: 0 },
    esperado: { valorHora: 126.92, horaHabil: 253.84, horaDescanso: 317.3, total: 1015.36 },
  },
  {
    nombre: "Divisor de 30 días por 8 horas",
    origen: { tipo: "recalculado", detalle: "60.000 / 240 = 250. Hábil 500 × 2 = 1.000." },
    fecha: "2026-10-07",
    entrada: { modalidad: "mensual", monto: 60000, divisor: 240, horasHabiles: 2, horasDescanso: 0 },
    esperado: { valorHora: 250, total: 1000 },
  },
]);
