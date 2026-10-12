import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "cr.impuesto-bienes-inmuebles",
  h1: "Calculadora del impuesto sobre bienes inmuebles",
  title: "Impuesto de bienes inmuebles en Costa Rica: cálculo",
  description:
    "Calcule el impuesto municipal sobre su casa, lote o local: {{cr.bienes-inmuebles}} del valor registrado al año, con la opción de restar el monto exento por bien único.",
  intro: [
    "El impuesto sobre bienes inmuebles lo cobra la municipalidad cada año. Es el {{cr.bienes-inmuebles}} del valor registrado de la propiedad.",
    "Escriba el valor de su inmueble y le mostramos el impuesto del año y de cada trimestre.",
  ],
  comoSeCalcula: [
    "Impuesto anual: {{cr.bienes-inmuebles}} del valor registrado en la municipalidad.",
    "Si es su único inmueble y usted es persona física, se paga solo sobre lo que pasa del monto exento (45 salarios base).",
    "Cada municipalidad decide si se paga en un solo pago, en dos semestres o en cuatro trimestres.",
  ],
  ejemplo: ["Una propiedad registrada en ₡50.000.000 paga ₡125.000 al año: ₡31.250 por trimestre."],
  faq: [
    {
      pregunta: "¿Cuánto es el impuesto de bienes inmuebles?",
      respuesta: "{{cr.bienes-inmuebles}} del valor registrado, en todo el país.",
    },
    {
      pregunta: "¿Quién no paga el impuesto?",
      respuesta: "Las personas físicas con un único inmueble de valor bajo: no pagan sobre los primeros 45 salarios base. También están exentos algunos bienes del Estado, reservas y parques nacionales, entre otros.",
    },
    {
      pregunta: "¿Cómo sé el valor registrado de mi propiedad?",
      respuesta: "Lo indica su municipalidad en el estado de cuenta. Cambia cuando usted presenta la declaración de bienes inmuebles o la municipalidad hace una valoración.",
    },
  ],
  glosario: [
    { termino: "Bien único", definicion: "Cuando una persona física tiene una sola propiedad a su nombre." },
    { termino: "Salario base", definicion: "Monto que fija el Poder Judicial cada año y que la ley usa como unidad de referencia." },
  ],
});
