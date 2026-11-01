import { aDia, aFecha, fechaLarga } from "../../comun/fechas";
import { tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { DURACION } from "../definicion";

export const contenidoSq: ContenidoUniversal = (ctx) => {
  const f = (iso: string) => fechaLarga(ctx.locale, iso);
  const fum = "2026-01-10";
  const fpp = aFecha(aDia(fum) + DURACION);
  const fpp32 = aFecha(aDia(fum) + DURACION + 4);
  return {
    h1: "Kalkulator shtatzënie: data e mundshme e lindjes",
    title: tituloQueEntre(`Kalkulator shtatzënie dhe data e lindjes: ${ctx.nombrePais}`, "Kalkulator shtatzënie: data e mundshme e lindjes", "Kalkulator shtatzënie"),
    description: "Zbuloni datën e mundshme të lindjes sipas menstruacioneve të fundit ose datës së konceptimit dhe në sa javë shtatzënie jeni sot.",
    intro: [
      "Vendosni ditën e parë të menstruacioneve të fundit (ose datën e konceptimit, nëse e dini). Shikoni datën e mundshme të lindjes, moshën e shtatzënisë dhe tremujorin.",
      "Është një përllogaritje dhe nuk zëvendëson konsultën mjekësore. Kontrollet te mjeku dhe ekografia japin datën më të saktë.",
    ],
    comoSeCalcula: [
      "Përdoret rregulli i Naegele-s: data e mundshme e lindjes është dita e parë e menstruacioneve të fundit plus 280 ditë (40 javë).",
      "Nëse cikli është më i gjatë ose më i shkurtër se 28 ditë, data zhvendoset me diferencën.",
      "Nga data e konceptimit shtohen 266 ditë (38 javë).",
      "Javët e shtatzënisë numërohen nga menstruacionet e fundit, jo nga konceptimi.",
    ],
    ejemplo: [
      `Me menstruacionet e fundit më ${f(fum)} dhe një cikël prej 28 ditësh, data e mundshme e lindjes është ${f(fpp)}.`,
      `Me një cikël prej 32 ditësh, data zhvendoset me 4 ditë, më ${f(fpp32)}.`,
    ],
    faq: [
      {
        pregunta: "Si llogaritet data e mundshme e lindjes?",
        respuesta: "Ditës së parë të menstruacioneve të fundit i shtohen 280 ditë. Një rregull i shpejtë që jep pothuajse të njëjtën datë: shtoni 7 ditë, zbritni 3 muaj dhe shtoni një vit.",
      },
      {
        pregunta: "Pse javët numërohen nga menstruacionet e fundit?",
        respuesta: "Sepse është një datë që e di pothuajse kushdo. Prandaj, në javën 2 konceptimi ende nuk ka ndodhur.",
      },
      {
        pregunta: "Sa fëmijë lindin në datën e mundshme?",
        respuesta: "Pak. Shumica lindin midis javës 37 dhe javës 42, prandaj data është një orientim, jo një ditë e saktë. Për çdo vendim, flisni me mjekun që ndjek shtatzëninë tuaj.",
      },
    ],
    glosario: [
      { termino: "Data e mundshme e lindjes", definicion: "Data e përllogaritur e lindjes, nga menstruacionet e fundit ose nga konceptimi." },
      { termino: "Rregulli i Naegele-s", definicion: "Një mënyrë për të përllogaritur datën e lindjes duke i shtuar 280 ditë ditës së parë të menstruacioneve të fundit." },
    ],
  };
};
