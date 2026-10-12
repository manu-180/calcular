import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ve.reposo-pre-y-postnatal",
  h1: "Calculadora de reposo prenatal y postnatal en Venezuela",
  title: "Reposo pre y postnatal en Venezuela: tus fechas",
  description:
    "Calcula cuándo empieza y termina tu descanso de maternidad: {{ve.prenatal-semanas}} semanas antes del parto y {{ve.postnatal-semanas}} después, más la inamovilidad de {{ve.inamovilidad-anios}}.",
  intro: [
    "En Venezuela tienes derecho a un descanso de {{ve.prenatal-semanas}} semanas antes del parto y {{ve.postnatal-semanas}} semanas después, con tu salario y tu puesto protegidos. Si adoptas a un niño o niña menor de tres años, el descanso es de {{ve.adopcion-semanas}} semanas.",
    "Escribe la fecha probable de parto y, si ya nació, la fecha real. Te mostramos cada fecha y hasta cuándo no te pueden despedir.",
  ],
  comoSeCalcula: [
    "Prenatal: empieza {{ve.prenatal-semanas}} semanas antes de la fecha probable de parto.",
    "Si el parto se atrasa, el prenatal se alarga hasta el parto y el postnatal queda entero.",
    "Si el parto se adelanta, los días de prenatal que no usaste se suman al postnatal.",
    "Postnatal: {{ve.postnatal-semanas}} semanas desde el día siguiente al parto.",
    "Inamovilidad: desde el inicio del embarazo hasta {{ve.inamovilidad-anios}} después del parto.",
  ],
  ejemplo: ["Con fecha probable el 1 de diciembre de 2026, el prenatal empieza el 20 de octubre y el postnatal termina el 20 de abril de 2027."],
  faq: [
    {
      pregunta: "¿Cuánto dura el reposo pre y postnatal en Venezuela?",
      respuesta: "{{ve.prenatal-semanas}} semanas antes del parto y {{ve.postnatal-semanas}} después: 26 semanas en total. Un médico puede indicar más tiempo si hay una enfermedad.",
    },
    {
      pregunta: "¿Qué pasa si no uso todo el prenatal?",
      respuesta: "Los días que no usaste, porque el bebé nació antes o porque seguiste trabajando con autorización médica, se suman al postnatal. Los descansos de maternidad no se pueden renunciar.",
    },
    {
      pregunta: "¿Quién me paga durante el reposo?",
      respuesta: "La ley dice que conservas tu trabajo y el pago de tu salario, según las normas de la seguridad social. Pregunta en tu empresa y en el IVSS cómo se reparte ese pago en tu caso.",
    },
    {
      pregunta: "¿Hasta cuándo no me pueden despedir?",
      respuesta: "Tienes inamovilidad desde el inicio del embarazo hasta {{ve.inamovilidad-anios}} después del parto. Para despedirte, la empresa necesita autorización de la Inspectoría del Trabajo.",
    },
    {
      pregunta: "¿Puedo sumar mis vacaciones al postnatal?",
      respuesta: "Sí. Si las pides justo al terminar el postnatal, la empresa te las tiene que dar.",
    },
  ],
  glosario: [
    { termino: "Prenatal", definicion: "Descanso antes del parto (art. 336 de la LOTTT)." },
    { termino: "Postnatal", definicion: "Descanso después del parto." },
    { termino: "Inamovilidad", definicion: "Protección que impide despedirte, trasladarte o desmejorarte sin autorización de la Inspectoría del Trabajo." },
  ],
});
