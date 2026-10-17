import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "es.factura-autonomo",
  h1: "Calculadora de factura de autónomo",
  title: "Factura de autónomo: IVA y retención de IRPF",
  description:
    "Calcula el total de tu factura como autónomo: base, IVA y retención de IRPF del {{es.irpf-retencion-profesionales[general]}} o del {{es.irpf-retencion-profesionales[inicio]}} si acabas de empezar.",
  intro: [
    "Si eres profesional autónomo y facturas a empresas o a otros autónomos, tu factura lleva dos impuestos: sumas el IVA y restas la retención de IRPF.",
    "Con esta calculadora sabes cuánto poner en la factura y cuánto te va a llegar a la cuenta.",
  ],
  comoSeCalcula: [
    "Parte de la base: el precio de tu trabajo sin impuestos.",
    "Suma el IVA, normalmente el {{es.iva-tipos[general]}}.",
    "Resta la retención de IRPF: el {{es.irpf-retencion-profesionales[general]}} en general o el {{es.irpf-retencion-profesionales[inicio]}} en el año de inicio de la actividad y los dos siguientes.",
    "El resultado es el total que te paga el cliente.",
  ],
  ejemplo: ["Una factura de 1.000 euros de base lleva 210 euros de IVA y 150 de retención. El cliente te paga 1.060 euros, de los que 210 son IVA que ingresarás a Hacienda."],
  faq: [
    {
      pregunta: "¿Siempre hay que aplicar retención?",
      respuesta: "Solo en actividades profesionales cuando el cliente es una empresa o un autónomo. Si facturas a un particular, no se retiene.",
    },
    {
      pregunta: "¿Cuándo puedo aplicar la retención reducida?",
      respuesta: "El año en que empiezas la actividad y los dos siguientes, si no ejerciste ninguna actividad profesional el año anterior al inicio. Tienes que comunicárselo por escrito a tu cliente.",
    },
    {
      pregunta: "¿El IVA de la factura es mío?",
      respuesta: "No. Lo cobras en nombre de Hacienda y lo ingresas cada trimestre, menos el IVA de tus gastos deducibles.",
    },
  ],
  glosario: [
    { termino: "Base imponible", definicion: "Precio del servicio sin IVA ni retención." },
    { termino: "Retención de IRPF", definicion: "Parte de la factura que tu cliente ingresa a Hacienda a cuenta de tu IRPF." },
    { termino: "Modelo 303", definicion: "Declaración trimestral con la que ingresas el IVA cobrado." },
  ],
});
