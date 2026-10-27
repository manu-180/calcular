import { aplicarEscalaMarginal, definirCalculadora, porcentaje } from "@/motor/calculo";
import { marginaalTarief } from "../lib/belasting";

export default definirCalculadora({
  id: "sr.inkomstenbelasting-berekenen",
  mercado: "sr",
  concepto: "propio",
  slug: "inkomstenbelasting-berekenen",
  estado: "publicado",
  requiere: {
    "sr.ib-tarief": "escala",
    "sr.aov-premie": "numero",
  },
  campos: [
    {
      id: "zuiverInkomen",
      tipo: "moneda",
      etiqueta: "Zuiver inkomen per jaar",
      min: 0,
      porDefecto: 300000,
      ayuda: "Je inkomen na aftrek van de kosten en de persoonlijke aftrekposten, zoals hypotheekrente.",
    },
    { id: "zestigPlus", tipo: "si-no", etiqueta: "Je bent 60 jaar of ouder", porDefecto: false },
  ],
  calcular(entrada, valores, { redondear }) {
    const belasting = redondear(aplicarEscalaMarginal(valores["sr.ib-tarief"], entrada.zuiverInkomen));
    const aovPremie = entrada.zestigPlus ? 0 : redondear(porcentaje(entrada.zuiverInkomen, valores["sr.aov-premie"]));
    const totaal = redondear(belasting + aovPremie);
    return {
      belasting,
      aovPremie,
      totaal,
      overig: redondear(entrada.zuiverInkomen - totaal),
      gemiddeld: entrada.zuiverInkomen > 0 ? redondear((belasting / entrada.zuiverInkomen) * 100) : 0,
      marginaal: marginaalTarief(valores["sr.ib-tarief"], entrada.zuiverInkomen),
    };
  },
  resultado: [
    { clave: "belasting", etiqueta: "Inkomstenbelasting per jaar", formato: "moneda", destacada: true },
    { clave: "aovPremie", etiqueta: "AOV-premie per jaar", formato: "moneda" },
    { clave: "totaal", etiqueta: "Belasting en premie samen", formato: "moneda" },
    { clave: "overig", etiqueta: "Wat overblijft van je zuiver inkomen", formato: "moneda" },
    { clave: "gemiddeld", etiqueta: "Gemiddeld tarief inkomstenbelasting", formato: "porcentaje", decimales: 2 },
    { clave: "marginaal", etiqueta: "Tarief over je laatste dollar", formato: "porcentaje" },
  ],
});
