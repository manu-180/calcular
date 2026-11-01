import { formaSr } from "../../../i18n/plural";
import { aDia, mesesYDias } from "../../comun/fechas";
import { duracionSr, fechaGenitivSr } from "../../dias-entre-fechas/textos/sr";
import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoSr: ContenidoUniversal = (ctx) => {
  const nac = "1990-05-15";
  const ref = "2026-10-13";
  const { meses, dias } = mesesYDias(nac, ref);
  const total = aDia(ref) - aDia(nac);
  return {
    h1: "Kalkulator starosti",
    title: tituloQueEntre(`Koliko imam godina: kalkulator starosti (${ctx.nombrePais})`, "Koliko imam godina: kalkulator starosti", "Kalkulator starosti"),
    description: "Izračunajte tačnu starost u godinama, mesecima i danima, koliko ste dana već proživeli i koliko je ostalo do sledećeg rođendana.",
    intro: [
      "Unesite datum rođenja i dobijate tačnu starost na današnji dan, kao i starost u mesecima, nedeljama i danima.",
      "Promenite drugi datum ako želite da saznate koliko je neko imao godina na određeni dan ili koliko godina puni.",
    ],
    comoSeCalcula: [
      "Kalkulator broji pune mesece od rođenja do izabranog datuma. Svakih 12 meseci čini jednu godinu.",
      "Dani koji ostanu posle poslednjeg punog meseca su dani starosti.",
      "Prestupne godine se računaju sa 366 dana.",
    ],
    ejemplo: [
      `Osoba rođena ${fechaGenitivSr(ctx.locale, nac)} na dan ${fechaGenitivSr(ctx.locale, ref)} ima tačno ${duracionSr(Math.floor(meses / 12), meses % 12, dias)}.`,
      `To je ukupno ${formatearNumero(ctx, total)} ${formaSr(total, "dan", "dana", "dana")}.`,
    ],
    faq: [
      {
        pregunta: "Kako se računa tačna starost?",
        respuesta: "Prvo se broje pune godine, zatim puni meseci od poslednjeg rođendana i na kraju preostali dani.",
      },
      {
        pregunta: "Kako je sa onima koji su rođeni 29. februara?",
        respuesta: "U godinama koje nisu prestupne ovaj kalkulator kao dan rođendana uzima 28. februar. Neki propisi umesto toga koriste 1. mart.",
      },
      {
        pregunta: "Koliko je dana prošlo od mog rođenja?",
        respuesta: "Pogledajte red „U danima“. Broji svaki dan od rođenja do izabranog datuma, bez poslednjeg dana.",
      },
    ],
    glosario: [
      { termino: "Starost", definicion: "Broj punih godina od rođenja." },
      { termino: "Prestupna godina", definicion: "Godina od 366 dana, u kojoj postoji 29. februar. Dolazi jednom u četiri godine, osim nekih godina na prelazu veka." },
    ],
  };
};
