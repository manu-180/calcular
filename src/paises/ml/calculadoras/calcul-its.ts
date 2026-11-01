import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { itsAnnuel, OPTIONS_SITUATION, REQ_ITS, retraiteDeductible } from "../lib/its";

export default definirCalculadora({
  id: "ml.calcul-its",
  mercado: "ml",
  concepto: "impuesto-renta",
  slug: "calcul-its",
  estado: "publicado",
  requiere: REQ_ITS,
  campos: [
    {
      id: "brut",
      tipo: "moneda",
      etiqueta: "Salaire brut imposable du mois",
      min: 0,
      porDefecto: 250000,
      ayuda: "Salaire de base, primes et indemnités imposables, heures supplémentaires et la moitié des avantages en nature.",
    },
    {
      id: "retraite",
      tipo: "moneda",
      etiqueta: "Retenue pour la retraite du mois",
      min: 0,
      porDefecto: 0,
      ayuda: "Le montant de la cotisation retraite retenue sur votre bulletin de paie. La cotisation AMO ne se déduit pas.",
    },
    { id: "situation", tipo: "opcion", etiqueta: "Situation de famille", opciones: OPTIONS_SITUATION, porDefecto: "celibataire" },
    { id: "enfants", tipo: "entero", etiqueta: "Enfants à charge", min: 0, max: 20, porDefecto: 0 },
    { id: "infirmes", tipo: "entero", etiqueta: "Dont enfants majeurs infirmes", min: 0, max: 20, porDefecto: 0 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.brut <= 0) throw new ErrorEntrada("Indiquez un salaire brut supérieur à zéro.", "brut");
    if (entrada.retraite > entrada.brut) throw new ErrorEntrada("La retenue pour la retraite ne peut pas dépasser le salaire brut.", "retraite");
    const deduction = retraiteDeductible(entrada.brut, entrada.retraite, v, redondear);
    const imposableMensuel = redondear(entrada.brut - deduction);
    const its = itsAnnuel(imposableMensuel * 12, entrada, v, redondear);
    const observaciones: string[] = [];
    if (entrada.retraite > deduction) observaciones.push("La part de la retenue pour la retraite au-delà de 4 % du salaire brut ne réduit pas la base de l'impôt.");
    if (entrada.retraite === 0) observaciones.push("Si une cotisation retraite est retenue sur votre bulletin, indiquez-la : elle réduit la base de l'impôt.");
    return {
      itsMensuel: its.impotMensuel,
      imposableMensuel,
      baseAnnuelle: its.baseAnnuelle,
      impotBareme: its.impotBareme,
      tauxReduction: its.tauxReduction,
      reductionFamille: its.reductionFamille,
      reductionPoints: its.reductionPoints,
      itsAnnuel: its.impotAnnuel,
      tauxMoyen: its.baseAnnuelle > 0 ? (its.impotAnnuel / its.baseAnnuelle) * 100 : 0,
      observaciones,
    };
  },
  resultado: [
    { clave: "itsMensuel", etiqueta: "ITS retenu sur le mois", formato: "moneda", destacada: true },
    { clave: "imposableMensuel", etiqueta: "Revenu imposable du mois", formato: "moneda" },
    { clave: "baseAnnuelle", etiqueta: "Revenu imposable sur 12 mois", formato: "moneda" },
    { clave: "impotBareme", etiqueta: "Impôt annuel selon le barème", formato: "moneda" },
    { clave: "tauxReduction", etiqueta: "Réduction pour charges de famille", formato: "porcentaje", decimales: 1, ocultarSiCero: true },
    { clave: "reductionFamille", etiqueta: "Montant de la réduction pour charges de famille", formato: "moneda", ocultarSiCero: true },
    { clave: "reductionPoints", etiqueta: "Réduction de deux points du taux réel", formato: "moneda" },
    { clave: "itsAnnuel", etiqueta: "ITS sur l'année", formato: "moneda" },
    { clave: "tauxMoyen", etiqueta: "Taux moyen d'imposition", formato: "porcentaje", decimales: 2 },
  ],
});
