import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "gh.vat-calculator",
  mercado: "gh",
  concepto: "iva",
  slug: "vat-calculator",
  estado: "publicado",
  requiere: {
    "gh.vat-rates": "mapa",
    "gh.vat-threshold-goods": "numero",
  },
  campos: [
    { id: "monto", tipo: "moneda", etiqueta: "Amount", min: 0, porDefecto: 1000 },
    {
      id: "modo",
      tipo: "opcion",
      etiqueta: "This amount is",
      opciones: [
        { valor: "exclusive", etiqueta: "Without VAT and levies" },
        { valor: "inclusive", etiqueta: "Including VAT and levies" },
      ],
      porDefecto: "exclusive",
    },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.monto <= 0) throw new ErrorEntrada("Enter an amount above zero.", "monto");
    const r = v["gh.vat-rates"];
    const total = r.vat + r.nhil + r.getfund;
    const base = entrada.modo === "exclusive" ? entrada.monto : entrada.monto / (1 + total / 100);
    const nhil = redondear(porcentaje(base, r.nhil));
    const getfund = redondear(porcentaje(base, r.getfund));
    const iva = redondear(porcentaje(base, r.vat));
    const baseR = redondear(base);
    return {
      totalImpuestos: redondear(nhil + getfund + iva),
      base: baseR,
      nhil,
      getfund,
      iva,
      final: redondear(baseR + nhil + getfund + iva),
      tasa: total,
    };
  },
  resultado: [
    { clave: "totalImpuestos", etiqueta: "VAT and levies", formato: "moneda", destacada: true },
    { clave: "base", etiqueta: "Value without VAT and levies", formato: "moneda" },
    { clave: "nhil", etiqueta: "NHIL", formato: "moneda" },
    { clave: "getfund", etiqueta: "GETFund Levy", formato: "moneda" },
    { clave: "iva", etiqueta: "VAT", formato: "moneda" },
    { clave: "final", etiqueta: "Total price", formato: "moneda" },
    { clave: "tasa", etiqueta: "Combined rate", formato: "porcentaje", decimales: 1 },
  ],
});
