import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ve.intereses-de-mora",
  h1: "Calculadora de intereses de mora laboral en Venezuela",
  title: "Intereses de mora por prestaciones o salario atrasado",
  description:
    "Si te pagan tarde el salario, las prestaciones o la indemnización, te deben intereses de mora a la tasa activa del BCV ({{ve.tasa-activa}}). Calcúlalos por días.",
  intro: [
    "Cuando la empresa se atrasa en pagarte el salario, las prestaciones sociales o la indemnización, te debe intereses de mora. Se calculan con la tasa activa que fija el Banco Central de Venezuela, hoy {{ve.tasa-activa}} anual.",
    "Las prestaciones se tienen que pagar dentro de los {{ve.plazo-pago-prestaciones-dias}} siguientes a tu salida. Desde ahí corre la mora.",
  ],
  comoSeCalcula: [
    "Fecha límite: para prestaciones, tu fecha de salida más {{ve.plazo-pago-prestaciones-dias}}. Para el salario, el día en que te tenían que pagar.",
    "Días de atraso: desde la fecha límite hasta el día del pago.",
    "Intereses: monto adeudado por la tasa activa ({{ve.tasa-activa}}) por los días de atraso, entre 365.",
  ],
  ejemplo: ["Si te deben Bs. 100.000 de prestaciones y te pagan 61 días tarde, con una tasa de 58,93 % los intereses dan Bs. 9.848,58."],
  faq: [
    {
      pregunta: "¿Cuánto tiempo tiene la empresa para pagarme las prestaciones?",
      respuesta: "{{ve.plazo-pago-prestaciones-dias}} después de que termina la relación de trabajo. Si paga después, debe intereses de mora.",
    },
    {
      pregunta: "¿Qué tasa se usa para la mora?",
      respuesta: "La tasa activa del BCV, que toma como referencia a los seis principales bancos del país. Hoy es {{ve.tasa-activa}} anual.",
    },
    {
      pregunta: "¿Los intereses de mora se suman a la indexación?",
      respuesta: "Son cosas distintas. La indexación o corrección monetaria la ordena un juez en un juicio. Esta calculadora solo estima los intereses de mora.",
    },
    {
      pregunta: "¿Cómo reclamo los intereses?",
      respuesta: "Pídelos por escrito a la empresa. Si no paga, puedes acudir a la Inspectoría del Trabajo o a un tribunal laboral.",
    },
  ],
  glosario: [
    { termino: "Mora", definicion: "Atraso en un pago que ya tenía fecha (art. 128 de la LOTTT)." },
    { termino: "Tasa activa", definicion: "La tasa que cobran los bancos por sus préstamos, publicada por el BCV." },
  ],
});
