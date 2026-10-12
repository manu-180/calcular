import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ve.permiso-de-paternidad",
  h1: "Calculadora de permiso de paternidad en Venezuela",
  title: "Permiso de paternidad en Venezuela: {{ve.paternidad-dias}}",
  description:
    "Calcula tu licencia de paternidad: {{ve.paternidad-dias}} continuos y pagos desde el nacimiento, y la inamovilidad de {{ve.inamovilidad-anios}} que te protege del despido.",
  intro: [
    "Todo trabajador tiene derecho a una licencia de paternidad pagada de {{ve.paternidad-dias}} continuos desde el nacimiento de su hijo o hija. También desde la colocación familiar, si adoptas.",
    "Además tienes inamovilidad durante el embarazo de tu pareja y hasta {{ve.inamovilidad-anios}} después del parto.",
  ],
  comoSeCalcula: [
    "La licencia empieza el día del nacimiento o de la colocación familiar.",
    "Dura {{ve.paternidad-dias}} continuos: cuentan los fines de semana y feriados.",
    "La inamovilidad llega hasta {{ve.inamovilidad-anios}} después del nacimiento.",
  ],
  ejemplo: ["Si tu bebé nace el 12 de octubre de 2026, la licencia va hasta el 25 de octubre y vuelves a trabajar el 26."],
  faq: [
    {
      pregunta: "¿Cuántos días de paternidad me tocan en Venezuela?",
      respuesta: "{{ve.paternidad-dias}} continuos y remunerados, desde el nacimiento o la colocación familiar.",
    },
    {
      pregunta: "¿Cuentan los fines de semana?",
      respuesta: "Sí. La ley dice días continuos, así que se cuentan todos los días del calendario.",
    },
    {
      pregunta: "¿Me pueden despedir después de ser papá?",
      respuesta: "No sin autorización de la Inspectoría del Trabajo. Tienes inamovilidad desde el embarazo de tu pareja hasta {{ve.inamovilidad-anios}} después del parto.",
    },
    {
      pregunta: "¿La licencia cuenta para mi antigüedad?",
      respuesta: "Sí. La licencia de paternidad se computa como tiempo de servicio.",
    },
  ],
  glosario: [
    { termino: "Licencia de paternidad", definicion: "Permiso pago por el nacimiento o la adopción de un hijo o hija (art. 339 de la LOTTT)." },
    { termino: "Colocación familiar", definicion: "Entrega de un niño o niña a una familia por decisión de la autoridad de protección." },
  ],
});
