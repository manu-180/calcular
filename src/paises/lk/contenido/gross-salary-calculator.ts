import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "lk.gross-salary-calculator",
  h1: "Net to gross salary calculator Sri Lanka",
  title: "Net to gross salary Sri Lanka: find the gross to ask for",
  description:
    "Enter the take-home pay you want and find the gross monthly salary that gives it after APIT and EPF at {{lk.epf-employee}}.",
  intro: [
    "Useful before a salary negotiation: you know what you need in your account each month, and you want to know the gross figure to ask for.",
    "The calculator works backwards from your take-home pay through EPF and APIT Table No. 01.",
  ],
  comoSeCalcula: [
    "From the gross salary come off EPF at {{lk.epf-employee}} and APIT from Tax Table No. 01, with no tax on the first {{lk.apit-table-1[1].desde}}.",
    "The calculator finds the gross salary that leaves exactly the take-home pay you entered.",
  ],
  ejemplo: ["To take home Rs. 222,000 a month you need a gross salary of Rs. 250,000: Rs. 20,000 goes to EPF and Rs. 8,000 to APIT."],
  faq: [
    {
      pregunta: "Why does the gross go up faster than the take-home?",
      respuesta: "Each extra rupee above the tax free amount pays EPF and APIT at your top rate, which goes up to {{lk.apit-table-1[-1].tasa}}.",
    },
    {
      pregunta: "Does it include my employer's EPF and ETF?",
      respuesta: "No. Those are paid on top of the gross salary by the employer. The employer cost calculator shows them.",
    },
    {
      pregunta: "What if I get allowances or benefits?",
      respuesta: "They count as part of the gross for APIT. Include them in the figure you negotiate.",
    },
  ],
  glosario: [
    { termino: "Gross salary", definicion: "Pay before EPF and APIT are deducted." },
    { termino: "Take-home pay", definicion: "What is paid into your account after the deductions." },
  ],
});
