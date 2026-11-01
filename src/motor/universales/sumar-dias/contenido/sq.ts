import { aDia, aFecha, esHabil, fechaLarga } from "../../comun/fechas";
import { tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoSq: ContenidoUniversal = (ctx) => {
  const f = (iso: string) => fechaLarga(ctx.locale, iso);
  const inicio = "2026-03-02";
  const mas90 = aFecha(aDia(inicio) + 90);
  let habil = aDia(inicio);
  for (let n = 0; n < 15; ) if (esHabil(++habil)) n++;
  return {
    h1: "Shtoni ditë në një datë",
    title: tituloQueEntre(`Shtoni ditë në një datë: ${ctx.nombrePais}`, "Kalkulator për shtimin e ditëve në një datë", "Shtoni ditë në një datë"),
    description: "Shtoni ose zbritni ditë kalendarike ose ditë pune nga një datë dhe shikoni në cilën ditë bie. E dobishme për afate dhe skadenca.",
    intro: [
      "Zgjidhni një datë, një numër ditësh dhe nëse dëshironi t'i shtoni apo t'i zbritni. Shikoni datën që del dhe ditën e javës.",
      "Me ditë pune, kalkulatori kapërcen të shtunat dhe të dielat.",
    ],
    comoSeCalcula: [
      "Me ditë kalendarike, data ecën një ditë në kalendar për çdo ditë të vendosur.",
      "Me ditë pune, numërohen vetëm ditët nga e hëna në të premte. Data e fillimit nuk numërohet.",
      "Festat zyrtare nuk zbriten, sepse ndryshojnë nga një vend në tjetrin dhe nga një rajon në tjetrin.",
    ],
    ejemplo: [`${f(inicio)} plus 90 ditë kalendarike është ${f(mas90)}.`, `${f(inicio)} plus 15 ditë pune është ${f(aFecha(habil))}.`],
    faq: [
      {
        pregunta: "A numërohet data e fillimit si dita e parë?",
        respuesta: "Jo. Nëse i shtoni një ditë një të hëne, arrini te e marta. Kështu llogariten shumica e afateve.",
      },
      {
        pregunta: "Çfarë ndodh nëse shtoj ditë pune nga një e shtunë?",
        respuesta: "Dita e parë e punës është e hëna pasardhëse. Një ditë pune e shtuar një të shtune jep të hënën.",
      },
      {
        pregunta: "A i merr parasysh vitet e brishta?",
        respuesta: "Po. Nëse intervali kalon përmes 29 shkurtit, ajo ditë numërohet në plus.",
      },
    ],
    glosario: [
      { termino: "Ditë kalendarike", definicion: "Të gjitha ditët e kalendarit, pa përjashtim." },
      { termino: "Ditë pune", definicion: "Në këtë kalkulator, ditët nga e hëna në të premte." },
    ],
  };
};
