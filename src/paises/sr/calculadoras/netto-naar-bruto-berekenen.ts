import { definirCalculadora } from "@/motor/calculo";
import { nettoloonPerMaand } from "../lib/belasting";

export default definirCalculadora({
  id: "sr.netto-naar-bruto-berekenen",
  mercado: "sr",
  concepto: "propio",
  slug: "netto-naar-bruto-berekenen",
  estado: "publicado",
  requiere: {
    "sr.belastingvrije-som": "numero",
    "sr.forfaitaire-aftrek": "numero",
    "sr.forfaitaire-aftrek-max": "numero",
    "sr.loonbelasting-tarief": "escala",
    "sr.aov-premie": "numero",
  },
  campos: [
    { id: "netto", tipo: "moneda", etiqueta: "Gewenst nettoloon per maand", min: 0, porDefecto: 12000 },
    { id: "zestigPlus", tipo: "si-no", etiqueta: "Je bent 60 jaar of ouder", porDefecto: false },
  ],
  calcular(entrada, valores, { redondear }) {
    const regels = {
      vrijeSom: valores["sr.belastingvrije-som"],
      aftrekPercentage: valores["sr.forfaitaire-aftrek"],
      aftrekMax: valores["sr.forfaitaire-aftrek-max"],
      tarief: valores["sr.loonbelasting-tarief"],
    };
    const netto = (bruto: number) => nettoloonPerMaand(bruto, 0, entrada.zestigPlus, regels, valores["sr.aov-premie"]);
    // Het netto stijgt altijd met het bruto (hoogste tarief plus AOV blijft onder 100%), dus halveren
    // tot op een tiende cent vindt het enige bruto dat bij het netto hoort.
    let laag = entrada.netto;
    let hoog = Math.max(1, entrada.netto * 3);
    for (let i = 0; i < 200 && hoog - laag > 0.001; i++) {
      const midden = (laag + hoog) / 2;
      if (netto(midden).netto < entrada.netto) laag = midden;
      else hoog = midden;
    }
    const bruto = redondear(hoog);
    const r = netto(bruto);
    return {
      bruto,
      loonbelasting: redondear(r.loonbelasting),
      aovPremie: redondear(r.aovPremie),
      brutoPerJaar: redondear(bruto * 12),
    };
  },
  resultado: [
    { clave: "bruto", etiqueta: "Benodigd brutoloon per maand", formato: "moneda", destacada: true },
    { clave: "loonbelasting", etiqueta: "Loonbelasting", formato: "moneda" },
    { clave: "aovPremie", etiqueta: "AOV-premie", formato: "moneda" },
    { clave: "brutoPerJaar", etiqueta: "Brutoloon per jaar", formato: "moneda" },
  ],
});
