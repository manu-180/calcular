import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "dz.plus-value-immobiliere",
  mercado: "dz",
  concepto: "propio",
  slug: "plus-value-immobiliere",
  estado: "publicado",
  requiere: {
    "dz.pv-immo-taux": "numero",
    "dz.pv-immo-reduction": "numero",
    "dz.pv-immo-abattement": "mapa",
    "dz.pv-immo-abattement-debut": "numero",
    "dz.pv-immo-frais": "numero",
    "dz.pv-immo-forfait": "numero",
  },
  campos: [
    { id: "cession", tipo: "moneda", etiqueta: "Prix de cession", min: 0, porDefecto: 12000000 },
    { id: "fraisCession", tipo: "moneda", etiqueta: "Droits, taxes et frais payés par le vendeur", min: 0, porDefecto: 0, ayuda: "Frais justifiés supportés à l'occasion de la vente." },
    {
      id: "acquisition",
      tipo: "moneda",
      etiqueta: "Prix d'acquisition",
      min: 0,
      porDefecto: 7000000,
      ayuda: "Pour un bien reçu par donation ou succession, la valeur vénale à cette date. Laissez 0 si le prix ne peut pas être déterminé.",
    },
    { id: "fraisAcquisition", tipo: "moneda", etiqueta: "Frais d'acquisition, d'entretien et d'amélioration justifiés", min: 0, porDefecto: 0 },
    { id: "annees", tipo: "entero", etiqueta: "Années de détention", min: 0, max: 100, porDefecto: 5 },
    { id: "unique", tipo: "si-no", etiqueta: "Unique logement et habitation principale", porDefecto: false },
  ],
  calcular(e, v, { redondear }) {
    if (e.cession <= 0) throw new ErrorEntrada("Indiquez un prix de cession supérieur à zéro.", "cession");
    if (e.fraisCession >= e.cession) throw new ErrorEntrada("Les frais du vendeur doivent rester inférieurs au prix de cession.", "fraisCession");
    const forfaitaire = e.acquisition <= 0;
    const acquisition = forfaitaire ? redondear(porcentaje(e.cession, v["dz.pv-immo-forfait"])) : e.acquisition;
    const frais = forfaitaire ? 0 : Math.min(e.fraisAcquisition, redondear(porcentaje(acquisition, v["dz.pv-immo-frais"])));
    const prixRevient = redondear(acquisition + frais);
    const plusValue = Math.max(0, redondear(e.cession - e.fraisCession - prixRevient));
    const a = v["dz.pv-immo-abattement"];
    const tauxAbattement = Math.min(a.plafond, a.annuel * Math.max(0, e.annees - v["dz.pv-immo-abattement-debut"] + 1));
    const abattement = redondear(porcentaje(plusValue, tauxAbattement));
    const imposable = redondear(plusValue - abattement);
    const brut = redondear(porcentaje(imposable, v["dz.pv-immo-taux"]));
    const reduction = e.unique ? redondear(porcentaje(brut, v["dz.pv-immo-reduction"])) : 0;
    const observaciones = [
      "L'impôt est libératoire. Le vendeur le calcule et le paie lui-même à la recette des impôts du lieu du bien, dans les 30 jours qui suivent l'acte de vente.",
      "La cession d'un bien reçu en succession pour liquider des droits réels indivis est exonérée lorsque l'indivisibilité du bien est justifiée, tout comme la cession dans le cadre d'un financement Mourabaha ou Ijara Mountahia Bitamlik.",
    ];
    if (forfaitaire) observaciones.unshift(`Sans prix d'acquisition connu, la valeur d'acquisition est fixée forfaitairement à ${v["dz.pv-immo-forfait"]} % du prix de vente et les frais ne sont pas ajoutés.`);
    else if (frais < e.fraisAcquisition) observaciones.unshift(`Les frais déclarés dépassent ${v["dz.pv-immo-frais"]} % du prix d'acquisition : seule cette limite est retenue.`);
    return {
      impot: redondear(brut - reduction),
      plusValue,
      prixRevient,
      tauxAbattement,
      abattement,
      imposable,
      brut,
      reduction,
      observaciones,
    };
  },
  resultado: [
    { clave: "impot", etiqueta: "IRG à payer sur la plus-value", formato: "moneda", destacada: true },
    { clave: "plusValue", etiqueta: "Plus-value brute", formato: "moneda" },
    { clave: "prixRevient", etiqueta: "Prix d'acquisition retenu, frais compris", formato: "moneda" },
    { clave: "tauxAbattement", etiqueta: "Abattement pour durée de détention", formato: "porcentaje" },
    { clave: "abattement", etiqueta: "Montant de l'abattement", formato: "moneda" },
    { clave: "imposable", etiqueta: "Plus-value imposable", formato: "moneda" },
    { clave: "brut", etiqueta: "Impôt avant réduction", formato: "moneda" },
    { clave: "reduction", etiqueta: "Réduction pour l'unique logement", formato: "moneda" },
  ],
});
