import { definirCalculadora } from "@/motor/calculo";

export default definirCalculadora({
  id: "tn.conges-payes",
  mercado: "tn",
  concepto: "vacaciones",
  slug: "conges-payes",
  estado: "publicado",
  requiere: {
    "tn.conges-payes": "mapa",
  },
  campos: [
    { id: "mois", tipo: "entero", etiqueta: "Mois de travail effectif chez le même employeur dans l'année", min: 0, max: 12, porDefecto: 12 },
    {
      id: "age",
      tipo: "opcion",
      etiqueta: "Votre âge au 31 décembre",
      opciones: [
        { valor: "adulte", etiqueta: "20 ans ou plus" },
        { valor: "jeune", etiqueta: "De 18 à 20 ans" },
        { valor: "mineur", etiqueta: "Moins de 18 ans" },
      ],
      porDefecto: "adulte",
    },
  ],
  calcular(entrada, v) {
    const c = v["tn.conges-payes"];
    const [parMois, plafond] =
      entrada.age === "mineur"
        ? [c["par-mois-moins-de-18-ans"], c["plafond-moins-de-18-ans"]]
        : entrada.age === "jeune"
          ? [c["par-mois-18-a-20-ans"], c["plafond-18-a-20-ans"]]
          : [c["par-mois"], c.plafond];
    const jours = Math.min(entrada.mois * parMois, plafond);
    const observaciones = ["Le code du travail fixe un minimum. Votre convention collective peut accorder davantage, notamment selon l'ancienneté."];
    if (entrada.mois < 1) observaciones.unshift("Le droit au congé suppose au moins un mois de travail effectif chez le même employeur.");
    return { jours, parMois, plafond, observaciones };
  },
  resultado: [
    { clave: "jours", etiqueta: "Jours de congé payé", formato: "dias", destacada: true, decimales: 1 },
    { clave: "parMois", etiqueta: "Jours acquis par mois de travail", formato: "dias", decimales: 1 },
    { clave: "plafond", etiqueta: "Maximum légal", formato: "dias" },
  ],
});
