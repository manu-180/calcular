import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "py.bonificacion-familiar",
  h1: "Calculadora de bonificación familiar en Paraguay",
  title: "Bonificación familiar Paraguay {{anio}}: cuánto cobrás por hijo",
  description: "La bonificación familiar es el {{py.bonificacion-familiar}} del salario mínimo por cada hijo. Calculá cuánto te toca y si tu salario está debajo del tope. Gratis.",
  intro: [
    "La bonificación familiar en Paraguay es el {{py.bonificacion-familiar}} del salario mínimo ({{py.salario-minimo}}) por cada hijo. La cobra quien gana hasta el {{py.bonificacion-familiar-tope}} del salario mínimo.",
    "Poné tu salario y cuántos hijos tenés con derecho, y te mostramos cuánto te corresponde por mes.",
  ],
  comoSeCalcula: [
    "Por cada hijo se paga el {{py.bonificacion-familiar}} del salario mínimo vigente.",
    "Se pierde si tu salario pasa el {{py.bonificacion-familiar-tope}} del salario mínimo.",
    "Cuenta cada hijo menor de 17 años, a tu cargo y que viva en Paraguay. Si tiene una discapacidad total, no hay límite de edad.",
  ],
  faq: [
    {
      pregunta: "¿Cuánto es la bonificación familiar por hijo?",
      respuesta: "El {{py.bonificacion-familiar}} del salario mínimo. Si el mínimo sube, la bonificación sube con él.",
    },
    {
      pregunta: "¿Hasta qué salario se cobra?",
      respuesta: "Hasta el {{py.bonificacion-familiar-tope}} del salario mínimo. Si ganás más, no te corresponde.",
    },
    {
      pregunta: "¿Hasta qué edad se paga la bonificación familiar?",
      respuesta: "Mientras el hijo sea menor de 17 años, esté a tu cargo y viva en Paraguay. Si tiene una discapacidad total, no hay límite de edad.",
    },
    {
      pregunta: "¿La bonificación familiar es obligatoria?",
      respuesta: "Sí. Si cumplís los requisitos y avisaste a tu empleador, te la tiene que pagar.",
    },
    {
      pregunta: "¿Qué tengo que presentar para cobrarla?",
      respuesta: "Avisá por escrito a tu empleador y entregale el certificado de nacimiento de cada hijo. Se cobra desde ese aviso.",
    },
    {
      pregunta: "¿Si mi pareja también trabaja, la cobramos los dos?",
      respuesta: "No. Si los dos trabajan en relación de dependencia, la cobra uno solo.",
    },
  ],
  glosario: [
    { termino: "Bonificación familiar", definicion: "La asignación por hijo de los artículos 261 a 266 del Código del Trabajo." },
  ],
});
