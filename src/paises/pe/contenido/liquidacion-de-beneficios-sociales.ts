import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "pe.liquidacion",
  h1: "Calculadora de liquidación de beneficios sociales",
  title: "Liquidación de beneficios sociales 2026: calcúlala",
  description:
    "Calcula tu liquidación al dejar el trabajo: CTS trunca, gratificación trunca con bonificación y vacaciones truncas. Con la RMV de {{pe.rmv}} y fuente oficial.",
  intro: [
    "Cuando dejas un trabajo (por renuncia, despido o fin de contrato), tu empleador te debe pagar los beneficios que acumulaste y todavía no cobraste. Eso es la liquidación de beneficios sociales.",
    "Tiene que pagártela dentro de las 48 horas siguientes a tu cese.",
    "La liquidación incluye la CTS trunca, la gratificación trunca con su bonificación y las vacaciones truncas. Si tenías vacaciones ganadas sin tomar, también entran.",
  ],
  comoSeCalcula: [
    "CTS trunca: desde el último 1 de mayo o 1 de noviembre hasta tu último día. Se paga un dozavo de la remuneración computable por mes y un treintavo de ese dozavo por día.",
    "Gratificación trunca: un sexto de tu remuneración por cada mes calendario completo del semestre en que dejas el trabajo, más la bonificación extraordinaria del {{pe.bonificacion-extraordinaria[essalud]}} (o {{pe.bonificacion-extraordinaria[eps]}} con EPS).",
    "Vacaciones truncas: desde tu último aniversario en la empresa, un dozavo de la remuneración por mes y un treintavo de ese dozavo por día.",
    "Vacaciones ganadas no tomadas: un treintavo de tu remuneración por cada día pendiente.",
    "En la pequeña empresa del REMYPE la CTS y la gratificación son la mitad y las vacaciones son de 15 días. En la microempresa solo se pagan las vacaciones.",
  ],
  ejemplo: [
    "Entraste el 1 de marzo de 2024 con un sueldo de S/ 2,000 y renuncias el 15 de octubre de 2026. En julio cobraste S/ 2,000 de gratificación.",
    "CTS trunca: 5 meses y 15 días, S/ 1,069.44. Gratificación trunca: julio, agosto y setiembre, S/ 1,000 más S/ 90 de bonificación. Vacaciones truncas: 7 meses y 15 días, S/ 1,250. En total, S/ 3,409.44.",
  ],
  faq: [
    {
      pregunta: "¿En cuánto tiempo me tienen que pagar la liquidación?",
      respuesta: "En 48 horas desde que dejaste de trabajar. Si no te pagan, puedes denunciarlo ante Sunafil.",
    },
    {
      pregunta: "¿Me pagan liquidación si renuncio?",
      respuesta: "Sí. La liquidación se paga siempre que termina la relación laboral, sin importar el motivo. La indemnización por despido arbitrario es otra cosa y solo corresponde si te despiden sin causa.",
    },
    {
      pregunta: "¿Qué pasa con la CTS que ya está depositada?",
      respuesta: "Sigue en tu cuenta. Con la constancia de cese puedes retirarla toda. La liquidación solo suma la parte que todavía no se depositó.",
    },
    {
      pregunta: "¿Cuánto tiempo tengo que trabajar para recibir liquidación?",
      respuesta: "Con un mes completo ya generas CTS trunca, gratificación trunca y vacaciones truncas. Con menos de un mes solo te deben los días trabajados.",
    },
  ],
  glosario: [
    { termino: "Trunca", definicion: "La parte proporcional de un beneficio que no llegaste a completar porque dejaste el trabajo antes." },
    { termino: "Cese", definicion: "El fin de la relación laboral, por renuncia, despido, fin de contrato u otra causa." },
    { termino: "Remuneración computable", definicion: "La base del cálculo: sueldo, asignación familiar y pagos regulares. Para la CTS se suma un sexto de la última gratificación." },
  ],
});
