import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "gb.self-employed-tax",
  h1: "Self-employed tax calculator 2026/27",
  title: "Self-employed tax calculator 2026/27: tax and Class 4 NI",
  description:
    "Work out the Income Tax and Class 4 National Insurance on your self-employed profit for 2026/27, and what to set aside each month for Self Assessment.",
  intro: [
    "As a sole trader you pay Income Tax and National Insurance on your profit through Self Assessment, not through payroll. Knowing the bill early helps you set money aside.",
    "Enter your yearly profit (income minus allowable expenses) and where you live to see your tax, your National Insurance and what is left.",
  ],
  comoSeCalcula: [
    "Income Tax uses the same Personal Allowance of {{gb.personal-allowance}} and the same bands as for employees, including the Scottish bands.",
    "Class 4 National Insurance is {{gb.class4-main-rate}} on profits between {{gb.class4-lower-profits-limit}} and {{gb.class4-upper-profits-limit}}, and {{gb.class4-upper-rate}} above.",
    "You do not pay Class 2 any more. With profits of {{gb.class2-small-profits-threshold}} or more it is treated as paid. Below that you can choose to pay {{gb.class2-weekly-rate}} a week to keep your State Pension record.",
  ],
  ejemplo: ["On £40,000 of profit in England you pay £5,486 Income Tax and £1,645.80 Class 4, so £7,131.80 in total. That is about £594 a month to put aside."],
  faq: [
    {
      pregunta: "When do I pay my self-employed tax?",
      respuesta:
        "The balance for the tax year is due by 31 January after it ends. If your bill is £1,000 or more, you usually also make payments on account towards the next year on 31 January and 31 July.",
    },
    {
      pregunta: "What expenses can I deduct?",
      respuesta:
        "Costs you have only for your business, such as stock, materials, business travel, phone and software. You can use simplified expenses for some costs, or the trading allowance if your expenses are small.",
    },
    {
      pregunta: "I am employed and self-employed. Does this work for me?",
      respuesta:
        "This calculator assumes your self-employed profit is your only income. If you also have a salary, your Personal Allowance and lower bands are used by the salary first, so your profit is taxed at a higher rate.",
    },
    {
      pregunta: "Do I need to register as self-employed?",
      respuesta: "Yes, if you earn more than £1,000 from self-employment in a tax year. You register for Self Assessment with HMRC.",
    },
  ],
  glosario: [
    { termino: "Self Assessment", definicion: "The yearly tax return you send to HMRC to report income that is not taxed through PAYE." },
    { termino: "Class 4", definicion: "The National Insurance paid by self-employed people on their profits." },
    { termino: "Payments on account", definicion: "Advance payments towards next year's bill, each usually half of this year's." },
  ],
});
