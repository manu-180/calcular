import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "pa.renuncia-justificada",
  h1: "Calculadora de renuncia justificada en Panamá",
  title: "Renuncia justificada en Panamá: indemnización y prima",
  description:
    "Si renuncias por culpa del empleador en Panamá, cobras la indemnización como en un despido injustificado: {{pa.indemnizacion-semanas[primeros-10-anios]}} semanas por año, más la prima de antigüedad.",
  intro: [
    "La renuncia justificada es la que haces porque el empleador falló: no te paga el salario completo, cambia tus condiciones sin acuerdo, te engañó o te maltrata. En esos casos cobras la misma indemnización que en un despido injustificado.",
    "Escribe tu salario y tus fechas. Te mostramos la indemnización, la prima de antigüedad, las vacaciones y el décimo.",
  ],
  comoSeCalcula: [
    "Salario semanal: el mensual por 12 y dividido entre 52.",
    "Indemnización: {{pa.indemnizacion-semanas[primeros-10-anios]}} semanas de salario por cada uno de los diez primeros años y {{pa.indemnizacion-semanas[desde-anio-11]}} por cada año siguiente, con la fracción del año incompleto.",
    "Prima de antigüedad: {{pa.prima-antiguedad-semanas}} semana por año trabajado.",
    "Vacaciones y décimo proporcional, como en cualquier liquidación.",
  ],
  ejemplo: [
    "Con B/. 1,300 al mes y 8 años justos: indemnización B/. 8,160, prima B/. 2,400, vacaciones B/. 590.91 (5 meses) y décimo B/. 255.08. Total B/. 11,405.99.",
  ],
  faq: [
    {
      pregunta: "¿Qué es una renuncia justificada en Panamá?",
      respuesta: "La que el Código de Trabajo permite por faltas del empleador: no pagarte el salario completo, cambiar tus condiciones solo, engañarte, maltratarte o no cumplir las normas de seguridad, entre otras.",
    },
    {
      pregunta: "¿Cuánto me pagan por renuncia justificada?",
      respuesta: "Lo mismo que por despido injustificado: {{pa.indemnizacion-semanas[primeros-10-anios]}} semanas por año en los primeros diez años, más la prima de antigüedad, las vacaciones y el décimo.",
    },
    {
      pregunta: "¿Quién decide si mi renuncia es justificada?",
      respuesta: "La autoridad de trabajo. Si el empleador no lo acepta, presentas el reclamo en el MITRADEL o en un juzgado de trabajo.",
    },
    {
      pregunta: "¿Y si empecé a trabajar antes de agosto de 1995?",
      respuesta: "Tu indemnización combina escalas anteriores del artículo 225 y esta calculadora no las cubre.",
    },
  ],
  glosario: [
    { termino: "Indemnización", definicion: "Pago por terminar la relación por culpa del empleador." },
    { termino: "MITRADEL", definicion: "Ministerio de Trabajo y Desarrollo Laboral." },
  ],
});
