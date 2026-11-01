import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "ne.droit-commande-publique",
  mercado: "ne",
  concepto: "propio",
  slug: "droit-commande-publique",
  estado: "publicado",
  requiere: { "ne.commande-droit": "mapa", "ne.commande-bon-seuil": "numero" },
  campos: [
    {
      id: "nature",
      tipo: "opcion",
      etiqueta: "Nature du contrat",
      opciones: [
        { valor: "marche", etiqueta: "Marché public ou autre contrat de la commande publique" },
        { valor: "bon", etiqueta: "Bon de commande public" },
        { valor: "prive", etiqueta: "Contrat entre personnes privées" },
      ],
      porDefecto: "marche",
    },
    { id: "montant", tipo: "moneda", etiqueta: "Montant hors TVA", min: 0, porDefecto: 20000000 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.montant <= 0) throw new ErrorEntrada("Indiquez un montant supérieur à zéro.", "montant");
    const taux = enMapa(v["ne.commande-droit"], entrada.nature === "prive" ? "prive" : "public");
    const exonere = entrada.nature === "bon" && entrada.montant < v["ne.commande-bon-seuil"];
    const droit = exonere ? 0 : redondear(porcentaje(entrada.montant, taux));
    return {
      droit,
      taux: exonere ? 0 : taux,
      observaciones: exonere ? ["Ce bon de commande est exempté : son montant est inférieur au seuil."] : [],
    };
  },
  resultado: [
    { clave: "droit", etiqueta: "Droit d'enregistrement", formato: "moneda", destacada: true },
    { clave: "taux", etiqueta: "Taux appliqué", formato: "porcentaje", decimales: 0 },
  ],
});
