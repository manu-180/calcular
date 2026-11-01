import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "dz.capital-deces",
  mercado: "dz",
  concepto: "propio",
  slug: "capital-deces",
  estado: "publicado",
  requiere: { "dz.capital-deces": "mapa", "dz.snmg": "numero" },
  campos: [
    {
      id: "salaire",
      tipo: "moneda",
      etiqueta: "Salaire mensuel le plus favorable",
      min: 0,
      porDefecto: 60000,
      ayuda: "Le salaire mensuel le plus élevé soumis à cotisation durant l'année qui a précédé le décès.",
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.salaire < 0) throw new ErrorEntrada("Indiquez un salaire positif ou nul.", "salaire");
    const c = v["dz.capital-deces"];
    const calcule = redondear(e.salaire * c.salaire);
    const minimum = redondear(v["dz.snmg"] * c.minimum);
    return {
      capital: Math.max(calcule, minimum),
      calcule,
      minimum,
      observaciones: [
        "Le capital est versé en une seule fois, dès le décès, aux ayants droit de l'assuré : conjoint, enfants à charge et ascendants à charge. Le droit suppose d'avoir travaillé au moins quinze jours ou cent heures dans les trois mois précédant le décès.",
      ],
    };
  },
  resultado: [
    { clave: "capital", etiqueta: "Capital décès versé par la CNAS", formato: "moneda", destacada: true },
    { clave: "calcule", etiqueta: "Douze mois du salaire indiqué", formato: "moneda" },
    { clave: "minimum", etiqueta: "Minimum légal", formato: "moneda" },
  ],
});
