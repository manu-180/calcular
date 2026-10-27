import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "cr.trabajo-domestico",
  h1: "Salario de trabajo doméstico en Costa Rica",
  title: "Salario mínimo de trabajo doméstico {{anio}} en Costa Rica",
  description:
    "Calcule el salario mínimo de una persona trabajadora doméstica según sus horas: {{cr.salario-minimo-mes[trabajo-domestico]}} por jornada completa, valor por día y hora, y rebajos de la Caja.",
  intro: [
    "El salario mínimo del trabajo doméstico en 2026 es {{cr.salario-minimo-mes[trabajo-domestico]}} al mes por jornada completa. Si trabaja menos horas, el mínimo es proporcional.",
    "Escriba las horas por semana y le mostramos el mínimo por mes, por día y por hora, y lo que se rebaja para la Caja.",
  ],
  comoSeCalcula: [
    "Jornada completa: {{cr.jornada-diaria[diurna]}} por día y 48 horas por semana.",
    "Mínimo proporcional: el mínimo mensual por las horas que trabaja, dividido entre 48.",
    "Por día: el mínimo mensual entre {{cr.dias-mes-planilla}}. Por hora: el diario entre {{cr.jornada-diaria[diurna]}}.",
    "Rebajos: {{cr.ccss-sem-trabajador}} de salud, {{cr.ccss-ivm-trabajador}} de IVM y {{cr.banco-popular-trabajador}} de Banco Popular.",
  ],
  ejemplo: ["Una persona que trabaja 20 horas por semana debe ganar al menos ₡111.971,38 al mes."],
  faq: [
    {
      pregunta: "¿Cuánto es el salario mínimo de una empleada doméstica en 2026?",
      respuesta: "{{cr.salario-minimo-mes[trabajo-domestico]}} al mes por jornada completa de 48 horas por semana.",
    },
    {
      pregunta: "¿La comida y el cuarto cuentan como parte del salario?",
      respuesta: "Cuentan como salario en especie para el aguinaldo y las prestaciones, pero no para llegar al salario mínimo. El mínimo se paga en efectivo.",
    },
    {
      pregunta: "¿Cuántas vacaciones tiene?",
      respuesta: "{{cr.vacaciones-domestico}} al año, pagados. Si trabaja por horas o por días, en proporción.",
    },
    {
      pregunta: "¿Hay que asegurarla en la Caja?",
      respuesta: "Sí. La persona empleadora debe inscribirla en la CCSS dentro de los ocho días hábiles desde que empieza y darle la póliza de riesgos del trabajo.",
    },
  ],
  glosario: [
    { termino: "Salario en especie", definicion: "Lo que se paga con alojamiento, comida u otros bienes en lugar de dinero." },
    { termino: "Persona empleadora", definicion: "Quien contrata el trabajo doméstico en su casa." },
  ],
});
