import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "gh.take-home-pay",
  h1: "Take-home pay calculator Ghana",
  title: "Take-home pay calculator Ghana: salary after SSNIT and PAYE",
  description: "See your net salary in Ghana after SSNIT and PAYE, with cash allowances and your provident fund, using the GRA bands in force since September 2026.",
  intro: [
    "Enter your basic salary and cash allowances to see what you take home after SSNIT and PAYE.",
    "SSNIT is {{gh.ssnit-employee-rate}} of your basic salary and comes off before PAYE is worked out.",
  ],
  comoSeCalcula: [
    "SSNIT: {{gh.ssnit-employee-rate}} of your basic salary.",
    "Chargeable income: basic salary plus cash allowances, minus SSNIT and your provident fund contribution up to {{gh.provident-fund-relief}} of basic salary.",
    "PAYE: the yearly bands applied to 12 times your monthly chargeable income, divided by 12.",
  ],
  ejemplo: ["On a basic salary of GH₵5,000, SSNIT is GH₵275 and PAYE is GH₵785.75, so you take home GH₵3,939.25."],
  faq: [
    {
      pregunta: "Are allowances taxed?",
      respuesta: "Yes. Cash allowances such as transport, rent, risk and night duty allowances are added to your salary for PAYE. Benefits in kind are valued and added too.",
    },
    {
      pregunta: "Does SSNIT reduce my tax?",
      respuesta: "Yes. Your {{gh.ssnit-employee-rate}} SSNIT contribution is deducted from your income before PAYE is calculated.",
    },
    {
      pregunta: "How much of my provident fund is tax-free?",
      respuesta: "Contributions to a provident fund are deductible up to {{gh.provident-fund-relief}} of your basic salary, whether you, your employer or both pay them.",
    },
  ],
  glosario: [
    { termino: "SSNIT", definicion: "Social Security and National Insurance Trust, which runs the basic national pension." },
    { termino: "Tier 3", definicion: "Voluntary provident fund or personal pension savings on top of SSNIT and Tier 2." },
  ],
});
