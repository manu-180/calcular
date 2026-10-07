import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "cr.horas-extra",
  h1: "Calculadora de horas extra en Costa Rica",
  title: "Horas extra en Costa Rica: calcule el tiempo y medio",
  description:
    "Calcule el pago de sus horas extra con el recargo del {{cr.recargo-horas-extra}} del artículo 139 del Código de Trabajo, en jornada diurna, mixta o nocturna.",
  intro: [
    "Las horas extra son las que se trabajan después de la jornada ordinaria. Se pagan a tiempo y medio: un {{cr.recargo-horas-extra}} más que la hora normal.",
    "Escriba su salario, su jornada y las horas extra. Le mostramos el valor de cada hora y el total.",
  ],
  comoSeCalcula: [
    "Salario diario: salario mensual entre {{cr.dias-mes-planilla}}.",
    "Hora ordinaria: salario diario entre las horas de su jornada ({{cr.jornada-diaria[diurna]}} en la diurna, {{cr.jornada-diaria[mixta]}} en la mixta y {{cr.jornada-diaria[nocturna]}} en la nocturna).",
    "Hora extra: la hora ordinaria más el {{cr.recargo-horas-extra}}.",
  ],
  ejemplo: ["Con ₡600.000 al mes en jornada diurna, la hora vale ₡2.500 y la hora extra ₡3.750. Diez horas extra suman ₡37.500."],
  faq: [
    {
      pregunta: "¿Cuántas horas extra puedo trabajar al día?",
      respuesta: "La jornada ordinaria más las extra no puede pasar de 12 horas por día, salvo emergencias.",
    },
    {
      pregunta: "¿Las horas extra cuentan para el aguinaldo?",
      respuesta: "Sí. Son salario extraordinario y entran en el cálculo del aguinaldo y de la liquidación.",
    },
    {
      pregunta: "¿Hay casos en que no se pagan como extra?",
      respuesta: "Sí: las horas que se usan para corregir errores propios cometidos en la jornada, y algunas labores agrícolas o ganaderas voluntarias en horario diurno.",
    },
  ],
  glosario: [
    { termino: "Jornada extraordinaria", definicion: "El trabajo que pasa del límite de la jornada ordinaria." },
    { termino: "Jornada mixta", definicion: "La que combina horas de día y de noche. Dura hasta 7 horas." },
  ],
});
