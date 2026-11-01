import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ni.salario-neto",
  h1: "Calculadora de salario neto en Nicaragua",
  title: "Salario neto en Nicaragua {{anio}}: descontá INSS e IR",
  description: "Calculá tu salario neto en Nicaragua: INSS laboral de {{ni.inss-laboral[integral]}} en el régimen integral y retención del IR con la tarifa de la Ley 822. Ves cada descuento.",
  intro: [
    "Tu salario neto en Nicaragua es el bruto menos el INSS laboral ({{ni.inss-laboral[integral]}} en el régimen integral) y la retención del IR. Son los dos descuentos de cada mes.",
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
      pregunta: "¿Cuánto me descuentan de INSS?",
      respuesta: "{{ni.inss-laboral[integral]}} de tu salario en el régimen integral y {{ni.inss-laboral[ivm]}} en el IVM. No tiene techo: se aplica sobre todo el salario.",
    },
    {
      pregunta: "¿Desde cuánto se paga IR?",
      respuesta: "Cuando tu salario menos el INSS, por 12, pasa de {{ni.ir-renta-exenta}} al año. Lo que queda debajo de ese monto no paga.",
    },
    {
      pregunta: "¿Cuánto me queda si gano C$20,000?",
      respuesta: "C$16,963.33 en el régimen integral: te descuentan C$1,400 de INSS y C$1,636.67 de IR.",
    },
    {
      pregunta: "¿Qué régimen del INSS tengo?",
      respuesta: "La mayoría de los asalariados está en el integral, que incluye enfermedad y maternidad. Lo podés ver en tu colilla de pago o preguntarle a tu empleador.",
    },
    {
      pregunta: "¿El aguinaldo paga INSS o IR?",
      respuesta: "No. El décimo tercer mes está libre de impuestos y cotizaciones.",
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
