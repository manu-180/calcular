import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "ml.impot-synthetique",
  mercado: "ml",
  concepto: "regimen-simplificado",
  slug: "impot-synthetique",
  estado: "publicado",
  requiere: { "ml.impot-synthetique-taux": "numero", "ml.impot-synthetique-seuil": "numero" },
  campos: [
    { id: "ca", tipo: "moneda", etiqueta: "Chiffre d'affaires annuel hors taxe", min: 0, porDefecto: 20000000 },
    { id: "premiereAnnee", tipo: "si-no", etiqueta: "Première année civile d'activité", porDefecto: false },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.ca <= 0) throw new ErrorEntrada("Indiquez un chiffre d'affaires supérieur à zéro.", "ca");
    const seuil = v["ml.impot-synthetique-seuil"];
    const taux = v["ml.impot-synthetique-taux"];
    if (entrada.ca >= seuil) {
      return {
        impot: 0,
        regime: "Régime du bénéfice réel",
        taux,
        parMois: 0,
        observaciones: ["À partir de ce chiffre d'affaires, l'entreprise relève du régime du bénéfice réel et non de l'impôt synthétique."],
      };
    }
    if (entrada.premiereAnnee) {
      return { impot: 0, regime: "Impôt synthétique (exonéré la première année)", taux, parMois: 0, observaciones: ["Les entreprises de ce régime sont exonérées pour leur première année civile d'activité."] };
    }
    const impot = redondear(porcentaje(entrada.ca, taux));
    return { impot, regime: "Impôt synthétique", taux, parMois: redondear(impot / 12), observaciones: [] as string[] };
  },
  resultado: [
    { clave: "impot", etiqueta: "Impôt synthétique de l'année", formato: "moneda", destacada: true },
    { clave: "regime", etiqueta: "Régime d'imposition", formato: "texto" },
    { clave: "taux", etiqueta: "Taux", formato: "porcentaje", decimales: 0 },
    { clave: "parMois", etiqueta: "Équivalent par mois", formato: "moneda", ocultarSiCero: true },
  ],
});
