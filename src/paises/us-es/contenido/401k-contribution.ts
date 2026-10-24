import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "us-es.401k-contribution",
  h1: "Calculadora de aportes al 401(k)",
  title: "Calculadora 401(k) 2026: límites y aporte del empleador",
  description: "Mira cuánto entra a tu 401(k) en 2026, el aporte equivalente de tu empleador y el límite de {{us.401k-limit}}, con el catch-up desde los 50 y el mayor de 60 a 63 años.",
  intro: [
    "Escribe tu salario, el porcentaje que ahorras y el aporte equivalente de tu empleador para ver lo que entra a tu 401(k) este año.",
    "La calculadora aplica el límite del IRS para tu edad y te dice qué porcentaje te llevaría al máximo.",
  ],
  comoSeCalcula: [
    "El límite de 2026 para tus propios aportes es de {{us.401k-limit}}.",
    "A los 50 años o más puedes sumar un catch-up de {{us.401k-catch-up}}. Si cumples 60, 61, 62 o 63 este año, el catch-up es de {{us.401k-catch-up-60-63}}.",
    "Tu aporte es tu salario por tu porcentaje, con ese límite como tope.",
    "El aporte del empleador es su tasa de equivalencia aplicada a tu aporte, pero solo sobre la parte hasta el porcentaje del salario que iguala.",
  ],
  ejemplo: [
    "Con un salario de $75,000, ahorrar 6% pone $4,500 en tu 401(k). Con un aporte equivalente de 50% hasta el 6% del sueldo, tu empleador suma $2,250, en total $6,750 al año.",
  ],
  faq: [
    { pregunta: "¿Cuál es el límite del 401(k) para 2026?", respuesta: "{{us.401k-limit}} para los aportes del empleado, más {{us.401k-catch-up}} si tienes 50 años o más, o {{us.401k-catch-up-60-63}} si tienes de 60 a 63." },
    { pregunta: "¿El aporte del empleador cuenta para mi límite?", respuesta: "No. El aporte del empleador tiene su propio límite combinado, mucho más alto. Solo tus propios aportes antes de impuestos y Roth cuentan para el límite del empleado." },
    { pregunta: "¿Conviene aportar al menos lo necesario para recibir todo el aporte del empleador?", respuesta: "Para la mayoría de las personas, sí. Ese aporte es parte de tu pago, y aportar menos que el porcentaje que se iguala deja ese dinero sin cobrar." },
    { pregunta: "¿Los aportes catch-up tienen que ser Roth?", respuesta: "Desde 2026, si tus salarios del Seguro Social con ese empleador pasaron el umbral del IRS el año anterior, tus aportes catch-up deben ir a la parte Roth del plan." },
  ],
  glosario: [
    { termino: "Aporte electivo", definicion: "La parte de tu pago que eliges poner en el plan, antes de impuestos o Roth." },
    { termino: "Aporte catch-up", definicion: "Un monto extra que las personas de 50 años o más pueden aportar por encima del límite normal." },
    { termino: "Vesting (consolidación)", definicion: "Cuándo el aporte del empleador pasa a ser totalmente tuyo. Tus propios aportes siempre son tuyos." },
  ],
});
