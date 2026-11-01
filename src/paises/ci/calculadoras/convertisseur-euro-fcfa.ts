import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "ci.convertisseur-euro-fcfa",
  mercado: "ci",
  concepto: "tipo-de-cambio",
  slug: "convertisseur-euro-fcfa",
  estado: "publicado",
  requiere: { "ci.parite-euro": "numero" },
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
    const parite = v["ci.parite-euro"];
    if (entrada.sens === "eur-xof") return { francs: Math.round(entrada.montant * parite), euros: entrada.montant, parite };
    return { francs: Math.round(entrada.montant), euros: Math.round((entrada.montant / parite) * 100) / 100, parite };
  },
  resultado: [
    { clave: "francs", etiqueta: "Montant en francs CFA", formato: "moneda", destacada: true },
    { clave: "euros", etiqueta: "Montant en euros", formato: "numero", decimales: 2 },
    { clave: "parite", etiqueta: "Parité fixe (francs CFA pour 1 euro)", formato: "numero", decimales: 3 },
  ],
});
