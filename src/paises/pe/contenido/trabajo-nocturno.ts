import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "pe.trabajo-nocturno",
  h1: "Calculadora del sueldo mínimo por trabajo nocturno",
  title: "Trabajo nocturno {{anio}}: sueldo mínimo con {{pe.sobretasa-nocturna}} más",
  description:
    "Si trabajas de 10 p.m. a 6 a.m., tu sueldo no puede ser menor que la RMV de {{pe.rmv}} más {{pe.sobretasa-nocturna}}. Calcula el mínimo y cuánto te falta.",
  intro: [
    "Si tu jornada es de noche, la ley te protege con un piso más alto: no puedes ganar menos que la remuneración mínima vital más una sobretasa de {{pe.sobretasa-nocturna}}.",
    "Pon tu sueldo y te decimos cuál es el mínimo nocturno hoy y si tu empleador te está pagando lo que corresponde.",
  ],
  comoSeCalcula: [
    "Se toma la remuneración mínima vital vigente ({{pe.rmv}}, desde el {{pe.rmv#desde}}).",
    "Se le suma {{pe.sobretasa-nocturna}}: ese es el sueldo mensual mínimo para el trabajo nocturno.",
    "Si tu sueldo es menor, la diferencia es lo que te deben completar. El valor de tu hora sale de dividir el sueldo entre 30 días y entre las horas de tu jornada.",
  ],
  ejemplo: ["Con la RMV de S/ 1,230, el mínimo nocturno es S/ 1,660.50. Si ganas S/ 1,300 y trabajas de noche, te faltan S/ 360.50 al mes."],
  faq: [
    {
      pregunta: "¿Qué horario se considera trabajo nocturno?",
      respuesta: "El que se trabaja entre las 10:00 p.m. y las 6:00 a.m.",
    },
    {
      pregunta: "¿Si gano más que el mínimo nocturno me tienen que pagar {{pe.sobretasa-nocturna}} más?",
      respuesta: "No necesariamente. La ley fija un piso: tu sueldo no puede ser menor que la RMV más {{pe.sobretasa-nocturna}}. Si ya ganas más que eso, cumple.",
    },
    {
      pregunta: "¿Cómo se pagan las horas extras de noche?",
      respuesta: "Con las mismas sobretasas de cualquier hora extra, pero calculadas sobre el valor de tu hora nocturna.",
    },
    {
      pregunta: "¿Los turnos de noche tienen que rotar?",
      respuesta: "La norma pide que, en lo posible, los turnos nocturnos sean rotativos.",
    },
  ],
  glosario: [
    { termino: "Jornada nocturna", definicion: "Tiempo trabajado entre las 10:00 p.m. y las 6:00 a.m. (DS 007-2002-TR, artículo 8)." },
    { termino: "Sobretasa", definicion: "Porcentaje que se suma al pago normal por trabajar en condiciones especiales." },
  ],
});
