import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "mx.isr",
  h1: "Calculadora de ISR {{anio}} para sueldos y salarios",
  title: "Calculadora ISR {{anio}}: quincenal y mensual con tablas SAT",
  description:
    "Calcula el ISR que te retienen por quincena, semana o mes con las tablas {{anio}} del SAT y el subsidio para el empleo. Te mostramos la cuenta renglón por renglón.",
  intro: [
    "El ISR por sueldos se calcula con la tarifa del SAT: una cuota fija más un porcentaje de lo que tu sueldo pasa del límite inferior de su renglón. Tu empresa te lo retiene cada vez que te paga.",
    "Esta calculadora usa las tablas de ISR 2026 (Anexo 8 de la Resolución Miscelánea Fiscal) para quincena, semana, decena y mes, y resta el subsidio para el empleo cuando te toca.",
  ],
  comoSeCalcula: [
    "Busca tu sueldo del periodo en la tarifa: el renglón donde tu sueldo queda entre el límite inferior y el superior.",
    "Réstale el límite inferior a tu sueldo. A esa diferencia aplícale el porcentaje del renglón.",
    "Súmale la cuota fija del renglón. Eso es el ISR según la tarifa.",
    "Si ganas hasta {{mx.subsidio-empleo-limite}} al mes, réstale el subsidio para el empleo: {{mx.subsidio-empleo}} de la UMA mensual, en proporción a los días del periodo.",
    "Lo que queda es el ISR que te retienen. Nunca puede ser negativo.",
  ],
  ejemplo: [
    "Con un sueldo de 7,500 pesos por quincena, en la tabla quincenal 2026 caes en el renglón que empieza en 7,225.96 pesos. El excedente es de 274.04 pesos y al 17.92% da 49.11 pesos.",
    "Sumada la cuota fija de 660.75 pesos, el ISR de la quincena es de 709.86 pesos: el 9.46% de tu sueldo.",
  ],
  faq: [
    {
      pregunta: "¿Cuánto ISR pago si gano 10,000 pesos al mes?",
      respuesta: "Con la tarifa mensual 2026, el ISR es de 729.02 pesos. Como te toca el subsidio para el empleo, te retienen 193.37 pesos.",
    },
    {
      pregunta: "¿Por qué me retienen más ISR en una quincena que en otra?",
      respuesta: "Algunas empresas calculan el ISR por mes y ajustan en la segunda quincena. Al final del mes la suma tiene que ser la misma.",
    },
    {
      pregunta: "¿Si gano el salario mínimo pago ISR?",
      respuesta: "No. La ley dice que no se retiene ISR a quien solo gana el salario mínimo de su zona.",
    },
    {
      pregunta: "¿Cuándo cambian las tablas del ISR?",
      respuesta: "El SAT las publica en el Anexo 8 de la Resolución Miscelánea Fiscal. Las de 2026 salieron en el DOF el 28 de diciembre de 2025.",
    },
    {
      pregunta: "¿Qué pasa con el ISR al final del año?",
      respuesta: "Lo retenido son pagos a cuenta. En la declaración anual se calcula el impuesto del año y te pueden devolver o cobrar la diferencia.",
    },
  ],
  glosario: [
    { termino: "ISR", definicion: "Impuesto sobre la Renta. Si trabajas en nómina, tu empresa te lo retiene y lo paga al SAT." },
    { termino: "Límite inferior", definicion: "Monto donde empieza cada renglón de la tarifa del ISR." },
    { termino: "Cuota fija", definicion: "ISR que ya se acumula hasta el límite inferior de tu renglón." },
    { termino: "Retención", definicion: "ISR que tu empresa descuenta de tu sueldo y paga al SAT por ti." },
  ],
});
