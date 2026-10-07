import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "mx.isr",
  h1: "Calculadora de ISR por sueldos 2026",
  title: "Calculadora ISR 2026: retención quincenal y mensual",
  description:
    "Calcula el ISR que te retienen por quincena, semana o mes con las tarifas 2026 del SAT y el subsidio para el empleo. Paso a paso, con fuente oficial.",
  intro: [
    "Si trabajas en nómina, tu empresa te retiene ISR cada vez que te paga. Aquí ves cuánto y cómo sale la cuenta.",
    "Usamos las tarifas del Anexo 8 de la Resolución Miscelánea Fiscal para 2026 y el subsidio para el empleo vigente.",
  ],
  comoSeCalcula: [
    "Busca tu sueldo del periodo en la tarifa: el renglón donde tu sueldo queda entre el límite inferior y el superior.",
    "Réstale el límite inferior a tu sueldo. A esa diferencia aplícale el porcentaje del renglón.",
    "Súmale la cuota fija del renglón. Eso es el ISR según la tarifa.",
    "Si ganas hasta {{mx.subsidio-empleo-limite}} al mes, réstale el subsidio para el empleo: {{mx.subsidio-empleo}} de la UMA mensual, en proporción a los días del periodo.",
    "Lo que queda es el ISR que te retienen. Nunca puede ser negativo.",
  ],
  faq: [
    {
      pregunta: "¿Por qué me retienen más ISR en una quincena que en otra?",
      respuesta: "Algunas empresas calculan el ISR por mes y ajustan en la segunda quincena. Al final del mes la suma tiene que ser la misma.",
    },
    {
      pregunta: "¿Si gano el salario mínimo pago ISR?",
      respuesta: "No. La ley dice que no se retiene ISR a quien solo gana el salario mínimo de su zona.",
    },
    {
      pregunta: "¿Cada cuánto cambian las tarifas?",
      respuesta: "El SAT las publica en el Anexo 8 de la Resolución Miscelánea Fiscal de cada año. Las de 2026 salieron en el DOF el 28 de diciembre de 2025.",
    },
    {
      pregunta: "¿Qué pasa con el ISR al final del año?",
      respuesta: "Lo retenido son pagos a cuenta. En la declaración anual se calcula el impuesto del año y te pueden devolver o cobrar la diferencia.",
    },
  ],
  glosario: [
    { termino: "Límite inferior", definicion: "Monto donde empieza cada renglón de la tarifa del ISR." },
    { termino: "Cuota fija", definicion: "ISR que ya se acumula hasta el límite inferior de tu renglón." },
    { termino: "Retención", definicion: "ISR que tu empresa descuenta de tu sueldo y paga al SAT por ti." },
  ],
});
