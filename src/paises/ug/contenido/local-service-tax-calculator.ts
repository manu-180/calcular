import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ug.local-service-tax-calculator",
  h1: "Local service tax calculator Uganda (LST)",
  title: "Local service tax (LST) calculator Uganda",
  description: "Find your local service tax in Uganda from your monthly pay: from {{ug.lst-bands[1].cuotaFija}} to {{ug.lst-bands[-1].cuotaFija}} a year, paid in four instalments from July to October.",
  intro: [
    "Local service tax (LST) is a yearly tax that district and urban councils charge on people in gainful employment. Your employer deducts it and pays it to the council.",
    "Enter your monthly pay to see your band, the tax for the year and each instalment.",
  ],
  comoSeCalcula: [
    "The tax is a fixed amount for each band of monthly pay. Pay above Ushs 100,000 and up to Ushs 200,000 pays {{ug.lst-bands[1].cuotaFija}} a year.",
    "Each band of Ushs 100,000 adds more, up to {{ug.lst-bands[-1].cuotaFija}} a year for pay above Ushs 1,000,000.",
    "Salaried employees pay in four equal instalments, completed within the first four months of the financial year (July to October).",
    "The Local Governments (Amendment) (No. 2) Act, 2008 measures the band on take-home pay, which it defines as gross pay after PAYE. KCCA's guide applies the band to gross pay, so you can choose either.",
  ],
  ejemplo: ["On Ushs 420,000 a month the band is above Ushs 400,000, so the tax is {{ug.lst-bands[4].cuotaFija}} a year, or Ushs 7,500 in each of the four instalments."],
  faq: [
    {
      pregunta: "Who does not pay local service tax?",
      respuesta: "Members of the UPDF, the Uganda Police Force and the Uganda Prisons Service, local defence forces and diplomatic missions are exempt. So are unemployed people, peasants and petty food vendors.",
    },
    {
      pregunta: "Is local service tax deducted every month?",
      respuesta: "No. Employers collect it in four equal instalments and the tax must be paid in full within the first four months of the financial year.",
    },
    {
      pregunta: "Does local service tax reduce my income tax?",
      respuesta: "The Income Tax Act allows local service tax paid by an individual as a deduction when working out chargeable income.",
    },
    {
      pregunta: "Do self-employed people pay it?",
      respuesta: "Yes, but with other bands. Practising professionals, artisans, business people and commercial farmers pay in full once a year. In Kampala, business people pay it with their trading licence.",
    },
  ],
  glosario: [
    { termino: "LST", definicion: "Local service tax, a yearly tax on income collected by local governments." },
    { termino: "KCCA", definicion: "Kampala Capital City Authority, which collects LST in Kampala." },
  ],
});
