import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "bf.preavis",
  mercado: "bf",
  concepto: "preaviso",
  slug: "preavis",
  estado: "publicado",
  requiere: { "bf.preavis-jours-horaire": "numero", "bf.preavis-mois": "mapa" },
  campos: [
    {
      id: "categorie",
      tipo: "opcion",
      etiqueta: "Votre situation",
      opciones: [
        { valor: "horaire", etiqueta: "Salaire fixé à l'heure ou à la journée" },
        { valor: "employe", etiqueta: "Salarié au mois (ni cadre, ni agent de maîtrise, ni technicien)" },
        { valor: "cadre", etiqueta: "Cadre, agent de maîtrise, technicien et assimilés" },
      ],
      porDefecto: "employe",
    },
    {
      id: "salaire",
      tipo: "moneda",
      etiqueta: "Salaire mensuel (rémunération et avantages)",
      min: 0,
      porDefecto: 150000,
      visibleSi: { categorie: ["employe", "cadre"] },
    },
    {
      id: "journalier",
      tipo: "moneda",
      etiqueta: "Salaire journalier (rémunération et avantages)",
      min: 0,
      porDefecto: 3000,
      visibleSi: { categorie: ["horaire"] },
    },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.categorie === "horaire") {
      const journalier = entrada.journalier ?? 0;
      if (journalier < 0) throw new ErrorEntrada("Le salaire ne peut pas être négatif.", "journalier");
      const jours = v["bf.preavis-jours-horaire"];
      return { duree: `${jours} jours`, jours, mois: 0, indemnite: redondear(journalier * jours) };
    }
    const salaire = entrada.salaire ?? 0;
    if (salaire < 0) throw new ErrorEntrada("Le salaire ne peut pas être négatif.", "salaire");
    const mois = enMapa(v["bf.preavis-mois"], entrada.categorie);
    return { duree: `${mois} mois`, jours: 0, mois, indemnite: redondear(salaire * mois) };
  },
  resultado: [
    { clave: "duree", etiqueta: "Durée du préavis", formato: "texto", destacada: true },
    { clave: "mois", etiqueta: "Préavis en mois", formato: "meses", ocultarSiCero: true },
    { clave: "jours", etiqueta: "Préavis en jours", formato: "dias", ocultarSiCero: true },
    { clave: "indemnite", etiqueta: "Indemnité compensatrice si le préavis n'est pas observé", formato: "moneda" },
  ],
});
