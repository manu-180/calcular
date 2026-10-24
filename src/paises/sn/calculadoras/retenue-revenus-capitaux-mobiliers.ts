import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "sn.retenue-revenus-capitaux-mobiliers",
  mercado: "sn",
  concepto: "propio",
  slug: "retenue-revenus-capitaux-mobiliers",
  estado: "publicado",
  requiere: { "sn.rcm": "mapa" },
  campos: [
    {
      id: "type",
      tipo: "opcion",
      etiqueta: "Type de revenu",
      opciones: [
        { valor: "actions", etiqueta: "Dividendes (actions, parts sociales)" },
        { valor: "obligations", etiqueta: "Intérêts d'obligations" },
        { valor: "obligations-5-ans", etiqueta: "Obligations émises au Sénégal, 5 ans ou plus" },
        { valor: "depots", etiqueta: "Intérêts de comptes de dépôt et comptes courants" },
        { valor: "bons-de-caisse", etiqueta: "Intérêts de bons de caisse" },
        { valor: "lots", etiqueta: "Lots" },
        { valor: "autres", etiqueta: "Autres (jetons de présence, créances, cautionnements)" },
      ],
      porDefecto: "actions",
    },
    { id: "montant", tipo: "moneda", etiqueta: "Montant brut", min: 0, porDefecto: 1000000 },
  ],
  calcular(e, v, { redondear }) {
    if (e.montant <= 0) throw new ErrorEntrada("Inscrivez un montant supérieur à zéro.", "montant");
    const taux = v["sn.rcm"][e.type];
    const retenue = redondear(porcentaje(e.montant, taux));
    return { net: redondear(e.montant - retenue), retenue, taux };
  },
  resultado: [
    { clave: "net", etiqueta: "Montant net après retenue", formato: "moneda", destacada: true },
    { clave: "retenue", etiqueta: "Retenue à la source", formato: "moneda" },
    { clave: "taux", etiqueta: "Taux de la retenue", formato: "porcentaje", decimales: 0 },
  ],
});
