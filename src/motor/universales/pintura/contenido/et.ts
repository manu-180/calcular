import { formatearCifra, formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { MARGEN } from "../definicion";

export const contenidoEt: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 1) => formatearNumero(ctx, x, d);
  const margen = formatearCifra(ctx, MARGEN * 100);
  const imperial = ctx.unidades === "imperial";
  const ejemplo = imperial
    ? (() => {
        const neta = 48 * 8 - 40;
        const gal = (neta * 2) / 350;
        return [
          `Toas, kus seinte kogupikkus on 48 ft, lae kõrgus 8 ft ning uste ja akende pindala 40 ft², on värvitavat pinda ${n(neta, 0)} ft².`,
          `Kui värvid 2 korda ja galloni värviga katab 350 ruutjalga, vajad ${n(gal, 2)} gallonit. Koos varuga on kogus ${n(gal * (1 + MARGEN), 2)} gallonit.`,
        ];
      })()
    : (() => {
        const neta = 14 * 2.6 - 4;
        const litros = (neta * 2) / 10;
        return [
          `Toas, kus seinte kogupikkus on 14 meetrit, lae kõrgus ${n(2.6)} meetrit ning uste ja akende pindala 4 m², on värvitavat pinda ${n(neta)} m².`,
          `Kui värvid 2 korda ja värvi katvus on 10 m² liitri kohta, vajad ${n(litros, 2)} liitrit. Koos varuga on kogus ${n(litros * (1 + MARGEN), 2)} liitrit.`,
        ];
      })();
  return {
    h1: "Kui palju värvi on vaja?",
    title: tituloQueEntre(
      `Värvikulu: kui palju värvi on vaja | ${ctx.nombrePais}`,
      `Värvikulu kalkulaator | ${ctx.nombrePais}`,
      "Värvikulu kalkulaator",
    ),
    description: "Arvuta, kui palju värvi seintele vajad mõõtude, uste ja akende, värvikihtide ja värvi katvuse järgi.",
    intro: [
      "Sisesta seinte pikkus ja kõrgus (või kohe pindala), uste ja akende pindala ning mitu korda kavatsed värvida.",
      `Kalkulaator lisab ${margen}% varu, et värv otsa ei saaks.`,
    ],
    comoSeCalcula: [
      "Pindala = seinte kogupikkus × kõrgus, millest on maha arvatud uksed ja aknad.",
      "Värv = pindala × värvikihid ÷ katvus.",
      `Lõpuks lisatakse ${margen}% varu.`,
    ],
    ejemplo,
    faq: [
      {
        pregunta: "Kui suure pinna katab liiter värvi?",
        respuesta: "Enamik siseseinavärve katab liitriga ühe kihina 8-12 ruutmeetrit. Täpne arv on märgitud purgile.",
      },
      {
        pregunta: "Mitu värvikihti on vaja?",
        respuesta: "Tavaliselt kaks. Äsja pahteldatud või tugevalt imavad seinad või suur toonimuutus võivad nõuda kolmandat kihti.",
      },
      {
        pregunta: "Kas uksed ja aknad tuleb maha arvata?",
        respuesta: "Jah, kui need on suured. Väikseid avasid ei tasu maha arvata, sest lisavärv kulub servadele ja nurkadele.",
      },
    ],
    glosario: [
      { termino: "Katvus", definicion: "Kui suure pinna liiter või gallon värvi ühe kihiga katab." },
      { termino: "Värvikiht", definicion: "Iga seinale kantud värvikord." },
    ],
  };
};
