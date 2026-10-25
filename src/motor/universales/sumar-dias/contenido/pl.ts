import { aDia, aFecha, esHabil, fechaLarga } from "../../comun/fechas";
import { tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoPl: ContenidoUniversal = (ctx) => {
  const f = (iso: string) => fechaLarga(ctx.locale, iso);
  const inicio = "2026-03-02";
  const mas90 = aFecha(aDia(inicio) + 90);
  let habil = aDia(inicio);
  for (let n = 0; n < 15; ) if (esHabil(++habil)) n++;
  return {
    h1: "Kalkulator dat: dodaj dni do daty",
    title: tituloQueEntre(
      `Kalkulator dat: dodaj lub odejmij dni od daty | ${ctx.nombrePais}`,
      `Kalkulator dat | ${ctx.nombrePais}`,
      "Kalkulator dat",
    ),
    description: "Dodaj albo odejmij dni kalendarzowe lub robocze od daty i zobacz, na jaki dzień wypada wynik. Przydatne przy terminach.",
    intro: [
      "Wybierz datę, liczbę dni i działanie: dodawanie albo odejmowanie. Zobaczysz datę wynikową i dzień tygodnia.",
      "Przy dniach roboczych kalkulator pomija soboty i niedziele.",
    ],
    comoSeCalcula: [
      "Przy dniach kalendarzowych każdy wpisany dzień przesuwa datę o jeden dzień w kalendarzu.",
      "Przy dniach roboczych liczą się tylko dni od poniedziałku do piątku. Sama data początkowa się nie liczy.",
      "Święta nie są pomijane, bo różnią się w zależności od kraju i regionu.",
    ],
    ejemplo: [`${f(inicio)} r. plus 90 dni kalendarzowych to ${f(mas90)} r.`, `${f(inicio)} r. plus 15 dni roboczych to ${f(aFecha(habil))} r.`],
    faq: [
      {
        pregunta: "Czy data początkowa liczy się jako pierwszy dzień?",
        respuesta: "Nie. Poniedziałek plus 1 dzień to wtorek. Tak liczy się większość terminów.",
      },
      {
        pregunta: "Co, jeśli dodaję dni robocze od soboty?",
        respuesta: "Pierwszym dniem roboczym jest najbliższy poniedziałek. Sobota plus 1 dzień roboczy to poniedziałek.",
      },
      {
        pregunta: "Czy kalkulator uwzględnia lata przestępne?",
        respuesta: "Tak. Jeśli okres obejmuje 29 lutego, liczy się on jako dodatkowy dzień.",
      },
    ],
    glosario: [
      { termino: "Dni kalendarzowe", definicion: "Wszystkie dni w kalendarzu, bez pomijania żadnego." },
      { termino: "Dni robocze", definicion: "W tym kalkulatorze dni od poniedziałku do piątku." },
    ],
  };
};
