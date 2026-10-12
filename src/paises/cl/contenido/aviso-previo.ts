import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "cl.aviso-previo",
  h1: "Calculadora de indemnización por aviso previo",
  title: "Aviso previo de despido: ¿te deben un mes de sueldo?",
  description:
    "Revisa si te avisaron del despido con {{cl.aviso-previo-dias}} de anticipación. Si no, te deben una remuneración con tope de {{cl.tope-indemnizacion}}.",
  intro: [
    "Cuando te despiden por necesidades de la empresa o por desahucio, el empleador tiene que avisarte con {{cl.aviso-previo-dias}} de anticipación. Si no lo hace, te paga una remuneración mensual más.",
    "Ingresa la fecha de la carta, tu último día y tu remuneración. Te decimos si corresponde y cuánto es.",
  ],
  comoSeCalcula: [
    "Contamos los días corridos entre la entrega de la carta y tu último día de trabajo.",
    "Si son menos de {{cl.aviso-previo-dias}}, corresponde la indemnización sustitutiva del aviso previo.",
    "El monto es tu última remuneración mensual, con un tope de {{cl.tope-indemnizacion}} pasado a pesos con la UF del día.",
  ],
  ejemplo: ["Te entregaron la carta el mismo día del despido y ganabas $950.000. Te deben $950.000 por aviso previo, además de la indemnización por años de servicio si llevas un año o más."],
  faq: [
    {
      pregunta: "¿En qué despidos se paga el aviso previo?",
      respuesta: "En el despido por necesidades de la empresa y en el desahucio. En la renuncia o en un despido por causal disciplinaria no se paga.",
    },
    {
      pregunta: "¿El aviso previo es lo mismo que la indemnización por años de servicio?",
      respuesta: "No. Son dos pagos distintos y se pueden sumar. El aviso previo es un mes; la otra depende de tus años de trabajo.",
    },
    {
      pregunta: "¿Cómo se cuentan los 30 días?",
      respuesta: "Son días corridos, desde que recibes la carta hasta tu último día de trabajo.",
    },
    {
      pregunta: "¿Paga impuesto?",
      respuesta: "No. La indemnización sustitutiva del aviso previo no paga impuesto ni cotizaciones.",
    },
  ],
  glosario: [
    { termino: "Indemnización sustitutiva del aviso previo", definicion: "Pago de una remuneración mensual cuando el empleador no avisa el despido con 30 días de anticipación." },
    { termino: "Desahucio", definicion: "Término del contrato que el empleador decide sin invocar una causal, posible solo en ciertos cargos de confianza." },
  ],
});
