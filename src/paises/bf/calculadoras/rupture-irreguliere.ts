import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "bf.rupture-irreguliere",
  mercado: "bf",
  concepto: "propio",
  slug: "rupture-irreguliere",
  estado: "publicado",
  requiere: { "bf.rupture-irreguliere": "mapa", "bf.dommages-plafond": "mapa" },
  campos: [
    {
      id: "cas",
      tipo: "opcion",
      etiqueta: "Situation",
      opciones: [
        { valor: "licenciement", etiqueta: "Licenciement fondé mais sans la procédure (pas d'écrit ou pas de motif)" },
        { valor: "demission", etiqueta: "Démission non notifiée par écrit" },
      ],
      porDefecto: "licenciement",
    },
    {
      id: "salaire",
      tipo: "moneda",
      etiqueta: "Salaire global mensuel moyen des six derniers mois",
      min: 0,
      porDefecto: 150000,
      ayuda: "Ou depuis l'entrée dans l'entreprise si l'ancienneté est inférieure à six mois.",
    },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.salaire <= 0) throw new ErrorEntrada("Indiquez un salaire supérieur à zéro.", "salaire");
    const licenciement = entrada.cas === "licenciement";
    const mois = v["bf.rupture-irreguliere"][licenciement ? "licenciement" : "demission"];
    const plafondMois = v["bf.dommages-plafond"][licenciement ? "employeur" : "travailleur"];
    return {
      indemnite: redondear(entrada.salaire * mois),
      mois,
      beneficiaire: licenciement ? "Le travailleur" : "L'employeur",
      plafondMois,
      plafond: redondear(entrada.salaire * plafondMois),
    };
  },
  resultado: [
    { clave: "indemnite", etiqueta: "Indemnité pour rupture irrégulière", formato: "moneda", destacada: true },
    { clave: "beneficiaire", etiqueta: "Qui la reçoit", formato: "texto" },
    { clave: "mois", etiqueta: "En mois de salaire", formato: "meses" },
    { clave: "plafond", etiqueta: "Plafond des dommages et intérêts si la rupture est jugée abusive", formato: "moneda" },
    { clave: "plafondMois", etiqueta: "Plafond en mois de salaire", formato: "meses" },
  ],
});
