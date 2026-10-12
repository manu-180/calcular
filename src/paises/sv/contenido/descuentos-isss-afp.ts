import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "sv.descuentos-isss-afp",
  h1: "Calculadora de descuentos de ISSS y AFP",
  title: "Descuento de ISSS y AFP 2026 en El Salvador: calculadora",
  description: "Calcule cuánto le descuentan de AFP ({{sv.afp-trabajador}}) e ISSS ({{sv.isss-trabajador}}) y cuánto aporta su patrono. Con el techo de {{sv.isss-salario-maximo}} del ISSS.",
  intro: [
    "De su salario le descuentan el {{sv.afp-trabajador}} para la AFP y el {{sv.isss-trabajador}} para el ISSS. Su patrono aporta aparte el {{sv.afp-patrono}} a la AFP y el {{sv.isss-patrono}} al ISSS.",
    "Ponga su salario del mes y vea cada cotización, la suya y la de su patrono.",
  ],
  comoSeCalcula: [
    "AFP: {{sv.afp-trabajador}} a cargo suyo y {{sv.afp-patrono}} a cargo del patrono, sobre todo el salario.",
    "ISSS: {{sv.isss-trabajador}} a cargo suyo y {{sv.isss-patrono}} a cargo del patrono, sobre el salario hasta {{sv.isss-salario-maximo}}.",
    "El aguinaldo y las bonificaciones ocasionales no cotizan a la AFP.",
  ],
  ejemplo: ["Con $600 al mes le descuentan $43.50 de AFP y $18 de ISSS. Su patrono aporta $52.50 y $45."],
  faq: [
    {
      pregunta: "¿Cuál es el máximo que me pueden descontar de ISSS?",
      respuesta: "El ISSS se calcula sobre un salario de {{sv.isss-salario-maximo}} como máximo. Si gana más, su descuento del ISSS se queda en el {{sv.isss-trabajador}} de ese monto.",
    },
    {
      pregunta: "¿La AFP tiene techo?",
      respuesta: "No. La ley de pensiones no fija un salario máximo: el {{sv.afp-trabajador}} se cobra sobre todo lo que gana en el mes.",
    },
    {
      pregunta: "¿Qué pasa si mi patrono me descuenta y no paga?",
      respuesta: "Puede quedarse sin cobertura del ISSS y con huecos en su historial de la AFP. Revise su estado de cuenta y, si falta algo, denuncie en el Ministerio de Trabajo o en el ISSS.",
    },
  ],
  glosario: [
    { termino: "Cotización", definicion: "El porcentaje del salario que se paga al ISSS o a la AFP." },
    { termino: "Techo de cotización", definicion: "El salario máximo sobre el que se calcula la cotización." },
  ],
});
