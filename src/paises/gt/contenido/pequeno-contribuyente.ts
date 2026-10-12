import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "gt.pequeno-contribuyente",
  h1: "Calculadora del impuesto de pequeño contribuyente",
  title: "Pequeño contribuyente en Guatemala: calcule su impuesto",
  description:
    "Calcule el impuesto mensual del régimen de pequeño contribuyente del IVA sobre lo que facturó en el mes, y cuánto le queda.",
  intro: [
    "En el régimen de pequeño contribuyente usted paga una tarifa única del {{gt.pequeno-contribuyente}} sobre lo que factura cada mes. No cobra IVA aparte ni paga ISR.",
    "Es el régimen de muchos negocios pequeños, tiendas y profesionales que empiezan.",
  ],
  comoSeCalcula: [
    "Impuesto del mes = total facturado en el mes × {{gt.pequeno-contribuyente}}.",
    "Lo que le retuvieron sus clientes se resta de lo que paga en la declaración.",
  ],
  ejemplo: ["Si facturó Q2,500 en el mes, paga Q125 de impuesto."],
  faq: [
    {
      pregunta: "¿Cuándo pago el impuesto de pequeño contribuyente?",
      respuesta: "Cada mes, con la declaración que presenta en la Agencia Virtual de la SAT dentro del mes siguiente. Si no vendió nada, igual tiene que presentarla en cero.",
    },
    {
      pregunta: "¿Qué pasa si me retienen el impuesto?",
      respuesta: "Si su cliente es agente de retención, le descuenta el {{gt.pequeno-contribuyente}} y lo paga por usted. Esas facturas ya no las paga en su declaración.",
    },
    {
      pregunta: "¿Hasta cuánto puedo vender en este régimen?",
      respuesta: "La ley fija un tope de ventas por año. Si lo pasa, la SAT lo traslada al régimen general del IVA. Revise el tope vigente en la SAT antes de llegar a ese monto.",
    },
  ],
  glosario: [
    { termino: "Pequeño contribuyente", definicion: "Régimen del IVA para personas y negocios con ventas bajas, con una tarifa única sobre lo facturado." },
  ],
});
