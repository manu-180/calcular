import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { dureeTexte, moisComplets } from "../lib/datum";

export default definirCalculadora({
  id: "tn.indemnite-licenciement-abusif",
  mercado: "tn",
  concepto: "propio",
  slug: "indemnite-licenciement-abusif",
  estado: "publicado",
  requiere: {
    "tn.licenciement-abusif": "mapa",
  },
  campos: [
    { id: "salaire", tipo: "moneda", etiqueta: "Salaire mensuel au moment du licenciement", min: 0, porDefecto: 1500, ayuda: "Avec les avantages qui ne remboursent pas des frais." },
    { id: "embauche", tipo: "fecha", etiqueta: "Date d'embauche", porDefecto: "2018-01-01" },
    { id: "rupture", tipo: "fecha", etiqueta: "Date du licenciement", porDefecto: "hoy" },
    {
      id: "cas",
      tipo: "opcion",
      etiqueta: "Situation",
      opciones: [
        { valor: "sans-motif", etiqueta: "Licenciement sans motif réel et sérieux" },
        { valor: "procedure", etiqueta: "Motif réel et sérieux, procédure non respectée" },
      ],
      porDefecto: "sans-motif",
    },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.salaire <= 0) throw new ErrorEntrada("Indiquez un salaire supérieur à zéro.", "salaire");
    if (entrada.rupture <= entrada.embauche) throw new ErrorEntrada("La date du licenciement doit suivre la date d'embauche.", "rupture");
    const t = v["tn.licenciement-abusif"];
    const mois = moisComplets(entrada.embauche, entrada.rupture);
    const annees = Math.floor(mois / 12);
    let moisMin: number;
    let moisMax: number;
    if (entrada.cas === "procedure") {
      moisMin = t["procedure-min"];
      moisMax = t["procedure-max"];
    } else {
      moisMin = Math.min(annees * t["mois-par-an-min"], t["plafond-mois"]);
      moisMax = Math.min(annees * t["mois-par-an-max"], t["plafond-mois"]);
    }
    return {
      maximum: redondear(moisMax * entrada.salaire),
      minimum: redondear(moisMin * entrada.salaire),
      anciennete: dureeTexte(mois),
      plafond: redondear(t["plafond-mois"] * entrada.salaire),
      observaciones: [
        "Fourchette fixée par l'article 23 bis du code du travail : le juge fixe le montant selon la qualification, l'ancienneté, l'âge, le salaire et la situation de famille du salarié. Le calcul retient les années complètes d'ancienneté.",
        "Ces dommages et intérêts s'ajoutent à l'indemnité de fin de service et à l'indemnité pour préavis non respecté.",
      ],
    };
  },
  resultado: [
    { clave: "maximum", etiqueta: "Dommages et intérêts au plus", formato: "moneda", destacada: true },
    { clave: "minimum", etiqueta: "Dommages et intérêts au moins", formato: "moneda" },
    { clave: "anciennete", etiqueta: "Ancienneté", formato: "texto" },
    { clave: "plafond", etiqueta: "Plafond légal (trois ans de salaire)", formato: "moneda" },
  ],
});
