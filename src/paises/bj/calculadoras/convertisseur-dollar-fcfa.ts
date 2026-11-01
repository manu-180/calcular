import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "bj.convertisseur-dollar-fcfa",
  mercado: "bj",
  concepto: "propio",
  slug: "convertisseur-dollar-fcfa",
  estado: "publicado",
  requiere: { "bj.usd-xof": "serie" },
  campos: [
    {
      id: "sens",
      tipo: "opcion",
      etiqueta: "Convertir",
      opciones: [
        { valor: "usd-xof", etiqueta: "Des dollars US en francs CFA" },
        { valor: "xof-usd", etiqueta: "Des francs CFA en dollars US" },
      ],
      porDefecto: "usd-xof",
    },
    { id: "montant", tipo: "numero", etiqueta: "Montant à convertir", min: 0, porDefecto: 100 },
  ],
  calcular(e, v) {
    if (e.montant <= 0) throw new ErrorEntrada("Indiquez un montant supérieur à zéro.", "montant");
    const cours = v["bj.usd-xof"].valor;
    const enCfa = e.sens === "usd-xof";
    const brut = enCfa ? e.montant * cours : e.montant / cours;
    return {
      resultat: Math.round(brut * 100) / 100,
      devise: enCfa ? "Francs CFA (XOF)" : "Dollars US (USD)",
      cours,
      observaciones: ["Le cours du dollar varie chaque jour. Votre banque ou votre bureau de change applique son propre écart."],
    };
  },
  resultado: [
    { clave: "resultat", etiqueta: "Montant converti", formato: "numero", decimales: 2, destacada: true },
    { clave: "devise", etiqueta: "Devise obtenue", formato: "texto" },
    { clave: "cours", etiqueta: "Francs CFA pour un dollar US (cours moyen BCEAO)", formato: "numero", decimales: 2 },
  ],
});
