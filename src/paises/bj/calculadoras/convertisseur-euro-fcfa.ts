import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "bj.convertisseur-euro-fcfa",
  mercado: "bj",
  concepto: "tipo-de-cambio",
  slug: "convertisseur-euro-fcfa",
  estado: "publicado",
  requiere: { "bj.parite-euro": "numero" },
  campos: [
    {
      id: "sens",
      tipo: "opcion",
      etiqueta: "Convertir",
      opciones: [
        { valor: "eur-xof", etiqueta: "Des euros en francs CFA" },
        { valor: "xof-eur", etiqueta: "Des francs CFA en euros" },
      ],
      porDefecto: "eur-xof",
    },
    { id: "montant", tipo: "numero", etiqueta: "Montant à convertir", min: 0, porDefecto: 500 },
  ],
  calcular(e, v) {
    if (e.montant <= 0) throw new ErrorEntrada("Indiquez un montant supérieur à zéro.", "montant");
    const parite = v["bj.parite-euro"];
    const enCfa = e.sens === "eur-xof";
    const brut = enCfa ? e.montant * parite : e.montant / parite;
    return { resultat: Math.round(brut * 100) / 100, devise: enCfa ? "Francs CFA (XOF)" : "Euros (EUR)", parite };
  },
  resultado: [
    { clave: "resultat", etiqueta: "Montant converti", formato: "numero", decimales: 2, destacada: true },
    { clave: "devise", etiqueta: "Devise obtenue", formato: "texto" },
    { clave: "parite", etiqueta: "Francs CFA pour un euro", formato: "numero", decimales: 3 },
  ],
});
