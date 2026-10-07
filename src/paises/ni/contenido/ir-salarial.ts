import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ni.ir-salarial",
  h1: "Calculadora del IR salarial",
  title: "IR salarial en Nicaragua: calculá tu retención",
  description: "Calculá la retención mensual del IR sobre tu salario con la tarifa progresiva de la Ley de Concertación Tributaria. Los primeros {{ni.ir-renta-exenta}} del año no pagan.",
  intro: [
    "El IR sobre el salario lo retiene tu empleador cada mes. Se calcula con una tarifa anual que sube por tramos.",
    "Poné tu salario bruto mensual. Te mostramos la renta neta del año, el IR anual, la retención de cada mes y en qué tramo estás.",
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
      pregunta: "¿Cuántos tramos tiene la tarifa?",
      respuesta: "Cinco. El primero, hasta {{ni.ir-renta-exenta}} al año, no paga. Los otros cuatro pagan un porcentaje cada vez mayor. En el resultado te mostramos en qué tramo quedás.",
    },
    {
      pregunta: "¿Qué se puede deducir?",
      respuesta: "Tu cotización al INSS. La ley también permite deducir parte de gastos de educación, salud y servicios profesionales con factura, pero esta calculadora no la incluye.",
    },
    {
      pregunta: "¿El tramo es lo que pago sobre todo mi salario?",
      respuesta: "No. El porcentaje del tramo se aplica solo a lo que pasa del límite. Por eso lo que pagás en total es menos que ese porcentaje.",
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
