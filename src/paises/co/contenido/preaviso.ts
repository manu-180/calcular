import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "co.preaviso",
  h1: "Calculadora de preaviso del contrato a término fijo",
  title: "Preaviso de contrato a término fijo: fecha límite",
  description:
    "Calcula hasta qué día puedes avisar que no renuevas un contrato a término fijo: {{co.preaviso-termino-fijo}} antes del vencimiento. Si nadie avisa, se renueva.",
  intro: [
    "Un contrato a término fijo se renueva solo si nadie avisa. Para que termine en la fecha pactada, la empresa o tú tienen que avisar por escrito con {{co.preaviso-termino-fijo}} de anticipación.",
    "Escribe la fecha en que vence tu contrato y te decimos el último día para avisar.",
  ],
  comoSeCalcula: [
    "Último día para avisar: la fecha de vencimiento menos {{co.preaviso-termino-fijo}}.",
    "Si nadie avisa a tiempo, el contrato se renueva por el mismo término, sin pasar del máximo legal de cuatro años.",
  ],
  ejemplo: ["Si tu contrato vence el 31 de diciembre de 2026, el último día para avisar que no se renueva es el 1 de diciembre."],
  faq: [
    {
      pregunta: "¿Con cuánta anticipación hay que avisar?",
      respuesta: "Con {{co.preaviso-termino-fijo}} de anticipación al vencimiento del contrato o de su prórroga.",
    },
    {
      pregunta: "¿Qué pasa si no avisan a tiempo?",
      respuesta: "El contrato se renueva automáticamente por un término igual al pactado, sin pasar de cuatro años en total.",
    },
    {
      pregunta: "¿Cuánto puede durar un contrato a término fijo?",
      respuesta: "Desde la reforma laboral de 2025, hasta cuatro años contando las prórrogas. Además tiene que constar por escrito.",
    },
  ],
  glosario: [
    { termino: "Preaviso", definicion: "El aviso por escrito de que el contrato no se va a renovar." },
    { termino: "Prórroga", definicion: "La renovación del contrato por otro periodo." },
  ],
});
