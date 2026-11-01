import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "tn.cotisations-travailleur-non-salarie",
  mercado: "tn",
  concepto: "propio",
  slug: "cotisations-travailleur-non-salarie",
  estado: "publicado",
  requiere: {
    "tn.cnss-tns-taux": "numero",
    "tn.cnss-tns-assiette": "mapa",
    "tn.accidents-travail": "mapa",
  },
  campos: [
    { id: "classe", tipo: "opcion-dato", etiqueta: "Classe de revenu choisie", dato: "tn.cnss-tns-assiette", porDefecto: "classe-1" },
    {
      id: "accidents",
      tipo: "porcentaje",
      etiqueta: "Taux accidents du travail (0 si vous n'y adhérez pas)",
      min: 0,
      max: 4,
      porDefecto: 0,
      ayuda: "L'assurance accidents du travail est facultative pour les non-salariés ; son taux dépend de l'activité.",
    },
  ],
  calcular(entrada, v, { redondear }) {
    const at = v["tn.accidents-travail"];
    if (entrada.accidents !== 0 && (entrada.accidents < at["minimum"] || entrada.accidents > at["maximum"])) {
      throw new ErrorEntrada(`Le taux accidents du travail va de ${at["minimum"]} % à ${at["maximum"]} %.`, "accidents");
    }
    const assiette = enMapa(v["tn.cnss-tns-assiette"], entrada.classe);
    const securite = redondear(porcentaje(assiette, v["tn.cnss-tns-taux"]));
    const accidents = redondear(porcentaje(assiette, entrada.accidents));
    const trimestre = redondear(securite + accidents);
    return {
      trimestre,
      assiette,
      securite,
      accidents,
      annee: redondear(trimestre * 4),
      mois: redondear(trimestre / 3),
      observaciones: [
        "Montants de la CNSS à partir du 2e trimestre 2026. À payer au plus tard le 15 du mois qui suit chaque trimestre ; un retard coûte 1 % par mois ou fraction de mois.",
      ],
    };
  },
  resultado: [
    { clave: "trimestre", etiqueta: "Cotisation à payer par trimestre", formato: "moneda", destacada: true },
    { clave: "assiette", etiqueta: "Assiette trimestrielle", formato: "moneda" },
    { clave: "securite", etiqueta: "Dont sécurité sociale", formato: "moneda" },
    { clave: "accidents", etiqueta: "Dont accidents du travail", formato: "moneda", ocultarSiCero: true },
    { clave: "annee", etiqueta: "Total par an", formato: "moneda" },
    { clave: "mois", etiqueta: "Soit par mois", formato: "moneda" },
  ],
});
