import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "gt.terminacion-contrato-plazo-fijo",
  h1: "Calculadora por terminación anticipada de un contrato a plazo fijo",
  title: "Despido en contrato a plazo fijo en Guatemala: pago mínimo",
  description:
    "Calcule el pago mínimo de daños y perjuicios si su patrono termina antes y sin causa su contrato a plazo fijo o por obra determinada.",
  intro: [
    "Si su contrato es a plazo fijo o por obra determinada y su patrono lo termina antes de tiempo sin causa justificada, le tiene que pagar daños y perjuicios.",
    "La ley fija un mínimo: {{gt.plazo-fijo-dias-por-mes}} de salario por cada mes trabajado. La fracción de mes cuenta como mes. Un inspector de trabajo o un juez pueden fijar un monto mayor.",
  ],
  comoSeCalcula: [
    "Meses trabajados desde el inicio del contrato. Si sobra una fracción, cuenta como un mes más.",
    "Días de salario = meses × {{gt.plazo-fijo-dias-por-mes}}.",
    "Pago mínimo = salario mensual / 30 × días de salario.",
  ],
  ejemplo: ["Con Q6,000 de salario y tres meses y medio trabajados, el pago mínimo es de 4 días: Q800."],
  faq: [
    {
      pregunta: "¿Cuándo me tienen que pagar?",
      respuesta: "El mismo día en que termina el contrato. Ese mínimo se descuenta de un monto mayor que puedan fijar después las autoridades de trabajo.",
    },
    {
      pregunta: "¿Además me toca indemnización?",
      respuesta: "La indemnización por despido es para contratos por tiempo indefinido. En un contrato a plazo fijo le corresponden los daños y perjuicios, más su aguinaldo, Bono 14 y vacaciones proporcionales.",
    },
    {
      pregunta: "¿Qué pasa si mi contrato a plazo se renovó varias veces?",
      respuesta: "Si el trabajo es permanente y lo renuevan una y otra vez, la ley puede considerarlo un contrato por tiempo indefinido. En ese caso sí le toca indemnización. Consulte en la Inspección General de Trabajo.",
    },
  ],
  glosario: [
    { termino: "Contrato a plazo fijo", definicion: "Contrato con fecha de fin pactada o que termina al ocurrir un hecho previsto." },
    { termino: "Daños y perjuicios", definicion: "Pago que compensa a la otra parte por terminar el contrato antes de tiempo." },
  ],
});
