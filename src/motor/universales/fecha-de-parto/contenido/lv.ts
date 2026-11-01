import { aDia, aFecha, fechaLarga } from "../../comun/fechas";
import { tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { DURACION } from "../definicion";

export const contenidoLv: ContenidoUniversal = (ctx) => {
  const f = (iso: string) => fechaLarga(ctx.locale, iso);
  const fum = "2026-01-10";
  const fpp = aFecha(aDia(fum) + DURACION);
  const fpp32 = aFecha(aDia(fum) + DURACION + 4);
  return {
    h1: "Dzemdību datuma kalkulators",
    title: tituloQueEntre(`Dzemdību datuma kalkulators: ${ctx.nombrePais}`, "Dzemdību datuma un grūtniecības nedēļas kalkulators", "Dzemdību datuma kalkulators"),
    description: "Aprēķiniet paredzamo dzemdību datumu pēc pēdējām mēnešreizēm vai ieņemšanas datuma un uzziniet, kura šodien ir grūtniecības nedēļa.",
    intro: [
      "Ievadiet pēdējo mēnešreižu pirmo dienu (vai ieņemšanas datumu, ja to zināt). Redzēsiet paredzamo dzemdību datumu, grūtniecības nedēļu un pašreizējo trimestri.",
      "Tas ir orientējošs novērtējums. Visprecīzāko datumu nosaka vizītes pie ārsta vai vecmātes un ultrasonogrāfija; šis aprēķins neaizstāj speciālista konsultāciju.",
    ],
    comoSeCalcula: [
      "Izmanto Nēgeles likumu: pēdējo mēnešreižu pirmajai dienai pieskaita 280 dienas (40 nedēļas).",
      "Ja jūsu cikls ir garāks vai īsāks par 28 dienām, datums pārbīdās par šo starpību.",
      "Ieņemšanas datumam pieskaita 266 dienas (38 nedēļas).",
      "Grūtniecības nedēļas skaita no pēdējām mēnešreizēm, nevis no ieņemšanas.",
    ],
    ejemplo: [
      `Pēdējo mēnešreižu sākums: ${f(fum)}. Ja cikla ilgums ir 28 dienas, paredzamais dzemdību datums ir: ${f(fpp)}.`,
      `Ja cikla ilgums ir 32 dienas, starpība ir 4 dienas, tāpēc datums pārbīdās uz priekšu: ${f(fpp32)}.`,
    ],
    faq: [
      {
        pregunta: "Kā aprēķināt dzemdību datumu?",
        respuesta: "Pēdējo mēnešreižu pirmajai dienai pieskaita 280 dienas. Vienkāršs veids, kas dod gandrīz to pašu datumu: dienai pieskaitiet 7, no mēneša atņemiet 3, bet gadam pieskaitiet 1.",
      },
      {
        pregunta: "Kāpēc nedēļas skaita no pēdējām mēnešreizēm?",
        respuesta: "Jo šo datumu zina gandrīz katra sieviete. Tāpēc otrajā nedēļā ieņemšanas parasti vēl nav.",
      },
      {
        pregunta: "Cik bērnu piedzimst tieši paredzētajā dienā?",
        respuesta: "Ļoti nedaudz. Lielākā daļa piedzimst no 37. līdz 42. nedēļai, tāpēc šis datums ir orientējošs, nevis precīza diena.",
      },
    ],
    glosario: [
      { termino: "Pēdējās mēnešreizes", definicion: "Pēdējās menstruālās asiņošanas pirmā diena." },
      { termino: "Nēgeles likums", definicion: "Veids, kā noteikt paredzamo dzemdību datumu, pēdējo mēnešreižu pirmajai dienai pieskaitot 280 dienas." },
    ],
  };
};
