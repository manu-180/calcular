import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ae.dewa-bill-calculator",
  h1: "DEWA bill calculator",
  title: "DEWA bill calculator: electricity and water slabs",
  description:
    "Estimate your DEWA bill in Dubai from the electricity and water you use, with the slab tariff, the fuel surcharge, meter charges and {{ae.vat}} VAT.",
  intro: [
    "Dubai Electricity and Water Authority charges by slabs: the price per unit rises as monthly consumption grows.",
    "Enter the kWh and cubic metres you used to estimate the monthly bill.",
  ],
  comoSeCalcula: [
    "Electricity for homes and businesses has four slabs: the first covers up to {{ae.dewa-electricity-residential[0].hasta}} kWh a month and the top one starts above {{ae.dewa-electricity-residential[-1].desde}} kWh.",
    "Water for homes has three slabs: the first covers up to {{ae.dewa-water-residential[0].hasta}} cubic metres and the top one starts above {{ae.dewa-water-residential[-1].desde}}.",
    "The fuel surcharge is added for each kWh and cubic metre, plus a monthly meter service charge.",
    "VAT of {{ae.vat}} is added on top.",
  ],
  ejemplo: ["A home using 2,500 kWh and 30 cubic metres in a month pays about AED 1,078.67, VAT included."],
  faq: [
    {
      pregunta: "What is the DEWA fuel surcharge?",
      respuesta: "An extra charge per kWh and per cubic metre that changes with the price of the fuel used in DEWA's plants. This calculator uses the one for {{ae.dewa-fuel-surcharge#desde}}.",
    },
    {
      pregunta: "Is VAT charged on DEWA bills?",
      respuesta: "Yes, {{ae.vat}} VAT applies to the tariffs.",
    },
    {
      pregunta: "Do businesses pay a different rate?",
      respuesta: "Commercial accounts use the same electricity slabs as homes, with wider water slabs. Industrial accounts have two electricity slabs.",
    },
  ],
  glosario: [
    { termino: "Slab", definicion: "A band of monthly consumption with its own price per unit." },
    { termino: "Fils", definicion: "One hundredth of a dirham." },
  ],
});
