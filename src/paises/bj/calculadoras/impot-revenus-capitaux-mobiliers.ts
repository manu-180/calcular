import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "bj.impot-revenus-capitaux-mobiliers",
  mercado: "bj",
  concepto: "retencion-honorarios",
  slug: "impot-revenus-capitaux-mobiliers",
  estado: "publicado",
  requiere: { "bj.ircm-taux": "mapa" },
  campos: [
    { id: "montant", tipo: "moneda", etiqueta: "Montant brut du revenu", min: 0, porDefecto: 5000000 },
    {
      id: "nature",
      tipo: "opcion",
      etiqueta: "Nature du revenu",
      opciones: [
        { valor: "dividendes", etiqueta: "Dividendes (cas général)" },
        { valor: "dividendes-cotees", etiqueta: "Dividendes de société cotée dans l'UEMOA ou versés à un non-résident" },
        { valor: "obligations", etiqueta: "Revenus d'obligations" },
        { valor: "obligations-publiques", etiqueta: "Obligations d'États de l'UEMOA, durée de 5 à 10 ans" },
        { valor: "creances", etiqueta: "Intérêts de créances, dépôts et cautionnements" },
      ],
      porDefecto: "dividendes",
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.montant <= 0) throw new ErrorEntrada("Indiquez un montant supérieur à zéro.", "montant");
    const taux = v["bj.ircm-taux"][e.nature];
    const impot = redondear(porcentaje(e.montant, taux));
    return { impot, taux, net: redondear(e.montant - impot) };
  },
  resultado: [
    { clave: "impot", etiqueta: "Impôt sur le revenu des capitaux mobiliers", formato: "moneda", destacada: true },
    { clave: "taux", etiqueta: "Taux appliqué", formato: "porcentaje" },
    { clave: "net", etiqueta: "Revenu après impôt", formato: "moneda" },
  ],
});
