import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "bo.sueldo-por-hora",
  h1: "Calculadora de sueldo por hora y por día",
  title: "Sueldo por hora y por día en Bolivia: calcúlelo",
  description: "Pase su sueldo mensual a salario por día, por semana y por hora, con la jornada legal de {{bo.jornada-horas-dia}} por día o la suya.",
  intro: [
    "Saber cuánto gana por día o por hora sirve para calcular horas extras, recargos, descuentos por faltas o comparar ofertas de trabajo.",
    "Escriba su sueldo mensual. Si trabaja otra cantidad de horas, cámbiela.",
  ],
  comoSeCalcula: [
    "El salario diario es el sueldo mensual dividido 30, como lo calcula el Ministerio de Trabajo.",
    "El salario por hora es el diario dividido por las horas de la jornada: {{bo.jornada-horas-dia}} si no indica otra cosa.",
    "El semanal son 7 días de salario diario.",
  ],
  faq: [
    {
      pregunta: "¿Cuántas horas se trabaja por ley en Bolivia?",
      respuesta: "{{bo.jornada-horas-dia}} por día y 48 por semana. Para mujeres y menores de 18 años, 40 horas semanales diurnas.",
    },
    {
      pregunta: "¿Por qué se divide por 30 y no por los días del mes?",
      respuesta: "Porque así lo hace el Ministerio de Trabajo para el salario diario en vacaciones, aguinaldo y finiquito: el mes laboral se toma de 30 días.",
    },
    {
      pregunta: "¿Cuánto es el salario mínimo por hora?",
      respuesta: "Es el salario mínimo de {{bo.salario-minimo}} dividido 30 y dividido {{bo.jornada-horas-dia}}. Escríbalo arriba y le mostramos el resultado.",
    },
  ],
  glosario: [
    { termino: "Salario diario", definicion: "El sueldo mensual dividido 30." },
    { termino: "Jornada", definicion: "Las horas que trabaja por día a disposición del empleador." },
  ],
});
