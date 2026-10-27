import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ve.bono-vacacional",
  h1: "Calculadora de bono vacacional en Venezuela",
  title: "Bono vacacional en Venezuela {{anio}}: cuánto te toca",
  description:
    "Calcula tu bono vacacional con la LOTTT: {{ve.bono-vacacional-dias-base}} de salario el primer año y uno más por año, hasta {{ve.bono-vacacional-dias-tope}}. En bolívares o en dólares.",
  intro: [
    "El bono vacacional es un pago extra que recibes cada vez que sales de vacaciones, además del salario de esos días. El primer año son {{ve.bono-vacacional-dias-base}} de salario normal y cada año suma uno más, hasta {{ve.bono-vacacional-dias-tope}}.",
    "Escribe tu salario mensual y los años de servicio que cumples. Te mostramos los días y el monto, en bolívares o en dólares.",
  ],
  comoSeCalcula: [
    "Salario diario: tu salario normal mensual entre {{ve.dias-mes-salario}}.",
    "Días de bono: {{ve.bono-vacacional-dias-base}} al cumplir el primer año, más uno por cada año siguiente, con un tope de {{ve.bono-vacacional-dias-tope}}.",
    "Bono: días de bono por salario diario.",
  ],
  ejemplo: ["Con $300 al mes y cinco años de servicio te tocan 19 días de bono: $190."],
  faq: [
    {
      pregunta: "¿Cuántos días de bono vacacional me tocan?",
      respuesta: "{{ve.bono-vacacional-dias-base}} el primer año y uno más por cada año de servicio, hasta {{ve.bono-vacacional-dias-tope}}. Con cinco años, por ejemplo, son 19 días.",
    },
    {
      pregunta: "¿Con qué salario se calcula?",
      respuesta: "Con el salario normal: lo que cobras todos los meses como salario. El cestaticket y el bono de guerra económica no son salario y no cuentan.",
    },
    {
      pregunta: "¿Cuándo me lo tienen que pagar?",
      respuesta: "Al salir de vacaciones, junto con el salario de esos días.",
    },
    {
      pregunta: "¿El bono vacacional es salario?",
      respuesta: "Sí. La ley dice que tiene carácter salarial, por eso su parte diaria entra en el salario integral con el que se calculan las prestaciones.",
    },
    {
      pregunta: "¿Y si me voy antes de cumplir el año?",
      respuesta: "Cobras la parte proporcional a los meses completos que trabajaste. Usa la calculadora de vacaciones fraccionadas.",
    },
  ],
  glosario: [
    { termino: "Bono vacacional", definicion: "Pago extra que se cobra al salir de vacaciones (art. 192 de la LOTTT)." },
    { termino: "Salario normal", definicion: "Lo que cobras de forma regular como salario, sin bonos que no son salario." },
  ],
});
