import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "uy.itp",
  h1: "Calculadora del ITP (Impuesto a las Transmisiones Patrimoniales)",
  title: "ITP en Uruguay: cuánto se paga al comprar o heredar",
  description:
    "Calculá el ITP de una compraventa ({{uy.itp[enajenante]}} el vendedor y {{uy.itp[adquirente]}} el comprador) o de una herencia, sobre el valor real de Catastro.",
  intro: [
    "Cuando se compra, se vende o se hereda un inmueble se paga el ITP. En una compraventa lo pagan el vendedor y el comprador, cada uno su parte.",
    "Poné el valor real del inmueble y, si es una venta, el precio. Te decimos cuánto paga cada uno.",
  ],
  comoSeCalcula: [
    "La base es el valor real que fija la Dirección Nacional de Catastro, actualizado por IPC. Si el precio de la venta es menor, se usa el precio.",
    "Compraventa: {{uy.itp[enajenante]}} paga el vendedor y {{uy.itp[adquirente]}} el comprador.",
    "Herencias: {{uy.itp[herederos]}} si heredás de padres, hijos, abuelos o nietos, y {{uy.itp[otros]}} en los demás casos.",
  ],
  ejemplo: ["Si comprás un apartamento con valor real de $ 2.000.000, pagás $ 40.000 de ITP y el vendedor, otros $ 40.000."],
  faq: [
    {
      pregunta: "¿Quién paga el ITP en una compraventa?",
      respuesta: "Los dos: el vendedor paga {{uy.itp[enajenante]}} y el comprador {{uy.itp[adquirente]}}, sobre el valor real o el precio si es menor.",
    },
    {
      pregunta: "¿Qué es el valor real?",
      respuesta: "El valor que le asigna Catastro al inmueble. Figura en la cédula catastral y se actualiza por inflación.",
    },
    {
      pregunta: "¿Cuánto ITP se paga por una herencia?",
      respuesta: "{{uy.itp[herederos]}} si es de padres, hijos, abuelos o nietos, y {{uy.itp[otros]}} en los demás casos.",
    },
    {
      pregunta: "¿Hay otros gastos al comprar?",
      respuesta: "Sí: los honorarios del escribano, los timbres y aportes notariales y, si vendés, puede corresponder IRPF por la ganancia. No están en este cálculo.",
    },
  ],
  glosario: [
    { termino: "ITP", definicion: "Impuesto a las Transmisiones Patrimoniales. Grava compraventas, promesas y herencias de inmuebles." },
    { termino: "Catastro", definicion: "La Dirección Nacional de Catastro, que fija el valor real de los inmuebles." },
  ],
});
