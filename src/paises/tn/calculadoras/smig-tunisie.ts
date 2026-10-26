import { definirCalculadora } from "@/motor/calculo";

export default definirCalculadora({
  id: "tn.smig-tunisie",
  mercado: "tn",
  concepto: "salario-minimo",
  slug: "smig-tunisie",
  estado: "borrador",
  requiere: {
    "tn.smig-mensuel": "mapa",
    "tn.smig-horaire": "mapa",
  },
  campos: [
    {
      id: "regime",
      tipo: "opcion",
      etiqueta: "Régime de travail",
      opciones: [
        { valor: "regime-48h", etiqueta: "48 heures par semaine" },
        { valor: "regime-40h", etiqueta: "40 heures par semaine" },
      ],
      porDefecto: "regime-48h",
    },
  ],
  calcular(entrada, v, { redondear }) {
    const mensuel = v["tn.smig-mensuel"][entrada.regime];
    return { mensuel, horaire: v["tn.smig-horaire"][entrada.regime], annuel: redondear(mensuel * 12) };
  },
  resultado: [
    { clave: "mensuel", etiqueta: "SMIG mensuel brut", formato: "moneda", destacada: true },
    { clave: "horaire", etiqueta: "SMIG horaire", formato: "moneda" },
    { clave: "annuel", etiqueta: "Par an", formato: "moneda" },
  ],
});
