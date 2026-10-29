import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "bj.taxe-professionnelle-synthetique",
  mercado: "bj",
  concepto: "regimen-simplificado",
  slug: "taxe-professionnelle-synthetique",
  estado: "publicado",
  requiere: { "bj.tps-taux": "numero", "bj.tps-minimum": "numero", "bj.tps-redevance-ortb": "numero" },
  campos: [
    {
      id: "recettes",
      tipo: "moneda",
      etiqueta: "Recettes annuelles de l'établissement",
      min: 0,
      porDefecto: 4000000,
      ayuda: "Le total encaissé sur l'année pour un seul établissement dans une seule commune.",
    },
    { id: "etablissements", tipo: "entero", etiqueta: "Nombre d'établissements de même niveau de recettes", min: 1, max: 50, porDefecto: 1 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.recettes <= 0) throw new ErrorEntrada("Indiquez des recettes annuelles supérieures à zéro.", "recettes");
    const calculee = redondear(porcentaje(entrada.recettes, v["bj.tps-taux"]));
    const minimum = v["bj.tps-minimum"];
    const impot = Math.max(calculee, minimum);
    const redevance = v["bj.tps-redevance-ortb"];
    const parEtablissement = impot + redevance;
    return {
      total: redondear(parEtablissement * entrada.etablissements),
      impot,
      redevance,
      parEtablissement,
      minimumApplique: calculee < minimum ? "Oui, le minimum de perception s'applique." : "Non, le calcul dépasse le minimum.",
    };
  },
  resultado: [
    { clave: "total", etiqueta: "Total à payer pour l'année", formato: "moneda", destacada: true },
    { clave: "impot", etiqueta: "Taxe professionnelle synthétique d'un établissement", formato: "moneda" },
    { clave: "redevance", etiqueta: "Redevance de radiodiffusion et télévision, par établissement", formato: "moneda" },
    { clave: "parEtablissement", etiqueta: "Taxe et redevance d'un établissement", formato: "moneda" },
    { clave: "minimumApplique", etiqueta: "Minimum de perception", formato: "texto" },
  ],
});
