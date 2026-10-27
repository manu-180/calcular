import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "uy.literal-e",
  h1: "Calculadora del literal E: IVA mínimo y tope de facturación",
  title: "Literal E {{anio}}: IVA mínimo y cuánto podés facturar",
  description:
    "Calculá si entrás en el literal E y cuánto pagás de IVA fijo: {{uy.literal-e-pago}} por mes en {{anio}}, con descuento los primeros años y tope de {{uy.literal-e-tope}} anuales.",
  intro: [
    "El literal E es el régimen de las empresas chicas: no cobrás IVA en tus facturas ni pagás IRAE, y a cambio pagás un IVA fijo por mes.",
    "Poné lo que facturás en el año y desde cuándo tenés la empresa. Te decimos si entrás y cuánto pagás.",
  ],
  comoSeCalcula: [
    "Para estar en el literal E, lo que facturás en el año no puede pasar de {{uy.literal-e-tope}}, a la cotización de la UI del inicio del año ({{uy.ui-inicio-anio}}).",
    "El IVA fijo de 2026 es {{uy.literal-e-pago}} por mes.",
    "Si empezaste desde 2021, pagás el {{uy.literal-e-gradualidad[1]}} los primeros 12 meses y el {{uy.literal-e-gradualidad[2]}} los 12 siguientes.",
    "Si facturás solo con comprobantes electrónicos, el pago no pasa del {{uy.literal-e-tope-ingresos}} de lo que facturás en el mes.",
  ],
  ejemplo: ["Si facturás $ 1.200.000 en el año y tenés la empresa hace más de dos años, pagás $ 5.910 por mes. Con e-factura, $ 3.300."],
  faq: [
    {
      pregunta: "¿Cuánto se paga en el literal E en 2026?",
      respuesta: "{{uy.literal-e-pago}} por mes de IVA. Los primeros dos años, si empezaste desde 2021, menos. Los aportes al BPS se pagan aparte.",
    },
    {
      pregunta: "¿Cuánto puedo facturar en el literal E?",
      respuesta: "Hasta {{uy.literal-e-tope}} por año, a la cotización de la UI del 1 de enero. La calculadora te lo muestra en pesos.",
    },
    {
      pregunta: "¿Puedo facturar a empresas?",
      respuesta: "Sí. Tus facturas no llevan IVA, así que la empresa no puede descontarse ese IVA. Por eso algunas prefieren proveedores del régimen general.",
    },
    {
      pregunta: "¿Qué pasa si me paso del tope?",
      respuesta: "Desde ese momento pasás al régimen general: cobrás y liquidás IVA y pagás IRAE. Conviene hablarlo con un contador.",
    },
    {
      pregunta: "¿Es lo mismo que el monotributo?",
      respuesta: "No. El monotributo es un pago único al BPS para actividades muy chicas. El literal E es un régimen de la DGI para empresas chicas que pagan IVA fijo y sus aportes por separado.",
    },
  ],
  glosario: [
    { termino: "Literal E", definicion: "El literal del artículo de la ley que exonera de IRAE a las empresas chicas." },
    { termino: "CFE", definicion: "Comprobante fiscal electrónico: e-factura o e-ticket." },
    { termino: "IRAE", definicion: "Impuesto a la renta de las empresas." },
  ],
});
