import { aplicarEscalaMarginal, definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "fr.droits-de-donation",
  mercado: "fr",
  concepto: "propio",
  slug: "droits-de-donation",
  estado: "publicado",
  requiere: {
    "fr.droits-ligne-directe": "escala",
    "fr.droits-epoux-donation": "escala",
    "fr.droits-freres-soeurs": "escala",
    "fr.droits-4e-degre": "numero",
    "fr.droits-non-parents": "numero",
    "fr.abattement-ligne-directe": "numero",
    "fr.abattement-don-petit-enfant": "numero",
    "fr.abattement-don-arriere-petit-enfant": "numero",
    "fr.abattement-don-epoux": "numero",
    "fr.abattement-freres-soeurs": "numero",
    "fr.abattement-neveux": "numero",
    "fr.abattement-handicap": "numero",
  },
  campos: [
    { id: "montant", tipo: "moneda", etiqueta: "Montant de la donation", min: 0, porDefecto: 200000 },
    {
      id: "lien",
      tipo: "opcion",
      etiqueta: "Lien entre le donateur et vous",
      opciones: [
        { valor: "enfant", etiqueta: "Enfant (don d'un parent)" },
        { valor: "parent", etiqueta: "Parent ou grand-parent (don d'un descendant)" },
        { valor: "petit-enfant", etiqueta: "Petit-enfant" },
        { valor: "arriere-petit-enfant", etiqueta: "Arrière-petit-enfant" },
        { valor: "epoux", etiqueta: "Époux ou partenaire de Pacs" },
        { valor: "frere-soeur", etiqueta: "Frère ou sœur" },
        { valor: "neveu", etiqueta: "Neveu ou nièce" },
        { valor: "parent-eloigne", etiqueta: "Autre parent jusqu'au 4e degré" },
        { valor: "autre", etiqueta: "Parent plus éloigné ou personne sans lien de parenté" },
      ],
      porDefecto: "enfant",
    },
    { id: "dejaUtilise", tipo: "moneda", etiqueta: "Abattement déjà utilisé depuis 15 ans", min: 0, porDefecto: 0, ayuda: "Les donations du même donateur depuis moins de 15 ans réduisent l'abattement." },
    { id: "handicap", tipo: "si-no", etiqueta: "Vous êtes en situation de handicap", porDefecto: false },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.montant <= 0) throw new ErrorEntrada("Indiquez le montant de la donation.", "montant");
    const abattementLien = {
      enfant: valores["fr.abattement-ligne-directe"],
      parent: valores["fr.abattement-ligne-directe"],
      "petit-enfant": valores["fr.abattement-don-petit-enfant"],
      "arriere-petit-enfant": valores["fr.abattement-don-arriere-petit-enfant"],
      epoux: valores["fr.abattement-don-epoux"],
      "frere-soeur": valores["fr.abattement-freres-soeurs"],
      neveu: valores["fr.abattement-neveux"],
      "parent-eloigne": 0,
      autre: 0,
    }[entrada.lien];
    const disponible = Math.max(0, abattementLien - entrada.dejaUtilise) + (entrada.handicap ? valores["fr.abattement-handicap"] : 0);
    const taxable = Math.max(0, entrada.montant - disponible);
    let droits: number;
    if (entrada.lien === "epoux") droits = aplicarEscalaMarginal(valores["fr.droits-epoux-donation"], taxable);
    else if (entrada.lien === "frere-soeur") droits = aplicarEscalaMarginal(valores["fr.droits-freres-soeurs"], taxable);
    else if (entrada.lien === "neveu" || entrada.lien === "parent-eloigne") droits = porcentaje(taxable, valores["fr.droits-4e-degre"]);
    else if (entrada.lien === "autre") droits = porcentaje(taxable, valores["fr.droits-non-parents"]);
    else droits = aplicarEscalaMarginal(valores["fr.droits-ligne-directe"], taxable);
    droits = redondear(droits);
    return {
      abattement: redondear(Math.min(disponible, entrada.montant)),
      taxable: redondear(taxable),
      droits,
      net: redondear(entrada.montant - droits),
      observaciones: ["Certains dons de sommes d'argent à un enfant ou un petit-enfant bénéficient d'une exonération supplémentaire, sous conditions d'âge, qui n'est pas comptée ici."],
    };
  },
  resultado: [
    { clave: "abattement", etiqueta: "Abattement appliqué", formato: "moneda" },
    { clave: "taxable", etiqueta: "Montant taxable", formato: "moneda" },
    { clave: "droits", etiqueta: "Droits de donation à payer", formato: "moneda", destacada: true },
    { clave: "net", etiqueta: "Ce que vous recevez net", formato: "moneda" },
  ],
});
