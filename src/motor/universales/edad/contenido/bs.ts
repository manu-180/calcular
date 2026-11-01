import { formaBs } from "../../../i18n/plural";
import { aDia, mesesYDias } from "../../comun/fechas";
import { duracionBs, fechaGenitivBs } from "../../dias-entre-fechas/textos/bs";
import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoBs: ContenidoUniversal = (ctx) => {
  const nac = "1990-05-15";
  const ref = "2026-10-13";
  const { meses, dias } = mesesYDias(nac, ref);
  const total = aDia(ref) - aDia(nac);
  return {
    h1: "Kalkulator starosti",
    title: tituloQueEntre(`Koliko imam godina: kalkulator starosti (${ctx.nombrePais})`, "Koliko imam godina: kalkulator starosti", "Kalkulator starosti"),
    description: "Izračunajte tačnu dob u godinama, mjesecima i danima, koliko ste dana već proživjeli i koliko je ostalo do sljedećeg rođendana.",
    intro: [
      "Unesite datum rođenja i dobijate tačnu dob na današnji dan, kao i dob u mjesecima, sedmicama i danima.",
      "Promijenite drugi datum ako želite saznati koliko je neko imao godina na određeni dan ili koliko godina puni.",
    ],
    comoSeCalcula: [
      "Kalkulator broji pune mjesece od rođenja do izabranog datuma. Svakih 12 mjeseci čini jednu godinu.",
      "Dani koji ostanu nakon posljednjeg punog mjeseca dodaju se dobi kao dani.",
      "Prijestupne godine računaju se s 366 dana.",
    ],
    ejemplo: [
      `Osoba rođena ${fechaGenitivBs(ctx.locale, nac)} na dan ${fechaGenitivBs(ctx.locale, ref)} ima tačno ${duracionBs(Math.floor(meses / 12), meses % 12, dias)}.`,
      `To je ukupno ${formatearNumero(ctx, total)} ${formaBs(total, "dan", "dana", "dana")}.`,
    ],
    faq: [
      {
        pregunta: "Kako se računa tačna dob?",
        respuesta: "Prvo se broje pune godine, zatim puni mjeseci od posljednjeg rođendana i na kraju preostali dani.",
      },
      {
        pregunta: "Kako je s onima koji su rođeni 29. februara?",
        respuesta: "U godinama koje nisu prijestupne ovaj kalkulator kao dan rođendana uzima 28. februara. Neki propisi umjesto toga koriste 1. marta.",
      },
      {
        pregunta: "Koliko je dana prošlo od mog rođenja?",
        respuesta: "Pogledajte red „U danima”. Broji svaki dan od rođenja do izabranog datuma, bez posljednjeg dana.",
      },
    ],
    glosario: [
      { termino: "Dob", definicion: "Broj punih godina od rođenja." },
      { termino: "Prijestupna godina", definicion: "Godina od 366 dana, u kojoj postoji 29. februara. Dolazi jednom u četiri godine, osim nekih godina na prijelazu vijeka." },
    ],
  };
};
