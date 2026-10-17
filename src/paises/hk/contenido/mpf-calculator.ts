import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "hk.mpf-calculator",
  h1: "MPF contribution calculator",
  title: "MPF calculator Hong Kong: employee and employer",
  description:
    "Work out the MPF mandatory contributions on your monthly pay: {{hk.mpf-rate}} from you and {{hk.mpf-rate}} from your employer, with the minimum and maximum levels.",
  intro: [
    "The Mandatory Provident Fund (MPF) is Hong Kong's compulsory retirement savings. Every month you and your employer each put a share of your pay into your MPF account.",
    "Enter your monthly relevant income to see both contributions and what's left after yours.",
  ],
  comoSeCalcula: [
    "Each side contributes {{hk.mpf-rate}} of your relevant income.",
    "If you earn less than {{hk.mpf-min-relevant-income}} a month, you don't contribute, but your employer still does.",
    "Above {{hk.mpf-max-relevant-income}} a month, both contributions are worked out on {{hk.mpf-max-relevant-income}}.",
  ],
  ejemplo: ["On $25,000 a month you pay $1,250 and your employer pays $1,250, so $2,500 goes into your account."],
  faq: [
    {
      pregunta: "What is the maximum MPF contribution?",
      respuesta: "{{hk.mpf-rate}} of {{hk.mpf-max-relevant-income}} for you and the same for your employer, each month. Anything you earn above that level has no mandatory contribution.",
    },
    {
      pregunta: "Do I contribute if I earn less than the minimum?",
      respuesta: "No. Below {{hk.mpf-min-relevant-income}} a month you're exempt, but your employer must still pay {{hk.mpf-rate}} of your relevant income.",
    },
    {
      pregunta: "What counts as relevant income?",
      respuesta: "All money paid by your employer for your work: wages, salary, leave pay, fees, commission, bonus, gratuity, perquisites and allowances. Severance and long service payments are left out, and so are non-monetary benefits.",
    },
    {
      pregunta: "Are MPF contributions tax deductible?",
      respuesta: "Yes. Your mandatory contributions are deductible for salaries tax, up to {{hk.deduction-limits[mpf]}} a year.",
    },
  ],
  glosario: [
    { termino: "MPF", definicion: "Mandatory Provident Fund, the compulsory retirement scheme for employees and self-employed people." },
    { termino: "Relevant income", definicion: "The pay MPF contributions are worked out on." },
  ],
});
