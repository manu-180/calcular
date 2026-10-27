import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ec.aportes-iess",
  h1: "Calculadora de aportes al IESS",
  title: "Aportes al IESS {{anio}}: personal {{ec.aporte-personal-iess}} y patronal",
  description: "Calcula cuánto te descuentan para el IESS ({{ec.aporte-personal-iess}}) y cuánto paga tu empleador ({{ec.aporte-patronal-iess}}). Con el salario básico {{anio}} de {{ec.sbu}}.",
  intro: [
    "Cada mes se descuenta de tu sueldo el aporte personal al IESS, y tu empleador paga además el aporte patronal. Los dos van a tus seguros de salud, pensiones, riesgos del trabajo y cesantía.",
    "Pon tu remuneración mensual y te mostramos cada parte.",
  ],
  comoSeCalcula: [
    "El aporte personal es el {{ec.aporte-personal-iess}} de tu remuneración. Se descuenta en tu rol de pagos.",
    "El aporte patronal es el {{ec.aporte-patronal-iess}} y lo paga tu empleador, aparte de tu sueldo.",
    "Del total, el {{ec.cesantia-personal}} tuyo y el {{ec.cesantia-patronal}} del empleador van a tu fondo de cesantía.",
    "Con jornada completa, la base mínima es el salario básico de {{ec.sbu}}.",
  ],
  ejemplo: ["Con un sueldo de $1.000 te descuentan $94,50 y tu empleador aporta $111,50. Al IESS llegan $206 al mes."],
  faq: [
    {
      pregunta: "¿Cuánto me descuentan del IESS en Ecuador?",
      respuesta: "El {{ec.aporte-personal-iess}} de tu remuneración mensual, si trabajas en el sector privado en relación de dependencia.",
    },
    {
      pregunta: "¿Cuánto paga el empleador al IESS?",
      respuesta: "El {{ec.aporte-patronal-iess}} de tu remuneración. En total, entre los dos, llegan a un poco más del 20 %.",
    },
    {
      pregunta: "¿Los décimos pagan aporte al IESS?",
      respuesta: "No. Los décimos, las utilidades y el fondo de reserva no forman parte de la base de aportación.",
    },
    {
      pregunta: "¿Qué es el fondo de cesantía?",
      respuesta: "Un ahorro que se forma con parte de los aportes. Lo puedes retirar si te quedas sin trabajo o sirve para un préstamo quirografario.",
    },
  ],
  glosario: [
    { termino: "Aporte personal", definicion: "La parte de tu sueldo que se descuenta para el IESS." },
    { termino: "Aporte patronal", definicion: "Lo que paga tu empleador al IESS por ti, aparte de tu sueldo." },
    { termino: "Materia gravada", definicion: "La remuneración sobre la que se calculan los aportes." },
  ],
});
