import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ec.sueldo-neto",
  h1: "Calculadora de sueldo neto en Ecuador",
  title: "Sueldo neto Ecuador 2026: calcula tu rol de pagos",
  description: "Pasa de sueldo bruto a neto: aporte al IESS de {{ec.aporte-personal-iess}}, retención del impuesto a la renta y décimos mensualizados, como en tu rol de pagos. Gratis.",
  intro: [
    "Tu sueldo neto es el bruto menos el aporte personal al IESS ({{ec.aporte-personal-iess}}) y la retención del impuesto a la renta, más los décimos si los cobras cada mes. Es lo que te depositan.",
    "Es el mismo cálculo de tu rol de pagos, con la tabla 2026 del SRI.",
  ],
  comoSeCalcula: [
    "Aporte personal al IESS: {{ec.aporte-personal-iess}} de tu sueldo.",
    "Retención del impuesto a la renta: se proyecta tu sueldo del año menos el aporte, se aplica la tabla del SRI, se resta la rebaja por gastos personales y se divide para 11.",
    "Si cobras los décimos cada mes, se suman la doceava parte de tu sueldo (décimo tercero) y la doceava parte del salario básico de {{ec.sbu}} (décimo cuarto).",
    "Los décimos no pagan aportes al IESS ni impuesto a la renta.",
  ],
  ejemplo: [
    "Con un sueldo de $2.000 y los décimos mensualizados, te descuentan $189 de IESS y $74,21 de impuesto, y te suman $166,67 y $40,17 de décimos. Tu neto es $1.943,63.",
  ],
  faq: [
    {
      pregunta: "¿Qué diferencia hay entre sueldo bruto y neto?",
      respuesta: "El bruto es tu sueldo antes de descuentos. El neto es lo que recibes después del aporte al IESS y la retención del impuesto a la renta.",
    },
    {
      pregunta: "¿Cuánto me descuenta el IESS?",
      respuesta: "El {{ec.aporte-personal-iess}} de tu sueldo, si trabajas en el sector privado en relación de dependencia.",
    },
    {
      pregunta: "¿Por qué en enero cobro un poco más?",
      respuesta: "Porque en enero el empleador no retiene impuesto a la renta. La retención se reparte de febrero a diciembre.",
    },
    {
      pregunta: "¿Cómo bajo la retención del impuesto a la renta?",
      respuesta: "Entrega a tu empleador la proyección de gastos personales en febrero. Con esa información aplica la rebaja cada mes.",
    },
    {
      pregunta: "¿El fondo de reserva está en este cálculo?",
      respuesta: "No. Si llevas más de un año con tu empleador, recibes además el fondo de reserva cada mes, salvo que lo acumules en el IESS.",
    },
  ],
  glosario: [
    { termino: "Sueldo neto", definicion: "Lo que recibes después de los descuentos de ley." },
    { termino: "Retención en la fuente", definicion: "La parte del impuesto a la renta que el empleador descuenta cada mes y paga al SRI por ti." },
    { termino: "Rol de pagos", definicion: "El detalle mensual de tus ingresos y descuentos." },
  ],
});
