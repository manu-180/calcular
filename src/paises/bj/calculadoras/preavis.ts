import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "bj.preavis",
  mercado: "bj",
  concepto: "preaviso",
  slug: "preavis",
  estado: "publicado",
  requiere: { "bj.preavis-duree": "mapa", "bj.preavis-jours-liberte": "numero" },
  campos: [
    {
      id: "categorie",
      tipo: "opcion",
      etiqueta: "Catégorie du travailleur",
      opciones: [
        { valor: "horaire", etiqueta: "Payé à l'heure" },
        { valor: "employe", etiqueta: "Employé, ouvrier ou manœuvre" },
        { valor: "cadre", etiqueta: "Agent de maîtrise, cadre ou assimilé" },
      ],
      porDefecto: "employe",
    },
    {
      id: "salaire",
      tipo: "moneda",
      etiqueta: "Rémunération mensuelle, avantages de toute nature compris",
      min: 0,
      porDefecto: 200000,
    },
    {
      id: "respectes",
      tipo: "entero",
      etiqueta: "Jours de préavis effectivement respectés",
      min: 0,
      max: 120,
      porDefecto: 0,
      ayuda: "Zéro si le contrat a été rompu sans aucun préavis.",
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.salaire <= 0) throw new ErrorEntrada("Indiquez une rémunération supérieure à zéro.", "salaire");
    const duree = v["bj.preavis-duree"][e.categorie];
    const manquants = Math.max(0, duree - e.respectes);
    const indemnite = redondear((e.salaire / 30) * manquants);
    const semaines = Math.floor(duree / 7);
    return {
      duree,
      manquants,
      indemnite,
      joursLiberte: semaines * v["bj.preavis-jours-liberte"],
      observaciones: ["Un mois est compté pour 30 jours. Votre convention collective ou votre contrat peut prévoir un préavis plus long."],
    };
  },
  resultado: [
    { clave: "indemnite", etiqueta: "Indemnité compensatrice du préavis non respecté", formato: "moneda", destacada: true },
    { clave: "duree", etiqueta: "Durée légale du préavis", formato: "dias" },
    { clave: "manquants", etiqueta: "Jours de préavis non respectés", formato: "dias" },
    { clave: "joursLiberte", etiqueta: "Jours de liberté payés pour chercher un emploi (semaines entières)", formato: "dias" },
  ],
});
