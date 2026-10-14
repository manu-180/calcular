import { aplicarEscalaMarginal, definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";
import type { FilaEscala } from "@/motor/tipos";

function impotParParts(bareme: readonly FilaEscala[], revenu: number, parts: number): number {
  return aplicarEscalaMarginal(bareme, revenu / parts) * parts;
}

function tauxMarginal(bareme: readonly FilaEscala[], quotient: number): number {
  let taux = bareme[0]?.tasa ?? 0;
  for (const f of bareme) if (quotient > f.desde) taux = f.tasa;
  return taux;
}

export default definirCalculadora({
  id: "fr.impot-sur-le-revenu",
  mercado: "fr",
  concepto: "impuesto-renta",
  slug: "impot-sur-le-revenu",
  estado: "publicado",
  requiere: {
    "fr.bareme-ir": "escala",
    "fr.plafond-demi-part": "numero",
    "fr.plafond-parent-isole": "numero",
    "fr.decote-forfait-seul": "numero",
    "fr.decote-forfait-couple": "numero",
    "fr.decote-seuil-seul": "numero",
    "fr.decote-seuil-couple": "numero",
    "fr.decote-taux": "numero",
    "fr.seuil-recouvrement": "numero",
    "fr.abattement-frais-taux": "numero",
    "fr.abattement-frais-min": "numero",
    "fr.abattement-frais-max": "numero",
  },
  campos: [
    {
      id: "situation",
      tipo: "opcion",
      etiqueta: "Situation du foyer",
      opciones: [
        { valor: "seul", etiqueta: "Célibataire, divorcé ou séparé" },
        { valor: "couple", etiqueta: "Marié ou pacsé (imposition commune)" },
      ],
      porDefecto: "seul",
    },
    {
      id: "typeRevenu",
      tipo: "opcion",
      etiqueta: "Montants saisis",
      opciones: [
        { valor: "salaires", etiqueta: "Salaires nets imposables (avant la déduction de 10 %)" },
        { valor: "imposable", etiqueta: "Revenu net imposable (déductions déjà faites)" },
      ],
      porDefecto: "salaires",
    },
    { id: "revenu1", tipo: "moneda", etiqueta: "Revenus annuels du déclarant 1", min: 0, porDefecto: 30000 },
    { id: "revenu2", tipo: "moneda", etiqueta: "Revenus annuels du déclarant 2", min: 0, requerido: false, ayuda: "Seulement pour un couple marié ou pacsé." },
    { id: "enfants", tipo: "entero", etiqueta: "Enfants à charge", min: 0, max: 12, porDefecto: 0 },
    { id: "parentIsole", tipo: "si-no", etiqueta: "Vous vivez seul avec vos enfants (parent isolé)", porDefecto: false },
  ],
  calcular(entrada, valores, { redondear }) {
    const couple = entrada.situation === "couple";
    if (!couple && entrada.revenu2) throw new ErrorEntrada("Le second déclarant ne concerne qu'un couple marié ou pacsé.", "revenu2");
    if (entrada.parentIsole && (couple || entrada.enfants === 0))
      throw new ErrorEntrada("Le statut de parent isolé suppose de vivre seul avec au moins un enfant à charge.", "parentIsole");

    const net = (salaires: number) => {
      if (entrada.typeRevenu === "imposable" || salaires <= 0) return salaires;
      const deduction = Math.min(
        salaires,
        Math.max(valores["fr.abattement-frais-min"], Math.min(valores["fr.abattement-frais-max"], porcentaje(salaires, valores["fr.abattement-frais-taux"]))),
      );
      return salaires - deduction;
    };
    const revenu = redondear(net(entrada.revenu1) + net(couple ? (entrada.revenu2 ?? 0) : 0));

    const base = couple ? 2 : 1;
    const demiPartsEnfants = Math.min(entrada.enfants, 2) + Math.max(0, entrada.enfants - 2) * 2;
    const demiPartsIsole = entrada.parentIsole ? 1 : 0;
    const parts = base + (demiPartsEnfants + demiPartsIsole) / 2;

    const bareme = valores["fr.bareme-ir"];
    const sansEnfants = impotParParts(bareme, revenu, base);
    const avecEnfants = impotParParts(bareme, revenu, parts);
    const demiParts = demiPartsEnfants + demiPartsIsole;
    const plafond = entrada.parentIsole
      ? valores["fr.plafond-parent-isole"] + Math.max(0, demiParts - 2) * valores["fr.plafond-demi-part"]
      : demiParts * valores["fr.plafond-demi-part"];
    const plafonne = sansEnfants - avecEnfants > plafond;
    const impotBrut = redondear(plafonne ? sansEnfants - plafond : avecEnfants);

    const seuil = couple ? valores["fr.decote-seuil-couple"] : valores["fr.decote-seuil-seul"];
    const forfait = couple ? valores["fr.decote-forfait-couple"] : valores["fr.decote-forfait-seul"];
    const decote = impotBrut > 0 && impotBrut <= seuil ? redondear(Math.min(impotBrut, Math.max(0, forfait - porcentaje(impotBrut, valores["fr.decote-taux"])))) : 0;
    const apresDecote = redondear(impotBrut - decote);
    const impotNet = apresDecote < valores["fr.seuil-recouvrement"] ? 0 : apresDecote;

    const observaciones: string[] = [];
    if (plafonne) observaciones.push("L'avantage lié aux enfants est plafonné : votre impôt tient compte du plafonnement du quotient familial.");
    if (apresDecote > 0 && impotNet === 0) observaciones.push("Votre impôt est inférieur au seuil de mise en recouvrement : vous n'avez rien à payer.");
    if (revenu > (couple ? 500000 : 250000)) observaciones.push("Avec ce niveau de revenu, la contribution exceptionnelle sur les hauts revenus s'ajoute à l'impôt. Elle n'est pas comprise ici.");
    observaciones.push("Les réductions et crédits d'impôt (dons, emploi à domicile, frais de garde) se retirent ensuite de cet impôt.");

    return {
      revenu,
      parts,
      tmi: tauxMarginal(bareme, revenu / parts),
      impotBrut,
      decote,
      impotNet,
      tauxMoyen: revenu > 0 ? redondear((impotNet / revenu) * 100) : 0,
      mensuel: redondear(impotNet / 12),
      observaciones,
    };
  },
  resultado: [
    { clave: "revenu", etiqueta: "Revenu net imposable du foyer", formato: "moneda" },
    { clave: "parts", etiqueta: "Nombre de parts", formato: "numero", decimales: 1 },
    { clave: "tmi", etiqueta: "Taux marginal d'imposition", formato: "porcentaje" },
    { clave: "impotBrut", etiqueta: "Impôt avant décote", formato: "moneda" },
    { clave: "decote", etiqueta: "Décote", formato: "moneda", ocultarSiCero: true },
    { clave: "impotNet", etiqueta: "Impôt sur le revenu à payer", formato: "moneda", destacada: true },
    { clave: "tauxMoyen", etiqueta: "Taux moyen d'imposition", formato: "porcentaje", decimales: 2 },
    { clave: "mensuel", etiqueta: "Soit par mois", formato: "moneda" },
  ],
});
