import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "do.retencion-alquileres",
  h1: "Calculadora de retención de ISR a alquileres",
  title: "Retención por alquiler en RD 2026: el {{do.retencion-alquileres}}",
  description: "Calcula la retención de ISR del {{do.retencion-alquileres}} sobre alquileres que una empresa paga a una persona física. Desde julio de 2026 es pago definitivo.",
  intro: [
    "Si una empresa te alquila un local, una casa o un bien, te retiene una parte del alquiler para el ISR. Desde el 1 de julio de 2026 es el {{do.retencion-alquileres}}.",
    "Desde esa fecha la retención es definitiva: ese alquiler ya no paga más ISR.",
  ],
  comoSeCalcula: [
    "La retención es el {{do.retencion-alquileres}} del alquiler, sin el ITBIS.",
    "El dueño recibe el alquiler menos la retención.",
    "La empresa la declara y la paga a la DGII.",
  ],
  ejemplo: [
    "Por un alquiler de RD$25,000 al mes, la empresa retiene RD$3,750 y el dueño recibe RD$21,250. En el año son RD$45,000 de retención.",
  ],
  faq: [
    { pregunta: "¿Cuánto se retiene por alquileres en 2026?", respuesta: "El {{do.retencion-alquileres}} desde el 1 de julio de 2026. Antes era 10 %." },
    { pregunta: "¿Tengo que declarar ese alquiler en el IR-1?", respuesta: "Desde julio de 2026 la retención es pago único y definitivo, así que ese alquiler ya pagó su ISR." },
    { pregunta: "¿Si le alquilo a una persona, hay retención?", respuesta: "No. Solo retienen las empresas y los negocios de único dueño." },
  ],
  glosario: [
    { termino: "Pago definitivo", definicion: "Impuesto que ya no se vuelve a calcular en la declaración anual." },
    { termino: "Retención", definicion: "Parte del pago que el pagador entrega a la DGII a nombre del dueño." },
  ],
});
