import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "cm-en.calcul-salaire-net",
  h1: "Net salary calculator for Cameroon",
  title: "Net salary calculator Cameroon: from gross to net pay",
  description:
    "Work out your take-home pay: IRPP and council tax, CNPS pension of {{cm.cnps-pension[salarie]}}, Housing Loan Fund, CRTV fee and local development tax.",
  intro: [
    "Your payslip takes several deductions from gross pay: IRPP income tax and its council additional tax, the CNPS old-age pension, the Housing Loan Fund, the broadcasting fee and the local development tax.",
    "Enter your taxable gross pay for the month. You get your net pay and each deduction, worked out with the current General Tax Code.",
  ],
  comoSeCalcula: [
    "The CNPS takes {{cm.cnps-pension[salarie]}} of gross pay for the pension, on pay capped at {{cm.cnps-plafond}} a month.",
    "IRPP is worked out over the year: gross pay minus {{cm.irpp-frais-professionnels}} for work expenses (up to {{cm.irpp-plafond-frais}} a year), minus the CNPS pension, minus a {{cm.irpp-abattement}} allowance. Rates run from {{cm.irpp-bareme[0].tasa}} to {{cm.irpp-bareme[-1].tasa}} and the tax is split over 12 months.",
    "The council additional tax adds {{cm.cac}} of the IRPP. Below {{cm.irpp-seuil-retenue}} of gross pay a month, no IRPP is withheld.",
    "The Housing Loan Fund takes {{cm.cfc-taux[salarie]}} of gross pay rounded down to the thousand. The broadcasting fee and the local development tax are fixed amounts set by pay band.",
  ],
  ejemplo: [
    "On 500,000 F gross: 21,000 F CNPS, 38,500 F IRPP, 3,850 F council tax, 5,000 F Housing Loan Fund, 5,850 F CRTV fee and 2,250 F local development tax. Net pay is 423,550 F.",
  ],
  faq: [
    {
      pregunta: "Why does the CNPS deduction stop growing?",
      respuesta: "The pension contribution applies to pay up to {{cm.cnps-plafond}} a month. Above that, the deduction stays the same.",
    },
    {
      pregunta: "Do I need receipts for the work expenses deduction?",
      respuesta: "No. The General Tax Code allows a flat {{cm.irpp-frais-professionnels}} of gross pay, capped at {{cm.irpp-plafond-frais}} a year.",
    },
    {
      pregunta: "Which salary counts for the local development tax?",
      respuesta: "Your monthly basic salary, without bonuses or allowances. If you leave it blank, the calculator uses gross pay, which may give a higher band.",
    },
    {
      pregunta: "Are family allowances taxed?",
      respuesta: "No. Family allowances and refunds of work expenses are left out of taxable pay. Enter them in their own box and they go straight to net pay.",
    },
  ],
  glosario: [
    { termino: "Taxable gross pay", definicion: "Salary, bonuses, taxable allowances and benefits in kind, before any deduction." },
    { termino: "CAC", definicion: "Council additional tax: a surcharge on IRPP paid to local councils." },
  ],
});
