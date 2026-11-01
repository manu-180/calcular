import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "ne.taxe-jeux-de-hasard",
  mercado: "ne",
  concepto: "propio",
  slug: "taxe-jeux-de-hasard",
  estado: "publicado",
  requiere: { "ne.jeux-taux": "mapa" },
  campos: [
    {
      id: "type",
      tipo: "opcion",
      etiqueta: "Type de jeu",
      opciones: [
        { valor: "recettes", etiqueta: "Pari mutuel ou autre jeu (sur les recettes brutes)" },
        { valor: "cote-fixe", etiqueta: "Pari à cote fixe de la Loterie Nationale (sur la marge brute)" },
      ],
      porDefecto: "recettes",
    },
    { id: "base", tipo: "moneda", etiqueta: "Recettes brutes ou marge brute", min: 0, porDefecto: 10000000 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.base <= 0) throw new ErrorEntrada("Indiquez un montant supérieur à zéro.", "base");
    const taux = enMapa(v["ne.jeux-taux"], entrada.type);
    return { taxe: redondear(porcentaje(entrada.base, taux)), taux };
  },
  resultado: [
    { clave: "taxe", etiqueta: "Taxe sur les loteries et jeux de hasard", formato: "moneda", destacada: true },
    { clave: "taux", etiqueta: "Taux appliqué", formato: "porcentaje", decimales: 0 },
  ],
});
