import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "gm.fringe-benefits-tax",
  mercado: "gm",
  concepto: "propio",
  slug: "fringe-benefits-tax",
  estado: "publicado",
  requiere: {
    "gm.fringe-benefits-rate": "numero",
  },
  campos: [
    { id: "vivienda", tipo: "moneda", etiqueta: "Housing provided, net of any rent the employee pays", min: 0, porDefecto: 75000 },
    { id: "vehiculo", tipo: "moneda", etiqueta: "Private use of vehicles and fuel", min: 0, porDefecto: 0 },
    { id: "otros", tipo: "moneda", etiqueta: "Other benefits (household staff, loans, insurance)", min: 0, porDefecto: 0 },
  ],
  calcular(entrada, v, { redondear }) {
    const valor = entrada.vivienda + entrada.vehiculo + entrada.otros;
    if (valor <= 0) throw new ErrorEntrada("Enter the value of at least one benefit.", "vivienda");
    const r = v["gm.fringe-benefits-rate"] / 100;
    const gravable = valor / (1 - r);
    return {
      impuesto: redondear(gravable * r),
      valor: redondear(valor),
      gravable: redondear(gravable),
      trimestral: redondear((gravable * r) / 4),
    };
  },
  resultado: [
    { clave: "impuesto", etiqueta: "Fringe benefits tax for the year", formato: "moneda", destacada: true },
    { clave: "valor", etiqueta: "Fair value of the benefits", formato: "moneda" },
    { clave: "gravable", etiqueta: "Taxable fringe benefits (grossed up)", formato: "moneda" },
    { clave: "trimestral", etiqueta: "Quarterly instalment", formato: "moneda" },
  ],
});
