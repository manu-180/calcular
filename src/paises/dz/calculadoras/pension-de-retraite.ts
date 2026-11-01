import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "dz.pension-de-retraite",
  mercado: "dz",
  concepto: "jubilacion",
  slug: "pension-de-retraite",
  estado: "publicado",
  requiere: { "dz.retraite": "mapa", "dz.retraite-conditions": "mapa" },
  campos: [
    {
      id: "salaire",
      tipo: "moneda",
      etiqueta: "Salaire mensuel moyen de référence",
      min: 0,
      porDefecto: 80000,
      ayuda: "Salaire mensuel brut soumis à cotisation que la CNR retient comme base de calcul.",
    },
    { id: "annees", tipo: "entero", etiqueta: "Années validées", min: 0, max: 50, porDefecto: 30 },
    { id: "trimestres", tipo: "entero", etiqueta: "Trimestres validés en plus", min: 0, max: 3, porDefecto: 0, ayuda: "Trimestres d'une année incomplète, de 0 à 3." },
  ],
  calcular(e, v, { redondear }) {
    if (e.salaire <= 0) throw new ErrorEntrada("Indiquez un salaire de référence supérieur à zéro.", "salaire");
    const r = v["dz.retraite"];
    const c = v["dz.retraite-conditions"];
    const duree = e.annees + e.trimestres / 4;
    const tauxCalcule = r.annuite * duree;
    const taux = Math.min(r.plafond, tauxCalcule);
    const mensuelle = redondear(porcentaje(e.salaire, taux));
    const observaciones = [
      `Le droit à pension suppose ${c.age} ans au moins (${c["age-femme"]} ans révolus pour une femme qui le demande) et ${c.duree} ans de travail. La CNR applique ensuite les retenues sur la pension.`,
      `La loi limite aussi le montant net de la pension à ${r.plafond} % du salaire net de cotisations et d'impôt.`,
    ];
    if (duree < c.duree) observaciones.unshift(`Avec moins de ${c.duree} ans de travail, la condition de durée pour la pension de retraite n'est pas remplie.`);
    return {
      mensuelle,
      annuelle: redondear(mensuelle * 12),
      taux,
      duree,
      anneesUtiles: Math.ceil(r.plafond / r.annuite),
      observaciones,
    };
  },
  resultado: [
    { clave: "mensuelle", etiqueta: "Pension mensuelle brute estimée", formato: "moneda", destacada: true },
    { clave: "annuelle", etiqueta: "Pension sur 12 mois", formato: "moneda" },
    { clave: "taux", etiqueta: "Taux de la pension", formato: "porcentaje", decimales: 2 },
    { clave: "duree", etiqueta: "Durée validée retenue", formato: "anios", decimales: 2 },
    { clave: "anneesUtiles", etiqueta: "Années pour atteindre le taux maximal", formato: "anios" },
  ],
});
