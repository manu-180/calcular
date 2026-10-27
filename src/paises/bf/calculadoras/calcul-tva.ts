import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

// Article 317 du CGI : les fractions de franc issues de la liquidation sont arrondies au franc
// inférieur. L'arrondi au centime d'abord évite qu'une division inexacte retire un franc.
const francInferieur = (x: number) => Math.floor(Math.round(x * 100) / 100);

export default definirCalculadora({
  id: "bf.calcul-tva",
  mercado: "bf",
  concepto: "iva",
  slug: "calcul-tva",
  estado: "publicado",
  requiere: { "bf.tva-normal": "numero", "bf.tva-reduit": "numero" },
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
        { valor: "normal", etiqueta: "Taux normal (la plupart des biens et services)" },
        { valor: "reduit", etiqueta: "Taux réduit (hébergement et restauration des hôtels et restaurants agréés)" },
      ],
      porDefecto: "normal",
    },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.montant < 0) throw new ErrorEntrada("Le montant ne peut pas être négatif.", "montant");
    const taux = entrada.taux === "normal" ? v["bf.tva-normal"] : v["bf.tva-reduit"];
    const tva =
      entrada.operation === "ht-ttc"
        ? francInferieur(porcentaje(entrada.montant, taux))
        : francInferieur(entrada.montant - entrada.montant / (1 + taux / 100));
    const ht = entrada.operation === "ht-ttc" ? redondear(entrada.montant) : redondear(entrada.montant - tva);
    return { taux, ht, tva, ttc: redondear(ht + tva) };
  },
  resultado: [
    { clave: "taux", etiqueta: "Taux de TVA appliqué", formato: "porcentaje" },
    { clave: "ht", etiqueta: "Montant hors taxes (HT)", formato: "moneda" },
    { clave: "tva", etiqueta: "Montant de la TVA", formato: "moneda", destacada: true },
    { clave: "ttc", etiqueta: "Montant toutes taxes comprises (TTC)", formato: "moneda" },
  ],
});
