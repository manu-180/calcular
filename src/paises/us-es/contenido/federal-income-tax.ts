import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "us-es.federal-income-tax",
  h1: "Calculadora de impuestos federales",
  title: "Calculadora de impuestos federales 2026: tramos y reembolso",
  description: "Calcula tu impuesto federal sobre el ingreso de 2026 con los tramos del IRS, la deducción estándar de {{us.standard-deduction[single]}} y la nueva deducción para mayores.",
  intro: [
    "Elige tu estado civil para la declaración y escribe tu ingreso bruto ajustado para ver tu impuesto federal de 2026, tu tramo más alto y tu tasa efectiva.",
    "Si agregas lo que te retuvieron de tus cheques, también verás un estimado de tu reembolso o de lo que todavía debes.",
  ],
  comoSeCalcula: [
    "Tu deducción es la deducción estándar de tu estado civil o tus deducciones detalladas, la que sea mayor. Cada casilla por 65 años o ceguera suma {{us.additional-standard-deduction[married]}} para casados y {{us.additional-standard-deduction[unmarried]}} para solteros y cabezas de familia.",
    "Cada persona de 65 años o más recibe además la deducción para mayores de {{us.senior-deduction}}. Se reduce en {{us.senior-deduction-phaseout-rate}} de los ingresos sobre {{us.senior-deduction-threshold[other]}} ({{us.senior-deduction-threshold[mfj]}} en una declaración conjunta).",
    "El ingreso tributable es tu AGI menos esas deducciones. Cada tasa se aplica solo a la parte del ingreso que cae dentro de su tramo: 10%, 12%, 22%, 24%, 32%, 35% y 37%.",
    "La tasa efectiva divide el impuesto entre tu AGI. El reembolso compara el impuesto con lo que ya te retuvieron.",
  ],
  ejemplo: [
    "Una persona soltera con $75,000 de AGI toma la deducción estándar de {{us.standard-deduction[single]}} y queda con $58,900 de ingreso tributable. El impuesto es $7,670: 10% sobre los primeros $12,400, 12% hasta $50,400 y 22% sobre los $8,500 restantes. La tasa efectiva es de alrededor de 10.2%.",
  ],
  faq: [
    { pregunta: "¿Cuál es la deducción estándar de 2026?", respuesta: "{{us.standard-deduction[single]}} para solteros y casados que declaran por separado, {{us.standard-deduction[mfj]}} para matrimonios con declaración conjunta y {{us.standard-deduction[hoh]}} para cabezas de familia." },
    { pregunta: "¿Si paso a un tramo más alto, todo mi ingreso paga esa tasa?", respuesta: "No. Solo los dólares por encima del inicio de un tramo pagan la tasa de ese tramo. Un aumento de sueldo nunca reduce tu pago neto por culpa de los tramos federales." },
    { pregunta: "¿Quién puede tomar la deducción para mayores?", respuesta: "Las personas de 65 años o más al final del año con un número de Seguro Social válido. Es de {{us.senior-deduction}} por persona, se aplica tanto si detallas deducciones como si no, y los casados deben presentar una declaración conjunta para tomarla." },
    { pregunta: "¿Por qué mi reembolso real es distinto?", respuesta: "Los créditos (como el crédito tributario por hijos), otros ingresos y los impuestos estatales cambian el resultado final. Esta calculadora muestra el impuesto federal antes de créditos: úsala como punto de partida para tu declaración de impuestos." },
  ],
  glosario: [
    { termino: "Ingreso bruto ajustado (AGI)", definicion: "Tu ingreso total menos ajustes como los aportes al 401(k) tradicional y a la HSA." },
    { termino: "Ingreso tributable", definicion: "El AGI menos la deducción estándar o detallada y otras deducciones, como la deducción para mayores." },
    { termino: "Tasa marginal", definicion: "La tasa que se aplica a tu último dólar de ingreso tributable." },
  ],
});
