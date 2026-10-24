import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "us-es.401k-contribution",
  h1: "Calculadora de aportes al 401(k)",
  title: "Calculadora 401(k) 2026: límites y aporte del empleador",
  description: "Vea cuánto entra a su 401(k) en 2026, el aporte equivalente de su empleador y el límite de {{us.401k-limit}}, con el catch-up desde los 50 y el mayor de 60 a 63 años.",
  intro: [
    "Indique su salario, el porcentaje que ahorra y el aporte equivalente de su empleador para ver lo que entra a su 401(k) este año.",
    "La calculadora aplica el límite del IRS para su edad y le dice qué porcentaje lo llevaría al máximo.",
  ],
  comoSeCalcula: [
    "El límite de 2026 para sus propios aportes es de {{us.401k-limit}}.",
    "A los 50 años o más puede sumar un catch-up de {{us.401k-catch-up}}. Si cumple 60, 61, 62 o 63 este año, el catch-up es de {{us.401k-catch-up-60-63}}.",
    "Su aporte es su salario por su porcentaje, con ese límite como tope.",
    "El aporte del empleador es su tasa de equivalencia aplicada a su aporte, pero solo sobre la parte hasta el porcentaje del salario que iguala.",
  ],
  ejemplo: [
    "Con un salario de $75,000, ahorrar 6% pone $4,500 en su 401(k). Con un aporte equivalente de 50% hasta el 6% del sueldo, su empleador suma $2,250, en total $6,750 al año.",
  ],
  faq: [
    { pregunta: "¿Cuál es el límite del 401(k) para 2026?", respuesta: "{{us.401k-limit}} para los aportes del empleado, más {{us.401k-catch-up}} si tiene 50 años o más, o {{us.401k-catch-up-60-63}} si tiene de 60 a 63." },
    { pregunta: "¿El aporte del empleador cuenta para mi límite?", respuesta: "No. El aporte del empleador tiene su propio límite combinado, mucho más alto. Solo sus propios aportes antes de impuestos y Roth cuentan para el límite del empleado." },
    { pregunta: "¿Conviene aportar al menos lo necesario para recibir todo el aporte del empleador?", respuesta: "Para la mayoría de las personas, sí. Ese aporte es parte de su pago, y aportar menos que el porcentaje que se iguala deja ese dinero sin cobrar." },
    { pregunta: "¿Los aportes catch-up tienen que ser Roth?", respuesta: "Desde 2026, si sus salarios del Seguro Social con ese empleador pasaron el umbral del IRS el año anterior, sus aportes catch-up deben ir a la parte Roth del plan." },
  ],
  glosario: [
    { termino: "Aporte electivo", definicion: "La parte de su pago que usted elige poner en el plan, antes de impuestos o Roth." },
    { termino: "Aporte catch-up", definicion: "Un monto extra que las personas de 50 años o más pueden aportar por encima del límite normal." },
    { termino: "Vesting (consolidación)", definicion: "Cuándo el aporte del empleador pasa a ser totalmente suyo. Sus propios aportes siempre son suyos." },
  ],
});
