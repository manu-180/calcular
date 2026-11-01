import { aplicarEscalaMarginal, definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "ne.calcul-its",
  mercado: "ne",
  concepto: "impuesto-renta",
  slug: "calcul-its",
  estado: "publicado",
  requiere: { "ne.its-bareme": "escala" },
  campos: [
    {
      id: "revenu",
      tipo: "moneda",
      etiqueta: "Revenu net imposable du mois",
      min: 0,
      porDefecto: 200000,
      ayuda: "Le montant sur lequel le barème s'applique, après vos déductions.",
    },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.revenu <= 0) throw new ErrorEntrada("Indiquez un revenu supérieur à zéro.", "revenu");
    const bareme = v["ne.its-bareme"];
    const impot = redondear(aplicarEscalaMarginal(bareme, entrada.revenu));
    let tauxMarginal = bareme[0].tasa;
    for (const t of bareme) if (entrada.revenu > t.desde) tauxMarginal = t.tasa;
    return {
      impot,
      annuel: redondear(impot * 12),
      apresImpot: redondear(entrada.revenu - impot),
      tauxMarginal,
      tauxMoyen: Math.round((impot / entrada.revenu) * 10000) / 100,
    };
  },
  resultado: [
    { clave: "impot", etiqueta: "ITS du mois", formato: "moneda", destacada: true },
    { clave: "apresImpot", etiqueta: "Revenu après ITS", formato: "moneda" },
    { clave: "annuel", etiqueta: "ITS sur 12 mois au même revenu", formato: "moneda" },
    { clave: "tauxMarginal", etiqueta: "Taux de la dernière tranche atteinte", formato: "porcentaje", decimales: 0 },
    { clave: "tauxMoyen", etiqueta: "Taux moyen", formato: "porcentaje", decimales: 2 },
  ],
});
