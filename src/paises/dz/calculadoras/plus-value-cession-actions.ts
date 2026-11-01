import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "dz.plus-value-cession-actions",
  mercado: "dz",
  concepto: "propio",
  slug: "plus-value-cession-actions",
  estado: "publicado",
  requiere: { "dz.pv-titres": "mapa" },
  campos: [
    { id: "cession", tipo: "moneda", etiqueta: "Prix de cession des titres", min: 0, porDefecto: 5000000 },
    { id: "frais", tipo: "moneda", etiqueta: "Droits, taxes et frais payés par le vendeur", min: 0, porDefecto: 0 },
    {
      id: "acquisition",
      tipo: "moneda",
      etiqueta: "Prix d'acquisition ou de souscription",
      min: 0,
      porDefecto: 2000000,
      ayuda: "Pour des titres reçus par donation ou succession, leur valeur vénale à cette date.",
    },
    {
      id: "situation",
      tipo: "opcion",
      etiqueta: "Situation du cédant",
      opciones: [
        { valor: "normal", etiqueta: "Domicilié en Algérie" },
        { valor: "reinvesti", etiqueta: "Domicilié en Algérie, avec engagement de réinvestir" },
        { valor: "non-resident", etiqueta: "Domicilié hors d'Algérie" },
      ],
      porDefecto: "normal",
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.cession <= 0) throw new ErrorEntrada("Indiquez un prix de cession supérieur à zéro.", "cession");
    if (e.frais >= e.cession) throw new ErrorEntrada("Les frais du vendeur doivent rester inférieurs au prix de cession.", "frais");
    const taux = v["dz.pv-titres"][e.situation];
    const plusValue = Math.max(0, redondear(e.cession - e.frais - e.acquisition));
    const impot = redondear(porcentaje(plusValue, taux));
    const observaciones = ["L'impôt est payé dans les 30 jours qui suivent la cession, à la recette des impôts dont dépend le siège social de la société."];
    if (e.situation === "reinvesti") {
      observaciones.push(
        "Le taux réduit suppose de réinvestir la plus-value au capital d'une ou plusieurs entreprises au plus tard le 31 décembre de l'année qui suit la cession. Sinon, l'administration rappelle la différence d'impôt avec une majoration de 25 %.",
      );
    }
    return { impot, plusValue, taux, net: redondear(e.cession - e.frais - impot), observaciones };
  },
  resultado: [
    { clave: "impot", etiqueta: "IRG sur la plus-value", formato: "moneda", destacada: true },
    { clave: "plusValue", etiqueta: "Plus-value imposable", formato: "moneda" },
    { clave: "taux", etiqueta: "Taux appliqué", formato: "porcentaje" },
    { clave: "net", etiqueta: "Produit net de la cession", formato: "moneda" },
  ],
});
