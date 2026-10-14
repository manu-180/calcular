import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "es.horas-extra",
  h1: "Calculadora de horas extra",
  title: "Horas extra: cuánto te tienen que pagar por hora",
  description:
    "Calcula el precio de tu hora normal y de tus horas extraordinarias según tu sueldo, tu jornada anual y el recargo de tu convenio. Con el límite legal anual.",
  intro: [
    "Las horas extraordinarias son las que trabajas por encima de tu jornada. Se pagan o se compensan con descanso, según tu convenio o tu contrato.",
    "Si se pagan, nunca pueden valer menos que una hora normal. Aquí calculas cuánto vale cada una.",
  ],
  comoSeCalcula: [
    "Divide tu sueldo bruto anual entre las horas que trabajas al año según tu convenio. Eso es tu hora normal.",
    "Súmale el recargo de tu convenio, si tiene. Sin recargo, la hora extra vale lo mismo que la normal.",
    "Multiplica por las horas extra realizadas. Al año no pueden pasar de {{es.horas-extra-maximo}}, salvo las compensadas con descanso.",
  ],
  ejemplo: ["Con 25.000 euros al año y 1.792 horas de jornada, la hora normal sale a 13,95 euros. Con un recargo del 25 %, cada hora extra vale 17,44 euros."],
  faq: [
    {
      pregunta: "¿Cuántas horas extra se pueden hacer al año?",
      respuesta: "Como máximo {{es.horas-extra-maximo}}. No cuentan las que se compensan con descanso en los cuatro meses siguientes ni las hechas para reparar siniestros.",
    },
    {
      pregunta: "¿Estoy obligado a hacer horas extra?",
      respuesta: "No, salvo que lo diga tu convenio o tu contrato, y siempre dentro del límite legal.",
    },
    {
      pregunta: "¿Qué pasa si mi contrato no dice nada?",
      respuesta: "Si no hay pacto, las horas extra se compensan con descanso dentro de los cuatro meses siguientes.",
    },
  ],
  glosario: [
    { termino: "Hora extraordinaria", definicion: "Hora trabajada por encima de la jornada ordinaria pactada." },
    { termino: "Jornada anual", definicion: "Horas de trabajo efectivo al año que fija tu convenio." },
  ],
});
