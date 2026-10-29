import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ec.jornada-parcial",
  h1: "Calculadora de sueldo por jornada parcial en Ecuador",
  title: "Jornada parcial Ecuador {{anio}}: sueldo de medio tiempo",
  description: "Calcula tu sueldo de medio tiempo o jornada parcial en proporción a las {{ec.jornada-semanal}} semanales, el mínimo legal con el básico de {{ec.sbu}} y tu aporte al IESS.",
  intro: [
    "Si trabajas menos horas que la jornada completa, tu sueldo se paga en proporción. Nunca puede ser menor a la parte proporcional del salario básico.",
    "Pon tus horas por semana y, si lo sabes, el sueldo de una jornada completa en tu puesto.",
  ],
  comoSeCalcula: [
    "La jornada completa es de {{ec.jornada-semanal}} por semana.",
    "Tu sueldo es el de jornada completa multiplicado por tus horas y dividido para {{ec.jornada-semanal}}.",
    "El mínimo legal es la misma proporción del salario básico de {{ec.sbu}}.",
    "Del sueldo se descuenta el {{ec.aporte-personal-iess}} de aporte personal al IESS.",
  ],
  ejemplo: ["Con 20 horas por semana y el salario básico, tu sueldo es $241. Después del aporte al IESS recibes $218,23."],
  faq: [
    {
      pregunta: "¿Cuánto es el sueldo de medio tiempo en Ecuador?",
      respuesta: "La mitad del sueldo de jornada completa. Con el salario básico, son $241 al mes.",
    },
    {
      pregunta: "¿Tengo derecho a décimos y vacaciones con jornada parcial?",
      respuesta: "Sí. Se pagan en proporción a tus horas, salvo los beneficios que por su naturaleza no se pueden dividir, que se pagan completos.",
    },
    {
      pregunta: "¿Me tienen que afiliar al IESS?",
      respuesta: "Sí, desde el primer día. El aporte se calcula sobre tu sueldo proporcional.",
    },
  ],
  glosario: [
    { termino: "Jornada parcial", definicion: "Trabajar menos horas por semana que la jornada completa de {{ec.jornada-semanal}}." },
    { termino: "Proporcional", definicion: "Que se calcula según la parte de la jornada completa que trabajas." },
  ],
});
