import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "sn.calcul-impot-sur-les-societes",
  mercado: "sn",
  concepto: "propio",
  slug: "calcul-impot-sur-les-societes",
  estado: "publicado",
  requiere: { "sn.is": "numero", "sn.imf": "mapa" },
  campos: [
    { id: "benefice", tipo: "moneda", etiqueta: "Bénéfice imposable de l'exercice", min: 0, porDefecto: 20000000 },
    { id: "chiffre", tipo: "moneda", etiqueta: "Chiffre d'affaires hors taxes de l'année précédente", min: 0, porDefecto: 300000000 },
  ],
  calcular(e, v, { redondear }) {
    if (e.chiffre < 0 || e.benefice < 0) throw new ErrorEntrada("Inscrivez des montants de zéro ou plus.", "benefice");
    const base = Math.floor(e.benefice / 1000) * 1000;
    const is = redondear(porcentaje(base, v["sn.is"]));
    const imf = redondear(Math.min(porcentaje(e.chiffre, v["sn.imf"].taux), v["sn.imf"].plafond));
    const du = Math.max(is, imf);
    return { du, is, imf, minimum: imf > is ? "Impôt minimum forfaitaire" : "Impôt sur les sociétés" };
  },
  resultado: [
    { clave: "du", etiqueta: "Impôt à payer", formato: "moneda", destacada: true },
    { clave: "is", etiqueta: "Impôt sur les sociétés calculé", formato: "moneda" },
    { clave: "imf", etiqueta: "Impôt minimum forfaitaire", formato: "moneda" },
    { clave: "minimum", etiqueta: "Ce qui s'applique", formato: "texto" },
  ],
});
