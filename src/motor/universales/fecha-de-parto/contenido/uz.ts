import { aDia, aFecha, fechaLarga } from "../../comun/fechas";
import { tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { DURACION } from "../definicion";

export const contenidoUz: ContenidoUniversal = (ctx) => {
  const f = (iso: string) => fechaLarga(ctx.locale, iso);
  const fum = "2026-01-10";
  const fpp = aFecha(aDia(fum) + DURACION);
  const fpp32 = aFecha(aDia(fum) + DURACION + 4);
  return {
    h1: "Tugʻruq sanasini hisoblash",
    title: tituloQueEntre(`Tugʻruq sanasi kalkulyatori: ${ctx.nombrePais}`, "Tugʻruq sanasi kalkulyatori", "Homiladorlik kalkulyatori"),
    description: "Oxirgi hayz yoki urugʻlanish sanasi boʻyicha taxminiy tugʻruq sanasini va bugun homiladorlikning nechanchi haftasida ekaningizni hisoblang.",
    intro: [
      "Oxirgi hayzning birinchi kunini (bilsangiz, urugʻlanish sanasini) kiriting. Taxminiy tugʻruq sanasi, homiladorlik muddati va trimestrni koʻrasiz.",
      "Bu taxminiy hisob. Eng aniq sanani shifokor koʻriklari va UTT beradi: bu kalkulyator shifokor maslahatining oʻrnini bosmaydi.",
    ],
    comoSeCalcula: [
      "Negele qoidasi qoʻllanadi: taxminiy tugʻruq sanasi oxirgi hayzning birinchi kuniga 280 kun (40 hafta) qoʻshib topiladi.",
      "Hayz siklingiz 28 kundan uzun yoki qisqa boʻlsa, sana shu farqqa suriladi.",
      "Urugʻlanish sanasidan hisoblanganda 266 kun (38 hafta) qoʻshiladi.",
      "Homiladorlik haftalari urugʻlanishdan emas, oxirgi hayzdan boshlab sanaladi.",
    ],
    ejemplo: [
      `Oxirgi hayz sanasi ${f(fum)} va sikl 28 kun boʻlsa, taxminiy tugʻruq sanasi: ${f(fpp)}.`,
      `Sikl 32 kun boʻlsa, sana 4 kunga suriladi va bu kunga toʻgʻri keladi: ${f(fpp32)}.`,
    ],
    faq: [
      {
        pregunta: "Tugʻruq sanasi qanday hisoblanadi?",
        respuesta: "Oxirgi hayzning birinchi kuniga 280 kun qoʻshiladi. Deyarli shu sanani beradigan oson usul: kunga 7 kun qoʻshing, oydan 3 oy ayiring va yilga 1 yil qoʻshing.",
      },
      {
        pregunta: "Nega haftalar oxirgi hayzdan sanaladi?",
        respuesta: "Chunki bu sanani deyarli hamma biladi. Shu sababli homiladorlikning 2-haftasida urugʻlanish hali sodir boʻlmagan boʻladi.",
      },
      {
        pregunta: "Chaqaloqlarning qanchasi aynan shu sanada tugʻiladi?",
        respuesta: "Juda kami. Koʻpchiligi 37 va 42 haftalar oraligʻida tugʻiladi, shuning uchun bu sana aniq kun emas, balki moʻljal.",
      },
    ],
    glosario: [
      { termino: "Oxirgi hayz sanasi", definicion: "Oxirgi hayz qon ketishi boshlangan birinchi kun." },
      { termino: "Negele qoidasi", definicion: "Oxirgi hayz sanasiga 280 kun qoʻshib taxminiy tugʻruq sanasini topish usuli." },
    ],
  };
};
