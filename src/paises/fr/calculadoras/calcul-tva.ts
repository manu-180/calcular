import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "fr.calcul-tva",
  mercado: "fr",
  concepto: "iva",
  slug: "calcul-tva",
  estado: "publicado",
  requiere: {
    "fr.tva-normal": "numero",
    "fr.tva-intermediaire": "numero",
    "fr.tva-reduit": "numero",
    "fr.tva-particulier": "numero",
  },
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
    { id: "montant", tipo: "moneda", etiqueta: "Prix", min: 0, porDefecto: 100 },
    {
      id: "taux",
      tipo: "opcion",
      etiqueta: "Taux de TVA",
      opciones: [
        { valor: "normal", etiqueta: "Taux normal (la plupart des biens et services)" },
        { valor: "intermediaire", etiqueta: "Taux intermédiaire (restauration, transport, travaux)" },
        { valor: "reduit", etiqueta: "Taux réduit (alimentation, livres)" },
        { valor: "particulier", etiqueta: "Taux particulier (médicaments remboursés, presse)" },
      ],
      porDefecto: "normal",
    },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.montant < 0) throw new ErrorEntrada("Le prix ne peut pas être négatif.", "montant");
    const taux = {
      normal: valores["fr.tva-normal"],
      intermediaire: valores["fr.tva-intermediaire"],
      reduit: valores["fr.tva-reduit"],
      particulier: valores["fr.tva-particulier"],
    }[entrada.taux];
    const ht = entrada.operation === "ht-ttc" ? redondear(entrada.montant) : redondear(entrada.montant / (1 + taux / 100));
    const tva = entrada.operation === "ht-ttc" ? redondear(porcentaje(ht, taux)) : redondear(entrada.montant - ht);
    return { taux, ht, tva, ttc: redondear(ht + tva) };
  },
  resultado: [
    { clave: "taux", etiqueta: "Taux de TVA appliqué", formato: "porcentaje" },
    { clave: "ht", etiqueta: "Prix hors taxes (HT)", formato: "moneda" },
    { clave: "tva", etiqueta: "Montant de la TVA", formato: "moneda", destacada: true },
    { clave: "ttc", etiqueta: "Prix toutes taxes comprises (TTC)", formato: "moneda" },
  ],
});
