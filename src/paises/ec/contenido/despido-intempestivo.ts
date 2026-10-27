import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ec.despido-intempestivo",
  h1: "Calculadora de despido intempestivo en Ecuador",
  title: "Despido intempestivo Ecuador {{anio}}: cuánto te pagan",
  description: "Calcula la indemnización por despido intempestivo: {{ec.despido-meses-minimo}} de sueldo hasta {{ec.despido-anios-base}}, un mes por año después y el desahucio del {{ec.desahucio}}.",
  intro: [
    "Si tu empleador te despide sin una causa legal, es un despido intempestivo. Te tiene que pagar una indemnización según los años que trabajaste, más la bonificación por desahucio.",
    "Pon la fecha en que empezaste, la del despido y tu remuneración. La calculadora te da los meses que te corresponden y el total.",
  ],
  comoSeCalcula: [
    "Con hasta {{ec.despido-anios-base}} de servicio te pagan {{ec.despido-meses-minimo}} de remuneración, aunque hayas trabajado pocos meses.",
    "Con más de {{ec.despido-anios-base}}, un mes por cada año. La fracción de año cuenta como año completo. El tope es de {{ec.despido-meses-maximo}}.",
    "Se suma la bonificación por desahucio: el {{ec.desahucio}} de tu remuneración por cada año completo.",
    "Se usa la remuneración que cobrabas al momento del despido.",
  ],
  ejemplo: [
    "Trabajaste 5 años y 6 meses con un sueldo de $1.000. La fracción cuenta como año: son 6 meses, $6.000. Con el desahucio de $1.250, el total es $7.250.",
  ],
  faq: [
    {
      pregunta: "¿Cuánto me pagan si me despiden con menos de un año?",
      respuesta: "{{ec.despido-meses-minimo}} de remuneración. La ley da ese mínimo a cualquiera que tenga hasta {{ec.despido-anios-base}} de servicio.",
    },
    {
      pregunta: "¿Cuál es el máximo de la indemnización?",
      respuesta: "{{ec.despido-meses-maximo}} de remuneración, aunque hayas trabajado más años.",
    },
    {
      pregunta: "¿El desahucio se paga también si me despiden?",
      respuesta: "Sí. Además de la indemnización, te pagan el {{ec.desahucio}} de tu remuneración por cada año completo de trabajo.",
    },
    {
      pregunta: "¿Qué pasa si estaba embarazada o era dirigente sindical?",
      respuesta: "Ese despido es ineficaz y puedes pedir volver al trabajo. Si prefieres no volver, cobras un año de remuneración extra. Lo calculas en la calculadora de despido ineficaz.",
    },
    {
      pregunta: "¿Esto es todo lo que me deben?",
      respuesta: "No. También te pagan los décimos y las vacaciones que te falten cobrar. La calculadora de liquidación suma todo.",
    },
  ],
  glosario: [
    { termino: "Despido intempestivo", definicion: "Cuando el empleador termina el contrato sin una causa legal." },
    { termino: "Desahucio", definicion: "Bonificación del {{ec.desahucio}} de la remuneración por año de servicio." },
    { termino: "Fracción de año", definicion: "Los meses que pasan del último año completo. Para el despido cuentan como un año entero." },
  ],
});
