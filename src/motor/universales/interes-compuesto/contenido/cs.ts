import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { proyectar } from "../definicion";

export const contenidoCs: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const capital = montoEjemplo(ctx, 1000);
  const aporte = montoEjemplo(ctx, 100);
  const a10 = proyectar(capital, aporte, 7, 10, "mensual")[9].saldo;
  const a20 = proyectar(capital, aporte, 7, 20, "mensual")[19].saldo;
  return {
    h1: "Kalkulačka složeného úročení",
    title: tituloQueEntre(`Kalkulačka složeného úročení: ${ctx.nombrePais}`, "Kalkulačka složeného úročení", "Složené úročení"),
    description: "Podívejte se, jak rostou vaše peníze se složeným úročením a pravidelnými měsíčními vklady: konečná částka, získané úroky a tabulka po letech.",
    intro: [
      "Při složeném úročení se připsané úroky přičítají k vkladu a samy dál vydělávají. Úspory proto rostou čím dál rychleji.",
      "Zadejte částku, kterou máte dnes, kolik můžete měsíčně přidávat, úrokovou sazbu a počet let. Ukážeme vám konečnou částku a kolik z ní tvoří úroky.",
    ],
    comoSeCalcula: [
      "Konečná částka = vklad × (1 + i) na n-tou + měsíční vklad × ((1 + i) na n-tou − 1) ÷ i.",
      "Zde i je měsíční sazba odpovídající zvolenému připisování úroků a n počet měsíců.",
      "Měsíční vklady se připisují na konci každého měsíce.",
    ],
    ejemplo: [
      `Pokud začnete s ${m(capital)} a každý měsíc přidáte ${m(aporte)} při úroku 7 % ročně, za 10 let budete mít ${m(a10)}.`,
      `Za dalších 10 let částka vzroste na ${m(a20)}. Druhé desetiletí vynese mnohem víc než první.`,
    ],
    faq: [
      {
        pregunta: "Jaký je rozdíl mezi jednoduchým a složeným úročením?",
        respuesta:
          "Jednoduchý úrok se počítá vždy jen z původního vkladu. Složený úrok se počítá z vkladu včetně už připsaných úroků.",
      },
      {
        pregunta: "Co je pravidlo 72?",
        respuesta: "Rychlý odhad, za kolik let se peníze zdvojnásobí: vydělte 72 roční úrokovou sazbou. Při 6 % ročně se částka zdvojnásobí přibližně za 12 let.",
      },
      {
        pregunta: "Jakou sazbu zadat?",
        respuesta:
          "Realistickou pro to, co budete s penězi dělat. Pokud chcete vidět výsledek v dnešních cenách, zadejte sazbu sníženou o očekávanou inflaci.",
      },
    ],
    glosario: [
      { termino: "Připisování úroků", definicion: "Přičtení získaných úroků k vkladu, takže se dál úročí i ony." },
      { termino: "Složené úročení", definicion: "Úročení, při kterém se úrok počítá z vkladu včetně už připsaných úroků." },
    ],
  };
};
