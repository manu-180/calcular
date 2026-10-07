import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "pe.tipo-de-cambio",
  h1: "Tipo de cambio SUNAT hoy",
  title: "Tipo de cambio SUNAT hoy: dólares a soles",
  description: "Convierte dólares a soles y soles a dólares con el tipo de cambio que publica SUNAT cada día. Compra y venta, con la fecha de publicación.",
  intro: [
    "SUNAT publica cada día un tipo de cambio de compra y otro de venta. Es el que se usa para comprobantes de pago, declaraciones y contratos que lo piden.",
    "Este conversor toma el último valor publicado y te muestra la fecha. No es el precio de una casa de cambio ni de tu banco.",
  ],
  comoSeCalcula: [
    "Dólares a soles: multiplica los dólares por el tipo de cambio.",
    "Soles a dólares: divide los soles entre el tipo de cambio.",
    "Te mostramos el resultado con el tipo de venta y con el de compra, para que uses el que te pidan.",
  ],
  faq: [
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
