import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "dz.snmg-algerie",
  mercado: "dz",
  concepto: "salario-minimo",
  slug: "snmg-algerie",
  estado: "publicado",
  requiere: {
    "dz.snmg": "numero",
    "dz.snmg-horaire": "numero",
    "dz.heures-mensuelles": "numero",
    "dz.duree-legale": "numero",
  },
  campos: [
    { id: "heures", tipo: "numero", etiqueta: "Heures de travail par semaine", min: 1, max: 60, porDefecto: 40 },
    { id: "salaire", tipo: "moneda", etiqueta: "Votre salaire de base mensuel (facultatif)", min: 0, requerido: false, ayuda: "Pour vérifier qu'il atteint le minimum." },
  ],
  calcular(e, v, { redondear }) {
    if (e.heures <= 0) throw new ErrorEntrada("Indiquez un nombre d'heures supérieur à zéro.", "heures");
    const legale = v["dz.duree-legale"];
    const tempsPlein = e.heures >= legale;
    const minimum = tempsPlein ? v["dz.snmg"] : redondear((v["dz.snmg"] * e.heures) / legale);
    const heuresMois = redondear((v["dz.heures-mensuelles"] * Math.min(e.heures, legale)) / legale);
    const ecart = e.salaire === null ? null : redondear(e.salaire - minimum);
    const observaciones: string[] = [];
    if (!tempsPlein) observaciones.push("Pour un temps partiel, le minimum est ramené au prorata des heures sur la base du taux horaire du SNMG.");
    if (e.heures > legale) observaciones.push("Les heures au-delà de la durée légale sont des heures supplémentaires, payées avec une majoration en plus du salaire mensuel.");
    if (ecart !== null) observaciones.push(ecart >= 0 ? "Votre salaire atteint le minimum." : "Votre salaire est inférieur au minimum pour ces heures.");
    return {
      minimum,
      horaire: v["dz.snmg-horaire"],
      heuresMois,
      annuel: redondear(minimum * 12),
      ecart,
      observaciones,
    };
  },
  resultado: [
    { clave: "minimum", etiqueta: "Salaire minimum mensuel", formato: "moneda", destacada: true },
    { clave: "horaire", etiqueta: "Taux horaire du SNMG", formato: "moneda" },
    { clave: "heuresMois", etiqueta: "Heures payées par mois", formato: "numero", decimales: 2 },
    { clave: "annuel", etiqueta: "Minimum sur 12 mois", formato: "moneda" },
    { clave: "ecart", etiqueta: "Écart entre votre salaire et le minimum", formato: "moneda" },
  ],
});
