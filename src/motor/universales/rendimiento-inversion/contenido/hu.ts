import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { cagr, roi } from "../definicion";

export const contenidoHu: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const p = (n: number) => `${formatearNumero(ctx, n, 2)}%`;
  const inicial = montoEjemplo(ctx, 10000);
  const final = montoEjemplo(ctx, 15000);
  return {
    h1: "Hozam kalkulátor: befektetés megtérülése (ROI és CAGR)",
    title: tituloQueEntre(`Hozam kalkulátor (ROI és CAGR): ${ctx.nombrePais}`, "Hozam kalkulátor: ROI és éves hozam", "Hozam kalkulátor"),
    description: "Számold ki a befektetés teljes megtérülését (ROI) és éves hozamát (CAGR) a befektetett összeg, a mai érték és az eltelt évek alapján.",
    intro: [
      "Az 50% nyereség jól hangzik, de két év alatt egészen mást jelent, mint tíz év alatt. A befektetések összehasonlításához az éves hozamra van szükség.",
      "Add meg, mennyit fektettél be, mennyit ér ma a befektetés, és hány év telt el. Megmutatjuk a teljes megtérülést és a kamatos kamattal számolt átlagos éves hozamot.",
    ],
    comoSeCalcula: [
      "ROI = (végső érték + kifizetett hozam − befektetett összeg) ÷ befektetett összeg × 100.",
      "CAGR = ((végső érték + kifizetett hozam) ÷ befektetett összeg) az (1 ÷ évek száma) hatványon, mínusz 1.",
      "A CAGR az összetett éves növekedési ráta: az a ráta, amely évről évre ismételve ugyanazt az eredményt adja.",
    ],
    ejemplo: [
      `Befektetett összeg: ${m(inicial)}, végső érték: ${m(final)}. A nyereség ${m(final - inicial)}, a ROI értéke ${p(roi(inicial, final))}.`,
      `Ha ez öt évig tartott, az éves hozam ${p(cagr(inicial, final, 5))}. Ha két évig, akkor ${p(cagr(inicial, final, 2))}.`,
    ],
    faq: [
      {
        pregunta: "Mi a különbség a ROI és a CAGR között?",
        respuesta: "A ROI a befektetett összegre vetített teljes nyereség, az időtől függetlenül. A CAGR ezt évekre bontja, így különböző hosszúságú befektetéseket is összehasonlíthatsz.",
      },
      {
        pregunta: "Miért nem egyszerűen a teljes hozam osztva az évek számával?",
        respuesta: `Mert az egyes évek nyeresége hozzáadódik az egyenleghez, és tovább hoz. Az öt év alatti 50% nyereség kamatos kamattal ennyi éves hozamnak felel meg: ${p(cagr(1, 1.5, 5))}, nem pedig 10%.`,
      },
      {
        pregunta: "Hogyan számoljam a kifizetett osztalékot vagy kamatot?",
        respuesta: "Ha kivetted, írd be a közben kifizetett hozamhoz. Ha újra befektetted, már benne van a végső értékben.",
      },
    ],
    glosario: [
      { termino: "ROI", definicion: "A befektetés megtérülése: a teljes nyereség a befektetett összeg százalékában." },
      { termino: "CAGR", definicion: "Összetett éves növekedési ráta: kamatos kamattal számolt átlagos éves hozam." },
    ],
  };
};
