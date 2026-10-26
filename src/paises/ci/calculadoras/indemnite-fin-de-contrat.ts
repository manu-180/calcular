import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "ci.indemnite-fin-de-contrat",
  mercado: "ci",
  concepto: "liquidacion-final",
  slug: "indemnite-fin-de-contrat",
  estado: "publicado",
  requiere: { "ci.fin-contrat-taux": "numero" },
  campos: [
    {
      id: "total",
      tipo: "moneda",
      etiqueta: "Total des salaires bruts perçus pendant le CDD",
      min: 0,
      porDefecto: 1800000,
      ayuda: "Additionnez les salaires bruts de tous les mois du contrat.",
    },
    {
      id: "fin",
      tipo: "opcion",
      etiqueta: "Comment se termine le contrat ?",
      opciones: [
        { valor: "terme", etiqueta: "À son terme, sans CDI proposé" },
        { valor: "refus", etiqueta: "Vous refusez un CDI pour un emploi similaire, au moins aussi bien payé" },
        { valor: "rupture", etiqueta: "Vous rompez le contrat avant terme, ou faute lourde" },
      ],
      porDefecto: "terme",
    },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.total <= 0) throw new ErrorEntrada("Indiquez un total de salaires supérieur à zéro.", "total");
    const due = entrada.fin === "terme";
    return {
      indemnite: due ? redondear(porcentaje(entrada.total, v["ci.fin-contrat-taux"])) : 0,
      taux: v["ci.fin-contrat-taux"],
      droit: due ? "L'indemnité de fin de contrat est due." : "L'indemnité de fin de contrat n'est pas due dans ce cas.",
    };
  },
  resultado: [
    { clave: "indemnite", etiqueta: "Indemnité de fin de contrat", formato: "moneda", destacada: true },
    { clave: "droit", etiqueta: "Droit à l'indemnité", formato: "texto" },
    { clave: "taux", etiqueta: "Taux appliqué", formato: "porcentaje" },
  ],
});
