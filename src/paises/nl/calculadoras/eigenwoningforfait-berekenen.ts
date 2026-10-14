import { definirCalculadora } from "@/motor/calculo";
import { eigenwoningforfait } from "../lib/belasting";

export default definirCalculadora({
  id: "nl.eigenwoningforfait-berekenen",
  mercado: "nl",
  concepto: "propio",
  slug: "eigenwoningforfait-berekenen",
  estado: "publicado",
  requiere: {
    "nl.eigenwoningforfait": "escala",
    "nl.hillen": "numero",
  },
  campos: [
    { id: "woz", tipo: "moneda", etiqueta: "WOZ-waarde van je woning", min: 0, porDefecto: 400000 },
    { id: "maanden", tipo: "entero", etiqueta: "Maanden dat je er dit jaar woont", min: 1, max: 12, porDefecto: 12 },
  ],
  calcular(entrada, v, { redondear }) {
    const perJaar = eigenwoningforfait(entrada.woz, v["nl.eigenwoningforfait"]);
    const forfait = redondear((perJaar * entrada.maanden) / 12);
    const percentage = entrada.woz > 0 ? (perJaar / entrada.woz) * 100 : 0;
    return { forfait, perJaar: redondear(perJaar), percentage };
  },
  resultado: [
    { clave: "forfait", etiqueta: "Eigenwoningforfait", formato: "moneda", destacada: true },
    { clave: "perJaar", etiqueta: "Voor een heel jaar", formato: "moneda" },
    { clave: "percentage", etiqueta: "Percentage van de WOZ-waarde", formato: "porcentaje", decimales: 2 },
  ],
});
