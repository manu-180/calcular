import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ni.liquidacion",
  h1: "Calculadora de liquidación",
  title: "Liquidación en Nicaragua: calculá cuánto te toca",
  description: "Calculá tu liquidación: indemnización por antigüedad, aguinaldo proporcional y vacaciones que no gozaste. Con las reglas del Código del Trabajo.",
  intro: [
    "Cuando termina el contrato, te tienen que pagar todo lo que acumulaste. Esta calculadora suma las tres partes principales.",
    "Poné tus fechas, cómo terminó el contrato y tu salario. Si sabés cuántos días de vacaciones te quedan, ponelos.",
  ],
  comoSeCalcula: [
    "Indemnización por antigüedad: {{ni.indemnizacion-meses-por-anio}} de salario por cada uno de los tres primeros años y {{ni.indemnizacion-dias-desde-cuarto-anio}} por año desde el cuarto, con un máximo de {{ni.indemnizacion-tope-meses}}.",
    "Si te despiden sin causa justificada, la indemnización es de al menos {{ni.indemnizacion-minimo-meses}} de salario. Si renunciás, se paga por el tiempo trabajado.",
    "Aguinaldo proporcional: {{ni.aguinaldo-meses}} de salario por año, contado desde el 1 de diciembre hasta tu último día.",
    "Vacaciones: {{ni.vacaciones-dias-por-semestre}} por cada seis meses. Se pagan con el salario diario (mensual entre 30).",
  ],
  ejemplo: [
    "Entraste el 1 de marzo de 2022, te despidieron el 30 de septiembre de 2026 y ganás C$12,000. Te tocan C$48,690.41 de antigüedad, C$9,994.52 de aguinaldo y C$7,036 de vacaciones. En total, C$65,720.93.",
  ],
  faq: [
    {
      pregunta: "¿Qué me tienen que pagar si renuncio?",
      respuesta: "El aguinaldo y las vacaciones proporcionales, y lo ganado por antigüedad. La renuncia no te quita ese derecho (artículo 43).",
    },
    {
      pregunta: "¿Tengo que avisar antes de renunciar?",
      respuesta: "Sí. En un contrato por tiempo indeterminado tenés que avisar por escrito con {{ni.preaviso-renuncia}} de anticipación.",
    },
    {
      pregunta: "¿En cuánto tiempo me tienen que pagar?",
      respuesta: "El aguinaldo proporcional, dentro de los diez días siguientes al final del contrato. Lo demás se paga junto con la liquidación.",
    },
    {
      pregunta: "¿La liquidación paga INSS o IR?",
      respuesta: "El aguinaldo y la indemnización del Código del Trabajo están exentos. Las vacaciones que te pagan sí entran en el cálculo del IR.",
    },
  ],
  glosario: [
    { termino: "Liquidación", definicion: "Todo lo que te pagan al terminar el contrato: antigüedad, aguinaldo y vacaciones proporcionales." },
    { termino: "Mutuo acuerdo", definicion: "Cuando vos y el empleador deciden juntos terminar el contrato." },
  ],
});
