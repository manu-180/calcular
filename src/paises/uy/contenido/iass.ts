import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "uy.iass",
  h1: "Calculadora del IASS para jubilados y pensionistas",
  title: "IASS {{anio}}: cuánto le descuentan a tu jubilación",
  description:
    "Calculá el IASS de tu jubilación o pensión: exento hasta 9 BPC por mes y después por franjas, con la BPC de {{uy.bpc}}. Anticipo mensual y total del año.",
  intro: [
    "El IASS es el impuesto que pagan las jubilaciones y pensiones. Funciona parecido al IRPF: hasta cierto monto no se paga y después se paga por franjas.",
    "Escribí tu pasividad nominal y te mostramos cuánto te retienen por mes y en el año.",
  ],
  comoSeCalcula: [
    "El impuesto es anual y se cobra con anticipos mensuales. Para el anticipo se divide la escala anual entre 12.",
    "La BPC de este año es {{uy.bpc}}. Con ella se arman las franjas.",
    "Cada parte de tu pasividad paga la tasa de su franja, como en el IRPF.",
  ],
  ejemplo: ["Con una jubilación de $ 80.000 por mes, pagás 6 % sobre lo que pasa de $ 61.776: $ 1.093,44 por mes."],
  faq: [
    {
      pregunta: "¿Desde qué monto se paga IASS en 2026?",
      respuesta: "Desde 9 BPC por mes (108 BPC al año). La BPC de este año es {{uy.bpc}}: la calculadora te muestra el mínimo en pesos.",
    },
    {
      pregunta: "¿Cuáles son las franjas del IASS?",
      respuesta: "En el año: exento hasta 108 BPC, 6 % de 108 a 180 BPC, 24 % de 180 a 600 BPC y 30 % por encima.",
    },
    {
      pregunta: "¿El aguinaldo de la jubilación paga IASS?",
      respuesta: "Sí, entra en los ingresos del año. Esta calculadora muestra el anticipo de un mes común.",
    },
    {
      pregunta: "¿Qué pasa si cobro dos pasividades?",
      respuesta: "Cada organismo te retiene por separado y no sabe de la otra. Si la suma pasa el mínimo, podés pedir al BPS que te retenga por el total, o pagar la diferencia en la declaración jurada.",
    },
  ],
  glosario: [
    { termino: "IASS", definicion: "Impuesto de Asistencia a la Seguridad Social. Lo pagan jubilaciones y pensiones." },
    { termino: "Pasividad", definicion: "Una jubilación o una pensión." },
  ],
});
