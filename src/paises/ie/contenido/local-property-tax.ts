import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ie.local-property-tax",
  h1: "Local Property Tax calculator 2026",
  title: "LPT calculator 2026: Local Property Tax by band",
  description: "Work out your Local Property Tax for 2026 from your home's value on 1 November 2025, with the new bands and your council's Local Adjustment Factor.",
  intro: [
    "Local Property Tax (LPT) is a yearly tax on residential property. From 2026 it is based on the value of your home on 1 November 2025, for the valuation period from 2026 to 2030.",
    "Enter your home's value and your local authority to see your 2026 charge.",
  ],
  comoSeCalcula: [
    "Find your valuation band. There are 19 bands for homes worth up to {{ie.lpt-band-limit}}, each with a fixed basic charge, from €95 for homes up to €240,000.",
    "Homes worth more than {{ie.lpt-band-limit}} pay 0.0906% on the first €1.26 million, 0.25% on the part between €1.26 million and €2.1 million, and 0.3% on the rest.",
    "Your local authority can raise or lower the basic charge by up to 15%. That Local Adjustment Factor gives your final charge.",
  ],
  ejemplo: ["A home worth €300,000 is in band 2, with a basic charge of €235. In Dublin City (0%) you pay €235; in Carlow (+15%) you pay €270.25."],
  faq: [
    {
      pregunta: "Which date do I use to value my home?",
      respuesta: "The value on 1 November 2025. It is used for the whole valuation period from 2026 to 2030.",
    },
    {
      pregunta: "Why does my council change the amount?",
      respuesta: "Each local authority can increase or decrease the basic LPT rate by up to 15%. For example, Dún Laoghaire Rathdown is 15% lower and many county councils are 15% higher in 2026.",
    },
    {
      pregunta: "What if my home is worth more than €2.1 million?",
      respuesta: "You declare its market value on your LPT Return and the charge is worked out from that value instead of a band.",
    },
  ],
  glosario: [
    { termino: "Valuation band", definicion: "A range of property values with one fixed basic LPT charge." },
    { termino: "Local Adjustment Factor", definicion: "The percentage by which a local authority raises or lowers the basic LPT rate in its area." },
  ],
});
