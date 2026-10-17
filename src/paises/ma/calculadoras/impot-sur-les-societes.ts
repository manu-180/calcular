import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "ma.impot-sur-les-societes",
  mercado: "ma",
  concepto: "propio",
  slug: "impot-sur-les-societes",
  estado: "publicado",
  requiere: {
    "ma.is-taux": "mapa",
    "ma.is-seuil": "numero",
  },
  campos: [
    { id: "benefice", tipo: "moneda", etiqueta: "Bénéfice net fiscal de l'exercice", min: 0, porDefecto: 2000000 },
    {
      id: "type",
      tipo: "opcion",
      etiqueta: "Type de société",
      opciones: [
        { valor: "normal", etiqueta: "Société commerciale, industrielle ou de services" },
        { valor: "financier", etiqueta: "Banque, Bank Al-Maghrib, CDG ou entreprise d'assurance" },
      ],
      porDefecto: "normal",
    },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.benefice <= 0) throw new ErrorEntrada("Indiquez un bénéfice supérieur à zéro.", "benefice");
    const t = v["ma.is-taux"];
    const taux = entrada.type === "financier" ? t["etablissements-financiers"] : entrada.benefice >= v["ma.is-seuil"] ? t["grandes-entreprises"] : t.normal;
    const observaciones = ["Taux pour les exercices ouverts à partir du 1er janvier 2026. Certaines sociétés bénéficient de taux ou d'exonérations spécifiques, et la cotisation minimale peut s'appliquer."];
    if (entrada.type === "normal" && taux === t["grandes-entreprises"])
      observaciones.push("Le taux élevé vise les sociétés dont le bénéfice net atteint le seuil. Certaines sociétés en sont exclues, comme celles ayant le statut Casablanca Finance City ou installées en zone d'accélération industrielle.");
    return { impot: redondear(porcentaje(entrada.benefice, taux)), taux, net: redondear(entrada.benefice - porcentaje(entrada.benefice, taux)), observaciones };
  },
  resultado: [
    { clave: "impot", etiqueta: "Impôt sur les sociétés", formato: "moneda", destacada: true },
    { clave: "taux", etiqueta: "Taux appliqué", formato: "porcentaje" },
    { clave: "net", etiqueta: "Bénéfice après impôt", formato: "moneda" },
  ],
});
