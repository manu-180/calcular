import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoHu: ContenidoUniversal = (ctx) => {
  const a = montoEjemplo(ctx, 90);
  const b = montoEjemplo(ctx, 30);
  const cuota = (a + b) / 3;
  const m = (n: number) => formatearMonto(ctx, n);
  return {
    h1: "Közös költségek megosztása",
    title: tituloQueEntre(
      `Költségek megosztása: ki kinek mennyit fizet (${ctx.nombrePais})`,
      "Költségek megosztása: ki kinek mennyit fizet",
      "Költségek megosztása",
    ),
    description:
      "Oszd meg a közös költségeket legfeljebb nyolc ember között: látod a fejenkénti részt, és hogy ki kinek mennyit utaljon, a lehető legkevesebb utalással.",
    intro: [
      "Jól jön kirándulásnál, közös vacsoránál, bulinál vagy közös albérletnél, amikor mindenki más összeget fizetett.",
      "Írd be, ki mennyit fizetett. Látod mindenki részét és azokat az utalásokat, amelyek után mindenki kvitt.",
    ],
    comoSeCalcula: [
      "Fejenkénti rész = teljes költség ÷ létszám.",
      "Aki a részénél kevesebbet fizetett, a különbséggel tartozik. Aki többet fizetett, a különbséget visszakapja.",
      "Az utalások a legnagyobb tartozástól a legnagyobb túlfizetés felé mennek, így egy utalás sem fölösleges.",
    ],
    ejemplo: [
      `Anna ennyit fizetett: ${m(a)}, Péter ennyit: ${m(b)}, Eszter pedig semmit. Összesen ${m(a + b)}, így a fejenkénti rész: ${m(cuota)}.`,
      `Eszter ennyit utal Annának: ${m(cuota)}, Péter pedig ennyit: ${m(cuota - b)}.`,
    ],
    faq: [
      {
        pregunta: "Hogyan osszuk el a számlát, ha mindenki más összeget fizetett?",
        respuesta: "Add össze az összes kiadást, oszd el a létszámmal, és vesd össze azzal, amit ki-ki fizetett. A különbségből látszik, ki mennyivel tartozik, és ki mennyit kap vissza.",
      },
      {
        pregunta: "Mi van, ha valaki nem fizetett semmit?",
        respuesta: "Írj nála nullát, így ő is beszáll a költségbe. Ha üresen hagyod a mezőt, a kalkulátor nem számol vele.",
      },
      {
        pregunta: "Miért kevesebb az utalás, mint az ember?",
        respuesta: "A tartozások összevonódnak: aki a legtöbbel tartozik, annak fizet, aki a legtöbbet fizette ki, és így tovább. Soha nem kell több utalás, mint a létszám mínusz egy.",
      },
    ],
    glosario: [
      { termino: "Fejenkénti rész", definicion: "Mennyit kell fizetnie mindenkinek a teljes költségből." },
      { termino: "Egyenleg", definicion: "A különbség aközött, amit valaki kifizetett, és a saját része között." },
    ],
  };
};
