import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "us-es.social-security-benefits",
  h1: "Calculadora de beneficios del Seguro Social",
  title: "Beneficios del Seguro Social: cobrar a los 62, 67 o 70",
  description: "Calcule su beneficio mensual de jubilación del Seguro Social a partir de sus ganancias mensuales indexadas promedio y vea cómo cambia si cobra antes o después.",
  intro: [
    "Su cheque del Seguro Social depende de sus ganancias de toda la vida y de la edad en que empieza a cobrar. Empezar antes lo reduce de por vida, y esperar hasta los 70 lo aumenta.",
    "Indique sus ganancias mensuales indexadas promedio (AIME) y la edad a la que piensa cobrar para estimar su beneficio mensual.",
  ],
  comoSeCalcula: [
    "Su monto de seguro primario (PIA) es el 90% de la primera parte de su AIME, el 32% de la parte del medio y el 15% del resto. Para quienes cumplen 62 en 2026, las partes se cortan en $1,286 y $7,749.",
    "Si nació en 1960 o después, su plena edad de jubilación es 67. A esa edad recibe el 100% de su PIA.",
    "Cada mes que cobra antes reduce el beneficio en 5/9 de 1% durante los primeros 36 meses y en 5/12 de 1% después. A los 62 la reducción es de 30%.",
    "Cada mes que espera después de los 67 suma 2/3 de 1%, o 8% al año, hasta los 70.",
  ],
  ejemplo: [
    "Con un AIME de $5,000, el PIA es de $2,345.80. Cobrar a los 62 paga unos $1,642 al mes, a los 67 unos $2,345 y a los 70 unos $2,908.",
  ],
  faq: [
    { pregunta: "¿Cómo encuentro mi AIME?", respuesta: "Entre a su cuenta my Social Security en ssa.gov para ver su historial de ganancias y los estimados de beneficios. El AIME son sus 35 años de mayores ganancias, ajustados por el crecimiento salarial, divididos entre 420." },
    { pregunta: "¿Conviene cobrar a los 62 o esperar?", respuesta: "Esperar paga más por mes de por vida. Cobrar antes puede tener sentido si necesita el ingreso o no espera una jubilación larga. Un cónyuge que puede cobrar beneficios de sobreviviente también gana cuando espera quien ganaba más." },
    { pregunta: "¿Por qué es distinto de mi estado de cuenta de la SSA?", respuesta: "Su estado de cuenta proyecta sus ganancias futuras y usa su propio año de elegibilidad. Esta calculadora usa el AIME que usted indica y la fórmula de 2026, sin aumentos por costo de vida." },
  ],
  glosario: [
    { termino: "AIME", definicion: "Ganancias mensuales indexadas promedio: la base que usa el Seguro Social para calcular su beneficio." },
    { termino: "PIA", definicion: "Monto de seguro primario: su beneficio mensual si empieza a cobrar a la plena edad de jubilación." },
    { termino: "Plena edad de jubilación", definicion: "La edad en que recibe su beneficio completo. Es 67 para quienes nacieron en 1960 o después." },
  ],
});
