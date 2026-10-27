import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "pe.cts-trunca",
  h1: "Calculadora de CTS trunca",
  title: "CTS trunca {{anio}}: calcula cuánto te toca",
  description:
    "Calcula tu CTS trunca con tus fechas de ingreso y salida, el sexto de gratificación y tu régimen laboral. Con la RMV de {{pe.rmv}} y la norma vigente.",
  intro: [
    "Cuando dejas tu trabajo, tu empleador te debe la CTS del periodo que todavía no depositó. Esa parte se llama CTS trunca y te la paga directamente con tu liquidación.",
    "Pon tus fechas, tu sueldo y tu última gratificación. Te decimos cuántos meses y días cuentan y cuánto te corresponde.",
  ],
  comoSeCalcula: [
    "La CTS se deposita dos veces al año: en mayo por noviembre a abril y en noviembre por mayo a octubre. La trunca cuenta desde el inicio del periodo que no se depositó hasta tu último día.",
    "La remuneración computable es tu sueldo, más la asignación familiar ({{pe.asignacion-familiar}} de la RMV) si la cobras, más el promedio de pagos variables y un sexto de tu última gratificación.",
    "Se paga un doceavo de esa remuneración por cada mes completo y un trescientos sesentavo por cada día suelto.",
    "En la pequeña empresa la CTS es la mitad. En la microempresa no hay CTS.",
  ],
  ejemplo: [
    "Ganas S/ 2,000, tu última gratificación fue de S/ 2,000 y renuncias el 15 de octubre de 2026. Cuentan 5 meses y 15 días desde el 1 de mayo. Tu remuneración computable es S/ 2,333.33 y tu CTS trunca, S/ 1,069.44.",
  ],
  faq: [
    {
      pregunta: "¿Desde cuándo tengo derecho a CTS trunca?",
      respuesta: "Desde que cumples un mes de trabajo. Si trabajaste menos de un mes en total, no se genera CTS.",
    },
    {
      pregunta: "¿La CTS trunca va a mi cuenta CTS?",
      respuesta: "No. Como es por menos de un semestre, tu empleador te la paga directamente, dentro de las 48 horas de tu cese.",
    },
    {
      pregunta: "¿Puedo retirar mi CTS cuando dejo el trabajo?",
      respuesta: "Sí. Al terminar tu relación laboral puedes retirar todo el saldo de tu cuenta CTS, con sus intereses.",
    },
    {
      pregunta: "¿Por qué se suma un sexto de la gratificación?",
      respuesta: "Porque la ley considera la gratificación parte de tu remuneración para la CTS, repartida en los seis meses del semestre.",
    },
  ],
  glosario: [
    { termino: "CTS", definicion: "Compensación por tiempo de servicios: un ahorro que tu empleador deposita en tu nombre dos veces al año." },
    { termino: "Remuneración computable", definicion: "La suma que se usa para calcular la CTS: sueldo, asignación familiar, pagos regulares y un sexto de la gratificación." },
  ],
});
