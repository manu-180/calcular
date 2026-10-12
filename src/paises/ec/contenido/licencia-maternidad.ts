import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ec.licencia-maternidad",
  h1: "Calculadora de licencia por maternidad en Ecuador",
  title: "Licencia de maternidad Ecuador 2026: fechas y lactancia",
  description: "Calcula cuándo termina tu licencia por maternidad de {{ec.maternidad-semanas}} semanas, cuándo vuelves al trabajo y hasta cuándo tienes la jornada de lactancia.",
  intro: [
    "En Ecuador toda trabajadora tiene una licencia pagada de {{ec.maternidad-semanas}} semanas por el nacimiento de su hija o hijo. Si el parto es múltiple, se suman {{ec.maternidad-multiple-dias}}.",
    "Al volver tienes {{ec.lactancia-meses}} de jornada reducida de {{ec.lactancia-jornada-horas}} por lactancia. Pon la fecha del parto y te damos todas las fechas.",
  ],
  comoSeCalcula: [
    "La licencia dura {{ec.maternidad-semanas}} semanas corridas desde la fecha del certificado médico.",
    "Con un nacimiento múltiple se suman {{ec.maternidad-multiple-dias}} más.",
    "Al día siguiente vuelves al trabajo. Desde ahí, durante {{ec.lactancia-meses}}, tu jornada es de {{ec.lactancia-jornada-horas}} al día.",
  ],
  ejemplo: [
    "Si das a luz el 1 de octubre de 2026, tu licencia termina el 23 de diciembre, vuelves el 24 y tienes jornada de lactancia hasta el 23 de marzo de 2028.",
  ],
  faq: [
    {
      pregunta: "¿Cuánto dura la licencia por maternidad en Ecuador?",
      respuesta: "{{ec.maternidad-semanas}} semanas pagadas. Con mellizos o más, {{ec.maternidad-multiple-dias}} adicionales.",
    },
    {
      pregunta: "¿Me pagan el sueldo durante la licencia?",
      respuesta: "Sí, la licencia es con remuneración. Si estás afiliada, el IESS cubre una parte con el subsidio de maternidad y tu empleador completa el resto.",
    },
    {
      pregunta: "¿Cuánto dura la jornada de lactancia?",
      respuesta: "{{ec.lactancia-meses}} desde que termina la licencia. En ese tiempo trabajas {{ec.lactancia-jornada-horas}} al día con el mismo sueldo.",
    },
    {
      pregunta: "¿Me pueden despedir durante la licencia o la lactancia?",
      respuesta: "No. Ese despido es ineficaz y puedes pedir el reintegro o una indemnización de un año de sueldo. Mira la calculadora de despido ineficaz.",
    },
  ],
  glosario: [
    { termino: "Licencia por maternidad", definicion: "El tiempo pagado que tienes para el parto y los primeros cuidados de tu bebé." },
    { termino: "Jornada de lactancia", definicion: "La jornada reducida que tienes al volver de la licencia." },
  ],
});
