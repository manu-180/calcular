import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "us-es.social-security-benefits",
  h1: "Calculadora del Seguro Social",
  title: "Calculadora del Seguro Social: cobrar a los 62, 67 o 70",
  description: "Calcula tu beneficio mensual de jubilación del Seguro Social a partir de tus ganancias indexadas promedio y mira cómo cambia si cobras antes o después.",
  intro: [
    "Tu cheque del Seguro Social depende de tus ganancias de toda la vida y de la edad en que empiezas a cobrar. Empezar antes lo reduce de por vida, y esperar hasta los 70 lo aumenta.",
    "Escribe tus ganancias mensuales indexadas promedio (AIME) y la edad a la que piensas cobrar para estimar tu beneficio mensual.",
  ],
  comoSeCalcula: [
    "Tu monto de seguro primario (PIA) es el 90% de la primera parte de tu AIME, el 32% de la parte del medio y el 15% del resto. Para quienes cumplen 62 en 2026, las partes se cortan en $1,286 y $7,749.",
    "Si naciste en 1960 o después, tu plena edad de jubilación es 67. A esa edad recibes el 100% de tu PIA.",
    "Cada mes que cobras antes reduce el beneficio en 5/9 de 1% durante los primeros 36 meses y en 5/12 de 1% después. A los 62 la reducción es de 30%.",
    "Cada mes que esperas después de los 67 suma 2/3 de 1%, o 8% al año, hasta los 70.",
  ],
  ejemplo: [
    "Con un AIME de $5,000, el PIA es de $2,345.80. Cobrar a los 62 paga unos $1,642 al mes, a los 67 unos $2,345 y a los 70 unos $2,908.",
  ],
  faq: [
    { pregunta: "¿Cómo encuentro mi AIME?", respuesta: "Entra a tu cuenta my Social Security en ssa.gov para ver tu historial de ganancias y los estimados de beneficios. El AIME son tus 35 años de mayores ganancias, ajustados por el crecimiento salarial, divididos entre 420." },
    { pregunta: "¿Conviene cobrar a los 62 o esperar?", respuesta: "Esperar paga más por mes de por vida. Cobrar antes puede tener sentido si necesitas el ingreso o no esperas una jubilación larga. Si estás casado, que espere quien ganaba más también mejora el beneficio de sobreviviente del otro cónyuge." },
    { pregunta: "¿Por qué es distinto de mi estado de cuenta de la SSA?", respuesta: "Tu estado de cuenta proyecta tus ganancias futuras y usa tu propio año de elegibilidad. Esta calculadora usa el AIME que escribes y la fórmula de 2026, sin aumentos por costo de vida." },
  ],
  glosario: [
    { termino: "AIME", definicion: "Ganancias mensuales indexadas promedio: la base que usa el Seguro Social para calcular tu beneficio." },
    { termino: "PIA", definicion: "Monto de seguro primario: tu beneficio mensual si empiezas a cobrar a la plena edad de jubilación." },
    { termino: "Plena edad de jubilación", definicion: "La edad en que recibes tu beneficio completo. Es 67 para quienes nacieron en 1960 o después." },
  ],
});
