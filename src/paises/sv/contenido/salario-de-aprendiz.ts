import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "sv.salario-de-aprendiz",
  h1: "Calculadora de salario mínimo de aprendiz",
  title: "Salario de aprendiz en El Salvador {{anio}}: cuánto le toca",
  description: "Un aprendiz cobra al menos el {{sv.aprendiz-porcentaje[primer-anio]}} del salario mínimo el primer año y el {{sv.aprendiz-porcentaje[segundo-anio]}} el segundo. Calcule su mínimo por sector.",
  intro: [
    "Con un contrato de aprendizaje, el salario puede ser menor que el mínimo los primeros años: al menos el {{sv.aprendiz-porcentaje[primer-anio]}} del mínimo el primer año y el {{sv.aprendiz-porcentaje[segundo-anio]}} el segundo. Desde el tercero se paga el mínimo completo.",
    "Elija el sector de la empresa y el año de aprendizaje.",
  ],
  comoSeCalcula: [
    "Se toma el salario mínimo mensual del sector de la empresa.",
    "Se aplica el porcentaje del año: {{sv.aprendiz-porcentaje[primer-anio]}}, {{sv.aprendiz-porcentaje[segundo-anio]}} o {{sv.aprendiz-porcentaje[tercer-anio]}}.",
  ],
  ejemplo: ["En comercio y servicios, el primer año un aprendiz gana como mínimo $204.40 al mes."],
  faq: [
    {
      pregunta: "¿Cualquier trabajador nuevo puede ser aprendiz?",
      respuesta: "No. El contrato de aprendizaje tiene que ser por escrito, aprobado por el Ministerio de Trabajo e inscrito en su registro. Sin eso, se le debe el salario mínimo completo.",
    },
    {
      pregunta: "¿El aprendiz tiene vacaciones y aguinaldo?",
      respuesta: "Sí. Su jornada, descansos, vacaciones y licencias se rigen por el Código de Trabajo, igual que para los demás trabajadores.",
    },
    {
      pregunta: "¿Pueden poner al aprendiz a hacer cualquier tarea?",
      respuesta: "No. Solo tareas del oficio que aprende y compatibles con su desarrollo físico.",
    },
  ],
  glosario: [{ termino: "Contrato de aprendizaje", definicion: "Acuerdo escrito por el que una empresa enseña un oficio a una persona y le paga una retribución." }],
});
