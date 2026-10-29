import { definirCalculadora, enMapa } from "@/motor/calculo";

export default definirCalculadora({
  id: "bf.periode-d-essai",
  mercado: "bf",
  concepto: "propio",
  slug: "periode-d-essai",
  estado: "publicado",
  requiere: { "bf.essai-jours-horaire": "numero", "bf.essai-mois": "mapa" },
  campos: [
    {
      id: "categorie",
      tipo: "opcion",
      etiqueta: "Emploi à l'essai",
      opciones: [
        { valor: "horaire", etiqueta: "Salaire fixé à l'heure ou à la journée" },
        { valor: "employe", etiqueta: "Salarié au mois (ni cadre, ni agent de maîtrise, ni technicien)" },
        { valor: "cadre", etiqueta: "Cadre, agent de maîtrise, technicien et assimilés" },
      ],
      porDefecto: "employe",
    },
    { id: "renouvellement", tipo: "si-no", etiqueta: "L'essai est renouvelé", porDefecto: false },
  ],
  calcular(entrada, v) {
    const facteur = entrada.renouvellement ? 2 : 1;
    if (entrada.categorie === "horaire") {
      const jours = v["bf.essai-jours-horaire"];
      return { duree: `${jours * facteur} jours`, essai: `${jours} jours`, jours: jours * facteur, mois: 0 };
    }
    const mois = enMapa(v["bf.essai-mois"], entrada.categorie);
    return { duree: `${mois * facteur} mois`, essai: `${mois} mois`, jours: 0, mois: mois * facteur };
  },
  resultado: [
    { clave: "duree", etiqueta: "Durée maximale de l'essai", formato: "texto", destacada: true },
    { clave: "essai", etiqueta: "Durée d'un essai", formato: "texto" },
    { clave: "mois", etiqueta: "Total en mois", formato: "meses", ocultarSiCero: true },
    { clave: "jours", etiqueta: "Total en jours", formato: "dias", ocultarSiCero: true },
  ],
});
