import { GRAMATICA } from "../../../i18n/gramatica";
import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoPl: ContenidoUniversal = (ctx) => {
  const cuenta = montoEjemplo(ctx, 60);
  const propina = cuenta * 0.1;
  const m = (n: number) => formatearMonto(ctx, n);
  return {
    h1: "Kalkulator napiwku",
    title: tituloQueEntre(
      `Kalkulator napiwku: ile zostawić i jak podzielić | ${ctx.nombrePais}`,
      `Kalkulator napiwku | ${ctx.nombrePais}`,
      "Kalkulator napiwku",
    ),
    description: "Oblicz napiwek, kwotę do zapłaty i to, ile płaci każda osoba przy podziale rachunku. Możesz zaokrąglić każdą część w górę.",
    intro: [
      "Wpisz kwotę rachunku, procent napiwku i liczbę osób, które płacą. Zobaczysz napiwek, sumę i część każdej osoby.",
      "Jeśli wolisz okrągłe kwoty, kalkulator zaokrągli każdą część w górę, a nadwyżka trafi do napiwku.",
    ],
    comoSeCalcula: ["Napiwek = rachunek × procent napiwku ÷ 100.", "Razem = rachunek + napiwek.", "Część każdej osoby to suma podzielona przez liczbę osób."],
    ejemplo: [
      `Do rachunku ${m(cuenta)} napiwek 10% dodaje ${m(propina)}, czyli razem ${m(cuenta + propina)}.`,
      `Przy podziale na 3 osoby każda płaci ${m((cuenta + propina) / 3)}.`,
    ],
    faq: [
      {
        pregunta: "Ile zostawić napiwku?",
        respuesta: `To zależy od lokalnych zwyczajów. Sprawdź, ile zwykle się zostawia ${GRAMATICA.pl.en(ctx.nombrePais)}, i czy na rachunku nie ma już opłaty serwisowej.`,
      },
      {
        pregunta: "Czy liczyć napiwek od kwoty z podatkiem, czy bez?",
        respuesta: "Większość osób liczy go od kwoty widocznej na rachunku. Jeśli wolisz liczyć od kwoty bez podatku, wpisz właśnie ją.",
      },
      {
        pregunta: "Jak szybko policzyć napiwek 10%?",
        respuesta: `Przesuń przecinek o jedno miejsce w lewo. Przy rachunku 80 to 8, a przy 135 to ${formatearNumero(ctx, 135 / 10, 2)}.`,
      },
    ],
    glosario: [
      { termino: "Napiwek", definicion: "Dodatkowa kwota zostawiana za obsługę, ponad cenę." },
      { termino: "Opłata serwisowa", definicion: "Opłata za obsługę, którą lokal już doliczył do rachunku." },
    ],
  };
};
