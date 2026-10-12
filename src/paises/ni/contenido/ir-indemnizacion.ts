import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ni.ir-indemnizacion",
  h1: "Calculadora del IR sobre la indemnización en Nicaragua",
  title: "IR sobre la indemnización en Nicaragua: cuánto retienen",
  description: "En Nicaragua la indemnización laboral está exenta del IR hasta {{ni.ir-indemnizacion-meses-exentos}} de salario más {{ni.ir-indemnizacion-exencion-adicional}}. Calculá si te retienen algo.",
  intro: [
    "Cuando termina tu contrato y te pagan una indemnización, casi siempre no pagás IR por ella. La ley la deja exenta hasta {{ni.ir-indemnizacion-meses-exentos}} de salario.",
    "Si te pagan más, el excedente también está exento hasta {{ni.ir-indemnizacion-exencion-adicional}}. Solo lo que pasa de ahí paga una retención definitiva del {{ni.ir-retencion-indemnizacion}}.",
  ],
  comoSeCalcula: [
    "Se multiplica tu salario mensual por {{ni.ir-indemnizacion-meses-exentos}}: hasta ese monto la indemnización está exenta.",
    "Lo que pasa de ese tope queda exento hasta {{ni.ir-indemnizacion-exencion-adicional}} más.",
    "Al excedente se le retiene el {{ni.ir-retencion-indemnizacion}}. Esa retención es definitiva.",
  ],
  ejemplo: [
    "Ganás C$150,000 al mes y te pagan C$1,500,000 de indemnización. Los primeros C$750,000 están exentos, después C$500,000 más. Quedan C$250,000 gravados: te retienen C$37,500.",
  ],
  faq: [
    {
      pregunta: "¿La indemnización por antigüedad paga IR en Nicaragua?",
      respuesta: "No, mientras no pase de {{ni.ir-indemnizacion-meses-exentos}} de salario. La indemnización del artículo 45 del Código del Trabajo llega como máximo a cinco meses, así que en general queda toda exenta.",
    },
    {
      pregunta: "¿Cuándo me retienen IR sobre la indemnización?",
      respuesta: "Cuando la suma de indemnizaciones pasa de {{ni.ir-indemnizacion-meses-exentos}} de salario más {{ni.ir-indemnizacion-exencion-adicional}}. Puede pasar con indemnizaciones de una convención colectiva o pactadas en el contrato.",
    },
    {
      pregunta: "¿La retención se suma a mi IR anual?",
      respuesta: "No. Es una retención definitiva: con ella queda pagado el IR de esa parte de la indemnización.",
    },
    {
      pregunta: "¿Qué indemnizaciones entran en la exención?",
      respuesta: "Las que te pagan por el Código del Trabajo, otras leyes laborales o la convención colectiva (artículo 19 de la Ley de Concertación Tributaria).",
    },
  ],
  glosario: [
    { termino: "Retención definitiva", definicion: "Un IR que se cobra una sola vez sobre un pago y no se vuelve a declarar." },
    { termino: "Ley de Concertación Tributaria", definicion: "La Ley 822 y sus reformas, que regulan el IR en Nicaragua." },
  ],
});
