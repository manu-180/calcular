import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "mg.impot-synthetique",
  mercado: "mg",
  concepto: "regimen-simplificado",
  slug: "impot-synthetique",
  estado: "publicado",
  requiere: {
    "mg.is-taux": "mapa",
    "mg.is-reduction": "numero",
    "mg.is-plancher": "numero",
    "mg.is-seuil": "numero",
    "mg.is-abattement-cga": "numero",
    "mg.is-abattement-cga-plafond": "numero",
  },
  campos: [
    { id: "ca", tipo: "moneda", etiqueta: "Chiffre d'affaires de l'année précédente", min: 0, porDefecto: 60000000, ayuda: "Ou revenu brut, gain acquis du 1er janvier au 31 décembre." },
    {
      id: "situation",
      tipo: "opcion",
      etiqueta: "Votre situation",
      opciones: [
        { valor: "normal", etiqueta: "Cas général" },
        { valor: "cga", etiqueta: "Adhérent d'un centre de gestion agréé" },
        { valor: "nouveau", etiqueta: "Nouvel adhérent d'un CGA ou nouvellement immatriculé en ligne" },
      ],
      porDefecto: "normal",
    },
    {
      id: "charges",
      tipo: "moneda",
      etiqueta: "Achats et charges justifiés de l'année",
      min: 0,
      porDefecto: 0,
      ayuda: "Achats sur factures conformes, salaires et charges patronales déclarés à la CNaPS, couverture santé des salariés, dons à des fondations reconnues.",
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.ca <= 0) throw new ErrorEntrada("Indiquez un chiffre d'affaires supérieur à zéro.", "ca");
    const observaciones: string[] = [];
    if (e.ca >= v["mg.is-seuil"]) observaciones.push("À partir de ce chiffre d'affaires, l'entreprise relève de l'impôt sur les revenus et de la TVA, pas de l'impôt synthétique.");
    const abattement = e.situation === "cga" ? Math.min(porcentaje(e.ca, v["mg.is-abattement-cga"]), v["mg.is-abattement-cga-plafond"]) : 0;
    const base = Math.floor((e.ca - abattement) / 10000) * 10000;
    const taux = v["mg.is-taux"][e.situation === "nouveau" ? "cga" : "normal"];
    const impotBrut = redondear(porcentaje(base, taux));
    const plancher = redondear(porcentaje(e.ca, v["mg.is-plancher"]));
    const reductionDemandee = redondear(porcentaje(e.charges, v["mg.is-reduction"]));
    const reduction = Math.min(reductionDemandee, Math.max(0, impotBrut - plancher));
    if (reduction < reductionDemandee) observaciones.push("La réduction est limitée : après réduction, l'impôt ne peut pas descendre sous 3 % du chiffre d'affaires.");
    observaciones.push("L'impôt ne peut pas non plus être inférieur au minimum fixé pour votre activité par la direction régionale des impôts.");
    return { impot: redondear(impotBrut - reduction), base, taux, impotBrut, reduction, observaciones };
  },
  resultado: [
    { clave: "impot", etiqueta: "Impôt synthétique de l'année", formato: "moneda", destacada: true },
    { clave: "base", etiqueta: "Base imposable (arrondie à 10 000 Ar)", formato: "moneda" },
    { clave: "taux", etiqueta: "Taux", formato: "porcentaje", decimales: 0 },
    { clave: "impotBrut", etiqueta: "Impôt avant réduction", formato: "moneda" },
    { clave: "reduction", etiqueta: "Réduction sur les charges justifiées", formato: "moneda", ocultarSiCero: true },
  ],
});
