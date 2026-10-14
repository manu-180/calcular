import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "es.salario-minimo",
  h1: "Salario mínimo interprofesional 2026",
  title: "SMI 2026: salario mínimo al mes, al día y a media jornada",
  description:
    "El salario mínimo de 2026 es de {{es.smi-mensual}} al mes en 14 pagas. Calcula cuánto te corresponde según tus horas, al mes, al año y al día.",
  intro: [
    "El salario mínimo interprofesional (SMI) es lo menos que puede cobrar cualquier persona que trabaja por cuenta ajena en España, sea cual sea su sector, edad o tipo de contrato.",
    "Para 2026 es de {{es.smi-mensual}} al mes en 14 pagas, o {{es.smi-anual}} al año. Rige desde el {{es.smi-mensual#desde}}.",
  ],
  comoSeCalcula: [
    "Con jornada completa ({{es.jornada-maxima-semanal}} semanales) el mínimo es {{es.smi-mensual}} al mes en 14 pagas, {{es.smi-diario}} al día y {{es.smi-anual}} al año.",
    "Si trabajas menos horas, se cobra a prorrata: tus horas semanales entre las de la jornada completa, por el salario mínimo.",
    "Si cobras las pagas extra prorrateadas, divide el mínimo anual entre 12.",
  ],
  ejemplo: ["Con un contrato de 20 horas semanales te corresponden al menos 610,50 euros al mes en 14 pagas, o 712,25 euros al mes con las pagas prorrateadas."],
  faq: [
    {
      pregunta: "¿Cuál es el salario mínimo en 2026?",
      respuesta: "{{es.smi-mensual}} al mes en 14 pagas, que son {{es.smi-anual}} al año. Lo fija el Real Decreto 126/2026.",
    },
    {
      pregunta: "¿Cuánto es el SMI en 12 pagas?",
      respuesta: "Si tienes las pagas extra prorrateadas, el mínimo anual repartido en 12 meses da 1.424,50 euros al mes.",
    },
    {
      pregunta: "¿Cuánto cobra por hora una empleada de hogar?",
      respuesta: "Si trabaja por horas en régimen externo, al menos {{es.smi-hora-hogar}} por hora efectivamente trabajada.",
    },
    {
      pregunta: "¿Se paga IRPF con el salario mínimo?",
      respuesta: "Puede haber una pequeña retención si no tienes hijos. Es un pago a cuenta que se ajusta después en la declaración de la renta.",
    },
  ],
  glosario: [
    { termino: "SMI", definicion: "Salario mínimo interprofesional, que fija el Gobierno cada año por real decreto." },
    { termino: "A prorrata", definicion: "En proporción. Con media jornada, la mitad del mínimo." },
  ],
});
