import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "gb.stamp-duty-calculator",
  h1: "Stamp Duty calculator for England and Northern Ireland",
  title: "Stamp Duty calculator 2026: SDLT for home buyers",
  description:
    "Work out Stamp Duty Land Tax on a home in England or Northern Ireland, with first-time buyer relief up to {{gb.sdlt-first-time-buyer-cap}} and the {{gb.sdlt-additional-surcharge}} second home surcharge.",
  intro: [
    "Stamp Duty Land Tax (SDLT) is paid when you buy a home in England or Northern Ireland above a certain price. It is charged in slices, like Income Tax, so each rate only applies to the part of the price inside its band.",
    "Choose whether you are moving home, buying your first home or buying an extra property, and see the tax and how it is worked out.",
  ],
  comoSeCalcula: [
    "Standard rates: nothing on the first £125,000, 2% up to £250,000, 5% up to £925,000, 10% up to £1.5 million and 12% above.",
    "First-time buyers pay nothing up to £300,000 and 5% on the rest, as long as the price is {{gb.sdlt-first-time-buyer-cap}} or less. Above that, the standard rates apply in full.",
    "If you will own more than one home, you usually pay an extra {{gb.sdlt-additional-surcharge}} of the whole price on top.",
    "Buyers who are not UK resident usually pay an extra {{gb.sdlt-non-resident-surcharge}} of the price.",
  ],
  ejemplo: [
    "A £295,000 home bought by a home mover pays £4,750: £2,500 on the slice from £125,000 to £250,000 and £2,250 on the last £45,000.",
    "A first-time buyer paying £500,000 pays £10,000, which is 5% of the £200,000 above £300,000.",
  ],
  faq: [
    {
      pregunta: "Do I pay Stamp Duty in Scotland or Wales?",
      respuesta:
        "No. Scotland has Land and Buildings Transaction Tax and Wales has Land Transaction Tax, each with its own rates. This calculator is for England and Northern Ireland.",
    },
    {
      pregunta: "Do I pay the second home surcharge if I have not sold my old home yet?",
      respuesta:
        "Usually yes, because on completion day you own two homes. You do not pay the surcharge if the new home replaces your main residence and the old one is sold within 36 months of completing.",
    },
    {
      pregunta: "Who counts as a first-time buyer?",
      respuesta: "Everyone buying with you has to be a first-time buyer. If any of you has owned a home before, the relief does not apply.",
    },
    {
      pregunta: "When do I have to pay Stamp Duty?",
      respuesta: "The return and the payment are due within 14 days of completion. Your solicitor or conveyancer usually sends it for you on completion day.",
    },
  ],
  glosario: [
    { termino: "SDLT", definicion: "Stamp Duty Land Tax, the tax on buying property or land in England and Northern Ireland." },
    { termino: "Completion", definicion: "The day the purchase becomes legal and you get the keys. Stamp Duty is due from that date." },
  ],
});
