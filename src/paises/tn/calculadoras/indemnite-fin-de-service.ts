import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { dureeTexte, moisComplets } from "../lib/datum";

export default definirCalculadora({
  id: "tn.indemnite-fin-de-service",
  mercado: "tn",
  concepto: "indemnizacion-despido",
  slug: "indemnite-fin-de-service",
  estado: "publicado",
  requiere: {
    "tn.indemnite-fin-de-service": "mapa",
  },
  campos: [
    { id: "mensuel", tipo: "moneda", etiqueta: "Salaire mensuel au moment du licenciement", min: 0, porDefecto: 1500 },
    { id: "journalier", tipo: "moneda", etiqueta: "Salaire journalier", min: 0, porDefecto: 60 },
    { id: "embauche", tipo: "fecha", etiqueta: "Date d'embauche", porDefecto: "2018-01-01" },
    { id: "rupture", tipo: "fecha", etiqueta: "Date du licenciement", porDefecto: "hoy" },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.mensuel <= 0) throw new ErrorEntrada("Indiquez un salaire supérieur à zéro.", "mensuel");
    if (entrada.rupture <= entrada.embauche) throw new ErrorEntrada("La date du licenciement doit suivre la date d'embauche.", "rupture");
    const t = v["tn.indemnite-fin-de-service"];
    const mois = moisComplets(entrada.embauche, entrada.rupture);
    const brute = redondear(mois * t["jours-par-mois"] * entrada.journalier);
    const plafond = redondear(t["plafond-mois"] * entrada.mensuel);
    return {
      indemnite: Math.min(brute, plafond),
      anciennete: dureeTexte(mois),
      plafond,
      observaciones: ["Due au salarié en contrat à durée indéterminée licencié après la période d'essai, sauf faute grave."],
    };
  },
  resultado: [
    { clave: "indemnite", etiqueta: "Indemnité de fin de service", formato: "moneda", destacada: true },
    { clave: "anciennete", etiqueta: "Ancienneté", formato: "texto" },
    { clave: "plafond", etiqueta: "Plafond légal", formato: "moneda" },
  ],
});
