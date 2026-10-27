import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "mg.impot-foncier-propriete-batie",
  mercado: "mg",
  concepto: "propio",
  slug: "impot-foncier-propriete-batie",
  estado: "publicado",
  requiere: {
    "mg.ifpb": "mapa",
    "mg.ifpb-minimum": "numero",
  },
  campos: [
    {
      id: "occupation",
      tipo: "opcion",
      etiqueta: "Occupation de l'immeuble",
      opciones: [
        { valor: "loue", etiqueta: "Loué" },
        { valor: "residence", etiqueta: "Résidence principale du propriétaire" },
      ],
      porDefecto: "loue",
    },
    {
      id: "loyerMensuel",
      tipo: "moneda",
      etiqueta: "Loyer mensuel déclaré",
      min: 0,
      porDefecto: 600000,
      visibleSi: { occupation: ["loue"] },
    },
    {
      id: "valeurLocative",
      tipo: "moneda",
      etiqueta: "Valeur locative annuelle fixée par la commission communale",
      min: 0,
      porDefecto: 3000000,
      visibleSi: { occupation: ["residence"] },
      ayuda: "Elle figure sur l'avis d'imposition ou s'obtient auprès de la commune.",
    },
  ],
  calcular(e, v, { redondear }) {
    const ifpb = v["mg.ifpb"];
    let base: number;
    if (e.occupation === "loue") {
      if (!e.loyerMensuel || e.loyerMensuel <= 0) throw new ErrorEntrada("Indiquez le loyer mensuel.", "loyerMensuel");
      base = e.loyerMensuel * 12;
    } else {
      if (!e.valeurLocative || e.valeurLocative <= 0) throw new ErrorEntrada("Indiquez la valeur locative annuelle.", "valeurLocative");
      base = redondear(porcentaje(e.valeurLocative, ifpb["residence-principale"]));
    }
    const calcule = redondear(porcentaje(base, ifpb.taux));
    const impot = Math.max(calcule, v["mg.ifpb-minimum"]);
    return { impot, base, observaciones: impot > calcule ? ["Le calcul donne moins que le minimum par immeuble : c'est le minimum qui s'applique."] : [] };
  },
  resultado: [
    { clave: "impot", etiqueta: "IFPB de l'année", formato: "moneda", destacada: true },
    { clave: "base", etiqueta: "Valeur locative imposable", formato: "moneda" },
  ],
});
