import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "do.dividendos",
  h1: "Calculadora de retención de ISR a dividendos",
  title: "Retención a dividendos en RD: calcula el {{do.retencion-dividendos}}",
  description: "Calcula la retención de ISR del {{do.retencion-dividendos}} sobre dividendos que reparte una empresa dominicana y cuánto recibe cada socio.",
  intro: [
    "Cuando una empresa reparte dividendos, retiene el {{do.retencion-dividendos}} y lo paga a la DGII. Esa retención es el impuesto final del socio.",
    "Pon el monto a repartir y ves la retención y lo que recibe el socio.",
  ],
  comoSeCalcula: [
    "La retención es el {{do.retencion-dividendos}} de los dividendos.",
    "El socio recibe los dividendos menos la retención.",
  ],
  ejemplo: [
    "Si una empresa reparte RD$250,000, retiene RD$25,000 y el socio recibe RD$225,000.",
  ],
  faq: [
    { pregunta: "¿Cuánto se retiene por dividendos en RD?", respuesta: "El {{do.retencion-dividendos}}, como pago único y definitivo." },
    { pregunta: "¿El socio tiene que declarar los dividendos?", respuesta: "No paga más ISR por ellos: la retención es definitiva." },
    { pregunta: "¿Aplica a socios del exterior?", respuesta: "Sí. La misma retención vale para residentes y no residentes." },
  ],
  glosario: [
    { termino: "Dividendos", definicion: "La parte de las ganancias que la empresa reparte entre sus socios." },
    { termino: "Pago definitivo", definicion: "Impuesto que ya no se vuelve a calcular en la declaración anual." },
  ],
});
