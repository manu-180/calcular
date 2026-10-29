import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "tg.preavis",
  mercado: "tg",
  concepto: "preaviso",
  slug: "preavis",
  estado: "publicado",
  requiere: { "tg.preavis-jours-horaire": "numero", "tg.preavis-mois": "mapa" },
  campos: [
    {
      id: "categorie",
      tipo: "opcion",
      etiqueta: "Votre catégorie",
      opciones: [
        { valor: "horaire", etiqueta: "Travailleur payé à l'heure" },
        { valor: "employes", etiqueta: "Ouvrier, employé ou assimilé" },
        { valor: "cadres", etiqueta: "Agent de maîtrise, cadre ou assimilé" },
      ],
      porDefecto: "employes",
    },
    {
      id: "salaire",
      tipo: "moneda",
      etiqueta: "Rémunération mensuelle (salaire et avantages)",
      min: 0,
      porDefecto: 250000,
      ayuda: "Sert à estimer l'indemnité due si le préavis n'est pas effectué.",
    },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.salaire < 0) throw new ErrorEntrada("La rémunération ne peut pas être négative.", "salaire");
    const jours = entrada.categorie === "horaire" ? v["tg.preavis-jours-horaire"] : 0;
    const mois = entrada.categorie === "horaire" ? 0 : v["tg.preavis-mois"][entrada.categorie];
    return {
      duree: mois > 0 ? `${mois} mois` : `${jours} jours`,
      mois,
      jours,
      indemnite: redondear(entrada.salaire * mois + (entrada.salaire / 30) * jours),
      observaciones: jours > 0 ? ["Pour un préavis en jours, l'indemnité est estimée sur la base d'un mois de 30 jours."] : [],
    };
  },
  resultado: [
    { clave: "duree", etiqueta: "Durée minimale du préavis", formato: "texto", destacada: true },
    { clave: "mois", etiqueta: "Préavis en mois", formato: "meses", ocultarSiCero: true },
    { clave: "jours", etiqueta: "Préavis en jours", formato: "dias", ocultarSiCero: true },
    { clave: "indemnite", etiqueta: "Indemnité compensatrice si le préavis n'est pas effectué", formato: "moneda" },
  ],
});
