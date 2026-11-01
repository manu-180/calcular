import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "ls.company-tax-calculator",
  mercado: "ls",
  concepto: "propio",
  slug: "company-tax-calculator",
  estado: "publicado",
  requiere: {
    "ls.company-tax-rates": "mapa",
  },
  campos: [
    { id: "renta", tipo: "moneda", etiqueta: "Chargeable income (taxable profit) for the year", min: 0, porDefecto: 500000 },
    { id: "tipo", tipo: "opcion-dato", dato: "ls.company-tax-rates", etiqueta: "Type of company", porDefecto: "other" },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.renta <= 0) throw new ErrorEntrada("Enter a taxable profit above zero.", "renta");
    const tasa = enMapa(v["ls.company-tax-rates"], entrada.tipo);
    const impuesto = redondear(porcentaje(entrada.renta, tasa));
    return { impuesto, tasa, despues: redondear(entrada.renta - impuesto) };
  },
  resultado: [
    { clave: "impuesto", etiqueta: "Company income tax", formato: "moneda", destacada: true },
    { clave: "tasa", etiqueta: "Tax rate", formato: "porcentaje", decimales: 0 },
    { clave: "despues", etiqueta: "Profit after tax", formato: "moneda" },
  ],
});
