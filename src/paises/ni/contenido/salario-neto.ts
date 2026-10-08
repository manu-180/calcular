import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ni.salario-neto",
  h1: "Calculadora de salario neto",
  title: "Salario neto en Nicaragua: descontá INSS e IR",
  description: "Calculá cuánto te queda de tu salario después del INSS laboral ({{ni.inss-laboral[integral]}} en el régimen integral) y de la retención del IR. Con la tarifa de la Ley 822.",
  intro: [
    "De tu salario bruto te descuentan dos cosas cada mes: la cotización al INSS y la retención del IR.",
    "Poné tu salario bruto mensual y tu régimen del INSS. Te mostramos cada descuento y lo que te queda.",
  ],
  comoSeCalcula: [
    "INSS laboral: {{ni.inss-laboral[integral]}} de tu salario en el régimen integral y {{ni.inss-laboral[ivm]}} en el régimen IVM. No tiene techo.",
    "IR: a tu salario se le resta el INSS y el resultado se multiplica por 12. A eso se le aplica la tarifa anual de la Ley 822.",
    "El IR del año se divide entre 12 y esa es la retención de cada mes.",
    "Salario neto: bruto menos INSS menos IR.",
  ],
  ejemplo: ["Con un salario de C$20,000: INSS C$1,400. Renta neta del año: 18,600 × 12 = C$223,200. IR del año C$19,640, o sea C$1,636.67 por mes. Te quedan C$16,963.33."],
  faq: [
    {
      pregunta: "¿Desde cuánto se paga IR?",
      respuesta: "Cuando tu salario menos el INSS, por 12, pasa de {{ni.ir-renta-exenta}} al año. Lo que queda debajo de ese monto no paga.",
    },
    {
      pregunta: "¿El aguinaldo paga INSS o IR?",
      respuesta: "No. El décimo tercer mes está libre de impuestos y cotizaciones.",
    },
    {
      pregunta: "¿Qué régimen del INSS tengo?",
      respuesta: "La mayoría de los asalariados está en el integral, que incluye enfermedad y maternidad. Lo podés ver en tu colilla de pago o preguntarle a tu empleador.",
    },
    {
      pregunta: "¿Por qué mi retención cambia de un mes a otro?",
      respuesta: "Si cobrás horas extras, comisiones o un aumento, el empleador recalcula la retención con lo que vas a ganar en el año.",
    },
  ],
  glosario: [
    { termino: "INSS", definicion: "Instituto Nicaragüense de Seguridad Social. Tu cotización paga pensiones, riesgos laborales y, en el integral, atención de salud." },
    { termino: "IR", definicion: "Impuesto sobre la renta. A los asalariados se lo retiene el empleador cada mes." },
    { termino: "Renta neta", definicion: "Tu salario menos la cotización al INSS. Sobre eso se calcula el IR." },
  ],
});
