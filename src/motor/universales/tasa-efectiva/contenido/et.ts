import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { aEfectiva, aNominal } from "../definicion";

export const contenidoEt: ContenidoUniversal = (ctx) => {
  const p = (n: number) => `${formatearNumero(ctx, n, 2)}%`;
  return {
    h1: "Teisenda nominaalintress efektiivseks aastaintressiks",
    title: tituloQueEntre(
      `Krediidi kulukuse määr: nominaalintressist efektiivseks | ${ctx.nombrePais}`,
      `Krediidi kulukuse määr | ${ctx.nombrePais}`,
      "Krediidi kulukuse määr",
    ),
    description: "Teisenda nominaalne aastaintress efektiivseks aastaintressiks ja tagasi, kui intressi arvestatakse kord kuus, kvartalis, poolaastas või päevas.",
    intro: [
      "Kaks sama intressiga pakkumist võivad maksta erinevalt. Vahe tuleb sellest, kui tihti intressi arvestatakse.",
      "Efektiivne aastaintress teeb pakkumised võrreldavaks. See näitab, kui palju sa aastas tegelikult maksad või saad. Vali, milline intress sul on, ja kalkulaator arvutab teise.",
    ],
    comoSeCalcula: [
      "Efektiivne intress = (1 + nominaalintress ÷ m) astmes m, miinus 1. Siin on m intressiperioodide arv aastas, iga kuu puhul 12 ja iga kvartali puhul 4.",
      "Nominaalintress = m × ((1 + efektiivne intress) astmes 1 ÷ m, miinus 1).",
      "Intress perioodi kohta = nominaalintress ÷ m.",
    ],
    ejemplo: [
      `Nominaalintress 12%, kui intressi arvestatakse iga kuu, vastab efektiivsele intressile ${p(aEfectiva(12, 12))}.`,
      `Efektiivne intress 10% vastab nominaalintressile ${p(aNominal(10, 12))}, kui intressi arvestatakse iga kuu.`,
    ],
    faq: [
      {
        pregunta: "Mis vahe on nominaalintressil ja efektiivsel intressil?",
        respuesta:
          "Nominaalintress on aastaintress, milles liitintressi ei ole arvesse võetud. Efektiivne intress arvestab, et intress kasvatab ka ise intressi. Seepärast on efektiivne intress alati sama suur või suurem kui nominaalintress.",
      },
      {
        pregunta: "Millise intressiga tasub laene võrrelda?",
        respuesta:
          "Krediidi kulukuse määraga. Laenupakkumiste krediidi kulukuse määras on tavaliselt arvesse võetud ka lepingutasud ja kontohaldustasud, seega võib see olla suurem kui siin arvutatud näitaja. Võrdle ka laenu kogukulu.",
      },
      {
        pregunta: "Miks efektiivne intress kasvab, kui intressi arvestatakse tihedamini?",
        respuesta:
          "Intress lisatakse varem ja see hakkab ise intressi kasvatama. Kui intressi arvestatakse ainult kord aastas, on nominaalintress ja efektiivne intress võrdsed.",
      },
    ],
    glosario: [
      { termino: "Nominaalintress", definicion: "Aastaintress ilma liitintressi mõjuta." },
      { termino: "Efektiivne intress", definicion: "Aastaintress, milles on liitintress arvesse võetud." },
      { termino: "Krediidi kulukuse määr", definicion: "Laenu aastane intressimäär, millesse on arvestatud ka laenu kulud." },
      { termino: "Intressiperiood", definicion: "Kui tihti lisatakse intress võlale või saldole." },
    ],
  };
};
