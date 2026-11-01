import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "ci.conges-payes",
  mercado: "ci",
  concepto: "vacaciones",
  slug: "conges-payes",
  estado: "publicado",
  requiere: {
    "ci.conges-jours-par-mois": "numero",
    "ci.conges-supplement-anciennete": "mapa",
    "ci.conges-allocation-diviseur": "numero",
  },
  campos: [
    { id: "mois", tipo: "entero", etiqueta: "Mois de service effectif depuis le dernier congé", min: 1, max: 36, porDefecto: 12 },
    { id: "annees", tipo: "entero", etiqueta: "Ancienneté dans l'entreprise (années complètes)", min: 0, max: 60, porDefecto: 3 },
    {
      id: "remuneration",
      tipo: "moneda",
      etiqueta: "Rémunération totale perçue pendant ces mois",
      min: 0,
      porDefecto: 3600000,
      ayuda: "Salaires, primes et commissions de la période, sans les remboursements de frais.",
    },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.remuneration <= 0) throw new ErrorEntrada("Indiquez une rémunération supérieure à zéro.", "remuneration");
    // Le décret n° 98-39 arrondit la durée du congé au nombre entier de jours immédiatement supérieur.
    const joursPrincipal = Math.ceil(Math.round(entrada.mois * v["ci.conges-jours-par-mois"] * 100) / 100);
    const paliers = v["ci.conges-supplement-anciennete"];
    let supplement = 0;
    for (const [seuil, jours] of Object.entries(paliers)) if (entrada.annees >= Number(seuil)) supplement = Math.max(supplement, jours);
    const allocationPrincipale = redondear(entrada.remuneration / v["ci.conges-allocation-diviseur"]);
    const allocationSupplement = redondear((allocationPrincipale / joursPrincipal) * supplement);
    return {
      jours: joursPrincipal + supplement,
      joursPrincipal,
      supplement,
      allocation: redondear(allocationPrincipale + allocationSupplement),
      allocationPrincipale,
      allocationSupplement,
    };
  },
  resultado: [
    { clave: "allocation", etiqueta: "Allocation de congé", formato: "moneda", destacada: true },
    { clave: "jours", etiqueta: "Jours ouvrables de congé", formato: "dias" },
    { clave: "joursPrincipal", etiqueta: "Dont congé principal", formato: "dias" },
    { clave: "supplement", etiqueta: "Dont jours d'ancienneté", formato: "dias", ocultarSiCero: true },
    { clave: "allocationPrincipale", etiqueta: "Allocation du congé principal", formato: "moneda" },
    { clave: "allocationSupplement", etiqueta: "Allocation des jours d'ancienneté", formato: "moneda", ocultarSiCero: true },
  ],
});
