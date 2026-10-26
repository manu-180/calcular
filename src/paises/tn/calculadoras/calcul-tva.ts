import { definirCalculadora, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "tn.calcul-tva",
  mercado: "tn",
  concepto: "iva",
  slug: "calcul-tva",
  estado: "publicado",
  requiere: {
    "tn.tva-normal": "numero",
    "tn.tva-intermediaire": "numero",
    "tn.tva-reduit": "numero",
  },
  campos: [
    { id: "montant", tipo: "moneda", etiqueta: "Montant", min: 0, porDefecto: 100 },
    {
      id: "sens",
      tipo: "opcion",
      etiqueta: "Que voulez-vous calculer ?",
      opciones: [
        { valor: "ajouter", etiqueta: "Ajouter la TVA (le montant est hors taxe)" },
        { valor: "retirer", etiqueta: "Retirer la TVA (le montant est toutes taxes comprises)" },
      ],
      porDefecto: "ajouter",
    },
    {
      id: "taux",
      tipo: "opcion",
      etiqueta: "Taux de TVA",
      opciones: [
        { valor: "normal", etiqueta: "Taux général" },
        { valor: "intermediaire", etiqueta: "Taux intermédiaire (opérations de l'article 7, point 3)" },
        { valor: "reduit", etiqueta: "Taux réduit (produits et services du tableau B)" },
      ],
      porDefecto: "normal",
    },
  ],
  calcular(entrada, v, { redondear }) {
    const taux = entrada.taux === "normal" ? v["tn.tva-normal"] : entrada.taux === "intermediaire" ? v["tn.tva-intermediaire"] : v["tn.tva-reduit"];
    const ht = entrada.sens === "ajouter" ? entrada.montant : redondear(entrada.montant / (1 + taux / 100));
    const tva = entrada.sens === "ajouter" ? redondear(porcentaje(ht, taux)) : redondear(entrada.montant - ht);
    return { taux, ht, tva, ttc: redondear(ht + tva) };
  },
  resultado: [
    { clave: "tva", etiqueta: "TVA", formato: "moneda", destacada: true },
    { clave: "ht", etiqueta: "Montant hors taxe", formato: "moneda" },
    { clave: "ttc", etiqueta: "Montant toutes taxes comprises", formato: "moneda" },
    { clave: "taux", etiqueta: "Taux de TVA", formato: "porcentaje" },
  ],
});
