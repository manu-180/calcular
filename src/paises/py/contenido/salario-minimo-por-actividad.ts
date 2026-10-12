import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "py.salario-minimo-por-actividad",
  h1: "Salario mínimo por actividad y oficio",
  title: "Salario mínimo por oficio en Paraguay 2026",
  description: "Buscá el salario mínimo de tu oficio: chofer, albañil, guardia de seguridad, cocinero, panadero, mecánico y más. Según la resolución del Ministerio de Trabajo.",
  intro: [
    "Además del salario mínimo general, el Ministerio de Trabajo fija mínimos propios para algunos oficios y actividades. Muchos son más altos que el general.",
    "Elegí tu actividad y te mostramos el mínimo mensual, el diario y el jornal, de día o de noche.",
  ],
  comoSeCalcula: [
    "El mínimo mensual de cada actividad sale del anexo de la resolución del Ministerio de Trabajo, vigente desde el {{py.salario-minimo-actividad#desde}}.",
    "De noche se le suma el {{py.recargo-nocturno}}.",
    "El diario es el mensual dividido {{py.divisor-salario-diario}} y el jornal, dividido {{py.divisor-jornal}}.",
  ],
  ejemplo: ["Un chofer cobrador de transporte público tiene un mínimo de {{py.salario-minimo-actividad[chofer-cobrador]}} por mes. Un albañil oficial de primera, {{py.salario-minimo-actividad[construccion-oficial-1]}}."],
  faq: [
    {
      pregunta: "¿Cuál es el salario mínimo de un guardia de seguridad?",
      respuesta: "Depende de las horas diarias: {{py.salario-minimo-actividad[seguridad-8]}} por 8 horas, {{py.salario-minimo-actividad[seguridad-10]}} por 10 y {{py.salario-minimo-actividad[seguridad-12]}} por 12.",
    },
    {
      pregunta: "¿Cuánto gana como mínimo un albañil?",
      respuesta: "Un oficial de primera, {{py.salario-minimo-actividad[construccion-oficial-1]}} por mes. Un oficial de segunda, {{py.salario-minimo-actividad[construccion-oficial-2]}}. Un peón, {{py.salario-minimo-actividad[construccion-peon]}}.",
    },
    {
      pregunta: "¿Por qué el mínimo ganadero es más bajo?",
      respuesta: "La resolución fija para establecimientos ganaderos {{py.salario-minimo-actividad[ganadero]}}, menos que el general. Es el valor oficial, aunque llame la atención.",
    },
    {
      pregunta: "¿Cuánto gana un aprendiz?",
      respuesta: "Como mínimo {{py.salario-minimo-actividad[aprendiz]}} por mes, el 60 % del salario mínimo.",
    },
    {
      pregunta: "¿Mi oficio no está en la lista?",
      respuesta: "Entonces rige el mínimo general para actividades no especificadas: {{py.salario-minimo-actividad[no-especificadas]}}.",
    },
  ],
  glosario: [
    { termino: "Actividades especificadas", definicion: "Oficios y sectores con un salario mínimo propio fijado por el Ministerio de Trabajo." },
    { termino: "Jornal", definicion: "El pago por día trabajado." },
  ],
});
