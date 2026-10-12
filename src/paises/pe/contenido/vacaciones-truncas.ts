import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "pe.vacaciones-truncas",
  h1: "Calculadora de vacaciones truncas",
  title: "Vacaciones truncas 2026: calcula cuánto te pagan",
  description:
    "Calcula tus vacaciones truncas con tus fechas de ingreso y salida. Régimen general de {{pe.vacaciones-por-regimen[general]}} por año y MYPE de {{pe.vacaciones-por-regimen[pequena]}}.",
  intro: [
    "Si dejas tu trabajo antes de cumplir otro año, te pagan las vacaciones que fuiste ganando en proporción a los meses y días trabajados desde tu último aniversario. Son las vacaciones truncas.",
    "Pon tus fechas y tu sueldo. Si te quedaron vacaciones de años completos sin tomar, súmalas y te damos el total.",
  ],
  comoSeCalcula: [
    "Se cuenta el tiempo desde la última vez que cumpliste un año en la empresa hasta tu último día de trabajo.",
    "En el régimen general te corresponden {{pe.vacaciones-por-regimen[general]}} por año: se paga un doceavo de tu remuneración por cada mes y un trescientos sesentavo por cada día.",
    "En la micro y pequeña empresa (REMYPE) son {{pe.vacaciones-por-regimen[pequena]}} por año, así que la remuneración vacacional es medio sueldo.",
    "Las vacaciones de años completos que no tomaste se pagan enteras, a razón de un treintavo del sueldo por día.",
  ],
  ejemplo: [
    "Entraste el 1 de marzo de 2024, ganas S/ 2,000 y te vas el 15 de octubre de 2026. Desde tu aniversario del 1 de marzo pasaron 7 meses y 15 días: te tocan S/ 1,250 de vacaciones truncas.",
  ],
  faq: [
    {
      pregunta: "¿Desde cuándo me pagan vacaciones truncas?",
      respuesta: "Desde que cumples un mes de trabajo. Con menos de un mes no se generan.",
    },
    {
      pregunta: "¿Cuántos días de vacaciones me tocan por año?",
      respuesta: "En el régimen general, {{pe.vacaciones-por-regimen[general]}} calendario por cada año completo. En la micro y pequeña empresa inscrita en el REMYPE, {{pe.vacaciones-por-regimen[pequena]}}.",
    },
    {
      pregunta: "¿Qué pasa si tenía vacaciones vencidas?",
      respuesta: "Si no las tomaste dentro del año siguiente a ganarlas, además del pago te corresponde una indemnización de una remuneración por cada año vencido.",
    },
    {
      pregunta: "¿Cuándo me pagan las vacaciones truncas?",
      respuesta: "En tu liquidación de beneficios sociales, junto con la CTS y la gratificación truncas.",
    },
  ],
  glosario: [
    { termino: "Vacaciones truncas", definicion: "Pago proporcional de las vacaciones que ganaste en un año que no llegaste a completar." },
    { termino: "Récord vacacional", definicion: "El año de trabajo que tienes que cumplir para ganar el descanso completo." },
  ],
});
