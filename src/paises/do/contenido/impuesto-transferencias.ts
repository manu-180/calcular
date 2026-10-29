import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "do.impuesto-transferencias",
  h1: "Calculadora del impuesto a transferencias y cheques",
  title: "Impuesto a transferencias en RD: calcula el {{do.impuesto-transferencias}}",
  description: "Calcula el impuesto del {{do.impuesto-transferencias}} sobre cheques y transferencias electrónicas a terceros, vigente desde el 3 de julio de {{anio}} con la Ley 30-26.",
  intro: [
    "Cada cheque y cada transferencia electrónica a otra persona paga un impuesto. Desde el 3 de julio de 2026 es del {{do.impuesto-transferencias}} (2 por mil).",
    "Pon el monto y ves cuánto pagas por cada operación, por mes y por año.",
  ],
  comoSeCalcula: [
    "El impuesto es el {{do.impuesto-transferencias}} del monto del cheque o la transferencia.",
    "Si haces varias al mes, se multiplica por la cantidad.",
    "Las transferencias entre tus propias cuentas no pagan.",
  ],
  ejemplo: [
    "Por una transferencia de RD$100,000 pagas RD$200 de impuesto.",
  ],
  faq: [
    { pregunta: "¿Cuánto es el impuesto a las transferencias en 2026?", respuesta: "El {{do.impuesto-transferencias}} desde el 3 de julio de 2026, según la Ley 30-26." },
    { pregunta: "¿Qué operaciones no pagan?", respuesta: "Los retiros de efectivo, las transferencias entre tus cuentas, el consumo con tarjeta de crédito, los pagos a la Seguridad Social y los pagos de impuestos." },
    { pregunta: "¿Las transferencias dentro del mismo banco pagan?", respuesta: "Sí, si van a la cuenta de otra persona." },
  ],
  glosario: [
    { termino: "Dos por mil", definicion: "Dos pesos por cada mil, o sea 0.2 %." },
    { termino: "Transferencia a terceros", definicion: "Envío de dinero a la cuenta de otra persona o empresa." },
  ],
});
