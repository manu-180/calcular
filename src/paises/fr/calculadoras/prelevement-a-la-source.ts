import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "fr.prelevement-a-la-source",
  mercado: "fr",
  concepto: "propio",
  slug: "prelevement-a-la-source",
  estado: "publicado",
  requiere: {
    "fr.pas-grille-metropole": "escala",
  },
  campos: [
    { id: "netImposable", tipo: "moneda", etiqueta: "Salaire net imposable du mois", min: 0, porDefecto: 2500, ayuda: "Il figure sur votre bulletin de paie." },
    {
      id: "typeTaux",
      tipo: "opcion",
      etiqueta: "Taux appliqué",
      opciones: [
        { valor: "defaut", etiqueta: "Taux par défaut (non personnalisé)" },
        { valor: "personnalise", etiqueta: "Mon taux personnalisé" },
      ],
      porDefecto: "defaut",
    },
    { id: "taux", tipo: "porcentaje", etiqueta: "Votre taux personnalisé", min: 0, max: 60, requerido: false, ayuda: "Indiqué sur votre avis d'impôt et dans votre espace sur impots.gouv.fr." },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.typeTaux === "personnalise" && entrada.taux === null) throw new ErrorEntrada("Indiquez votre taux personnalisé.", "taux");
    let taux = entrada.taux ?? 0;
    if (entrada.typeTaux === "defaut") {
      taux = 0;
      for (const f of valores["fr.pas-grille-metropole"]) if (entrada.netImposable >= f.desde) taux = f.tasa;
    }
    const prelevement = redondear(porcentaje(entrada.netImposable, taux));
    return {
      taux,
      prelevement,
      annuel: redondear(prelevement * 12),
      observaciones:
        entrada.typeTaux === "defaut"
          ? ["Le taux par défaut est celui de la grille de métropole. En Guadeloupe, à La Réunion, en Martinique, en Guyane et à Mayotte, une autre grille s'applique."]
          : [],
    };
  },
  resultado: [
    { clave: "taux", etiqueta: "Taux de prélèvement", formato: "porcentaje", decimales: 1 },
    { clave: "prelevement", etiqueta: "Impôt prélevé sur le salaire", formato: "moneda", destacada: true },
    { clave: "annuel", etiqueta: "Prélèvement sur 12 mois", formato: "moneda" },
  ],
});
