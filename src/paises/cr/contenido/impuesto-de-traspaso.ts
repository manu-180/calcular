import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "cr.impuesto-de-traspaso",
  h1: "Impuesto de traspaso de una propiedad",
  title: "Impuesto de traspaso de inmuebles en Costa Rica",
  description:
    "Calcule el impuesto de traspaso al comprar o vender una casa o lote: {{cr.traspaso-inmuebles}} del valor, dividido entre quien vende y quien compra.",
  intro: [
    "Cuando se compra o se vende una propiedad, se paga el impuesto sobre traspasos de bienes inmuebles: {{cr.traspaso-inmuebles}} del valor.",
    "La ley lo reparte por partes iguales entre quien vende y quien compra. Escriba el precio y le mostramos cuánto paga cada uno.",
  ],
  comoSeCalcula: [
    "Base: el valor real de la venta, nunca menor que el valor registrado del inmueble.",
    "Impuesto: {{cr.traspaso-inmuebles}} de la base.",
    "Cada parte paga la mitad.",
  ],
  ejemplo: ["En la venta de una casa de ₡80.000.000, el impuesto es ₡1.200.000: ₡600.000 cada parte."],
  faq: [
    {
      pregunta: "¿Quién paga el impuesto de traspaso?",
      respuesta: "Por ley, por partes iguales quien vende y quien compra. En un remate o una dación en pago lo paga todo quien recibe la propiedad.",
    },
    {
      pregunta: "¿Cuándo se paga?",
      respuesta: "Dentro de los quince días hábiles después de firmar la escritura.",
    },
    {
      pregunta: "¿Es lo único que se paga en un traspaso?",
      respuesta: "No. Además están los honorarios del notario y los timbres y derechos de inscripción en el Registro Nacional.",
    },
  ],
  glosario: [{ termino: "Traspaso", definicion: "El cambio de dueño de una propiedad inscrito en el Registro Nacional." }],
});
