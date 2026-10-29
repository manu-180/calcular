import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "bj.calcul-tva",
  mercado: "bj",
  concepto: "iva",
  slug: "calcul-tva",
  estado: "publicado",
  requiere: { "bj.tva": "numero" },
  campos: [
    {
      id: "sens",
      tipo: "opcion",
      etiqueta: "Montant connu",
      opciones: [
        { valor: "ht", etiqueta: "Prix hors taxe (HT)" },
        { valor: "ttc", etiqueta: "Prix toutes taxes comprises (TTC)" },
      ],
      porDefecto: "ht",
    },
    { id: "montant", tipo: "moneda", etiqueta: "Montant", min: 0, porDefecto: 100000 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.montant <= 0) throw new ErrorEntrada("Indiquez un montant supérieur à zéro.", "montant");
    const taux = v["bj.tva"];
    const ht = entrada.sens === "ht" ? entrada.montant : redondear(entrada.montant / (1 + taux / 100));
    const tva = entrada.sens === "ht" ? redondear(porcentaje(ht, taux)) : redondear(entrada.montant - ht);
    return { ttc: redondear(ht + tva), ht, tva, taux };
  },
  resultado: [
    { clave: "ttc", etiqueta: "Prix TTC", formato: "moneda", destacada: true },
    { clave: "ht", etiqueta: "Prix HT", formato: "moneda" },
    { clave: "tva", etiqueta: "Montant de la TVA", formato: "moneda" },
    { clave: "taux", etiqueta: "Taux appliqué", formato: "porcentaje" },
  ],
});
