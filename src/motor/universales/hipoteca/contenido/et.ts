import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { cuotaFrancesa, interesesTotales } from "../../prestamo/definicion";

export const contenidoEt: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const precio = montoEjemplo(ctx, 200000);
  const prestado = precio * 0.8;
  const cuota30 = cuotaFrancesa(prestado, 7, 360);
  const cuota15 = cuotaFrancesa(prestado, 7, 180);
  return {
    h1: "Kodulaenu kalkulaator",
    title: tituloQueEntre(
      `Kodulaenu kalkulaator: arvuta kodulaenu kuumakse | ${ctx.nombrePais}`,
      `Kodulaenu kalkulaator | ${ctx.nombrePais}`,
      "Kodulaenu kalkulaator",
    ),
    description: "Arvuta kodulaenu kuumakse hinna, sissemakse, intressi ja laenuperioodi järgi. Näed intresse kokku ja võla muutumist aasta aastalt.",
    intro: [
      "Kodulaen on enamiku leibkondade jaoks suurim võlg, mille nad kunagi võtavad. Tasub näha kogu arvutust, enne kui panka lähed.",
      "Sisesta hind, sissemakse, intress ja laenuperiood. Kui maksad haldustasu või muid eluasemekulusid, lisa needki, siis näed oma tegelikke kulusid kuus.",
    ],
    comoSeCalcula: [
      "Laenusumma = kodu hind − sissemakse.",
      "Kuumakse arvutatakse annuiteetlaenuna: aastaintress jagatakse 12 kuuga ja laenuperiood teisendatakse kuudeks.",
      "Iga aasta kohta liidetakse kokku makstud intressid ja põhiosa, nii näed, kui palju võlga on veel alles.",
    ],
    ejemplo: [
      `Kodu maksab ${m(precio)} ja sissemakse on 20%, seega on laenu vaja summas ${m(prestado)}. Kui intress on 7% ja laenuperiood 30 aastat, on kuumakse ${m(cuota30)}.`,
      `Intressi koguneb 30 aasta jooksul ${m(interesesTotales(prestado, 7, 360))}. Kui laenuperiood on 15 aastat, on kuumakse suurem, ${m(cuota15)}, kuid intressi maksad ainult ${m(interesesTotales(prestado, 7, 180))}.`,
    ],
    faq: [
      {
        pregunta: "Kui suurt sissemakset on vaja?",
        respuesta:
          "See oleneb pangast ja reeglitest seal, kus ostad. Mida suurem on sissemakse, seda vähem laenad, seda väiksem on kuumakse ja seda vähem maksad intressi. Kogu raha ka ostukulude jaoks.",
      },
      {
        pregunta: "Miks võlg esimestel aastatel nii vähe väheneb?",
        respuesta:
          "Intressi arvestatakse summalt, mille oled võlgu. Alguses on võlg suur, seega on suurem osa igast maksest intress. Aja jooksul põhiosa osakaal kasvab.",
      },
      {
        pregunta: "Kas lühem laenuperiood on parem?",
        respuesta:
          "Jah, kui suudad suuremat kuumakset maksta. Intressi maksad siis tunduvalt vähem. Muul juhul sobib hästi pikem laenuperiood ja lisamaksed siis, kui sul selleks raha on.",
      },
      {
        pregunta: "Kas pank arvutab samamoodi?",
        respuesta:
          "Mitte alati. Pangad pakuvad ka võrdse põhiosaga graafikut, kus maksad iga kuu sama põhiosa ja intressi osa aja jooksul väheneb. See kalkulaator kasutab annuiteeti ja sama intressi kogu laenuperioodi jooksul. Muutuva intressi korral võib kuumakse muutuda.",
      },
    ],
    glosario: [
      { termino: "Sissemakse", definicion: "Hinna osa, mille maksad oma rahaga." },
      { termino: "Põhiosa", definicion: "Makse osa, mis vähendab võlga." },
      { termino: "Annuiteet", definicion: "Laen, mille iga kuumakse on sama suur ning sisaldab nii intressi kui ka põhiosa." },
    ],
  };
};
