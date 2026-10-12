import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "sv.declaracion-de-renta",
  h1: "Calculadora de la declaración de renta anual",
  title: "Declaración de renta El Salvador: ¿paga o le devuelven?",
  description: "Calcule la renta de su año con la tabla anual vigente y compárela con lo que le retuvieron. Sepa si le falta pagar o si tiene saldo a su favor.",
  intro: [
    "Cada mes su patrono le retiene renta. Al cerrar el año, el impuesto se calcula con la tabla anual y puede quedar una diferencia: o le falta pagar o tiene saldo a su favor.",
    "Ponga sus salarios del año, lo que le descontaron de AFP e ISSS y la renta retenida. Todo eso está en la constancia de retención que le da su patrono.",
  ],
  comoSeCalcula: [
    "A los salarios del año se les restan las cotizaciones de AFP e ISSS.",
    "Si sus salarios no pasan de {{sv.limite-deduccion-fija-renta}}, se resta además una deducción fija de {{sv.deduccion-fija-renta}}. Si pasan, puede restar gastos médicos y de colegiatura comprobados.",
    "Lo que queda es la renta imponible y se busca en la tabla anual. El primer tramo no paga. En los demás se paga una cuota fija más un porcentaje sobre lo que pase el límite del tramo anterior.",
    "Ese impuesto se compara con lo que ya le retuvieron.",
  ],
  ejemplo: [
    "Con $12,000 de salarios en el año, la AFP y el ISSS suman $1,230 y la renta imponible queda en $10,770. El impuesto es $1,045.43. Si le retuvieron $1,000, le faltan $45.43.",
  ],
  faq: [
    {
      pregunta: "¿Estoy obligado a declarar si solo tengo salario?",
      respuesta: "Si solo tiene salario y le hicieron las retenciones bien, no. Sí tiene que declarar si sus salarios pasan de {{sv.renta-declaracion-obligatoria}} al año, si no le retuvieron o si las retenciones no cuadran con la tabla anual.",
    },
    {
      pregunta: "¿Puedo pedir que me devuelvan renta?",
      respuesta: "Sí. Si le retuvieron más de lo que da la tabla anual, puede presentar la declaración y pedir la devolución del saldo a su favor.",
    },
    {
      pregunta: "¿Qué gastos puedo deducir?",
      respuesta: "Si gana más de {{sv.limite-deduccion-fija-renta}} al año, puede restar gastos médicos y de colegiatura comprobados, con los límites de la ley. Si gana menos, ya tiene una deducción fija de {{sv.deduccion-fija-renta}}.",
    },
  ],
  glosario: [
    { termino: "Renta imponible", definicion: "La parte de sus ingresos sobre la que se calcula el impuesto." },
    { termino: "Constancia de retención", definicion: "El documento que entrega el patrono con lo pagado y lo retenido en el año." },
  ],
});
