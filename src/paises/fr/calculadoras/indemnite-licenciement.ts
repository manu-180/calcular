import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { indemniteLegale, REQUIERE_INDEMNITE, salaireDeReference } from "../lib/indemnite";

export default definirCalculadora({
  id: "fr.indemnite-licenciement",
  mercado: "fr",
  concepto: "indemnizacion-despido",
  slug: "indemnite-licenciement",
  estado: "publicado",
  requiere: {
    ...REQUIERE_INDEMNITE,
    "fr.lic-anciennete-min": "numero",
  },
  campos: [
    { id: "moyenne12", tipo: "moneda", etiqueta: "Salaire brut mensuel moyen des 12 derniers mois", min: 0, porDefecto: 2500 },
    {
      id: "moyenne3",
      tipo: "moneda",
      etiqueta: "Salaire brut mensuel moyen des 3 derniers mois",
      min: 0,
      requerido: false,
      ayuda: "Facultatif. Le montant le plus favorable des deux est retenu. Ajoutez 1/12 des primes annuelles à chaque mois.",
    },
    { id: "annees", tipo: "entero", etiqueta: "Ancienneté : années complètes", min: 0, max: 60, porDefecto: 5 },
    { id: "mois", tipo: "entero", etiqueta: "Ancienneté : mois en plus", min: 0, max: 11, porDefecto: 0 },
    {
      id: "motif",
      tipo: "opcion",
      etiqueta: "Motif du licenciement",
      opciones: [
        { valor: "personnel", etiqueta: "Motif personnel ou économique" },
        { valor: "faute-grave", etiqueta: "Faute grave ou lourde" },
      ],
      porDefecto: "personnel",
    },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.moyenne12 <= 0) throw new ErrorEntrada("Indiquez votre salaire brut moyen.", "moyenne12");
    const reference = redondear(salaireDeReference(entrada.moyenne12, entrada.moyenne3));
    const moisAnciennete = entrada.annees * 12 + entrada.mois;
    const observaciones: string[] = [];
    let indemnite = 0;
    if (entrada.motif === "faute-grave") {
      observaciones.push("Un licenciement pour faute grave ou lourde ne donne pas droit à l'indemnité légale.");
    } else if (moisAnciennete < valores["fr.lic-anciennete-min"]) {
      observaciones.push(`L'indemnité légale demande au moins ${valores["fr.lic-anciennete-min"]} mois d'ancienneté ininterrompue chez le même employeur.`);
    } else {
      indemnite = redondear(indemniteLegale(reference, entrada.annees, entrada.mois, valores));
    }
    observaciones.push("Votre convention collective ou votre contrat peut prévoir une indemnité plus élevée : c'est alors elle qui s'applique.");
    return {
      reference,
      anciennete: redondear(moisAnciennete / 12),
      indemnite,
      enMois: reference > 0 ? redondear(indemnite / reference) : 0,
      observaciones,
    };
  },
  resultado: [
    { clave: "reference", etiqueta: "Salaire de référence", formato: "moneda" },
    { clave: "anciennete", etiqueta: "Ancienneté retenue", formato: "anios", decimales: 2 },
    { clave: "indemnite", etiqueta: "Indemnité légale de licenciement (minimum)", formato: "moneda", destacada: true },
    { clave: "enMois", etiqueta: "Soit en mois de salaire", formato: "numero", decimales: 2 },
  ],
});
