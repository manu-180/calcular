import { definirCalculadora } from "@/motor/calculo";
import { clePart, nombreDeParts, SITUATIONS } from "../lib/impot";

export default definirCalculadora({
  id: "sn.calcul-nombre-de-parts",
  mercado: "sn",
  concepto: "propio",
  slug: "calcul-nombre-de-parts",
  estado: "publicado",
  requiere: {
    "sn.ir-reduction-taux": "mapa",
    "sn.ir-reduction-min": "mapa",
    "sn.ir-reduction-max": "mapa",
  },
  campos: [
    { id: "situation", tipo: "opcion", etiqueta: "Situation de famille", opciones: SITUATIONS, porDefecto: "marie" },
    { id: "enfants", tipo: "entero", etiqueta: "Enfants à charge", min: 0, max: 20, porDefecto: 2 },
    { id: "conjointSansRevenu", tipo: "si-no", etiqueta: "Votre conjoint n'a pas de revenus imposables", porDefecto: false, visibleSi: { situation: ["marie"] } },
  ],
  calcular(e, v) {
    const parts = nombreDeParts(e.situation, e.enfants, e.conjointSansRevenu === true);
    const cle = clePart(parts);
    return {
      parts,
      taux: v["sn.ir-reduction-taux"][cle] ?? 0,
      minimum: v["sn.ir-reduction-min"][cle] ?? 0,
      maximum: v["sn.ir-reduction-max"][cle] ?? 0,
    };
  },
  resultado: [
    { clave: "parts", etiqueta: "Nombre de parts", formato: "numero", decimales: 1, destacada: true },
    { clave: "taux", etiqueta: "Réduction d'impôt pour charges de famille", formato: "porcentaje", decimales: 0 },
    { clave: "minimum", etiqueta: "Réduction minimale", formato: "moneda" },
    { clave: "maximum", etiqueta: "Réduction maximale", formato: "moneda" },
  ],
});
