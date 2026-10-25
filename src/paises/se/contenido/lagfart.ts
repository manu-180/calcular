import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "se.lagfart",
  h1: "Räkna ut kostnaden för lagfart och pantbrev",
  title: "Lagfart 2026: räkna ut stämpelskatt och pantbrev",
  description:
    "Räkna ut vad lagfarten kostar när du köper hus: {{se.stampelskatt[privat]}} i stämpelskatt plus {{se.lantmateriet-avgift[lagfart]}}, och {{se.stampelskatt[pantbrev]}} för nya pantbrev.",
  intro: [
    "När du köper ett hus eller en fastighet ska du söka lagfart hos Lantmäteriet. Du betalar stämpelskatt och en expeditionsavgift.",
    "Behöver du nya pantbrev för bolånet tillkommer stämpelskatt på dem. Kalkylatorn räknar ut båda delarna.",
  ],
  comoSeCalcula: [
    "Stämpelskatten räknas på köpeskillingen eller på taxeringsvärdet året före, det som är högst, avrundat nedåt till hela tusental kronor.",
    "Privatpersoner betalar {{se.stampelskatt[privat]}} och juridiska personer {{se.stampelskatt[juridisk]}}. Expeditionsavgiften för lagfart är {{se.lantmateriet-avgift[lagfart]}}.",
    "För nya pantbrev är stämpelskatten {{se.stampelskatt[pantbrev]}} av beloppet, plus {{se.lantmateriet-avgift[pantbrev]}} per pantbrev.",
  ],
  ejemplo: ["Köper du en villa för 4 000 000 kronor kostar lagfarten 60 825 kronor. Behöver du nya pantbrev på 1 000 000 kronor tillkommer 20 375 kronor."],
  faq: [
    {
      pregunta: "Vad kostar lagfart?",
      respuesta: "{{se.stampelskatt[privat]}} av köpeskillingen eller taxeringsvärdet för en privatperson, plus en expeditionsavgift på {{se.lantmateriet-avgift[lagfart]}}.",
    },
    {
      pregunta: "Vad gäller vid gåva eller arv?",
      respuesta: "Vid arv och bodelning betalar du bara expeditionsavgiften. En gåva är i regel fri från stämpelskatt, men om du betalar 85 procent eller mer av taxeringsvärdet räknas den som ett köp.",
    },
    {
      pregunta: "Vem betalar stämpelskatten?",
      respuesta: "Köparen söker lagfart och får fakturan, men säljare och köpare har ett gemensamt betalningsansvar för stämpelskatten.",
    },
  ],
  glosario: [
    { termino: "Lagfart", definicion: "Inskrivningen hos Lantmäteriet som visar vem som äger en fastighet." },
    { termino: "Stämpelskatt", definicion: "Skatt till staten när du köper en fastighet eller tar ut pantbrev." },
    { termino: "Pantbrev", definicion: "Ett bevis på att fastigheten är intecknad, som används som säkerhet för lån." },
  ],
});
