import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "mx.sueldo-bruto",
  h1: "Calculadora de sueldo bruto a partir del neto {{anio}}",
  title: "Sueldo neto a bruto {{anio}}: cuánto pedir para cobrar X",
  description:
    "Escribe cuánto quieres recibir libre y te decimos el sueldo bruto que hay que pactar, con ISR, subsidio para el empleo y cuotas del IMSS de {{anio}}.",
  intro: [
    "En una entrevista o una oferta casi siempre se habla de sueldo bruto, pero lo que te importa es lo que llega a tu cuenta. Esta calculadora hace la cuenta al revés: del neto que quieres al bruto que tienes que pedir.",
    "Usa las mismas tarifas del ISR, el subsidio para el empleo y las cuotas obreras del IMSS que la calculadora de sueldo neto.",
  ],
  comoSeCalcula: [
    "Probamos sueldos brutos hasta encontrar el más bajo que, después de impuestos, deja el neto que pediste.",
    "Para cada bruto se resta el ISR de la tarifa del periodo, menos el subsidio para el empleo si corresponde (hasta {{mx.subsidio-empleo-limite}} al mes).",
    "También se restan las cuotas obreras del IMSS, con un salario base de cotización estimado con las prestaciones de ley.",
  ],
  ejemplo: ["Para recibir 8,525.67 pesos a la quincena, el sueldo bruto tiene que ser de 10,000 pesos quincenales."],
  faq: [
    {
      pregunta: "¿Qué es más alto, el sueldo bruto o el neto?",
      respuesta: "El bruto. Es lo que se pacta antes de descontar el ISR y las cuotas del IMSS. El neto es lo que recibes.",
    },
    {
      pregunta: "¿Por qué a veces un bruto un poco mayor deja menos neto?",
      respuesta: "Pasa justo arriba de {{mx.subsidio-empleo-limite}} al mes: ahí se pierde el subsidio para el empleo y el ISR sube de golpe. La calculadora te da el bruto más bajo que alcanza tu neto.",
    },
    {
      pregunta: "¿Incluye otros descuentos como Infonavit o Fonacot?",
      respuesta: "No. Solo ISR y cuotas del IMSS. Si tienes un crédito, el descuento se resta aparte.",
    },
  ],
  glosario: [
    { termino: "Sueldo bruto", definicion: "Sueldo antes de impuestos y descuentos." },
    { termino: "Sueldo neto", definicion: "Lo que recibes después del ISR y las cuotas del IMSS." },
  ],
});
