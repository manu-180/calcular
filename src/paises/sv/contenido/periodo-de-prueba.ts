import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "sv.periodo-de-prueba",
  h1: "Calculadora del período de prueba",
  title: "Período de prueba en El Salvador: cuándo termina",
  description: "El período de prueba dura {{sv.periodo-prueba-dias}} desde el primer día de trabajo. Ponga su fecha de inicio y vea cuándo termina y desde qué día queda fijo.",
  intro: [
    "En El Salvador el contrato puede pactar que los primeros {{sv.periodo-prueba-dias}} sean de prueba. En ese tiempo usted o su patrono pueden terminar el contrato sin dar motivo y sin indemnización.",
    "Ponga su primer día de trabajo y le decimos el último día de prueba y desde cuándo su contrato es por tiempo indefinido.",
  ],
  comoSeCalcula: [
    "Se cuentan {{sv.periodo-prueba-dias}} corridos desde el primer día de trabajo, ese día incluido.",
    "Si nadie termina el contrato en ese plazo, sigue por tiempo indefinido (salvo que tenga un plazo pactado que la ley permita).",
  ],
  ejemplo: ["Si empezó el 1 de octubre de 2026, la prueba termina el 30 de octubre y desde el 31 su contrato es indefinido."],
  faq: [
    {
      pregunta: "¿Me tienen que inscribir en el ISSS durante la prueba?",
      respuesta: "Sí. Desde 2022 el Código de Trabajo obliga al patrono a inscribir también a quienes están en período de prueba y a los trabajadores temporales.",
    },
    {
      pregunta: "¿Me pueden despedir sin pagar durante la prueba?",
      respuesta: "Sí. Dentro del período de prueba cualquiera de las partes termina el contrato sin responsabilidad. Igual le deben pagar los días trabajados.",
    },
    {
      pregunta: "¿Pueden ponerme otra prueba si me recontratan?",
      respuesta: "No, si el nuevo contrato es con el mismo patrono y para el mismo trabajo antes de que pase un año.",
    },
    {
      pregunta: "¿El trabajo doméstico también tiene prueba?",
      respuesta: "Sí. En el servicio doméstico los primeros {{sv.periodo-prueba-dias}} también se consideran de prueba.",
    },
  ],
  glosario: [{ termino: "Contrato por tiempo indefinido", definicion: "El contrato que no tiene fecha de fin." }],
});
