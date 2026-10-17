import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "my.opr-calculator",
  h1: "OPR calculator: what a rate change does to your loan",
  title: "OPR calculator: home loan instalment after an OPR change",
  description: "See how a change in Bank Negara's Overnight Policy Rate, now {{my.opr}}, would move your monthly home loan instalment.",
  intro: [
    "Bank Negara Malaysia sets the Overnight Policy Rate (OPR). When it moves, banks usually adjust the rates on floating-rate loans.",
    "Enter your loan and a change to test, and see your new monthly instalment.",
  ],
  comoSeCalcula: [
    "Your current instalment is worked out with the standard loan formula for the years left.",
    "Your new rate is your current rate plus the OPR change, times the share your bank passes on.",
    "The new instalment uses the new rate over the same years, and the calculator shows the difference.",
  ],
  ejemplo: ["On RM400,000 over 30 years at 4%, a 0.25 point cut passed on in full lowers the instalment from RM1,909.66 to RM1,852.46, about RM57 a month."],
  faq: [
    {
      pregunta: "What is the OPR now?",
      respuesta: "{{my.opr}}, as of Bank Negara's last Monetary Policy Committee decision on {{my.opr#desde}}.",
    },
    {
      pregunta: "Does every loan change with the OPR?",
      respuesta: "Fixed-rate loans do not change during the fixed period. Floating-rate loans are priced off the bank's own reference rate, which banks usually move with the OPR.",
    },
    {
      pregunta: "Where do the OPR figures come from?",
      respuesta: "From Bank Negara Malaysia's open API, which lists each Monetary Policy Committee decision and the OPR level that followed.",
    },
  ],
  glosario: [
    { termino: "OPR", definicion: "Overnight Policy Rate, Bank Negara Malaysia's policy interest rate." },
    { termino: "MPC", definicion: "Monetary Policy Committee, the BNM body that decides the OPR." },
  ],
});
