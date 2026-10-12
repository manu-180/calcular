import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "py.renuncia",
  h1: "Calculadora de liquidación por renuncia",
  title: "Liquidación por renuncia en Paraguay: cuánto cobrás",
  description: "Si renunciás, calculá lo que te corresponde: aguinaldo proporcional y vacaciones ganadas, menos el preaviso si no avisaste. Según el Código del Trabajo.",
  intro: [
    "Cuando renunciás no hay indemnización, pero igual te tienen que pagar el aguinaldo proporcional y las vacaciones que ya ganaste y no tomaste.",
    "Si no avisaste con anticipación, el empleador puede descontarte el {{py.preaviso-omitido-trabajador}} del salario del preaviso.",
  ],
  comoSeCalcula: [
    "El aguinaldo proporcional es lo que cobraste desde enero dividido 12.",
    "Las vacaciones no tomadas se pagan con tu salario diario (mensual dividido {{py.divisor-salario-diario}}).",
    "El preaviso depende de tu antigüedad: {{py.preaviso-dias[hasta-1]}} hasta un año, {{py.preaviso-dias[hasta-5]}} hasta cinco, {{py.preaviso-dias[hasta-10]}} hasta diez y {{py.preaviso-dias[mas-10]}} con más de diez.",
    "Si no lo diste, se descuenta el {{py.preaviso-omitido-trabajador}} de ese salario.",
  ],
  ejemplo: [
    "Con Gs. 3.000.000 de salario, un año y medio en la empresa y renuncia el 31 de julio sin avisar: aguinaldo Gs. 1.766.667, vacaciones pendientes Gs. 1.200.000, descuento por preaviso Gs. 2.250.000. Cobrás Gs. 716.667.",
  ],
  faq: [
    {
      pregunta: "¿Qué me corresponde si renuncio?",
      respuesta: "El salario de los días trabajados, el aguinaldo proporcional y las vacaciones que ganaste y no tomaste. No hay indemnización.",
    },
    {
      pregunta: "¿Tengo que avisar antes de renunciar?",
      respuesta: "Sí, si tu contrato es por tiempo indefinido. El aviso va de {{py.preaviso-dias[hasta-1]}} a {{py.preaviso-dias[mas-10]}} según tu antigüedad. Si no avisás, te pueden cobrar la mitad de ese salario.",
    },
    {
      pregunta: "¿Me pagan las vacaciones proporcionales si renuncio?",
      respuesta: "La ley las paga cuando el contrato termina por causa del empleador. En una renuncia se cobran las vacaciones de los años ya cumplidos.",
    },
    {
      pregunta: "¿Y si renuncio porque no me pagan el sueldo?",
      respuesta: "Es una renuncia con causa justificada. Te corresponde lo mismo que en un despido sin causa: indemnización y preaviso. Usá la calculadora de liquidación.",
    },
  ],
  glosario: [
    { termino: "Renuncia", definicion: "Cuando la persona trabajadora decide terminar el contrato." },
    { termino: "Liquidación", definicion: "El pago de todo lo que te deben al terminar el trabajo." },
  ],
});
