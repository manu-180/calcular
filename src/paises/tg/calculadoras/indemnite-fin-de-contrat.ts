import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "tg.indemnite-fin-de-contrat",
  mercado: "tg",
  concepto: "liquidacion-final",
  slug: "indemnite-fin-de-contrat",
  estado: "publicado",
  requiere: { "tg.fin-de-contrat-duree": "numero", "tg.fin-de-contrat-mois": "numero" },
  campos: [
    { id: "annees", tipo: "entero", etiqueta: "Années consécutives en CDD", min: 0, max: 40, porDefecto: 4 },
    { id: "mois", tipo: "entero", etiqueta: "Mois en plus", min: 0, max: 11, porDefecto: 0 },
    { id: "salaire", tipo: "moneda", etiqueta: "Dernier salaire brut mensuel", min: 0, porDefecto: 250000 },
    {
      id: "suite",
      tipo: "opcion",
      etiqueta: "Comment se termine le contrat ?",
      opciones: [
        { valor: "fin", etiqueta: "Fin du CDD sans embauche en CDI" },
        { valor: "cdi", etiqueta: "Embauche en CDI à la suite du CDD" },
        { valor: "refus", etiqueta: "Refus d'un CDI pour un emploi similaire au moins aussi bien payé" },
        { valor: "economique", etiqueta: "Fin pour motif économique" },
      ],
      porDefecto: "fin",
    },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.salaire <= 0) throw new ErrorEntrada("Indiquez un salaire supérieur à zéro.", "salaire");
    if (entrada.mois > 11) throw new ErrorEntrada("Indiquez au plus 11 mois en plus des années complètes.", "mois");
    const duree = entrada.annees + entrada.mois / 12;
    const observaciones: string[] = [];
    let indemnite = 0;
    if (duree < v["tg.fin-de-contrat-duree"]) {
      observaciones.push(`L'indemnité n'est due qu'après ${v["tg.fin-de-contrat-duree"]} ans consécutifs de CDD.`);
    } else if (entrada.suite !== "fin") {
      observaciones.push("L'indemnité de fin de contrat n'est pas due dans ce cas (article 55 du Code du travail).");
    } else {
      indemnite = redondear(entrada.salaire * v["tg.fin-de-contrat-mois"]);
    }
    return { indemnite, droit: indemnite > 0 ? "Oui" : "Non", observaciones };
  },
  resultado: [
    { clave: "indemnite", etiqueta: "Indemnité de fin de contrat", formato: "moneda", destacada: true },
    { clave: "droit", etiqueta: "Droit à l'indemnité", formato: "texto" },
  ],
});
