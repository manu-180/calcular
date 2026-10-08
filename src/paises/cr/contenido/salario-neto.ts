import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "cr.salario-neto",
  h1: "Calculadora de salario neto en Costa Rica",
  title: "Salario neto 2026 Costa Rica: calcule rebajos CCSS y renta",
  description:
    "Calcule su salario neto: le restamos la Caja ({{cr.ccss-sem-trabajador}} salud y {{cr.ccss-ivm-trabajador}} pensión), el Banco Popular y el impuesto al salario 2026. Vea cada rebajo.",
  intro: [
    "El salario neto en Costa Rica es el bruto menos {{cr.ccss-sem-trabajador}} del Seguro de Salud, {{cr.ccss-ivm-trabajador}} del IVM, {{cr.banco-popular-trabajador}} del Banco Popular y, si corresponde, el impuesto al salario.",
    "Escriba su salario bruto mensual y le mostramos cada rebajo de ley y lo que le queda en mano.",
  ],
  comoSeCalcula: [
    "Seguro de Salud: {{cr.ccss-sem-trabajador}} del salario bruto.",
    "Pensión IVM: {{cr.ccss-ivm-trabajador}} del salario bruto.",
    "Banco Popular: {{cr.banco-popular-trabajador}} del salario bruto.",
    "Impuesto al salario: se aplica por tramos sobre el salario bruto, sin restar las cuotas. Después se restan los créditos de {{cr.credito-hijo}} por hijo y {{cr.credito-conyuge}} por el cónyuge.",
    "Salario neto: el bruto menos todos esos rebajos.",
  ],
  ejemplo: [
    "Con un salario bruto de ₡1.200.000, los rebajos de la Caja y el Banco Popular suman ₡129.960 y el impuesto al salario es ₡28.200. El salario neto es ₡1.041.840.",
  ],
  faq: [
    {
      pregunta: "¿Cuánto rebaja la Caja del salario?",
      respuesta: "Hoy son {{cr.ccss-sem-trabajador}} para salud, {{cr.ccss-ivm-trabajador}} para pensión y {{cr.banco-popular-trabajador}} para el Banco Popular.",
    },
    {
      pregunta: "¿Cómo paso de salario bruto a salario neto?",
      respuesta: "Reste al bruto las cuotas de la Caja, el aporte al Banco Popular y la renta del mes. La calculadora hace las cuatro cuentas por usted.",
    },
    {
      pregunta: "¿Va a subir la cuota del IVM?",
      respuesta: "Sí. El reglamento del IVM sube la cuota de la persona trabajadora por escalones. El próximo es el 1 de enero de 2029, cuando pasa al 4,5 %.",
    },
    {
      pregunta: "¿El aguinaldo tiene rebajos?",
      respuesta: "No. El aguinaldo no paga cuotas de la Caja ni impuesto sobre la renta.",
    },
  ],
  glosario: [
    { termino: "SEM", definicion: "Seguro de Enfermedad y Maternidad, hoy llamado Seguro de Salud de la CCSS." },
    { termino: "IVM", definicion: "Seguro de Invalidez, Vejez y Muerte: el régimen de pensiones de la CCSS." },
    { termino: "Rebajos", definicion: "Los descuentos que el patrono hace del salario para la Caja y la renta." },
  ],
});
