import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "bf.smig",
  mercado: "bf",
  concepto: "salario-minimo",
  slug: "smig",
  estado: "publicado",
  requiere: { "bf.smig": "numero", "bf.smig-horaire": "numero", "bf.duree-legale": "numero" },
  campos: [
    {
      id: "salaire",
      tipo: "moneda",
      etiqueta: "Salaire mensuel proposé ou reçu",
      min: 0,
      porDefecto: 45000,
      ayuda: "Pour un emploi à temps plein hors exploitation agricole, avant les retenues.",
    },
    {
      id: "heures",
      tipo: "numero",
      etiqueta: "Heures de travail par semaine",
      min: 1,
      max: 40,
      porDefecto: 40,
    },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.salaire < 0) throw new ErrorEntrada("Le salaire ne peut pas être négatif.", "salaire");
    if (entrada.heures <= 0) throw new ErrorEntrada("Indiquez un nombre d'heures supérieur à zéro.", "heures");
    const smig = v["bf.smig"];
    const smigHoraire = v["bf.smig-horaire"];
    // Le minimum suit le SMIG mensuel au prorata de la durée légale ; le salaire horaire se calcule
    // sur 52 semaines réparties en 12 mois.
    const heuresMois = (entrada.heures * 52) / 12;
    const horaire = Math.round((entrada.salaire / heuresMois) * 100) / 100;
    const minimumDu = redondear((smig * entrada.heures) / v["bf.duree-legale"]);
    const ecart = entrada.salaire - minimumDu;
    return {
      verdict: ecart >= 0 ? "Le salaire atteint au moins le SMIG." : "Le salaire est inférieur au SMIG.",
      smig,
      smigHoraire,
      horaire,
      minimumDu,
      manque: ecart < 0 ? redondear(-ecart) : 0,
      heuresLegales: v["bf.duree-legale"],
    };
  },
  resultado: [
    { clave: "verdict", etiqueta: "Résultat", formato: "texto", destacada: true },
    { clave: "smig", etiqueta: "SMIG mensuel", formato: "moneda" },
    { clave: "smigHoraire", etiqueta: "SMIG horaire", formato: "moneda", decimales: 2 },
    { clave: "horaire", etiqueta: "Votre salaire horaire", formato: "moneda", decimales: 2 },
    { clave: "minimumDu", etiqueta: "Minimum pour vos heures", formato: "moneda" },
    { clave: "manque", etiqueta: "Montant manquant", formato: "moneda", ocultarSiCero: true },
    { clave: "heuresLegales", etiqueta: "Durée légale par semaine", formato: "horas" },
  ],
});
