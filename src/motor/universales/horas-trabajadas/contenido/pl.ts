import { pluralPl } from "../../../i18n/plural";
import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { horarios, minutosTrabajados } from "../definicion";

export const contenidoPl: ContenidoUniversal = (ctx) => {
  const m = (x: number) => formatearMonto(ctx, x);
  const n = (x: number, decimales = 0) => formatearNumero(ctx, x, decimales);
  const hora = (v: string) => horarios(ctx.locale).find((o) => o.valor === v)?.etiqueta ?? v;
  // Con decimales («7,5 godziny») el polaco usa el genitivo singular; los enteros siguen la regla few/many.
  const godzin = (x: number) =>
    Number.isInteger(x) ? `${n(x)} ${pluralPl(x, "godzina", "godziny", "godzin").slice(String(x).length + 1)}` : `${n(x, 1)} godziny`;
  const pago = montoEjemplo(ctx, 15);
  const jornada = minutosTrabajados("09:00", "17:30", 30) / 60;
  const larga = minutosTrabajados("08:00", "18:00", 60) / 60;
  const extra = larga * 5 - 40;
  return {
    h1: "Kalkulator godzin pracy",
    title: tituloQueEntre(
      `Kalkulator godzin pracy i nadgodzin | ${ctx.nombrePais}`,
      `Kalkulator godzin pracy | ${ctx.nombrePais}`,
      "Kalkulator godzin pracy",
    ),
    description: "Zsumuj godziny przepracowane w tygodniu na podstawie godzin rozpoczęcia, zakończenia i przerw. Policz wynagrodzenie razem z nadgodzinami.",
    intro: [
      "Wybierz godzinę rozpoczęcia i zakończenia pracy dla każdego dnia, niepłatną przerwę i stawkę za godzinę. Pokażemy sumę godzin, nadgodziny i wynagrodzenie za tydzień.",
      "Przyda się do sprawdzenia wypłaty, wypełnienia ewidencji czasu pracy albo rozliczenia pracy na godziny.",
    ],
    comoSeCalcula: [
      "Godziny w danym dniu = zakończenie − rozpoczęcie − przerwa. Jeśli zakończenie jest wcześniej niż rozpoczęcie, zmiana kończy się następnego dnia.",
      "Nadgodziny = suma tygodniowa − godziny normalne, jeśli suma je przekracza.",
      "Wynagrodzenie = godziny normalne × stawka + nadgodziny × stawka × (1 + dodatek).",
    ],
    ejemplo: [
      `Od ${hora("09:00")} do ${hora("17:30")} z przerwą 30 minut to ${godzin(jornada)} dziennie. Od poniedziałku do piątku to ${godzin(jornada * 5)}. Przy stawce ${m(pago)} za godzinę daje to ${m(jornada * 5 * pago)}.`,
      `Od ${hora("08:00")} do ${hora("18:00")} z godzinną przerwą to ${godzin(larga * 5)} w tygodniu, z czego ${godzin(extra)} to nadgodziny. Z dodatkiem 50% daje to ${m(40 * pago + extra * pago * 1.5)}.`,
    ],
    faq: [
      {
        pregunta: "Jak policzyć przepracowane godziny?",
        respuesta: "Od godziny zakończenia odejmij godzinę rozpoczęcia i przerwę. Potem zsumuj wszystkie dni tygodnia.",
      },
      {
        pregunta: "Jak zamienić minuty na godziny dziesiętne?",
        respuesta: `Podziel minuty przez 60. Pół godziny to ${n(0.5, 1)}, 15 minut to ${n(0.25, 2)}, a 45 minut to ${n(0.75, 2)}. Czyli 7 godzin i 45 minut to ${n(7.75, 2)} godziny.`,
      },
      {
        pregunta: "Ile mogę pracować w nadgodzinach i jak są płatne?",
        respuesta:
          ctx.pais === "PL"
            ? "W Polsce zasady określa Kodeks pracy i twoja umowa. Kalkulator stosuje dodatek i godziny normalne, które wpiszesz, bez żadnej konkretnej reguły."
            : "To zależy od przepisów w miejscu pracy i od twojej umowy. Kalkulator stosuje dodatek i godziny normalne, które wpiszesz, bez żadnej konkretnej reguły.",
      },
    ],
    glosario: [
      { termino: "Nadgodziny", definicion: "Godziny przepracowane ponad normalny czas pracy, płatne wyższą stawką." },
      { termino: "Dodatek za nadgodziny", definicion: "Procent, o który rośnie stawka za każdą nadgodzinę, na przykład 50%." },
    ],
  };
};
