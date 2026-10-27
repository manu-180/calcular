import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "mg.calcul-ircm",
  mercado: "mg",
  concepto: "propio",
  slug: "calcul-ircm",
  estado: "publicado",
  requiere: {
    "mg.ircm-taux": "mapa",
    "mg.ircm-abattement-dividendes": "numero",
  },
  campos: [
    {
      id: "nature",
      tipo: "opcion",
      etiqueta: "Nature du revenu",
      opciones: [
        { valor: "dividendes", etiqueta: "Dividendes" },
        { valor: "interets", etiqueta: "Intérêts (placements, prêts, comptes courants d'associés, bons du Trésor)" },
        { valor: "administrateurs", etiqueta: "Jetons de présence et rémunérations d'administrateurs" },
        { valor: "cooperative", etiqueta: "Intérêts sur parts sociales ou ristournes de coopérative" },
      ],
      porDefecto: "dividendes",
    },
    { id: "montant", tipo: "moneda", etiqueta: "Montant brut distribué", min: 0, porDefecto: 10000000 },
  ],
  calcular(e, v, { redondear }) {
    if (e.montant <= 0) throw new ErrorEntrada("Indiquez un montant supérieur à zéro.", "montant");
    const abattement = e.nature === "dividendes" ? redondear(porcentaje(e.montant, v["mg.ircm-abattement-dividendes"])) : 0;
    const base = Math.floor((e.montant - abattement) / 1000) * 1000;
    const taux = v["mg.ircm-taux"][e.nature === "cooperative" ? "cooperative" : "general"];
    const impot = redondear(porcentaje(base, taux));
    return { impot, abattement, base, taux, net: redondear(e.montant - impot) };
  },
  resultado: [
    { clave: "impot", etiqueta: "IRCM à retenir", formato: "moneda", destacada: true },
    { clave: "abattement", etiqueta: "Abattement sur les dividendes", formato: "moneda", ocultarSiCero: true },
    { clave: "base", etiqueta: "Revenu imposable (arrondi au millier)", formato: "moneda" },
    { clave: "taux", etiqueta: "Taux", formato: "porcentaje", decimales: 0 },
    { clave: "net", etiqueta: "Montant net perçu", formato: "moneda" },
  ],
});
