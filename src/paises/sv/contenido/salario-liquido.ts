import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "sv.salario-liquido",
  h1: "Calculadora de salario líquido en El Salvador",
  title: "Salario líquido {{anio}} El Salvador: AFP, ISSS y renta",
  description: "Calcule cuánto recibe en mano: le restamos la AFP del {{sv.afp-trabajador}}, el ISSS del {{sv.isss-trabajador}} y la renta con la tabla vigente de Hacienda.",
  intro: [
    "El salario líquido es lo que recibe en mano después de los descuentos de ley: la AFP ({{sv.afp-trabajador}}), el ISSS ({{sv.isss-trabajador}}, con un techo de {{sv.isss-salario-maximo}}) y la retención de renta.",
    "Ponga su salario mensual y elija si le pagan por mes o por quincena. La calculadora le muestra cada descuento y lo que le queda.",
  ],
  comoSeCalcula: [
    "Se resta la cotización a la AFP: {{sv.afp-trabajador}} de su salario, sin tope.",
    "Se resta la cotización al ISSS: {{sv.isss-trabajador}} de su salario, calculado como máximo sobre {{sv.isss-salario-maximo}} al mes.",
    "Con lo que queda se busca su tramo en la tabla de retención de renta del Ministerio de Hacienda y se calcula la renta.",
    "El salario líquido es el salario menos esos tres descuentos.",
  ],
  ejemplo: [
    "Con $800 al mes: AFP $58, ISSS $24 y renta $34.47. Recibe $683.53.",
  ],
  faq: [
    {
      pregunta: "¿Cuánto me descuentan de AFP e ISSS?",
      respuesta: "De AFP, el {{sv.afp-trabajador}} de todo su salario. De ISSS, el {{sv.isss-trabajador}}, pero solo hasta un salario de {{sv.isss-salario-maximo}}: si gana más, el descuento del ISSS no sube.",
    },
    {
      pregunta: "¿Desde qué salario me quitan renta?",
      respuesta: "Le retienen renta cuando su salario, ya sin AFP ni ISSS, pasa de {{sv.renta-exento-mensual}} al mes. Con el salario mínimo de comercio no le retienen nada.",
    },
    {
      pregunta: "¿Por qué mi boleta de junio o diciembre dice otra renta?",
      respuesta: "En junio y en diciembre el patrono recalcula la renta con todo lo ganado en el año. Ese mes la retención puede subir o bajar para ajustar.",
    },
    {
      pregunta: "¿El aguinaldo y la Quincena 25 tienen estos descuentos?",
      respuesta: "La Quincena 25 no paga renta, ISSS ni AFP. El aguinaldo no cotiza a la AFP y no paga renta hasta el límite que fija la ley cada año.",
    },
  ],
  glosario: [
    { termino: "Descuentos de ley", definicion: "La AFP, el ISSS y la renta que el patrono descuenta del salario." },
    { termino: "AFP", definicion: "Administradora de fondos de pensiones: guarda su ahorro para la jubilación." },
    { termino: "ISSS", definicion: "Instituto Salvadoreño del Seguro Social: cubre su salud, maternidad e incapacidades." },
  ],
});
