import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { anciennete } from "../lib/travail";

type Mapa = Readonly<Record<string, number>>;

// Paliers du décret n° 96-200, article 1er : « de six ans à onze ans » commence le jour des six ans.
function moisSelonAnciennete(ans: number, cadre: boolean, m: Mapa): number {
  if (cadre) return ans < 16 ? m["cadres-jusqu-16-ans"] : m["cadres-plus-16-ans"];
  if (ans < 6) return m["jusqu-6-ans"];
  if (ans < 11) return m["6-11-ans"];
  if (ans < 16) return m["11-16-ans"];
  return m["plus-16-ans"];
}

export default definirCalculadora({
  id: "ci.preavis",
  mercado: "ci",
  concepto: "preaviso",
  slug: "preavis",
  estado: "publicado",
  requiere: { "ci.preavis-mois": "mapa", "ci.preavis-jours": "mapa" },
  campos: [
    {
      id: "categorie",
      tipo: "opcion",
      etiqueta: "Votre situation",
      opciones: [
        { valor: "horaire", etiqueta: "Payé à l'heure, à la journée, à la semaine ou à la quinzaine (catégories 1 à 5)" },
        { valor: "mensuel", etiqueta: "Payé au mois (catégories 1 à 5)" },
        { valor: "cadre", etiqueta: "6e catégorie et au-delà" },
      ],
      porDefecto: "mensuel",
    },
    { id: "annees", tipo: "entero", etiqueta: "Années complètes d'ancienneté", min: 0, max: 60, porDefecto: 3 },
    { id: "mois", tipo: "entero", etiqueta: "Mois en plus", min: 0, max: 11, porDefecto: 0 },
    { id: "incapacite", tipo: "si-no", etiqueta: "Incapacité permanente partielle de plus de 40 %", porDefecto: false },
    { id: "salaire", tipo: "moneda", etiqueta: "Salaire mensuel (pour l'indemnité compensatrice)", min: 0, porDefecto: 300000 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.salaire < 0) throw new ErrorEntrada("Le salaire ne peut pas être négatif.", "salaire");
    const ans = anciennete(entrada.annees, entrada.mois);
    let jours = 0;
    let mois = 0;
    if (entrada.categorie === "horaire" && ans < 1) jours = ans < 0.5 ? v["ci.preavis-jours"]["moins-6-mois"] : v["ci.preavis-jours"]["6-mois-1-an"];
    else mois = moisSelonAnciennete(ans, entrada.categorie === "cadre", v["ci.preavis-mois"]);
    if (entrada.incapacite && ans >= 0.5) {
      jours *= 2;
      mois *= 2;
    }
    const indemnite = redondear(entrada.salaire * mois + (entrada.salaire / 30) * jours);
    return {
      duree: mois > 0 ? `${mois} mois` : `${jours} jours`,
      mois,
      jours,
      indemnite,
      observaciones: jours > 0 ? ["Pour un préavis en jours, l'indemnité est estimée sur la base d'un mois de 30 jours."] : [],
    };
  },
  resultado: [
    { clave: "duree", etiqueta: "Durée du préavis", formato: "texto", destacada: true },
    { clave: "mois", etiqueta: "Préavis en mois", formato: "meses", ocultarSiCero: true },
    { clave: "jours", etiqueta: "Préavis en jours", formato: "dias", ocultarSiCero: true },
    { clave: "indemnite", etiqueta: "Indemnité compensatrice si le préavis n'est pas effectué", formato: "moneda" },
  ],
});
