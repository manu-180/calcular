import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "bj.indemnite-licenciement-abusif",
  mercado: "bj",
  concepto: "indemnizacion-despido",
  slug: "indemnite-licenciement-abusif",
  estado: "publicado",
  requiere: {
    "bj.licenciement-abusif-mois": "mapa",
    "bj.licenciement-irregulier-mois": "numero",
    "bj.licenciement-irregulier-anciennete": "numero",
  },
  campos: [
    {
      id: "salaire",
      tipo: "moneda",
      etiqueta: "Salaire mensuel brut moyen des 12 derniers mois d'activité",
      min: 0,
      porDefecto: 250000,
    },
    {
      id: "situation",
      tipo: "opcion",
      etiqueta: "Situation du licenciement",
      opciones: [
        { valor: "abusif", etiqueta: "Abusif : aucun motif légitime" },
        { valor: "irregulier", etiqueta: "Motif légitime, mais formalités non respectées" },
      ],
      porDefecto: "abusif",
    },
    {
      id: "anciennete",
      tipo: "numero",
      etiqueta: "Années de travail effectif",
      min: 0,
      max: 60,
      porDefecto: 5,
      visibleSi: { situation: ["irregulier"] },
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.salaire <= 0) throw new ErrorEntrada("Indiquez un salaire supérieur à zéro.", "salaire");
    if (e.situation === "abusif") {
      const m = v["bj.licenciement-abusif-mois"];
      return {
        minimum: redondear(e.salaire * m.minimum),
        maximum: redondear(e.salaire * m.maximum),
        mois: `De ${m.minimum} à ${m.maximum} mois de salaire brut`,
      };
    }
    const mois = v["bj.licenciement-irregulier-mois"];
    const du = (e.anciennete ?? 0) >= v["bj.licenciement-irregulier-anciennete"];
    return {
      minimum: 0,
      maximum: du ? redondear(e.salaire * mois) : 0,
      mois: du ? `Jusqu'à ${mois} mois de salaire brut` : "Aucune indemnité avant un an de travail effectif",
    };
  },
  resultado: [
    { clave: "maximum", etiqueta: "Indemnité maximale", formato: "moneda", destacada: true },
    { clave: "minimum", etiqueta: "Indemnité minimale", formato: "moneda" },
    { clave: "mois", etiqueta: "Fourchette prévue par la loi", formato: "texto" },
  ],
});
