import { definirCalculadora, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "ma.calcul-tva",
  mercado: "ma",
  concepto: "iva",
  slug: "calcul-tva",
  estado: "publicado",
  requiere: {
    "ma.tva-normal": "numero",
    "ma.tva-reduit": "numero",
  },
  campos: [
    { id: "montant", tipo: "moneda", etiqueta: "Montant", min: 0, porDefecto: 1000 },
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
        { valor: "normal", etiqueta: "Taux normal" },
        { valor: "reduit", etiqueta: "Taux réduit (notamment hébergement, restauration, eau, transport routier)" },
      ],
      porDefecto: "normal",
    },
  ],
  calcular(entrada, v, { redondear }) {
    const taux = entrada.taux === "normal" ? v["ma.tva-normal"] : v["ma.tva-reduit"];
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
