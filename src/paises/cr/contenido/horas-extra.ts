import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "cr.horas-extra",
  h1: "Cálculo de horas extra en Costa Rica",
  title: "Cálculo de horas extra en Costa Rica: tiempo y medio",
  description:
    "Calcule cuánto vale su hora extra: la hora ordinaria más el {{cr.recargo-horas-extra}} (tiempo y medio), en jornada diurna, mixta o nocturna. Vea el total al instante.",
  intro: [
    "En Costa Rica las horas extra se pagan a tiempo y medio: la hora ordinaria más un {{cr.recargo-horas-extra}}. Son las que se trabajan después de la jornada ordinaria.",
    "Escriba su salario, su jornada y las horas extra. Le mostramos el valor de la hora normal, de la hora extra y el total a cobrar.",
  ],
  comoSeCalcula: [
    "Salario diario: salario mensual entre {{cr.dias-mes-planilla}}.",
    "Hora ordinaria: salario diario entre las horas de su jornada ({{cr.jornada-diaria[diurna]}} en la diurna, {{cr.jornada-diaria[mixta]}} en la mixta y {{cr.jornada-diaria[nocturna]}} en la nocturna).",
    "Hora extra: la hora ordinaria más el {{cr.recargo-horas-extra}}.",
    "Pago total: el valor de la hora extra por la cantidad de horas extra trabajadas.",
  ],
  ejemplo: ["Con ₡600.000 al mes en jornada diurna, la hora vale ₡2.500 y la hora extra ₡3.750. Diez horas extra suman ₡37.500."],
  faq: [
    {
      pregunta: "¿Cómo se pagan las horas extra en Costa Rica?",
      respuesta: "A tiempo y medio: cada hora extra vale la hora ordinaria más un {{cr.recargo-horas-extra}}, según el artículo 139 del Código de Trabajo.",
    },
    {
      pregunta: "¿Cuántas horas extra puedo trabajar al día?",
      respuesta: "La jornada ordinaria más las extra no puede pasar de 12 horas por día, salvo emergencias.",
    },
    {
      pregunta: "¿Cómo saco el valor de mi hora ordinaria?",
      respuesta: "Divida su salario mensual entre {{cr.dias-mes-planilla}} y el resultado entre las horas de su jornada: {{cr.jornada-diaria[diurna]}} en la diurna, {{cr.jornada-diaria[mixta]}} en la mixta o {{cr.jornada-diaria[nocturna]}} en la nocturna.",
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
    { termino: "Tiempo y medio", definicion: "Forma común de llamar al pago de la hora extra: la hora normal más la mitad." },
    { termino: "Jornada extraordinaria", definicion: "El trabajo que pasa del límite de la jornada ordinaria." },
    { termino: "Jornada mixta", definicion: "La que combina horas de día y de noche. Dura hasta 7 horas." },
  ],
});
