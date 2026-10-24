import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "tn.impot-sur-les-societes",
  mercado: "tn",
  concepto: "propio",
  slug: "impot-sur-les-societes",
  estado: "publicado",
  requiere: {
    "tn.is-taux": "mapa",
    "tn.css-is-points": "mapa",
    "tn.css-is-minimum": "mapa",
  },
  campos: [
    { id: "benefice", tipo: "moneda", etiqueta: "Bénéfice imposable de l'exercice", min: 0, porDefecto: 100000 },
    {
      id: "regime",
      tipo: "opcion",
      etiqueta: "Taux applicable à la société",
      opciones: [
        { valor: "normal", etiqueta: "Taux normal" },
        { valor: "reduit", etiqueta: "Taux réduit (agriculture et pêche, développement régional, coopératives, artisanat)" },
        { valor: "majore", etiqueta: "Taux majoré (télécoms, hydrocarbures, grandes surfaces, concessionnaires, franchises, sociétés d'investissement)" },
      ],
      porDefecto: "normal",
    },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.benefice < 0) throw new ErrorEntrada("Indiquez un bénéfice positif ou nul.", "benefice");
    const t = v["tn.is-taux"];
    const taux = t[entrada.regime];
    const base = Math.floor(entrada.benefice);
    const is = redondear(porcentaje(base, taux));
    const pts = v["tn.css-is-points"];
    const min = v["tn.css-is-minimum"];
    const majore = entrada.regime === "majore";
    const points = majore ? pts["taux-35-et-plus"] : pts["taux-inferieur"];
    const minimum = majore ? min["taux-35-et-plus"] : entrada.regime === "normal" ? min["taux-20"] : min["taux-10"];
    const css = Math.max(redondear(porcentaje(base, points)), minimum);
    return {
      total: redondear(is + css),
      is,
      css,
      taux,
      observaciones: [
        "Le bénéfice est arrondi au dinar inférieur. Ce calcul ne tient pas compte des minimums d'impôt ni des régimes d'incitation propres à certaines entreprises.",
      ],
    };
  },
  resultado: [
    { clave: "total", etiqueta: "Impôt et contribution à payer", formato: "moneda", destacada: true },
    { clave: "is", etiqueta: "Impôt sur les sociétés", formato: "moneda" },
    { clave: "css", etiqueta: "Contribution sociale de solidarité", formato: "moneda" },
    { clave: "taux", etiqueta: "Taux de l'impôt", formato: "porcentaje" },
  ],
});
