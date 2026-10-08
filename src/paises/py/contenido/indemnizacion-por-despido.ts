import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "py.indemnizacion-por-despido",
  h1: "Calculadora de indemnización por despido y preaviso",
  title: "Indemnización por despido Paraguay: calculá con preaviso",
  description: "Si te despidieron sin causa, calculá tu indemnización ({{py.indemnizacion-dias-por-anio}} de salario por año) y el preaviso según tu antigüedad. Gratis, según el Código del Trabajo.",
  intro: [
    "La indemnización por despido en Paraguay es de {{py.indemnizacion-dias-por-anio}} de salario por cada año trabajado o fracción de más de seis meses. Te corresponde si te despiden sin causa justificada. Si además no te avisaron con anticipación, también te pagan el preaviso.",
    "Poné tu salario promedio de los últimos seis meses y las fechas de ingreso y salida.",
  ],
  comoSeCalcula: [
    "Tu salario diario es el promedio mensual de los últimos seis meses dividido {{py.divisor-salario-diario}}.",
    "La indemnización son {{py.indemnizacion-dias-por-anio}} de salario por cada año trabajado. Una fracción de más de seis meses cuenta como un año más.",
    "El preaviso depende de tu antigüedad: {{py.preaviso-dias[hasta-1]}} hasta un año, {{py.preaviso-dias[hasta-5]}} hasta cinco, {{py.preaviso-dias[hasta-10]}} hasta diez y {{py.preaviso-dias[mas-10]}} con más de diez.",
    "Si no te dieron el preaviso, te lo pagan en dinero. La indemnización se paga igual, haya o no preaviso.",
  ],
  ejemplo: [
    "Con 7 años y 8 meses en la empresa y un salario promedio de Gs. 3.000.000, te indemnizan 8 años: Gs. 100.000 por día por {{py.indemnizacion-dias-por-anio}} por 8, que da Gs. 12.000.000. Si no te avisaron, sumás {{py.preaviso-dias[hasta-10]}} de preaviso: Gs. 6.000.000.",
  ],
  faq: [
    {
      pregunta: "¿Cuánto me corresponde de indemnización por 1 año de trabajo?",
      respuesta: "{{py.indemnizacion-dias-por-anio}} de salario. Si además no te avisaron con anticipación, se suman {{py.preaviso-dias[hasta-1]}} de preaviso.",
    },
    {
      pregunta: "¿Cuántos días de preaviso me corresponden?",
      respuesta: "{{py.preaviso-dias[hasta-1]}} hasta un año de antigüedad, {{py.preaviso-dias[hasta-5]}} hasta cinco, {{py.preaviso-dias[hasta-10]}} hasta diez y {{py.preaviso-dias[mas-10]}} con más de diez.",
    },
    {
      pregunta: "¿Si trabajé menos de un año me corresponde indemnización?",
      respuesta: "Sí, si trabajaste más de seis meses. Esa fracción cuenta como un año entero. Con seis meses o menos no hay indemnización, pero sí preaviso.",
    },
    {
      pregunta: "¿Qué pasa si tengo más de diez años en la empresa?",
      respuesta: "Tenés estabilidad. Solo te pueden despedir con una causa probada ante el juez. Si no se puede reintegrarte, la indemnización es el doble.",
    },
    {
      pregunta: "¿La indemnización incluye vacaciones y aguinaldo?",
      respuesta: "No, se pagan aparte. Para verlos todos juntos, usá la calculadora de liquidación final.",
    },
  ],
  glosario: [
    { termino: "Indemnización", definicion: "Lo que paga el empleador por despedir sin causa justificada (artículo 91 del Código del Trabajo)." },
    { termino: "Preaviso", definicion: "El aviso con días de anticipación antes del despido (artículo 87). Si no se da, se paga." },
    { termino: "Estabilidad", definicion: "La protección que gana quien cumple diez años seguidos con el mismo empleador." },
  ],
});
