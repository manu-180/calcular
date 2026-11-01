import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "bn.spk-calculator",
  h1: "SPK calculator {{anio}}: TAP and SCP contributions",
  title: "SPK calculator {{anio}}: employee and employer share",
  description:
    "Enter your basic salary to see the SPK contribution: {{bn.spk-employee-rate}} from you and {{bn.spk-employer-bands[-1].tasa}} to {{bn.spk-employer-bands[1].tasa}} from your employer, with no cap.",
  intro: [
    "You pay {{bn.spk-employee-rate}} of your basic salary into the Skim Persaraan Kebangsaan (SPK), the national retirement scheme run by the Employees Trust Fund (TAP). Your employer pays a rate that falls as your salary rises, from {{bn.spk-employer-bands[1].tasa}} down to {{bn.spk-employer-bands[-1].tasa}}.",
    "SPK replaced the old TAP and SCP accounts from {{bn.spk-employee-rate#desde}}. Many people still say TAP and SCP, so this page answers both searches. Type your monthly basic salary and you get your share, your employer's share and the total that lands in your retirement savings each month.",
  ],
  comoSeCalcula: [
    "Your share is {{bn.spk-employee-rate}} of basic salary, rounded to two decimals. There is no longer a maximum, so the deduction grows with your pay.",
    "Your employer pays by salary group. Up to {{bn.spk-employer-bands[0].hasta}} the amount is fixed at {{bn.spk-employer-bands[0].cuotaFija}}. From {{bn.spk-employer-bands[1].desde}} to {{bn.spk-employer-bands[1].hasta}} the rate is {{bn.spk-employer-bands[1].tasa}}. From {{bn.spk-employer-bands[2].desde}} to {{bn.spk-employer-bands[2].hasta}} it is {{bn.spk-employer-bands[2].tasa}}. Above {{bn.spk-employer-bands[3].desde}} it is {{bn.spk-employer-bands[3].tasa}}. The rate applies to the whole salary, not slice by slice, and the employer never pays less than {{bn.spk-employer-minimum}}.",
    "Your employer pays both shares to TAP by day {{bn.spk-payment-day}} of the next month.",
  ],
  ejemplo: [
    "On a basic salary of BND 2,500 you pay BND 212.50. Your employer pays 9.5% of the same salary, BND 237.50. In all BND 450.00 goes into SPK that month, which is BND 5,400.00 over a year.",
  ],
  faq: [
    {
      pregunta: "Who has to join SPK?",
      respuesta: "Citizens and permanent residents of Brunei Darussalam who work and are under 60. Registration is mandatory for every eligible employee, whether paid daily or monthly, on contract, part time or on probation. The Employees Trust Fund explains this on its Skim Persaraan Kebangsaan page.",
    },
    {
      pregunta: "Is there still a maximum contribution?",
      respuesta: "No. TAP states that SPK no longer has a maximum mandatory contribution. The rates apply to the full salary, and only the employer has a minimum of {{bn.spk-employer-minimum}}.",
    },
    {
      pregunta: "Which pay counts as wages?",
      respuesta: "Basic salary counts. For people with no basic salary, pay for work done such as commission or allowance counts. TAP lists items that do not count, for example overtime, housing allowance, gratuity and service charge.",
    },
    {
      pregunta: "What happened to my TAP and SCP accounts?",
      respuesta: "SPK launched on 15 July 2023 and separated member and employer money. Your own contributions go to the SPK Member Account. Employer contributions go to the SPK Retirement Account, which pays a lifetime annuity from age 60.",
    },
  ],
  glosario: [
    { termino: "SPK", definicion: "Skim Persaraan Kebangsaan, the national retirement scheme that replaced the separate TAP and SCP schemes." },
    { termino: "TAP", definicion: "Tabung Amanah Pekerja, the Employees Trust Fund that runs SPK." },
    { termino: "SCP", definicion: "Supplemental Contributory Pension, the older second account that sat beside TAP." },
    { termino: "Member Account", definicion: "The account that holds your own contributions and any voluntary top ups." },
  ],
});
