import { aplicarEscalaMarginal, definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "zm.rental-income-tax-calculator",
  mercado: "zm",
  concepto: "propio",
  slug: "rental-income-tax-calculator",
  estado: "publicado",
  requiere: {
    "zm.rental-bands-monthly": "escala",
    "zm.rental-bands-annual": "escala",
  },
  campos: [
    { id: "renta", tipo: "moneda", etiqueta: "Rental income", min: 0, porDefecto: 10000 },
    {
      id: "periodo",
      tipo: "opcion",
      etiqueta: "The amount is for",
      opciones: [
        { valor: "mes", etiqueta: "One month" },
        { valor: "anio", etiqueta: "A whole year" },
      ],
      porDefecto: "mes",
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.renta <= 0) throw new ErrorEntrada("Enter the rental income.", "renta");
    const bandas = e.periodo === "mes" ? v["zm.rental-bands-monthly"] : v["zm.rental-bands-annual"];
    const impuesto = redondear(aplicarEscalaMarginal(bandas, e.renta));
    return { impuesto, neto: redondear(e.renta - impuesto), efectiva: (impuesto / e.renta) * 100 };
  },
  resultado: [
    { clave: "impuesto", etiqueta: "Rental income tax", formato: "moneda", destacada: true },
    { clave: "neto", etiqueta: "Rent left after the tax", formato: "moneda" },
    { clave: "efectiva", etiqueta: "Share of the rent paid in tax", formato: "porcentaje", decimales: 2 },
  ],
});
