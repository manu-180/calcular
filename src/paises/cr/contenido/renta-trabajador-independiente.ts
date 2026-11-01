import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "cr.renta-trabajador-independiente",
  h1: "Impuesto sobre la renta para trabajadores independientes",
  title: "Renta de independientes {{anio}} Costa Rica: tramos y cálculo",
  description:
    "Calcule el impuesto sobre la renta de su actividad lucrativa con los tramos {{anio}}: exento hasta ₡6.244.000 y créditos por hijo y cónyuge.",
  intro: [
    "Si usted trabaja por cuenta propia o tiene un negocio a su nombre, paga renta por tramos anuales sobre su renta neta. Los primeros colones están exentos.",
    "Escriba su renta neta del año y le mostramos el impuesto y la tasa efectiva.",
  ],
  comoSeCalcula: [
    "Renta neta: los ingresos de la actividad menos los gastos que la ley permite deducir.",
    "Se aplica la escala anual por tramos: cada tramo paga su porcentaje solo sobre la parte que cae en él.",
    "Si también recibe salario o pensión, el tramo exento se reduce por lo que ya quedó exento en su salario.",
    "Se restan los créditos: {{cr.credito-hijo-anual}} por cada hijo y {{cr.credito-conyuge-anual}} por el cónyuge.",
  ],
  ejemplo: ["Con una renta neta de ₡12.000.000 y un hijo, el impuesto del año es ₡817.930."],
  faq: [
    {
      pregunta: "¿Desde cuánto paga renta un trabajador independiente en 2026?",
      respuesta: "Desde ₡6.244.000 de renta neta anual. La Ley 10667 subió ese límite para los independientes de menores ingresos.",
    },
    {
      pregunta: "¿Cuáles son los tramos de 2026?",
      respuesta: "Exento hasta ₡6.244.000; 10 % hasta ₡8.329.000; 15 % hasta ₡10.414.000; 20 % hasta ₡20.872.000 y 25 % sobre el exceso.",
    },
    {
      pregunta: "¿Qué pasa si también tengo salario?",
      respuesta: "La ley le resta al tramo exento de la actividad la parte exenta que ya usó en su salario. Con un salario de todo el año por encima de ₡918.000 al mes, la actividad paga desde el primer colón al 10 %.",
    },
    {
      pregunta: "¿Puedo restar los créditos por hijos si mi cónyuge también los usa?",
      respuesta: "El crédito por cónyuge lo puede usar solo uno de los dos. Si están separados judicialmente, lo usa quien mantiene al otro.",
    },
  ],
  glosario: [
    { termino: "Actividad lucrativa", definicion: "Cualquier trabajo o negocio por cuenta propia que genera ingresos." },
    { termino: "Renta neta", definicion: "Los ingresos menos los gastos deducibles." },
  ],
});
