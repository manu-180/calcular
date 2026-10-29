import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "dz.calcul-tva",
  mercado: "dz",
  concepto: "iva",
  slug: "calcul-tva",
  estado: "publicado",
  requiere: {
    "dz.tva-normal": "numero",
    "dz.tva-reduit": "numero",
  },
  campos: [
    { id: "montant", tipo: "moneda", etiqueta: "Montant", min: 0, porDefecto: 10000 },
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
        { valor: "reduit", etiqueta: "Taux réduit (opérations de l'article 23 du code des taxes sur le chiffre d'affaires)" },
      ],
      porDefecto: "normal",
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.montant <= 0) throw new ErrorEntrada("Indiquez un montant supérieur à zéro.", "montant");
    const taux = e.taux === "normal" ? v["dz.tva-normal"] : v["dz.tva-reduit"];
    const ht = e.sens === "ajouter" ? e.montant : redondear(e.montant / (1 + taux / 100));
    const tva = e.sens === "ajouter" ? redondear(porcentaje(ht, taux)) : redondear(e.montant - ht);
    return { tva, ht, ttc: redondear(ht + tva), taux };
  },
  resultado: [
    { clave: "tva", etiqueta: "Montant de la TVA", formato: "moneda", destacada: true },
    { clave: "ht", etiqueta: "Montant hors taxe (HT)", formato: "moneda" },
    { clave: "ttc", etiqueta: "Montant toutes taxes comprises (TTC)", formato: "moneda" },
    { clave: "taux", etiqueta: "Taux appliqué", formato: "porcentaje" },
  ],
});
