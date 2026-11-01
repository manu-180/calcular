import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ni.ir-salarial",
  h1: "Calculadora del IR salarial en Nicaragua",
  title: "IR salarial en Nicaragua {{anio}}: tabla y retención mensual",
  description: "Calculá cuánto IR te retienen cada mes en Nicaragua con la tabla progresiva de la Ley 822. Los primeros {{ni.ir-renta-exenta}} del año no pagan. Te mostramos tu tramo.",
  intro: [
    "En Nicaragua el IR salarial se calcula sobre tu salario menos el INSS, llevado a un año. Hasta {{ni.ir-renta-exenta}} al año no pagás, y arriba de eso cada tramo paga una base fija más un porcentaje.",
    "Tu empleador te lo retiene cada mes. Poné tu salario bruto mensual y te mostramos la renta neta del año, el IR anual, la retención de cada mes y en qué tramo estás.",
  ],
  comoSeCalcula: [
    "Primero se resta la cotización al INSS ({{ni.inss-laboral[integral]}} en el régimen integral). Eso es tu salario neto.",
    "El salario neto se multiplica por 12: es la renta neta que esperás ganar en el año.",
    "A la renta neta se le aplica la tarifa del artículo 23. Hasta {{ni.ir-renta-exenta}} no se paga. Arriba de eso, cada tramo paga una base fija más un porcentaje sobre lo que pasa de su límite.",
    "El IR del año se divide entre 12 y eso es lo que te retienen cada mes.",
  ],
  ejemplo: [
    "Con C$30,000 al mes: INSS C$2,100. Renta neta del año 27,900 × 12 = C$334,800. Está en el tramo de 200,000 a 350,000: 15,000 + 20 % de 134,800 = C$41,960 al año. Te retienen C$3,496.67 por mes.",
  ],
  faq: [
    {
      pregunta: "¿Cómo se calcula el IR salarial en Nicaragua?",
      respuesta: "A tu salario le restás el INSS y lo multiplicás por 12. A esa renta anual le aplicás la tabla del artículo 23, y el resultado dividido entre 12 es la retención de cada mes.",
    },
    {
      pregunta: "¿Cuál es la tabla del IR en Nicaragua?",
      respuesta: "Tiene cinco tramos anuales. Hasta {{ni.ir-renta-exenta}} no se paga. Los otros cuatro pagan 15 %, 20 %, 25 % y 30 % sobre lo que pasa del límite de cada tramo, más una base fija.",
    },
    {
      pregunta: "¿El tramo es lo que pago sobre todo mi salario?",
      respuesta: "No. El porcentaje del tramo se aplica solo a lo que pasa del límite. Por eso lo que pagás en total es menos que ese porcentaje.",
    },
    {
      pregunta: "¿Qué se puede deducir?",
      respuesta: "Tu cotización al INSS. La ley también permite deducir parte de gastos de educación, salud y servicios profesionales con factura, pero esta calculadora no la incluye.",
    },
    {
      pregunta: "¿Qué pasa si trabajé solo una parte del año?",
      respuesta: "El empleador recalcula con lo que ganaste en los meses trabajados. Al cerrar el año liquida el IR con lo que de verdad cobraste.",
    },
  ],
  glosario: [
    { termino: "Tarifa progresiva", definicion: "Una tabla donde cada tramo de ingreso paga un porcentaje distinto. Está en el artículo 23 de la Ley 822." },
    { termino: "Retención", definicion: "La parte del IR que el empleador descuenta de tu salario y le paga a la DGI." },
  ],
});
