import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "cm.impot-sur-les-societes",
  mercado: "cm",
  concepto: "propio",
  slug: "impot-sur-les-societes",
  estado: "publicado",
  requiere: { "cm.is-taux": "mapa", "cm.is-seuil-pme": "numero", "cm.minimum-perception": "numero", "cm.cac": "numero" },
  campos: [
    { id: "benefice", tipo: "moneda", etiqueta: "Bénéfice fiscal imposable de l'exercice", min: 0, porDefecto: 50000000 },
    { id: "chiffreAffaires", tipo: "moneda", etiqueta: "Chiffre d'affaires de l'exercice", min: 0, porDefecto: 800000000 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.benefice < 0) throw new ErrorEntrada("Indiquez zéro si l'exercice est déficitaire.", "benefice");
    const petite = entrada.chiffreAffaires <= v["cm.is-seuil-pme"];
    const taux = petite ? v["cm.is-taux"].pme : v["cm.is-taux"]["droit-commun"];
    // Article 17 : la fraction du bénéfice inférieure à 1 000 F est négligée.
    const base = Math.floor(entrada.benefice / 1000) * 1000;
    const impotBenefice = redondear(porcentaje(base, taux));
    const minimum = redondear(porcentaje(entrada.chiffreAffaires, v["cm.minimum-perception"]));
    const principal = Math.max(impotBenefice, minimum);
    const cac = redondear(porcentaje(principal, v["cm.cac"]));
    return {
      taux,
      impotBenefice,
      minimum,
      principal,
      cac,
      total: principal + cac,
      observaciones: minimum > impotBenefice ? ["Le minimum de perception sur le chiffre d'affaires dépasse l'impôt sur le bénéfice : c'est lui qui est dû."] : [],
    };
  },
  resultado: [
    { clave: "total", etiqueta: "Impôt sur les sociétés dû (CAC compris)", formato: "moneda", destacada: true },
    { clave: "taux", etiqueta: "Taux appliqué au bénéfice", formato: "porcentaje" },
    { clave: "impotBenefice", etiqueta: "Impôt calculé sur le bénéfice", formato: "moneda" },
    { clave: "minimum", etiqueta: "Minimum de perception sur le chiffre d'affaires", formato: "moneda" },
    { clave: "principal", etiqueta: "Impôt retenu en principal", formato: "moneda" },
    { clave: "cac", etiqueta: "Centimes additionnels communaux", formato: "moneda" },
  ],
});
