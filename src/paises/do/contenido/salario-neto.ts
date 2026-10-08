import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "do.salario-neto",
  h1: "Calculadora de salario neto",
  title: "Salario neto 2026: calcula tu sueldo después de TSS e ISR",
  description: "Pasa de salario bruto a neto con los descuentos de la TSS (SFS y AFP) y la retención del ISR, con los topes de cotización vigentes y la escala de la DGII.",
  intro: [
    "El salario neto es lo que te llega a la cuenta. Sale del bruto menos lo que te descuentan para la TSS y el ISR.",
    "Escribe tu salario bruto mensual y ves cada descuento por separado.",
  ],
  comoSeCalcula: [
    "Seguro Familiar de Salud (SFS): {{do.sfs-trabajador}} de tu salario, hasta un tope de {{do.tope-sfs}}.",
    "Pensión (AFP): {{do.afp-trabajador}} de tu salario, hasta un tope de {{do.tope-afp}}.",
    "Lo que queda después de esos dos descuentos es la base del ISR.",
    "Esa base se lleva a un año (por 12), se le aplica la escala de la DGII y el impuesto anual se divide entre 12. Eso es lo que te retienen cada mes.",
  ],
  ejemplo: [
    "Con RD$60,000 brutos te descuentan RD$1,824 de SFS, RD$1,722 de AFP y RD$3,486.65 de ISR. Tu salario neto es RD$52,967.35.",
  ],
  faq: [
    {
      pregunta: "¿Desde qué salario se paga ISR?",
      respuesta: "Cuando tu salario, ya sin SFS ni AFP, pasa de la doceava parte del monto exento anual. La calculadora de ISR te muestra ese límite por mes.",
    },
    {
      pregunta: "¿El empleador también paga a la TSS?",
      respuesta: "Sí, y paga más que tú. Ese aporte no sale de tu salario. Lo ves en la calculadora de aportes a la TSS.",
    },
    {
      pregunta: "¿Qué es el tope de cotización?",
      respuesta: "Es el salario máximo sobre el que se calcula cada seguro. Si ganas más, el descuento se queda fijo en el tope.",
    },
    {
      pregunta: "¿Cambia mi salario neto en 2027?",
      respuesta: "Puede bajar el ISR. La Ley 30-26 sube el monto exento desde 2027. Cuando la DGII publique la escala, la cargamos.",
    },
  ],
  glosario: [
    { termino: "TSS", definicion: "Tesorería de la Seguridad Social. Cobra los aportes de salud, pensión y riesgos laborales." },
    { termino: "SFS", definicion: "Seguro Familiar de Salud. Cubre tu atención médica a través de una ARS." },
    { termino: "AFP", definicion: "Administradora de Fondos de Pensiones. Guarda tu ahorro para el retiro." },
    { termino: "ISR", definicion: "Impuesto sobre la renta. Tu empleador lo retiene cada mes y lo paga a la DGII." },
  ],
});
