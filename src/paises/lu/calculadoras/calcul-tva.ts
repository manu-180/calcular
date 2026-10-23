import { definirCalculadora, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "lu.calcul-tva",
  mercado: "lu",
  concepto: "iva",
  slug: "calcul-tva",
  estado: "publicado",
  requiere: {
    "lu.tva-normal": "numero",
    "lu.tva-intermediaire": "numero",
    "lu.tva-reduit": "numero",
    "lu.tva-super-reduit": "numero",
  },
  campos: [
    { id: "montant", tipo: "moneda", etiqueta: "Montant en euros", min: 0, porDefecto: 100 },
    {
      id: "sens",
      tipo: "opcion",
      etiqueta: "Que voulez-vous calculer ?",
      opciones: [
        { valor: "ajouter", etiqueta: "Ajouter la TVA (montant hors TVA)" },
        { valor: "extraire", etiqueta: "Extraire la TVA (montant TVA comprise)" },
      ],
      porDefecto: "ajouter",
    },
    {
      id: "taux",
      tipo: "opcion",
      etiqueta: "Taux",
      opciones: [
        { valor: "normal", etiqueta: "Taux normal" },
        { valor: "intermediaire", etiqueta: "Taux intermédiaire" },
        { valor: "reduit", etiqueta: "Taux réduit" },
        { valor: "super-reduit", etiqueta: "Taux super-réduit" },
      ],
      porDefecto: "normal",
    },
  ],
  calcular(entrada, valores, { redondear }) {
    const taux =
      entrada.taux === "intermediaire"
        ? valores["lu.tva-intermediaire"]
        : entrada.taux === "reduit"
          ? valores["lu.tva-reduit"]
          : entrada.taux === "super-reduit"
            ? valores["lu.tva-super-reduit"]
            : valores["lu.tva-normal"];
    const ht = entrada.sens === "ajouter" ? entrada.montant : redondear(entrada.montant / (1 + taux / 100));
    const tva = entrada.sens === "ajouter" ? redondear(porcentaje(ht, taux)) : redondear(entrada.montant - ht);
    return { taux, ht, tva, ttc: redondear(ht + tva) };
  },
  resultado: [
    { clave: "tva", etiqueta: "TVA", formato: "moneda", destacada: true },
    { clave: "ht", etiqueta: "Montant hors TVA", formato: "moneda" },
    { clave: "ttc", etiqueta: "Montant TVA comprise", formato: "moneda" },
    { clave: "taux", etiqueta: "Taux", formato: "porcentaje", decimales: 0 },
  ],
});
