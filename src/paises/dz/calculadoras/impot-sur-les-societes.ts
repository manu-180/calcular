import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "dz.impot-sur-les-societes",
  mercado: "dz",
  concepto: "propio",
  slug: "impot-sur-les-societes",
  estado: "publicado",
  requiere: { "dz.ibs": "mapa", "dz.ibs-reinvesti": "numero" },
  campos: [
    { id: "benefice", tipo: "moneda", etiqueta: "Bénéfice imposable de l'exercice", min: 0, porDefecto: 10000000 },
    { id: "activite", tipo: "opcion-dato", dato: "dz.ibs", etiqueta: "Activité de l'entreprise", porDefecto: "autres" },
    {
      id: "reinvesti",
      tipo: "moneda",
      etiqueta: "Part du bénéfice réinvestie (facultatif)",
      min: 0,
      requerido: false,
      ayuda: "Bénéfices réinvestis dans les conditions de l'article 142 bis du code des impôts directs.",
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.benefice <= 0) throw new ErrorEntrada("Indiquez un bénéfice supérieur à zéro.", "benefice");
    const reinvesti = e.reinvesti ?? 0;
    if (reinvesti > e.benefice) throw new ErrorEntrada("La part réinvestie ne peut pas dépasser le bénéfice.", "reinvesti");
    const taux = v["dz.ibs"][e.activite];
    const ibsNormal = redondear(porcentaje(e.benefice - reinvesti, taux));
    const ibsReduit = redondear(porcentaje(reinvesti, v["dz.ibs-reinvesti"]));
    const ibs = redondear(ibsNormal + ibsReduit);
    return {
      ibs,
      taux,
      ibsNormal,
      ibsReduit: reinvesti > 0 ? ibsReduit : null,
      tauxEffectif: (ibs / e.benefice) * 100,
      apresImpot: redondear(e.benefice - ibs),
    };
  },
  resultado: [
    { clave: "ibs", etiqueta: "IBS dû", formato: "moneda", destacada: true },
    { clave: "taux", etiqueta: "Taux de l'activité", formato: "porcentaje" },
    { clave: "ibsNormal", etiqueta: "IBS sur le bénéfice non réinvesti", formato: "moneda" },
    { clave: "ibsReduit", etiqueta: "IBS au taux réduit sur la part réinvestie", formato: "moneda" },
    { clave: "tauxEffectif", etiqueta: "Taux effectif", formato: "porcentaje", decimales: 2 },
    { clave: "apresImpot", etiqueta: "Bénéfice après IBS", formato: "moneda" },
  ],
});
