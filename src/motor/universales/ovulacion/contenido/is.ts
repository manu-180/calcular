import { aDia, aFecha, fechaLarga } from "../../comun/fechas";
import { tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { FASE_LUTEA, ventana } from "../definicion";

export const contenidoIs: ContenidoUniversal = (ctx) => {
  const f = (iso: string) => fechaLarga(ctx.locale, iso);
  const fum = "2026-03-05";
  const v = ventana(aDia(fum), 28);
  return {
    h1: "Egglosreiknivél",
    title: tituloQueEntre(
      `Egglosreiknivél: frjósömu dagarnir þínir | ${ctx.nombrePais}`,
      `Egglosreiknivél | ${ctx.nombrePais}`,
      "Egglosreiknivél",
    ),
    description: "Reiknaðu hvenær egglos verður, hvaða dagar eru frjósamir og hvenær næstu blæðingar eru væntanlegar, fyrir næstu þrjá tíðahringi.",
    intro: [
      "Sláðu inn fyrsta dag síðustu blæðinga og lengd tíðahringsins. Þú sérð áætlað egglos, frjósömu dagana og næstu blæðingar.",
      "Þetta er áætlun fyrir reglulega tíðahringi. Hún er ekki getnaðarvörn og kemur ekki í stað mats ljósmóður, læknis eða annars heilbrigðisstarfsfólks.",
    ],
    comoSeCalcula: [
      `Egglos verður oftast ${FASE_LUTEA} dögum fyrir næstu blæðingar: fyrsti dagur síðustu blæðinga + lengd tíðahrings − ${FASE_LUTEA}.`,
      "Frjósömu dagarnir eru taldir frá 5 dögum fyrir egglos til dagsins eftir, því sáðfrumur geta lifað í allt að 5 daga.",
      "Næstu blæðingar eru væntanlegar einum tíðahring eftir þær síðustu.",
    ],
    ejemplo: [
      `Ef síðustu blæðingar hófust ${f(fum)} og tíðahringurinn er 28 dagar er áætlað egglos ${f(aFecha(v.ovulacion))}.`,
      `Frjósömu dagarnir eru frá ${f(aFecha(v.desde))} til ${f(aFecha(v.hasta))} og næstu blæðingar eru væntanlegar ${f(aFecha(v.proxima))}.`,
    ],
    faq: [
      {
        pregunta: "Hvaða daga er frjósemin mest?",
        respuesta: "Tvo til þrjá daga fyrir egglos og sjálfan egglosdaginn. Allt frjósemistímabilið er um 6 dagar.",
      },
      {
        pregunta: "Virkar þetta ef tíðahringurinn er óreglulegur?",
        respuesta: "Þú færð vísbendingu, en hún er ónákvæmari. Með óreglulegum tíðahring getur egglos færst um nokkra daga milli mánaða.",
      },
      {
        pregunta: "Get ég notað þetta til að forðast þungun?",
        respuesta: "Nei. Áætlunin er aðeins gróf og egglos getur orðið fyrr eða síðar. Til að verjast þungun þarftu getnaðarvörn, og læknir eða ljósmóðir getur aðstoðað þig við valið.",
      },
    ],
    glosario: [
      { termino: "Egglos", definicion: "Þegar eggjastokkur losar egg." },
      { termino: "Frjósamir dagar", definicion: "Dagarnir í tíðahringnum þegar hægt er að verða þunguð." },
    ],
  };
};
