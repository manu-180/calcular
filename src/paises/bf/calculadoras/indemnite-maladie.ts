import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

type Mapa = Readonly<Record<string, number>>;

// Article 113 : les tranches se lisent ici en années complètes d'ancienneté (0, 1 à 5, 6 à 10,
// 11 à 15, puis 16 et plus).
function selon(annees: number, m: Mapa): number {
  let valeur = 0;
  let seuilRetenu = -1;
  for (const [seuil, mois] of Object.entries(m)) {
    if (annees >= Number(seuil) && Number(seuil) > seuilRetenu) {
      seuilRetenu = Number(seuil);
      valeur = mois;
    }
  }
  return valeur;
}

export default definirCalculadora({
  id: "bf.indemnite-maladie",
  mercado: "bf",
  concepto: "propio",
  slug: "indemnite-maladie",
  estado: "publicado",
  requiere: { "bf.maladie-plein-salaire": "mapa", "bf.maladie-demi-salaire": "mapa" },
  campos: [
    { id: "annees", tipo: "entero", etiqueta: "Années complètes d'ancienneté dans l'entreprise", min: 0, max: 60, porDefecto: 3 },
    { id: "salaire", tipo: "moneda", etiqueta: "Salaire mensuel", min: 0, porDefecto: 150000 },
    {
      id: "absence",
      tipo: "numero",
      etiqueta: "Mois d'absence pour maladie dans l'année civile",
      min: 0,
      max: 12,
      porDefecto: 2,
    },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.salaire < 0) throw new ErrorEntrada("Le salaire ne peut pas être négatif.", "salaire");
    if (entrada.absence < 0) throw new ErrorEntrada("La durée d'absence ne peut pas être négative.", "absence");
    const plein = selon(entrada.annees, v["bf.maladie-plein-salaire"]);
    const demi = selon(entrada.annees, v["bf.maladie-demi-salaire"]);
    const moisPlein = Math.min(entrada.absence, plein);
    const moisDemi = Math.min(Math.max(entrada.absence - plein, 0), demi);
    return {
      indemnite: redondear(moisPlein * entrada.salaire + (moisDemi * entrada.salaire) / 2),
      plein,
      demi,
      moisSansIndemnite: Math.max(entrada.absence - plein - demi, 0),
      maximum: redondear(plein * entrada.salaire + (demi * entrada.salaire) / 2),
    };
  },
  resultado: [
    { clave: "indemnite", etiqueta: "Indemnité due pour cette absence", formato: "moneda", destacada: true },
    { clave: "plein", etiqueta: "Mois à plein salaire", formato: "meses" },
    { clave: "demi", etiqueta: "Mois à demi-salaire", formato: "meses" },
    { clave: "moisSansIndemnite", etiqueta: "Mois d'absence non indemnisés par l'employeur", formato: "meses", decimales: 1, ocultarSiCero: true },
    { clave: "maximum", etiqueta: "Maximum dans l'année civile", formato: "moneda" },
  ],
});
