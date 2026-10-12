import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "hn.impuesto-sobre-alquileres",
  h1: "Calculadora del impuesto sobre alquiler de vivienda en Honduras",
  title: "Impuesto sobre alquileres en Honduras: el {{hn.alquiler-tasa}} cedular",
  description: "Calcule el impuesto cedular del {{hn.alquiler-tasa}} que pagan las personas que alquilan viviendas por más de {{hn.alquiler-minimo-mensual}} al mes.",
  intro: [
    "Si usted alquila una vivienda o apartamentos y cobra más de {{hn.alquiler-minimo-mensual}} al mes, paga un impuesto único del {{hn.alquiler-tasa}} sobre el alquiler.",
    "Se suma lo que pagan todas las unidades o cuartos del mismo inmueble.",
  ],
  comoSeCalcula: [
    "Alquiler del año = alquiler mensual × meses alquilados.",
    "Si el alquiler mensual pasa de {{hn.alquiler-minimo-mensual}}: impuesto = alquiler del año × {{hn.alquiler-tasa}}.",
  ],
  ejemplo: ["Alquila una casa en L20,000 al mes todo el año. El alquiler anual es L240,000 y el impuesto L24,000."],
  faq: [
    {
      pregunta: "¿Quién paga el impuesto sobre alquileres de vivienda?",
      respuesta: "Las personas naturales que alquilan viviendas o edificios de apartamentos por más de {{hn.alquiler-minimo-mensual}} al mes.",
    },
    {
      pregunta: "¿Este impuesto se suma a mi ISR?",
      respuesta: "No. Es un impuesto único y definitivo: el alquiler no entra en la tabla progresiva del ISR.",
    },
    {
      pregunta: "¿Cómo se declara?",
      respuesta: "En la declaración anual del impuesto cedular sobre alquiler habitacional (formulario 106 del SAR).",
    },
  ],
  glosario: [
    { termino: "Impuesto cedular", definicion: "Un impuesto que grava un tipo de ingreso por separado, con su propia tasa." },
    { termino: "Arrendador", definicion: "La persona dueña que alquila el inmueble y cobra el alquiler." },
  ],
});
