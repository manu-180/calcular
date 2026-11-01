import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "mg.convertisseur-ariary-euro",
  mercado: "mg",
  concepto: "tipo-de-cambio",
  slug: "convertisseur-ariary-euro",
  estado: "publicado",
  requiere: {
    "mg.eur": "serie",
    "mg.usd": "serie",
  },
  campos: [
    {
      id: "devise",
      tipo: "opcion",
      etiqueta: "Devise",
      opciones: [
        { valor: "eur", etiqueta: "Euro (EUR)" },
        { valor: "usd", etiqueta: "Dollar américain (USD)" },
      ],
      porDefecto: "eur",
    },
    {
      id: "sens",
      tipo: "opcion",
      etiqueta: "Conversion",
      opciones: [
        { valor: "vers-ariary", etiqueta: "De la devise vers l'ariary" },
        { valor: "depuis-ariary", etiqueta: "De l'ariary vers la devise" },
      ],
      porDefecto: "vers-ariary",
    },
    { id: "montant", tipo: "numero", etiqueta: "Montant", min: 0, porDefecto: 100 },
  ],
  calcular(e, v, { redondear }) {
    if (e.montant <= 0) throw new ErrorEntrada("Indiquez un montant supérieur à zéro.", "montant");
    const serie = e.devise === "usd" ? v["mg.usd"] : v["mg.eur"];
    const cours = serie.valor;
    return {
      ariary: e.sens === "vers-ariary" ? redondear(e.montant * cours) : null,
      devise: e.sens === "depuis-ariary" ? e.montant / cours : null,
      cours,
      date: serie.fecha,
      observaciones: ["C'est le cours moyen du marché interbancaire publié par la Banky Foiben'i Madagasikara. Les banques et les bureaux de change appliquent leur propre cours et leurs frais."],
    };
  },
  resultado: [
    { clave: "ariary", etiqueta: "Montant en ariary", formato: "moneda", destacada: true },
    { clave: "devise", etiqueta: "Montant dans la devise", formato: "numero", decimales: 2, destacada: true },
    { clave: "cours", etiqueta: "Cours moyen BFM (Ar pour 1 unité)", formato: "numero", decimales: 2 },
    { clave: "date", etiqueta: "Date du cours", formato: "fecha" },
  ],
});
