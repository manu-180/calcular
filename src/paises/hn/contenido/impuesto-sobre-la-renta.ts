import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "hn.impuesto-sobre-la-renta",
  h1: "Calculadora del ISR para asalariados en Honduras",
  title: "Tabla progresiva ISR 2026 Honduras: calcule su impuesto",
  description:
    "Calcule el ISR de su salario con la tabla progresiva 2026 del SAR y la deducción de {{hn.isr-deduccion-gastos-medicos}} por gastos médicos. Vea su tramo y la retención mensual.",
  intro: [
    "El ISR de los asalariados en Honduras se calcula con la tabla progresiva del SAR: a su salario del año se le restan {{hn.isr-deduccion-gastos-medicos}} de gastos médicos, la primera parte queda exenta y lo que pasa de cada límite paga 15 %, 20 % o 25 %.",
    "El SAR actualiza la tabla cada enero con la inflación del año anterior. Esta calculadora usa la de 2026 y le muestra el impuesto del año y la retención de cada mes.",
  ],
  comoSeCalcula: [
    "Se suman los 12 salarios del año y otros ingresos que paguen ISR.",
    "Se resta la deducción por gastos médicos de {{hn.isr-deduccion-gastos-medicos}}. Lo que queda es la renta neta gravable.",
    "Cada parte de la renta neta gravable paga la tasa de su tramo: la primera parte está exenta y las siguientes pagan 15 %, 20 % y 25 %.",
    "La retención mensual es el impuesto del año dividido entre 12.",
  ],
  ejemplo: [
    "Con la tabla 2026 y un salario de L40,000: 480,000 menos 40,000 da 440,000. Paga 15 % sobre 119,829.78 y 20 % sobre 91,845.90. ISR del año: L36,343.65, unos L3,028.64 por mes.",
  ],
  faq: [
    {
      pregunta: "¿Desde qué salario se paga ISR?",
      respuesta: "Depende de la tabla de cada año. Si su renta neta gravable queda en el primer tramo, no paga. La calculadora le muestra en qué tramo está.",
    },
    {
      pregunta: "¿Cómo se calcula la retención mensual del ISR?",
      respuesta: "Se calcula el impuesto de todo el año con la tabla progresiva y se divide entre 12. Ese monto es lo que el patrono le retiene cada mes.",
    },
    {
      pregunta: "¿Por qué se restan {{hn.isr-deduccion-gastos-medicos}}?",
      respuesta: "Es la deducción por gastos médicos. El SAR la resta en su tabla para calcular hasta qué salario no se paga ISR.",
    },
    {
      pregunta: "¿Pago el 25 % sobre todo mi salario?",
      respuesta: "No. Cada tasa se aplica solo a la parte de la renta que cae en su tramo. Por eso la tasa efectiva siempre es menor.",
    },
    {
      pregunta: "¿Cuándo cambia la tabla?",
      respuesta: "Cada enero. El SAR la ajusta con la inflación interanual de diciembre que publica el Banco Central de Honduras.",
    },
  ],
  glosario: [
    { termino: "SAR", definicion: "Servicio de Administración de Rentas, el ente que cobra los impuestos." },
    { termino: "Tabla progresiva", definicion: "La escala del ISR por tramos: cada parte de la renta paga la tasa de su tramo." },
    { termino: "Renta neta gravable", definicion: "Sus ingresos del año menos las deducciones que permite la ley." },
  ],
});
