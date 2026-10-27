import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "tt.stamp-duty-calculator",
  h1: "Stamp duty calculator Trinidad and Tobago",
  title: "Stamp duty calculator Trinidad: house and land 2026",
  description: "Work out the stamp duty on buying a house or residential land, with the {{tt.stamp-duty-first-home-exemption}} exemption for first-time homeowners.",
  intro: [
    "When you buy property, the deed of conveyance has to be stamped by the Inland Revenue Division and the duty paid. Your attorney usually handles it, but the cost is yours.",
    "Enter the price to see the duty under the residential rates, with or without the first-time homeowner exemption.",
  ],
  comoSeCalcula: [
    "House, or house and land: the first {{tt.stamp-duty-residential[1].desde}} is exempt. The next part up to {{tt.stamp-duty-residential[2].desde}} pays {{tt.stamp-duty-residential[1].tasa}}, the part up to {{tt.stamp-duty-residential[3].desde}} pays {{tt.stamp-duty-residential[2].tasa}}, and the rest {{tt.stamp-duty-residential[3].tasa}}.",
    "First-time homeowners: the exemption rises to {{tt.stamp-duty-first-home-exemption}}. Value above that pays the rate of the band it falls in.",
    "Residential land only: the first {{tt.stamp-duty-land[1].desde}} is exempt, then {{tt.stamp-duty-land[1].tasa}} up to {{tt.stamp-duty-land[2].desde}}, {{tt.stamp-duty-land[2].tasa}} up to {{tt.stamp-duty-land[3].desde}} and {{tt.stamp-duty-land[3].tasa}} on the rest.",
  ],
  ejemplo: ["A house bought for TT$1,500,000 pays TT$24,500 of stamp duty. If every buyer is a first-time homeowner, it pays nothing."],
  faq: [
    {
      pregunta: "Who counts as a first-time homeowner?",
      respuesta: "Every buyer on the deed has to be buying a home for the first time. If one of them is not, the exemption drops back to {{tt.stamp-duty-residential[1].desde}}.",
    },
    {
      pregunta: "Do I have to live in the house to get the exemption?",
      respuesta: "No, the property does not have to be owner-occupied. But if it stops being used mainly as a home within two years, part or all of the exempted duty becomes payable.",
    },
    {
      pregunta: "Does the exemption cover the mortgage deed?",
      respuesta: "Yes. For first-time homeowners the deed of mortgage is exempt up to the same {{tt.stamp-duty-first-home-exemption}}. This calculator shows the duty on the conveyance only.",
    },
    {
      pregunta: "Can I still claim the first home deduction on my income tax?",
      respuesta: "Yes. The stamp duty exemption does not stop you claiming the first-time home allowance on your income tax return.",
    },
  ],
  glosario: [
    { termino: "Deed of conveyance", definicion: "The legal document that transfers ownership of the property to you." },
    { termino: "Stamp duty", definicion: "A tax on certain legal documents, paid when they are stamped by the Inland Revenue Division." },
  ],
});
