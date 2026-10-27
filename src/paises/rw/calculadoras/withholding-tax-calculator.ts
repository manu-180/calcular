import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "rw.withholding-tax-calculator",
  mercado: "rw",
  concepto: "propio",
  slug: "withholding-tax-calculator",
  estado: "publicado",
  requiere: {
    "rw.wht-rate": "numero",
    "rw.wht-board": "numero",
    "rw.wht-imports": "numero",
    "rw.wht-tenders": "numero",
  },
  campos: [
    {
      id: "tipo",
      tipo: "opcion",
      etiqueta: "Type of payment",
      opciones: [
        { valor: "dividends", etiqueta: "Dividends, interest or royalties" },
        { valor: "unregistered", etiqueta: "Payment to a person not registered with the RRA" },
        { valor: "tender", etiqueta: "Public tender" },
        { valor: "board", etiqueta: "Board member allowance" },
        { valor: "imports", etiqueta: "Goods imported for business (CIF value)" },
      ],
      porDefecto: "dividends",
    },
    { id: "monto", tipo: "moneda", etiqueta: "Amount paid, without VAT", min: 0, porDefecto: 1000000 },
    { id: "registrado", tipo: "si-no", etiqueta: "The supplier is registered and has filed its latest income tax return", porDefecto: true, visibleSi: { tipo: ["tender"] } },
  ],
  calcular(e, v, { redondear }) {
    if (e.monto <= 0) throw new ErrorEntrada("Enter the amount paid.", "monto");
    let tasa: number;
    if (e.tipo === "board") tasa = v["rw.wht-board"];
    else if (e.tipo === "imports") tasa = v["rw.wht-imports"];
    else if (e.tipo === "tender") tasa = e.registrado === false ? v["rw.wht-rate"] : v["rw.wht-tenders"];
    else tasa = v["rw.wht-rate"];
    const impuesto = redondear(porcentaje(e.monto, tasa));
    const observaciones: string[] = [];
    if (e.tipo === "tender" || e.tipo === "imports") observaciones.push("A registered taxpayer deducts this tax from income tax when filing. Holders of a Quitus Fiscal are exempt.");
    if (e.tipo === "imports") observaciones.push("Paid at customs before the goods are released.");
    return { impuesto, neto: e.tipo === "imports" ? null : redondear(e.monto - impuesto), tasa, observaciones };
  },
  resultado: [
    { clave: "impuesto", etiqueta: "Withholding tax", formato: "moneda", destacada: true },
    { clave: "neto", etiqueta: "Amount the payee receives", formato: "moneda" },
    { clave: "tasa", etiqueta: "Rate", formato: "porcentaje", decimales: 0 },
  ],
});
