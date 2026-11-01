import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { proyectar } from "../definicion";

export const contenidoSk: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const capital = montoEjemplo(ctx, 1000);
  const aporte = montoEjemplo(ctx, 100);
  const a10 = proyectar(capital, aporte, 7, 10, "mensual")[9].saldo;
  const a20 = proyectar(capital, aporte, 7, 20, "mensual")[19].saldo;
  return {
    h1: "Kalkulačka zloženého úročenia",
    title: tituloQueEntre(`Kalkulačka zloženého úročenia: ${ctx.nombrePais}`, "Kalkulačka zloženého úročenia", "Zložené úročenie"),
    description: "Pozrite sa, ako rastú vaše peniaze so zloženým úročením a pravidelnými mesačnými vkladmi: konečná suma, získané úroky a tabuľka po rokoch.",
    intro: [
      "Pri zloženom úročení sa pripísané úroky pridávajú k vkladu a samy ďalej zarábajú. Úspory preto rastú čoraz rýchlejšie.",
      "Zadajte sumu, ktorú máte dnes, koľko môžete mesačne pridávať, úrokovú sadzbu a počet rokov. Ukážeme vám konečnú sumu a koľko z nej tvoria úroky.",
    ],
    comoSeCalcula: [
      "Konečná suma = vklad × (1 + i) na n-tú + mesačný vklad × ((1 + i) na n-tú − 1) ÷ i.",
      "Tu je i mesačná sadzba zodpovedajúca zvolenému pripisovaniu úrokov a n počet mesiacov.",
      "Mesačné vklady sa pripisujú na konci každého mesiaca.",
    ],
    ejemplo: [
      `Ak začnete s ${m(capital)} a každý mesiac pridáte ${m(aporte)} pri úroku 7 % ročne, za 10 rokov budete mať ${m(a10)}.`,
      `Za ďalších 10 rokov suma vzrastie na ${m(a20)}. Druhé desaťročie vynesie oveľa viac ako prvé.`,
    ],
    faq: [
      {
        pregunta: "Aký je rozdiel medzi jednoduchým a zloženým úročením?",
        respuesta:
          "Jednoduchý úrok sa počíta vždy len z pôvodného vkladu. Zložený úrok sa počíta z vkladu vrátane už pripísaných úrokov.",
      },
      {
        pregunta: "Čo je pravidlo 72?",
        respuesta: "Rýchly odhad, za koľko rokov sa peniaze zdvojnásobia: vydeľte 72 ročnou úrokovou sadzbou. Pri 6 % ročne sa suma zdvojnásobí približne za 12 rokov.",
      },
      {
        pregunta: "Akú sadzbu zadať?",
        respuesta:
          "Realistickú pre to, čo budete s peniazmi robiť. Ak chcete vidieť výsledok v dnešných cenách, zadajte sadzbu zníženú o očakávanú infláciu.",
      },
    ],
    glosario: [
      { termino: "Pripisovanie úrokov", definicion: "Pridanie získaných úrokov k vkladu, takže sa ďalej úročia aj ony." },
      { termino: "Zložené úročenie", definicion: "Úročenie, pri ktorom sa úrok počíta z vkladu vrátane už pripísaných úrokov." },
    ],
  };
};
