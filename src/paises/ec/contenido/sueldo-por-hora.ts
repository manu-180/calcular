import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ec.sueldo-por-hora",
  h1: "Calculadora de sueldo por hora en Ecuador",
  title: "Sueldo por hora en Ecuador: cuánto ganas por hora",
  description: "Calcula cuánto vale tu hora y tu día de trabajo a partir del sueldo mensual, con la jornada de {{ec.jornada-diaria}} diarias y {{ec.jornada-semanal}} semanales.",
  intro: [
    "Saber cuánto ganas por hora sirve para comparar ofertas, cobrar horas extra o calcular un trabajo por horas.",
    "Pon tu sueldo mensual y te mostramos el valor de tu hora, tu día y tu semana.",
  ],
  comoSeCalcula: [
    "El sueldo mensual paga 30 días, descanso semanal incluido. El día vale el sueldo dividido para 30.",
    "La hora vale el día dividido para la jornada de {{ec.jornada-diaria}}.",
    "Una semana de trabajo son {{ec.jornada-semanal}}.",
  ],
  ejemplo: ["Con un sueldo de $960, tu día vale $32 y tu hora $4."],
  faq: [
    {
      pregunta: "¿Cuánto es el salario básico por hora?",
      respuesta: "El básico de {{ec.sbu}} dividido para 30 y para {{ec.jornada-diaria}}: unos $2,01 por hora.",
    },
    {
      pregunta: "¿Por qué se divide para 240?",
      respuesta: "Porque son 30 días de {{ec.jornada-diaria}}. Es la forma en que se calcula la hora para las horas extra.",
    },
    {
      pregunta: "¿Y si trabajo menos horas?",
      respuesta: "Tu sueldo se paga en proporción a la jornada completa. Usa la calculadora de jornada parcial.",
    },
  ],
  glosario: [
    { termino: "Jornada completa", definicion: "{{ec.jornada-diaria}} al día y {{ec.jornada-semanal}} a la semana." },
    { termino: "Valor hora", definicion: "Lo que vale una hora de tu trabajo según tu sueldo." },
  ],
});
