import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

const milliers = (n: number) => Math.floor(n / 1000) * 1000;

export default definirCalculadora({
  id: "ml.impot-sur-les-societes",
  mercado: "ml",
  concepto: "propio",
  slug: "impot-sur-les-societes",
  estado: "publicado",
  requiere: { "ml.is-taux": "numero", "ml.minimum-forfaitaire": "numero" },
  campos: [
    { id: "benefice", tipo: "moneda", etiqueta: "Bénéfice fiscal de l'exercice", porDefecto: 30000000, ayuda: "Indiquez 0 ou un montant négatif en cas de perte." },
    { id: "ca", tipo: "moneda", etiqueta: "Chiffre d'affaires hors taxe de l'exercice", min: 0, porDefecto: 400000000, ayuda: "Pour une société, produits d'exploitation et produits accessoires." },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.ca < 0) throw new ErrorEntrada("Le chiffre d'affaires ne peut pas être négatif.", "ca");
    // CGI, articles 85 et 86 : bases arrondies au millier de francs inférieur.
    const impotBenefice = redondear(porcentaje(milliers(Math.max(0, entrada.benefice)), v["ml.is-taux"]));
    const minimum = redondear(porcentaje(milliers(entrada.ca), v["ml.minimum-forfaitaire"]));
    const impot = Math.max(impotBenefice, minimum);
    return {
      impot,
      impotBenefice,
      minimum,
      retenu: impot === impotBenefice && impotBenefice > minimum ? "Impôt sur le bénéfice" : "Minimum forfaitaire",
    };
  },
  resultado: [
    { clave: "impot", etiqueta: "Impôt dû pour l'exercice", formato: "moneda", destacada: true },
    { clave: "impotBenefice", etiqueta: "Impôt calculé sur le bénéfice", formato: "moneda" },
    { clave: "minimum", etiqueta: "Minimum forfaitaire de perception", formato: "moneda" },
    { clave: "retenu", etiqueta: "Montant retenu", formato: "texto" },
  ],
});
