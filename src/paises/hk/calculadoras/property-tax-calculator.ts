import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "hk.property-tax-calculator",
  mercado: "hk",
  concepto: "propio",
  slug: "property-tax-calculator",
  estado: "publicado",
  requiere: {
    "hk.property-tax-rate": "numero",
    "hk.property-repairs-allowance": "numero",
  },
  campos: [
    { id: "renta", tipo: "moneda", etiqueta: "Rent receivable for the year of assessment", min: 0, porDefecto: 120000 },
    { id: "meses", tipo: "entero", etiqueta: "Months the property was let in the year", min: 1, max: 12, porDefecto: 12 },
    { id: "incobrable", tipo: "moneda", etiqueta: "Rent you couldn't recover", min: 0, porDefecto: 0 },
    { id: "rates", tipo: "moneda", etiqueta: "Rates paid by you as the owner", min: 0, porDefecto: 0 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.renta <= 0) throw new ErrorEntrada("Enter the rent for the year.", "renta");
    if (entrada.incobrable > entrada.renta) throw new ErrorEntrada("Irrecoverable rent can't be more than the rent.", "incobrable");
    const valorTasable = redondear(entrada.renta - entrada.incobrable);
    const trasRates = Math.max(0, valorTasable - entrada.rates);
    const asignacion = redondear(porcentaje(trasRates, v["hk.property-repairs-allowance"]));
    const valorNeto = redondear(trasRates - asignacion);
    const impuesto = redondear(porcentaje(valorNeto, v["hk.property-tax-rate"]));
    const provisional = redondear(porcentaje((valorNeto * 12) / entrada.meses, v["hk.property-tax-rate"]));
    const observaciones: string[] = [];
    if (entrada.meses < 12) observaciones.push("The letting started during the year, so next year's provisional tax uses the net assessable value grossed up to 12 months.");
    return {
      valorTasable,
      asignacion,
      valorNeto,
      impuesto,
      provisional,
      total: redondear(impuesto + provisional),
      observaciones,
    };
  },
  resultado: [
    { clave: "impuesto", etiqueta: "Property tax for the year", formato: "moneda", destacada: true },
    { clave: "provisional", etiqueta: "Provisional property tax for next year", formato: "moneda" },
    { clave: "total", etiqueta: "Total on the notice of assessment", formato: "moneda" },
    { clave: "valorTasable", etiqueta: "Assessable value", formato: "moneda" },
    { clave: "asignacion", etiqueta: "Allowance for repairs and outgoings", formato: "moneda" },
    { clave: "valorNeto", etiqueta: "Net assessable value", formato: "moneda" },
  ],
});
