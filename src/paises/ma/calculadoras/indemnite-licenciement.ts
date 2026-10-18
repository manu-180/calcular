import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { dureeTexte, moisComplets } from "../lib/datum";

export default definirCalculadora({
  id: "ma.indemnite-licenciement",
  mercado: "ma",
  concepto: "indemnizacion-despido",
  slug: "indemnite-licenciement",
  estado: "publicado",
  requiere: {
    "ma.indemnite-licenciement": "mapa",
    "ma.duree-travail": "mapa",
  },
  campos: [
    { id: "mensuel", tipo: "moneda", etiqueta: "Salaire mensuel moyen des 52 dernières semaines", min: 0, porDefecto: 8000, ayuda: "Le salaire et ses accessoires, en moyenne sur l'année précédant la rupture." },
    { id: "embauche", tipo: "fecha", etiqueta: "Date d'embauche", porDefecto: "2018-01-01" },
    { id: "rupture", tipo: "fecha", etiqueta: "Date de la rupture du contrat", porDefecto: "hoy" },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.mensuel <= 0) throw new ErrorEntrada("Indiquez un salaire supérieur à zéro.", "mensuel");
    if (entrada.rupture <= entrada.embauche) throw new ErrorEntrada("La date de rupture doit suivre la date d'embauche.", "rupture");
    const t = v["ma.indemnite-licenciement"];
    const mois = moisComplets(entrada.embauche, entrada.rupture);
    const ans = mois / 12;
    const horaire = redondear((entrada.mensuel * 12) / v["ma.duree-travail"].annuelle);
    const tranche = (de: number, a: number) => Math.max(0, Math.min(ans, a) - de);
    // Le code compte chaque année « ou fraction d'année » : la dernière année entamée est prise au prorata des mois.
    const heures =
      mois < 6
        ? 0
        : redondear(t["ans-1-a-5"] * tranche(0, 5) + t["ans-6-a-10"] * tranche(5, 10) + t["ans-11-a-15"] * tranche(10, 15) + t["au-dela-de-15"] * Math.max(0, ans - 15));
    const observaciones: string[] = [];
    if (mois < 6) observaciones.push("L'indemnité de licenciement n'est due qu'après six mois de travail dans la même entreprise.");
    observaciones.push("L'indemnité n'est pas due en cas de faute grave. Le contrat, la convention collective ou le règlement intérieur peuvent prévoir des montants plus favorables.");
    return { indemnite: redondear(heures * horaire), heures, horaire, anciennete: dureeTexte(mois), observaciones };
  },
  resultado: [
    { clave: "indemnite", etiqueta: "Indemnité de licenciement", formato: "moneda", destacada: true },
    { clave: "anciennete", etiqueta: "Ancienneté", formato: "texto" },
    { clave: "heures", etiqueta: "Heures de salaire dues", formato: "horas", decimales: 2 },
    { clave: "horaire", etiqueta: "Salaire horaire", formato: "moneda" },
  ],
});
