import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "tt.severance-tax-calculator",
  mercado: "tt",
  concepto: "propio",
  slug: "severance-tax-calculator",
  estado: "publicado",
  requiere: {
    "tt.severance-exemption": "numero",
    "tt.income-tax-rate": "numero",
    "tt.income-tax-higher-rate": "numero",
    "tt.income-tax-higher-band": "numero",
  },
  campos: [
    {
      id: "tipo",
      tipo: "opcion",
      etiqueta: "What are you being paid?",
      opciones: [
        { valor: "severance", etiqueta: "Severance pay" },
        { valor: "gratuity", etiqueta: "Contract gratuity" },
      ],
      porDefecto: "severance",
    },
    { id: "monto", tipo: "moneda", etiqueta: "Amount of the payment", min: 0, porDefecto: 300000 },
    {
      id: "tasaPromedio",
      tipo: "porcentaje",
      etiqueta: "Your average rate of tax in the previous income year",
      min: 0,
      max: 30,
      porDefecto: 0,
      visibleSi: { tipo: ["severance"] },
      ayuda: "Tax for that year divided by your total income. Only needed if the severance is above the exempt amount.",
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.monto <= 0) throw new ErrorEntrada("Enter the amount of the payment.", "monto");
    const observaciones: string[] = [];
    let exento = 0;
    let gravado = e.monto;
    let impuesto: number;
    if (e.tipo === "severance") {
      exento = Math.min(e.monto, v["tt.severance-exemption"]);
      gravado = e.monto - exento;
      const tasa = e.tasaPromedio ?? 0;
      if (gravado > 0 && tasa === 0) observaciones.push("Enter your average rate of tax from last year to see the tax on the part above the exempt amount.");
      impuesto = redondear(porcentaje(gravado, tasa));
      if (gravado === 0) observaciones.push("The whole payment is within the exempt amount, so no tax is due.");
      observaciones.push("The exemption does not apply to casual, temporary, seasonal or contract workers, or to anyone with less than one year of service.");
    } else {
      const tramo = v["tt.income-tax-higher-band"];
      impuesto = redondear(porcentaje(Math.min(e.monto, tramo), v["tt.income-tax-rate"]) + porcentaje(Math.max(0, e.monto - tramo), v["tt.income-tax-higher-rate"]));
      observaciones.push("A contract gratuity has no exemption. It is taxed at the income tax rates on the full amount.");
    }
    return { neto: redondear(e.monto - impuesto), impuesto, exento: redondear(exento), gravado: redondear(gravado), observaciones };
  },
  resultado: [
    { clave: "neto", etiqueta: "Amount after tax", formato: "moneda", destacada: true },
    { clave: "impuesto", etiqueta: "Tax on the payment", formato: "moneda" },
    { clave: "exento", etiqueta: "Exempt part", formato: "moneda", ocultarSiCero: true },
    { clave: "gravado", etiqueta: "Taxable part", formato: "moneda" },
  ],
});
