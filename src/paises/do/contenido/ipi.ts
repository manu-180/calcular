import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "do.ipi",
  h1: "Calculadora del IPI en República Dominicana",
  title: "IPI {{anio}}: calcula tu impuesto al patrimonio inmobiliario",
  description: "Calcula el IPI {{anio}}: {{do.ipi-tasa}} sobre el valor de tus inmuebles que pase de {{do.ipi-exento}}. Ves el impuesto del año y cada cuota.",
  intro: [
    "El Impuesto al Patrimonio Inmobiliario (IPI) lo pagan las personas con viviendas y solares urbanos cuyo valor total pasa de un monto exento que se ajusta cada año.",
    "Pon el valor total de tus inmuebles y ves cuánto pagas en el año y en cada cuota.",
  ],
  comoSeCalcula: [
    "Se suman todas tus viviendas y solares urbanos.",
    "A ese total se le resta el monto exento del año: {{do.ipi-exento}}.",
    "Sobre lo que sobra se paga el {{do.ipi-tasa}}.",
    "El impuesto se paga en dos cuotas iguales.",
  ],
  ejemplo: [
    "Con inmuebles por RD$15,000,000 pagas el 1 % sobre RD$4,304,506: RD$43,045.06 en el año, en dos cuotas de RD$21,522.53.",
  ],
  faq: [
    { pregunta: "¿Cuánto es el monto exento del IPI en 2026?", respuesta: "{{do.ipi-exento}} para personas físicas." },
    { pregunta: "¿Cuándo se paga el IPI?", respuesta: "En dos cuotas: hasta el 11 de marzo y hasta el 11 de septiembre." },
    { pregunta: "¿Quién no paga IPI?", respuesta: "Entre otros, las personas de 65 años o más cuya vivienda es su único inmueble. Los terrenos rurales de uso agropecuario tampoco pagan." },
  ],
  glosario: [
    { termino: "IPI", definicion: "Impuesto al Patrimonio Inmobiliario. Lo cobra la DGII." },
    { termino: "Monto exento", definicion: "Valor hasta el que los inmuebles no pagan el impuesto." },
  ],
});
