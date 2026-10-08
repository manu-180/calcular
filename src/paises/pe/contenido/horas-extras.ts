import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "pe.horas-extras",
  h1: "Calculadora de horas extras en Perú",
  title: "Calculadora de horas extras en Perú: {{pe.sobretasa-horas-extras[primeras-dos]}} y {{pe.sobretasa-horas-extras[siguientes]}}",
  description:
    "Calcula cuánto te deben pagar por horas extras: sobretasa del {{pe.sobretasa-horas-extras[primeras-dos]}} las dos primeras y del {{pe.sobretasa-horas-extras[siguientes]}} desde la tercera. Método del MTPE, paso a paso.",
  intro: [
    "Cada hora extra se paga con un recargo: al menos {{pe.sobretasa-horas-extras[primeras-dos]}} por las dos primeras del día y {{pe.sobretasa-horas-extras[siguientes]}} desde la tercera. El valor de tu hora es tu sueldo entre 30 y entre las horas de tu jornada.",
    "Las horas extras (sobretiempo) son las que trabajas antes de tu hora de entrada o después de tu hora de salida. Son voluntarias: nadie te puede obligar, salvo una emergencia que ponga en peligro a personas o bienes.",
  ],
  comoSeCalcula: [
    "Primero se saca el valor de tu hora normal: sueldo mensual entre 30 y entre las horas de tu jornada diaria.",
    "A las dos primeras horas extras de cada día se les suma un {{pe.sobretasa-horas-extras[primeras-dos]}} de ese valor.",
    "Desde la tercera hora extra del día, el recargo es del {{pe.sobretasa-horas-extras[siguientes]}}.",
    "Si haces menos de una hora, te pagan la parte proporcional.",
  ],
  ejemplo: [
    "Es el ejemplo de la guía del MTPE: con un sueldo de S/ 1,300 y jornada de 8 horas, tu hora vale S/ 5.42. La primera y la segunda hora extra valen S/ 6.77 cada una. La tercera vale S/ 7.32.",
  ],
  faq: [
    {
      pregunta: "¿Cómo se calcula el pago de horas extras?",
      respuesta: "Divide tu sueldo entre 30 y entre las horas de tu jornada para sacar el valor de tu hora. Súmale {{pe.sobretasa-horas-extras[primeras-dos]}} por las dos primeras horas extras del día y {{pe.sobretasa-horas-extras[siguientes]}} desde la tercera.",
    },
    {
      pregunta: "¿Cuánto vale una hora extra con el sueldo mínimo?",
      respuesta: "Con la RMV que rige desde octubre de 2026 (S/ 1,230) y jornada de 8 horas, tu hora vale S/ 5.13. Cada una de las dos primeras horas extras vale S/ 6.41 y desde la tercera, S/ 6.92.",
    },
    {
      pregunta: "¿Cuándo me tienen que pagar las horas extras?",
      respuesta: "Junto con tu sueldo del mes en que las hiciste.",
    },
    {
      pregunta: "¿Pueden darme descanso en vez de pagarme las horas extras?",
      respuesta: "Sí, si lo acuerdan por escrito. El descanso tiene que darse dentro del mes siguiente, salvo que pacten otra cosa.",
    },
    {
      pregunta: "¿Qué hago si no registran mis horas extras?",
      respuesta: "Igual te las deben pagar si puedes probarlas con correos, mensajes o testigos. Tu empleador está obligado a llevar un registro de asistencia.",
    },
  ],
  glosario: [
    { termino: "Sobretiempo", definicion: "El nombre legal de las horas extras." },
    { termino: "Sobretasa", definicion: "El recargo mínimo que se suma al valor de la hora normal." },
    { termino: "Valor hora", definicion: "Lo que vale una hora de tu jornada: el sueldo de un día dividido entre las horas de tu jornada." },
  ],
});
