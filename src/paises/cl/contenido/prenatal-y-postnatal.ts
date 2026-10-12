import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "cl.prenatal-y-postnatal",
  h1: "Calculadora de prenatal y postnatal",
  title: "Prenatal y postnatal: calcula las fechas de tu permiso",
  description:
    "Calcula cuándo empieza tu prenatal ({{cl.prenatal-dias}} antes del parto), cuándo termina el postnatal ({{cl.postnatal-dias}}) y el postnatal parental, completo o a media jornada.",
  intro: [
    "Con tu fecha probable de parto te decimos cuándo empieza el prenatal, cuándo termina el postnatal y hasta cuándo dura el postnatal parental.",
    "Si tu bebé ya nació, agrega la fecha real: el postnatal se cuenta desde ese día.",
  ],
  comoSeCalcula: [
    "Prenatal: {{cl.prenatal-dias}} (seis semanas) antes de la fecha probable de parto.",
    "Postnatal: {{cl.postnatal-dias}} (doce semanas) desde el parto. Si el bebé nace antes de la semana 33 o pesa menos de 1.500 gramos, son {{cl.postnatal-prematuro-dias}}. En partos múltiples se suman {{cl.postnatal-dias-por-hijo-adicional}} por cada bebé desde el segundo.",
    "Postnatal parental: {{cl.postnatal-parental-dias}} a jornada completa, o {{cl.postnatal-parental-parcial-dias}} si vuelves a trabajar media jornada. Empieza al día siguiente del postnatal.",
  ],
  ejemplo: [
    "Si tu fecha probable de parto es el 15 de diciembre de 2026, el prenatal empieza el 3 de noviembre, el postnatal termina el 8 de marzo de 2027 y el postnatal parental completo termina el 31 de mayo de 2027.",
  ],
  faq: [
    {
      pregunta: "¿Cuánto dura el prenatal y el postnatal en Chile?",
      respuesta: "El prenatal dura seis semanas antes del parto y el postnatal doce semanas después. Luego viene el postnatal parental de doce semanas, o dieciocho a media jornada.",
    },
    {
      pregunta: "¿Qué pasa si el bebé nace después de la fecha probable?",
      respuesta: "El prenatal se alarga hasta el día del parto, y el postnatal completo se cuenta desde ese día.",
    },
    {
      pregunta: "¿Cómo elijo el postnatal parental a media jornada?",
      respuesta: "Avisas a tu empleador por carta certificada al menos 30 días antes de que termine el postnatal, con copia a la Inspección del Trabajo. Si no avisas, se toma a jornada completa.",
    },
    {
      pregunta: "¿Quién paga durante el permiso?",
      respuesta: "Recibes un subsidio que paga Fonasa o tu Isapre (o la caja de compensación), con tope. A media jornada recibes la mitad del subsidio y al menos la mitad de tu sueldo fijo.",
    },
    {
      pregunta: "¿El padre puede tomar parte del postnatal parental?",
      respuesta: "Sí. La madre puede traspasarle semanas del postnatal parental, desde la séptima semana. El padre además tiene cinco días pagados por el nacimiento.",
    },
  ],
  glosario: [
    { termino: "Fecha probable de parto", definicion: "Fecha estimada del nacimiento que fija tu médico o matrona." },
    { termino: "Postnatal parental", definicion: "Permiso que sigue al postnatal, a jornada completa o a media jornada." },
  ],
});
