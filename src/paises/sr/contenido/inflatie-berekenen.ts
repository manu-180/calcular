import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "sr.inflatie-berekenen",
  h1: "Inflatie berekenen in Suriname",
  title: "Inflatie berekenen Suriname met de CPI van het ABS",
  description:
    "Hoeveel is een bedrag van vroeger nu waard? Reken het om met de consumentenprijsindex van het ABS. Laatste cijfer: {{sr.cpi#desde}}.",
  intro: [
    "Prijzen in Suriname zijn de afgelopen jaren hard gestegen. Met deze berekening zie je wat een bedrag uit een eerdere maand vandaag waard is.",
    "We gebruiken de consumentenprijsindex (CPI) van het Algemeen Bureau voor de Statistiek. De reeks begint in april 2016.",
  ],
  comoSeCalcula: [
    "Nieuw bedrag = oud bedrag × CPI van de eindmaand ÷ CPI van de beginmaand.",
    "De inflatie over 12 maanden vergelijkt de eindmaand met dezelfde maand een jaar eerder.",
    "Is de eindmaand nog niet gepubliceerd, dan rekenen we tot de laatste maand die er is ({{sr.cpi#desde}}).",
  ],
  ejemplo: ["SRD 1.000 in september 2025 is in september 2026 SRD 1.072,91 waard. De prijzen stegen in dat jaar met 7,3%."],
  faq: [
    {
      pregunta: "Waar komt de CPI vandaan?",
      respuesta: "Het ABS meet elke maand de prijzen van een vast pakket goederen en diensten op ongeveer 630 meetpunten in Paramaribo, Wanica, Nickerie, Saramacca, Coronie, Commewijne en Para. De basisperiode is april tot en met juni 2016.",
    },
    {
      pregunta: "Waarom kan ik mei of juni 2018 niet kiezen?",
      respuesta: "Voor die twee maanden heeft het ABS geen CPI gepubliceerd. Kies de maand ervoor of erna.",
    },
    {
      pregunta: "Is het laatste cijfer definitief?",
      respuesta: "Het ABS publiceert de nieuwste maand als voorlopig cijfer. Het kan later nog iets worden bijgesteld.",
    },
  ],
  glosario: [
    { termino: "CPI", definicion: "Consumentenprijsindex: een maat voor de gemiddelde prijsverandering van wat huishoudens kopen." },
    { termino: "ABS", definicion: "Algemeen Bureau voor de Statistiek in Suriname." },
  ],
});
