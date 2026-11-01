import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "co.licencia-de-maternidad",
  h1: "Calculadora de licencia de maternidad",
  title: "Licencia de maternidad {{anio}}: cuánto te pagan",
  description:
    "Calcula el valor de tu licencia de maternidad de {{co.licencia-maternidad-semanas}} semanas, con las semanas extra por parto múltiple o bebé prematuro.",
  intro: [
    "La licencia de maternidad dura {{co.licencia-maternidad-semanas}} semanas y se paga con el salario que ganas al empezarla. La paga la EPS, aunque normalmente la empresa te la consigna y después la cobra.",
    "Si el parto es múltiple o el bebé tiene una discapacidad, son dos semanas más. Si el bebé nace prematuro, se suman las semanas que faltaban para el nacimiento a término.",
  ],
  comoSeCalcula: [
    "Semanas: {{co.licencia-maternidad-semanas}}, más las semanas extra que te correspondan.",
    "Días: las semanas por 7.",
    "Valor: tu salario mensual dividido por 30, por los días de licencia.",
  ],
  ejemplo: [
    "Con un salario de $1.750.905, cada día vale $58.363,5. Las 18 semanas son 126 días: la licencia suma $7.353.801.",
  ],
  faq: [
    {
      pregunta: "¿Cuántas semanas dura la licencia de maternidad en Colombia?",
      respuesta: "{{co.licencia-maternidad-semanas}} semanas. Por lo general, una antes de la fecha probable de parto y el resto después.",
    },
    {
      pregunta: "¿Quién paga la licencia de maternidad?",
      respuesta: "La EPS. Lo usual es que la empresa te pague el salario de siempre y después le cobre a la EPS.",
    },
    {
      pregunta: "¿Se incluye el auxilio de transporte?",
      respuesta: "No. Durante la licencia no vas a trabajar, así que no hay auxilio de transporte. Se paga con el salario.",
    },
    {
      pregunta: "¿Qué pasa si el bebé nace prematuro?",
      respuesta: "La licencia se alarga con la diferencia entre la fecha del nacimiento y la fecha en que el bebé habría nacido a término.",
    },
  ],
  glosario: [
    { termino: "Licencia de maternidad", definicion: "Descanso pagado por el nacimiento de un hijo, que reconoce la EPS." },
    { termino: "EPS", definicion: "La entidad de salud a la que estás afiliada. Es la que paga licencias e incapacidades." },
  ],
});
