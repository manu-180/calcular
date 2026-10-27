import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "tg.plus-value-immobiliere",
  mercado: "tg",
  concepto: "propio",
  slug: "plus-value-immobiliere",
  estado: "publicado",
  requiere: {
    "tg.plus-value-taux": "numero",
    "tg.plus-value-reduction": "mapa",
    "tg.plus-value-duree": "numero",
    "tg.plus-value-forfait-travaux": "numero",
    "tg.plus-value-seuil": "numero",
  },
  campos: [
    {
      id: "bien",
      tipo: "opcion",
      etiqueta: "Bien vendu",
      opciones: [
        { valor: "bati", etiqueta: "Immeuble bâti" },
        { valor: "non-bati", etiqueta: "Terrain non bâti" },
      ],
      porDefecto: "bati",
    },
    { id: "cession", tipo: "moneda", etiqueta: "Prix de vente", min: 0, porDefecto: 50000000, ayuda: "Prix inscrit dans l'acte, plus les charges imposées à l'acheteur." },
    { id: "acquisition", tipo: "moneda", etiqueta: "Prix d'achat", min: 0, porDefecto: 30000000, ayuda: "Ou la valeur vénale au jour d'une donation ou d'une succession." },
    { id: "justifies", tipo: "si-no", etiqueta: "Frais et travaux justifiés par des factures", porDefecto: false },
    {
      id: "travaux",
      tipo: "moneda",
      etiqueta: "Frais d'achat et travaux justifiés",
      min: 0,
      porDefecto: 0,
      visibleSi: { justifies: [true] },
    },
    { id: "annees", tipo: "entero", etiqueta: "Années de détention", min: 0, max: 100, porDefecto: 8 },
    { id: "residence", tipo: "si-no", etiqueta: "Résidence principale vendue pour la première fois", porDefecto: false },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.cession <= 0) throw new ErrorEntrada("Indiquez un prix de vente supérieur à zéro.", "cession");
    const frais = entrada.justifies ? (entrada.travaux ?? 0) : redondear(porcentaje(entrada.acquisition, v["tg.plus-value-forfait-travaux"]));
    const prixRevient = redondear(entrada.acquisition + frais);
    const brute = Math.max(0, redondear(entrada.cession - prixRevient));
    const reduction = entrada.annees > v["tg.plus-value-duree"] ? redondear(porcentaje(brute, v["tg.plus-value-reduction"][entrada.bien])) : 0;
    const imposable = brute - reduction;
    let exoneration: string | null = null;
    if (entrada.residence) exoneration = "Exonérée : première vente de la résidence principale.";
    else if (entrada.cession <= v["tg.plus-value-seuil"]) exoneration = "Exonérée : prix de vente inférieur ou égal au seuil.";
    const taxe = exoneration ? 0 : redondear(porcentaje(imposable, v["tg.plus-value-taux"]));
    return {
      taxe,
      prixRevient,
      brute,
      reduction,
      imposable: exoneration ? 0 : imposable,
      observaciones: exoneration ? [exoneration] : brute === 0 ? ["Pas de plus-value : la vente ne dépasse pas le prix de revient."] : [],
    };
  },
  resultado: [
    { clave: "taxe", etiqueta: "Taxe sur la plus-value", formato: "moneda", destacada: true },
    { clave: "prixRevient", etiqueta: "Prix de revient (achat, frais et travaux)", formato: "moneda" },
    { clave: "brute", etiqueta: "Plus-value brute", formato: "moneda" },
    { clave: "reduction", etiqueta: "Réduction pour durée de détention", formato: "moneda", ocultarSiCero: true },
    { clave: "imposable", etiqueta: "Plus-value imposable", formato: "moneda" },
  ],
});
