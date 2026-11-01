import { aDia, aFecha, fechaLarga } from "../../comun/fechas";
import { tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { FASE_LUTEA, ventana } from "../definicion";

export const contenidoPl: ContenidoUniversal = (ctx) => {
  const f = (iso: string) => fechaLarga(ctx.locale, iso);
  const fum = "2026-03-05";
  const v = ventana(aDia(fum), 28);
  return {
    h1: "Kalkulator owulacji i dni płodnych",
    title: tituloQueEntre(
      `Kalkulator owulacji: dni płodne i owulacja | ${ctx.nombrePais}`,
      `Kalkulator owulacji | ${ctx.nombrePais}`,
      "Kalkulator owulacji",
    ),
    description: "Oblicz dzień owulacji, dni płodne i termin następnej miesiączki, razem z trzema kolejnymi cyklami.",
    intro: [
      "Wpisz pierwszy dzień ostatniej miesiączki i długość cyklu. Zobaczysz przewidywaną owulację, dni płodne i termin następnej miesiączki.",
      "To szacunek dla regularnych cykli. Nie jest metodą antykoncepcji i nie zastępuje konsultacji z lekarzem ani położną.",
    ],
    comoSeCalcula: [
      `Owulacja zwykle następuje ${FASE_LUTEA} dni przed kolejną miesiączką: pierwszy dzień ostatniej miesiączki + długość cyklu − ${FASE_LUTEA}.`,
      "Dni płodne trwają od 5 dni przed owulacją do dnia po niej, bo plemniki mogą przeżyć do 5 dni.",
      "Następna miesiączka przypada jeden cykl po ostatniej.",
    ],
    ejemplo: [
      `Przy ostatniej miesiączce ${f(fum)} r. i cyklu 28-dniowym przewidywana owulacja przypada ${f(aFecha(v.ovulacion))} r.`,
      `Dni płodne trwają od ${f(aFecha(v.desde))} do ${f(aFecha(v.hasta))}, a następna miesiączka powinna się zacząć ${f(aFecha(v.proxima))} r.`,
    ],
    faq: [
      {
        pregunta: "Które dni są najbardziej płodne?",
        respuesta: "Dwa lub trzy dni przed owulacją i sam dzień owulacji. Całe okno płodności trwa około 6 dni.",
      },
      {
        pregunta: "Czy kalkulator działa przy nieregularnym cyklu?",
        respuesta: "Daje orientację, ale mniej dokładną. Przy nieregularnych cyklach owulacja może się przesuwać o kilka dni z miesiąca na miesiąc.",
      },
      {
        pregunta: "Czy mogę z niego korzystać, żeby uniknąć ciąży?",
        respuesta: "Nie. Szacunek jest przybliżony, a owulacja może wypaść wcześniej albo później. Żeby zapobiec ciąży, stosuj metodę antykoncepcji.",
      },
    ],
    glosario: [
      { termino: "Owulacja", definicion: "Moment, w którym jajnik uwalnia komórkę jajową." },
      { termino: "Dni płodne", definicion: "Dni cyklu, w których można zajść w ciążę." },
    ],
  };
};
