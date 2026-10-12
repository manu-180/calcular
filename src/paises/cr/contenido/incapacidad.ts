import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "cr.incapacidad",
  h1: "Calculadora de incapacidad de la CCSS",
  title: "Incapacidad CCSS 2026: cuánto paga la Caja por enfermedad",
  description:
    "Calcule el subsidio por incapacidad de la CCSS: el porcentaje de su salario que paga la Caja, desde qué día y cuánto recibe en total.",
  intro: [
    "Cuando la Caja lo incapacita por enfermedad, le paga un subsidio en lugar del salario. Es el 60 % de su salario promedio, desde el cuarto día.",
    "Escriba su salario promedio y los días de incapacidad para ver cuánto le paga la CCSS.",
  ],
  comoSeCalcula: [
    "Porcentaje: {{cr.subsidio-veces-aporte}} veces el aporte total al Seguro de Salud ({{cr.ccss-sem-trabajador}} del trabajador, {{cr.ccss-sem-patrono}} del patrono y {{cr.ccss-sem-estado}} del Estado).",
    "Salario diario: el promedio de los últimos 12 salarios reportados, entre {{cr.dias-mes-planilla}}.",
    "La Caja paga desde el día {{cr.subsidio-dia-inicio}} de la incapacidad. Si es una prórroga dentro de 30 días, desde el primero.",
    "Subsidio total: el subsidio diario por los días que paga la Caja.",
  ],
  ejemplo: ["Con un salario promedio de ₡600.000 y 10 días de incapacidad, la Caja paga 7 días a ₡12.000: ₡84.000."],
  faq: [
    {
      pregunta: "¿Cuánto paga la CCSS en una incapacidad?",
      respuesta: "El 60 % del salario promedio de los últimos 12 meses, por cada día desde el cuarto día de incapacidad.",
    },
    {
      pregunta: "¿Quién paga los primeros tres días?",
      respuesta: "La Caja no los paga. Si la incapacidad es una prórroga de otra que terminó hace 30 días o menos, la Caja paga desde el primer día.",
    },
    {
      pregunta: "¿Qué requisitos hay para cobrar el subsidio?",
      respuesta: "Haber cotizado el mes anterior y tener 6 cuotas mensuales en los 12 meses antes de la incapacidad. Con menos cuotas puede recibir una ayuda económica.",
    },
    {
      pregunta: "¿Y si el accidente fue en el trabajo?",
      respuesta: "Ese caso lo paga el INS con la póliza de riesgos del trabajo, con otras reglas. Use la calculadora de riesgos del trabajo.",
    },
  ],
  glosario: [
    { termino: "Subsidio", definicion: "El dinero que paga la Caja mientras usted está incapacitado." },
    { termino: "Prórroga", definicion: "Una incapacidad nueva que sigue a otra, por la misma u otra enfermedad." },
  ],
});
