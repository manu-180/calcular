import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "tg.convertisseur-dollar-fcfa",
  mercado: "tg",
  concepto: "propio",
  slug: "convertisseur-dollar-fcfa",
  estado: "publicado",
  requiere: { "tg.usd-xof": "serie" },
  campos: [
    {
      id: "sens",
      tipo: "opcion",
      etiqueta: "Conversion",
      opciones: [
        { valor: "usd-xof", etiqueta: "Dollars US vers francs CFA" },
        { valor: "xof-usd", etiqueta: "Francs CFA vers dollars US" },
      ],
      porDefecto: "usd-xof",
    },
    { id: "montant", tipo: "numero", etiqueta: "Montant à convertir", min: 0, porDefecto: 100 },
  ],
  calcular(entrada, v) {
    if (entrada.montant < 0) throw new ErrorEntrada("Le montant ne peut pas être négatif.", "montant");
    const cours = v["tg.usd-xof"].valor;
    const base = { cours, dateCours: v["tg.usd-xof"].fecha };
    if (entrada.sens === "usd-xof") return { ...base, francs: Math.round(entrada.montant * cours), dollars: entrada.montant };
    return { ...base, francs: Math.round(entrada.montant), dollars: Math.round((entrada.montant / cours) * 100) / 100 };
  },
  resultado: [
    { clave: "francs", etiqueta: "Montant en francs CFA", formato: "moneda", destacada: true },
    { clave: "dollars", etiqueta: "Montant en dollars US", formato: "numero", decimales: 2 },
    { clave: "cours", etiqueta: "Cours du dollar (moyenne achat et vente BCEAO)", formato: "numero", decimales: 3 },
    { clave: "dateCours", etiqueta: "Date du cours", formato: "fecha" },
  ],
});
