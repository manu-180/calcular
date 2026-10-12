import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ni.anticipo-ir",
  h1: "Calculadora del anticipo mensual del IR en Nicaragua",
  title: "Anticipo del IR en Nicaragua: calculá el pago del mes",
  description: "Calculá el anticipo mensual del IR en Nicaragua: {{ni.pago-minimo[demas]}} de tus ingresos brutos, {{ni.pago-minimo[principales]}} si sos principal contribuyente y {{ni.pago-minimo[grandes]}} si sos grande.",
  intro: [
    "Los negocios del régimen general pagan cada mes un anticipo del IR sobre sus ingresos brutos. Es el pago mínimo definitivo, dividido en meses.",
    "Poné tus ingresos del mes y las retenciones que te hicieron. Te decimos cuánto pagar.",
  ],
  comoSeCalcula: [
    "Anticipo: {{ni.pago-minimo[demas]}} de los ingresos brutos del mes. {{ni.pago-minimo[principales]}} para los principales contribuyentes y {{ni.pago-minimo[grandes]}} para los grandes.",
    "Se restan las retenciones a cuenta del IR que te hicieron ese mes.",
    "Si las retenciones son mayores, no pagás y el saldo queda a favor para los meses siguientes.",
  ],
  ejemplo: ["Con ventas de C$300,000 en el mes y C$1,500 de retenciones, el anticipo es C$3,000 y pagás C$1,500."],
  faq: [
    {
      pregunta: "¿Cuánto es el anticipo del IR en Nicaragua?",
      respuesta: "{{ni.pago-minimo[demas]}} de los ingresos brutos del mes para la mayoría. {{ni.pago-minimo[principales]}} para los principales contribuyentes y {{ni.pago-minimo[grandes]}} para los grandes.",
    },
    {
      pregunta: "¿Puedo restar las retenciones que me hicieron?",
      respuesta: "Sí. Las retenciones mensuales sobre tus ventas de bienes y servicios se acreditan contra el anticipo.",
    },
    {
      pregunta: "¿Quiénes no pagan anticipo?",
      respuesta: "Entre otros, los negocios en sus primeros tres años con inversión nueva y los que tienen precios regulados por el Estado. También quienes están en cuota fija.",
    },
    {
      pregunta: "¿Qué pasa con los anticipos al final del año?",
      respuesta: "Se suman y se comparan con el IR anual: pagás el mayor entre el IR sobre tu renta neta y el pago mínimo, menos lo que ya anticipaste.",
    },
  ],
  glosario: [
    { termino: "Ingresos brutos", definicion: "Todo lo que vendiste o cobraste en el mes, sin restar gastos." },
    { termino: "Grandes contribuyentes", definicion: "Las empresas que la DGI clasifica así por su tamaño." },
  ],
});
