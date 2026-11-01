import { formaIs } from "../../../i18n/plural";
import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { aDia, fechaLarga, habilesEntre } from "../../comun/fechas";

export const contenidoIs: ContenidoUniversal = (ctx) => {
  const desde = "2026-03-02";
  const hasta = "2026-06-30";
  const dias = aDia(hasta) - aDia(desde);
  const habiles = habilesEntre(aDia(desde), aDia(hasta));
  const f = (iso: string) => fechaLarga(ctx.locale, iso);
  const n = (x: number) => formatearNumero(ctx, x);
  return {
    h1: "Reiknaðu daga milli dagsetninga",
    title: tituloQueEntre(
      `Dagar milli dagsetninga: reiknaðu fjölda daga | ${ctx.nombrePais}`,
      `Dagar milli dagsetninga | ${ctx.nombrePais}`,
      "Dagar milli dagsetninga",
    ),
    description: "Reiknaðu fjölda daga milli tveggja dagsetninga. Þú sérð almanaksdaga, vikur, mánuði og virka daga frá mánudegi til föstudags.",
    intro: [
      "Veldu upphafsdag og lokadag. Þú sérð almanaksdagana, sama tímabil í vikum og mánuðum og fjölda virkra daga.",
      "Notaðu reiknivélina fyrir fresti, gjalddaga, frí, meðgöngu eða niðurtalningu.",
    ],
    comoSeCalcula: [
      "Almanaksdagar eru allir dagar milli dagsetninganna tveggja. Upphafsdagurinn telst með en ekki lokadagurinn, nema þú hakir við hann.",
      "Virkir dagar eru mánudagar til föstudagar á sama tímabili. Frídagar eru ekki dregnir frá.",
      "Hlaupár eru talin með sinn 29. febrúar.",
    ],
    ejemplo: [
      `Frá ${f(desde)} til ${f(hasta)} eru ${n(dias)} ${formaIs(dias, "almanaksdagur", "almanaksdagar")}.`,
      `Af þeim eru ${n(habiles)} ${formaIs(habiles, "virkur dagur", "virkir dagar")} (mánudagur til föstudagur).`,
    ],
    faq: [
      {
        pregunta: "Telst fyrsti eða síðasti dagurinn með?",
        respuesta: "Sjálfgefið telst sá fyrsti með en ekki sá síðasti, alveg eins og þegar ein dagsetning er dregin frá annarri. Ef þú þarft báða skaltu haka við „Telja lokadaginn með“.",
      },
      {
        pregunta: "Eru frídagar dregnir frá virkum dögum?",
        respuesta: "Nei. Virkir dagar eru taldir frá mánudegi til föstudags. Frídagar eru mismunandi eftir löndum, svæðum og árum, svo dragðu þá frá sérstaklega.",
      },
      {
        pregunta: "Hversu margir dagar eru í ári?",
        respuesta: "365, eða 366 á hlaupári. Þess vegna getur bilið milli sömu tveggja dagsetninga verið mislangt eftir árum.",
      },
    ],
    glosario: [
      { termino: "Almanaksdagar", definicion: "Allir dagar almanaksins, að helgum og frídögum meðtöldum." },
      { termino: "Virkir dagar", definicion: "Í þessari reiknivél mánudagur til föstudagur." },
    ],
  };
};
