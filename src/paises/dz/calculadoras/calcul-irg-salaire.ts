import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { irgMensuel, REQ_PAIE } from "../lib/irg";

const REGLES = {
  exonere: "Votre revenu imposable ne dépasse pas le seuil d'exonération totale : aucun IRG n'est retenu.",
  lissage: "Votre revenu imposable se situe dans la zone du deuxième abattement : l'impôt est réduit par la formule de lissage.",
  "lissage-special": "Vous bénéficiez de l'abattement supplémentaire réservé aux travailleurs handicapés et aux retraités du régime général.",
  bareme: "L'impôt est celui du barème, diminué de l'abattement proportionnel.",
} as const;

export default definirCalculadora({
  id: "dz.calcul-irg-salaire",
  mercado: "dz",
  concepto: "impuesto-renta",
  slug: "calcul-irg-salaire",
  estado: "publicado",
  requiere: { ...REQ_PAIE, "dz.irg-primes": "numero" },
  campos: [
    { id: "montant", tipo: "moneda", etiqueta: "Montant mensuel", min: 0, porDefecto: 60000 },
    {
      id: "base",
      tipo: "opcion",
      etiqueta: "Ce montant est",
      opciones: [
        { valor: "brut", etiqueta: "Un salaire brut (avant la cotisation de sécurité sociale)" },
        { valor: "imposable", etiqueta: "Un revenu imposable (cotisation déjà déduite) ou une pension" },
      ],
      porDefecto: "brut",
    },
    {
      id: "special",
      tipo: "si-no",
      etiqueta: "Travailleur handicapé ou retraité du régime général",
      porDefecto: false,
      ayuda: "Handicap moteur ou mental, non-voyant ou sourd-muet. Ouvre droit à un abattement supplémentaire sur les revenus modestes.",
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.montant <= 0) throw new ErrorEntrada("Indiquez un montant supérieur à zéro.", "montant");
    const cnas = e.base === "brut" ? redondear(porcentaje(e.montant, v["dz.cnas"].salarie)) : 0;
    const imposable = redondear(e.montant - cnas);
    const r = irgMensuel(imposable, e.special, v, redondear);
    return {
      irg: r.irg,
      imposable,
      cnas: e.base === "brut" ? cnas : null,
      bareme: r.bareme,
      abattement: r.abattement,
      apresImpot: redondear(imposable - r.irg),
      tauxMoyen: imposable > 0 ? (r.irg / imposable) * 100 : 0,
      irgAnnuel: redondear(r.irg * 12),
      observaciones: [REGLES[r.regle]],
    };
  },
  resultado: [
    { clave: "irg", etiqueta: "IRG retenu chaque mois", formato: "moneda", destacada: true },
    { clave: "imposable", etiqueta: "Revenu mensuel imposable", formato: "moneda" },
    { clave: "cnas", etiqueta: "Cotisation de sécurité sociale déduite", formato: "moneda" },
    { clave: "bareme", etiqueta: "Impôt du barème avant abattement", formato: "moneda" },
    { clave: "abattement", etiqueta: "Abattement proportionnel", formato: "moneda" },
    { clave: "apresImpot", etiqueta: "Revenu après IRG", formato: "moneda" },
    { clave: "tauxMoyen", etiqueta: "Taux moyen d'imposition", formato: "porcentaje", decimales: 2 },
    { clave: "irgAnnuel", etiqueta: "IRG sur 12 mois", formato: "moneda" },
  ],
});
