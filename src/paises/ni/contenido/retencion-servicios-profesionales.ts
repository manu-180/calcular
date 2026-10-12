import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ni.retencion-servicios-profesionales",
  h1: "Retención del IR por servicios profesionales en Nicaragua",
  title: "Retención del {{ni.retenciones-ir[profesionales]}} por servicios profesionales en Nicaragua",
  description: "Si facturás servicios profesionales en Nicaragua, te retienen el {{ni.retenciones-ir[profesionales]}} de IR. Calculá el IVA, la retención y cuánto recibís.",
  intro: [
    "Cuando una persona natural presta servicios profesionales o técnicos, quien le paga le retiene el {{ni.retenciones-ir[profesionales]}} a cuenta del IR.",
    "Poné tus honorarios sin IVA. Te mostramos la factura, la retención y lo que te depositan.",
  ],
  comoSeCalcula: [
    "IVA: el {{ni.iva}} de los honorarios, si estás inscrito como responsable recaudador.",
    "Retención: el {{ni.retenciones-ir[profesionales]}} de los honorarios, sin contar el IVA.",
    "Lo que recibís: honorarios más IVA menos la retención.",
  ],
  ejemplo: ["Por honorarios de C$10,000 facturás C$11,500 con IVA, te retienen C$1,000 y recibís C$10,500."],
  faq: [
    {
      pregunta: "¿Cuánto es la retención por servicios profesionales en Nicaragua?",
      respuesta: "El {{ni.retenciones-ir[profesionales]}} de los honorarios, cuando el servicio lo presta una persona natural.",
    },
    {
      pregunta: "¿La retención se calcula con o sin IVA?",
      respuesta: "Sin IVA. Se aplica solo sobre el monto de los honorarios.",
    },
    {
      pregunta: "¿Hay un monto mínimo para retener?",
      respuesta: "No para servicios profesionales: el {{ni.retenciones-ir[profesionales]}} se retiene aunque la factura sea menor de {{ni.retencion-minimo-factura}}.",
    },
    {
      pregunta: "¿Pierdo lo que me retienen?",
      respuesta: "No. Es un pago a cuenta de tu IR anual. Al declarar, lo restás del impuesto. Pedí siempre la constancia.",
    },
  ],
  glosario: [
    { termino: "Retención en la fuente", definicion: "La parte del pago que se queda quien te paga para entregarla a la DGI a tu nombre." },
    { termino: "Constancia de retención", definicion: "El comprobante que prueba cuánto te retuvieron." },
  ],
});
