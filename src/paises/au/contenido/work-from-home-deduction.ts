import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "au.work-from-home-deduction",
  h1: "Work from home deduction calculator",
  title: "Work from home tax deduction: fixed rate calculator",
  description: "Work out your working from home deduction with the ATO fixed rate method: {{au.wfh-tasa[2025-26]}} per work hour for 2025-26, plus work equipment.",
  intro: [
    "If you work from home, you can claim a deduction for the extra running costs, such as electricity, internet and phone, with the ATO fixed rate method.",
    "Enter the hours you worked from home in the year. You get the deduction to put in your tax return.",
  ],
  comoSeCalcula: [
    "Multiply the hours you worked from home by the fixed rate: {{au.wfh-tasa[2025-26]}} per work hour for 2025-26 and 2024-25.",
    "Add the decline in value of equipment and furniture you use to work from home, worked out separately.",
    "Add the amounts together and disregard the cents (don't round them).",
  ],
  ejemplo: ["567 hours from home at 70c gives $396.90. With a $299 chair and a $250 desk, the total is $945.90 and the claim is $945."],
  faq: [
    {
      pregunta: "What records do I need?",
      respuesta: "A record of the actual hours you worked from home during the whole income year, made at the time, such as timesheets, rosters or a diary. You also need a record of the expenses the rate covers.",
    },
    {
      pregunta: "What does the fixed rate cover?",
      respuesta: "Additional running expenses such as electricity, internet and mobile phone. You can't claim those again separately when you use this method.",
    },
    {
      pregunta: "Can I claim my desk or computer as well?",
      respuesta: "Yes. The work-related decline in value of technology and office furniture, such as chairs, desks and computers, is claimed separately on top of the fixed rate.",
    },
  ],
  glosario: [
    { termino: "Fixed rate method", definicion: "An ATO method that covers home running costs with a set rate for each hour you work from home." },
    { termino: "Decline in value", definicion: "The deduction for the wear and cost of equipment over time." },
  ],
});
