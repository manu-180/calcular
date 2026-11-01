import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { calculerIrsa, REQ_IRSA } from "../lib/irsa";

export default definirCalculadora({
  id: "mg.calcul-irsa",
  mercado: "mg",
  concepto: "impuesto-renta",
  slug: "calcul-irsa",
  estado: "publicado",
  requiere: { ...REQ_IRSA, "mg.irsa-heures-sup": "numero" },
  campos: [
    {
      id: "brut",
      tipo: "moneda",
      etiqueta: "Salaire brut du mois",
      min: 0,
      porDefecto: 1000000,
      ayuda: "Salaire de base, primes, indemnités et avantages en nature imposables.",
    },
    {
      id: "heuresSup",
      tipo: "moneda",
      etiqueta: "Dont heures supplémentaires exonérées",
      min: 0,
      porDefecto: 0,
      ayuda: "Paie des 20 premières heures supplémentaires du mois, hors impôt.",
    },
    {
      id: "retraite",
      tipo: "moneda",
      etiqueta: "Cotisation retraite retenue (CNaPS ou caisse de retraite)",
      min: 0,
      porDefecto: 0,
      ayuda: "Le montant figurant sur votre bulletin de paie.",
    },
    {
      id: "sante",
      tipo: "moneda",
      etiqueta: "Cotisation santé retenue (OSTIE, AMIT ou assurance santé)",
      min: 0,
      porDefecto: 0,
      ayuda: "Le montant figurant sur votre bulletin de paie.",
    },
    { id: "personnesCharge", tipo: "entero", etiqueta: "Personnes à charge", min: 0, max: 20, porDefecto: 0, ayuda: "Enfants de moins de 21 ans (25 ans s'ils étudient) ou infirmes, ascendants sans ressources." },
  ],
  calcular(e, v, { redondear }) {
    if (e.brut <= 0) throw new ErrorEntrada("Indiquez un salaire brut supérieur à zéro.", "brut");
    if (e.heuresSup > e.brut) throw new ErrorEntrada("Les heures supplémentaires ne peuvent pas dépasser le salaire brut.", "heuresSup");
    if (e.retraite + e.sante > e.brut) throw new ErrorEntrada("Les cotisations dépassent le salaire brut.", "retraite");
    const r = calculerIrsa({ brut: e.brut, exonere: e.heuresSup, retraite: e.retraite, sante: e.sante, personnesCharge: e.personnesCharge }, v, redondear);
    const observaciones: string[] = [];
    if (e.retraite > r.deductionRetraite || e.sante > r.deductionSante) observaciones.push("Une partie de vos cotisations dépasse le plafond déductible : elle reste dans la base de l'impôt.");
    if (r.irsa === v["mg.irsa-minimum"] && r.impotBareme < r.irsa) observaciones.push("Le barème donne moins que le minimum : c'est le minimum qui est retenu.");
    return {
      irsa: r.irsa,
      base: r.base,
      impotBareme: r.impotBareme,
      reduction: r.reduction,
      tauxMarginal: r.tauxMarginal,
      tauxMoyen: (r.irsa / e.brut) * 100,
      net: redondear(e.brut - e.retraite - e.sante - r.irsa),
      observaciones,
    };
  },
  resultado: [
    { clave: "irsa", etiqueta: "IRSA du mois", formato: "moneda", destacada: true },
    { clave: "base", etiqueta: "Revenu imposable (arrondi à la centaine)", formato: "moneda" },
    { clave: "impotBareme", etiqueta: "Impôt selon le barème", formato: "moneda" },
    { clave: "reduction", etiqueta: "Réduction pour personnes à charge", formato: "moneda", ocultarSiCero: true },
    { clave: "tauxMarginal", etiqueta: "Taux de la dernière tranche", formato: "porcentaje", decimales: 0 },
    { clave: "tauxMoyen", etiqueta: "Part de l'IRSA dans le brut", formato: "porcentaje", decimales: 1 },
    { clave: "net", etiqueta: "Salaire après cotisations et IRSA", formato: "moneda" },
  ],
});
