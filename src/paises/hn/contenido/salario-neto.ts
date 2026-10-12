import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "hn.salario-neto",
  h1: "Calculadora de salario neto en Honduras",
  title: "Salario neto en Honduras: IHSS, RAP e ISR",
  description: "Calcule cuánto recibe en mano después de los descuentos del IHSS, el RAP y el ISR.",
  intro: [
    "Del salario bruto se descuentan las cuotas del IHSS, el aporte al RAP y, si corresponde, el ISR.",
    "Escriba su salario mensual y le mostramos cada descuento y su salario neto.",
  ],
  comoSeCalcula: [
    "IHSS: {{hn.ihss-ivm[trabajador]}} de Invalidez, Vejez y Muerte y {{hn.ihss-em[trabajador]}} de Enfermedad y Maternidad, hasta el techo de {{hn.ihss-techo}}.",
    "RAP: {{hn.rap-aporte[trabajador]}} sobre lo que pasa del techo del IHSS.",
    "ISR: tabla progresiva anual, con la deducción de {{hn.isr-deduccion-gastos-medicos}} por gastos médicos, dividida entre 12.",
  ],
  faq: [],
  glosario: [{ termino: "Salario neto", definicion: "Lo que recibe en mano después de los descuentos de ley." }],
});
