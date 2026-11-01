import { formaHr } from "../../../i18n/plural";
import { aDia, mesesYDias } from "../../comun/fechas";
import { duracionHr, fechaGenitivHr } from "../../dias-entre-fechas/textos/hr";
import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoHr: ContenidoUniversal = (ctx) => {
  const nac = "1990-05-15";
  const ref = "2026-10-13";
  const { meses, dias } = mesesYDias(nac, ref);
  const total = aDia(ref) - aDia(nac);
  return {
    h1: "Kalkulator dobi",
    title: tituloQueEntre(`Koliko imam godina: kalkulator dobi (${ctx.nombrePais})`, "Koliko imam godina: kalkulator dobi", "Kalkulator dobi"),
    description: "Izračunajte točnu dob u godinama, mjesecima i danima, koliko ste dana već proživjeli i koliko je ostalo do sljedećeg rođendana.",
    intro: [
      "Unesite datum rođenja i dobivate točnu dob na današnji dan, kao i dob u mjesecima, tjednima i danima.",
      "Promijenite drugi datum ako želite saznati koliko je netko imao godina na određeni dan ili koliko godina puni.",
    ],
    comoSeCalcula: [
      "Kalkulator broji pune mjesece od rođenja do odabranog datuma. Svakih 12 mjeseci čini jednu godinu.",
      "Dani koji ostanu nakon posljednjeg punog mjeseca dodaju se dobi kao dani.",
      "Prijestupne godine računaju se s 366 dana.",
    ],
    ejemplo: [
      `Osoba rođena ${fechaGenitivHr(ctx.locale, nac)} na dan ${fechaGenitivHr(ctx.locale, ref)} ima točno ${duracionHr(Math.floor(meses / 12), meses % 12, dias)}.`,
      `To je ukupno ${formatearNumero(ctx, total)} ${formaHr(total, "dan", "dana", "dana")}.`,
    ],
    faq: [
      {
        pregunta: "Kako se računa točna dob?",
        respuesta: "Prvo se broje pune godine, zatim puni mjeseci od posljednjeg rođendana i na kraju preostali dani.",
      },
      {
        pregunta: "Kako je s onima koji su rođeni 29. veljače?",
        respuesta: "U godinama koje nisu prijestupne ovaj kalkulator kao dan rođendana uzima 28. veljače. Neki propisi umjesto toga koriste 1. ožujka.",
      },
      {
        pregunta: "Koliko je dana prošlo od mog rođenja?",
        respuesta: "Pogledajte redak „U danima”. Broji svaki dan od rođenja do odabranog datuma, bez posljednjeg dana.",
      },
    ],
    glosario: [
      { termino: "Dob", definicion: "Broj punih godina od rođenja." },
      { termino: "Prijestupna godina", definicion: "Godina od 366 dana, u kojoj postoji 29. veljače. Dolazi jednom u četiri godine, osim nekih godina na prijelazu stoljeća." },
    ],
  };
};
