import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "sc.immovable-property-tax-calculator",
  mercado: "sc",
  concepto: "propio",
  slug: "immovable-property-tax-calculator",
  estado: "publicado",
  requiere: { "sc.property-tax-rate": "numero" },
  campos: [
    { id: "valor", tipo: "moneda", etiqueta: "Approved market value of the property", min: 0, porDefecto: 5000000, ayuda: "The value on the notice from the Chief Valuation Officer, in rupees." },
    {
      id: "uso",
      tipo: "opcion",
      etiqueta: "How the property is used",
      opciones: [
        { valor: "residential", etiqueta: "Residential" },
        { valor: "commercial", etiqueta: "Commercial or industrial" },
      ],
      porDefecto: "residential",
    },
    { id: "casado", tipo: "si-no", etiqueta: "The owner is married to a Seychellois", porDefecto: false },
    { id: "primerAnio", tipo: "si-no", etiqueta: "First year of owning a first residential property (bought after 1 January 2020)", porDefecto: false },
  ],
  calcular(e, v, { redondear }) {
    if (e.valor <= 0) throw new ErrorEntrada("Enter the approved market value.", "valor");
    let motivo = "";
    if (e.uso === "commercial") motivo = "Commercial and industrial property is exempt.";
    else if (e.casado) motivo = "Residential property owned by a taxpayer married to a Seychellois is exempt.";
    else if (e.primerAnio) motivo = "A first time owner of residential property is exempt for one year, on written application.";
    const impuesto = motivo ? 0 : redondear(porcentaje(e.valor, v["sc.property-tax-rate"]));
    return { impuesto, exencion: motivo || "No exemption applies", tasa: v["sc.property-tax-rate"] };
  },
  resultado: [
    { clave: "impuesto", etiqueta: "Immovable property tax for the year", formato: "moneda", destacada: true },
    { clave: "tasa", etiqueta: "Rate on market value", formato: "porcentaje", decimales: 2 },
    { clave: "exencion", etiqueta: "Exemption", formato: "texto" },
  ],
});
