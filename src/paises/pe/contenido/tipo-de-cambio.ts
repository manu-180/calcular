import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "pe.tipo-de-cambio",
  h1: "Tipo de cambio SUNAT hoy: dólares a soles",
  title: "Tipo de cambio SUNAT hoy: venta {{pe.tc-sunat-venta}}",
  description:
    "Tipo de cambio SUNAT de hoy: compra {{pe.tc-sunat-compra}} y venta {{pe.tc-sunat-venta}}. Convierte dólares a soles y soles a dólares al instante, con la fecha de publicación.",
  intro: [
    "El tipo de cambio SUNAT de hoy es {{pe.tc-sunat-compra}} para la compra y {{pe.tc-sunat-venta}} para la venta, según la publicación del {{pe.tc-sunat-venta#desde}}.",
    "Es el que se usa para comprobantes de pago, declaraciones y contratos que lo piden. No es el precio de una casa de cambio ni de tu banco.",
  ],
  comoSeCalcula: [
    "Dólares a soles: multiplica los dólares por el tipo de cambio.",
    "Soles a dólares: divide los soles entre el tipo de cambio.",
    "Te mostramos el resultado con el tipo de venta y con el de compra, para que uses el que te pidan.",
  ],
  ejemplo: [
    "Para pasar 100 dólares a soles con el tipo de venta, multiplica 100 por {{pe.tc-sunat-venta}}. Para pasar soles a dólares, divide entre el mismo valor.",
  ],
  faq: [
    {
      pregunta: "¿A cuánto está el dólar hoy según SUNAT?",
      respuesta: "Compra {{pe.tc-sunat-compra}} y venta {{pe.tc-sunat-venta}}. En casas de cambio y bancos el precio puede ser distinto.",
    },
    {
      pregunta: "¿De dónde sale el tipo de cambio SUNAT?",
      respuesta: "SUNAT publica el tipo de cambio promedio del sistema bancario que informa la SBS. Lo actualizamos todos los días desde la publicación oficial de SUNAT.",
    },
    {
      pregunta: "¿Cuál uso, compra o venta?",
      respuesta: "Depende de la operación y de lo que diga la norma o el contrato. Si es para un trámite tributario, confírmalo con tu contador.",
    },
    {
      pregunta: "¿Qué valor muestra el conversor el fin de semana?",
      respuesta: "El último que publicó SUNAT, con su fecha. Si pasan más de 7 días sin dato nuevo, el conversor se apaga hasta tener uno fresco.",
    },
  ],
  glosario: [
    { termino: "Tipo de cambio compra", definicion: "Lo que pagan los bancos por cada dólar que les vendes." },
    { termino: "Tipo de cambio venta", definicion: "Lo que cobran los bancos por cada dólar que les compras." },
  ],
});
