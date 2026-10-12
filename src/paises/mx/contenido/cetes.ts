import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "mx.cetes",
  h1: "Calculadora de CETES 2026",
  title: "Calculadora de CETES: cuánto ganas a 28, 91 y 364 días",
  description:
    "Calcula cuánto ganas invirtiendo en CETES con la tasa de la última subasta de Banxico, a 28, 91, 182 o 364 días, ya con la retención de ISR de 2026.",
  intro: [
    "Los CETES son bonos del Gobierno de México que puedes comprar en línea en Cetesdirecto. Son de los instrumentos más seguros del país y su tasa sale de la subasta semanal del Banco de México.",
    "Escribe cuánto quieres invertir y el plazo. Usamos la tasa de la subasta más reciente, que se actualiza sola cada semana.",
  ],
  comoSeCalcula: [
    "Rendimiento bruto: monto por la tasa anual de la subasta, por los días del plazo, entre 360.",
    "ISR: el banco retiene {{mx.retencion-isr-intereses}} anual sobre el monto invertido, en proporción a los días.",
    "Ganancia neta: rendimiento bruto menos el ISR retenido.",
  ],
  ejemplo: ["Con 10,000 pesos a 28 días y una tasa de 6.09 %, el rendimiento bruto es de 47.37 pesos, te retienen 6.90 de ISR y ganas 40.47."],
  faq: [
    {
      pregunta: "¿Cuánto gano con 10,000 pesos en CETES?",
      respuesta: "Depende de la tasa de la semana y del plazo. Con la calculadora lo ves con la última subasta: a 28 días suele ser una ganancia de pocas decenas de pesos.",
    },
    {
      pregunta: "¿Los CETES pagan impuestos?",
      respuesta: "Sí. En 2026 se retiene {{mx.retencion-isr-intereses}} anual sobre el capital, prorrateado por los días que dura tu inversión. Esa retención se acredita en tu declaración anual.",
    },
    {
      pregunta: "¿Qué plazo me conviene?",
      respuesta: "Depende de cuándo vas a necesitar el dinero. Los plazos largos suelen pagar una tasa mayor, pero el dinero queda invertido más tiempo; a 28 días puedes reinvertir cada mes.",
    },
    {
      pregunta: "¿Cada cuándo cambia la tasa?",
      respuesta: "Cada semana, en la subasta que organiza el Banco de México. CETES a 364 días se subasta cada dos semanas.",
    },
  ],
  glosario: [
    { termino: "CETES", definicion: "Certificados de la Tesorería de la Federación: deuda de corto plazo del Gobierno de México." },
    { termino: "Subasta", definicion: "Venta semanal de CETES que organiza el Banco de México; de ahí sale la tasa." },
  ],
});
