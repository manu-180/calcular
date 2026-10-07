import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "py.aguinaldo",
  mercado: "py",
  concepto: "bono-semestral",
  slug: "aguinaldo",
  estado: "publicado",
  requiere: {},
  campos: [
    {
      id: "salario",
      tipo: "moneda",
      etiqueta: "Salario mensual",
      ayuda: "Si tu salario cambió durante el año, poné el promedio.",
      min: 0,
    },
    {
      id: "meses",
      tipo: "numero",
      etiqueta: "Meses trabajados en el año",
      ayuda: "Hasta 12. Se aceptan fracciones: medio mes es 0,5.",
      min: 0,
      max: 12,
      porDefecto: 12,
    },
    {
      id: "extras",
      tipo: "moneda",
      etiqueta: "Horas extra, comisiones y otros cobros del año",
      ayuda: "Todo lo que cobraste aparte del salario desde enero. Si no tuviste, dejá 0.",
      min: 0,
      porDefecto: 0,
    },
  ],
  calcular(entrada, _valores, { redondear }) {
    if (entrada.meses > 12) throw new ErrorEntrada("El aguinaldo cubre un año: son 12 meses como máximo.", "meses");
    const totalAnio = redondear(entrada.salario * entrada.meses + entrada.extras);
    // Código del Trabajo, art. 243: la doceava parte de lo devengado en el año calendario.
    const aguinaldo = redondear(totalAnio / 12);
    return {
      totalAnio,
      aguinaldo,
      observaciones: [
        "Se paga antes del 31 de diciembre, o al terminar la relación laboral si eso pasa antes.",
        "El aguinaldo no paga aporte al IPS y no se puede embargar.",
      ],
    };
  },
  resultado: [
    { clave: "totalAnio", etiqueta: "Total cobrado en el año", formato: "moneda" },
    { clave: "aguinaldo", etiqueta: "Tu aguinaldo", formato: "moneda", destacada: true },
  ],
});
