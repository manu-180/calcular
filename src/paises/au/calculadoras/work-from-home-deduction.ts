import { definirCalculadora, ErrorEntrada, enMapa } from "@/motor/calculo";

export default definirCalculadora({
  id: "au.work-from-home-deduction",
  mercado: "au",
  concepto: "propio",
  slug: "work-from-home-deduction",
  estado: "publicado",
  requiere: {
    "au.wfh-tasa": "mapa",
  },
  campos: [
    { id: "horas", tipo: "numero", etiqueta: "Hours you worked from home in the income year", min: 0, max: 8784, porDefecto: 500 },
    {
      id: "anio",
      tipo: "opcion",
      etiqueta: "Income year",
      opciones: [
        { valor: "2025-26", etiqueta: "2025-26" },
        { valor: "2024-25", etiqueta: "2024-25" },
      ],
      porDefecto: "2025-26",
    },
    {
      id: "activos",
      tipo: "moneda",
      etiqueta: "Decline in value of work equipment and furniture (optional)",
      ayuda: "For example a desk or chair under $300 used only for work from home.",
      min: 0,
      requerido: false,
    },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.horas < 0) throw new ErrorEntrada("Enter the hours you worked from home.", "horas");
    const tasa = enMapa(v["au.wfh-tasa"], entrada.anio);
    const porHoras = redondear(entrada.horas * tasa);
    const total = redondear(porHoras + (entrada.activos ?? 0));
    return {
      deduccion: Math.floor(total),
      porHoras,
      tasa,
      total,
      observaciones: ["You need a record of the actual hours you worked from home for the whole year, such as timesheets or a diary. An estimate is not accepted."],
    };
  },
  resultado: [
    { clave: "deduccion", etiqueta: "Deduction to claim (cents disregarded)", formato: "moneda", destacada: true },
    { clave: "porHoras", etiqueta: "Hours × fixed rate", formato: "moneda" },
    { clave: "tasa", etiqueta: "Fixed rate per work hour", formato: "moneda" },
    { clave: "total", etiqueta: "Total before disregarding cents", formato: "moneda" },
  ],
});
