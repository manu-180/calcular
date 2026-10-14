import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "us.social-security-benefits",
  h1: "Social Security benefits calculator",
  title: "Social Security Benefits Calculator: claim at 62, 67 or 70",
  description:
    "Estimate your monthly Social Security retirement benefit from your average indexed monthly earnings and see how claiming early or late changes it.",
  intro: [
    "Your Social Security check depends on your lifetime earnings and on the age you start. Starting early cuts it for life, and waiting until 70 raises it.",
    "Enter your average indexed monthly earnings (AIME) and the age you plan to claim to estimate your monthly benefit.",
  ],
  comoSeCalcula: [
    "Your primary insurance amount (PIA) is 90% of the first slice of your AIME, 32% of the middle slice and 15% of the rest. For people who turn 62 in 2026, the slices break at $1,286 and $7,749.",
    "If you were born in 1960 or later, your full retirement age is 67. At that age you get 100% of your PIA.",
    "Each month you claim early lowers the benefit by 5/9 of 1% for the first 36 months and 5/12 of 1% after that. At 62 the cut is 30%.",
    "Each month you wait past 67 adds 2/3 of 1%, or 8% a year, up to age 70.",
  ],
  ejemplo: ["With an AIME of $5,000, the PIA is $2,345.80. Claiming at 62 pays about $1,642 a month, at 67 about $2,345 and at 70 about $2,908."],
  faq: [
    {
      pregunta: "How do I find my AIME?",
      respuesta:
        "Sign in to your my Social Security account at ssa.gov to see your earnings record and benefit estimates. AIME is your highest 35 years of earnings, adjusted for wage growth, divided by 420.",
    },
    {
      pregunta: "Is it better to claim at 62 or wait?",
      respuesta:
        "Waiting pays more per month for life. Claiming early can make sense if you need the income or don't expect a long retirement. A spouse who may collect survivor benefits also gains when the higher earner waits.",
    },
    {
      pregunta: "Why is this different from my SSA statement?",
      respuesta:
        "Your statement projects your future earnings and uses your own eligibility year. This calculator uses the AIME you enter and the 2026 formula, without cost-of-living increases.",
    },
  ],
  glosario: [
    { termino: "AIME", definicion: "Average indexed monthly earnings: the base Social Security uses to figure your benefit." },
    { termino: "PIA", definicion: "Primary insurance amount: your monthly benefit if you start at full retirement age." },
    { termino: "Full retirement age", definicion: "The age when you get your full benefit. It is 67 for anyone born in 1960 or later." },
  ],
});
