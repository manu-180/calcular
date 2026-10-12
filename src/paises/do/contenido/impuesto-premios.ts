import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "do.impuesto-premios",
  h1: "Calculadora del impuesto a premios de lotería y bancas",
  title: "Impuesto a premios de lotería en RD: cuánto te queda",
  description: "Calcula la retención de ISR sobre premios de lotería ({{do.retencion-premios-loteria}}) y de bancas de lotería o deportivas, con la escala de la Ley 30-26.",
  intro: [
    "Los premios de lotería, rifas y promociones pagan {{do.retencion-premios-loteria}} de ISR. Los de bancas tienen su propia escala.",
    "La retención la hace quien paga el premio y es definitiva. Pon el monto y ves cuánto cobras.",
  ],
  comoSeCalcula: [
    "Loterías, rifas, lotos y promociones: {{do.retencion-premios-loteria}} del premio.",
    "Bancas de lotería y deportivas, desde el 1 de julio de 2026: hasta RD$200,001 no hay retención; hasta RD$600,000, 15 %; más de RD$600,001, 25 %.",
    "En las bancas, la tasa se aplica sobre todo el premio.",
  ],
  ejemplo: [
    "Si ganas RD$1,000,000 en la lotería, te retienen RD$250,000 y cobras RD$750,000.",
  ],
  faq: [
    { pregunta: "¿Cuánto impuesto paga un premio de lotería?", respuesta: "El {{do.retencion-premios-loteria}} del premio, retenido al pagarlo." },
    { pregunta: "¿Y un premio de banca?", respuesta: "Desde el 1 de julio de 2026, 15 % si pasa de RD$200,001 y hasta RD$600,000, y 25 % si pasa de RD$600,001." },
    { pregunta: "¿Tengo que declarar el premio?", respuesta: "No. La retención es pago definitivo." },
  ],
  glosario: [
    { termino: "Retención definitiva", definicion: "Impuesto que se cobra al pagar el premio y no se vuelve a calcular." },
    { termino: "Banca", definicion: "Negocio autorizado de apuestas de lotería o deportivas." },
  ],
});
