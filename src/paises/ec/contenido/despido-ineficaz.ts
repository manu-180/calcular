import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ec.despido-ineficaz",
  h1: "Despido de mujer embarazada y despido ineficaz en Ecuador",
  title: "Despido de embarazada Ecuador: indemnización en {{anio}}",
  description: "Si te despidieron embarazada, en lactancia o por ser dirigente sindical, calcula la indemnización de un año de sueldo más el despido y el desahucio.",
  intro: [
    "En Ecuador el despido de una trabajadora embarazada o en lactancia, o de un dirigente sindical, es ineficaz: la ley lo trata como si no hubiera pasado. Puedes pedir volver al trabajo.",
    "Si prefieres no volver, te pagan un año de remuneración además de la indemnización normal por despido. Lo mismo pasa con un despido por discriminación, aunque en ese caso no hay reintegro.",
  ],
  comoSeCalcula: [
    "Indemnización por despido intempestivo: {{ec.despido-meses-minimo}} de remuneración hasta {{ec.despido-anios-base}}, y un mes por año después, hasta {{ec.despido-meses-maximo}}.",
    "Bonificación por desahucio: el {{ec.desahucio}} de la remuneración por cada año completo.",
    "Indemnización adicional: {{ec.despido-ineficaz-meses}} de la remuneración que cobrabas.",
    "Si el juez ordena que vuelvas, te pagan los sueldos que dejaste de cobrar con un recargo del {{ec.recargo-ineficaz}}.",
  ],
  ejemplo: [
    "Te despidieron embarazada después de 2 años y 8 meses, con un sueldo de $800. Si no vuelves: $2.400 de despido, $400 de desahucio y $9.600 de indemnización adicional. En total, $12.400.",
  ],
  faq: [
    {
      pregunta: "¿Me pueden despedir si estoy embarazada?",
      respuesta: "No. Ese despido es ineficaz. Puedes demandar ante el juez del trabajo y pedir que te reintegren, o cobrar la indemnización adicional de un año de sueldo.",
    },
    {
      pregunta: "¿Cuánto tiempo tengo para reclamar?",
      respuesta: "{{ec.despido-ineficaz-plazo-dias}} desde el despido. La demanda se presenta ante el juez del trabajo del lugar donde te despidieron.",
    },
    {
      pregunta: "¿La indemnización adicional reemplaza a la del despido?",
      respuesta: "No, se suma. Cobras el año de remuneración, la indemnización por despido intempestivo y el desahucio.",
    },
    {
      pregunta: "¿Y si me despidieron por mi edad o mi orientación sexual?",
      respuesta: "Es un despido discriminatorio. No hay reintegro, pero te corresponde la misma indemnización adicional de un año de remuneración.",
    },
  ],
  glosario: [
    { termino: "Despido ineficaz", definicion: "Un despido que la ley no reconoce. La relación laboral sigue como si no se hubiera interrumpido." },
    { termino: "Reintegro", definicion: "Volver a tu puesto de trabajo por orden del juez." },
    { termino: "Período de lactancia", definicion: "Los meses después de la licencia por maternidad en los que trabajas una jornada más corta." },
  ],
});
