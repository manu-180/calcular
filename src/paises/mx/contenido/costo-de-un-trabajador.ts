import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "mx.costo-de-un-trabajador",
  h1: "¿Cuánto cuesta un trabajador en México en {{anio}}?",
  title: "Costo de un trabajador {{anio}}: IMSS, Infonavit y más",
  description:
    "Calcula cuánto le cuesta a tu empresa un sueldo: cuotas patronales del IMSS, retiro y cesantía, Infonavit, aguinaldo, prima vacacional e impuesto sobre nómina.",
  intro: [
    "Un trabajador cuesta bastante más que su sueldo. A lo que cobra cada mes se suman las cuotas patronales del IMSS, el retiro y la cesantía, el Infonavit, la parte proporcional del aguinaldo y de la prima vacacional, y el impuesto sobre nómina de tu estado.",
    "Escribe el sueldo bruto mensual y te mostramos el costo de cada mes y del año.",
  ],
  comoSeCalcula: [
    "Se estima el salario base de cotización con las prestaciones de ley: {{mx.dias-aguinaldo}} de aguinaldo y {{mx.prima-vacacional}} de prima vacacional.",
    "Con ese salario se calculan las cuotas patronales del IMSS, el retiro de {{mx.cuotas-imss-patron[retiro]}}, la cesantía y vejez de la tabla de 2026 y el Infonavit de {{mx.aportacion-vivienda}}.",
    "El aguinaldo y la prima vacacional se reparten entre los 12 meses para ver el costo mensual promedio.",
    "El impuesto sobre nómina lo cobra cada estado con su propia tasa. Escribe la de tu estado si quieres sumarlo.",
  ],
  ejemplo: [
    "Un sueldo de 15,000 pesos al mes en una empresa de clase I, con 3 % de impuesto sobre nómina, cuesta unos 20,100 pesos al mes: alrededor de un tercio más que el sueldo.",
  ],
  faq: [
    {
      pregunta: "¿Cuánto cuesta un trabajador por encima de su sueldo?",
      respuesta: "Depende del sueldo y de la prima de riesgo. Con 15,000 pesos al mes en una empresa de oficina, alrededor de un tercio más. El porcentaje sube cada año hasta 2030 porque aumenta la cuota patronal de cesantía y vejez.",
    },
    {
      pregunta: "¿Qué no incluye este cálculo?",
      respuesta: "Prestaciones arriba de la ley (vales, fondo de ahorro, seguro de gastos médicos), horas extra, PTU y el costo de un despido. Si das más días de aguinaldo o más prima, el costo sube.",
    },
    {
      pregunta: "¿Cuál es la prima de riesgo de mi empresa?",
      respuesta: "La que determinó con su siniestralidad del año anterior. Si es nueva, la prima media de su clase: {{mx.prima-riesgo-trabajo[clase-i]}} en clase I y {{mx.prima-riesgo-trabajo[clase-v]}} en clase V.",
    },
    {
      pregunta: "¿El impuesto sobre nómina es federal?",
      respuesta: "No. Lo cobra cada estado con su tasa y su propia lista de exenciones. Revisa la ley de hacienda de tu estado.",
    },
  ],
  glosario: [
    { termino: "Costo patronal", definicion: "Todo lo que paga la empresa por un trabajador además del sueldo." },
    { termino: "ISN", definicion: "Impuesto sobre nómina: impuesto estatal sobre lo que la empresa paga a sus trabajadores." },
  ],
});
