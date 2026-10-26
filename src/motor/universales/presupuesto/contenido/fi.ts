import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoFi: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const ingreso = montoEjemplo(ctx, 2000);
  return {
    h1: "Budjettilaskuri 50/30/20-säännöllä",
    title: tituloQueEntre(
      `Budjetti 50/30/20: jaa nettotulosi | ${ctx.nombrePais}`,
      `Budjetti 50/30/20 | ${ctx.nombrePais}`,
      "Budjetti 50/30/20",
    ),
    description: "Jaa nettotulosi 50/30/20-säännöllä. Näet, paljonko menee välttämättömiin menoihin, muihin menoihin ja säästöön, ja voit muuttaa osuuksia tarvittaessa.",
    intro: [
      "50/30/20-sääntö on helppo tapa suunnitella kuukauden raha-asiat. Puolet menee välttämättömään, 30 % asioihin, joista pidät, ja 20 % säästöön.",
      "Syötä nettotulosi, niin näet, paljonko kuhunkin osaan menee. Jos tilanteesi on erilainen, esimerkiksi vuokra on korkea, muuta prosentteja.",
    ],
    comoSeCalcula: [
      "Välttämättömät menot = tulot × 50 %.",
      "Muut menot ja vapaa-aika = tulot × 30 %.",
      "Säästäminen = tulot × 20 %. Kolmen osuuden summan pitää olla 100 %.",
    ],
    ejemplo: [
      `Kun nettotulosi ovat ${m(ingreso)} kuukaudessa, välttämättömiin menoihin menee ${m(ingreso * 0.5)}, muihin menoihin ${m(ingreso * 0.3)} ja säästöön ${m(ingreso * 0.2)}.`,
      `Vuodessa 20 prosentin osuudesta kertyy säästöjä ${m(ingreso * 0.2 * 12)}.`,
    ],
    faq: [
      {
        pregunta: "Mikä lasketaan välttämättömäksi ja mikä muiksi menoiksi?",
        respuesta:
          "Välttämättömät menot ovat laskuja, jotka sinun on pakko maksaa, kuten asuminen, ruoka, sähkö, liikkuminen, terveys ja lainojen vähimmäismaksut. Muut menot ovat asioita, joista voit tarvittaessa karsia.",
      },
      {
        pregunta: "Mitä teen, jos välttämättömät menot ovat yli 50 %?",
        respuesta: "Se on tavallista, varsinkin kun vuokra on korkea. Kokeile jakoa 60/20/20 tai 70/20/10, mutta älä laske säästämistä nollaan.",
      },
      {
        pregunta: "Lasketaanko velan lyhentäminen säästämiseksi?",
        respuesta: "Vähimmäismaksut kuuluvat välttämättömiin menoihin. Kaikki, mitä maksat ylimääräistä päästäksesi veloista nopeammin eroon, lasketaan säästämiseksi, koska se parantaa talouttasi samalla tavalla.",
      },
    ],
    glosario: [
      { termino: "Nettotulot", definicion: "Se, mitä saat käteen verojen ja muiden vähennysten jälkeen. Palkasta puhuttaessa nettopalkka." },
      { termino: "50/30/20-sääntö", definicion: "Tapa jakaa tulot välttämättömien menojen, muiden menojen ja säästämisen kesken." },
    ],
  };
};
