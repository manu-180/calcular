import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "bw.company-tax-calculator",
  mercado: "bw",
  concepto: "propio",
  slug: "company-tax-calculator",
  estado: "publicado",
  requiere: {
    "bw.company-tax": "mapa",
    "bw.wht-resident": "mapa",
  },
  campos: [
    { id: "gravable", tipo: "moneda", etiqueta: "Taxable income of the company for the year", min: 0, porDefecto: 1000000 },
    { id: "tipo", tipo: "opcion-dato", etiqueta: "Type of company", dato: "bw.company-tax", porDefecto: "general" },
    {
      id: "reparto",
      tipo: "porcentaje",
      etiqueta: "Share of the profit after tax paid out as dividends",
      min: 0,
      max: 100,
      porDefecto: 0,
    },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.gravable <= 0) throw new ErrorEntrada("Enter the taxable income.", "gravable");
    const tasa = enMapa(v["bw.company-tax"], entrada.tipo);
    const impuesto = redondear(porcentaje(entrada.gravable, tasa));
    const despues = redondear(entrada.gravable - impuesto);
    const dividendos = redondear(porcentaje(despues, entrada.reparto));
    const retencion = redondear(porcentaje(dividendos, v["bw.wht-resident"].dividends));
    return {
      impuesto,
      tasa,
      despues,
      dividendos,
      retencion,
      netoAccionistas: redondear(dividendos - retencion),
    };
  },
  resultado: [
    { clave: "impuesto", etiqueta: "Company income tax", formato: "moneda", destacada: true },
    { clave: "tasa", etiqueta: "Tax rate", formato: "porcentaje", decimales: 1 },
    { clave: "despues", etiqueta: "Profit after tax", formato: "moneda" },
    { clave: "dividendos", etiqueta: "Dividends paid", formato: "moneda", ocultarSiCero: true },
    { clave: "retencion", etiqueta: "Withholding tax on the dividends", formato: "moneda", ocultarSiCero: true },
    { clave: "netoAccionistas", etiqueta: "Dividends the shareholders receive", formato: "moneda", ocultarSiCero: true },
  ],
});
