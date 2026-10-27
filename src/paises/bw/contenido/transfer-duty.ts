import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "bw.transfer-duty",
  h1: "Transfer duty calculator Botswana",
  title: "Transfer duty calculator Botswana for property buyers",
  description: "Work out the transfer duty on buying land or a house in Botswana, for citizens and non-citizens, before you sign the deed of sale.",
  intro: ["Enter the price of the property and whether the buyer is a citizen to see the transfer duty due to BURS."],
  comoSeCalcula: [
    "Citizens pay {{bw.transfer-duty[citizen]}} on the part of the value above P1 000 000.",
    "Non-citizens pay {{bw.transfer-duty[non-citizen]}} on the full value.",
  ],
  ejemplo: [],
  faq: [],
  glosario: [],
});
