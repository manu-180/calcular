import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "mx.vales-de-despensa",
  h1: "Vales de despensa: cuánto integra al salario del IMSS",
  title: "Vales de despensa {{anio}}: tope para el IMSS",
  description:
    "Calcula qué parte de tus vales de despensa integra el salario base de cotización del IMSS: no integra hasta el {{mx.despensa-no-integra}} de la UMA por día.",
  intro: [
    "Los vales de despensa no suman a tu salario base de cotización mientras no pasen del {{mx.despensa-no-integra}} de la UMA diaria. Lo que pasa de ese tope sí se suma, y sube tus cuotas del IMSS.",
    "Escribe el monto de vales del mes y los días del periodo.",
  ],
  comoSeCalcula: [
    "Tope diario: {{mx.despensa-no-integra}} de la UMA diaria ({{mx.uma-diaria}}).",
    "Tope del periodo: tope diario por los días.",
    "Lo que pasa del tope integra al salario base de cotización; se divide entre los días para sumarlo por día.",
  ],
  ejemplo: ["Con 1,500 pesos de vales en un mes de 30 días, el tope es de 1,407.72: integran 92.28 pesos, unos 3.08 por día."],
  faq: [
    {
      pregunta: "¿Cuánto puede darme mi empresa en vales sin que suban mis cuotas del IMSS?",
      respuesta: "Hasta el {{mx.despensa-no-integra}} de la UMA por cada día del periodo. Arriba de eso, el excedente se suma a tu salario base de cotización.",
    },
    {
      pregunta: "¿Los vales de despensa pagan ISR?",
      respuesta: "Son previsión social y pueden estar exentos, pero con límites propios de la Ley del ISR. Esta calculadora solo hace la parte del IMSS.",
    },
    {
      pregunta: "¿Da igual si son en efectivo o en tarjeta?",
      respuesta: "Para el IMSS la ley habla de despensas en especie o en dinero. Para que la empresa los pueda deducir, el SAT pide que se den en monederos electrónicos.",
    },
  ],
  glosario: [{ termino: "Integrar al SBC", definicion: "Sumar una prestación al salario base de cotización con el que se pagan las cuotas del IMSS." }],
});
