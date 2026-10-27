import { definirCalculadora, porcentaje } from "@/motor/calculo";
import { loonbelastingPerJaar } from "../lib/belasting";

export default definirCalculadora({
  id: "sr.bonus-belasting-berekenen",
  mercado: "sr",
  concepto: "propio",
  slug: "bonus-belasting-berekenen",
  estado: "publicado",
  requiere: {
    "sr.belastingvrije-som": "numero",
    "sr.forfaitaire-aftrek": "numero",
    "sr.forfaitaire-aftrek-max": "numero",
    "sr.loonbelasting-tarief": "escala",
    "sr.vrijstelling-vakantie-bonus": "numero",
    "sr.aov-premie": "numero",
  },
  campos: [
    { id: "maandloon", tipo: "moneda", etiqueta: "Brutoloon per maand", min: 0, porDefecto: 15000 },
    { id: "bonus", tipo: "moneda", etiqueta: "Bonus of gratificatie (bruto)", min: 0, porDefecto: 20000 },
    { id: "zestigPlus", tipo: "si-no", etiqueta: "Je bent 60 jaar of ouder", porDefecto: false },
  ],
  calcular(entrada, valores, { redondear }) {
    const regels = {
      vrijeSom: valores["sr.belastingvrije-som"],
      aftrekPercentage: valores["sr.forfaitaire-aftrek"],
      aftrekMax: valores["sr.forfaitaire-aftrek-max"],
      tarief: valores["sr.loonbelasting-tarief"],
    };
    const vrijgesteld = Math.min(entrada.bonus, entrada.maandloon, valores["sr.vrijstelling-vakantie-bonus"]);
    const belastbaar = entrada.bonus - vrijgesteld;
    // Artikel 17: de bijzondere beloning wordt over de twaalf maanden van het jaar verdeeld en bij het
    // gewone loon geteld; de belasting is het verschil met de belasting zonder bonus.
    const zonder = loonbelastingPerJaar(entrada.maandloon * 12, regels);
    const met = loonbelastingPerJaar(entrada.maandloon * 12 + belastbaar, regels);
    const loonbelasting = redondear(met.belasting - zonder.belasting);
    const aovPremie = entrada.zestigPlus ? 0 : redondear(porcentaje(met.zuiverLoon - zonder.zuiverLoon, valores["sr.aov-premie"]));
    return {
      netto: redondear(entrada.bonus - loonbelasting - aovPremie),
      vrijgesteld: redondear(vrijgesteld),
      belastbaar: redondear(belastbaar),
      loonbelasting,
      aovPremie,
    };
  },
  resultado: [
    { clave: "netto", etiqueta: "Netto bonus", formato: "moneda", destacada: true },
    { clave: "vrijgesteld", etiqueta: "Vrij van loonbelasting", formato: "moneda" },
    { clave: "belastbaar", etiqueta: "Belast deel", formato: "moneda" },
    { clave: "loonbelasting", etiqueta: "Loonbelasting op de bonus", formato: "moneda" },
    { clave: "aovPremie", etiqueta: "AOV-premie op de bonus", formato: "moneda" },
  ],
});
