import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "tz.capital-gains-tax-calculator",
  mercado: "tz",
  concepto: "propio",
  slug: "capital-gains-tax-calculator",
  estado: "publicado",
  requiere: {
    "tz.cgt-land-resident": "numero",
    "tz.cgt-land-non-resident": "numero",
    "tz.cgt-land-no-records": "numero",
    "tz.cgt-residence-exempt-gain": "numero",
  },
  campos: [
    { id: "venta", tipo: "moneda", etiqueta: "Selling price of the land or building", min: 0, porDefecto: 150000000 },
    { id: "conCosto", tipo: "si-no", etiqueta: "You have documents that prove what it cost", porDefecto: true },
    { id: "costo", tipo: "moneda", etiqueta: "Purchase price and acquisition costs", min: 0, porDefecto: 90000000, visibleSi: { conCosto: [true] } },
    { id: "mejoras", tipo: "moneda", etiqueta: "Improvement, maintenance and repair costs", min: 0, porDefecto: 10000000, visibleSi: { conCosto: [true] } },
    { id: "gastosVenta", tipo: "moneda", etiqueta: "Costs of selling (legal, agent, valuation)", min: 0, porDefecto: 5000000, visibleSi: { conCosto: [true] } },
    {
      id: "residencia",
      tipo: "opcion",
      etiqueta: "The seller is",
      opciones: [
        { valor: "resident", etiqueta: "Resident in Tanzania" },
        { valor: "non-resident", etiqueta: "Non-resident" },
      ],
      porDefecto: "resident",
    },
    { id: "vivienda", tipo: "si-no", etiqueta: "It is your home, owned and lived in for three years or more" },
  ],
  calcular(e, v, { redondear }) {
    if (e.venta <= 0) throw new ErrorEntrada("Enter the selling price.", "venta");
    const observaciones: string[] = [];
    if (!e.conCosto) {
      const impuesto = redondear(porcentaje(e.venta, v["tz.cgt-land-no-records"]));
      observaciones.push("Without documents for the cost, the tax is a share of the selling price.");
      return { impuesto, ganancia: null, tasa: v["tz.cgt-land-no-records"], observaciones };
    }
    const ganancia = redondear(e.venta - (e.costo ?? 0) - (e.mejoras ?? 0) - (e.gastosVenta ?? 0));
    const tasa = e.residencia === "resident" ? v["tz.cgt-land-resident"] : v["tz.cgt-land-non-resident"];
    let impuesto = ganancia > 0 ? redondear(porcentaje(ganancia, tasa)) : 0;
    if (e.vivienda && ganancia > 0 && ganancia <= v["tz.cgt-residence-exempt-gain"]) {
      impuesto = 0;
      observaciones.push("A gain this size on your own home is exempt.");
    }
    if (ganancia <= 0) observaciones.push("There is no gain, so no tax is due.");
    return { impuesto, ganancia, tasa, observaciones };
  },
  resultado: [
    { clave: "impuesto", etiqueta: "Tax to pay before the transfer", formato: "moneda", destacada: true },
    { clave: "ganancia", etiqueta: "Gain", formato: "moneda" },
    { clave: "tasa", etiqueta: "Rate applied", formato: "porcentaje", decimales: 0 },
  ],
});
