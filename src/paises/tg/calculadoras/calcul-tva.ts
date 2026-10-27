import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "tg.calcul-tva",
  mercado: "tg",
  concepto: "iva",
  slug: "calcul-tva",
  estado: "publicado",
  requiere: { "tg.tva": "numero" },
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
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.montant < 0) throw new ErrorEntrada("Le montant ne peut pas être négatif.", "montant");
    const taux = v["tg.tva"];
    const ht = entrada.operation === "ht-ttc" ? redondear(entrada.montant) : redondear(entrada.montant / (1 + taux / 100));
    const tva = entrada.operation === "ht-ttc" ? redondear(porcentaje(ht, taux)) : redondear(entrada.montant - ht);
    return { taux, ht, tva, ttc: redondear(ht + tva) };
  },
  resultado: [
    { clave: "tva", etiqueta: "Montant de la TVA", formato: "moneda", destacada: true },
    { clave: "ht", etiqueta: "Montant hors taxes (HT)", formato: "moneda" },
    { clave: "ttc", etiqueta: "Montant toutes taxes comprises (TTC)", formato: "moneda" },
    { clave: "taux", etiqueta: "Taux de TVA appliqué", formato: "porcentaje" },
  ],
});
