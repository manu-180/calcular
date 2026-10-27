import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "mx.isr-arrendamiento",
  h1: "Calculadora de ISR por arrendamiento {{anio}}",
  title: "ISR por rentas {{anio}}: calcula tu pago mensual",
  description:
    "Calcula el pago provisional mensual de ISR por rentar una casa o local, con la deducción opcional del {{mx.deduccion-ciega-arrendamiento}} o gastos reales, predial y retención.",
  intro: [
    "Si rentas un inmueble como persona física, cada mes pagas un adelanto del ISR. Puedes restar tus gastos reales con factura o una deducción opcional del {{mx.deduccion-ciega-arrendamiento}} de la renta, sin facturas.",
    "Si tu inquilino es una empresa, te retiene parte del ISR. Escribe la renta del mes y elige cómo deduces.",
  ],
  comoSeCalcula: [
    "Deducción opcional: {{mx.deduccion-ciega-arrendamiento}} de la renta, más el predial. O, si lo prefieres, tus gastos reales con factura más el predial.",
    "Base: renta menos deducciones.",
    "Se aplica la tarifa mensual del ISR a la base.",
    "Si te paga una persona moral, te retiene {{mx.retencion-isr-arrendamiento}} de la renta y eso se resta de lo que pagas.",
  ],
  ejemplo: ["Con una renta de 20,000 pesos y la deducción opcional, la base es de 13,000 y el ISR del mes de 1,076. Si te paga una empresa, te retiene 2,000 y ya no pagas nada ese mes."],
  faq: [
    {
      pregunta: "¿Qué es la deducción ciega en arrendamiento?",
      respuesta: "Es la deducción opcional del {{mx.deduccion-ciega-arrendamiento}} de tus ingresos por renta. No necesitas facturas de gastos y además puedes restar el predial.",
    },
    {
      pregunta: "¿Me conviene la deducción ciega o los gastos reales?",
      respuesta: "Si tus gastos con factura son menores al {{mx.deduccion-ciega-arrendamiento}} de la renta, la deducción ciega te deja pagar menos. Prueba las dos opciones en la calculadora.",
    },
    {
      pregunta: "¿Puedo pagar cada tres meses?",
      respuesta: "Si solo tienes ingresos por arrendamiento y no pasan de diez salarios mínimos mensuales, la ley te deja hacer pagos trimestrales.",
    },
    {
      pregunta: "¿Cobro IVA por la renta?",
      respuesta: "Depende del inmueble. Esta calculadora solo hace el ISR; revisa tu caso de IVA con tu contador o en el SAT.",
    },
  ],
  glosario: [{ termino: "Pago provisional", definicion: "Adelanto mensual del ISR que se ajusta en la declaración anual." }],
});
