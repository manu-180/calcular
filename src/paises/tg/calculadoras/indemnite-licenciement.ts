import { aplicarEscalaMarginal, definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "tg.indemnite-licenciement",
  mercado: "tg",
  concepto: "indemnizacion-despido",
  slug: "indemnite-licenciement",
  estado: "publicado",
  requiere: {
    "tg.licenciement-taux": "escala",
    "tg.licenciement-anciennete-min": "numero",
    "tg.mesure-accompagnement": "numero",
  },
  campos: [
    {
      id: "salaire",
      tipo: "moneda",
      etiqueta: "Salaire global mensuel moyen des 12 derniers mois",
      min: 0,
      porDefecto: 300000,
      ayuda: "Toutes les sommes versées en contrepartie du travail pendant les 12 mois avant le licenciement, divisées par 12.",
    },
    { id: "annees", tipo: "entero", etiqueta: "Années complètes de présence", min: 0, max: 60, porDefecto: 7 },
    { id: "mois", tipo: "entero", etiqueta: "Mois en plus", min: 0, max: 11, porDefecto: 0 },
    {
      id: "motif",
      tipo: "opcion",
      etiqueta: "Motif du licenciement",
      opciones: [
        { valor: "personnel", etiqueta: "Motif personnel, sans faute grave ni lourde" },
        { valor: "economique", etiqueta: "Motif économique" },
        { valor: "faute", etiqueta: "Faute grave ou lourde" },
      ],
      porDefecto: "personnel",
    },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.salaire <= 0) throw new ErrorEntrada("Indiquez un salaire supérieur à zéro.", "salaire");
    if (entrada.mois > 11) throw new ErrorEntrada("Indiquez au plus 11 mois en plus des années complètes.", "mois");
    const moisPresence = entrada.annees * 12 + entrada.mois;
    const observaciones: string[] = [];
    let indemnite = 0;
    let pourcentage = 0;
    if (entrada.motif === "faute") {
      observaciones.push("La faute grave ou lourde prive le travailleur de l'indemnité de licenciement.");
    } else if (moisPresence < v["tg.licenciement-anciennete-min"]) {
      observaciones.push(`Il faut au moins ${v["tg.licenciement-anciennete-min"]} mois d'ancienneté ininterrompue pour avoir droit à l'indemnité.`);
    } else {
      // Article 97 : un pourcentage par année de présence, différent selon la tranche d'ancienneté.
      pourcentage = Math.round(aplicarEscalaMarginal(v["tg.licenciement-taux"], entrada.annees) * 10000) / 100;
      indemnite = redondear((entrada.salaire * pourcentage) / 100);
      if (entrada.mois > 0) observaciones.push("Le barème légal compte les années de présence : les mois en plus ne sont pas retenus.");
    }
    const accompagnement = entrada.motif === "economique" ? redondear(entrada.salaire * v["tg.mesure-accompagnement"]) : 0;
    if (accompagnement > 0) observaciones.push("La mesure d'accompagnement est au moins d'un mois de salaire brut ; elle n'est pas imposable.");
    return { total: redondear(indemnite + accompagnement), indemnite, accompagnement, pourcentage, observaciones };
  },
  resultado: [
    { clave: "total", etiqueta: "Total à percevoir au minimum", formato: "moneda", destacada: true },
    { clave: "indemnite", etiqueta: "Indemnité de licenciement", formato: "moneda" },
    { clave: "accompagnement", etiqueta: "Mesure d'accompagnement (motif économique)", formato: "moneda", ocultarSiCero: true },
    { clave: "pourcentage", etiqueta: "Total des pourcentages appliqués au salaire", formato: "porcentaje", decimales: 2 },
  ],
});
