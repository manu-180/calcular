import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "rw.property-tax-calculator",
  mercado: "rw",
  concepto: "propio",
  slug: "property-tax-calculator",
  estado: "publicado",
  requiere: {
    "rw.property-residential": "numero",
    "rw.property-residential-3": "numero",
    "rw.property-residential-4": "numero",
    "rw.property-commercial": "numero",
    "rw.property-industrial": "numero",
    "rw.land-max": "numero",
  },
  campos: [
    {
      id: "bien",
      tipo: "opcion",
      etiqueta: "What you own",
      opciones: [
        { valor: "residential", etiqueta: "Residential building of one or two floors" },
        { valor: "residential-3", etiqueta: "Residential building of three floors" },
        { valor: "residential-4", etiqueta: "Residential building of more than three floors" },
        { valor: "commercial", etiqueta: "Commercial building" },
        { valor: "industrial", etiqueta: "Industrial building, or one used by a micro or small business" },
        { valor: "land", etiqueta: "Plot of land" },
      ],
      porDefecto: "residential",
    },
    {
      id: "valor",
      tipo: "moneda",
      etiqueta: "Market value of the building and its plot",
      min: 0,
      porDefecto: 50000000,
      visibleSi: { bien: ["residential", "residential-3", "residential-4", "commercial", "industrial"] },
    },
    { id: "vivienda", tipo: "si-no", etiqueta: "It is the home you live in", porDefecto: false, visibleSi: { bien: ["residential", "residential-3", "residential-4"] } },
    { id: "superficie", tipo: "numero", etiqueta: "Plot area in square metres", min: 0, porDefecto: 600, visibleSi: { bien: ["land"] } },
    {
      id: "tasaTierra",
      tipo: "moneda",
      etiqueta: "District land rate per square metre",
      min: 0,
      porDefecto: 80,
      visibleSi: { bien: ["land"] },
      ayuda: "Each district council sets it, from zero up to the legal maximum.",
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.bien === "land") {
      const superficie = e.superficie ?? 0;
      const tasa = e.tasaTierra ?? 0;
      if (superficie <= 0) throw new ErrorEntrada("Enter the plot area.", "superficie");
      if (tasa > v["rw.land-max"]) throw new ErrorEntrada(`The land rate cannot be more than RWF ${v["rw.land-max"]} per square metre.`, "tasaTierra");
      return { impuesto: redondear(superficie * tasa), tasa: null, observaciones: [] as string[] };
    }
    const valor = e.valor ?? 0;
    if (valor <= 0) throw new ErrorEntrada("Enter the market value.", "valor");
    if (e.vivienda) {
      return { impuesto: 0, tasa: 0, observaciones: ["One building that the owner uses as the family home is exempt, with its annexes on the same residential plot."] };
    }
    const tasas: Record<string, number> = {
      residential: v["rw.property-residential"],
      "residential-3": v["rw.property-residential-3"],
      "residential-4": v["rw.property-residential-4"],
      commercial: v["rw.property-commercial"],
      industrial: v["rw.property-industrial"],
    };
    const tasa = tasas[e.bien];
    const observaciones = e.bien === "commercial" || e.bien === "industrial" ? ["Machinery and equipment attached to the building are left out of its value."] : [];
    return { impuesto: redondear(porcentaje(valor, tasa)), tasa, observaciones };
  },
  resultado: [
    { clave: "impuesto", etiqueta: "Property tax for the year", formato: "moneda", destacada: true },
    { clave: "tasa", etiqueta: "Rate on market value", formato: "porcentaje", decimales: 2 },
  ],
});
