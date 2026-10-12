import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "do.propina-legal",
  h1: "Calculadora de ITBIS y propina legal en restaurantes",
  title: "Propina legal y ITBIS en RD: calcula tu cuenta",
  description: "Calcula la cuenta de un restaurante en RD: consumo, ITBIS de {{do.itbis}} y propina legal de {{do.propina-legal}}. También desglosa un total que ya tienes.",
  intro: [
    "En restaurantes, bares, cafés y hoteles la cuenta lleva el ITBIS de {{do.itbis}} y una propina legal de {{do.propina-legal}} que va para el personal.",
    "Pon el consumo para saber el total, o el total para ver cuánto es cada parte.",
  ],
  comoSeCalcula: [
    "ITBIS: {{do.itbis}} del consumo.",
    "Propina legal: {{do.propina-legal}} del consumo.",
    "Total: consumo más ITBIS más propina.",
    "Si partes del total, el consumo es el total dividido entre 1 más las dos tasas.",
  ],
  ejemplo: [
    "Un consumo de RD$1,000 lleva RD$180 de ITBIS y RD$100 de propina legal. La cuenta es de RD$1,280.",
  ],
  faq: [
    { pregunta: "¿La propina del 10 % es obligatoria?", respuesta: "Sí. El Código de Trabajo obliga a hoteles, restaurantes, cafés y bares a agregarla a la cuenta y repartirla entre el personal." },
    { pregunta: "¿La propina se calcula con el ITBIS incluido?", respuesta: "En la factura suele calcularse sobre el consumo, sin el ITBIS." },
    { pregunta: "¿Tengo que dejar algo más?", respuesta: "No. Lo que dejes aparte del {{do.propina-legal}} es voluntario." },
  ],
  glosario: [
    { termino: "ITBIS", definicion: "Impuesto sobre la transferencia de bienes y servicios: el impuesto al consumo de República Dominicana." },
    { termino: "Propina legal", definicion: "El {{do.propina-legal}} obligatorio que se reparte entre los trabajadores." },
  ],
});
