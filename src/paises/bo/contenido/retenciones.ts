import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "bo.retenciones",
  h1: "Calculadora de retenciones RC-IVA, IUE e IT",
  title: "Retenciones sin factura en Bolivia: RC-IVA, IUE e IT",
  description: "Calcule cuánto retener cuando paga sin factura un servicio, un alquiler o una compra de bienes, y el monto bruto si usted asume los impuestos.",
  intro: [
    "Cuando una empresa paga a una persona que no le entrega factura, tiene que retener impuestos y pagarlos al SIN. Cuánto depende de si paga un servicio, un alquiler o la compra de bienes.",
    "Elija qué paga, escriba el monto y diga si es el total o lo que la persona tiene que recibir.",
  ],
  comoSeCalcula: [
    "Servicios y alquileres: RC-IVA del {{bo.rc-iva-alicuota}} más IT del {{bo.it}} sobre el total.",
    "Compra de bienes: IUE del {{bo.iue}} sobre una utilidad presunta del {{bo.iue-utilidad-presunta[bienes]}} del total, más IT del {{bo.it}}.",
    "Si usted asume los impuestos para que la persona reciba un monto limpio, el total se calcula dividiendo ese monto por lo que queda después de las retenciones.",
  ],
  faq: [
    {
      pregunta: "¿Cuánto se retiene por un servicio sin factura?",
      respuesta: "El RC-IVA del {{bo.rc-iva-alicuota}} y el IT del {{bo.it}} sobre el total pagado. Desde 2023 (D.S. N° 4850) a los servicios de personas se les retiene RC-IVA y no IUE.",
    },
    {
      pregunta: "¿Y por comprar bienes sin factura?",
      respuesta: "El IUE del {{bo.iue}} sobre el {{bo.iue-utilidad-presunta[bienes]}} del precio (la utilidad que se presume) más el IT del {{bo.it}}.",
    },
    {
      pregunta: "¿Qué es el grossing up?",
      respuesta: "Es cuando quien paga se hace cargo de los impuestos. Se calcula un monto bruto más alto para que, después de retener, la persona reciba lo acordado.",
    },
    {
      pregunta: "¿Cuándo se pagan las retenciones?",
      respuesta: "El mes siguiente al pago, en la fecha que corresponde al último dígito del NIT de quien retiene, entre el día 13 y el 22.",
    },
  ],
  glosario: [
    { termino: "Agente de retención", definicion: "La empresa o institución que descuenta el impuesto y lo paga al SIN en nombre de otro." },
    { termino: "RC-IVA", definicion: "Régimen Complementario al IVA, impuesto sobre ingresos de personas." },
    { termino: "IT", definicion: "Impuesto a las Transacciones, sobre los ingresos brutos." },
  ],
});
