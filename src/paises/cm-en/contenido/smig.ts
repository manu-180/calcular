import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "cm-en.smig",
  h1: "Minimum wage in Cameroon",
  title: "Minimum wage Cameroon: SMIG by sector",
  description:
    "The minimum wage is {{cm.smig[general]}} a month in most sectors and {{cm.smig[agricole]}} in agriculture. Compare your salary with the minimum.",
  intro: [
    "The guaranteed minimum wage (SMIG) is set by a Prime Minister's decree. It depends on the sector.",
    "Choose your sector to see the monthly minimum and, if you like, compare it with your pay.",
  ],
  comoSeCalcula: [
    "Other sectors: {{cm.smig[general]}} a month. Agriculture and related: {{cm.smig[agricole]}}.",
    "State employees under the Labour Code: {{cm.smig[etat]}} since {{cm.smig#desde}}.",
    "The yearly minimum is the monthly amount times 12.",
  ],
  ejemplo: ["A shop worker paid 55,000 F a month earns 5,000 F less than the minimum wage for that sector."],
  faq: [
    {
      pregunta: "Is the minimum wage the same for everyone?",
      respuesta: "No. The 2023 decree sets three amounts: one for State employees under the Labour Code, one for agriculture and one for other sectors.",
    },
    {
      pregunta: "Did the minimum wage change in 2024?",
      respuesta: "Only for State employees under the Labour Code, now {{cm.smig[etat]}}. The other amounts are still those of the 2023 decree.",
    },
    {
      pregunta: "Is income tax charged on the minimum wage?",
      respuesta: "No. It is below the IRPP withholding threshold in the General Tax Code. CNPS, Housing Loan Fund and broadcasting fee deductions still apply.",
    },
  ],
  glosario: [{ termino: "SMIG", definicion: "Guaranteed minimum wage: the lowest monthly pay allowed in a sector." }],
});
