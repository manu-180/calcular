import { aplicarEscalaMarginal, definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "fr.droits-de-succession",
  mercado: "fr",
  concepto: "propio",
  slug: "droits-de-succession",
  estado: "publicado",
  requiere: {
    "fr.droits-ligne-directe": "escala",
    "fr.droits-freres-soeurs": "escala",
    "fr.droits-4e-degre": "numero",
    "fr.droits-non-parents": "numero",
    "fr.abattement-ligne-directe": "numero",
    "fr.abattement-freres-soeurs": "numero",
    "fr.abattement-neveux": "numero",
    "fr.abattement-succession-defaut": "numero",
    "fr.abattement-handicap": "numero",
  },
  campos: [
    { id: "part", tipo: "moneda", etiqueta: "Votre part de la succession", min: 0, porDefecto: 150000 },
    {
      id: "lien",
      tipo: "opcion",
      etiqueta: "Votre lien avec le défunt",
      opciones: [
        { valor: "enfant", etiqueta: "Enfant" },
        { valor: "ascendant", etiqueta: "Parent ou grand-parent" },
        { valor: "conjoint", etiqueta: "Époux ou partenaire de Pacs" },
        { valor: "petit-enfant", etiqueta: "Petit-enfant (votre parent est vivant)" },
        { valor: "frere-soeur", etiqueta: "Frère ou sœur" },
        { valor: "neveu", etiqueta: "Neveu ou nièce" },
        { valor: "parent-eloigne", etiqueta: "Autre parent jusqu'au 4e degré (cousin, grand-oncle)" },
        { valor: "autre", etiqueta: "Parent plus éloigné ou personne sans lien de parenté" },
      ],
      porDefecto: "enfant",
    },
    { id: "handicap", tipo: "si-no", etiqueta: "Vous êtes en situation de handicap", porDefecto: false },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.part < 0) throw new ErrorEntrada("La part ne peut pas être négative.", "part");
    if (entrada.lien === "conjoint") {
      return { abattement: entrada.part, taxable: 0, droits: 0, net: entrada.part, observaciones: ["L'époux et le partenaire de Pacs sont exonérés de droits de succession."] };
    }
    const abattementLien = {
      enfant: valores["fr.abattement-ligne-directe"],
      ascendant: valores["fr.abattement-ligne-directe"],
      "petit-enfant": valores["fr.abattement-succession-defaut"],
      "frere-soeur": valores["fr.abattement-freres-soeurs"],
      neveu: valores["fr.abattement-neveux"],
      "parent-eloigne": valores["fr.abattement-succession-defaut"],
      autre: valores["fr.abattement-succession-defaut"],
    }[entrada.lien];
    const abattement = abattementLien + (entrada.handicap ? valores["fr.abattement-handicap"] : 0);
    const taxable = Math.max(0, entrada.part - abattement);
    let droits: number;
    if (entrada.lien === "frere-soeur") droits = aplicarEscalaMarginal(valores["fr.droits-freres-soeurs"], taxable);
    else if (entrada.lien === "neveu" || entrada.lien === "parent-eloigne") droits = porcentaje(taxable, valores["fr.droits-4e-degre"]);
    else if (entrada.lien === "autre") droits = porcentaje(taxable, valores["fr.droits-non-parents"]);
    else droits = aplicarEscalaMarginal(valores["fr.droits-ligne-directe"], taxable);
    droits = redondear(droits);
    const observaciones: string[] = [];
    if (entrada.lien === "frere-soeur") {
      observaciones.push("Un frère ou une sœur est exonéré s'il est célibataire, veuf, divorcé ou séparé, a plus de 50 ans (ou une infirmité qui empêche de travailler) et a vécu avec le défunt pendant les 5 ans avant le décès.");
    }
    if (entrada.lien === "petit-enfant") {
      observaciones.push("Si vous héritez à la place de votre parent décédé ou qui a renoncé, vous bénéficiez de son abattement de parent à enfant, partagé avec vos frères et sœurs.");
    }
    observaciones.push("Les donations reçues du défunt depuis moins de 15 ans réduisent l'abattement disponible.");
    return { abattement: redondear(Math.min(abattement, entrada.part)), taxable: redondear(taxable), droits, net: redondear(entrada.part - droits), observaciones };
  },
  resultado: [
    { clave: "abattement", etiqueta: "Abattement appliqué", formato: "moneda" },
    { clave: "taxable", etiqueta: "Part taxable", formato: "moneda" },
    { clave: "droits", etiqueta: "Droits de succession à payer", formato: "moneda", destacada: true },
    { clave: "net", etiqueta: "Ce qui vous reste", formato: "moneda" },
  ],
});
