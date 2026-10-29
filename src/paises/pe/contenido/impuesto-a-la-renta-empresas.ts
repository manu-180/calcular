import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "pe.renta-tercera",
  h1: "Calculadora del impuesto a la renta de empresas (régimen general)",
  title: "Impuesto a la renta empresas {{anio}}: {{pe.tasa-renta-tercera}} y pago a cuenta",
  description:
    "Calcula el pago a cuenta mensual del régimen general (coeficiente o {{pe.pago-cuenta-tercera}}) y el impuesto anual de {{pe.tasa-renta-tercera}} sobre la utilidad de tu empresa.",
  intro: [
    "En el régimen general del impuesto a la renta, la empresa paga {{pe.tasa-renta-tercera}} sobre su utilidad del año y adelanta pagos a cuenta todos los meses.",
    "Pon los ingresos del mes y, si lo tienes, el coeficiente de tu empresa. Te damos el pago a cuenta y, con la utilidad, el impuesto anual.",
  ],
  comoSeCalcula: [
    "El pago a cuenta es el mayor entre dos montos: los ingresos del mes por el coeficiente, o los ingresos por {{pe.pago-cuenta-tercera}}.",
    "El coeficiente sale de dividir el impuesto del año anterior entre los ingresos netos de ese año.",
    "El impuesto anual es {{pe.tasa-renta-tercera}} de la renta neta. A ese monto le restas lo que adelantaste en pagos a cuenta.",
  ],
  ejemplo: ["Tu empresa vendió S/ 80,000 sin IGV en el mes y no tiene coeficiente: el pago a cuenta es S/ 1,200. Si cierra el año con S/ 200,000 de utilidad, el impuesto es S/ 59,000."],
  faq: [
    {
      pregunta: "¿Cuál es la tasa del impuesto a la renta de empresas en Perú?",
      respuesta: "{{pe.tasa-renta-tercera}} de la renta neta en el régimen general.",
    },
    {
      pregunta: "¿Cómo sé si uso el coeficiente o el porcentaje mínimo?",
      respuesta: "Calcula los dos y paga el mayor. Si el año pasado no tuviste impuesto, usas {{pe.pago-cuenta-tercera}}.",
    },
    {
      pregunta: "¿Qué pasa si mis pagos a cuenta superan el impuesto anual?",
      respuesta: "Tienes saldo a favor: puedes pedir la devolución o usarlo contra tus pagos a cuenta de los meses siguientes.",
    },
  ],
  glosario: [
    { termino: "Renta de tercera categoría", definicion: "La que obtienen las empresas y los negocios." },
    { termino: "Coeficiente", definicion: "Porcentaje propio de cada empresa para sus pagos a cuenta: impuesto del año anterior entre ingresos netos." },
  ],
});
