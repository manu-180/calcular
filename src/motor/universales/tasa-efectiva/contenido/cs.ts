import { GRAMATICA } from "../../../i18n/gramatica";
import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { aEfectiva, aNominal } from "../definicion";

export const contenidoCs: ContenidoUniversal = (ctx) => {
  const p = (n: number) => `${formatearNumero(ctx, n, 2)} %`;
  return {
    h1: "Převod nominální úrokové sazby na efektivní",
    title: tituloQueEntre(
      `Efektivní úroková sazba: kalkulačka ${GRAMATICA.cs.para(ctx.nombrePais)}`,
      "Efektivní úroková sazba: převod z nominální",
      "Efektivní úroková sazba",
    ),
    description: "Převeďte nominální roční sazbu (p. a.) na efektivní roční sazbu a zpět, s měsíčním, čtvrtletním, pololetním nebo denním připisováním úroků.",
    intro: [
      "Dvě nabídky se stejnou sazbou mohou vyjít různě draho. Rozdíl je v tom, jak často se úroky účtují nebo připisují.",
      "Efektivní roční sazba staví všechny nabídky na stejnou úroveň: ukazuje, kolik za rok skutečně zaplatíte nebo vyděláte. Vyberte sazbu, kterou máte, a ukážeme vám tu druhou.",
    ],
    comoSeCalcula: [
      "Efektivní sazba = (1 + nominální sazba ÷ m) na m-tou, minus 1. Číslo m je počet připsání úroků za rok: 12 při měsíčním, 4 při čtvrtletním.",
      "Nominální sazba = m × ((1 + efektivní sazba) na (1 ÷ m), minus 1).",
      "Sazba za období je nominální sazba vydělená m.",
    ],
    ejemplo: [
      `Nominální sazba 12 % p. a. s měsíčním připisováním odpovídá efektivní sazbě ${p(aEfectiva(12, 12))}.`,
      `Efektivní sazba 10 % odpovídá nominální sazbě ${p(aNominal(10, 12))}, když se úroky připisují každý měsíc.`,
    ],
    faq: [
      {
        pregunta: "Jaký je rozdíl mezi nominální a efektivní úrokovou sazbou?",
        respuesta:
          "Nominální sazba je roční sazba bez vlivu připisování úroků. Efektivní zahrnuje i to, že se úročí už připsané úroky. Proto je efektivní sazba vždy stejná nebo vyšší než nominální.",
      },
      {
        pregunta: "Kterou sazbu použít při srovnání nabídek?",
        respuesta:
          "U spoření efektivní sazbu, protože ukazuje, kolik skutečně vyděláte. U úvěrů porovnávejte RPSN, která kromě úroků zahrnuje i poplatky.",
      },
      {
        pregunta: "Proč častější připisování zvyšuje efektivní sazbu?",
        respuesta:
          "Úroky se připíšou k zůstatku dřív a začnou samy vydělávat úroky. Při ročním připisování jsou nominální a efektivní sazba stejné.",
      },
    ],
    glosario: [
      { termino: "Nominální sazba (p. a.)", definicion: "Roční sazba bez vlivu připisování úroků." },
      { termino: "Efektivní sazba", definicion: "Roční sazba včetně složeného úročení." },
      { termino: "Připisování úroků", definicion: "Okamžik, kdy se úroky přičtou k zůstatku." },
      { termino: "RPSN", definicion: "Roční procentní sazba nákladů: úroky i všechny poplatky úvěru v jednom čísle." },
    ],
  };
};
