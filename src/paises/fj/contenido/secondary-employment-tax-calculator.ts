import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "fj.secondary-employment-tax-calculator",
  h1: "Second job tax calculator Fiji {{anio}}",
  title: "Second job tax in Fiji {{anio}}: code S rate",
  description: "A second or extra job is taxed at {{fj.paye-secondary-rate}} of gross pay under tax code S. See the PAYE withheld and the pay you keep.",
  intro: [
    "If you have a second job in Fiji, your employer there withholds {{fj.paye-secondary-rate}} of every gross payment. That is the secondary rate under tax code S, set out in the FRCS Employer Guide 2026.",
    "Enter the gross pay from the job to see the PAYE taken and the pay you receive. The same {{fj.paye-no-declaration-rate}} applies if you gave an employer no tax code at all.",
  ],
  comoSeCalcula: [
    "Your main job uses tax code P. It gets the tax free band of {{fj.paye-bands[1].desde}} a year and the rising rates above it.",
    "Any further job uses code S. The employer multiplies each gross payment by the secondary rate of {{fj.paye-secondary-rate}}. There is no tax free band on that pay and no deduction.",
    "If an employer does not receive a tax code declaration (form IRS 458A) within five working days of the start, it must deduct {{fj.paye-no-declaration-rate}} of gross employment income until it does.",
    "A person with a secondary job can ask FRCS for a Special Tax Rate Certificate through the TPOS portal. FRCS replies within five working days of the request.",
  ],
  ejemplo: [
    "You earn FJ$1,000 from a weekend job and your main job is declared under code P. The weekend employer withholds 20% of FJ$1,000, which is FJ$200, and pays you FJ$800.",
  ],
  faq: [
    {
      pregunta: "What is tax code S?",
      respuesta: "It is the code for secondary employment. Anyone with a main job under code P who takes another job must declare the new employer under code S.",
    },
    {
      pregunta: "What rate does a second job pay?",
      respuesta: "The FRCS Employer Guide 2026 says the secondary rate of PAYE is {{fj.paye-secondary-rate}} of the gross payment.",
    },
    {
      pregunta: "What happens if I never gave my employer a tax code?",
      respuesta: "The employer must deduct {{fj.paye-no-declaration-rate}} of your gross employment income if it does not receive the declaration within five working days.",
    },
  ],
  glosario: [
    { termino: "Tax code P", definicion: "The primary code, used for your main source of employment income." },
    { termino: "Tax code S", definicion: "The secondary code, used for each additional job." },
    { termino: "STRC", definicion: "Special Tax Rate Certificate, a rate FRCS can set for a person with secondary employment." },
  ],
});
