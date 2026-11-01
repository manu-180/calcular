import { formaLv } from "../../../i18n/plural";
import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { aDia, fechaLarga, habilesEntre } from "../../comun/fechas";

export const contenidoLv: ContenidoUniversal = (ctx) => {
  const desde = "2026-03-02";
  const hasta = "2026-06-30";
  const dias = aDia(hasta) - aDia(desde);
  const habiles = habilesEntre(aDia(desde), aDia(hasta));
  const f = (iso: string) => fechaLarga(ctx.locale, iso);
  const n = (x: number) => formatearNumero(ctx, x);
  return {
    h1: "Dienu skaita starp datumiem kalkulators",
    title: tituloQueEntre(`Dienu skaits starp datumiem: kalkulators (${ctx.nombrePais})`, "Dienu skaits starp datumiem: kalkulators", "Dienu skaits starp datumiem"),
    description: "Aprēķiniet, cik dienu ir starp diviem datumiem: kalendārās dienas, nedēļas, mēneši un darba dienas no pirmdienas līdz piektdienai.",
    intro: [
      "Izvēlieties sākuma un beigu datumu. Redzēsiet kalendāro dienu skaitu, to pašu periodu nedēļās un mēnešos, kā arī darba dienu skaitu.",
      "Tas noder termiņiem, atvaļinājumam, grūtniecībai vai skaitot dienas līdz svarīgam datumam.",
    ],
    comoSeCalcula: [
      "Kalendārās dienas ietver katru dienu starp abiem datumiem. Pirmo dienu skaita, pēdējo ne, ja vien neatzīmējat attiecīgo iespēju.",
      "Darba dienas ietver pirmdienas, otrdienas, trešdienas, ceturtdienas un piektdienas tajā pašā periodā. Svētku dienas netiek atskaitītas.",
      "Garajos gados tiek skaitīts arī 29. februāris.",
    ],
    ejemplo: [
      `Sākuma datums: ${f(desde)}. Beigu datums: ${f(hasta)}. Starp tiem ir ${n(dias)} ${formaLv(dias, "kalendārā diena", "kalendārās dienas", "kalendāro dienu")}.`,
      `No tām ${n(habiles)} ${formaLv(habiles, "diena iekrīt", "dienas iekrīt", "dienu iekrīt")} periodā no pirmdienas līdz piektdienai.`,
    ],
    faq: [
      {
        pregunta: "Vai skaita pirmo vai pēdējo dienu?",
        respuesta: "Pēc noklusējuma skaita pirmo dienu, bet pēdējo ne, tāpat kā atņemot divus datumus. Ja vajag abas, atzīmējiet „Ieskaitīt arī pēdējo dienu“.",
      },
      {
        pregunta: "Vai no darba dienām tiek atskaitītas svētku dienas?",
        respuesta: "Nē. Tiek skaitītas dienas no pirmdienas līdz piektdienai. Svētku dienas atšķiras pēc valsts, reģiona un gada, tāpēc atņemiet tās atsevišķi.",
      },
      {
        pregunta: "Cik dienu ir gadā?",
        respuesta: "Parastā gadā ir 365 dienas, garajā gadā 366. Tāpēc starp tiem pašiem datumiem dažādos gados var sanākt cits dienu skaits.",
      },
    ],
    glosario: [
      { termino: "Kalendārās dienas", definicion: "Visas kalendāra dienas, ieskaitot brīvdienas un svētkus." },
      { termino: "Darba dienas", definicion: "Šajā kalkulatorā dienas no pirmdienas līdz piektdienai." },
    ],
  };
};
