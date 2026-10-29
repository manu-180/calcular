import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "bn.corporate-tax-calculator",
  h1: "Corporate tax calculator Brunei {{anio}}",
  title: "Brunei corporate tax {{anio}}: {{bn.corporate-tax-rate}} with thresholds",
  description:
    "Work out company income tax in Brunei: {{bn.corporate-tax-rate}} on chargeable income, cut to a quarter or half rate on the first slices. Includes the new company relief.",
  intro: [
    "Brunei Darussalam taxes companies, not people. The corporate income tax rate is {{bn.corporate-tax-rate}} of chargeable income for the year of assessment 2015 and every later year. The Ministry of Finance and Economy adds a tax threshold that lowers the effective rate for small and medium companies.",
    "Enter your chargeable income, which is profit after allowable deductions and capital allowances. Choose whether the company is an existing one or in its first three years of assessment.",
  ],
  comoSeCalcula: [
    "Existing companies: the first {{bn.threshold-first-band}} is taxed at {{bn.threshold-first-share}} of the rate. The next {{bn.threshold-second-band}} is taxed at {{bn.threshold-second-share}} of the rate. The rest pays the full rate.",
    "Newly incorporated companies: the first {{bn.new-company-exempt}} of chargeable income is exempt for the first {{bn.new-company-years}} years of assessment. The next {{bn.threshold-second-band}} pays {{bn.threshold-second-share}} of the rate and the rest pays the full rate.",
    "The tax threshold has applied since the year of assessment 2011. Sole proprietorships and partnerships registered as business names pay no income tax.",
  ],
  ejemplo: [
    "A company with chargeable income of BND 500,000 pays BND 4,625 on the first BND 100,000, BND 13,875 on the next BND 150,000 and BND 46,250 on the last BND 250,000. The total is BND 64,750, an effective rate of 12.95 percent. A new company pays BND 60,125.",
  ],
  faq: [
    {
      pregunta: "When must a company file its income tax return?",
      respuesta: "By 30 June each year. The Revenue Division says a company that fails to file without a reasonable excuse commits an offence and faces a fine of {{bn.return-failure-fine}}, or 12 months in prison if it does not pay.",
    },
    {
      pregunta: "Do I pay tax as a sole proprietor or partner?",
      respuesta: "No. The Ministry of Finance and Economy says no tax is levied on unincorporated businesses, meaning sole proprietorships and partnerships registered as business names, nor on personal income or capital gains.",
    },
    {
      pregunta: "When is the tax paid?",
      respuesta: "Within 30 days after the Notice of Assessment is served, even if the company objects. A company also files an estimate of its chargeable income within 3 months after the end of its accounting period.",
    },
    {
      pregunta: "Is the oil and gas rate different?",
      respuesta: "Yes. The Revenue Division says profits of companies exploring and producing oil and gas are taxed at 55 percent. This calculator does not cover them.",
    },
  ],
  glosario: [
    { termino: "Chargeable income", definicion: "Taxable profit after allowable deductions and capital allowances." },
    { termino: "Year of assessment", definicion: "The tax year, worked out on a preceding year basis." },
    { termino: "Tax threshold", definicion: "A reduced rate on the first slices of chargeable income." },
  ],
});
