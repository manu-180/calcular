import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "zz.bono",
  h1: "Calculadora del bono semestral de Zetalandia",
  title: "Bono semestral en Zetalandia: calcula cuánto te toca",
  description:
    "Calcula tu bono semestral con el salario mínimo vigente de tu zona y la bonificación del {{zz.bonificacion}}. Datos oficiales con fecha y fuente.",
  intro: [
    "El bono semestral es un sueldo extra que se paga dos veces por año.",
    "Si trabajaste el semestre completo, cobras un sueldo entero más una bonificación del {{zz.bonificacion}}.",
  ],
  comoSeCalcula: [
    "Se toma tu sueldo mensual bruto. Si es menor que el mínimo de tu zona, se usa el mínimo.",
    "Ese sueldo se multiplica por los meses trabajados y se divide por 6.",
    "En una pequeña empresa el bono es la mitad.",
    "Al bono se le suma la bonificación del {{zz.bonificacion}}.",
  ],
  ejemplo: [
    "Con un sueldo de 2000 y el semestre completo en la zona norte, el bono es 2000 y la bonificación es 180. En total cobras 2180.",
  ],
  faq: [
    {
      pregunta: "¿Cuál es el salario mínimo de la zona norte?",
      respuesta: "Hoy es {{zz.minimo@norte}}, vigente desde el {{zz.minimo@norte#desde}}.",
    },
    {
      pregunta: "¿Qué pasa si no trabajé el semestre completo?",
      respuesta: "Cobras la parte proporcional a los meses que trabajaste.",
    },
    {
      pregunta: "¿La bonificación se paga siempre?",
      respuesta: "Sí. Es el {{zz.bonificacion}} del bono y la paga la empresa junto con el bono.",
    },
  ],
  glosario: [
    { termino: "Bono semestral", definicion: "Sueldo extra que la ley obliga a pagar en julio y en diciembre." },
    { termino: "Salario mínimo", definicion: "El sueldo más bajo que se puede pagar por una jornada completa en cada zona." },
  ],
});
