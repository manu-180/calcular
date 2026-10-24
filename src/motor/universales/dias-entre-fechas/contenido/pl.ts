import { pluralPl } from "../../../i18n/plural";
import { aDia, fechaLarga, habilesEntre } from "../../comun/fechas";
import { tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoPl: ContenidoUniversal = (ctx) => {
  const desde = "2026-03-02";
  const hasta = "2026-06-30";
  const dias = aDia(hasta) - aDia(desde);
  const habiles = habilesEntre(aDia(desde), aDia(hasta));
  const f = (iso: string) => fechaLarga(ctx.locale, iso);
  return {
    h1: "Kalkulator dni między datami",
    title: tituloQueEntre(
      `Kalkulator dni między datami: ile dni do daty | ${ctx.nombrePais}`,
      `Kalkulator dni między datami | ${ctx.nombrePais}`,
      "Kalkulator dni między datami",
    ),
    description: "Policz, ile dni dzieli dwie daty: dni kalendarzowe, tygodnie, miesiące i dni robocze od poniedziałku do piątku.",
    intro: [
      "Wybierz datę początkową i końcową. Zobaczysz liczbę dni kalendarzowych, ten sam okres w tygodniach i miesiącach oraz liczbę dni roboczych.",
      "Przyda się przy terminach, urlopie, ciąży albo odliczaniu do ważnego dnia.",
    ],
    comoSeCalcula: [
      "Dni kalendarzowe to wszystkie dni między dwiema datami. Dzień początkowy się liczy, a końcowy nie, chyba że zaznaczysz tę opcję.",
      "Dni robocze to poniedziałki, wtorki, środy, czwartki i piątki w tym samym okresie. Święta nie są odejmowane.",
      "Lata przestępne liczą się razem z 29 lutego.",
    ],
    ejemplo: [
      `Od ${f(desde)} do ${f(hasta)} mija ${pluralPl(dias, "dzień", "dni", "dni")} kalendarzowych.`,
      `Z tego ${pluralPl(habiles, "dzień przypada", "dni przypadają", "dni przypada")} od poniedziałku do piątku.`,
    ],
    faq: [
      {
        pregunta: "Czy liczy się pierwszy dzień, czy ostatni?",
        respuesta: "Domyślnie liczy się pierwszy, a ostatni nie, tak jak przy odejmowaniu dat. Jeśli potrzebujesz obu, zaznacz „Licz też dzień końcowy”.",
      },
      {
        pregunta: "Czy dni robocze uwzględniają święta?",
        respuesta: "Nie. Liczymy dni od poniedziałku do piątku. Święta różnią się w zależności od kraju, regionu i roku, więc odejmij je osobno.",
      },
      {
        pregunta: "Ile dni ma rok?",
        respuesta: "365, a w latach przestępnych 366. Dlatego te same dwie daty w różnych latach mogą dzielić inną liczbę dni.",
      },
    ],
    glosario: [
      { termino: "Dni kalendarzowe", definicion: "Wszystkie dni w kalendarzu, razem z weekendami i świętami." },
      { termino: "Dni robocze", definicion: "W tym kalkulatorze dni od poniedziałku do piątku." },
    ],
  };
};
