import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "pe.gratificacion",
  h1: "Calculadora de gratificación de diciembre 2026",
  title: "Calculadora de gratificación diciembre 2026 en Perú",
  description:
    "Calcula tu gratificación de diciembre o de julio con la bonificación extraordinaria del {{pe.bonificacion-extraordinaria[essalud]}}. Completa o proporcional, con la RMV de {{pe.rmv}}. Gratis.",
  intro: [
    "La gratificación de diciembre es un sueldo completo si trabajaste de julio a diciembre, más una bonificación extraordinaria del {{pe.bonificacion-extraordinaria[essalud]}}. Se paga hasta el 15 de diciembre.",
    "La gratificación (la «grati») se cobra dos veces al año: en julio por Fiestas Patrias y en diciembre por Navidad. Si trabajaste menos del semestre, te toca un sexto por cada mes completo.",
    "Si tienes hijos, la asignación familiar entra en el cálculo y desde el {{pe.rmv#desde}} vale más, porque subió la remuneración mínima.",
  ],
  comoSeCalcula: [
    "Se suma tu sueldo, la asignación familiar ({{pe.asignacion-familiar}} de la RMV, si la cobras) y el promedio de pagos variables que recibiste al menos tres meses del semestre.",
    "Ese total se multiplica por los meses completos que trabajaste en el semestre y se divide entre 6. La gratificación de julio cuenta de enero a junio y la de diciembre, de julio a diciembre.",
    "A la gratificación se le suma la bonificación extraordinaria: {{pe.bonificacion-extraordinaria[essalud]}} si te atiendes en EsSalud o {{pe.bonificacion-extraordinaria[eps]}} si tienes EPS.",
    "En la pequeña empresa inscrita en el REMYPE la gratificación es media remuneración. En la microempresa no hay gratificación.",
  ],
  ejemplo: [
    "Ganas S/ 2,000 al mes, no cobras asignación familiar y trabajaste de julio a diciembre. Tu gratificación es S/ 2,000 y la bonificación del {{pe.bonificacion-extraordinaria[essalud]}} suma S/ 180. En diciembre recibes S/ 2,180.",
    "Si solo trabajaste agosto, setiembre, octubre y noviembre completos, cobras cuatro sextos: S/ 1,333.33 más su bonificación.",
  ],
  faq: [
    {
      pregunta: "¿Hasta cuándo me tienen que pagar la gratificación de diciembre?",
      respuesta: "Hasta el 15 de diciembre. La de julio, hasta el 15 de julio. Si no te pagan, puedes denunciarlo ante Sunafil.",
    },
    {
      pregunta: "¿Cuánto es la gratificación si gano el sueldo mínimo?",
      respuesta: "Con la RMV que rige desde octubre de 2026 (S/ 1,230) y el semestre completo, S/ 1,230 más S/ 110.70 de bonificación: S/ 1,340.70. Con asignación familiar, S/ 1,474.77.",
    },
    {
      pregunta: "¿A la gratificación le descuentan AFP u ONP?",
      respuesta: "No. La gratificación no paga aportes de pensión ni de salud. Lo único que puede tener es retención de renta de quinta categoría si ganas lo suficiente.",
    },
    {
      pregunta: "¿Qué pasa si entré a trabajar a mitad del semestre?",
      respuesta: "Cobras la parte proporcional: un sexto por cada mes calendario completo. Si entraste el 10 de agosto, cuentan setiembre, octubre, noviembre y diciembre.",
    },
    {
      pregunta: "¿Cuánto es la bonificación extraordinaria si tengo EPS?",
      respuesta: "Es el {{pe.bonificacion-extraordinaria[eps]}} de la gratificación, en vez del {{pe.bonificacion-extraordinaria[essalud]}}. Se paga junto con la gratificación.",
    },
    {
      pregunta: "¿Cuál es la asignación familiar hoy?",
      respuesta: "Es el {{pe.asignacion-familiar}} de la remuneración mínima. La RMV es {{pe.rmv}} desde el {{pe.rmv#desde}}.",
    },
  ],
  glosario: [
    { termino: "Gratificación", definicion: "Remuneración extra que la ley obliga a pagar en julio y diciembre a quienes trabajan en el régimen privado." },
    { termino: "Bonificación extraordinaria", definicion: "Monto que se suma a la gratificación y equivale al aporte a EsSalud que la empresa no paga sobre ella (Ley 30334)." },
    { termino: "RMV", definicion: "Remuneración mínima vital: el sueldo más bajo que se puede pagar por una jornada completa." },
    { termino: "REMYPE", definicion: "Registro de la micro y pequeña empresa. Las empresas inscritas pagan beneficios laborales reducidos." },
  ],
});
