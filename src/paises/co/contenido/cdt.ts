import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "co.cdt",
  h1: "Simulador de CDT",
  title: "Simulador de CDT 2026: cuánto te da tu inversión",
  description:
    "Calcula cuánto ganas en un CDT con la tasa efectiva anual que te ofrece el banco, menos la retención en la fuente del {{co.cdt-retencion}} sobre los intereses.",
  intro: [
    "Un CDT es un ahorro a plazo fijo: le prestas tu plata al banco por un tiempo y al final te la devuelve con intereses.",
    "Escribe cuánto vas a invertir, la tasa efectiva anual (E.A.) y el plazo. Te mostramos los intereses, la retención en la fuente y lo que recibes al final.",
  ],
  comoSeCalcula: [
    "Intereses: capital × ((1 + tasa E.A.) elevado a (días / 365) − 1).",
    "Retención en la fuente: {{co.cdt-retencion}} de los intereses.",
    "Al vencimiento recibes el capital más los intereses, menos la retención.",
  ],
  ejemplo: [
    "Si inviertes $10.000.000 al 10 % E.A. por 360 días, ganas $985.648 de intereses. Te retienen $39.426 y al final recibes $10.946.222.",
  ],
  faq: [
    {
      pregunta: "¿Cuánta retención le cobran a un CDT?",
      respuesta: "El {{co.cdt-retencion}} de los intereses, no del capital. Es un anticipo del impuesto de renta que puedes descontar en tu declaración.",
    },
    {
      pregunta: "¿Qué significa tasa efectiva anual?",
      respuesta: "Es lo que ganarías en un año con los intereses capitalizados. Sirve para comparar CDT de distintos bancos y plazos.",
    },
    {
      pregunta: "¿Este simulador sirve para cualquier banco?",
      respuesta: "Sí, si usas la tasa E.A. que te ofrece el banco. Algunos bancos calculan con años de 360 días, así que el resultado puede variar unos pesos.",
    },
  ],
  glosario: [
    { termino: "CDT", definicion: "Certificado de depósito a término: una inversión a plazo fijo en un banco." },
    { termino: "E.A.", definicion: "Efectiva anual: la tasa que ganas en un año con los intereses sumados." },
  ],
});
