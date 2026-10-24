import { definirCalculadora } from "@/motor/calculo";

export default definirCalculadora({
  id: "ma.delai-de-preavis",
  mercado: "ma",
  concepto: "preaviso",
  slug: "delai-de-preavis",
  estado: "borrador",
  requiere: {
    "ma.preavis": "mapa",
  },
  campos: [
    {
      id: "categorie",
      tipo: "opcion",
      etiqueta: "Catégorie",
      opciones: [
        { valor: "cadre", etiqueta: "Cadre ou assimilé" },
        { valor: "employe", etiqueta: "Employé ou ouvrier" },
      ],
      porDefecto: "employe",
    },
    { id: "anciennete", tipo: "numero", etiqueta: "Ancienneté en années", min: 0, porDefecto: 3 },
  ],
  calcular(entrada, v) {
    const p = v["ma.preavis"];
    const tranche = entrada.anciennete < 1 ? "moins-1-an" : entrada.anciennete <= 5 ? "1-a-5-ans" : "plus-5-ans";
    return { jours: p[`${entrada.categorie}-${tranche}`] };
  },
  resultado: [{ clave: "jours", etiqueta: "Délai de préavis", formato: "dias", destacada: true }],
});
