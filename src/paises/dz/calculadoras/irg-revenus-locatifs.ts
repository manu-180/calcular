import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "dz.irg-revenus-locatifs",
  mercado: "dz",
  concepto: "propio",
  slug: "irg-revenus-locatifs",
  estado: "publicado",
  requiere: { "dz.irg-loyers": "mapa", "dz.irg-loyers-seuil": "numero" },
  campos: [
    { id: "loyer", tipo: "moneda", etiqueta: "Loyer mensuel brut", min: 0, porDefecto: 40000 },
    { id: "mois", tipo: "entero", etiqueta: "Mois loués dans l'année", min: 1, max: 12, porDefecto: 12 },
    { id: "usage", tipo: "opcion-dato", dato: "dz.irg-loyers", etiqueta: "Type de location", porDefecto: "habitation" },
  ],
  calcular(e, v, { redondear }) {
    if (e.loyer <= 0) throw new ErrorEntrada("Indiquez un loyer supérieur à zéro.", "loyer");
    const t = v["dz.irg-loyers"];
    const annuel = redondear(e.loyer * e.mois);
    const liberatoire = annuel <= v["dz.irg-loyers-seuil"];
    // Au-delà du plafond, l'article 104-II-2 prévoit une retenue provisoire de 7 %, le taux de
    // la location d'habitation, imputée ensuite sur l'IRG global.
    const taux = liberatoire ? t[e.usage] : t.habitation;
    const irg = redondear(porcentaje(annuel, taux));
    return {
      irg,
      annuel,
      taux,
      mensuel: redondear(irg / e.mois),
      net: redondear(annuel - irg),
      observaciones: [
        liberatoire
          ? "Sous le plafond, cet impôt est libératoire : vous n'avez rien d'autre à payer au titre de l'IRG sur ces loyers."
          : "Au-dessus du plafond, la retenue est provisoire. Elle s'impute sur l'IRG global calculé avec le barème progressif.",
      ],
    };
  },
  resultado: [
    { clave: "irg", etiqueta: "IRG sur les loyers de l'année", formato: "moneda", destacada: true },
    { clave: "annuel", etiqueta: "Loyers bruts de l'année", formato: "moneda" },
    { clave: "taux", etiqueta: "Taux appliqué", formato: "porcentaje" },
    { clave: "mensuel", etiqueta: "IRG par mois loué", formato: "moneda" },
    { clave: "net", etiqueta: "Loyers après IRG", formato: "moneda" },
  ],
});
