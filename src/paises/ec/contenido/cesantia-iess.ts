import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ec.cesantia-iess",
  h1: "Calculadora de cesantía del IESS",
  title: "Cesantía IESS: calcula cuánto has ahorrado",
  description: "Estima tu fondo de cesantía del IESS: el {{ec.cesantia-personal}} de tu sueldo más el {{ec.cesantia-patronal}} que pone tu empleador, mes a mes.",
  intro: [
    "Parte de tus aportes al IESS va a un fondo de cesantía: un ahorro a tu nombre que puedes cobrar si te quedas sin trabajo.",
    "Pon tu remuneración promedio y los meses aportados. Te damos una estimación del ahorro, sin los rendimientos.",
  ],
  comoSeCalcula: [
    "Cada mes se separa el {{ec.cesantia-personal}} de tu remuneración (sale de tu aporte personal).",
    "Tu empleador suma el {{ec.cesantia-patronal}} (sale del aporte patronal).",
    "El ahorro del mes se multiplica por los meses aportados.",
  ],
  ejemplo: ["Con un sueldo de $1.000 se ahorran $30 al mes. En tres años suman $1.080, más los rendimientos del fondo."],
  faq: [
    {
      pregunta: "¿Cuánto se aporta a la cesantía cada mes?",
      respuesta: "El {{ec.cesantia-personal}} de tu remuneración y el {{ec.cesantia-patronal}} que paga tu empleador.",
    },
    {
      pregunta: "¿Cuándo puedo retirar la cesantía?",
      respuesta: "Cuando quedas sin trabajo y cumples las condiciones del IESS. Revisa los requisitos vigentes en tu cuenta del IESS antes de pedirla.",
    },
    {
      pregunta: "¿Por qué el saldo del IESS es mayor que este cálculo?",
      respuesta: "Porque el fondo suma rendimientos cada año. Esta calculadora solo suma los aportes.",
    },
  ],
  glosario: [
    { termino: "Fondo de cesantía", definicion: "Ahorro obligatorio a tu nombre dentro del IESS, para cuando te quedas sin trabajo." },
    { termino: "Rendimientos", definicion: "Los intereses que gana el fondo con el tiempo." },
  ],
});
