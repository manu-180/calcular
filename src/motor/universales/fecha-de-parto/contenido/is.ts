import { aDia, aFecha, fechaLarga } from "../../comun/fechas";
import { tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { DURACION } from "../definicion";

export const contenidoIs: ContenidoUniversal = (ctx) => {
  const f = (iso: string) => fechaLarga(ctx.locale, iso);
  const fum = "2026-01-10";
  const fpp = aFecha(aDia(fum) + DURACION);
  const fpp32 = aFecha(aDia(fum) + DURACION + 4);
  return {
    h1: "Settur dagur: reiknaðu áætlaðan fæðingardag",
    title: tituloQueEntre(
      `Settur dagur: reiknaðu áætlaðan fæðingardag | ${ctx.nombrePais}`,
      `Settur dagur | ${ctx.nombrePais}`,
      "Settur dagur",
    ),
    description: "Reiknaðu settan dag út frá síðustu blæðingum eða getnaði og sjáðu hversu langt þú ert gengin í dag.",
    intro: [
      "Sláðu inn fyrsta dag síðustu blæðinga (eða dagsetningu getnaðar, ef þú veist hana). Þú sérð settan dag, hversu langt þú ert gengin og í hvaða þriðjungi meðgöngunnar þú ert.",
      "Þetta er áætlun. Hún kemur ekki í stað mats ljósmóður, læknis eða annars heilbrigðisstarfsfólks og ómskoðun gefur öruggustu dagsetninguna.",
    ],
    comoSeCalcula: [
      "Útreikningurinn fylgir reglu Naegele: settur dagur er fyrsti dagur síðustu blæðinga plús 280 dagar (40 vikur).",
      "Ef tíðahringurinn er lengri eða styttri en 28 dagar færist dagsetningin um jafn marga daga.",
      "Frá getnaði eru taldir 266 dagar (38 vikur).",
      "Meðgönguvikur eru taldar frá síðustu blæðingum, ekki frá getnaði.",
    ],
    ejemplo: [
      `Ef síðustu blæðingar hófust ${f(fum)} og tíðahringurinn er 28 dagar er settur dagur ${f(fpp)}.`,
      `Með 32 daga tíðahring færist settur dagur um 4 daga, til ${f(fpp32)}.`,
    ],
    faq: [
      {
        pregunta: "Hvernig er settur dagur reiknaður?",
        respuesta: "Við fyrsta dag síðustu blæðinga eru lagðir 280 dagar. Fljótleg þumalputtaregla gefur nánast sömu dagsetningu: bættu við 7 dögum, dragðu frá 3 mánuði og bættu við einu ári.",
      },
      {
        pregunta: "Af hverju eru vikurnar taldar frá síðustu blæðingum?",
        respuesta: "Af því að flestar vita þá dagsetningu. Þess vegna hefur getnaður yfirleitt ekki enn átt sér stað í 2. viku.",
      },
      {
        pregunta: "Hversu mörg börn fæðast á settum degi?",
        respuesta: "Fá. Flest fæðast á milli 37. og 42. viku, svo dagsetningin er viðmið frekar en nákvæmur dagur.",
      },
    ],
    glosario: [
      { termino: "Settur dagur", definicion: "Áætlaður fæðingardagur, dagurinn þegar meðgangan nær 40 vikum." },
      { termino: "Síðustu blæðingar", definicion: "Fyrsti blæðingadagur síðustu tíða." },
      { termino: "Regla Naegele", definicion: "Aðferð til að áætla settan dag með því að leggja 280 daga við fyrsta dag síðustu blæðinga." },
    ],
  };
};
