import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "hn.despido-embarazada",
  h1: "Indemnización por despido de una trabajadora embarazada en Honduras",
  title: "Despido de una embarazada en Honduras: cuánto le deben",
  description: "Calcule la indemnización por despido durante el embarazo o la lactancia: {{hn.despido-embarazada-dias}} de salario más el descanso por maternidad no tomado.",
  intro: [
    "En Honduras no se puede despedir a una trabajadora por estar embarazada o en lactancia. Para despedirla, el patrono necesita una causa justa y la autorización de la Inspección del Trabajo.",
    "Si la despide sin esa autorización, le debe una indemnización especial además de sus prestaciones.",
  ],
  comoSeCalcula: [
    "Salario diario = salario promedio mensual / 30.",
    "Indemnización especial = salario diario × {{hn.despido-embarazada-dias}}.",
    "Si no tomó el descanso por maternidad: se suman {{hn.maternidad-semanas[antes]}} más {{hn.maternidad-semanas[despues]}} semanas de salario.",
  ],
  ejemplo: ["Gana L12,000 y la despiden embarazada sin autorización. Cobra L24,000 de indemnización y L28,000 por el descanso no tomado: L52,000, además de sus prestaciones."],
  faq: [
    {
      pregunta: "¿Pueden despedir a una mujer embarazada en Honduras?",
      respuesta: "Solo por una causa justa y con autorización de la Inspección del Trabajo, o del alcalde donde no haya inspector. Rendir menos por el embarazo no es causa justa.",
    },
    {
      pregunta: "¿Hasta cuándo dura la protección?",
      respuesta: "Durante todo el embarazo y los tres meses después del parto. Si la despiden en ese tiempo sin autorización, se presume que fue por el embarazo.",
    },
    {
      pregunta: "¿Esta indemnización reemplaza a las prestaciones?",
      respuesta: "No. Va aparte del preaviso, la cesantía, las vacaciones y los décimos que le correspondan por el despido.",
    },
  ],
  glosario: [
    { termino: "Fuero de maternidad", definicion: "La protección contra el despido durante el embarazo y la lactancia (artículos 144 y 145 del Código del Trabajo)." },
    { termino: "Inspección del Trabajo", definicion: "La oficina de la Secretaría de Trabajo que autoriza o no el despido de una trabajadora embarazada." },
  ],
});
