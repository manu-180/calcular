import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ni.jubilacion",
  h1: "Calculadora de pensión de vejez del INSS",
  title: "Jubilación en Nicaragua: calculá tu pensión del INSS",
  description: "Estimá tu pensión de vejez del INSS en Nicaragua: {{ni.pension-vejez-semanas}} semanas cotizadas y {{ni.pension-vejez-edad}}. Tasa de reemplazo, asignaciones familiares y tope.",
  intro: [
    "Para jubilarte con la pensión de vejez del INSS necesitás {{ni.pension-vejez-edad}} y {{ni.pension-vejez-semanas}} semanas cotizadas.",
    "Poné tus semanas, tu salario promedio y tu familia a cargo. Te estimamos la pensión con la fórmula vigente desde 2019.",
  ],
  comoSeCalcula: [
    "Salario base: el promedio de tus últimas {{ni.pension-base-semanas}} semanas cotizadas, llevado a un mes.",
    "Tasa de reemplazo: {{ni.pension-factor-basico}} más {{ni.pension-factor-anual}} por cada 52 semanas que pasen de las primeras {{ni.pension-semanas-sin-factor}}, con un máximo de {{ni.pension-tasa-maxima}}.",
    "Pensión: salario base por la tasa de reemplazo.",
    "Asignaciones familiares: {{ni.pension-asignaciones[conyuge]}} por la esposa o el esposo inválido y {{ni.pension-asignaciones[dependiente]}} por cada hijo menor de 15 años o padre mayor de 60 a tu cargo.",
    "Tope: la pensión con asignaciones no pasa tu salario base ni {{ni.pension-tope-usd}} al mes.",
  ],
  ejemplo: ["Con 750 semanas y un salario promedio de C$20,000, la tasa es 31 %: la pensión estimada es de C$6,200 al mes."],
  faq: [
    {
      pregunta: "¿Cuántas semanas necesito para jubilarme en Nicaragua?",
      respuesta: "{{ni.pension-vejez-semanas}} semanas cotizadas y {{ni.pension-vejez-edad}}. Con menos de {{ni.pension-vejez-semanas}} pero al menos {{ni.pension-vejez-reducida-semanas}}, podés pedir la pensión reducida.",
    },
    {
      pregunta: "¿Cómo se calcula la pensión de vejez del INSS?",
      respuesta: "Se multiplica tu salario base por la tasa de reemplazo. La tasa arranca en {{ni.pension-factor-basico}} y suma {{ni.pension-factor-anual}} por cada 52 semanas sobre las primeras {{ni.pension-semanas-sin-factor}}.",
    },
    {
      pregunta: "¿Cuál es la pensión máxima del INSS?",
      respuesta: "Con asignaciones no puede pasar tu salario base ni el equivalente en córdobas de {{ni.pension-tope-usd}} al mes.",
    },
    {
      pregunta: "¿Hay casos para jubilarse antes?",
      respuesta: "Sí. Las maestras a los 55 con las mismas semanas, los mineros con 15 años en la mina y quienes hicieron trabajos de desgaste físico o mental por 15 años, con aprobación de la Comisión de Invalidez.",
    },
    {
      pregunta: "¿Los jubilados cobran aguinaldo?",
      respuesta: "Sí. Los pensionados del INSS reciben el décimo tercer mes cada diciembre.",
    },
  ],
  glosario: [
    { termino: "Semanas cotizadas", definicion: "Las semanas en que vos o tu empleador pagaron el INSS." },
    { termino: "Tasa de reemplazo", definicion: "La parte de tu salario base que recibís como pensión." },
    { termino: "Pensión reducida", definicion: "Un monto fijo para quien tiene {{ni.pension-vejez-edad}} y al menos {{ni.pension-vejez-reducida-semanas}} semanas cotizadas, sin llegar a {{ni.pension-vejez-semanas}}." },
  ],
});
