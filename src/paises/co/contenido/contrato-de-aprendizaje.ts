import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "co.contrato-de-aprendizaje",
  h1: "Calculadora del apoyo de sostenimiento del aprendiz",
  title: "Apoyo de sostenimiento del aprendiz SENA 2026",
  description:
    "Calcula el apoyo de sostenimiento mínimo de un aprendiz: {{co.aprendiz-sostenimiento[lectiva]}} del salario mínimo en la etapa lectiva y {{co.aprendiz-sostenimiento[practica]}} en la práctica.",
  intro: [
    "Con la reforma laboral, el contrato de aprendizaje es un contrato laboral especial a término fijo. El aprendiz recibe un apoyo de sostenimiento mensual durante todo el contrato.",
    "El valor mínimo depende de la etapa: lectiva o práctica. Si el aprendiz es universitario, nunca recibe menos de un salario mínimo.",
  ],
  comoSeCalcula: [
    "Etapa lectiva (o primer año de formación dual): {{co.aprendiz-sostenimiento[lectiva]}} del salario mínimo.",
    "Etapa práctica (o segundo año de formación dual): {{co.aprendiz-sostenimiento[practica]}} del salario mínimo.",
    "Estudiante universitario: {{co.aprendiz-sostenimiento[universitario]}} del salario mínimo como mínimo.",
    "El salario mínimo de hoy es {{co.smmlv}}.",
  ],
  ejemplo: ["En 2026, un aprendiz en etapa lectiva recibe al menos $1.313.179 al mes. En la etapa práctica, $1.750.905."],
  faq: [
    {
      pregunta: "¿Cuánto gana un aprendiz SENA en 2026?",
      respuesta: "En la etapa lectiva, al menos el {{co.aprendiz-sostenimiento[lectiva]}} del salario mínimo. En la práctica, el {{co.aprendiz-sostenimiento[practica]}}.",
    },
    {
      pregunta: "¿El contrato de aprendizaje es un contrato laboral?",
      respuesta: "Sí. Desde la Ley 2466 de 2025 es un contrato laboral especial y a término fijo, de hasta tres años.",
    },
    {
      pregunta: "¿Se puede pactar un apoyo menor en una convención colectiva?",
      respuesta: "No. La ley prohíbe regular el apoyo de sostenimiento por convenios, contratos colectivos o fallos arbitrales.",
    },
  ],
  glosario: [
    { termino: "Apoyo de sostenimiento", definicion: "El pago mensual que recibe el aprendiz durante el contrato." },
    { termino: "Formación dual", definicion: "Formación que combina estudio y trabajo en la empresa desde el inicio." },
  ],
});
