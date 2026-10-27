import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "py.liquidacion",
  h1: "Calculadora de liquidación final en Paraguay",
  title: "Liquidación laboral Paraguay {{anio}}: calculá tu finiquito",
  description: "Calculá tu liquidación por despido o renuncia: preaviso, indemnización, vacaciones y aguinaldo proporcional, concepto por concepto. Gratis.",
  intro: [
    "La liquidación final en Paraguay suma lo que te deben al terminar el trabajo: el aguinaldo proporcional y las vacaciones siempre, y el preaviso y la indemnización si te despidieron sin causa.",
    "Poné tu salario promedio, las fechas y las vacaciones que te quedaron. Te mostramos cada concepto por separado.",
  ],
  comoSeCalcula: [
    "El salario diario es tu salario mensual dividido {{py.divisor-salario-diario}}.",
    "Preaviso: si te despiden sin aviso, te pagan los días que correspondían. Son {{py.preaviso-dias[hasta-1]}} hasta el primer año y llegan a {{py.preaviso-dias[mas-10]}} con más de diez años.",
    "Indemnización: solo en el despido sin causa. Son {{py.indemnizacion-dias-por-anio}} de salario por cada año trabajado o fracción de más de seis meses.",
    "Vacaciones: las ganadas que no tomaste se pagan siempre. Si te despiden después del plazo para tomarlas, se pagan el doble.",
    "Aguinaldo: la doceava parte de lo que cobraste en el año. Se paga en cualquier caso.",
    "Si renunciás sin dar preaviso, el empleador puede descontarte la mitad del salario de ese período.",
  ],
  ejemplo: [
    "Entraste el 1 de marzo de 2023, ganás Gs. 4.500.000 y te despiden sin aviso el 31 de agosto de 2026. Tenés 3 años y 6 meses: te indemnizan 3 años (la fracción no pasa de seis meses).",
    "Tu salario diario es Gs. 150.000. La indemnización son {{py.indemnizacion-dias-por-anio}} por cada uno de esos 3 años, o sea 45 días de salario: Gs. 6.750.000. El preaviso no otorgado son otros {{py.preaviso-dias[hasta-5]}}: Gs. 6.750.000. A eso se suman las vacaciones y el aguinaldo proporcional.",
  ],
  faq: [
    {
      pregunta: "¿Cuánto me corresponde de liquidación por 1 año de trabajo?",
      respuesta: "Si te despiden sin causa con un año exacto: {{py.preaviso-dias[hasta-1]}} de preaviso (si no te avisaron), {{py.indemnizacion-dias-por-anio}} de indemnización, las vacaciones que no tomaste y el aguinaldo proporcional.",
    },
    {
      pregunta: "¿Si renuncio cobro liquidación?",
      respuesta: "Sí, pero solo el aguinaldo proporcional y las vacaciones que no tomaste. La indemnización y el preaviso son para el despido sin causa.",
    },
    {
      pregunta: "¿Qué salario se usa para la indemnización?",
      respuesta: "El promedio de lo que cobraste en los últimos seis meses, con horas extra y comisiones. Si trabajaste menos, el promedio de ese tiempo.",
    },
    {
      pregunta: "¿Qué es el finiquito?",
      respuesta: "Es el documento con el que se cierra la relación laboral y se detalla la liquidación final. Antes de firmarlo, revisá que estén todos los conceptos que te corresponden.",
    },
    {
      pregunta: "¿Dónde reclamo si no me pagan la liquidación?",
      respuesta: "En el Ministerio de Trabajo, Empleo y Seguridad Social (MTESS). Llevá tus recibos de salario y cualquier constancia del despido.",
    },
  ],
  glosario: [
    { termino: "Preaviso", definicion: "El aviso anticipado que debe dar quien termina el contrato. Si no se da, se paga en dinero." },
    { termino: "Despido sin causa", definicion: "El que no se basa en ninguna de las causas justificadas del Código del Trabajo." },
    { termino: "Vacaciones causadas", definicion: "Las que ya ganaste por un año de trabajo cumplido y todavía no tomaste." },
  ],
});
