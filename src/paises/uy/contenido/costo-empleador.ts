import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "uy.costo-empleador",
  h1: "Costo de un empleado para la empresa",
  title: "Aportes patronales BPS {{anio}}: costo de un empleado",
  description:
    "Calculá cuánto le cuesta a la empresa un sueldo: aporte jubilatorio patronal del {{uy.patronal-jubilatorio}}, Fonasa del {{uy.patronal-fonasa}}, FRL y fondo de garantía, más aguinaldo y licencia.",
  intro: [
    "Contratar a alguien cuesta más que su sueldo nominal. Sobre el sueldo, la empresa paga aportes patronales al BPS, y cada mes va acumulando aguinaldo y licencia.",
    "Escribí el sueldo nominal y te mostramos cada aporte y el costo total por mes. Sirve para Industria y Comercio.",
  ],
  comoSeCalcula: [
    "Aporte jubilatorio patronal: {{uy.patronal-jubilatorio}} del sueldo, hasta el tope de {{uy.tope-aportes}}.",
    "Fonasa patronal: {{uy.patronal-fonasa}}. Fondo de Reconversión Laboral: {{uy.patronal-frl}}. Fondo de Garantía de Créditos Laborales: {{uy.fgcl}}.",
    "Si elegís sumar provisiones, agregamos la doceava parte del aguinaldo y de la licencia (sueldo / 30 por los días del año), con sus aportes.",
  ],
  ejemplo: ["Un sueldo de $ 50.000 tiene $ 6.312,50 de aportes patronales. Con aguinaldo y licencia, el costo mensual llega a $ 64.133,69."],
  faq: [
    {
      pregunta: "¿Cuánto paga el empleador de aportes al BPS?",
      respuesta: "En Industria y Comercio, {{uy.patronal-jubilatorio}} jubilatorio, {{uy.patronal-fonasa}} de Fonasa, {{uy.patronal-frl}} de FRL y {{uy.fgcl}} de fondo de garantía, sobre el sueldo nominal.",
    },
    {
      pregunta: "¿El aguinaldo paga aportes patronales?",
      respuesta: "Sí. El aguinaldo y la licencia pagan los mismos aportes que el sueldo. Por eso los sumamos en las provisiones.",
    },
    {
      pregunta: "¿Qué no incluye este cálculo?",
      respuesta: "El seguro de accidentes de trabajo del BSE, que depende del riesgo de la actividad, y el complemento de cuota mutual, que se calcula por empresa. Tampoco el salario vacacional.",
    },
    {
      pregunta: "¿Hay rebajas de aportes patronales?",
      respuesta: "Algunas actividades y programas de empleo tienen exoneraciones. Si tu empresa tiene una, el costo real es menor.",
    },
  ],
  glosario: [
    { termino: "Aporte patronal", definicion: "Lo que paga la empresa al BPS además del sueldo." },
    { termino: "Provisión", definicion: "Plata que se separa cada mes para pagar después el aguinaldo y la licencia." },
  ],
});
