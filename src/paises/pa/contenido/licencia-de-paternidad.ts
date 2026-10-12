import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "pa.licencia-de-paternidad",
  h1: "Calculadora de licencia de paternidad en Panamá",
  title: "Licencia de paternidad en Panamá: tus días y cuándo vuelves",
  description:
    "En Panamá la licencia de paternidad es de {{pa.paternidad-dias-habiles}} hábiles pagados desde el nacimiento. Calcula tu último día de licencia y hasta cuándo avisar a tu empleador.",
  intro: [
    "Si tu esposa o conviviente va a dar a luz, tienes una licencia pagada de {{pa.paternidad-dias-habiles}} hábiles que empieza el día del nacimiento. Esos días cuentan como tiempo trabajado.",
    "Escribe la fecha de nacimiento (o la fecha probable del parto) y te decimos hasta cuándo avisar, qué días tienes libres y cuándo vuelves.",
  ],
  comoSeCalcula: [
    "Aviso: {{pa.paternidad-aviso-semanas}} semana antes de la fecha probable del parto.",
    "Licencia: {{pa.paternidad-dias-habiles}} hábiles desde el nacimiento. Si el bebé nace un fin de semana, se empieza a contar el lunes.",
    "Contamos de lunes a viernes. Si cae un feriado en medio, súmale un día.",
  ],
  ejemplo: ["Si tu bebé nace el jueves 15 de octubre de 2026, tu licencia es el jueves, el viernes y el lunes 19. Vuelves el martes 20."],
  faq: [
    {
      pregunta: "¿Cuántos días es la licencia de paternidad en Panamá?",
      respuesta: "{{pa.paternidad-dias-habiles}} hábiles, pagados, desde la fecha de nacimiento. Vale para trabajadores de empresas privadas y servidores públicos.",
    },
    {
      pregunta: "¿Qué tengo que hacer para pedirla?",
      respuesta: "Avisar a tu empleador la fecha probable del parto con {{pa.paternidad-aviso-semanas}} semana de anticipación y después presentar el certificado de nacimiento del Registro Civil.",
    },
    {
      pregunta: "¿Puedo trabajar en otro lado durante la licencia?",
      respuesta: "No. Durante esos días no puedes trabajar para otro empleador ni por cuenta propia.",
    },
    {
      pregunta: "¿Hay un proyecto para ampliarla?",
      respuesta: "Se presentaron propuestas en la Asamblea, pero mientras no sean ley rige la licencia actual.",
    },
  ],
  glosario: [
    { termino: "Días hábiles", definicion: "Días de trabajo de lunes a viernes, sin contar feriados." },
    { termino: "Conviviente", definicion: "La pareja con quien vives en unión estable." },
  ],
});
