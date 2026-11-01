import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "ne.convertisseur-euro-fcfa",
  mercado: "ne",
  concepto: "propio",
  slug: "convertisseur-euro-fcfa",
  estado: "publicado",
  requiere: { "ne.parite-euro": "numero" },
  campos: [
    {
      id: "sens",
      tipo: "opcion",
      etiqueta: "Conversion",
      opciones: [
        { valor: "eur-xof", etiqueta: "Euros vers francs CFA" },
        { valor: "xof-eur", etiqueta: "Francs CFA vers euros" },
      ],
      porDefecto: "eur-xof",
    },
    { id: "montant", tipo: "numero", etiqueta: "Montant à convertir", min: 0, porDefecto: 100 },
  ],
  calcular(entrada, v) {
    if (entrada.montant < 0) throw new ErrorEntrada("Le montant ne peut pas être négatif.", "montant");
    const cours = v["ne.parite-euro"];
    if (entrada.sens === "eur-xof") return { cours, francs: Math.round(entrada.montant * cours), euros: entrada.montant };
    return { cours, francs: Math.round(entrada.montant), euros: Math.round((entrada.montant / cours) * 100) / 100 };
  },
  resultado: [
    { clave: "francs", etiqueta: "Montant en francs CFA", formato: "moneda", destacada: true },
    { clave: "euros", etiqueta: "Montant en euros", formato: "numero", decimales: 2 },
    { clave: "cours", etiqueta: "Francs CFA pour un euro", formato: "numero", decimales: 3 },
  ],
});
