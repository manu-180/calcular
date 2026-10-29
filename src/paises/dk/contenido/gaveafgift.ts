import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "dk.gaveafgift",
  h1: "Gaveafgift: hvor meget må du give skattefrit?",
  title: "Gaveafgift {{anio}}: beregn afgift og bundfradrag",
  description:
    "Beregn gaveafgiften. Børn og børnebørn kan få {{dk.gaveafgift-bundfradrag[afkom]}} afgiftsfrit fra hver giver. Resten koster {{dk.gaveafgift-sats[afkom]}} i afgift.",
  intro: [
    "Gaver til nære familiemedlemmer er afgiftsfri op til et bundfradrag om året. Over bundfradraget betaler modtageren gaveafgift.",
    "Vælg hvem der får gaven, og skriv gavens værdi. Har giveren allerede givet gaver i år, så skriv dem også.",
  ],
  comoSeCalcula: [
    "Børn, børnebørn, stedbørn og forældre: bundfradrag {{dk.gaveafgift-bundfradrag[afkom]}} og afgift {{dk.gaveafgift-sats[afkom]}} af resten.",
    "Svigerbørn: bundfradrag {{dk.gaveafgift-bundfradrag[svigerboern]}} og afgift {{dk.gaveafgift-sats[svigerboern]}}.",
    "Bedsteforældre og stedforældre: bundfradrag {{dk.gaveafgift-bundfradrag[bedsteforaeldre]}} og afgift {{dk.gaveafgift-sats[bedsteforaeldre]}}.",
    "Bundfradraget gælder pr. giver og pr. kalenderår.",
  ],
  ejemplo: ["Giver en forælder sit barn 100.000 kr. i 2026, er 19.400 kr. over bundfradraget. Gaveafgiften er 2.910 kr."],
  faq: [
    {
      pregunta: "Hvor meget må man give sine børn skattefrit?",
      respuesta: "Fra {{dk.gaveafgift-bundfradrag#desde}} kan hver forælder give hvert barn {{dk.gaveafgift-bundfradrag[afkom]}} om året uden gaveafgift.",
    },
    {
      pregunta: "Skal man betale gaveafgift af gaver til sin ægtefælle?",
      respuesta: "Nej. Gaveafgiften af gaver mellem ægtefæller er 0 %.",
    },
    {
      pregunta: "Hvad med gaver til venner og søskende?",
      respuesta: "De er ikke omfattet af reglerne om gaveafgift og bundfradrag. Beregneren dækker kun gaver til de nære familiemedlemmer, som loven nævner.",
    },
  ],
  glosario: [
    { termino: "Bundfradrag", definicion: "Det beløb, der kan gives afgiftsfrit pr. år." },
    { termino: "Gaveafgift", definicion: "Afgift, som modtageren betaler af den del af gaven, der ligger over bundfradraget." },
  ],
});
