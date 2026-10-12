import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "hn.periodo-de-prueba",
  h1: "Calculadora del período de prueba en Honduras",
  title: "Período de prueba en Honduras: cuándo termina",
  description: "Calcule el último día de su período de prueba. En Honduras dura hasta {{hn.periodo-prueba-dias[general]}} y en el trabajo doméstico {{hn.periodo-prueba-dias[domestico]}}.",
  intro: [
    "El período de prueba es el comienzo del contrato, para que las dos partes vean si les conviene seguir. Dura como máximo {{hn.periodo-prueba-dias[general]}}.",
    "En el trabajo doméstico la ley presume que los primeros {{hn.periodo-prueba-dias[domestico]}} son de prueba.",
  ],
  comoSeCalcula: [
    "Se cuenta desde el primer día de trabajo, en días calendario.",
    "Si el contrato pacta menos días, se usa lo pactado. Se puede prorrogar, pero el total no puede pasar del máximo.",
  ],
  ejemplo: ["Empezó el 1 de octubre de 2026 con la prueba máxima. Su período de prueba termina el 29 de noviembre de 2026."],
  faq: [
    {
      pregunta: "¿Cuánto dura el período de prueba en Honduras?",
      respuesta: "Hasta {{hn.periodo-prueba-dias[general]}}, también en el aprendizaje. En el trabajo doméstico, los primeros {{hn.periodo-prueba-dias[domestico]}}.",
    },
    {
      pregunta: "¿Me pueden despedir en el período de prueba?",
      respuesta: "Sí. Cualquiera de las partes puede terminar el contrato sin dar preaviso ni pagar indemnización.",
    },
    {
      pregunta: "¿Me pagan el período de prueba?",
      respuesta: "Sí, es tiempo trabajado y pagado. Tiene todas las prestaciones, menos el preaviso y la indemnización por despido.",
    },
    {
      pregunta: "¿Tiene que estar por escrito?",
      respuesta: "Sí. Si no se pactó por escrito, el contrato se rige por las normas generales y no hay período de prueba.",
    },
  ],
  glosario: [
    { termino: "Período de prueba", definicion: "La etapa inicial del contrato de trabajo, con un máximo que fija el artículo 49 del Código del Trabajo." },
    { termino: "Contrato por tiempo indefinido", definicion: "El que no tiene fecha de fin. Es en lo que se convierte el contrato si nadie lo termina al acabar la prueba." },
  ],
});
