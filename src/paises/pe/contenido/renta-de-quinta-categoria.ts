import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "pe.renta-quinta",
  h1: "Calculadora de renta de quinta categoría",
  title: "Renta de quinta categoría 2026: calcula tu retención",
  description:
    "Calcula el impuesto a la renta de quinta categoría con la UIT de {{pe.uit}}, la deducción de {{pe.deduccion-renta-trabajo}} y la escala vigente. Te mostramos la retención de cada mes.",
  intro: [
    "Si trabajas en planilla, tu empresa te retiene cada mes una parte del sueldo como adelanto del impuesto a la renta. Es la renta de quinta categoría.",
    "Solo pagas si en el año ganas más de {{pe.deduccion-renta-trabajo}} (las primeras siete UIT no pagan impuesto). En 2026 la UIT vale {{pe.uit}}.",
  ],
  comoSeCalcula: [
    "Se proyecta lo que vas a ganar en el año: doce sueldos, las dos gratificaciones, su bonificación extraordinaria y otros pagos de planilla.",
    "A ese total se le restan {{pe.deduccion-renta-trabajo}}. Si tienes gastos deducibles (parte del alquiler, honorarios y otros con comprobante), se resta también esa deducción, con un tope de {{pe.tope-gastos-deducibles}}.",
    "Al resultado se le aplica la escala por tramos: 8 % hasta 5 UIT, 14 % de 5 a 20 UIT, 17 % de 20 a 35 UIT, 20 % de 35 a 45 UIT y 30 % por encima de 45 UIT. Cada tramo paga solo su parte.",
    "Si tu sueldo no cambia en el año, la retención de cada mes es más o menos el impuesto anual dividido entre 12.",
  ],
  ejemplo: [
    "Ganas S/ 5,000 al mes con gratificaciones completas. En el año suman S/ 70,900. Restas S/ 38,500 y quedan S/ 32,400.",
    "Los primeros S/ 27,500 pagan 8 % (S/ 2,200) y los S/ 4,900 restantes, 14 % (S/ 686). Tu impuesto del año es S/ 2,886: unos S/ 240.50 de retención al mes.",
  ],
  faq: [
    {
      pregunta: "¿A partir de cuánto sueldo me retienen quinta categoría?",
      respuesta: "Cuando lo que ganas en el año, contando gratificaciones y bonos, pasa de {{pe.deduccion-renta-trabajo}}. Pon tu sueldo en la calculadora y lo ves al instante.",
    },
    {
      pregunta: "¿Las gratificaciones pagan impuesto a la renta?",
      respuesta: "Sí. No pagan aportes de pensión ni de salud, pero sí entran en la renta de quinta categoría, igual que la bonificación extraordinaria.",
    },
    {
      pregunta: "¿Qué son los gastos deducibles?",
      respuesta: "Son gastos que SUNAT te deja restar si pagaste con comprobante electrónico: parte del alquiler de tu vivienda y los honorarios de profesionales, entre otros. Tienen un tope de {{pe.tope-gastos-deducibles}}.",
    },
    {
      pregunta: "¿Por qué mi retención real no es igual todos los meses?",
      respuesta: "Porque la empresa recalcula la proyección varias veces en el año. Si tu sueldo cambia o cobras bonos, la retención se ajusta.",
    },
  ],
  glosario: [
    { termino: "Renta de quinta categoría", definicion: "Los ingresos de quien trabaja en planilla: sueldo, gratificaciones, bonos y otros pagos del empleador." },
    { termino: "UIT", definicion: "Unidad impositiva tributaria. Un valor de referencia que fija el Estado cada año para impuestos y multas." },
    { termino: "Escala progresiva", definicion: "Cada tramo de tu ingreso paga su propia tasa. Ganar un sol más nunca te hace pagar más por todo lo anterior." },
  ],
});
