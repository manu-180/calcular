import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "mx.prima-de-antiguedad",
  h1: "Calculadora de prima de antigüedad 2026",
  title: "Prima de antigüedad 2026: cuánto te toca y cuándo",
  description:
    "Calcula tu prima de antigüedad: {{mx.dias-prima-antiguedad}} de salario por año, con el tope de dos salarios mínimos. Mira si te toca al renunciar y cuánto paga ISR.",
  intro: [
    "La prima de antigüedad es un pago extra al terminar la relación de trabajo: {{mx.dias-prima-antiguedad}} de salario por cada año que trabajaste.",
    "Si te despiden te toca siempre, con o sin causa. Si renuncias, solo con {{mx.anios-prima-antiguedad-renuncia}} de antigüedad o más. Si el trabajador fallece, la cobran sus beneficiarios.",
  ],
  comoSeCalcula: [
    "Cuenta tus años de servicio, con la fracción del último año.",
    "Toma tu salario diario. Si pasa del doble del salario mínimo de tu zona, se usa ese tope; si es menor al mínimo, se usa el mínimo.",
    "Multiplica ese salario por {{mx.dias-prima-antiguedad}} y por tus años de servicio.",
    "No paga ISR hasta {{mx.exencion-indemnizacion}} por año de servicio, sumando la prima con la indemnización y otros pagos por separación.",
  ],
  ejemplo: [
    "Con 16 años y medio de antigüedad y un salario de 400 pesos diarios, la prima de antigüedad es de unos 79,600 pesos, aunque renuncies.",
  ],
  faq: [
    {
      pregunta: "¿Me pagan prima de antigüedad si renuncio?",
      respuesta: "Solo si tienes {{mx.anios-prima-antiguedad-renuncia}} de servicio o más. Antes de eso, al renunciar no te toca.",
    },
    {
      pregunta: "¿Cuál es el tope del salario para la prima de antigüedad?",
      respuesta: "El doble del salario mínimo de tu zona: {{mx.salario-minimo@general}} en la zona general y {{mx.salario-minimo@frontera-norte}} en la frontera norte, por dos.",
    },
    {
      pregunta: "¿Me toca si me despiden con causa justificada?",
      respuesta: "Sí. La prima de antigüedad se paga en cualquier despido, justificado o no, sin importar los años de servicio.",
    },
    {
      pregunta: "¿Va incluida en el finiquito o en la liquidación?",
      respuesta: "Sí, cuando corresponde. Es una prestación aparte de la indemnización y se suma al total.",
    },
  ],
  glosario: [
    { termino: "Prima de antigüedad", definicion: "Pago de {{mx.dias-prima-antiguedad}} de salario por año de servicio al terminar el trabajo (Ley Federal del Trabajo, artículo 162)." },
  ],
});
