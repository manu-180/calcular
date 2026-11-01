import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "bo.desahucio",
  h1: "Calculadora de desahucio en Bolivia",
  title: "Desahucio Bolivia {{anio}}: calcule cuánto le corresponde",
  description: "Calcule el desahucio que le corresponde si lo despidieron sin causa justificada: {{bo.desahucio-sueldos}} sueldos promedio, además de la indemnización.",
  intro: [
    "El desahucio es la compensación que paga el empleador cuando lo despide sin causa justificada. Equivale a {{bo.desahucio-sueldos}} sueldos promedio y se suma a la indemnización por tiempo de servicios.",
    "Elija cómo terminó el trabajo y escriba su sueldo promedio y sus fechas.",
  ],
  comoSeCalcula: [
    "La base es el promedio del total ganado de los 3 meses anteriores al despido.",
    "Ese promedio se multiplica por {{bo.desahucio-sueldos}}.",
    "Corresponde solo si lo despidieron sin causa justificada y trabajó más de {{bo.indemnizacion-dias-minimos}} seguidos.",
  ],
  ejemplo: [
    "Con un sueldo promedio de Bs 3.000 y un despido sin causa, el desahucio es 3.000 × 3 = Bs 9.000. Es el ejemplo de la guía del Ministerio de Trabajo.",
  ],
  faq: [
    {
      pregunta: "¿Si renuncio me pagan desahucio?",
      respuesta: "No. El desahucio es solo para el despido sin causa justificada. Si renuncia, cobra la indemnización, el aguinaldo y las vacaciones, pero no el desahucio.",
    },
    {
      pregunta: "¿Me pueden dar un preaviso en lugar del desahucio?",
      respuesta: "No. La Sentencia Constitucional 0009/2017 eliminó el preaviso. Aunque le avisen antes, si el despido es sin causa justificada le corresponde el desahucio.",
    },
    {
      pregunta: "¿Cuándo no hay desahucio?",
      respuesta: "Cuando el despido se debe a una causa del artículo 16 de la Ley General del Trabajo (por ejemplo robo, abuso de confianza o daño intencional) o cuando usted trabajó {{bo.indemnizacion-dias-minimos}} o menos.",
    },
    {
      pregunta: "¿Puedo pedir la reincorporación en vez del desahucio?",
      respuesta: "Sí. Si lo despidieron sin causa puede elegir entre cobrar sus beneficios sociales o pedir volver a su puesto ante la Jefatura de Trabajo, dentro de los 3 meses. Si cobra los beneficios, ya no puede pedir la reincorporación.",
    },
  ],
  glosario: [
    { termino: "Desahucio", definicion: "Compensación de {{bo.desahucio-sueldos}} sueldos por un despido sin causa justificada." },
    { termino: "Salario promedio indemnizable", definicion: "El promedio del total ganado de los 3 meses anteriores al despido." },
  ],
});
