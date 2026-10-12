import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ni.renuncia",
  h1: "Calculadora de renuncia y preaviso en Nicaragua",
  title: "Renuncia en Nicaragua: calculá tu último día con preaviso",
  description: "Si renunciás en Nicaragua tenés que avisar por escrito con {{ni.preaviso-renuncia}} de anticipación. Calculá qué día termina tu contrato y qué te tienen que pagar.",
  intro: [
    "Para renunciar a un contrato por tiempo indeterminado tenés que avisar al empleador por escrito con {{ni.preaviso-renuncia}} de anticipación.",
    "Poné el día en que entregás la carta y te decimos qué día termina el contrato.",
  ],
  comoSeCalcula: [
    "Se suman {{ni.preaviso-renuncia}} al día en que entregás la carta de renuncia.",
    "Ese es el día en que termina el contrato. Hasta entonces seguís trabajando y cobrando tu salario.",
  ],
  ejemplo: ["Si entregás la carta el 1 de octubre de 2026, el contrato termina el 16 de octubre de 2026."],
  faq: [
    {
      pregunta: "¿Con cuánta anticipación tengo que avisar mi renuncia?",
      respuesta: "Con {{ni.preaviso-renuncia}}, por escrito. Lo dice el artículo 44 del Código del Trabajo para los contratos por tiempo indeterminado.",
    },
    {
      pregunta: "¿Qué me pagan si renuncio?",
      respuesta: "El salario de los días trabajados, el aguinaldo y las vacaciones proporcionales, y lo que ganaste por antigüedad. Podés calcularlo con la calculadora de liquidación.",
    },
    {
      pregunta: "¿Pierdo la indemnización por antigüedad si renuncio?",
      respuesta: "No. La renuncia o el mutuo acuerdo no te quitan lo ganado por antigüedad (artículo 43).",
    },
    {
      pregunta: "¿Cómo aviso si trabajo en el campo?",
      respuesta: "Podés avisar de palabra al empleador, frente a dos testigos.",
    },
  ],
  glosario: [
    { termino: "Preaviso", definicion: "El aviso que das antes de dejar el trabajo, para que el empleador se organice." },
    { termino: "Carta de renuncia", definicion: "El escrito en el que avisás que dejás el trabajo. Guardá una copia firmada de recibido." },
  ],
});
