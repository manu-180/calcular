import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "nz.ocr-mortgage-calculator",
  h1: "OCR mortgage calculator",
  title: "OCR mortgage calculator NZ: what a rate change costs you",
  description: "See how a change in the Reserve Bank's Official Cash Rate (OCR) could change your mortgage repayments, monthly, fortnightly or weekly.",
  intro: [
    "The Official Cash Rate (OCR) is set by the Reserve Bank of New Zealand. When it moves, many borrowers want to know what it could mean for their repayments.",
    "Enter your mortgage and test an OCR rise or cut. You choose how much of the change your bank passes on.",
  ],
  comoSeCalcula: [
    "Your repayment today is worked out from your balance, your interest rate and the years left, for the way you pay.",
    "We add the OCR change, times the share your bank passes on, to your rate and work out the repayment again.",
    "The difference is what you'd pay more, or less, each time and over a year.",
  ],
  ejemplo: ["On $500,000 at 5% over 25 years you pay $2,922.95 a month. If your rate rises by 0.25 points, that becomes $2,996.24, or $73.29 more a month."],
  faq: [
    {
      pregunta: "How often does the Reserve Bank review the OCR?",
      respuesta: "The Monetary Policy Committee reviews it 8 times a year.",
    },
    {
      pregunta: "Will my bank change my rate by the same amount?",
      respuesta: "Not necessarily. Banks set their own rates. That's why you can choose how much of the change is passed on.",
    },
    {
      pregunta: "Does an OCR change affect a fixed-rate mortgage?",
      respuesta: "Not until your fixed term ends. The new rate you get when you refix may reflect the change.",
    },
  ],
  glosario: [
    { termino: "OCR", definicion: "Official Cash Rate, the interest rate set by the Reserve Bank of New Zealand." },
    { termino: "Basis point", definicion: "One hundredth of a percentage point. 25 basis points is 0.25 points." },
  ],
});
