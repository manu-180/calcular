import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "us-es.quarterly-estimated-taxes",
  h1: "Calculadora de impuestos estimados trimestrales",
  title: "Impuestos estimados trimestrales 2026 (Formulario 1040-ES)",
  description: "Calcule sus pagos de impuesto estimado de 2026 con las reglas de puerto seguro del IRS: {{us.safe-harbor-current}} del impuesto de este año o {{us.safe-harbor-prior}} a {{us.safe-harbor-prior-high}} del año pasado.",
  intro: [
    "Si trabaja por cuenta propia o tiene ingresos sin retención, el IRS espera que pague impuestos durante el año en cuatro cuotas.",
    "Indique el impuesto que espera este año, su retención y su declaración del año pasado para ver los pagos más bajos que evitan la multa por pago insuficiente.",
  ],
  comoSeCalcula: [
    "Necesita hacer pagos estimados si espera deber al menos {{us.estimated-tax-min}} después de la retención y los créditos.",
    "Para estar seguro, su retención más los pagos deben cubrir lo menor entre el {{us.safe-harbor-current}} del impuesto de este año y el {{us.safe-harbor-prior}} del impuesto del año pasado.",
    "Si el AGI del año pasado pasó de {{us.safe-harbor-agi[other]}} ({{us.safe-harbor-agi[mfs]}} si es casado y declara por separado), use el {{us.safe-harbor-prior-high}} del impuesto del año pasado.",
    "Reste su retención y divida el resto en cuatro pagos iguales.",
  ],
  ejemplo: [
    "Espera $20,000 de impuesto, le retienen $5,000 y el impuesto del año pasado fue de $16,000. Pagar $16,000 en total es suficiente, así que envía $11,000 en cuatro pagos de $2,750.",
  ],
  faq: [
    { pregunta: "¿Cuándo vencen los impuestos estimados?", respuesta: "Para 2026: el 15 de abril, el 15 de junio y el 15 de septiembre de 2026, y el 15 de enero de 2027. Puede saltarse el pago de enero si presenta su declaración de 2026 y paga el saldo antes del 1 de febrero de 2027." },
    { pregunta: "¿Qué pasa si pago muy poco?", respuesta: "El IRS cobra una multa sobre cada pago insuficiente por los días que queda sin pagar. Las instrucciones del Formulario 2210 explican cómo se calcula y cuándo se puede eximir." },
    { pregunta: "¿Puedo aumentar mi retención en su lugar?", respuesta: "Sí. Si también tiene un empleo, el impuesto retenido de sus cheques cuenta para el monto seguro. El Estimador de Retención de Impuestos del IRS le ayuda a llenar el Formulario W-4 correcto." },
  ],
  glosario: [
    { termino: "Puerto seguro (safe harbor)", definicion: "Un nivel de pago que lo protege de la multa por pago insuficiente aunque deba más al declarar." },
    { termino: "Formulario 1040-ES", definicion: "El formulario del IRS con la hoja de cálculo y los comprobantes para los pagos de impuesto estimado." },
  ],
});
