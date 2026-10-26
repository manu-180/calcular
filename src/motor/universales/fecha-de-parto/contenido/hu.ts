import { aDia, aFecha, fechaLarga } from "../../comun/fechas";
import { tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { DURACION } from "../definicion";

export const contenidoHu: ContenidoUniversal = (ctx) => {
  const f = (iso: string) => fechaLarga(ctx.locale, iso);
  const fum = "2026-01-10";
  const fpp = aFecha(aDia(fum) + DURACION);
  const fpp32 = aFecha(aDia(fum) + DURACION + 4);
  return {
    h1: "Szülés várható időpontja kalkulátor",
    title: tituloQueEntre(`Szülés várható időpontja: ${ctx.nombrePais}`, "Szülés várható időpontja és terhességi hét kalkulátor", "Szülés várható időpontja"),
    description: "Számold ki a szülés várható időpontját az utolsó menstruáció vagy a fogantatás napja alapján, és nézd meg, hányadik terhességi héten jársz ma.",
    intro: [
      "Add meg az utolsó menstruációd első napját (vagy a fogantatás napját, ha ismered). Látod a várható szülési időpontot, a terhességi hetet és az aktuális trimesztert.",
      "Ez tájékoztató becslés. A legpontosabb dátumot az orvosi és védőnői vizsgálatok és az ultrahang adják; ez a számítás nem helyettesíti a szakember tanácsát.",
    ],
    comoSeCalcula: [
      "A Naegele-szabályt használjuk: az utolsó menstruáció első napjához hozzáadunk 280 napot (40 hetet).",
      "Ha a ciklusod hosszabb vagy rövidebb 28 napnál, a dátum ennyi nappal tolódik.",
      "A fogantatás napjától 266 napot (38 hetet) számolunk.",
      "A terhességi heteket az utolsó menstruációtól számoljuk, nem a fogantatástól.",
    ],
    ejemplo: [
      `Ha az utolsó menstruáció első napja ${f(fum)}, és a ciklus 28 napos, a szülés várható időpontja: ${f(fpp)}`,
      `32 napos ciklusnál a dátum 4 nappal később van: ${f(fpp32)}`,
    ],
    faq: [
      {
        pregunta: "Hogyan számolják ki a szülés várható időpontját?",
        respuesta: "Az utolsó menstruáció első napjához 280 napot adnak. Egy egyszerű módszer, amely szinte ugyanazt a dátumot adja: a naphoz adj hozzá hetet, a hónapból vonj le hármat, az évhez adj hozzá egyet.",
      },
      {
        pregunta: "Miért az utolsó menstruációtól számolják a heteket?",
        respuesta: "Mert ezt a dátumot szinte minden nő ismeri. Ezért a második héten még nem történt meg a fogantatás.",
      },
      {
        pregunta: "Hány baba születik pontosan a várható napon?",
        respuesta: "Nagyon kevés. A legtöbb a 37. és a 42. hét között születik, ezért a várható időpont tájékoztató, nem pontos nap.",
      },
    ],
    glosario: [
      { termino: "Utolsó menstruáció", definicion: "Az utolsó menstruációs vérzés első napja." },
      { termino: "Naegele-szabály", definicion: "A szülés várható időpontjának meghatározása úgy, hogy az utolsó menstruáció első napjához 280 napot adunk." },
    ],
  };
};
