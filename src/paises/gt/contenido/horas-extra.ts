import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "gt.horas-extra",
  h1: "Calculadora de horas extra en Guatemala",
  title: "Horas extra en Guatemala: cuánto se pagan",
  description:
    "Calcule el pago de sus horas extra con el recargo mínimo del {{gt.recargo-horas-extra}} sobre la hora ordinaria, en jornada diurna, mixta o nocturna.",
  intro: [
    "Las horas que trabaja después de su jornada ordinaria son horas extra (en la ley, jornada extraordinaria). Se pagan por lo menos con un {{gt.recargo-horas-extra}} más que la hora normal.",
    "Entre la jornada ordinaria y las extra no se pueden pasar de {{gt.tope-horas-diarias}} por día, salvo casos muy especiales.",
  ],
  comoSeCalcula: [
    "Hora ordinaria = salario mensual / 30 / horas de su jornada.",
    "La jornada diurna es de {{gt.jornada-horas[diurna]}}, la mixta de {{gt.jornada-horas[mixta]}} y la nocturna de {{gt.jornada-horas[nocturna]}}.",
    "Hora extra = hora ordinaria + {{gt.recargo-horas-extra}}.",
    "Pago = hora extra × horas extra trabajadas.",
  ],
  ejemplo: ["Gana Q4,800 en jornada diurna. La hora ordinaria vale 4,800 / 30 / 8 = Q20 y la extra, Q30. Por 10 horas extra le pagan Q300."],
  faq: [
    {
      pregunta: "¿Cuánto se paga la hora extra en Guatemala?",
      respuesta: "Por lo menos un {{gt.recargo-horas-extra}} más que la hora ordinaria. Si su contrato fija un recargo mayor, vale ese.",
    },
    {
      pregunta: "¿Cuántas horas extra puedo trabajar por día?",
      respuesta: "La jornada ordinaria más las extra no pueden pasar de {{gt.tope-horas-diarias}} por día. La calculadora le muestra cuántas horas extra le quedan según su jornada.",
    },
    {
      pregunta: "¿Todas las horas de más se pagan como extra?",
      respuesta: "No se pagan como extra las que usa para corregir errores que solo usted cometió, ni las que se deben a su falta de trabajo durante la jornada.",
    },
  ],
  glosario: [
    { termino: "Jornada ordinaria", definicion: "Las horas normales de trabajo: diurna, mixta o nocturna según el horario." },
    { termino: "Jornada extraordinaria", definicion: "El trabajo fuera de la jornada ordinaria. Es el nombre legal de las horas extra." },
  ],
});
