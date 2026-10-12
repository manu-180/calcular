import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "do.asistencia-economica",
  h1: "Calculadora de asistencia económica en República Dominicana",
  title: "Asistencia económica en RD: calcula cuánto corresponde",
  description: "Calcula la asistencia económica del artículo 82 cuando el contrato termina por muerte, incapacidad o enfermedad del trabajador, o por cierre de la empresa.",
  intro: [
    "La asistencia económica es un pago que corresponde cuando el contrato termina sin culpa de nadie: muerte o incapacidad del trabajador, enfermedad larga, muerte del empleador con cierre del negocio o quiebra.",
    "Si el trabajador murió, la cobra la persona que él designó o, si no designó a nadie, su familia.",
  ],
  comoSeCalcula: [
    "De 3 a 6 meses de trabajo: {{do.asistencia-economica-dias[tres-a-seis-meses]}} de salario.",
    "De 6 meses a un año: {{do.asistencia-economica-dias[seis-a-doce-meses]}}.",
    "Después del primer año: {{do.asistencia-economica-dias[por-anio]}} por cada año trabajado.",
    "El salario diario es el promedio mensual del último año entre {{do.divisor-salario-diario}}.",
  ],
  ejemplo: [
    "Con 5 años de trabajo y un promedio de RD$40,000 al mes, la asistencia económica es de 75 días: RD$125,892.",
  ],
  faq: [
    { pregunta: "¿Quién cobra la asistencia económica si el trabajador muere?", respuesta: "La persona que el trabajador designó ante Trabajo o un notario. Si no designó a nadie, el cónyuge y los hijos menores en partes iguales; después, los padres mayores de 60 años y, por último, los herederos." },
    { pregunta: "¿La asistencia económica paga ISR?", respuesta: "No. Está entre las rentas que no pagan impuesto sobre la renta, igual que el preaviso y la cesantía." },
    { pregunta: "¿Se suman vacaciones y regalía?", respuesta: "Sí. Las vacaciones no tomadas y la regalía proporcional se pagan aparte." },
  ],
  glosario: [
    { termino: "Asistencia económica", definicion: "Pago por el tiempo trabajado cuando el contrato termina por causas ajenas a las partes." },
    { termino: "Incapacidad", definicion: "Cuando la persona ya no puede hacer el trabajo para el que fue contratada." },
  ],
});
