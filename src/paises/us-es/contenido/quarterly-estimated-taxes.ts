import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "us-es.quarterly-estimated-taxes",
  h1: "Calculadora de impuestos estimados trimestrales",
  title: "Impuestos estimados trimestrales {{anio}} (Formulario 1040-ES)",
  description: "Calcula tus pagos de impuesto estimado de {{anio}} con las reglas de puerto seguro del IRS: {{us.safe-harbor-current}} del impuesto de este año o {{us.safe-harbor-prior}} a {{us.safe-harbor-prior-high}} del año pasado.",
  intro: [
    "Si trabajas por cuenta propia o tienes ingresos sin retención, el IRS espera que pagues impuestos durante el año en cuatro cuotas.",
    "Escribe el impuesto que esperas este año, tu retención y tu declaración del año pasado para ver los pagos más bajos que evitan la multa por pago insuficiente.",
  ],
  comoSeCalcula: [
    "Necesitas hacer pagos estimados si esperas deber al menos {{us.estimated-tax-min}} después de la retención y los créditos.",
    "Para estar seguro, tu retención más los pagos deben cubrir lo menor entre el {{us.safe-harbor-current}} del impuesto de este año y el {{us.safe-harbor-prior}} del impuesto del año pasado.",
    "Si el AGI del año pasado pasó de {{us.safe-harbor-agi[other]}} ({{us.safe-harbor-agi[mfs]}} si eres casado y declaras por separado), se usa el {{us.safe-harbor-prior-high}} del impuesto del año pasado.",
    "Se resta tu retención y el resto se divide en cuatro pagos iguales.",
  ],
  ejemplo: [
    "Esperas $20,000 de impuesto, te retienen $5,000 y el impuesto del año pasado fue de $16,000. Pagar $16,000 en total es suficiente, así que envías $11,000 en cuatro pagos de $2,750.",
  ],
  faq: [
    { pregunta: "¿Cuándo vencen los impuestos estimados?", respuesta: "Para 2026: el 15 de abril, el 15 de junio y el 15 de septiembre de 2026, y el 15 de enero de 2027. Puedes saltarte el pago de enero si presentas tu declaración de 2026 y pagas el saldo antes del 1 de febrero de 2027." },
    { pregunta: "¿Qué pasa si pago muy poco?", respuesta: "El IRS cobra una multa sobre cada pago insuficiente por los días que queda sin pagar. Las instrucciones del Formulario 2210 explican cómo se calcula y cuándo se puede eximir." },
    { pregunta: "¿Puedo aumentar mi retención en su lugar?", respuesta: "Sí. Si también tienes un empleo, el impuesto retenido de tus cheques cuenta para el monto seguro. El Estimador de Retención de Impuestos del IRS te ayuda a llenar el Formulario W-4 correcto." },
  ],
  glosario: [
    { termino: "Puerto seguro (safe harbor)", definicion: "Un nivel de pago que te protege de la multa por pago insuficiente aunque debas más al declarar." },
    { termino: "Formulario 1040-ES", definicion: "El formulario del IRS con la hoja de cálculo y los comprobantes para los pagos de impuesto estimado." },
  ],
});
