import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "cl.sueldo-minimo",
  h1: "Sueldo mínimo en Chile 2026: {{cl.imm}}",
  title: "Sueldo mínimo 2026 en Chile: {{cl.imm}}",
  description:
    "El sueldo mínimo en Chile es {{cl.imm}} desde el {{cl.imm#desde}}. Calcula el mínimo para tu jornada parcial, el valor por día y por hora. Gratis.",
  intro: [
    "El sueldo mínimo en Chile es {{cl.imm}} al mes para personas de 18 a 65 años, desde el {{cl.imm#desde}}. En la ley se llama ingreso mínimo mensual.",
    "Para menores de 18 y mayores de 65 es {{cl.imm-menores-mayores}}. Si trabajas jornada parcial, el mínimo se calcula en proporción a tus horas.",
  ],
  comoSeCalcula: [
    "Se toma el ingreso mínimo que corresponde a tu edad.",
    "Si tu jornada es menor que la máxima legal ({{cl.jornada-maxima}} semanales), se multiplica por tus horas y se divide por la jornada máxima.",
    "El valor por día es el mínimo dividido por 30. El valor por hora sigue la fórmula de la Dirección del Trabajo: mínimo / 30 × 28 / (4 × horas semanales).",
  ],
  ejemplo: [
    "Con jornada de 21 horas semanales, la mitad de la jornada máxima de 2026, el mínimo es la mitad del ingreso mínimo.",
    "Con el mínimo de $553.553 (desde mayo de 2026) y jornada de 42 horas, el valor por día es $18.452 y por hora, $3.075.",
  ],
  faq: [
    {
      pregunta: "¿Cuánto es el sueldo mínimo hoy?",
      respuesta: "{{cl.imm}} para personas de 18 a 65 años, vigente desde el {{cl.imm#desde}} (Ley 21.830).",
    },
    {
      pregunta: "¿Cuánto es el sueldo mínimo líquido?",
      respuesta: "Depende de tu AFP y tu salud. Con AFP Uno, Fonasa y contrato indefinido, el mínimo de $553.553 queda en $453.581 líquidos.",
    },
    {
      pregunta: "¿Cuándo vuelve a subir?",
      respuesta: "El 1 de enero de 2027 se reajusta según el IPC de mayo a diciembre de 2026. El nuevo monto lo fija un decreto.",
    },
    {
      pregunta: "¿Qué es el ingreso mínimo para fines no remuneracionales?",
      respuesta: "Es un monto que se usa como referencia en beneficios y cálculos que no son sueldo. Hoy es {{cl.imm-no-remuneracional}}.",
    },
    {
      pregunta: "¿La gratificación cuenta para llegar al mínimo?",
      respuesta: "No. El sueldo base mensual no puede ser menor que el mínimo. La gratificación se paga aparte.",
    },
  ],
  glosario: [
    { termino: "Ingreso mínimo mensual", definicion: "El sueldo más bajo que se puede pagar por una jornada completa." },
    { termino: "Jornada parcial", definicion: "Contrato por menos horas que la jornada máxima legal." },
  ],
});
