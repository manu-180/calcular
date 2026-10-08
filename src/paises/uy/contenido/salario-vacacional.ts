import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "uy.salario-vacacional",
  h1: "Calculadora de licencia y salario vacacional",
  title: "Salario vacacional y licencia 2026: calculá días y monto",
  description:
    "Calculá tus días de licencia ({{uy.licencia-dias}} más los de antigüedad) y tu salario vacacional sobre el jornal líquido, con los descuentos de 2026. Gratis.",
  intro: [
    "El salario vacacional es el {{uy.salario-vacacional}} de tu jornal líquido por cada día de licencia. La licencia mínima es de {{uy.licencia-dias}} por año trabajado y crece con la antigüedad.",
    "Te mostramos los días que generaste, lo que cobrás por esos días y el salario vacacional, que se calcula sobre tu sueldo líquido.",
  ],
  comoSeCalcula: [
    "La licencia mínima es de {{uy.licencia-dias}} por año trabajado. Desde los 5 años en la empresa se suma un día por cada 4 años de antigüedad: 21 días a los 5 años, 22 a los 8.",
    "Si no trabajaste el año entero, te tocan días en proporción a los meses trabajados hasta el 31 de diciembre.",
    "Cada día de licencia de un mensual vale el sueldo dividido 30.",
    "El salario vacacional es el {{uy.salario-vacacional}} del jornal líquido: al sueldo se le restan aportes e IRPF, se divide entre 30 y se multiplica por los días.",
  ],
  ejemplo: [
    "Con $ 60.000 nominales y un año completo, te tocan 20 días. Tu líquido es $ 48.240, así que el salario vacacional es 48.240 / 30 × 20 = $ 32.160.",
  ],
  faq: [
    {
      pregunta: "¿Cuándo se cobra el salario vacacional?",
      respuesta: "Antes de salir de licencia, en proporción a los días que te tomás.",
    },
    {
      pregunta: "¿El salario vacacional paga IRPF?",
      respuesta: "Paga IRPF, pero no aportes al BPS. Lo que cobrás de licencia, en cambio, paga las dos cosas.",
    },
    {
      pregunta: "¿Los sábados cuentan como días de licencia?",
      respuesta: "Sí. No se cuentan los domingos ni los feriados, pero los sábados sí.",
    },
    {
      pregunta: "¿Las horas extra suman para la licencia?",
      respuesta: "Sí. Se toma el promedio de horas extra del año que genera la licencia. Sumá ese promedio mensual a tu sueldo en la calculadora.",
    },
    {
      pregunta: "¿Puedo cobrar la licencia en lugar de tomármela?",
      respuesta: "No. Es un derecho irrenunciable y la ley anula cualquier acuerdo para cambiarla por plata. Solo se paga en dinero la que quedó sin gozar al terminar el trabajo.",
    },
    {
      pregunta: "¿Mi convenio puede darme más?",
      respuesta: "Sí. El {{uy.salario-vacacional}} del jornal líquido es el mínimo legal. Algunos laudos y convenios pagan más.",
    },
  ],
  glosario: [
    { termino: "Licencia anual", definicion: "Vacaciones pagas. En Uruguay se generan por el trabajo de un año y se toman en el año siguiente." },
    { termino: "Salario vacacional", definicion: "Suma extra para el mejor goce de la licencia, igual al jornal líquido por cada día." },
    { termino: "Jornal líquido", definicion: "Lo que cobrás por día después de aportes e IRPF." },
  ],
});
