import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "cm.calcul-patente",
  mercado: "cm",
  concepto: "propio",
  slug: "calcul-patente",
  estado: "publicado",
  requiere: { "cm.patente-taux": "mapa", "cm.patente-plancher": "mapa", "cm.patente-plafond": "mapa" },
  campos: [
    { id: "chiffreAffaires", tipo: "moneda", etiqueta: "Chiffre d'affaires du dernier exercice clos", min: 0, porDefecto: 300000000 },
    {
      id: "categorie",
      tipo: "opcion-dato",
      etiqueta: "Catégorie de l'entreprise",
      dato: "cm.patente-taux",
      porDefecto: "moyenne",
      ayuda: "Celle de la structure des impôts qui gère votre dossier : grandes entreprises, moyennes entreprises ou centre des impôts de rattachement.",
    },
    { id: "nouvelle", tipo: "si-no", etiqueta: "Entreprise dans sa première année d'activité", porDefecto: false },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.chiffreAffaires < 0) throw new ErrorEntrada("Le chiffre d'affaires ne peut pas être négatif.", "chiffreAffaires");
    const taux = enMapa(v["cm.patente-taux"], entrada.categorie);
    const brute = redondear(porcentaje(entrada.chiffreAffaires, taux));
    const plancher = enMapa(v["cm.patente-plancher"], entrada.categorie);
    const plafond = enMapa(v["cm.patente-plafond"], entrada.categorie);
    const patente = entrada.nouvelle ? 0 : Math.min(Math.max(brute, plancher), plafond);
    const observaciones: string[] = [];
    if (entrada.nouvelle) observaciones.push("Les entreprises nouvelles sont exonérées pendant douze mois, vingt-quatre si elles adhèrent à un centre de gestion agréé.");
    else if (brute < plancher) observaciones.push("Le taux donne moins que le minimum de votre catégorie : c'est le minimum qui s'applique.");
    else if (brute > plafond) observaciones.push("Le taux donne plus que le maximum de votre catégorie : la patente est plafonnée.");
    return { taux, brute, patente, observaciones };
  },
  resultado: [
    { clave: "patente", etiqueta: "Contribution des patentes de l'année", formato: "moneda", destacada: true },
    { clave: "taux", etiqueta: "Taux sur le chiffre d'affaires", formato: "porcentaje", decimales: 3 },
    { clave: "brute", etiqueta: "Montant avant minimum et maximum", formato: "moneda" },
  ],
});
