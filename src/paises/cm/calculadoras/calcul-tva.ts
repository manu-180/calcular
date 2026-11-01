import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "cm.calcul-tva",
  mercado: "cm",
  concepto: "iva",
  slug: "calcul-tva",
  estado: "publicado",
  requiere: { "cm.tva": "mapa", "cm.cac": "numero" },
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
      tipo: "opcion-dato",
      etiqueta: "Taux de TVA",
      dato: "cm.tva",
      porDefecto: "general",
      ayuda: "Le taux réduit vise surtout les logements sociaux (vente, location, intérêts du prêt) avec quitus des impôts.",
    },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.montant < 0) throw new ErrorEntrada("Le montant ne peut pas être négatif.", "montant");
    const principal = enMapa(v["cm.tva"], entrada.taux);
    // Les centimes additionnels communaux s'ajoutent au principal de la TVA (article C 83).
    const tauxGlobal = Math.round(principal * (1 + v["cm.cac"] / 100) * 1000) / 1000;
    const ht = entrada.operation === "ht-ttc" ? redondear(entrada.montant) : redondear(entrada.montant / (1 + tauxGlobal / 100));
    const tva = redondear(porcentaje(ht, principal));
    const cac = entrada.operation === "ht-ttc" ? redondear(porcentaje(tva, v["cm.cac"])) : redondear(entrada.montant - ht - tva);
    return { tauxGlobal, ht, tva, cac, taxes: tva + cac, ttc: ht + tva + cac };
  },
  resultado: [
    { clave: "tauxGlobal", etiqueta: "Taux global appliqué (TVA et CAC)", formato: "porcentaje", decimales: 2 },
    { clave: "ht", etiqueta: "Montant hors taxes (HT)", formato: "moneda" },
    { clave: "tva", etiqueta: "TVA en principal", formato: "moneda" },
    { clave: "cac", etiqueta: "Centimes additionnels communaux", formato: "moneda" },
    { clave: "taxes", etiqueta: "Total des taxes", formato: "moneda", destacada: true },
    { clave: "ttc", etiqueta: "Montant toutes taxes comprises (TTC)", formato: "moneda" },
  ],
});
