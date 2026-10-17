import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { indemniteLegale, REQUIERE_INDEMNITE, salaireDeReference } from "../lib/indemnite";

export default definirCalculadora({
  id: "fr.rupture-conventionnelle",
  mercado: "fr",
  concepto: "propio",
  slug: "rupture-conventionnelle",
  estado: "publicado",
  requiere: {
    ...REQUIERE_INDEMNITE,
    "fr.exo-indemnite-ir-max": "numero",
    "fr.exo-indemnite-social-max": "numero",
  },
  campos: [
    { id: "moyenne12", tipo: "moneda", etiqueta: "Salaire brut mensuel moyen des 12 derniers mois", min: 0, porDefecto: 2500 },
    { id: "moyenne3", tipo: "moneda", etiqueta: "Salaire brut mensuel moyen des 3 derniers mois", min: 0, requerido: false },
    { id: "annees", tipo: "entero", etiqueta: "Ancienneté : années complètes", min: 0, max: 60, porDefecto: 5 },
    { id: "mois", tipo: "entero", etiqueta: "Ancienneté : mois en plus", min: 0, max: 11, porDefecto: 0 },
    { id: "negocie", tipo: "moneda", etiqueta: "Indemnité négociée", min: 0, requerido: false, ayuda: "Facultatif. Si vous laissez vide, le calcul retient le minimum légal." },
    {
      id: "remunerationAnnuelle",
      tipo: "moneda",
      etiqueta: "Rémunération brute de l'année civile précédente",
      min: 0,
      requerido: false,
      ayuda: "Sert à calculer la part exonérée d'impôt quand l'indemnité dépasse le minimum.",
    },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.moyenne12 <= 0) throw new ErrorEntrada("Indiquez votre salaire brut moyen.", "moyenne12");
    const reference = redondear(salaireDeReference(entrada.moyenne12, entrada.moyenne3));
    const minimum = redondear(indemniteLegale(reference, entrada.annees, entrada.mois, valores));
    const observaciones: string[] = [];
    if (entrada.negocie !== null && entrada.negocie < minimum) {
      observaciones.push("L'indemnité négociée est inférieure au minimum légal : la convention ne peut pas être homologuée à ce montant.");
    }
    const indemnite = Math.max(minimum, entrada.negocie ?? 0);
    const remuneration = entrada.remunerationAnnuelle ?? 0;
    const critere = Math.min(valores["fr.exo-indemnite-ir-max"], Math.max(2 * remuneration, indemnite / 2));
    const exonereImpot = redondear(Math.min(indemnite, Math.max(minimum, critere)));
    const exonereCotisations = redondear(Math.min(exonereImpot, valores["fr.exo-indemnite-social-max"]));
    observaciones.push("Si vous pouvez déjà partir à la retraite, l'indemnité est entièrement imposable.");
    if (entrada.remunerationAnnuelle === null && indemnite > minimum) {
      observaciones.push("Sans la rémunération de l'année précédente, la part exonérée ne tient compte que de la moitié de l'indemnité.");
    }
    return {
      reference,
      minimum,
      indemnite,
      exonereImpot,
      imposable: redondear(indemnite - exonereImpot),
      exonereCotisations,
      observaciones,
    };
  },
  resultado: [
    { clave: "reference", etiqueta: "Salaire de référence", formato: "moneda" },
    { clave: "minimum", etiqueta: "Indemnité minimale (légale)", formato: "moneda", destacada: true },
    { clave: "indemnite", etiqueta: "Indemnité retenue", formato: "moneda" },
    { clave: "exonereImpot", etiqueta: "Part exonérée d'impôt sur le revenu", formato: "moneda" },
    { clave: "imposable", etiqueta: "Part imposable", formato: "moneda" },
    { clave: "exonereCotisations", etiqueta: "Part exonérée de cotisations sociales", formato: "moneda" },
  ],
});
