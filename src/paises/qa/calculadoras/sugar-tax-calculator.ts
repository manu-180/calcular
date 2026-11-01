import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "qa.sugar-tax-calculator",
  mercado: "qa",
  concepto: "propio",
  slug: "sugar-tax-calculator",
  estado: "publicado",
  requiere: {
    "qa.sugar-tax": "mapa",
    "qa.sugar-tax-tiers": "mapa",
  },
  campos: [
    { id: "azucar", tipo: "numero", etiqueta: "Total sugar per 100 ml (grams)", min: 0, max: 100, porDefecto: 10.6 },
    { id: "soloArtificial", tipo: "si-no", etiqueta: "Only artificial sweeteners, no added sugar", porDefecto: false },
    { id: "ml", tipo: "numero", etiqueta: "Size of each can or bottle (ml)", min: 1, max: 10000, porDefecto: 330 },
    { id: "unidades", tipo: "entero", etiqueta: "Number of cans or bottles", min: 1, max: 1000000, porDefecto: 24 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.ml <= 0) throw new ErrorEntrada("Enter the size of each can or bottle.", "ml");
    const tasas = v["qa.sugar-tax"];
    const tramos = v["qa.sugar-tax-tiers"];
    let porLitro = 0;
    let tramo = "Exempt: low sugar";
    if (entrada.soloArtificial) tramo = "Exempt: artificial sweeteners only";
    else if (entrada.azucar >= enMapa(tramos, "high")) {
      porLitro = enMapa(tasas, "high");
      tramo = "High sugar";
    } else if (entrada.azucar >= enMapa(tramos, "medium")) {
      porLitro = enMapa(tasas, "medium");
      tramo = "Medium sugar";
    }
    const litros = (entrada.ml * entrada.unidades) / 1000;
    return { total: redondear(porLitro * litros), porUnidad: redondear((porLitro * entrada.ml) / 1000), porLitro, litros: redondear(litros), tramo };
  },
  resultado: [
    { clave: "total", etiqueta: "Excise tax for all units", formato: "moneda", destacada: true },
    { clave: "tramo", etiqueta: "Sugar tier", formato: "texto" },
    { clave: "porLitro", etiqueta: "Tax per litre", formato: "moneda" },
    { clave: "porUnidad", etiqueta: "Tax per can or bottle", formato: "moneda" },
    { clave: "litros", etiqueta: "Total litres", formato: "numero", decimales: 2 },
  ],
});
