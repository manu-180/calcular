import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "pe.vacaciones",
  h1: "Calculadora de vacaciones truncas y vencidas en Perú",
  title: "Calculadora de vacaciones truncas {{anio}} en Perú",
  description:
    "Calcula tus vacaciones truncas, el pago de vacaciones vencidas y la indemnización por no tomarlas. Régimen general ({{pe.vacaciones-por-regimen[general]}}) y REMYPE. Pon tu sueldo.",
  intro: [
    "Las vacaciones truncas son la parte proporcional de tus vacaciones cuando dejas el trabajo antes de cumplir otro año. En el régimen general, cada mes trabajado desde tu último aniversario vale un dozavo de tu sueldo, y cada día suelto, un treintavo de ese dozavo.",
    "En el régimen general tienes {{pe.vacaciones-por-regimen[general]}} de vacaciones pagadas por cada año completo. En la micro y pequeña empresa del REMYPE son {{pe.vacaciones-por-regimen[pequena]}}.",
    "Si ganaste tus vacaciones y no las tomaste dentro del año siguiente, se vencen. En el régimen general te deben el pago de esas vacaciones y además una indemnización de una remuneración.",
  ],
  comoSeCalcula: [
    "Se toma tu remuneración mensual: sueldo, asignación familiar ({{pe.asignacion-familiar}} de la RMV, si la cobras) y pagos regulares. La gratificación no entra.",
    "Vacaciones truncas: un dozavo del pago anual de vacaciones por cada mes desde tu último aniversario, y un treintavo de ese dozavo por cada día suelto.",
    "Vacaciones vencidas: el pago de las vacaciones de ese año más una indemnización equivalente a una remuneración.",
  ],
  ejemplo: [
    "Ganas S/ 3,000 y renuncias 5 meses y 10 días después de tu último aniversario. Tus vacaciones truncas son S/ 1,250 por los meses y S/ 83.33 por los días: S/ 1,333.33.",
  ],
  faq: [
    {
      pregunta: "¿Cómo se calculan las vacaciones truncas?",
      respuesta: "En el régimen general, divide tu sueldo entre 12 y multiplícalo por los meses trabajados desde tu último aniversario. Por cada día suelto se suma un treintavo de ese dozavo.",
    },
    {
      pregunta: "¿Qué son las vacaciones truncas?",
      respuesta: "La parte de tus vacaciones que vas ganando y no llegas a completar porque dejas el trabajo antes de cumplir el año. Se pagan en la liquidación.",
    },
    {
      pregunta: "¿Cuándo se vencen mis vacaciones?",
      respuesta: "Si no las tomas dentro del año siguiente a ganarlas. Por ejemplo, las que ganaste en marzo de 2025 vencen si no las tomas antes de marzo de 2026.",
    },
    {
      pregunta: "¿Cuánto me pagan por vacaciones vencidas?",
      respuesta: "En el régimen general es el famoso triple pago: tu sueldo por haber trabajado, el pago de las vacaciones y una indemnización de una remuneración. La indemnización no paga aportes ni impuesto.",
    },
    {
      pregunta: "¿Las vacaciones truncas incluyen la gratificación?",
      respuesta: "No. Se calculan con tu remuneración mensual (sueldo, asignación familiar y pagos regulares), sin sumar la gratificación.",
    },
  ],
  glosario: [
    { termino: "Récord vacacional", definicion: "Los días que tienes que trabajar en el año para ganar tus vacaciones." },
    { termino: "Vacaciones truncas", definicion: "Vacaciones proporcionales al tiempo trabajado cuando dejas el empleo antes de completar el año." },
    { termino: "Indemnización vacacional", definicion: "Pago extra de una remuneración cuando no tomaste tus vacaciones en el plazo legal." },
  ],
});
