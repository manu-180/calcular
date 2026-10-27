import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "ml.calcul-tva",
  mercado: "ml",
  concepto: "iva",
  slug: "calcul-tva",
  estado: "publicado",
  requiere: { "ml.tva": "mapa" },
  campos: [
    {
      id: "sens",
      tipo: "opcion",
      etiqueta: "Montant de départ",
      opciones: [
        { valor: "ht", etiqueta: "Montant hors taxe (HT)" },
        { valor: "ttc", etiqueta: "Montant toutes taxes comprises (TTC)" },
      ],
      porDefecto: "ht",
    },
    { id: "montant", tipo: "moneda", etiqueta: "Montant", min: 0, porDefecto: 100000 },
    { id: "taux", tipo: "opcion-dato", etiqueta: "Taux de TVA", dato: "ml.tva", porDefecto: "normal" },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.montant <= 0) throw new ErrorEntrada("Indiquez un montant supérieur à zéro.", "montant");
    const taux = v["ml.tva"][entrada.taux];
    const ht = entrada.sens === "ht" ? entrada.montant : redondear(entrada.montant / (1 + taux / 100));
    const tva = entrada.sens === "ht" ? redondear(porcentaje(ht, taux)) : redondear(entrada.montant - ht);
    return { ht, tva, ttc: redondear(ht + tva), taux };
  },
  resultado: [
    { clave: "ttc", etiqueta: "Montant TTC", formato: "moneda", destacada: true },
    { clave: "ht", etiqueta: "Montant HT", formato: "moneda" },
    { clave: "tva", etiqueta: "TVA", formato: "moneda" },
    { clave: "taux", etiqueta: "Taux appliqué", formato: "porcentaje", decimales: 0 },
  ],
});
