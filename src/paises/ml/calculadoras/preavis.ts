import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "ml.preavis",
  mercado: "ml",
  concepto: "preaviso",
  slug: "preavis",
  estado: "publicado",
  requiere: { "ml.preavis-mois": "mapa", "ml.preavis-jours": "numero" },
  campos: [
    {
      id: "categorie",
      tipo: "opcion",
      etiqueta: "Votre situation",
      opciones: [
        { valor: "journalier", etiqueta: "Payé à la journée ou à la semaine" },
        { valor: "mensuel", etiqueta: "Payé au mois" },
        { valor: "maitrise", etiqueta: "Agent de maîtrise ou assimilé" },
        { valor: "cadre", etiqueta: "Cadre ou personnel de direction" },
      ],
      porDefecto: "mensuel",
    },
    { id: "salaire", tipo: "moneda", etiqueta: "Salaire mensuel (pour l'indemnité compensatrice)", min: 0, porDefecto: 150000 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.salaire < 0) throw new ErrorEntrada("Le salaire ne peut pas être négatif.", "salaire");
    const journalier = entrada.categorie === "journalier";
    const jours = journalier ? v["ml.preavis-jours"] : 0;
    const mois = journalier ? 0 : v["ml.preavis-mois"][entrada.categorie];
    const indemnite = redondear(entrada.salaire * mois + (entrada.salaire / 30) * jours);
    return {
      duree: mois > 0 ? `${mois} mois` : `${jours} jours`,
      mois,
      jours,
      indemnite,
      observaciones: jours > 0 ? ["Pour un préavis en jours, l'indemnité est estimée sur un mois de 30 jours."] : [],
    };
  },
  resultado: [
    { clave: "duree", etiqueta: "Durée du préavis", formato: "texto", destacada: true },
    { clave: "mois", etiqueta: "Préavis en mois", formato: "meses", ocultarSiCero: true },
    { clave: "jours", etiqueta: "Préavis en jours", formato: "dias", ocultarSiCero: true },
    { clave: "indemnite", etiqueta: "Indemnité compensatrice si le préavis n'est pas effectué", formato: "moneda" },
  ],
});
