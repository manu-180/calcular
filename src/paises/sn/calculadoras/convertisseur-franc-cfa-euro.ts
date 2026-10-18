import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "sn.convertisseur-franc-cfa-euro",
  mercado: "sn",
  concepto: "tipo-de-cambio",
  slug: "convertisseur-franc-cfa-euro",
  estado: "publicado",
  requiere: { "sn.parite-euro": "numero" },
  campos: [
    { id: "sens", tipo: "opcion", etiqueta: "Convertir", opciones: [{ valor: "eur-xof", etiqueta: "Euros en francs CFA" }, { valor: "xof-eur", etiqueta: "Francs CFA en euros" }], porDefecto: "eur-xof" },
    { id: "montant", tipo: "numero", etiqueta: "Montant", min: 0, porDefecto: 100 },
  ],
  calcular(e, v) {
    if (e.montant <= 0) throw new ErrorEntrada("Inscrivez un montant supérieur à zéro.", "montant");
    const p = v["sn.parite-euro"];
    const enCfa = e.sens === "eur-xof";
    const brut = enCfa ? e.montant * p : e.montant / p;
    return { resultat: Math.round(brut * (enCfa ? 1 : 100)) / (enCfa ? 1 : 100), devise: enCfa ? "Francs CFA (XOF)" : "Euros (EUR)", parite: p };
  },
  resultado: [
    { clave: "resultat", etiqueta: "Montant converti", formato: "numero", decimales: 2, destacada: true },
    { clave: "devise", etiqueta: "Devise du résultat", formato: "texto" },
    { clave: "parite", etiqueta: "Francs CFA pour 1 euro (parité fixe)", formato: "numero", decimales: 3 },
  ],
});
