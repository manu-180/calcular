import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "ci.calcul-tva",
  mercado: "ci",
  concepto: "iva",
  slug: "calcul-tva",
  estado: "publicado",
  requiere: { "ci.tva-normal": "numero", "ci.tva-reduit": "numero" },
  campos: [
    {
      id: "operation",
      tipo: "opcion",
      etiqueta: "Que voulez-vous faire ?",
      opciones: [
        { valor: "ht-ttc", etiqueta: "Passer du HT au TTC (ajouter la TVA)" },
        { valor: "ttc-ht", etiqueta: "Passer du TTC au HT (retirer la TVA)" },
      ],
      porDefecto: "ht-ttc",
    },
    { id: "montant", tipo: "moneda", etiqueta: "Montant", min: 0, porDefecto: 100000 },
    {
      id: "taux",
      tipo: "opcion",
      etiqueta: "Taux de TVA",
      opciones: [
        { valor: "normal", etiqueta: "Taux de droit commun (la plupart des biens et services)" },
        { valor: "reduit", etiqueta: "Taux réduit (lait, pâtes de blé dur, produits pétroliers, lait infantile...)" },
      ],
      porDefecto: "normal",
    },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.montant < 0) throw new ErrorEntrada("Le montant ne peut pas être négatif.", "montant");
    const taux = entrada.taux === "normal" ? v["ci.tva-normal"] : v["ci.tva-reduit"];
    const ht = entrada.operation === "ht-ttc" ? redondear(entrada.montant) : redondear(entrada.montant / (1 + taux / 100));
    const tva = entrada.operation === "ht-ttc" ? redondear(porcentaje(ht, taux)) : redondear(entrada.montant - ht);
    return { taux, ht, tva, ttc: redondear(ht + tva) };
  },
  resultado: [
    { clave: "taux", etiqueta: "Taux de TVA appliqué", formato: "porcentaje" },
    { clave: "ht", etiqueta: "Montant hors taxes (HT)", formato: "moneda" },
    { clave: "tva", etiqueta: "Montant de la TVA", formato: "moneda", destacada: true },
    { clave: "ttc", etiqueta: "Montant toutes taxes comprises (TTC)", formato: "moneda" },
  ],
});
