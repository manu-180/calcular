import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "za.severance-pay",
  h1: "Severance pay calculator",
  title: "Severance pay calculator: retrenchment pay and tax",
  description: "Work out your minimum severance pay if you are retrenched: one week's pay per completed year of service, plus the tax on the severance benefit.",
  intro: [
    "If you are dismissed for operational requirements (retrenchment), the law sets a minimum severance pay. Enter your monthly pay and completed years of service to see it.",
    "Add any extra severance your employer offers to see the tax SARS charges on the whole benefit.",
  ],
  comoSeCalcula: [
    "One week's remuneration is your monthly remuneration divided by {{za.weeks-per-month}}.",
    "The minimum severance pay is {{za.severance-weeks-per-year}} week's remuneration for each completed year of continuous service.",
    "Severance benefits are taxed on their own table: the first part is tax-free and the rest is taxed at 18%, 27% and 36%. Earlier retirement and severance lump sums count towards the same table.",
  ],
  ejemplo: ["On R20 000 a month after six years, one week is R4 615,74 and the minimum severance pay is R27 694,44, with no tax."],
  faq: [
    {
      pregunta: "When do I get severance pay?",
      respuesta:
        "When you are dismissed for the employer's operational requirements, meaning its economic, technological, structural or similar needs, or when your contract ends because the employer is insolvent.",
    },
    {
      pregunta: "Can I lose my severance pay?",
      respuesta: "Yes, if you unreasonably refuse an offer of other work with the same employer or another employer.",
    },
    {
      pregunta: "Is severance pay the only payment I get?",
      respuesta: "No. Severance pay does not affect other amounts you are owed, such as notice pay and pay for leave you have not taken.",
    },
    {
      pregunta: "Can my employer pay more than the minimum?",
      respuesta: "Yes. The law sets the minimum. Your employer can always offer a better package.",
    },
  ],
  glosario: [
    { termino: "Retrenchment", definicion: "Dismissal for operational requirements, when the business needs to cut jobs." },
    { termino: "Severance benefit", definicion: "A lump sum from your employer because your job ends. SARS taxes it on the same table as retirement lump sums." },
  ],
});
