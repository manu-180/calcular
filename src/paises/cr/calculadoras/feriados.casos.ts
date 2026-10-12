import { definirCasos } from "@/motor/calculo";
import feriados from "./feriados";

const MTSS = "https://www.mtss.go.cr/temas-laborales/feriados/feriados_calendario_2026.pdf" as const;

export default definirCasos(feriados, [
  {
    nombre: "Pago mensual, feriado obligatorio trabajado con dos horas extra",
    origen: {
      tipo: "oficial",
      url: MTSS,
      detalle:
        "Carta MTSS de feriados 2026: con pago mensual se suma un pago sencillo para completar el doble; horas extra a triple. 600.000 / 30 = 20.000 por día; hora 2.500; 2 × 2.500 × 3 = 15.000. Total 35.000.",
    },
    fecha: "2026-10-12",
    entrada: { modalidad: "mensual", salario: 600000, tipo: "obligatorio", trabajo: true, horasExtra: 2, horasJornada: 8 },
    esperado: { salarioDiario: 20000, pagoFeriado: 20000, horasExtra: 15000, total: 35000 },
  },
  {
    nombre: "Pago semanal, feriado obligatorio trabajado",
    origen: { tipo: "oficial", url: MTSS, detalle: "Con pago semanal, si se trabaja un feriado de pago obligatorio el adicional es doble: 15.000 × 2 = 30.000." },
    fecha: "2026-10-12",
    entrada: { modalidad: "semanal", salario: 15000, tipo: "obligatorio", trabajo: true, horasExtra: 0, horasJornada: 8 },
    esperado: { pagoFeriado: 30000, total: 30000 },
  },
  {
    nombre: "Pago semanal, feriado obligatorio no trabajado",
    origen: { tipo: "oficial", url: MTSS, detalle: "Con pago semanal se paga un adicional sencillo por el feriado de pago obligatorio: 15.000." },
    fecha: "2026-10-12",
    entrada: { modalidad: "semanal", salario: 15000, tipo: "obligatorio", trabajo: false, horasExtra: 0, horasJornada: 8 },
    esperado: { pagoFeriado: 15000, total: 15000 },
  },
  {
    nombre: "Pago semanal, feriado no obligatorio trabajado con horas extra",
    origen: {
      tipo: "oficial",
      url: MTSS,
      detalle: "Feriado de pago no obligatorio trabajado: sencillo, 15.000. Horas extra a tiempo y medio: 15.000 / 8 = 1.875; × 1,5 × 2 = 5.625. Total 20.625.",
    },
    fecha: "2026-10-12",
    entrada: { modalidad: "semanal", salario: 15000, tipo: "no-obligatorio", trabajo: true, horasExtra: 2, horasJornada: 8 },
    esperado: { pagoFeriado: 15000, horasExtra: 5625, total: 20625 },
  },
  {
    nombre: "Pago mensual sin trabajar el feriado",
    origen: { tipo: "recalculado", detalle: "El feriado ya está en el salario mensual: no se suma nada." },
    fecha: "2026-10-12",
    entrada: { modalidad: "mensual", salario: 600000, tipo: "no-obligatorio", trabajo: false, horasExtra: 0, horasJornada: 8 },
    esperado: { pagoFeriado: 0, total: 0 },
  },
]);
